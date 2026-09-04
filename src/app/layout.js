import { Quicksand, Kalam } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-quicksand",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kalam",
});

export const metadata = {
  title: 'LivePaste',
  description: 'Share text and notes instantly across devices with stationery notebook aesthetics and a 5-digit room code.',
  keywords: 'livepaste, instant text sharing, notebook UI, real-time sync, real-time pastebin, 5-digit code text transfer',
  openGraph: {
    title: 'LivePaste',
    description: 'Sync text across devices in seconds using a simple code in a tactile notebook interface.',
    url: 'https://copy-paste-tan.vercel.app',
    siteName: 'LivePaste',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LivePaste",
  "url": "https://copy-paste-tan.vercel.app",
  "description": "Share text and notes instantly between devices using a simple 5-digit room code — no signup required.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${kalam.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}