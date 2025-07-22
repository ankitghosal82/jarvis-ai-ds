import { streamText } from "ai"
import { cohere } from "@ai-sdk/cohere"

export async function POST(req: Request) {
  try {
    const { prompt, language, userName, pdfContent } = await req.json()

    let systemPrompt = `You are JARVIS, a helpful and sophisticated AI assistant. Your responses should be concise, informative, and polite.
    The user's name is ${userName || "User"}.
    Respond in the language specified by the user's selected language: ${language}.`

    if (pdfContent) {
      systemPrompt += `\n\nHere is the content of a PDF document:
      ---PDF CONTENT START---
      ${pdfContent}
      ---PDF CONTENT END---
      Please use this PDF content to answer questions or provide summaries if relevant to the user's prompt. If the user asks you to "read" something or "summarize" something from the PDF, acknowledge that you have processed the content and are ready to answer questions about it, but do not output the entire PDF content. If the user asks you to read it aloud, tell them you can't speak the entire document but can answer questions about it.`
    }

    // Add a specific instruction for YouTube searches
    systemPrompt += `\n\nIf the user asks you to "play" something (e.g., "play a song", "play a video", "play 'Never Gonna Give You Up'"), respond with "YOUTUBE_SEARCH:" followed by the exact search query. For example, if the user says "play Never Gonna Give You Up", your response should be "YOUTUBE_SEARCH: Never Gonna Give You Up". Do not add any other text before or after this special command.`

    const result = await streamText({
      model: cohere("command-r-plus"), // Using Cohere model
      system: systemPrompt,
      prompt: prompt,
    })

    return result.to
  } catch (error) {
    console.error("Error in AI API:", error)
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
