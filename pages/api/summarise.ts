import type { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'
import pdf from 'pdf-parse'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36'

// Utility: clean up whitespace and invisible chars
function cleanText(str: string) {
  return str.replace(/\s+/g, ' ').replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
}

// Near-duplicate detection (80%+ similarity)
function isSimilar(a: string, b: string) {
  const al = a.toLowerCase(), bl = b.toLowerCase()
  if (al === bl) return true
  const minLen = Math.min(al.length, bl.length)
  let same = 0
  for (let i = 0; i < minLen; i++) if (al[i] === bl[i]) same++
  return same / minLen > 0.8
}

// ---------- HTML extraction ----------
async function fetchHtmlText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
  if (!res.ok) throw new Error(`HTML fetch failed: ${res.status} ${res.statusText}`)
  const html = await res.text()
  const $ = cheerio.load(html)
  $('script, style, noscript').remove()

  // Special handling for SEBI filings pages
  if (url.includes('sebi.gov.in/filings/')) {
    const bullets: string[] = []

    const title = cleanText($('h1').first().text())
    if (title) bullets.push(`Filing Title: ${title}`)

    const dateCat = cleanText($('h5').first().text())
    if (dateCat) bullets.push(`Date & Category: ${dateCat}`)

    const breadcrumb = $('.breadcrumb li')
      .map((_, el) => cleanText($(el).text()))
      .get()
      .filter(Boolean)
      .join(' > ')
    if (breadcrumb) bullets.push(`Category Path: ${breadcrumb}`)

    const desc = cleanText(
      $('p')
        .filter((_, el) => $(el).text().length > 40)
        .first()
        .text()
    )
    if (desc && !desc.toLowerCase().startsWith('securities and exchange board')) {
      bullets.push(`Summary: ${desc}`)
    }

    // Return as bullet list
    return bullets.map(b => `• ${b}`).join('\n')
  }

  // Fallback for non-SEBI HTML
  return cleanText($('body').text())
}

// ---------- PDF extraction with bullet formatting ----------
async function fetchPdfText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
  if (!res.ok) throw new Error(`PDF fetch failed: ${res.status} ${res.statusText}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const data = await pdf(buffer)

  let text = cleanText(data.text)

  // Split into candidate points
  let parts = text
    .split(/\s*\|\s*|\n+|\r+|\.\s+(?=[A-Z0-9])|(?<=\d)\s+(?=[A-Z])/)
    .map(p => cleanText(p))
    .filter(Boolean)

  // Remove duplicates, near-duplicates, and noise
  const filtered: string[] = []
  for (const p of parts) {
    if (
      p.length < 30 || // too short
      /^page\s+\d+/i.test(p) || // page numbers
      /sebi’s smart move/i.test(p) // boilerplate
    ) continue
    if (!filtered.some(f => isSimilar(f, p))) {
      filtered.push(p)
    }
  }

  // Limit to top 6 bullets
  const finalParts = filtered.slice(0, 6)

  // Add bullets
  return finalParts.map(p => `• ${p}`).join('\n')
}

// ---------- API handler ----------
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { text, url } = req.method === 'POST' ? req.body || {} : req.query || {}
    let content = ''

    if (text && typeof text === 'string') {
      content = text
    } else if (url && typeof url === 'string') {
      if (url.toLowerCase().endsWith('.pdf')) {
        content = await fetchPdfText(url)
      } else {
        content = await fetchHtmlText(url)
      }
    } else {
      return res.status(400).json({ error: 'No valid text or URL provided' })
    }

    if (!content) {
      return res.status(422).json({ error: 'Content could not be extracted from the source' })
    }

    // If already bullet formatted (SEBI or PDF case), return as is
    if (content.startsWith('•')) {
      return res.status(200).json({ summary: content })
    }

    // Generic fallback summary
    const summary = content.length > 600 ? content.slice(0, 600) + '...' : content
    return res.status(200).json({ summary })
  } catch (err: any) {
    console.error('[summarise] error:', err?.message || err)
    return res.status(500).json({ error: err.message || 'Internal Server Error' })
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '15mb' } },
}
