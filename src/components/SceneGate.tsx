'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

interface GateContextType {
  unlocked: boolean;
  unlock: () => void;
}

const GateContext = createContext<GateContextType>({
  unlocked: false,
  unlock: () => {},
});

export function useGate() {
  return useContext(GateContext);
}

export default function SceneGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const unlock = useCallback(() => setUnlocked(true), []);

  return (
    <GateContext.Provider value={{ unlocked, unlock }}>
      {children}
    </GateContext.Provider>
  );
}
