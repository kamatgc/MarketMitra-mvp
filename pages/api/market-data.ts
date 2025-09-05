import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol = 'TCS.NS' } = req.query
  const alphaKey = process.env.ALPHA_VANTAGE_API_KEY

  const demoPrice = (base = 1000) => {
    const variance = Math.random() * 50 - 25
    return Number((base + variance).toFixed(2))
  }

  // 1️⃣ Try Yahoo Finance (LIVE)
  try {
    const yahooSymbol = symbol.toString().replace('.NSE', '.NS').replace('.BSE', '.BO')
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1m&range=1d`
    const { data } = await axios.get(yahooUrl, { timeout: 8000 })

    const result = data?.chart?.result?.[0]
    if (result) {
      const meta = result.meta
      const current = meta.regularMarketPrice
      const open = meta.chartPreviousClose
      const high = Math.max(...(result.indicators.quote[0].high.filter((v: number) => v != null)))
      const low = Math.min(...(result.indicators.quote[0].low.filter((v: number) => v != null)))
      const close = result.indicators.quote[0].close.filter((v: number) => v != null).slice(-1)[0]
      const high52 = meta.fiftyTwoWeekHigh || high
      const low52 = meta.fiftyTwoWeekLow || low

      return res.status(200).json({
        current, open, high, low, close, high52, low52,
        source: 'LIVE'
      })
    }
  } catch (err) {
    console.error('Yahoo Finance fetch failed, falling back to Alpha Vantage:', err?.message)
  }

  // 2️⃣ Alpha Vantage (EOD)
  if (alphaKey) {
    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${alphaKey}`
      const { data } = await axios.get(url, { timeout: 10000 })

      const series = data?.['Time Series (Daily)']
      if (series) {
        const dates = Object.keys(series).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        const latest = series[dates[0]]

        const current = parseFloat(latest['4. close'])
        const open = parseFloat(latest['1. open'])
        const high = parseFloat(latest['2. high'])
        const low = parseFloat(latest['3. low'])
        const close = parseFloat(latest['4. close'])

        let high52 = -Infinity
        let low52 = Infinity
        for (let i = 0; i < Math.min(dates.length, 252); i++) {
          const day = series[dates[i]]
          const h = parseFloat(day['2. high'])
          const l = parseFloat(day['3. low'])
          if (h > high52) high52 = h
          if (l < low52) low52 = l
        }

        return res.status(200).json({
          current, open, high, low, close, high52, low52,
          source: 'EOD'
        })
      }
    } catch (err) {
      console.error('Alpha Vantage fetch failed:', err?.message)
    }
  }

  // 3️⃣ Simulated fallback
  return res.status(200).json({
    current: demoPrice(),
    open: demoPrice(),
    high: demoPrice() + 10,
    low: demoPrice() - 10,
    close: demoPrice(),
    high52: demoPrice() + 200,
    low52: demoPrice() - 200,
    source: 'SIMULATED'
  })
}



