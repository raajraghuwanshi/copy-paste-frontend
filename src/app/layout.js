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
  keywords: 'copy paste online, real-time text sharing, live clipboard, sync text',
  verification: {
    google: 'google1d93dd9f67f80839.html',
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

