export type QuizItem = {
    question: string
    options: string[]
    answer: number
  }
  
  export type Lesson = {
    id: string
    title: string
    intro: string
    keyPoints: string[]
    exampleLabel: string
    example: string
    estimatedTime: string
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
    quiz: QuizItem[]
  }
  
  export type Module = {
    id: string
    title: string
    lessons: Lesson[]
  }
  