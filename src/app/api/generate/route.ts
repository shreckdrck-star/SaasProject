import Groq from "groq-sdk";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { DAILY_GENERATION_LIMIT } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { contentType, topic, targetAudience, tone, additionalRequirements } = await req.json();

    // Check daily usage limit (3/day for free tier)
    const todayUTC = new Date();
    todayUTC.setUTCHours(0, 0, 0, 0);
    const { count } = await supabase
      .from("generations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", todayUTC.toISOString());

    const used = count ?? 0;
    if (used >= DAILY_GENERATION_LIMIT) {
      return new Response(JSON.stringify({ error: "Daily limit reached", limit: DAILY_GENERATION_LIMIT, used }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY environment variable");
      return new Response("Missing GROQ_API_KEY", { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `You are an expert content creator. Generate ${contentType} about ${topic}
for ${targetAudience} audience with a ${tone} tone. ${additionalRequirements ? `Additional requirements: ${additionalRequirements}` : ""}
Make it engaging, professional and ready to use.`;

    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      stream: true,
    });

    let fullContent = "";

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              fullContent += content;
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
          controller.close();

          // Save to Supabase after stream completes
          const { error: dbError } = await supabase.from("generations").insert({
            user_id: userId,
            content_type: contentType,
            topic,
            target_audience: targetAudience,
            tone,
            additional_requirements: additionalRequirements || null,
            generated_content: fullContent,
          });

          if (dbError) {
            console.error("Failed to save generation:", dbError);
          }
        } catch (error) {
          console.error("Error in stream processing:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error generating content:", error);
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({
      error: "Error generating content",
      details: message,
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
