import { Module } from './types'

export const module3_market: Module = {
  id: 'understanding-market',
  title: 'Module 3: Understanding the Stock Market',
  lessons: [
    {
      id: 'what-is-exchange',
      title: 'What is a stock exchange (NSE/BSE)?',
      intro: 'A regulated marketplace where securities are listed and traded.',
      keyPoints: [
        'NSE and BSE are India’s primary exchanges.',
        'Exchanges enable price discovery and liquidity.',
        'Regulation ensures transparency and fairness.'
      ],
      exampleLabel: 'Example',
      example: 'A farmers’ market for company shares — organized, transparent, regulated.',
      estimatedTime: '5 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Which is a stock exchange in India?',
          options: ['NASDAQ', 'NSE', 'Dow Jones'],
          answer: 1
        }
      ]
    },
    {
      id: 'how-market-works',
      title: 'How does the stock market work?',
      intro: 'Buyers and sellers place orders via brokers; exchanges match them at market prices.',
      keyPoints: [
        'Order types: market, limit, stop-loss.',
        'Bid-ask spread reflects supply/demand.',
        'Clearing and settlement move shares and cash.'
      ],
      exampleLabel: 'Example',
      example: 'Think of a queue of buyers and sellers; trades happen when prices meet.',
      estimatedTime: '6 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'A “bid” is:',
          options: ['Price a seller asks', 'Price a buyer is willing to pay', 'Brokerage fee'],
          answer: 1
        }
      ]
    },
    {
      id: 'participants-ipo-timing',
      title: 'Key participants, IPOs vs. Secondary, and timings',
      intro: 'Understand the ecosystem: regulators, brokers, depositories, and when markets operate.',
      keyPoints: [
        'SEBI (regulator), brokers (intermediaries), NSDL/CDSL (depositories).',
        'IPO = first-time share sale; secondary = regular trading.',
        'Market timings and holidays affect trading windows.'
      ],
      exampleLabel: 'Tip',
      example: 'Read your broker’s market holiday calendar to plan orders and SIP dates.',
      estimatedTime: '5 min',
      difficulty: 'Beginner',
      quiz: [
        {
          question: 'Depositories in India include:',
          options: ['NSDL and CDSL', 'NYSE and NASDAQ', 'RBI and IRDAI'],
          answer: 0
        }
      ]
    }
  ]
}
