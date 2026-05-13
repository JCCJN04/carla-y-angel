'use client'

import Script from 'next/script'

export default function TallyEmbed() {
  return (
    <>
      <iframe
        data-tally-src="https://tally.so/embed/1ADYGl?hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height={320}
        scrolling="no"
        style={{ display: 'block', border: 'none' }}
        title="RSVP — Boda Carla &amp; Ángel"
        allow="clipboard-write"
      />
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          if (typeof Tally !== 'undefined') Tally.loadEmbeds()
        }}
      />
    </>
  )
}
