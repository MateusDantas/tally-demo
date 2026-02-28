# Tallion Demo — Claude Code Setup Instructions

## What This Is

A static demo site showcasing Tallion's B2B2C agent payment infrastructure. No backend, no real integrations — just an interactive React prototype for investors, developers, and partners to see how Tallion works. Deploy to Vercel.

## Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS** (only for global resets — all component styling is inline)
- **Vercel** for deployment
- **Google Fonts**: DM Sans, DM Serif Display, IBM Plex Mono

## Repo Setup

```bash
npx create-next-app@latest tallion-demo --typescript --tailwind --eslint --app --src-dir --no-import-alias
cd tallion-demo
```

## Project Structure

```
tallion-demo/
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout with fonts + metadata
│       ├── page.tsx            # Main page — renders TallionDemo component
│       ├── globals.css         # Minimal Tailwind base + custom scrollbar
│       └── components/
│           └── TallionDemo.tsx   # THE ENTIRE DEMO (single component file)
├── public/
│   └── favicon.svg            # Tallion shield icon
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vercel.json
```

## Critical: The Demo Component

The entire demo lives in a single React component file. I'm providing the complete source below. **Do not split it into multiple files** — it's designed as a self-contained interactive prototype.

The component has three tabs:
1. **Before & After** — Two phone mockups side by side showing the same purchase flow without vs with Tallion
2. **For Developers** — Integration code, value exchange breakdown
3. **vs. Competitors** — Expandable cards for each competitor (Stripe ACP, Visa TAP, Mastercard Agent Pay, Google AP2, Skyfire, Nekuda, Build In-House) showing what happens when an agent like Poke tries each alternative

### Component File: `src/app/components/TallionDemo.tsx`

Paste the contents of the attached `tallion-complete.jsx` file into this path. Add `"use client";` as the very first line since it uses React hooks (`useState`, `useEffect`, `useRef`).

The file I'm providing uses JSX with inline styles only. No Tailwind classes inside the component — all styling is via the `style` prop. This is intentional for the ultra-premium aesthetic.

**IMPORTANT**: The component already includes a `<style>` tag that imports Google Fonts and sets global resets. In Next.js, move the Google Font import to `layout.tsx` using `next/font/google` instead, and strip the `@import url(...)` from the component's inline `<style>` tag. The rest of the inline `<style>` (scrollbar, button resets) can stay.

## File Contents

### `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Tallion — Consumer Payment Rails for the Agentic Economy",
  description:
    "The trust layer between consumers and their AI agents' financial lives. See how Tallion transforms agent commerce.",
  openGraph: {
    title: "Tallion — Before & After Agent Payments",
    description:
      "Same request. Completely different experience. See how AI agents handle payments with and without Tallion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable} ${ibmPlexMono.variable}`}
    >
      <body style={{ background: "#050505", margin: 0 }}>{children}</body>
    </html>
  );
}
```

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

html {
  background: #050505;
}

::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(191, 163, 109, 0.06);
  border-radius: 2px;
}

button {
  outline: none;
}
button:hover {
  filter: brightness(1.08);
}
button:active {
  transform: scale(0.97);
}
```

### `src/app/page.tsx`

```tsx
import TallionDemo from "./components/TallionDemo";

export default function Home() {
  return <TallionDemo />;
}
```

### `src/app/components/TallionDemo.tsx`

**This is the main component.** Take the complete contents of the `tallion-complete.jsx` file and:

1. Add `"use client";` as the first line
2. Replace the font family strings to use CSS variables from next/font:
   - `"'DM Sans', sans-serif"` → `"var(--font-dm-sans), sans-serif"`
   - `"'DM Serif Display', Georgia, serif"` → `"var(--font-dm-serif), Georgia, serif"`
   - `"'IBM Plex Mono', monospace"` → `"var(--font-ibm-mono), monospace"`
3. Remove the `@import url('https://fonts.googleapis.com/css2?...')` line from the inline `<style>` tag (fonts are loaded via next/font in layout.tsx instead)
4. Keep everything else exactly as-is — all inline styles, all component logic

The full JSX source is in the file `tallion-complete.jsx` that should be in the same directory as this markdown file, or ask me to provide it.

### `public/favicon.svg`

```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="8" fill="#BFA36D"/>
  <path d="M16 26s8-4 8-10V9l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#050505" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>
```

### `vercel.json`

```json
{
  "framework": "nextjs"
}
```

### `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;
```

## Font Variable Reference

When adapting the component, here's the mapping from the original font constants to CSS variables:

| Original | CSS Variable | Usage |
|----------|-------------|-------|
| `F.d` / `f.d` — DM Serif Display | `var(--font-dm-serif)` | Display headings, accent numbers, section titles |
| `F.b` / `f.b` — DM Sans | `var(--font-dm-sans)` | Body text, labels, buttons, all UI text |
| `F.m` / `f.m` — IBM Plex Mono | `var(--font-ibm-mono)` | Code blocks, numeric values, monospace elements |

## Deploy to Vercel

```bash
# Install Vercel CLI if needed
npm i -g vercel

# From the project root
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: tallion-demo
# - Framework: Next.js (auto-detected)
# - Build settings: defaults are fine

# For production deployment
vercel --prod
```

Or connect the GitHub repo to Vercel dashboard for auto-deploy on push.

## Environment Variables

None required. This is a fully static demo with no API calls, no backend, no environment secrets.

## What Each Tab Shows

### Tab 1: Before & After

Two realistic iPhone mockups side by side. Same conversation plays out on both — the left phone shows what happens WITHOUT Tallion (agent can't pay, sends you to a website, manual checkout, 3DS verification, etc.) and the right phone shows what happens WITH Tallion (agent requests payment, you approve with Face ID in the Tallion app, done).

Three scenarios:
- **First Purchase**: Book a flight (10 steps → 3 steps)
- **Repeat Purchase**: Get an Uber (manual every time → auto-approved)
- **Second Agent**: ChatGPT Operator (full re-setup → one tap)

Has Play/Pause, Step, Reset, Show All controls. Progress dots. Summary stats at completion.

### Tab 2: For Developers

- **Integration tab**: 4 code blocks showing the complete Tallion Connect SDK (initialize, request payment, handle response, webhooks)
- **Value Exchange tab**: What developers get (free payment capability, no PCI, no fraud liability, 80M merchants, trust signal) vs what Tallion earns (interchange, $0 CAC consumers, trust data). Explicitly notes interchange is NOT shared with developers.

### Tab 3: vs. Competitors

Seven expandable competitor cards, each framed as "What if Poke used this instead?":

1. **Stripe ACP** — Only works at Stripe merchants. Delta.com isn't one.
2. **Visa TAP** — Great agent identity, but zero consumer product. No approval UX.
3. **Mastercard Agent Pay** — Locked to MC holders. Bank-dependent UX.
4. **Google AP2/UCP** — Tied to Google ecosystem. iMessage agents can't access Google Wallet natively.
5. **Skyfire** — Crypto-native. Consumer's USD becomes USDC. Delta doesn't accept stablecoins.
6. **Nekuda** — Closest competitor. Only $5M, pilot-only in fashion/retail, no virtual cards.
7. **Build In-House** — $500K+, 6–18 months, PCI compliance, 50-state licensing. Poke raised $15M for AI, not fintech.

Each expands to show: what it is, step-by-step Poke integration flow, what works (green), where it breaks (red), and a verdict.

Plus a summary comparison table (8 dimensions × 8 solutions) and a "Tallion's architectural advantage" section explaining the whitespace: protocols build from above, crypto builds from edges, consumer-facing middle layer is underbuilt.

## Design System Reference

For anyone extending or modifying the demo, here's the design language:

### Colors
- **Background**: `#050505` (deep black, warm undertone)
- **Gold primary**: `#BFA36D` (champagne, not yellow)
- **Gold muted**: `#917A4A` (for gradients)
- **Text**: `#EDE8DF` (cream white), `#B8B0A2` (secondary), `#6B6560` (muted), `#3D3935` (faint)
- **Green**: `#6FCF97` (success, auto-approve)
- **Red**: `#EB5757` (errors, pain points)
- **Amber**: `#E2B657` (warnings, time badges)

### Surfaces
- Default: `rgba(255,255,255,0.018)` with `rgba(255,255,255,0.04)` border
- Gold: Multi-stop gradient `rgba(191,163,109,0.055)` to `rgba(191,163,109,0.015)` with `rgba(191,163,109,0.12)` border
- Grain overlay at 4% opacity over entire viewport

### Typography Scale
- Display: 34–42px, DM Serif Display italic for accent words
- Section heads: 30–32px, DM Sans weight 300
- Body: 13–15px, DM Sans weight 300–400
- Labels: 10px, DM Sans weight 500, letter-spacing 3px, uppercase
- Code: 11.5px, IBM Plex Mono, Material Palenight color scheme

### Phone Mockups
- Width: 300px, border-radius: 36px outer / 31px inner
- Dynamic Island: 80×22px pill, centered
- Status bar: 9:41 left, signal bars right
- Gold glow shadow on "With Tallion" phone, red-tinted border on "Without"

## Notes

- No real API integrations — all data is hardcoded in the component
- No localStorage or sessionStorage usage
- No external API calls
- Fully static — can be exported as static HTML if needed (`next export`)
- Mobile responsive is not a priority for this demo (it's designed for desktop/laptop presentations)
- The component is intentionally one large file (~1500 lines) to keep it self-contained and easy to iterate on