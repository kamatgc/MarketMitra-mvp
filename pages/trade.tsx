import { useEffect, useState } from 'react'
import Select from 'react-select'
import { nifty50Symbols, OptionType } from '../trade_content/nifty50'
import { isMarketOpen } from '../trade_content/marketUtils'

type PriceData = {
  current: number
  open: number
  high: number
  low: number
  close: number
  week52High: number
  week52Low: number
  lastUpdated?: string
}

export default function Trade() {
  const [selectedStock, setSelectedStock] = useState<OptionType>(nifty50Symbols[0])
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [marketOpen, setMarketOpen] = useState<boolean>(isMarketOpen())
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const fetchPriceData = async () => {
    try {
      setLoading(true)
      setError('')

      // Call our own API route to bypass CORS
      const res = await fetch(`/api/quote?symbol=${encodeURIComponent(selectedStock.value)}`)
      if (!res.ok) throw new Error('API request failed')

      const data = await res.json()
      const result = data?.chart?.result?.[0]
      if (!result) throw new Error('No data returned for this symbol')

      const meta = result.meta
      const quoteData = result.indicators?.quote?.[0]
      const timestamps = result.timestamp

      let openVal: number | undefined
      let closeVal: number | undefined

      if (quoteData && timestamps && timestamps.length > 0) {
        const lastIndex = timestamps.length - 1
        openVal = quoteData.open?.[lastIndex]
        closeVal = quoteData.close?.[lastIndex]
      }

      const priceObj: PriceData = {
        current: meta.regularMarketPrice,
        open: openVal ?? meta.regularMarketOpen ?? 0,
        high: meta.regularMarketDayHigh,
        low: meta.regularMarketDayLow,
        close: closeVal ?? meta.previousClose ?? 0,
        week52High: meta.fiftyTwoWeekHigh,
        week52Low: meta.fiftyTwoWeekLow,
        lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }

      setPriceData(priceObj)
    } catch (e) {
      console.error(e)
      setError('Failed to fetch price data. Please try again.')
      setPriceData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPriceData()
    const interval = setInterval(() => {
      setMarketOpen(isMarketOpen())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetchPriceData()
  }, [selectedStock])

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Trading Simulator</h1>

      <div className="flex items-center gap-2 mb-4">
        <Select<OptionType, false>
          value={selectedStock}
          onChange={(opt) => opt && setSelectedStock(opt)}
          options={nifty50Symbols}
          className="w-64"
          isSearchable
          placeholder="Select a stock..."
        />
        <button
          type="button"
          onClick={fetchPriceData}
          className="bg-green-500 text-white px-3 py-1 rounded"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-3 text-red-600 text-sm">{error}</div>
      )}

      {priceData && (
        <div className="text-center max-w-md w-full">
          <h2 className="text-xl font-bold">
            ₹{priceData.current.toFixed(2)}{' '}
            {marketOpen ? (
              <span className="text-green-600">LIVE</span>
            ) : (
              <span className="text-gray-500">Market Closed</span>
            )}
          </h2>

          {priceData.lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">Last updated: {priceData.lastUpdated}</p>
          )}

          <hr className="my-3" />

          <ul className="mt-2 text-sm grid grid-cols-2 gap-y-1">
            <li><span className="text-gray-500">Open:</span> ₹{priceData.open}</li>
            <li><span className="text-gray-500">High:</span> ₹{priceData.high}</li>
            <li><span className="text-gray-500">Low:</span> ₹{priceData.low}</li>
            <li><span className="text-gray-500">Close:</span> ₹{priceData.close}</li>
            <li><span className="text-gray-500">52-Week High:</span> ₹{priceData.week52High}</li>
            <li><span className="text-gray-500">52-Week Low:</span> ₹{priceData.week52Low}</li>
          </ul>
        </div>
      )}
    </div>
  )
}
