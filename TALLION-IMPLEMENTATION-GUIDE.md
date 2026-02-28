# Tallion Landing Page — Claude Code Implementation Guide

## CRITICAL: Always Use the Real Tallion Logo

The Tallion icon is a PNG file, NOT a styled div. Every place the logo appears must use the actual image:

| Location | File | Size |
|----------|------|------|
| Navbar | `/images/tallion-icon-256.png` | width 36px, height 36px |
| Hero badge | `/images/tallion-icon-256.png` | width 56px, height 56px |
| On the gold card | `/images/tallion-icon-64.png` | width 32px, height 32px |
| Footer | `/images/tallion-icon-64.png` | width 26px, height 26px |
| Favicon | `/favicon.ico` | — |
| Apple touch | `/images/tallion-icon-180.png` | 180×180 |

NEVER use `<div>T</div>` or any text-based placeholder. Always use `<Image>` (next/image) or `<img>` pointing to the actual PNG files.

---

## IMPORTANT: Read this first

This document contains prompts to paste into Claude Code (Cursor). 
Run them in order. Each prompt handles one major piece.
Wait for each to complete before running the next.

The reference HTML is attached: `tallion-premium-landing.html`
Copy it into your project root so Claude Code can reference it:

```bash
# From your project root
cp ~/Downloads/tallion-premium-landing.html ./reference-landing.html
```

---

## PROMPT 1: Font + Global Styles + CSS Variables

```
I'm rebuilding the Tallion landing page. First, update the global styles.

1. FONT: In the root layout file (app/layout.tsx or similar), replace whatever font is currently imported with Montserrat:

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
})

Apply it to <html> or <body> className={montserrat.variable}

REMOVE all references to any previous font (Inter, Geist, etc.) from layout AND from all CSS files. Search the entire project for font-family declarations and old font imports.

2. CSS VARIABLES: In globals.css (or your global stylesheet), add/replace with these CSS custom properties:

:root {
  --gold: #d4a940;
  --gold-light: #e8c560;
  --gold-bright: #f0d878;
  --gold-dark: #a88425;
  --gold-deep: #7a5c18;
  --gold-muted: #7a6a35;
  --gold-faint: rgba(212, 169, 64, 0.07);
  --gold-glow: rgba(212, 169, 64, 0.12);
  --bg: #050505;
  --bg-card: #0a0a0a;
  --bg-elevated: #0f0e0c;
  --border: rgba(212, 169, 64, 0.08);
  --border-hover: rgba(212, 169, 64, 0.18);
  --text: #ece6d8;
  --text-muted: #8a8478;
  --text-dim: #4a463e;
}

3. GLOBAL RESET in globals.css:

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

4. If using Tailwind, also add the gold colors to tailwind.config:

theme: {
  extend: {
    colors: {
      gold: {
        DEFAULT: '#d4a940',
        light: '#e8c560',
        bright: '#f0d878',
        dark: '#a88425',
        deep: '#7a5c18',
        muted: '#7a6a35',
      }
    },
    fontFamily: {
      sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
    }
  }
}

Remove ALL old color variables, old font references, and any conflicting global styles.
```

---

## PROMPT 2: Nav Component

```
Update the navbar/header component for the Tallion landing page. Find the existing nav component (likely in components/Header.tsx, components/Nav.tsx, or app/layout.tsx).

Replace it with this structure:

<nav> — fixed, top 0, full width, z-index 1000
  - Background: rgba(5, 5, 5, 0.8) with backdrop-filter: blur(24px) saturate(1.2)
  - Border bottom: 1px solid rgba(212, 169, 64, 0.04)
  - Padding: 18px 48px
  - Flex, space-between, center

Left side (.nav-logo):
  - <Image> from next/image, src="/images/tallion-icon-256.png", width={36} height={36}, border-radius 9px, alt="Tallion"
  - DO NOT use a <div> with text "T" — use the actual PNG icon file
  - <span> "tallion" — font-size 20px, font-weight 600, color var(--gold), letter-spacing 0.12em

Right side (.nav-links):
  - Links: "For you" (href="#benefits"), "Developers" (href="#developers"), "Vision" (href="#vision")
  - Each link: font-size 13px, font-weight 500, color var(--text-muted), padding 8px 18px, border-radius 8px
  - Hover: color var(--text)
  - Last link "Get early access" is a CTA button: background var(--gold), color #0a0a0a, font-weight 600, border-radius 8px
  - CTA hover: background var(--gold-light), translateY(-1px)

Mobile (below 768px): hide text links, show only logo + CTA

Animation: fadeIn 0.8s ease on mount

Add the nav scroll effect: on scroll > 50px, increase border opacity to rgba(212, 169, 64, 0.08). Use a useEffect with scroll listener.
```

---

## PROMPT 3: Hero Section with 3D Gold Card

```
Create the hero section for the Tallion landing page. This is the most important section — it has a split layout with content on the left and a 3D animated gold credit card on the right.

LAYOUT:
- Section: min-height 100vh, flex center, padding 120px 48px 80px
- Background glow: absolute positioned radial gradient, 900x900px, rgba(212, 169, 64, 0.04) fading to transparent
- Grid: 2 columns (1fr 1fr), gap 80px, max-width 1240px

LEFT SIDE (hero-content), animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1):

1. Eyebrow badge: "Now in private beta" with a pulsing gold dot (6px circle, animation pulseGlow 2s infinite)
   - Inline-flex, border: 1px solid rgba(212, 169, 64, 0.12), border-radius 20px, padding 6px 14px
   - Font: 12px, weight 600, letter-spacing 0.2em, uppercase, color var(--gold-muted)

ALSO above the headline on MOBILE (when the layout stacks), show a hero logo badge:
   - <Image> src="/images/tallion-icon-256.png" width={56} height={56} border-radius 14px
   - "tallion" text next to it: 28px, weight 600, letter-spacing 0.12em, color var(--gold)
   - Centered, flex, gap 14px
   - This badge is visible on mobile when the card moves above the content. On desktop it's optional since the card itself shows the brand.

2. Headline: "Your agents can finally <em>pay for things</em>"
   - Font: clamp(38px, 4.2vw, 58px), weight 600, line-height 1.12, letter-spacing -0.03em
   - The <em> part: background gradient text (gold-light → gold → gold-dark), -webkit-background-clip: text, -webkit-text-fill-color: transparent

3. Subtext: "AI agents book flights, find deals, and manage your money. Tallion gives them secure, programmable cards — with rules you control and rewards you earn."
   - Font: 17px, weight 400, line-height 1.75, color var(--text-muted), max-width 480px

4. Two buttons:
   - "Get early access →" — primary button with gradient bg (gold-light → gold), color #0a0a0a, weight 700, border-radius 10px, padding 14px 30px
     - Hover: translateY(-2px), box-shadow 0 8px 30px rgba(212, 169, 64, 0.3)
     - Has a shimmer ::before pseudo-element that slides across on hover
   - "I'm a developer" — outline button, border 1px solid rgba(255,255,255,0.1)

5. Proof stats row (flex, gap 48px):
   - "80M+" merchants day one
   - "<30s" card creation  
   - "$0" fraud liability
   - Numbers: 24px, weight 700, color var(--gold)
   - Labels: 12px, color var(--text-dim)

RIGHT SIDE — THE GOLD CARD (this is the showpiece):

Create a TallionCard component. Structure:

- Wrapper: perspective 1200px, animation fadeIn 1.2s with 0.3s delay
- Inner wrapper: animation float 5s ease-in-out infinite (translateY 0→-14px→0, maintaining rotation)
  - Has a ::before shadow: radial-gradient ellipse of gold glow below card
  
- Card element: 380px × 240px, border-radius 18px
  - Transform: rotateY(-12deg) rotateX(8deg)
  - Animation: cardGlow 4s infinite (pulsing box-shadow between 0.12 and 0.2 opacity gold)
  - Hover: rotateY(-4deg) rotateX(3deg) scale(1.03) with 0.5s cubic-bezier transition

- Card surface (background):
  - Gradient: linear-gradient(145deg, #c9a238 0%, #b8922e 20%, #dab44c 40%, #c9a238 55%, #a8861e 75%, #c9a238 100%)
  - ::before — diagonal stripe texture: repeating linear gradient with rgba(255,255,255,0.06), background-size 4px 4px
  - ::after — shimmer sweep: linear-gradient with white highlight moving across, animation shimmer 6s infinite

- Card content (absolute, z-index 2, padding 28px 32px, flex column space-between):
  Top row: <Image> src="/images/tallion-icon-64.png" width={32} height={32} border-radius 8px (NOT a div with "T" — use the actual Tallion icon PNG) + "tallion" brand text (15px, weight 700, rgba(26,21,8,0.8), letter-spacing 0.12em) + chip element
  Middle: "4821 •••• •••• 7340" — 18px, weight 600, letter-spacing 0.2em, rgba(26,21,8,0.75)
  Bottom: "Agent: TRAVEL-AGENT-01" | "Limit: $2,000" | "VISA" italic

- Mouse parallax: Add a useEffect that listens to mousemove and adjusts card rotateX/rotateY based on mouse position relative to card center. Range: rotateY -12 ± 15deg, rotateX 8 ± 10deg.

SCROLL INDICATOR (absolute bottom center):
  - "Scroll" text: 10px, uppercase, letter-spacing 0.2em, color var(--text-dim)
  - Animated line: 1px wide, 40px tall, gradient gold to transparent, with a small bright segment that animates top to bottom every 2s

RESPONSIVE:
- Below 1024px: single column, card on top, content below, centered text
- Below 768px: card width 300px × 190px, buttons stack vertically

All the keyframe animations needed:
- fadeUp: opacity 0 + translateY(40px) → opacity 1 + translateY(0)
- fadeIn: opacity 0 → 1
- shimmer: background-position -200% → 200%
- float: translateY 0 → -14px → 0 (maintaining rotation)
- cardGlow: box-shadow pulse between 2 opacity levels
- pulseGlow: opacity 0.4 → 0.8 → 0.4
- scrollDown: top -40% → 140%
```

---

## PROMPT 4: Problem Section

```
Add the problem/tension section below the hero. This is a centered text-only section that creates emotional urgency.

Structure:
- Section: padding 140px 48px, max-width 840px, centered

Two paragraphs with scroll reveal animation (fade up on intersection):

Paragraph 1: "AI agents can research, compare, and recommend. But the moment they need to pay, everything breaks."
- "pay" should be colored var(--gold), font-weight 500

Paragraph 2: "You wouldn't hand your wallet to a stranger. Why give your credit card to an AI with no guardrails?"
- "Why give your credit card to an AI with no guardrails?" should be color var(--text) and font-weight 500 (the rest is var(--text-muted))

Both paragraphs: font-size clamp(24px, 3vw, 34px), weight 400, line-height 1.65, color var(--text-muted), centered

48px gap between the two paragraphs.

After the section, add a decorative divider: 48px wide, 1px tall, linear-gradient(90deg, transparent, var(--gold-muted), transparent), margin 100px auto, opacity 0.4

Use IntersectionObserver for the scroll reveal — elements start at opacity 0, translateY 40px, transition to visible state with 0.8s cubic-bezier(0.16, 1, 0.3, 1). Second paragraph has 0.2s delay.
```

---

## PROMPT 5: Benefits Grid

```
Add the "Why Tallion" benefits section with 4 cards in a grid.

Section header:
- Label: "WHY TALLION" — 11px, weight 700, letter-spacing 0.25em, uppercase, color var(--gold-muted)
- Title: "Let your agents spend. Never lose control." — clamp(30px, 3.5vw, 46px), weight 600, line-height 1.18
- Subtitle: "Every AI agent gets an isolated, programmable card. You define the rules. You see every transaction. You earn rewards." — 16px, color var(--text-muted), max-width 520px

Grid: 4 columns, gap 20px (2 columns on tablet, 1 on mobile)

Each card:
- Background: var(--bg-card) (#0a0a0a)
- Border: 1px solid rgba(212, 169, 64, 0.08)
- Border-radius: 16px, padding: 36px 28px
- Hover: border-color rgba(212, 169, 64, 0.18), translateY(-4px), background var(--bg-elevated)
- ::before top edge glow that fades in on hover

Cards content:
1. Icon: 🛡 | Title: "Zero exposure" | Text: "Your real card never touches a merchant. Each agent gets a unique virtual card that auto-expires after use. No leaked numbers, no fraud risk."
2. Icon: ⚡ | Title: "Your rules, enforced" | Text: "Set limits per agent, per merchant, per category. Your travel agent books flights — nothing else. $500 ceiling, airlines only, expires Friday."
3. Icon: 👁 | Title: "Total visibility" | Text: "Every transaction in real time. Full audit trail of what the agent compared, why it chose this purchase, and how much it saved you."
4. Icon: 💰 | Title: "Earn as they spend" | Text: "Cashback on every agent transaction. The more your agents transact, the higher your tier. Efficiency bonuses when agents beat your budget."

Icon box: 44px square, border-radius 11px, background linear-gradient(135deg, rgba(212,169,64,0.1), rgba(212,169,64,0.04)), border 1px solid rgba(212,169,64,0.08)

Each card has staggered scroll reveal: delays of 0.1s, 0.2s, 0.3s, 0.4s
```

---

## PROMPT 6: Comparison Section

```
Add the comparison section: "Stop sharing your card blindly"

Header: same label/title pattern as benefits section.

Layout: 3-column grid — left column (old) | "vs" center | right column (new)
Max-width 920px.

Left column "Your credit card, raw" (opacity 0.65):
- ✕ Full card number exposed to every merchant
- ✕ No spending limits — agent can charge anything
- ✕ No visibility into what the agent did
- ✕ Compromised? Cancel everything
- ✕ One card for all agents
- ✕ Zero rewards on agent spend

"✕" icons colored #5a3a3a

Right column "Through Tallion" (gold border accent):
- ◆ Isolated virtual card per agent, per task
- ◆ Custom limits by amount, merchant, category
- ◆ Full audit trail with real-time alerts
- ◆ Agent goes rogue? Kill that one card
- ◆ Separate wallets and budgets per agent
- ◆ Cashback + efficiency rewards

"◆" icons colored var(--gold)

Right column has border-color rgba(212, 169, 64, 0.15) and background with subtle gold gradient at top: linear-gradient(180deg, rgba(212,169,64,0.03) 0%, var(--bg-card) 100%)

Both columns: padding 44px 36px, border-radius 16px, border 1px solid var(--border), bg var(--bg-card)
Headers: 14px weight 600, left is var(--text-dim), right is var(--gold)
Items: 13.5px, line-height 1.55, color var(--text-muted), flex with gap 10px

Center "vs": 11px, weight 700, color var(--text-dim), letter-spacing 0.1em

On mobile: stack vertically (single column grid).
```

---

## PROMPT 7: How It Works + Use Cases

```
Add two sections: "How it works" and "Use cases"

=== HOW IT WORKS ===
Header: "HOW IT WORKS" label + "Three steps. Full control." title

3-column grid, gap 24px:

Each step card:
- bg var(--bg-card), border 1px solid var(--border), border-radius 16px, padding 40px 32px
- Hover: border-color var(--border-hover), translateY(-3px)
- Large step number: "01", "02", "03" — font-size 56px, weight 800
  - Color: gradient text, rgba(212,169,64,0.12) → rgba(212,169,64,0.02)
- Step title in var(--gold), 17px weight 600
- Step description in var(--text-muted), 14px

Steps:
01 "Fund your wallet" — "Link your bank account. Transfer funds via ACH — free, instant, no credit card fees. Your balance earns interest while it waits."
02 "Set the rules" — "Define spend limits, approved merchants, category restrictions, and approval workflows for each agent. 'Up to $2K at airlines. Nothing else.'"
03 "Let them transact" — "Each agent gets its own virtual card. They spend within your rules, you get notified instantly, and you earn cashback on every dollar."

=== USE CASES ===
Header: "USE CASES" label + "One wallet. Every agent." title

3-column grid, gap 20px, 6 cards:

Each card:
- padding 32px 28px, border-radius 14px, border 1px solid var(--border), bg var(--bg-card)
- Hover: border-color var(--border-hover), translateY(-3px)
- Tag badge: 10px weight 700, letter-spacing 0.18em, uppercase, color var(--gold-deep), border 1px solid rgba(212,169,64,0.1), border-radius 4px, padding 4px 10px

Cards:
1. TRAVEL | "Flights, hotels, car rentals" | "AI finds the best itinerary, books it end-to-end. Card auto-expires after the trip. Budget capped, receipts collected."
2. SHOPPING | "Price drops & restocks" | "Set a target price. Agent monitors and purchases the instant it hits. Unique card per buy, auto-voided after checkout."
3. SUBSCRIPTIONS | "SaaS, streaming, utilities" | "Dedicated cards per subscription. Agent audits charges monthly, cancels unused services, negotiates better rates."
4. PROCUREMENT | "Supplies & services" | "Multiple agents handle different vendors. Per-vendor limits, automatic receipts, expense categorization."
5. PERSONAL | "Errands & deliveries" | "Groceries, pharmacy, dry cleaning. Agent orders what you need with a card that only works at approved stores."
6. RESEARCH | "APIs & data access" | "Agent needs premium databases or paid searches. Micro-budget cards with per-query limits."

Both sections: staggered scroll reveal on cards, single column on mobile.
```

---

## PROMPT 8: Developer API Section

```
Add the developer/API section with a code preview.

Layout: 2-column grid (1fr 1.15fr), gap 72px, max-width 1240px

Left side:
- Label: "FOR DEVELOPERS"
- Title: "Three lines to first payment" — clamp(26px, 3vw, 36px), weight 600
- Paragraph 1: "Tallion's API handles card issuing, spend controls, KYC, compliance, and settlement. You build the intelligence — we handle the money."
- Paragraph 2: "Issue virtual cards, set programmable rules, monitor transactions in real time, and earn interchange revenue on every dollar your users' agents spend."
- CTA button: "View API docs →" (primary style)

Right side — code block:
- Container: bg #0a0a0a, border 1px solid var(--border), border-radius 16px
- Top edge glow: ::after with gold gradient line
- Header bar: 3 dots (10px circles, rgba(255,255,255,0.08)), border-bottom rgba(255,255,255,0.04)
- Code body: monospace font (SF Mono, Fira Code, Cascadia Code fallbacks), 13px, line-height 1.7

Code content:
// Issue a card for an AI agent
const card = await tallion.cards.create({
  agent_id: "travel-agent-01",
  spend_limit: 2000_00,
  currency: "USD",
  allowed_categories: ["airlines", "hotels"],
  expires: "after_first_use",
});

// Card is live. Agent can transact.
console.log(card.number, card.cvv);

Syntax colors:
- Comments: var(--text-dim)
- Keywords (const, await): var(--gold)
- Function names: #a0c4a0
- Strings: #7a9e7a
- Values/variables: var(--text-muted)
- Brackets: var(--text-dim)

Indentation: 20px per level

Single column on mobile, code block full width.
```

---

## PROMPT 9: CTA Section + Footer

```
Add the final CTA section and footer.

=== CTA ===
- Centered, padding 160px 48px
- Background glow: radial-gradient gold, 600x400px, centered, 0.05 opacity
- Title: "Your agents are ready. Give them a wallet." 
  - clamp(34px, 4.5vw, 54px), weight 600, letter-spacing -0.03em
  - "Give them a wallet." in gradient gold text (same technique as hero headline)
- Subtitle: "Join the waitlist for early access. Be the first to give your AI agents the power to pay — safely."
  - 17px, color var(--text-muted), max-width 440px, centered
- Two buttons centered: "Join the waitlist →" (primary) + "Read the docs" (outline)
- Scroll reveal animation

=== FOOTER ===
- Padding 40px 48px, border-top 1px solid rgba(255,255,255,0.03)
- Flex, space-between, max-width 1240px, centered
- Left: <Image> src="/images/tallion-icon-64.png" width={26} height={26} border-radius 6px (NOT a div with "T" — use the actual Tallion icon PNG) + "tallion" text (14px, weight 600, color var(--gold-muted))
- Right: links — Docs, API, Vision, Twitter, GitHub
  - 12px, color var(--text-dim), hover color var(--text-muted)
- Mobile: stack vertically, center aligned

=== GRAIN OVERLAY (on body) ===
Add a subtle film grain texture overlay on the entire page. Create a fixed pseudo-element on body (::after):
- position fixed, covers the full viewport (top -50%, left -50%, width 200%, height 200%)
- Use an inline SVG data URL with feTurbulence filter for the noise texture
- opacity: 0.015
- pointer-events: none
- z-index: 10000
- Animate with a stepped grain animation (translate around randomly, 4s steps(6) infinite)

This gives the page that premium film/analog texture.
```

---

## PROMPT 10: Scroll Reveal System

```
Add a reusable scroll reveal animation system across the entire landing page.

Create a custom hook or component that uses IntersectionObserver to animate elements on scroll.

Implementation:
1. Create a useScrollReveal hook or a RevealOnScroll wrapper component
2. Elements start at: opacity 0, transform translateY(40px)
3. When they enter viewport (threshold 0.12, rootMargin "0px 0px -40px 0px"): opacity 1, translateY(0)
4. Transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1)
5. Support delay classes: delay-1 (0.1s), delay-2 (0.2s), delay-3 (0.3s), delay-4 (0.4s)

Apply this to:
- Section headers (label + title + subtitle groups)
- Each benefit card (staggered)
- Comparison columns
- Step cards (staggered)
- Use case cards (staggered, cycling delays 1-2-3-1-2-3)
- Problem paragraphs (second one with 0.2s delay)
- API section content and code block
- CTA section

The animation should only trigger once (don't re-hide on scroll up).

If using framer-motion or another animation library already in the project, use that instead of raw IntersectionObserver. Otherwise, implement with a useEffect + IntersectionObserver approach.
```

---

## PROMPT 11: Final QA Pass

```
Do a final quality pass on the entire landing page:

1. RESPONSIVE: Test all sections at 1440px, 1024px, 768px, and 375px widths. Grids should collapse: 4→2→1 columns for benefits, 3→1 for steps and use cases, 2-col hero becomes stacked with card on top.

2. FONT CHECK: Verify Montserrat is rendering everywhere. Search the entire project for any remaining references to Inter, Geist, system-ui, Arial, or any font that isn't Montserrat. Remove them all.

3. COLOR CHECK: Search for any hardcoded colors that don't match the Tallion palette. Common culprits: default Tailwind colors, old brand colors, white text that should be var(--text).

4. SPACING: Ensure consistent padding — sections use 100px vertical padding on desktop, 80px on mobile. Max-width containers are 1240px.

5. PERFORMANCE: Make sure images use next/image with proper width/height/priority props. The hero image should have priority={true}. Ensure no layout shift.

6. ANIMATIONS: Verify all scroll reveals work, card parallax works on desktop (and is disabled on mobile/touch), button hovers have the shimmer effect.

7. FAVICON: Verify the new favicon shows in the browser tab. Check app/favicon.ico is the new one.

8. META: Verify page title is "Tallion — The Trust Layer for Agent Commerce" and OG tags are set.

9. LOGO CHECK: Search the entire project for any remaining <div>T</div> or text-based logo placeholders. Every instance of the Tallion logo MUST use the actual PNG files from /images/tallion-icon-*.png via next/image <Image> component. Check these locations:
   - Navbar: should be <Image src="/images/tallion-icon-256.png" width={36} height={36}>
   - Gold card: should be <Image src="/images/tallion-icon-64.png" width={32} height={32}>
   - Footer: should be <Image src="/images/tallion-icon-64.png" width={26} height={26}>
   If any location uses a div, span, or SVG placeholder instead of the real PNG, replace it.
```

---

## QUICK REFERENCE: All Animations Needed

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotateY(-12deg) rotateX(8deg); }
  50% { transform: translateY(-14px) rotateY(-12deg) rotateX(8deg); }
}

@keyframes cardGlow {
  0%, 100% { box-shadow: 0 20px 80px rgba(212,169,64,0.12), 0 0 0 1px rgba(212,169,64,0.1); }
  50% { box-shadow: 0 25px 100px rgba(212,169,64,0.2), 0 0 0 1px rgba(212,169,64,0.15); }
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

@keyframes scrollDown {
  0% { top: -40%; }
  100% { top: 140%; }
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  30% { transform: translate(3%, -15%); }
  50% { transform: translate(12%, 9%); }
  70% { transform: translate(9%, 4%); }
  90% { transform: translate(-1%, 7%); }
}
```

---

## FILE STRUCTURE (likely outcome)

```
app/
  layout.tsx          ← Montserrat font, metadata, global providers
  page.tsx            ← Main landing page, imports all sections
  globals.css         ← CSS variables, reset, global animations, grain overlay

components/
  Nav.tsx             ← Fixed navbar with scroll effect
  Hero.tsx            ← Hero section with content + TallionCard
  TallionCard.tsx     ← 3D animated gold card with mouse parallax
  Problem.tsx         ← Emotional tension section
  Benefits.tsx        ← 4 benefit cards grid
  Comparison.tsx      ← Old vs new comparison
  HowItWorks.tsx      ← 3 step cards
  UseCases.tsx        ← 6 use case cards
  ApiSection.tsx      ← Developer section with code block
  Cta.tsx             ← Final call to action
  Footer.tsx          ← Footer
  ScrollReveal.tsx    ← Reusable scroll animation wrapper

public/
  favicon.ico
  favicon.svg
  images/
    tallion-icon-*.png (all sizes)
```
