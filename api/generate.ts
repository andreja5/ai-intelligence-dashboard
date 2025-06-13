import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS in development
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json({ message: "Prompt is required and must be a string." });
  }

  // Simulate some processing delay
  setTimeout(() => {
    const fakeTitle = `Draft: ${prompt.slice(0, 30)}...`;
    const fakeContent = `<p>This is a generated report based on: <strong>${prompt}</strong></p>`;

    res.status(200).json({ title: fakeTitle, content: fakeContent });
  }, 500); // delay of 500ms to simulate processing time
}
