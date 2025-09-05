import { Module } from './types'

export const module2_instruments: Module = {
  id: 'financial-instruments',
  title: 'Module 2: Overview of Financial Instruments',
  lessons: [
    {
      id: 'basic-instruments',
      title: 'Basic instruments',
      intro: 'Beginner-friendly investment options with clear structures and goals.',
      keyPoints: [
        'Equity (Stocks) — ownership in companies.',
        'Mutual Funds — pooled investments (active, passive, index).',
        'Fixed Deposits — fixed interest, low risk.',
        'Bonds/Debentures — borrowings by entities.',
        'PPF — long-term, tax-efficient savings.',
        'ETFs — funds traded on exchanges.'
      ],
      exampleLabel: 'Tip',
      example: 'Use index funds/ETFs to get diversified market exposure at low cost.',
      estimatedTime: '6 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Which is typically low risk and fixed return?',
          options: ['Equity', 'Fixed Deposit', 'Commodity futures'],
          answer: 1
        }
      ]
    },
    {
      id: 'intermediate-instruments',
      title: 'Intermediate instruments',
      intro: 'SIPs, REITs/InvITs, and basic derivatives add tools for different goals.',
      keyPoints: [
        'SIP — invest fixed amounts regularly into a fund.',
        'REITs/InvITs — exposure to real estate/infrastructure income.',
        'Derivatives — contracts based on underlying assets (intro only).'
      ],
      exampleLabel: 'Example',
      example: 'SIP is like a monthly subscription to your future wealth — small steps, long journey.',
      estimatedTime: '5 min',
      difficulty: 'Intermediate',
      quiz: [
        {
          question: 'SIP stands for:',
          options: ['Systematic Investment Plan', 'Single Immediate Payment', 'Scheduled Interest Payout'],
          answer: 0
        }
      ]
    },
    {
      id: 'avoid-initially',
      title: 'Instruments to avoid initially',
      intro: 'Highly risky or complex instruments are better left for later.',
      keyPoints: [
        'Penny stocks — illiquid, volatile.',
        'High-frequency trading — advanced infrastructure needed.',
        'F&O — leverage can amplify losses.'
      ],
      exampleLabel: 'Caution',
      example: 'Learning to drive starts in a parking lot, not on a racetrack — same with complex products.',
      estimatedTime: '4 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Which is generally NOT recommended for beginners?',
          options: ['Index funds', 'Penny stocks', 'PPF'],
          answer: 1
        }
      ]
    }
  ]
}
