'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function BackNav() {
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (linkRef.current?.matches(':hover')) onEnter();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const animateTo = (target: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const step = () => {
      const diff = target - progressRef.current;
      if (Math.abs(diff) < 0.5) {
        progressRef.current = target;
        setProgress(target);
        return;
      }
      progressRef.current += diff * 0.18;
      setProgress(progressRef.current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const onEnter = () => {
    setHovered(true);
    timerRef.current = setTimeout(() => animateTo(100), 500);
  };

  const onLeave = () => {
    setHovered(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    animateTo(0);
  };

  const t = progress / 100;

  return (
    <Link
      href="/"
      ref={linkRef}
      className="absolute inset-y-0 left-0 w-2/5 z-10"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Glow — bleeds out to 25% of the page */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: '62.5%', // 62.5% of 40% zone = 25% of screen
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          background: 'linear-gradient(to right, rgba(255,255,255,0.38) 0%, transparent 100%)',
        }}
      />

      {/* Back text — position and opacity both driven by t (0→1) */}
      <div
        className="absolute inset-x-0 flex justify-center pointer-events-none"
        style={{
          top: '25%',
          opacity: t,
          transform: `translateX(${(1 - t) * -28}px)`,
        }}
      >
        <span className="text-amber-400 text-6xl tracking-widest uppercase font-serif font-bold">
          Back
        </span>
      </div>
    </Link>
  );
}
