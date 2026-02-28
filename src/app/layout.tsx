import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tallion.ai"),
  title: "Tallion — The Trust Layer for Agent Commerce",
  description:
    "Your AI agent found the perfect flight. It can't buy it. Tallion gives every agent the power to transact — with you in control.",
  openGraph: {
    title: "Tallion — The Trust Layer for Agent Commerce",
    description:
      "Programmable cards and wallets for AI agents.",
    url: "https://tallion.ai",
    siteName: "Tallion",
    type: "website",
    images: [{ url: "/images/tallion-icon-1024.png", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title: "Tallion — The Trust Layer for Agent Commerce",
    description: "Programmable cards and wallets for AI agents.",
    images: ["/images/tallion-icon-1024.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/images/tallion-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/tallion-icon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/tallion-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ background: "#0a0a0a", margin: 0 }}>{children}</body>
    </html>
  );
}
