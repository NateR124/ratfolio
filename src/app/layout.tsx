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
          <div className="mx-auto w-full max-w-[1920px] max-h-[1080px] aspect-video relative">
            <div className="absolute bottom-6 right-6 pointer-events-auto">
              <AudioPlayer src="/audio/rat-club.wav" />
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
