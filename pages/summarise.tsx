import { useState } from 'react'
import axios from 'axios'

export default function Summarise() {
  const [url, setUrl] = useState('')
  const [lang, setLang] = useState('en')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runSummarise = async () => {
    setLoading(true)
    setError(null)
    setSummary('')
    try {
      const res = await axios.post('/api/summarise', { url, lang })
      setSummary(res.data.summary)
    } catch (e: any) {
      setError(e?.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Summarise an Article</h1>
      <div className="flex flex-col gap-2 mb-4">
        <input
          className="border rounded p-2"
          placeholder="Paste SEBI/NISM article URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border rounded p-2"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="kn">Kannada</option>
          <option value="ta">Tamil</option>
        </select>
        <button
          onClick={runSummarise}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Summarise
        </button>
      </div>

      {loading && <p>Summarising...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {summary && (
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{summary}</pre>
      )}
    </main>
  )
}
