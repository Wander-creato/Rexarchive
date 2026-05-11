# Rex-Archives

Immersive memory archive platform for ADAMIC.

## Stack

- Next.js 15 App Router with React 19
- Tailwind CSS 4 design tokens and glassmorphism utilities
- Framer Motion for parallax, horizontal Fresco motion, and micro-interactions
- Lucide React icon system
- Supabase-ready service boundary for Auth, PostgreSQL metadata, and Storage
- AI narrative service prepared for OpenAI or Anthropic

## Getting started

```bash
npm install
npm run dev
```

Optional AI environment variables:

```bash
AI_PROVIDER=openai # or anthropic
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

Optional Supabase environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
