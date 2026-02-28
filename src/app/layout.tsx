import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, IBM_Plex_Mono, Sora, JetBrains_Mono } from "next/font/google";
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

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
      className={`${dmSans.variable} ${dmSerif.variable} ${ibmPlexMono.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ background: "#050505", margin: 0 }}>{children}</body>
    </html>
  );
}
