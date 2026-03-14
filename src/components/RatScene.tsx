'use client';

import { useRouter } from 'next/navigation';
import { Rat } from '@/lib/rats';
import Image from 'next/image';
import { useEffect, useState } from 'react';



interface RatSceneProps {
  rats: Rat[];
}

export default function RatScene({ rats }: RatSceneProps) {
  const router = useRouter();
  const [hoveredRat, setHoveredRat] = useState<string | null>(null);
  const [baseLoaded, setBaseLoaded] = useState(false);

  // Tier 3: preload detail page images in the background after hover variants mount
  useEffect(() => {
    if (!baseLoaded) return;
    const timer = setTimeout(() => {
      rats.forEach((rat) => {
        const img = new window.Image();
        img.src = rat.imagePath;
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [baseLoaded, rats]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div
        className="relative aspect-video bg-neutral-900"
        style={{ width: 'min(100%, calc(100vh * 16 / 9))', maxWidth: '1920px' }}
      >
        {/* Tier 1: base scene — loads first, gates everything else */}
        <Image
          src="/images/rat_main_menu.png"
          alt="Scene"
          fill
          className="object-cover"
          priority
          onLoad={() => setBaseLoaded(true)}
        />

        {/* Tier 2: hover variants — only mount after base image is ready */}
        {baseLoaded && rats.map((rat) => (
          <Image
            key={rat.id}
            src={rat.hoverScene}
            alt=""
            fill
            className={`object-cover transition-opacity duration-300 ${hoveredRat === rat.id ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Clickable regions */}
        {rats.map((rat) => (
          <div
            key={rat.id}
            className="absolute z-10 cursor-pointer"
            style={{
              left: `${rat.x1}%`,
              top: `${rat.y1}%`,
              width: `${rat.x2 - rat.x1}%`,
              height: `${rat.y2 - rat.y1}%`,
            }}
            onMouseEnter={() => setHoveredRat(rat.id)}
            onMouseLeave={() => setHoveredRat(null)}
            onClick={() => router.push(`/rats/${rat.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
