
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''; // Use environment variable

export const chatWithGroq = async (messages, onChunk) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        stream: true // Enable streaming
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to chat with AI');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullResponse = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\\n").filter(line => line.trim() !== "");

      for (const line of lines) {
        if (line.includes("[DONE]")) return fullResponse;
        
        try {
          const jsonStr = line.replace(/^data: /, "");
          const json = JSON.parse(jsonStr);
          const content = json.choices[0]?.delta?.content || "";
          
          if (content) {
            fullResponse += content;
            if (onChunk) onChunk(content);
          }
        } catch (e) {
          console.warn("Error parsing stream chunk", e);
        }
      }
    }

    return fullResponse;

  } catch (error) {
    console.error("Groq API Error:", error);
    throw error;
  }
};
