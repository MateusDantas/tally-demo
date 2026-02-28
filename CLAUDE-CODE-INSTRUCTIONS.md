# Tallion Brand Kit — Claude Code Instructions

## Quick Setup

Copy these commands to update your landing page with the new Tallion branding.

---

## 1. Install the Font

Add Montserrat from Google Fonts to your `<head>`:

```
Add this Google Fonts link to the <head> of the HTML file:
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Claude Code prompt:**
```
Add Montserrat font from Google Fonts (weights 400, 500, 600, 700) to the <head> of index.html. Add it before any existing stylesheet links.
```

---

## 2. Update the Favicon

**Claude Code prompt:**
```
Replace the current favicon with the new Tallion favicon. 

1. Copy favicon.ico and favicon.svg to the /public directory (or root, wherever current favicon lives)
2. Update <head> to include:
   <link rel="icon" type="image/svg+xml" href="/favicon.svg">
   <link rel="icon" type="image/x-icon" href="/favicon.ico">
   <link rel="apple-touch-icon" sizes="180x180" href="/images/tallion-icon-180.png">
   <link rel="icon" type="image/png" sizes="32x32" href="/images/tallion-icon-32.png">
   <link rel="icon" type="image/png" sizes="16x16" href="/images/tallion-icon-16.png">
3. Remove any old favicon references
```

---

## 3. Replace the Logo

**Claude Code prompt (if logo is an <img> tag):**
```
Find the current logo <img> tag in the header/navbar. Replace the src with the new Tallion logo:

- For dark backgrounds: use tallion-lockup-dark.svg
- For light backgrounds: use tallion-lockup-light.svg

Set the logo height to 48px (or 40px for mobile). Add alt="Tallion - AI Payment Infrastructure".
```

**Claude Code prompt (if logo is inline SVG):**
```
Replace the current inline SVG logo in the header/navbar with the contents of tallion-lockup-dark.svg. Set viewBox="0 0 520 120" and height="48". Ensure the SVG has the class "logo" for styling.
```

---

## 4. Update CSS Variables / Brand Colors

**Claude Code prompt:**
```
Update the CSS custom properties (or create them if they don't exist) with Tallion's brand colors:

:root {
  --tallion-gold: #d4a940;
  --tallion-gold-light: #d9b044;
  --tallion-gold-dark: #a88425;
  --tallion-gold-muted: #7a6a35;
  --tallion-black: #0a0a0a;
  --tallion-dark: #111111;
  --tallion-dark-warm: #1a1508;
  --tallion-dark-shield: #1e1b10;
  --tallion-white: #f7f4ee;
}

Replace any existing primary/accent color references throughout the CSS to use these variables.
```

---

## 5. Update Typography

**Claude Code prompt:**
```
Update the font-family declarations throughout the CSS:

- Headings (h1-h6): font-family: 'Montserrat', sans-serif; font-weight: 600;
- Body text: font-family: 'Montserrat', sans-serif; font-weight: 400;
- Logo/brand text: font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: 0.15em;
- Subtitles/labels: font-family: 'Montserrat', sans-serif; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase; font-size: 11px;

Remove any old font imports (e.g., Inter, Roboto, etc.) from both CSS and <head> Google Fonts links.
```

---

## 6. Update Meta Tags & OG Image

**Claude Code prompt:**
```
Update the meta tags in <head>:

<meta name="description" content="Tallion — AI Payment Infrastructure. Programmable cards and wallets for AI agents.">
<meta property="og:title" content="Tallion — AI Payment Infrastructure">
<meta property="og:description" content="Programmable cards and wallets for AI agents.">
<meta property="og:image" content="/images/tallion-og.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Tallion — AI Payment Infrastructure">
<meta name="twitter:image" content="/images/tallion-og.png">
<title>Tallion — AI Payment Infrastructure</title>
```

---

## 7. Full One-Shot Prompt (everything at once)

If you want to do it all in one Claude Code session:

```
I'm rebranding my landing page to Tallion. Here's what needs to change:

FONT: Add Montserrat from Google Fonts (400, 500, 600, 700). Replace all font-family declarations — headings use weight 600, body uses 400. Remove old font imports.

COLORS: Set these CSS variables and replace existing color references:
  --tallion-gold: #d4a940
  --tallion-gold-light: #d9b044  
  --tallion-gold-dark: #a88425
  --tallion-black: #0a0a0a
  --tallion-dark: #111111
  --tallion-dark-warm: #1a1508

LOGO: Replace the logo in the header with tallion-lockup-dark.svg (it's in /images or /public/images). Height 48px desktop, 36px mobile. Alt text: "Tallion - AI Payment Infrastructure".

FAVICON: Replace with favicon.svg and favicon.ico from the brand kit folder. Add apple-touch-icon (180px PNG) and standard 32px/16px PNG fallbacks.

META: Update page title to "Tallion — AI Payment Infrastructure". Update OG tags accordingly.

Brand style notes:
- Background should be dark (#0a0a0a or #111111)
- Primary accent is gold (#d4a940)
- Muted text uses #7a6a35
- Letter-spacing on headings: 0.05-0.1em
- Uppercase labels use letter-spacing: 0.3em
```

---

## File Inventory

```
tallion-brand-kit/
├── favicon.ico                    # Multi-size ICO (16, 32, 48px)
├── favicon.svg                    # SVG favicon (scalable)
├── tallion-lockup-dark.svg        # Full logo — gold on transparent (for dark bg)
├── tallion-lockup-light.svg       # Full logo — dark text + dark icon (for light bg)
├── tallion-lockup-white.svg       # Full logo — white monochrome (for overlays/photos)
├── tallion-wordmark-gold.svg      # Wordmark only — no icon
├── png/
│   ├── tallion-icon-1024.png      # App store / marketing
│   ├── tallion-icon-512.png       # Large displays
│   ├── tallion-icon-256.png       # Standard use
│   ├── tallion-icon-192.png       # Android PWA icon
│   ├── tallion-icon-180.png       # Apple touch icon
│   ├── tallion-icon-128.png       # Medium displays
│   ├── tallion-icon-64.png        # Small displays
│   ├── tallion-icon-32.png        # Favicon fallback
│   └── tallion-icon-16.png        # Smallest favicon
└── CLAUDE-CODE-INSTRUCTIONS.md    # This file
```

## Brand Reference

| Element             | Value                                  |
|---------------------|----------------------------------------|
| Primary Gold        | `#d4a940`                              |
| Gold Light          | `#d9b044`                              |
| Gold Dark           | `#a88425`                              |
| Gold Muted          | `#7a6a35`                              |
| Background Dark     | `#0a0a0a` or `#111111`                 |
| Dark Warm           | `#1a1508`                              |
| Shield Interior     | `#1e1b10`                              |
| Light Background    | `#f7f4ee`                              |
| Font                | Montserrat (Google Fonts)              |
| Heading Weight      | 600                                    |
| Body Weight         | 400                                    |
| Logo Letter Spacing | 0.15em                                 |
| Label Letter Spacing| 0.3em, uppercase                       |
