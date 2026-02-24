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
        <AudioPlayer src="/audio/rat-club.wav" />

        {/* Mobile notice */}
        <div className="fixed inset-0 z-40 bg-black md:hidden pointer-events-none">
          <Image src="/images/rat_mobile.png" alt="Best viewed on desktop" fill className="object-cover" />
        </div>
      </body>
    </html>
  );
}
