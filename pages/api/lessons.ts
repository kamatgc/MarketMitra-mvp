import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const lessons: Record<string, { id: string; title: string; content: string }> = {
  'lesson-1': {
    id: 'lesson-1',
    title: 'Stock Market Basics',
    content:
      'A stock represents fractional ownership in a company. Exchanges match buyers and sellers. Diversification reduces unsystematic risk.',
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id = 'lesson-1', lang = 'en' } = req.query
  const base = lessons[String(id)] ?? lessons['lesson-1']

  if (lang === 'en') return res.status(200).json(base)

  const text = `${base.title}\n\n${base.content}`
  const key = process.env.TRANSLATE_API_KEY

  if (!key) {
    return res.status(200).json({
      ...base,
      title: `[${lang}] ${base.title}`,
      content: `[${lang}] ${base.content}`,
    })
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${key}`
    const { data } = await axios.post(url, { q: text, target: lang, format: 'text' })
    const translated = data.data.translations[0].translatedText || text
    const [tTitle, tContent] = translated.split('\n\n')
    res.status(200).json({ ...base, title: tTitle || base.title, content: tContent || base.content })
  } catch {
    res.status(200).json({
      ...base,
      title: `[${lang}] ${base.title}`,
      content: `[${lang}] ${base.content}`,
    })
  }
}
