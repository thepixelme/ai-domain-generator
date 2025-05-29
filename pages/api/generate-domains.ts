import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from '@ai-sdk/google';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  // The API key should be set in the environment, not passed to google()
  // Use the correct model ID for Gemini
  try {
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
    // Try to parse a JSON array from the first code block in the response
    let json = response.text || '';
    // Extract JSON from code block if present
    const match = json.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (match) json = match[1];
    res.status(200).json({ text: json });
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Something went wrong' });
  }
}
