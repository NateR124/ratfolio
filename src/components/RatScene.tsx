'use client';

import { useRouter } from 'next/navigation';
import { Rat } from '@/lib/rats';
import Image from 'next/image';
import { useState, useRef } from 'react';



interface RatSceneProps {
  rats: Rat[];
}

type Corner = { x: number; y: number };

export default function RatScene({ rats }: RatSceneProps) {
  const router = useRouter();
  const [hoveredRat, setHoveredRat] = useState<string | null>(null);
  const [coordPicker, setCoordPicker] = useState(false);
  const [corner1, setCorner1] = useState<Corner | null>(null);
  const [corner2, setCorner2] = useState<Corner | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPercent = (e: React.MouseEvent): Corner => {
    const rect = containerRef.current!.getBoundingClientRect();
    return {
      x: Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10,
      y: Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10,
    };
  };

  const handleSceneClick = (e: React.MouseEvent) => {
    if (!coordPicker) return;
    const pt = getPercent(e);
    if (!corner1) {
      setCorner1(pt);
      setCorner2(null);
    } else {
      setCorner2(pt);
    }
  };

  const resetPicker = () => {
    setCorner1(null);
    setCorner2(null);
  };

  // Preview rect while picking second corner
  const previewRect = corner1 && corner2 ? {
    left: Math.min(corner1.x, corner2.x),
    top: Math.min(corner1.y, corner2.y),
    right: Math.max(corner1.x, corner2.x),
    bottom: Math.max(corner1.y, corner2.y),
  } : null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div
        ref={containerRef}
        className={`relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-video bg-neutral-900 ${coordPicker ? 'cursor-crosshair' : ''}`}
        onClick={handleSceneClick}
      >
        {/* Base scene */}
        <Image src="/images/rat_main_menu.png" alt="Scene" fill className="object-cover" priority />

        {/* Hover variants */}
        {rats.map((rat) => (
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
            className={`absolute z-10 ${coordPicker ? 'pointer-events-none' : 'cursor-pointer'}`}
            style={{
              left: `${rat.x1}%`,
              top: `${rat.y1}%`,
              width: `${rat.x2 - rat.x1}%`,
              height: `${rat.y2 - rat.y1}%`,
            }}
            onMouseEnter={() => setHoveredRat(rat.id)}
            onMouseLeave={() => setHoveredRat(null)}
            onClick={(e) => { e.stopPropagation(); router.push(`/rats/${rat.id}`); }}
          />
        ))}

        {/* Coord picker: corner 1 marker */}
        {coordPicker && corner1 && (
          <div
            className="absolute w-2 h-2 bg-amber-400 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${corner1.x}%`, top: `${corner1.y}%` }}
          />
        )}

        {/* Coord picker: completed rectangle */}
        {coordPicker && previewRect && (
          <>
            <div
              className="absolute border-2 border-amber-400/80 bg-amber-400/10 pointer-events-none"
              style={{
                left: `${previewRect.left}%`,
                top: `${previewRect.top}%`,
                width: `${previewRect.right - previewRect.left}%`,
                height: `${previewRect.bottom - previewRect.top}%`,
              }}
            />
            <div
              className="absolute pointer-events-none -translate-x-1/2"
              style={{ left: `${(previewRect.left + previewRect.right) / 2}%`, top: `${previewRect.bottom}%` }}
            >
              <div className="mt-1 bg-black/90 border border-amber-400/60 text-amber-300 text-xs font-mono px-2 py-1 rounded whitespace-nowrap">
                x1: {Math.min(corner1!.x, corner2!.x)} &nbsp; y1: {Math.min(corner1!.y, corner2!.y)} &nbsp; x2: {Math.max(corner1!.x, corner2!.x)} &nbsp; y2: {Math.max(corner1!.y, corner2!.y)}
              </div>
            </div>
          </>
        )}

        {/* Coord picker: waiting for first click */}
        {coordPicker && !corner1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-amber-300/70 font-mono pointer-events-none">
            click top-left corner
          </div>
        )}
        {coordPicker && corner1 && !corner2 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-amber-300/70 font-mono pointer-events-none">
            click bottom-right corner
          </div>
        )}

        {/* Coord picker toggle */}
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          {coordPicker && (corner1 || corner2) && (
            <button
              onClick={(e) => { e.stopPropagation(); resetPicker(); }}
              className="text-xs px-3 py-1 rounded-full border bg-black/40 border-white/20 text-white/50 hover:text-white/80 transition-all"
            >
              Reset
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); setCoordPicker(!coordPicker); resetPicker(); }}
            className={`text-xs px-3 py-1 rounded-full border transition-all ${
              coordPicker
                ? 'bg-amber-400/20 border-amber-400/60 text-amber-300'
                : 'bg-black/40 border-white/20 text-white/50 hover:text-white/80'
            }`}
          >
            {coordPicker ? 'Picking...' : 'Pick Coords'}
          </button>
        </div>
      </div>
    </div>
  );
}
