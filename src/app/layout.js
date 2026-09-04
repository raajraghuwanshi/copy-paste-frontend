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
  metadataBase: new URL('https://copy-paste-tan.vercel.app'),
  title: {
    default: 'LivePaste | Real-Time Stationery Sync & Instant Text Sharing',
    template: '%s | LivePaste',
  },
  description: 'Share text, code snippets, and notes instantly across phones, tablets, and computers using a simple 5-digit room code with real-time stationery notebook sync.',
  keywords: [
    'livepaste', 'instant text sharing', 'notebook UI', 'stationery sync', 
    'real-time pastebin', '5-digit room code text transfer', 'cross-device clipboard', 
    'online notepad', 'temporary text share'
  ],
  authors: [{ name: 'LivePaste Team' }],
  creator: 'LivePaste',
  publisher: 'LivePaste',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://copy-paste-tan.vercel.app',
  },
  openGraph: {
    title: 'LivePaste | Real-Time Stationery Sync & Instant Text Sharing',
    description: 'Sync text across devices in seconds using a simple 5-digit room code in a tactile notebook interface.',
    url: 'https://copy-paste-tan.vercel.app',
    siteName: 'LivePaste',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LivePaste | Real-Time Text Sync',
    description: 'Instant cross-device text sharing with 5-digit room code.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
