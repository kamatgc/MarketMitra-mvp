import { Module } from './types'

export const module8_avoid_mistakes: Module = {
  id: 'avoid-mistakes',
  title: 'Module 8: Avoiding Common Mistakes',
  lessons: [
    {
      id: 'common-traps',
      title: 'Herd mentality, tips vs. research, timing vs. time',
      intro: 'Avoid psychological traps and unreliable information.',
      keyPoints: [
        'Do your own research; verify sources.',
        'Time in the market beats timing the market (for most).',
        'Set rules to avoid FOMO and panic selling.'
      ],
      exampleLabel: 'Caution',
      example: 'If a tip promises “guaranteed returns,” consider it a red flag.',
      estimatedTime: '4 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'A common red flag is:',
          options: ['Audited annual reports', 'Guaranteed returns pitch', 'SEBI advisories'],
          answer: 1
        }
      ]
    },
    {
      id: 'scams',
      title: 'Pump & dump, ponzi schemes',
      intro: 'Recognize and avoid fraudulent schemes.',
      keyPoints: [
        'Pump & dump: hype a stock, exit at top, others left with losses.',
        'Ponzi: pay old investors with new money — collapses eventually.',
        'Check registrations and beware pressure tactics.'
      ],
      exampleLabel: 'Tip',
      example: 'Cross-check advisor/broker registrations on official portals.',
      estimatedTime: '5 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Ponzi schemes typically:',
          options: ['Invest mainly in index funds', 'Use new money to pay old investors', 'Are regulated by SEBI'],
          answer: 1
        }
      ]
    }
  ]
}
