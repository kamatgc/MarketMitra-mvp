import { useState } from 'react'

export default function SummarisePage() {
  const [userInput, setUserInput] = useState('')
  const [language, setLanguage] = useState('English')
  const [summary, setSummary] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isLikelyUrl = (s: string) => {
    const v = s.trim()
    return /^https?:\/\//i.test(v) || /^[a-z0-9.-]+\.[a-z]{2,}/i.test(v)
  }

  const handleSummarise = async () => {
    setError('')
    setSummary('')
    setLoading(true)

    try {
      const payload = isLikelyUrl(userInput)
        ? { url: userInput.trim() }
        : { text: userInput.trim() }

      const res = await fetch('/api/summarise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `Request failed with status ${res.status}`)
      }

      const data = await res.json()
      setSummary(data.summary || '')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Summarise an Article</h1>

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Paste article text or link here"
        className="border p-2 rounded w-full"
      />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="English">English</option>
      </select>

      <button
        onClick={handleSummarise}
        disabled={loading || !userInput.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Summarising...' : 'Summarise'}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {summary && (
        <div className="border p-3 rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Summary:</h2>
          <div className="flex flex-col">
            {summary.split('\n').map((line, idx) => (
              <div
                key={idx}
                className={`px-2 py-1 whitespace-pre-wrap border-l-4 ${
                  idx % 2 === 0
                    ? 'bg-white border-blue-300'
                    : 'bg-gray-100 border-blue-200'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
