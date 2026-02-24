'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rat } from '@/lib/rats';
import Image from 'next/image';
import { useState, useRef } from 'react';

interface RatSceneProps {
  rats: Rat[];
}

export default function RatScene({ rats }: RatSceneProps) {
  const [hoveredRat, setHoveredRat] = useState<string | null>(null);
  const [coordPicker, setCoordPicker] = useState(false);
  const [pickedCoord, setPickedCoord] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSceneClick = (e: React.MouseEvent) => {
    if (!coordPicker || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPickedCoord({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div
        ref={containerRef}
        className={`relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-video bg-neutral-900 ${coordPicker ? 'cursor-crosshair' : ''}`}
        onClick={handleSceneClick}
      >
        {/* Base scene */}
        <Image
          src="/images/rat_main_menu.png"
          alt="Scene"
          fill
          className="object-cover"
          priority
        />

        {/* Hover variants — stacked on top, crossfade in on hover */}
        {rats.map((rat) => (
          <Image
            key={rat.id}
            src={rat.hoverScene}
            alt=""
            fill
            className={`object-cover transition-opacity duration-300 ${hoveredRat === rat.id ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Hotspots */}
        {rats.map((rat) => (
          <Link
            key={rat.id}
            href={`/rats/${rat.id}`}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 group ${coordPicker ? 'pointer-events-none' : ''}`}
            style={{ left: `${rat.x}%`, top: `${rat.y}%` }}
            onMouseEnter={() => setHoveredRat(rat.id)}
            onMouseLeave={() => setHoveredRat(null)}
          >
            <motion.div
              className="relative w-16 h-16 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
              </div>
              <div className="w-full h-full rounded-full bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(251,191,36,0.4)] border border-amber-400/40" />
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

        {/* Coord picker readout */}
        {coordPicker && pickedCoord && (
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-full pointer-events-none"
            style={{ left: `${pickedCoord.x}%`, top: `${pickedCoord.y}%` }}
          >
            <div className="bg-black/90 border border-amber-400/60 text-amber-300 text-xs font-mono px-2 py-1 rounded mb-1 whitespace-nowrap">
              x: {pickedCoord.x} &nbsp; y: {pickedCoord.y}
            </div>
            <div className="w-2 h-2 rounded-full bg-amber-400 mx-auto" />
          </div>
        )}

        {/* Coord picker toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); setCoordPicker(!coordPicker); setPickedCoord(null); }}
          className={`absolute top-3 right-3 z-20 text-xs px-3 py-1 rounded-full border transition-all ${
            coordPicker
              ? 'bg-amber-400/20 border-amber-400/60 text-amber-300'
              : 'bg-black/40 border-white/20 text-white/50 hover:text-white/80'
          }`}
        >
          {coordPicker ? 'Picking...' : 'Pick Coords'}
        </button>
      </div>
    </div>
  );
}
