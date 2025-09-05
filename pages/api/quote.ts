import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query
  if (!symbol || typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Symbol is required' })
  }

  try {
    const yahooSymbol = symbol.replace('.NSE', '') + '.NS'
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?region=IN&interval=1d`

    const response = await fetch(yahooUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    })

    if (!response.ok) {
      throw new Error(`Yahoo API error: ${response.status}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch data' })
  }
}
