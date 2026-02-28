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
  title: "Tallion — AI Payment Infrastructure",
  description:
    "Tallion — AI Payment Infrastructure. Programmable cards and wallets for AI agents.",
  openGraph: {
    title: "Tallion — AI Payment Infrastructure",
    description:
      "Programmable cards and wallets for AI agents.",
    type: "website",
    images: ["/images/tallion-og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tallion — AI Payment Infrastructure",
    images: ["/images/tallion-og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/tallion-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/tallion-icon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/tallion-icon-180.png", sizes: "180x180" },
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
