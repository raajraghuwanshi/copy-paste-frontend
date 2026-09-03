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
  title: 'LivePaste | Real-Time Stationery Sync',
  description: 'Share text and notes instantly across devices with stationery notebook aesthetics and a 5-digit room code.',
  keywords: 'livepaste, instant text sharing, notebook UI, stationery sync, real-time pastebin, 5-digit code text transfer',
  openGraph: {
    title: 'LivePaste | Real-Time Stationery Sync',
    description: 'Sync text across devices in seconds using a simple code in a tactile notebook interface.',
    url: 'https://copy-paste-frontend-one.vercel.app',
    siteName: 'LivePaste',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${kalam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

