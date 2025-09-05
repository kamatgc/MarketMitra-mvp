import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import * as cheerio from 'cheerio'
import pdf from 'pdf-parse'

const MAX_CHARS = 4000 // adjust chunk size as needed

// Demo fallback summaries in multiple languages
const demoSummaries: Record<string, string[]> = {
  en: [
    '• Understand risks and disclosures before investing.',
    '• Avoid unverified tips; use registered advisors.',
    '• Diversify across sectors and asset classes.',
    '• Use SIPs and asset allocation for discipline.',
    '• Review and rebalance periodically.'
  ],
  hi: [
    '• निवेश से पहले जोखिम और खुलासों को समझें।',
    '• अप्रमाणित सुझावों से बचें; पंजीकृत सलाहकारों का उपयोग करें।',
    '• क्षेत्रों और परिसंपत्ति वर्गों में विविधता लाएं।',
    '• अनुशासन के लिए SIP और परिसंपत्ति आवंटन का उपयोग करें।',
    '• समय-समय पर समीक्षा और पुनर्संतुलन करें।'
  ],
  kn: [
    '• ಹೂಡಿಕೆಗೆ ಮೊದಲು ಅಪಾಯಗಳು ಮತ್ತು ಬಹಿರಂಗಪಡಿಸುವಿಕೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
    '• ಪರಿಶೀಲಿಸದ ಸಲಹೆಗಳನ್ನು ತಪ್ಪಿಸಿ; ನೋಂದಾಯಿತ ಸಲಹೆಗಾರರನ್ನು ಬಳಸಿ.',
    '• ವಲಯಗಳು ಮತ್ತು ಆಸ್ತಿ ವರ್ಗಗಳಲ್ಲಿ ವೈವಿಧ್ಯತೆ ತಂದುಕೊಳ್ಳಿ.',
    '• ಶಿಸ್ತುಗಾಗಿ SIP ಮತ್ತು ಆಸ್ತಿ ಹಂಚಿಕೆಯನ್ನು ಬಳಸಿ.',
    '• ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮರುಸಮತೋಲನಗೊಳಿಸಿ.'
  ],
  ta: [
    '• முதலீட்டுக்கு முன் அபாயங்கள் மற்றும் வெளிப்பாடுகளைப் புரிந்துகொள்ளுங்கள்.',
    '• சரிபார்க்கப்படாத குறிப்புகளை தவிர்க்கவும்; பதிவு செய்யப்பட்ட ஆலோசகர்களைப் பயன்படுத்தவும்.',
    '• துறைகள் மற்றும் சொத்து வகைகளில் பன்முகப்படுத்தவும்.',
    '• ஒழுக்கத்திற்காக SIP மற்றும் சொத்து ஒதுக்கீட்டை பயன்படுத்தவும்.',
    '• காலம்தோறும் மதிப்பாய்வு செய்து மீண்டும் சமநிலைப்படுத்தவும்.'
  ]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url, lang = 'en' } = req.body ?? {}
  const geminiKey = process.env.PALM_API_KEY
  const translateKey = process.env.TRANSLATE_API_KEY

  if (!url) {
    return res.status(400).json({ error: 'url required' })
  }

  // DEMO MODE safeguard — if no Gemini key, return mock summary in requested language
  if (!geminiKey) {
    const summary = demoSummaries[lang] || demoSummaries.en
    return res.status(200).json({ summary: summary.join('\n') })
  }

  let mainText = ''

  // 1️⃣ Extract text from PDF or HTML
  try {
    if (url.toLowerCase().endsWith('.pdf')) {
      const { data: pdfBuffer } = await axios.get<ArrayBuffer>(url, {
        responseType: 'arraybuffer',
        timeout: 20000,
      })
      const parsed = await pdf(Buffer.from(pdfBuffer))
      mainText = (parsed.text || '').replace(/\s+/g, ' ').trim()
    } else {
      const { data: html } = await axios.get(url, { timeout: 15000 })
      const $ = cheerio.load(html)
      mainText = $('article').text() || $('main').text() || $('body').text()
      mainText = mainText.replace(/\s+/g, ' ').trim()
    }
  } catch {
    mainText = ''
  }

  // 2️⃣ Fallback if no text extracted
  if (!mainText) {
    const summary = demoSummaries[lang] || demoSummaries.en
    return res.status(200).json({ summary: summary.join('\n') })
  }

  // 3️⃣ Split into chunks if too long
  const chunks: string[] = []
  for (let i = 0; i < mainText.length; i += MAX_CHARS) {
    chunks.push(mainText.slice(i, i + MAX_CHARS))
  }

  // 4️⃣ Summarise each chunk in English (5 bullet points)
  const chunkSummaries: string[] = []
  for (const chunk of chunks) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`
      const { data } = await axios.post(endpoint, {
        contents: [
          {
            parts: [
              {
                text: `Summarise the following text in 5 concise bullet points:\n${chunk}`
              }
            ]
          }
        ]
      })
      const summaryText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
      if (summaryText) chunkSummaries.push(summaryText)
    } catch (err: any) {
      console.error('Gemini chunk error:', err?.response?.data || err.message)
    }
  }

  // 5️⃣ Merge chunk summaries into one final 5‑point summary
  let finalSummary = chunkSummaries.join('\n')
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`
    const { data } = await axios.post(endpoint, {
      contents: [
        {
          parts: [
            {
              text: `Combine the following summaries into a single summary in 5 concise bullet points:\n${finalSummary}`
            }
          ]
        }
      ]
    })
    finalSummary =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || finalSummary
  } catch (err: any) {
    console.error('Gemini merge error:', err?.response?.data || err.message)
  }

  // 6️⃣ Translate if needed
  if (lang !== 'en') {
    if (!translateKey) {
      // No Translate key — return demo translation if available
      const summary = demoSummaries[lang] || [`[${lang}] ${finalSummary}`]
      return res.status(200).json({ summary: summary.join('\n') })
    }
    try {
      const translateUrl = `https://translation.googleapis.com/language/translate/v2?key=${translateKey}`
      const { data } = await axios.post(translateUrl, {
        q: finalSummary,
        target: lang,
        format: 'text'
      })
      const translated = data.data.translations[0].translatedText
      return res.status(200).json({ summary: translated })
    } catch (err: any) {
      console.error('Translation error:', err?.response?.data || err.message)
      return res.status(200).json({ summary: `[${lang}] ${finalSummary}` })
    }
  }

  // 7️⃣ Return English summary if no translation needed
  return res.status(200).json({ summary: finalSummary })
}



