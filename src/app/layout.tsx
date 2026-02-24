import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ratfolio",
  description: "A gallery of distinguished rats.",
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://ratfolio.vercel.app'
      : 'http://localhost:3000'
  ),
  openGraph: {
    title: "Ratfolio",
    description: "A gallery of distinguished rats.",
    images: [{ url: '/images/rat_main_menu.png', width: 1920, height: 1080 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/rat_main_menu.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Audio player — anchored to bottom-right of the scene frame */}
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="mx-auto w-full max-w-[1920px] h-full md:h-auto md:max-h-[1080px] md:aspect-video relative">
            <div className="absolute bottom-6 right-6 pointer-events-auto">
              <AudioPlayer stems={[
                { ratId: null,                        path: '/audio/rat-club.wav' },
                { ratId: 'poker-crew',                path: '/audio/rat-club-poker.wav' },
                { ratId: 'thaddeus',                  path: '/audio/rat-club-thaddeus.wav' },
                { ratId: 'frankie',                   path: '/audio/rat-club-frankie.wav' },
                { ratId: ['barnaby', 'percival'],      path: '/audio/rat-club-rogue.wav' },
                { ratId: 'bubbles',                   path: '/audio/rat-club-bubbles.wav' },
              ]} />
            </div>
          </div>
        </div>

        {/* Mobile notice */}
        <div className="fixed inset-0 z-40 bg-black md:hidden pointer-events-none">
          <Image src="/images/rat_mobile.png" alt="Best viewed on desktop" fill className="object-cover" />
        </div>
      </body>
    </html>
  );
}
