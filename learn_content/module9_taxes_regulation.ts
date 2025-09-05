import { Module } from './types'

export const module9_taxes_regulation: Module = {
  id: 'taxes-regulation',
  title: 'Module 9: Understanding Taxes & Regulations',
  lessons: [
    {
      id: 'capital-gains',
      title: 'Capital gains and dividends — basics',
      intro: 'Know the broad differences between short-term/long-term capital gains and how dividends are taxed.',
      keyPoints: [
        'Short-term vs long-term capital gains differ by holding period.',
        'Dividends are taxable to the investor.',
        'Keep records for smooth filing and compliance.'
      ],
      exampleLabel: 'Tip',
      example: 'Consult official resources or a tax professional for current slabs/rules.',
      estimatedTime: '5 min',
      difficulty: 'Intermediate',
      quiz: [
        {
          question: 'Capital gains tax depends primarily on:',
          options: ['Broker logo', 'Holding period and asset type', 'App theme color'],
          answer: 1
        }
      ]
    },
    {
      id: 'sebi-role',
      title: 'SEBI’s role and investor protection',
      intro: 'SEBI sets rules, monitors markets, and acts against violations to protect investors.',
      keyPoints: [
        'Registration for intermediaries is mandatory.',
        'Disclosure norms and market surveillance.',
        'Investor protection and grievance mechanisms.'
      ],
      exampleLabel: 'Tip',
      example: 'Know where to file complaints and how to verify registrations.',
      estimatedTime: '4 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'SEBI is primarily a:',
          options: ['Private broker', 'Market regulator', 'Tax collector'],
          answer: 1
        }
      ]
    }
  ]
}
