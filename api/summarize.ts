import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * API route handler for summarizing HTML content using OpenAI's GPT model.
 *
 * This handler accepts POST requests with a JSON body containing a `content` field (HTML string).
 * It forwards the content to the OpenAI Chat Completion API, requesting a summary.
 * CORS headers are set to allow requests from `http://localhost:5173` (for development).
 * Handles preflight OPTIONS requests for CORS.
 *
 * @param req - The VercelRequest object, expected to contain a `body` with a `content` field.
 * @param res - The VercelResponse object used to send the response.
 * @returns {Promise<void>} Responds with a JSON object containing the summary or an error message.
 *
 * @throws 400 - If the `content` field is missing in the request body.
 * @throws 500 - If there is an error communicating with the OpenAI API or other internal errors.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

  // Allow CORS in development
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { content } = req.body;

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OpenAI API key" });
  }

  try {
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that summarizes HTML content clearly and concisely.",
            },
            {
              role: "user",
              content: `Summarize this HTML content:\n\n${content}`,
            },
          ],
          temperature: 0.5,
        }),
      }
    );

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      return res
        .status(openaiRes.status)
        .json({ error: data.error.message || "OpenAI error" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("OpenAI error:", err);

    return res.status(500).json({
      error: "Unexpected error occurred while communicating with OpenAI",
    });
  }
}
