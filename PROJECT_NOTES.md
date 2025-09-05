Fintech_Edu – MVP Demo Log
1. Project Overview
Goal: Build a quick MVP for Enhancing Retail Investor Education and Engagement with:

Learn module (multi‑language lessons via Google Translation API)

Summarise module (URL summarisation via PaLM/Gemini API)

Trade module (delayed stock data via Alpha Vantage API)

2. Local Environment Setup
OS: Windows 10 Home Single Language Node.js: v20.19.3 Git: v2.25.1 Editor: VS Code

Commands run:

powershell
# Navigate to project folder
cd "D:\Ganesh\git-project"

# Create Next.js project with TypeScript, ESLint, Tailwind
npx create-next-app@latest investor-mvp --ts --eslint

# Choices:
# Tailwind CSS: Yes
# src/ directory: No
# App Router: No
# Turbopack: No
# Import alias: Yes (@/*)
# Alias value: @/* (default)

# Move into project
cd investor-mvp

# Install extra packages
npm install axios cheerio
3. Environment Variables
File: .env.local (in project root, not committed to Git)

Code
NEXT_PUBLIC_APP_NAME=Fintech_Edu
TRANSLATE_API_KEY=YOUR_GOOGLE_TRANSLATE_KEY
PALM_API_KEY=YOUR_PALM_GEMINI_KEY
ALPHA_VANTAGE_API_KEY=YOUR_ALPHA_VANTAGE_KEY
Notes:

No quotes needed unless value contains spaces.

Keys are stored server‑side only; never exposed in client code.

Same keys must be added in Vercel → Project Settings → Environment Variables for deployment.

4. API Routes Created
Location: pages/api/

lessons.ts → Fetches lesson content, translates if needed.

translate.ts → Direct translation endpoint.

summarise.ts → Summarises a URL using PaLM/Gemini.

market-data.ts → Fetches delayed stock data from Alpha Vantage.

All routes have mock fallbacks if keys are missing.

5. Pages Created
Location: pages/

learn.tsx → UI for lesson in selected language.

summarise.tsx → UI for summarising SEBI/NISM article URLs.

trade.tsx → UI for viewing simulated or live stock prices.

index.tsx → (Optional) Landing page linking to the three modules.

6. Local Testing
Run:

bash
npm run dev
Test in browser:

http://localhost:3000/learn

http://localhost:3000/summarise

http://localhost:3000/trade

7. Deployment (Vercel)
Push code to GitHub.

Import repo into Vercel.

Add env vars in Vercel → Project Settings → Environment Variables.

Deploy — get public demo URL.

8. Useful URLs
Local Dev: http://localhost:3000

Learn Page: /learn

Summarise Page: /summarise

Trade Page: /trade

Google Cloud Console: https://console.cloud.google.com/

Google AI Studio (PaLM/Gemini): https://aistudio.google.com/app/apikey

Alpha Vantage API Key: https://www.alphavantage.co/support/#api-key

9. Smoke Test Checklist
Learn: Change language → lesson updates (live or mock translation).

Summarise: Paste SEBI/NISM article URL → bullet points appear (live or mock).

Trade: Enter stock symbol → price updates (live or mock).

No console errors in browser or terminal.
10. Demo Script – Fintech_Edu MVP
Opening (30–45 sec)
Intro: “Welcome to Fintech_Edu, a prototype designed to enhance retail investor education and engagement. In just 15 hours, we’ve built a working MVP with three core modules — Learn, Summarise, and Trade — each aimed at making complex financial concepts accessible and actionable.”

Problem Statement: “Many retail investors lack the knowledge to navigate the markets confidently. Our solution delivers bite‑sized lessons, AI‑powered summaries of regulatory content, and a safe trading simulator — all in one place.”

Module 1 – Learn (1–1.5 min)
Navigate to: /learn

Narration: “Here, users can explore structured lessons on investing basics. The language selector lets them instantly translate content into Hindi, Kannada, Tamil, or English — powered by Google Cloud Translation API. This ensures accessibility for diverse audiences.”

Action: Change language → show instant translation.

Module 2 – Summarise (1–1.5 min)
Navigate to: /summarise

Narration: “This module allows users to paste a SEBI, NISM, or exchange article URL. Our backend fetches the content, extracts the main text, and uses Google’s PaLM/Gemini API to generate a concise 5‑point summary. This helps investors quickly grasp key regulatory updates without wading through long documents.”

Action: Paste a sample SEBI article URL → click Summarise → show bullet points.

Module 3 – Trade (1–1.5 min)
Navigate to: /trade

Narration: “The trading simulator provides delayed market data from Alpha Vantage. Users can enter a stock symbol and see the latest price, updated every refresh. This offers a safe environment to practice decision‑making without risking real money.”

Action: Enter a symbol (e.g., TCS) → click Refresh → show price.

Closing (30 sec)
Wrap‑up: “In this MVP, we’ve demonstrated how AI and live data can be combined to educate and empower retail investors. The architecture is modular, so we can easily add more lessons, integrate quizzes, or expand the simulator.”

Call to Action: “With your feedback, we can refine the content, enhance interactivity, and scale this into a full‑featured investor education platform.”

11. Tips for Live Demo
Have 1–2 URLs ready for Summarise (avoid slow or blocked sites).

Test each module 5–10 minutes before the demo.

Keep .env.local keys set locally and in Vercel for live demo.

If an API key fails, the mock fallback will still show functionality — call it a “demo mode”.