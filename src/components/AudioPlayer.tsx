'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export interface Stem {
  ratId: string | string[] | null; // null = base/default; array = shared stem
  path: string;
}

interface Props {
  stems: Stem[];
}

export default function AudioPlayer({ stems }: Props) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainsRef = useRef<GainNode[]>([]);
  const activeRef = useRef(0);
  const loadedRef = useRef(false);
  const availableRef = useRef(new Set<number>());
  const volRef = useRef(0.25);

  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [unavailable, setUnavailable] = useState(false);

  const pathname = usePathname();

  // Map the current pathname to a stem index, falling back to 0 (base)
  const resolve = (path: string): number => {
    const m = path.match(/^\/rats\/(.+)$/);
    if (m) {
      const ratId = m[1];
      const i = stems.findIndex(s =>
        s.ratId === ratId || (Array.isArray(s.ratId) && s.ratId.includes(ratId))
      );
      if (i > 0 && availableRef.current.has(i)) return i;
    }
    return 0;
  };

  // Crossfade all gain nodes toward the target index
  const fade = (to: number, dur = 1.5) => {
    const ctx = ctxRef.current;
    const gains = gainsRef.current;
    if (!ctx || !gains.length) return;
    const now = ctx.currentTime;
    gains.forEach((g, i) => {
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(g.gain.value, now);
      g.gain.linearRampToValueAtTime(i === to ? volRef.current : 0, now + dur);
    });
    activeRef.current = to;
  };

  // Route changes → crossfade to the matching stem (or base)
  useEffect(() => {
    if (!playing || !loadedRef.current) return;
    fade(resolve(pathname));
  }, [pathname, playing]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    volRef.current = v;
    setVolume(v);
    const ctx = ctxRef.current;
    const gains = gainsRef.current;
    if (ctx && gains.length) {
      gains[activeRef.current]?.gain.setTargetAtTime(v, ctx.currentTime, 0.05);
    }
  };

  const start = async () => {
    setLoading(true);
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const results = await Promise.allSettled(
      stems.map(({ path }) =>
        fetch(path)
          .then(r => { if (!r.ok) throw new Error(r.statusText); return r.arrayBuffer(); })
          .then(b => ctx.decodeAudioData(b))
      )
    );

    // Base stem must load — if it failed there's nothing to play
    if (results[0].status === 'rejected') {
      setUnavailable(true);
      setLoading(false);
      return;
    }

    const startTime = ctx.currentTime + 0.05;
    const gains: GainNode[] = [];

    // Create all gain nodes silent first, then bring up the active one after resolving
    results.forEach((res, i) => {
      const g = ctx.createGain();
      g.gain.value = 0;
      g.connect(ctx.destination);
      gains.push(g);

      if (res.status === 'fulfilled') {
        const src = ctx.createBufferSource();
        src.buffer = res.value;
        src.loop = true;
        src.connect(g);
        src.start(startTime);
        availableRef.current.add(i);
      }
    });

    gainsRef.current = gains;
    loadedRef.current = true;

    // Now that availableRef is populated, resolve the correct starting stem
    const idx = resolve(pathname);
    activeRef.current = idx;
    gains[idx]?.gain.setValueAtTime(volRef.current, ctx.currentTime);

    setLoading(false);
    setPlaying(true);
    setExpanded(true);
  };

  const toggle = async () => {
    const ctx = ctxRef.current;
    if (playing) {
      await ctx?.suspend();
      setPlaying(false);
      setExpanded(false);
    } else if (ctx?.state === 'suspended') {
      await ctx.resume();
      setPlaying(true);
      setExpanded(true);
    } else {
      await start();
    }
  };

  useEffect(() => () => { ctxRef.current?.close(); }, []);

  if (unavailable) return null;

  return (
    <div>
      <div className="flex items-center bg-black/60 backdrop-blur-md border border-white/20 rounded-full shadow-lg overflow-hidden">

        {/* Volume slider */}
        <div className={`flex items-center gap-2 transition-all duration-300 overflow-hidden ${
          expanded ? 'max-w-[180px] pl-4 pr-2 opacity-100' : 'max-w-0 opacity-0 pointer-events-none'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white/40 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.348 2.595.342 1.241 1.519 1.905 2.66 1.905H6.44l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />
            <path d="M18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
            <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
          </svg>
          <input
            type="range" min="0" max="1" step="0.05"
            value={volume} onChange={handleVolume}
            className="w-20 accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Play/Pause/Loading button */}
        <div className="relative flex items-center justify-center">
          {/* Pulse ring — visible only when idle (not playing, not loading) */}
          <div className={`absolute inset-0 rounded-full border-2 border-amber-400/60 transition-opacity duration-500 pointer-events-none ${
            !playing && !loading ? 'animate-pulse opacity-100' : 'opacity-0'
          }`} />
          <button
            onClick={toggle}
            disabled={loading}
            className={`flex-shrink-0 text-white flex items-center justify-center hover:bg-white/10 transition-all duration-300 disabled:opacity-50 ${
              !playing && !loading ? 'w-16 h-16' : 'w-12 h-12'
            }`}
            title={playing ? 'Pause music' : 'Play music'}
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : playing ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
