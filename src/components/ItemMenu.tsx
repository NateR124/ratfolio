'use client';

import { useState } from 'react';
import { useGate } from './SceneGate';

export default function ItemMenu() {
  const { unlocked } = useGate();
  const [expanded, setExpanded] = useState(false);
  const [dragging] = useState(false); // future: set true when dragging an item

  if (!unlocked) return null;

  const isOpen = expanded && !dragging;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 flex justify-center pointer-events-none">
      <div
        className="pointer-events-auto w-[95%]"
        onMouseEnter={() => !dragging && setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div
          className={`relative rounded-t-2xl bg-gradient-to-t from-stone-900/95 via-stone-800/90 to-stone-700/80 backdrop-blur-md border border-b-0 border-amber-400/20 shadow-[0_-4px_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out overflow-hidden ${
            isOpen ? 'h-[25vh] min-h-[300px]' : 'h-[5vh] min-h-[40px]'
          }`}
        >
          {/* Handle bar — click to collapse */}
          <div
            className="flex justify-center pt-3 pb-2 cursor-pointer"
            onClick={() => setExpanded(false)}
          >
            <div className="w-16 h-1 rounded-full bg-amber-400/40" />
          </div>

          {/* Item slots */}
          <div
            className={`px-6 pb-4 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="grid grid-cols-8 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border border-white/10 bg-white/5"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
