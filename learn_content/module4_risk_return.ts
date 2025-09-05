import { Module } from './types'

export const module4_risk_return: Module = {
  id: 'risk-return',
  title: 'Module 4: Risk and Return',
  lessons: [
    {
      id: 'risk-types',
      title: 'What is risk? Types of risk',
      intro: 'Risk is the chance of losing money or not meeting goals.',
      keyPoints: [
        'Market risk (systematic) affects most assets.',
        'Credit risk: borrower may default.',
        'Liquidity risk: hard to sell quickly at fair price.'
      ],
      exampleLabel: 'Analogy',
      example: 'Weather risk vs. umbrella (diversification) — you can’t stop rain, but can prepare.',
      estimatedTime: '5 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Liquidity risk means:',
          options: ['Risk of default by borrower', 'Difficulty selling at a fair price quickly', 'Risk of fraud by broker'],
          answer: 1
        }
      ]
    },
    {
      id: 'risk-vs-reward',
      title: 'Risk vs. reward and comfort zone',
      intro: 'Higher potential returns usually come with higher risk. Choose based on goals and comfort.',
      keyPoints: [
        'Match investments to time horizon and risk tolerance.',
        'Use simple questionnaires to gauge tolerance.',
        'Review annually as life changes.'
      ],
      exampleLabel: 'Tip',
      example: 'Short-term money should stay in low-risk instruments; long-term money can take more risk.',
      estimatedTime: '4 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Generally, higher expected return comes with:',
          options: ['Lower risk', 'Higher risk', 'No risk'],
          answer: 1
        }
      ]
    },
    {
      id: 'diversification-allocation',
      title: 'Diversification and asset allocation',
      intro: 'Spreading across assets and sectors reduces the impact of any single setback.',
      keyPoints: [
        'Mix stocks, bonds, gold, etc.',
        '8–12 diversified stocks can help reduce risk.',
        'Rebalance periodically.'
      ],
      exampleLabel: 'Analogy',
      example: 'Don’t put all your eggs in one basket — balance multiple baskets.',
      estimatedTime: '5 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Diversification primarily aims to:',
          options: ['Increase fees', 'Reduce risk', 'Avoid taxes'],
          answer: 1
        }
      ]
    }
  ]
}
