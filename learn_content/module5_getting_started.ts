import { Module } from './types'

export const module5_getting_started: Module = {
  id: 'getting-started',
  title: 'Module 5: How to Start Investing — Step-by-step',
  lessons: [
    {
      id: 'accounts-docs',
      title: 'PAN, KYC, Bank, Demat & Trading',
      intro: 'Complete KYC and set up linked bank, Demat (hold shares), and trading (place orders) accounts.',
      keyPoints: [
        'PAN and KYC are mandatory.',
        'Demat stores securities; trading executes orders.',
        'Use reputable brokers.'
      ],
      exampleLabel: 'Tip',
      example: 'Verify your broker is registered and check onboarding fees before proceeding.',
      estimatedTime: '5 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Demat accounts are primarily for:',
          options: ['Holding securities', 'Placing market orders', 'Paying taxes'],
          answer: 0
        }
      ]
    },
    {
      id: 'choose-broker',
      title: 'Choosing a broker and platforms',
      intro: 'Discount vs. full-service; compare fees, features, reliability, and support.',
      keyPoints: [
        'Discount: low fees, DIY tools.',
        'Full-service: research + advisory at higher cost.',
        'Test app/web usability before funding.'
      ],
      exampleLabel: 'Tip',
      example: 'Open with one primary broker; add a backup later for redundancy.',
      estimatedTime: '4 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'A key factor when choosing a broker is:',
          options: ['Logo color', 'Platform reliability and fees', 'Celebrity ads'],
          answer: 1
        }
      ]
    }
  ]
}
