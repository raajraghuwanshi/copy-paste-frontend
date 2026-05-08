import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'LivePaste | Fastest Real-Time Text Sharing',
  description: 'Share text and code snippets instantly between devices with a simple 5-digit code. No login required.',
  keywords: 'instant text sharing, 5-digit code text transfer, anonymous code sharing, private pastebin alternative, real-time clipboard sync, no login text share, cross-device copy paste',

  openGraph: {
    title: 'LivePaste | Instant Text Sharing',
    description: 'Sync text across devices in seconds using a simple code.',
    url: 'https://copy-paste-frontend-one.vercel.app',
    siteName: 'LivePaste',
    type: 'website',
  },
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className=" bg-white min-h-full flex flex-col">{children}</body>
    </html>
  );
}

