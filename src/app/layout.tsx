import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tallion.ai"),
  title: "Tallion — The World's First AI-Native Card",
  description:
    "Giving AI the ability to think was the first revolution. Giving it the ability to pay is the second. Your agents find deals, book flights, and manage subscriptions — while you sleep.",
  openGraph: {
    title: "Tallion — The World's First AI-Native Card",
    description:
      "Giving AI the ability to think was the first revolution. Giving it the ability to pay is the second. Your agents find deals, book flights, and manage subscriptions — while you sleep.",
    url: "https://tallion.ai",
    siteName: "Tallion",
    type: "website",
    images: [{ url: "/images/tallion-og-image.png", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title: "Tallion — The World's First AI-Native Card",
    description: "Giving AI the ability to think was the first revolution. Giving it the ability to pay is the second. Your agents find deals, book flights, and manage subscriptions — while you sleep.",
    images: ["/images/tallion-og-image.png"],
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
      <body>{children}</body>
    </html>
  );
}
