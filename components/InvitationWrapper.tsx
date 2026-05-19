'use client';

import { useState } from 'react';
import EnvelopeIntro from './EnvelopeIntro';
import MusicPlayer from './MusicPlayer';
import HamburgerMenu from './HamburgerMenu';

export default function InvitationWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <EnvelopeIntro onOpen={() => setShowIntro(false)} />}
      {!showIntro && (
        <>
          <HamburgerMenu />
          <MusicPlayer />
        </>
      )}
      {children}
    </>
  );
}
