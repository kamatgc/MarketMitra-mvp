import { useState, useMemo, useEffect } from 'react'
import { translations } from '../learn_content'
import { Module } from '../learn_content/types'

type LangKey = 'en' | 'hi' | 'kn' | 'ta'

export default function Learn() {
  const [lang, setLang] = useState<LangKey>('en')
  const [openModuleId, setOpenModuleId] = useState<string | null>(null)
  const [openLessonId, setOpenLessonId] = useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({})
  const [quizFeedback, setQuizFeedback] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState('')

  // Restore last selected language
  useEffect(() => {
    try {
      const saved = localStorage.getItem('learn.lang') as LangKey | null
      if (saved && ['en', 'hi', 'kn', 'ta'].includes(saved)) setLang(saved)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('learn.lang', lang)
    } catch {}
  }, [lang])

  // Load modules by selected language
  const modules: Module[] = translations[lang]

  // Overall progress
  const totalLessons = useMemo(
    () => modules.reduce((sum, m) => sum + m.lessons.length, 0),
    [modules]
  )

  const completedLessons = useMemo(() => {
    let count = 0
    for (const m of modules) {
      for (const l of m.lessons) {
        const allCorrect = l.quiz.every(
          (_, qi) => quizFeedback[`${m.id}|${l.id}-${qi}`] === '✅ Correct!'
        )
        if (allCorrect) count++
      }
    }
    return count
  }, [modules, quizFeedback])

  // Per-module progress
  const getModuleProgress = (mod: Module) => {
    const completed = mod.lessons.filter(l =>
      l.quiz.every((_, qi) => quizFeedback[`${mod.id}|${l.id}-${qi}`] === '✅ Correct!')
    ).length
    return {
      completed,
      total: mod.lessons.length,
      percent: Math.round((completed / mod.lessons.length) * 100)
    }
  }

  // UI handlers
  const toggleModule = (moduleId: string) => {
    setOpenModuleId(prev => (prev === moduleId ? null : moduleId))
    setOpenLessonId(null)
  }

  const toggleLesson = (lessonId: string) => {
    setOpenLessonId(prev => (prev === lessonId ? null : lessonId))
  }

  const handleQuizAnswer = (
    moduleId: string,
    lessonId: string,
    questionIndex: number,
    optionIndex: number
  ) => {
    const key = `${moduleId}|${lessonId}-${questionIndex}`
    setQuizAnswers(prev => ({ ...prev, [key]: optionIndex }))

    const lesson = modules.find(m => m.id === moduleId)?.lessons.find(l => l.id === lessonId)
    const correct = lesson?.quiz?.[questionIndex]?.answer
    setQuizFeedback(prev => ({
      ...prev,
      [key]: optionIndex === correct ? '✅ Correct!' : '❌ Try again.'
    }))
  }

  // Search across lessons
  const filteredModules = useMemo(() => {
    if (!searchTerm.trim()) return modules
    const term = searchTerm.toLowerCase()
    return modules
      .map(m => ({
        ...m,
        lessons: m.lessons.filter(
          l =>
            l.title.toLowerCase().includes(term) ||
            l.intro.toLowerCase().includes(term) ||
            l.keyPoints.some(kp => kp.toLowerCase().includes(term))
        )
      }))
      .filter(m => m.lessons.length > 0)
  }, [modules, searchTerm])

  return (
    <main className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <h1 className="text-2xl font-bold">Learn — Your Stock Market Guide</h1>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as LangKey)}
          className="border rounded px-2 py-1"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="ta">தமிழ்</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Search lessons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-3 py-1 w-full mb-4"
      />

      <p className="mb-4 text-gray-700">
        Overall Progress: {completedLessons} / {totalLessons} lessons completed
      </p>

      {filteredModules.map((mod) => {
        const progress = getModuleProgress(mod)
        return (
          <div key={mod.id} className="border rounded mb-4 overflow-hidden">
            <button
              onClick={() => toggleModule(mod.id)}
              className="w-full text-left px-4 py-2 bg-gray-200 font-semibold"
            >
              {mod.title}
            </button>

            {/* Per-module progress bar */}
            <div className="px-4 py-2 bg-gray-50">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{progress.completed} / {progress.total} lessons completed</span>
                <span>{progress.percent}%</span>
              </div>
              <div className="w-full bg-gray-300 h-2 rounded">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${progress.percent}%` }}
                ></div>
              </div>
            </div>

            {openModuleId === mod.id && (
              <div className="p-2">
                {mod.lessons.map((lesson) => {
                  const isOpen = openLessonId === lesson.id
                  const lessonKeyBase = `${mod.id}|${lesson.id}`

                  return (
                    <div key={lesson.id} className="border rounded mb-2 overflow-hidden">
                      <button
                        onClick={() => toggleLesson(lesson.id)}
                        className="w-full text-left px-4 py-2 bg-gray-100 flex justify-between items-center"
                      >
                        <span>{lesson.title}</span>
                        <span className="text-xs text-gray-600">
                          {lesson.estimatedTime} • {lesson.difficulty}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="p-4 space-y-3">
                          <p>{lesson.intro}</p>
                          <ul className="list-disc list-inside">
                            {lesson.keyPoints.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                          <p className="italic">
                            {lesson.exampleLabel}: {lesson.example}
                          </p>

                          {lesson.quiz.map((q, qi) => {
                            const key = `${lessonKeyBase}-${qi}`
                            const selected = quizAnswers[key]
                            const feedback = quizFeedback[key]
                            return (
                              <div key={qi} className="mt-4">
                                <p className="font-semibold">{q.question}</p>
                                {q.options.map((opt, oi) => (
                                  <button
                                    key={oi}
                                    onClick={() => handleQuizAnswer(mod.id, lesson.id, qi, oi)}
                                    className={`block w-full text-left px-3 py-1 mt-1 border rounded ${
                                      selected === oi ? 'bg-blue-100' : 'bg-white'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                                {feedback && <p className="mt-1">{feedback}</p>}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </main>
  )
}
