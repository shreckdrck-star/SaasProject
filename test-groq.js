const Groq = require("groq-sdk");

async function testGroq() {
  const apiKey = "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";
  
  console.log("Testing Groq API with key:", apiKey.substring(0, 10) + "...");
  
  try {
    const groq = new Groq({ apiKey });
    
    console.log("Sending request...");
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Hello, are you working?",
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    console.log("Response received:");
    console.log(completion.choices[0]?.message?.content);
    console.log("✅ API Test Passed!");
  } catch (error) {
    console.error("❌ API Test Failed:");
    console.error(error);
  }
}

testGroq();
