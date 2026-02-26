'use client';

import { useGate } from './SceneGate';
import AudioPlayer from './AudioPlayer';
import type { Stem } from './AudioPlayer';

interface Props {
  stems: Stem[];
}

export default function AudioOverlay({ stems }: Props) {
  const { unlocked } = useGate();

  return (
    <>
      {/* Blur gate overlay — fades out on unlock */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-lg transition-opacity duration-700 ${
          unlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Audio player — single always-mounted tree, repositions on unlock */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          unlocked ? 'pointer-events-none' : ''
        }`}
      >
        <div
          className={`relative ${unlocked ? 'aspect-video' : ''}`}
          style={
            unlocked
              ? { width: 'min(100%, calc(100vh * 16 / 9))', maxWidth: '1920px' }
              : undefined
          }
        >
          <div
            className={`pointer-events-auto ${
              unlocked ? 'absolute bottom-6 right-6' : ''
            }`}
          >
            <AudioPlayer stems={stems} gateMode={!unlocked} />
          </div>
        </div>
      </div>
    </>
  );
}
