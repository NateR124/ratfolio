'use client';

import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5; // Start at 50% volume
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.error('Autoplay failed:', err);
          setError('Autoplay blocked. Click to play.');
        }
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [src]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={src} loop />
      {!isPlaying && (
        <button
          onClick={() => {
            audioRef.current?.play();
            setIsPlaying(true);
            setError(null);
          }}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all"
        >
          {error || 'Play Audio'}
        </button>
      )}
      {isPlaying && (
        <div className="text-white/50 text-xs animate-pulse">
          Now Playing
        </div>
      )}
    </div>
  );
}
