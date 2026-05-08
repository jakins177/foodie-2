# NutriLens (Mock v1)

NutriLens is a modern, mobile-first Next.js web app inspired by the UX flow of AI-powered calorie and nutrition tracking products.

> **Important:** This is an original implementation with mocked analysis data in v1. No proprietary branding/assets are used.

## Project overview

The app simulates a simple AI nutrition workflow:
1. Upload a food photo.
2. Run a mocked AI analysis.
3. View estimated calories + macros.
4. Keep a lightweight session-based food history.

## Features

- Clean landing hero with startup-style gradient design
- Upload and preview food photo
- Analyze button with loading state
- Result card with:
  - food name
  - calories
  - protein
  - carbs
  - fat
  - confidence and disclaimer
- Food history section with thumbnail + timestamp
- Empty and error states for better UX
- Mobile-first responsive layout with desktop polish
- Local mock API route (`/api/analyze`) for fast iteration

## Tech stack

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **TypeScript**
- **Node/Next API Routes**

## Project structure

```txt
app/
  api/analyze/route.ts      # mocked AI analysis endpoint
  globals.css               # base styles + utility classes
  layout.tsx                # root layout
  page.tsx                  # app landing/dashboard flow
components/
  Hero.tsx
  UploadPanel.tsx
  ResultCard.tsx
  HistoryList.tsx
lib/
  mockData.ts               # sample meal analysis outputs
  types.ts                  # shared app types
```

## How to run locally

```bash
npm install
npm run dev
```

Then open: `http://localhost:3000`

## Debug logging notes

- Client-side analysis failures are logged with `console.error("Analysis error", error)` in `app/page.tsx`.
- The API endpoint randomly returns a small failure percentage to test real-world retry/error UX.

## Future improvements

The structure is intentionally future-ready for:
- OpenAI Vision API integration
- Gemini Vision integration
- Supabase persistence
- Authentication
- Stripe subscriptions
- Daily calorie tracking
- Goals, meal summaries, and charts
- Better analytics + telemetry

## v1 limitation note

The nutrition results are **mocked** and randomly selected from local sample data. No real image recognition or nutrition model is used yet.
