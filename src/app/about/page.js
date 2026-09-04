import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Share2, Shield, QrCode, Lock, Zap, FileText, CheckCircle2, 
  HelpCircle, Sparkles, Pin, Globe, Smartphone, Laptop 
} from 'lucide-react';

export const metadata = {
  title: 'About LivePaste | Real-Time Text & Code Sharing Tool',
  description: 'Learn how LivePaste enables instant, cross-device text sharing with a tactile stationery notebook UI, 5-digit room codes, QR code scanning, and room lock privacy.',
  keywords: [
    'about livepaste', 'real-time pastebin', 'instant text transfer', 
    'cross-device sync', 'online notebook', '5-digit code text share', 
    'secure text sync', 'zero login text share'
  ],
  alternates: {
    canonical: 'https://copy-paste-tan.vercel.app/about',
  },
  openGraph: {
    title: 'About LivePaste | Instant Cross-Device Text Sharing',
    description: 'Discover the ultimate zero-setup clipboard & stationery workspace for instant text sync across all devices.',
    url: 'https://copy-paste-tan.vercel.app/about',
    siteName: 'LivePaste',
    type: 'website',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is LivePaste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LivePaste is a real-time, cross-device text sharing application designed with a tactile stationery notebook interface. It lets users instantly copy and sync text, code snippets, and notes between phones, laptops, and tablets using a simple 5-digit room code or QR code."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need an account or sign-up to use LivePaste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No account or registration is required. LivePaste works instantly out-of-the-box in any modern web browser. Simply open the site or type a 5-digit room code to start syncing."
      }
    },
    {
      "@type": "Question",
      "name": "How does the 5-digit room code sync work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each workspace room is assigned a unique 5-digit room code. When multiple devices join the same room code, any text entered in the notebook syncs automatically across all connected devices in real time via websockets."
      }
    },
    {
      "@type": "Question",
      "name": "Is my text data secure and private on LivePaste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Rooms support a Room Lock feature that allows room creators to lock access to prevent new users from joining. Furthermore, data is maintained in ephemeral room sessions and local browser storage."
      }
    }
  ]
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#2A5BA7] font-ui selection:bg-[#E8F0FE] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Header */}
      <header className="bg-white border-b border-[#E4EAF2] sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1140px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-[10px] bg-[#2A5BA7] flex items-center justify-center text-white text-lg shadow-sm font-bold group-hover:scale-105 transition-transform">
                📋
              </div>
              <div>
                <span className="text-[19px] font-bold text-[#2A5BA7] leading-tight block">LivePaste</span>
                <span className="text-[11px] font-semibold text-[#7C8CA6] block">Real-time Stationery Sync</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 min-h-[40px] px-4 bg-[#2A5BA7] hover:bg-[#1f4889] text-white font-bold text-[13px] rounded-full shadow-sm transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Notepad</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1140px] w-full mx-auto px-4 py-8 flex flex-col gap-10">
        
        {/* Hero Section */}
        <section className="bg-white rounded-[24px] border border-[#EEF2F7] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8F0FE] rounded-full blur-3xl opacity-60 pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#2A5BA7] text-[12px] font-bold mb-4">
              <Sparkles size={14} className="text-[#2A5BA7]" />
              <span>Zero-friction Cross-Device Text Clipboard</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2A5BA7] tracking-tight leading-[1.25] mb-4">
              The Real-Time Stationery Workspace for Seamless Text Sharing
            </h1>

            <p className="text-base sm:text-lg text-[#5B7CA8] font-semibold leading-relaxed mb-6">
              LivePaste eliminates the friction of sending links, notes, or code snippets to yourself via email or messaging apps. Type or paste your text into a tactile notebook page, share a 5-digit room code or QR code, and watch your text sync live across every connected device instantly.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="min-h-[46px] px-6 bg-[#2A5BA7] hover:bg-[#1f4889] text-white font-bold text-sm rounded-[12px] flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>Launch LivePaste Editor</span>
                <Share2 size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Core Features Grid */}
        <section className="flex flex-col gap-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2A5BA7] mb-2">
              Designed for Speed, Simplicity & Privacy
            </h2>
            <p className="text-sm sm:text-base text-[#7C8CA6] font-semibold">
              Everything you need to copy and paste text between devices without creating an account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article className="bg-white rounded-[20px] border border-[#EEF2F7] p-6 shadow-sm flex flex-col justify-between hover:border-[#CBD9F2] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F0FE] text-[#2A5BA7] flex items-center justify-center mb-4">
                  <Zap size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#2A5BA7] mb-2">
                  5-Digit Room Code Sync
                </h3>
                <p className="text-xs sm:text-sm text-[#5B7CA8] leading-relaxed font-semibold">
                  No passwords or complex registration required. Just enter a 5-digit code or share your custom room link to connect multiple devices in seconds.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-[20px] border border-[#EEF2F7] p-6 shadow-sm flex flex-col justify-between hover:border-[#CBD9F2] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F0FE] text-[#2A5BA7] flex items-center justify-center mb-4">
                  <QrCode size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#2A5BA7] mb-2">
                  Instant Mobile QR Code Scan
                </h3>
                <p className="text-xs sm:text-sm text-[#5B7CA8] leading-relaxed font-semibold">
                  Need to transfer text from your desktop to your smartphone? Simply point your mobile camera at the dynamic room QR code to open and sync instantly.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-[20px] border border-[#EEF2F7] p-6 shadow-sm flex flex-col justify-between hover:border-[#CBD9F2] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F0FE] text-[#2A5BA7] flex items-center justify-center mb-4">
                  <Lock size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#2A5BA7] mb-2">
                  Room Lock Privacy Controls
                </h3>
                <p className="text-xs sm:text-sm text-[#5B7CA8] leading-relaxed font-semibold">
                  Room creators can toggle the Room Lock setting at any time. When locked, new visitors are denied access, ensuring your room remains private.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-[20px] border border-[#EEF2F7] p-6 shadow-sm flex flex-col justify-between hover:border-[#CBD9F2] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F0FE] text-[#2A5BA7] flex items-center justify-center mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#2A5BA7] mb-2">
                  Chrome-Style Multi-Tab Notes
                </h3>
                <p className="text-xs sm:text-sm text-[#5B7CA8] leading-relaxed font-semibold">
                  Organize multiple pieces of text simultaneously using built-in horizontal stationery tabs. Double-click any tab title to rename it on the fly.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-[20px] border border-[#EEF2F7] p-6 shadow-sm flex flex-col justify-between hover:border-[#CBD9F2] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F0FE] text-[#2A5BA7] flex items-center justify-center mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#2A5BA7] mb-2">
                  Typing-Safe Two-Way Sync
                </h3>
                <p className="text-xs sm:text-sm text-[#5B7CA8] leading-relaxed font-semibold">
                  Smart debouncing and typing collision guards ensure that text entered on one device won't overwrite what you are actively typing on another.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-[20px] border border-[#EEF2F7] p-6 shadow-sm flex flex-col justify-between hover:border-[#CBD9F2] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F0FE] text-[#2A5BA7] flex items-center justify-center mb-4">
                  <Globe size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#2A5BA7] mb-2">
                  Offline Local Storage Backup
                </h3>
                <p className="text-xs sm:text-sm text-[#5B7CA8] leading-relaxed font-semibold">
                  Your tabs and text notes are stored locally in your browser so you never lose work even if your internet connection fluctuates.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white rounded-[24px] border border-[#EEF2F7] p-6 sm:p-10 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2A5BA7] mb-6">
            How to Use LivePaste in 3 Easy Steps
          </h2>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
            <li className="flex flex-col gap-2 relative">
              <span className="w-8 h-8 rounded-full bg-[#2A5BA7] text-white font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="text-base font-bold text-[#2A5BA7]">Open or Join a Room</h3>
              <p className="text-xs sm:text-sm text-[#5B7CA8] font-semibold leading-relaxed">
                Start with a auto-generated 5-digit room code or type any custom 5-digit number into the room code field.
              </p>
            </li>

            <li className="flex flex-col gap-2 relative">
              <span className="w-8 h-8 rounded-full bg-[#2A5BA7] text-white font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="text-base font-bold text-[#2A5BA7]">Type or Paste Text</h3>
              <p className="text-xs sm:text-sm text-[#5B7CA8] font-semibold leading-relaxed">
                Write notes, paste links, or draft code on the tactile ruled notebook page. Create additional tabs as needed.
              </p>
            </li>

            <li className="flex flex-col gap-2 relative">
              <span className="w-8 h-8 rounded-full bg-[#2A5BA7] text-white font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="text-base font-bold text-[#2A5BA7]">Connect Secondary Device</h3>
              <p className="text-xs sm:text-sm text-[#5B7CA8] font-semibold leading-relaxed">
                Scan the QR code or enter the same 5-digit code on your second device to view and update notes in real-time.
              </p>
            </li>
          </ol>
        </section>

        {/* FAQ Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <HelpCircle size={22} className="text-[#2A5BA7]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2A5BA7]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-[16px] border border-[#EEF2F7] p-5 shadow-sm">
              <h3 className="text-base font-bold text-[#2A5BA7] mb-2">
                Is LivePaste free to use?
              </h3>
              <p className="text-xs sm:text-sm text-[#5B7CA8] font-semibold leading-relaxed">
                Yes, LivePaste is 100% free to use with no hidden subscription fees, ads, or account requirements.
              </p>
            </div>

            <div className="bg-white rounded-[16px] border border-[#EEF2F7] p-5 shadow-sm">
              <h3 className="text-base font-bold text-[#2A5BA7] mb-2">
                What devices are supported?
              </h3>
              <p className="text-xs sm:text-sm text-[#5B7CA8] font-semibold leading-relaxed">
                LivePaste works on all modern web browsers across Windows, macOS, Linux, iOS, Android, and iPadOS.
              </p>
            </div>

            <div className="bg-white rounded-[16px] border border-[#EEF2F7] p-5 shadow-sm">
              <h3 className="text-base font-bold text-[#2A5BA7] mb-2">
                How does the Room Lock work?
              </h3>
              <p className="text-xs sm:text-sm text-[#5B7CA8] font-semibold leading-relaxed">
                When you create a room, you become the room owner. Clicking "Lock Room" prevents any new device from joining your room code until unlocked.
              </p>
            </div>

            <div className="bg-white rounded-[16px] border border-[#EEF2F7] p-5 shadow-sm">
              <h3 className="text-base font-bold text-[#2A5BA7] mb-2">
                Can I use multiple tabs in one room?
              </h3>
              <p className="text-xs sm:text-sm text-[#5B7CA8] font-semibold leading-relaxed">
                Yes! LivePaste supports Chrome-style notebook tabs so you can organize different notes, code blocks, or snippets inside a single room code.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#2A5BA7] text-white rounded-[24px] p-8 sm:p-12 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white">
              Ready to Sync Your Text in Real Time?
            </h2>
            <p className="text-sm sm:text-base text-[#E8F0FE] font-semibold mb-6">
              Start sharing notes and clipboard text instantly across devices with zero setup.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#2A5BA7] font-extrabold text-sm rounded-full shadow-md hover:bg-[#F0F4F8] transition-all active:scale-95"
            >
              <span>Open LivePaste Workspace</span>
              <Share2 size={16} />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E4EAF2] py-6 mt-10">
        <div className="max-w-[1140px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#7C8CA6]">
          <div className="flex items-center gap-2">
            <span>📋 LivePaste</span>
            <span>•</span>
            <span>Real-Time Stationery Sync</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#2A5BA7] transition-colors">
              App
            </Link>
            <Link href="/about" className="hover:text-[#2A5BA7] transition-colors">
              About & SEO
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
