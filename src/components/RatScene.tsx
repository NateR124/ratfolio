'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rat } from '@/lib/rats';
import Image from 'next/image';
import { useState } from 'react';

interface RatSceneProps {
  rats: Rat[];
}

export default function RatScene({ rats }: RatSceneProps) {
  const [hoveredRat, setHoveredRat] = useState<string | null>(null);

  // Placeholder background if user image is missing
  // In a real scenario, this would be '/images/scene-main.jpg'
  const backgroundImage = 'https://placehold.co/1920x1080/2a2a2a/FFF.png?text=Rat+Scene+Placeholder';

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background Image Container */}
      <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-video">
        <Image
          src={backgroundImage}
          alt="Main Scene"
          fill
          className="object-cover"
          priority
        />
        
        {/* Rat Hotspots */}
        {rats.map((rat) => (
          <Link
            key={rat.id}
            href={`/rats/${rat.id}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${rat.x}%`, top: `${rat.y}%` }}
            onMouseEnter={() => setHoveredRat(rat.id)}
            onMouseLeave={() => setHoveredRat(null)}
          >
            {/* Hotspot Indicator (visible on hover or always for debug) */}
            <motion.div
              className="relative w-16 h-16 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Invisible trigger area, but with a glow on hover */}
              <div className="w-full h-full rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(255,255,255,0.5)] border border-white/30" />
              
              {/* Tooltip */}
              {hoveredRat === rat.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 text-white text-sm rounded whitespace-nowrap border border-white/20 pointer-events-none z-10"
                >
                  {rat.name}
                </motion.div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
