import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { text } = req.body || {}

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' })
    }

    // Simple placeholder summary logic for MVP
    const summary =
      text.length > 100 ? text.slice(0, 100) + '...' : text

    res.status(200).json({ summary })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
