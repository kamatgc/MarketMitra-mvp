import { Module } from './types'

export const module7_beginner_strategies: Module = {
  id: 'beginner-strategies',
  title: 'Module 7: Investment Strategies for Beginners',
  lessons: [
    {
      id: 'sip',
      title: 'SIP — systematic investment plan',
      intro: 'Automate regular investing to average costs and build discipline.',
      keyPoints: [
        'Reduces timing stress.',
        'Compounds over long horizons.',
        'Pause/adjust based on goals.'
      ],
      exampleLabel: 'Example',
      example: 'Like monthly EMIs — but for your future portfolio.',
      estimatedTime: '4 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'A benefit of SIP is:',
          options: ['Guaranteed return', 'Cost averaging and discipline', 'No market risk'],
          answer: 1
        }
      ]
    },
    {
      id: 'value-growth',
      title: 'Value vs. growth; long-term vs. trading; goal-based',
      intro: 'Pick approaches that suit your temperament and goals.',
      keyPoints: [
        'Value: buy undervalued businesses.',
        'Growth: focus on expanding earnings.',
        'Align with long-term goals like retirement or education.'
      ],
      exampleLabel: 'Tip',
      example: 'Write your goal, horizon, and rules — review quarterly.',
      estimatedTime: '5 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Value investing generally seeks:',
          options: ['High P/E glamour stocks', 'Undervalued companies', 'Day-trade momentum'],
          answer: 1
        }
      ]
    }
  ]
}
