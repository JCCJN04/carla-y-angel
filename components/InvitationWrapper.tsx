'use client';

import { useState } from 'react';
import EnvelopeIntro from './EnvelopeIntro';
import MusicPlayer from './MusicPlayer';

export default function InvitationWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <EnvelopeIntro onOpen={() => setShowIntro(false)} />}
      {!showIntro && <MusicPlayer />}
      {children}
    </>
  );
}
