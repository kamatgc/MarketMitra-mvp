import { Module } from './types'

export const module6_analyzing_stocks: Module = {
  id: 'analyzing-stocks',
  title: 'Module 6: How to Analyze a Stock (Basics)',
  lessons: [
    {
      id: 'statements-basics',
      title: 'Balance sheet, income statement, cash flow',
      intro: 'Three core statements show assets/liabilities, profits, and cash movements.',
      keyPoints: [
        'Balance sheet = snapshot of financial health.',
        'Income statement = profitability over a period.',
        'Cash flow = cash in/out (operations, investing, financing).'
      ],
      exampleLabel: 'Example',
      example: 'Profits can look good, but cash flow reveals true liquidity.',
      estimatedTime: '6 min',
      difficulty: 'Intermediate',
      quiz: [
        {
          question: 'Which statement shows cash movements?',
          options: ['Balance sheet', 'Cash flow statement', 'Notes to accounts'],
          answer: 1
        }
      ]
    },
    {
      id: 'ratios-quick',
      title: 'EPS, P/E, ROE, Dividend Yield',
      intro: 'Simple ratios help compare companies quickly.',
      keyPoints: [
        'EPS: earnings per share.',
        'P/E: price vs earnings (valuation signal).',
        'ROE: return on equity (efficiency).',
        'Dividend Yield: income vs price.'
      ],
      exampleLabel: 'Tip',
      example: 'Compare ratios within the same sector and context, not in isolation.',
      estimatedTime: '5 min',
      difficulty: 'Intermediate',
      quiz: [
        {
          question: 'P/E ratio compares price to:',
          options: ['Revenue', 'Earnings', 'Assets'],
          answer: 1
        }
      ]
    },
    {
      id: 'fundamental-vs-technical',
      title: 'Fundamentals vs. technicals — what to know',
      intro: 'Fundamentals study business strength; technicals study price/volume patterns.',
      keyPoints: [
        'Beginners benefit from fundamentals first.',
        'Technicals help with timing.',
        'Use both thoughtfully, avoid overfitting.'
      ],
      exampleLabel: 'Tip',
      example: 'Strong fundamentals + simple trend confirmation can improve conviction.',
      estimatedTime: '4 min',
      difficulty: 'Intermediate',
      quiz: [
        {
          question: 'Technicals primarily focus on:',
          options: ['Financial statements', 'Price and volume', 'Board meetings'],
          answer: 1
        }
      ]
    }
  ]
}
