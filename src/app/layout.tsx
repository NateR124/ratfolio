import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import SceneGate from "@/components/SceneGate";
import AudioOverlay from "@/components/AudioOverlay";

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
        <SceneGate>
          {children}

          <AudioOverlay stems={[
            { ratId: null,                        path: '/audio/rat-club.wav' },
            { ratId: 'poker-crew',                path: '/audio/rat-club-poker.wav' },
            { ratId: 'thaddeus',                  path: '/audio/rat-club-thaddeus.wav' },
            { ratId: 'frankie',                   path: '/audio/rat-club-frankie.wav' },
            { ratId: ['barnaby', 'percival'],      path: '/audio/rat-club-rogue.wav' },
            { ratId: 'bubbles',                   path: '/audio/rat-club-bubbles.wav' },
          ]} />

          {/* Mobile notice */}
          <div className="fixed inset-0 z-40 bg-black md:hidden pointer-events-none">
            <Image src="/images/rat_mobile.png" alt="Best viewed on desktop" fill className="object-cover" />
          </div>
        </SceneGate>
      </body>
    </html>
  );
}
