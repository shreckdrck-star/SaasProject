import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { contentType, topic, targetAudience, tone, additionalRequirements } = await req.json();

    // Debugging logs
    console.log("Received generation request for:", topic);
    console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);

    if (!process.env.GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY environment variable");
      return new Response("Missing GROQ_API_KEY", { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `You are an expert content creator. Generate ${contentType} about ${topic} 
for ${targetAudience} audience with a ${tone} tone. ${additionalRequirements ? `Additional requirements: ${additionalRequirements}` : ""} 
Make it engaging, professional and ready to use.`;

    console.log("Sending prompt to Groq:", prompt);

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

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
          controller.close();
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
  } catch (error: any) {
    console.error("Full error:", JSON.stringify(error, null, 2));
    console.error("Error generating content:", error);
    
    // Return detailed error in response for debugging
    return new Response(JSON.stringify({ 
      error: "Error generating content", 
      details: error.message || error.toString(),
      stack: error.stack 
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
