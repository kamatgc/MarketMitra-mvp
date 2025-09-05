import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text, target } = req.body ?? {}
  const key = process.env.TRANSLATE_API_KEY

  if (!text || !target) {
    return res.status(400).json({ error: 'text and target required' })
  }

  if (!key) {
    return res.status(200).json({ translatedText: `[${target}] ${text}` })
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${key}`
    const { data } = await axios.post(url, { q: text, target, format: 'text' })
    res.status(200).json({ translatedText: data.data.translations[0].translatedText })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
