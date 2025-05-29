/**
 * API Route: /api/generate-domains
 *
 * Accepts a POST request with a prompt string and returns a JSON array of creative, available domain names.
 * Uses Google Gemini (Generative AI) to generate and check domain name availability.
 *
 * Expects the Google API key to be set in the environment as GOOGLE_GENERATIVE_AI_API_KEY.
 *
 * Handles Gemini's tendency to wrap JSON in markdown code blocks by extracting the JSON before returning.
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from '@ai-sdk/google';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Validate prompt
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    // Initialize Gemini model (text-only, fast version)
    const gemini = google('gemini-2.0-flash');
    const response = await gemini.doGenerate({
      inputFormat: 'messages',
      mode: { type: 'regular' },
      prompt: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt }
          ]
        }
      ]
    });
    // Extract JSON from markdown code block if present (Gemini sometimes wraps output)
    let json = response.text || '';
    const match = json.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (match) json = match[1];
    res.status(200).json({ text: json });
  } catch (e: any) {
    // Return error details to client
    res.status(500).json({ error: e.message || 'Something went wrong' });
  }
}
