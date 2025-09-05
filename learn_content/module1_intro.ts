import { Module } from './types'

export const module1_intro: Module = {
  id: 'intro-investing',
  title: 'Module 1: Introduction to Investing',
  lessons: [
    {
      id: 'what-is-investing',
      title: 'What is investing?',
      intro: 'Investing means putting your money into assets with the goal of growing it over time.',
      keyPoints: [
        'Saving is storing money safely; investing puts money to work with some risk.',
        'Common assets: stocks, bonds, real estate, gold.',
        'Goal: beat inflation and build wealth.'
      ],
      exampleLabel: 'Example',
      example: 'Planting a tree today to enjoy shade and fruit years later.',
      estimatedTime: '5 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Which is an example of investing?',
          options: ['Keeping cash under a pillow', 'Buying shares of a company', 'Spending on a vacation'],
          answer: 1
        }
      ]
    },
    {
      id: 'why-invest',
      title: 'Why should you invest?',
      intro: 'Investing helps your money grow and protects it from inflation.',
      keyPoints: [
        'Beat inflation — prices rise over time.',
        'Create wealth for goals like retirement, home, education.',
        'Achieve financial independence.'
      ],
      exampleLabel: 'Example',
      example: 'If inflation is 6% and savings earn 4%, you’re losing value each year.',
      estimatedTime: '4 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'A key reason to invest is to:',
          options: ['Avoid all risk', 'Beat inflation', 'Spend faster'],
          answer: 1
        }
      ]
    }
  ]
}
