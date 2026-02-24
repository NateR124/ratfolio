'use client';

import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (unavailable) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={src} loop onError={() => setUnavailable(true)} />
      <button
        onClick={toggle}
        className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 hover:border-amber-400/50 transition-all shadow-lg"
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        )}
      </button>
    </div>
  );
}
