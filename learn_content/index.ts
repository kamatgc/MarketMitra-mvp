import { Module } from './types'

// English
import { module1_intro } from './module1_intro'
import { module2_instruments } from './module2_instruments'
import { module3_market } from './module3_market'
import { module4_risk_return } from './module4_risk_return'
import { module5_getting_started } from './module5_getting_started'
import { module6_analyzing_stocks } from './module6_analyzing_stocks'
import { module7_beginner_strategies } from './module7_beginner_strategies'
import { module8_avoid_mistakes } from './module8_avoid_mistakes'
import { module9_taxes_regulation } from './module9_taxes_regulation'
import { module10_tools } from './module10_tools'

// Hindi, Kannada, Tamil Module 1 translations
import { module1_intro_hi } from './module1_intro_hi'
import { module1_intro_kn } from './module1_intro_kn'
import { module1_intro_ta } from './module1_intro_ta'

export const enModules: Module[] = [
  module1_intro,
  module2_instruments,
  module3_market,
  module4_risk_return,
  module5_getting_started,
  module6_analyzing_stocks,
  module7_beginner_strategies,
  module8_avoid_mistakes,
  module9_taxes_regulation,
  module10_tools
]

export const hiModules: Module[] = [
  module1_intro_hi,
  module2_instruments,
  module3_market,
  module4_risk_return,
  module5_getting_started,
  module6_analyzing_stocks,
  module7_beginner_strategies,
  module8_avoid_mistakes,
  module9_taxes_regulation,
  module10_tools
]

export const knModules: Module[] = [
  module1_intro_kn,
  module2_instruments,
  module3_market,
  module4_risk_return,
  module5_getting_started,
  module6_analyzing_stocks,
  module7_beginner_strategies,
  module8_avoid_mistakes,
  module9_taxes_regulation,
  module10_tools
]

export const taModules: Module[] = [
  module1_intro_ta,
  module2_instruments,
  module3_market,
  module4_risk_return,
  module5_getting_started,
  module6_analyzing_stocks,
  module7_beginner_strategies,
  module8_avoid_mistakes,
  module9_taxes_regulation,
  module10_tools
]

export const translations: Record<'en' | 'hi' | 'kn' | 'ta', Module[]> = {
  en: enModules,
  hi: hiModules,
  kn: knModules,
  ta: taModules
}
