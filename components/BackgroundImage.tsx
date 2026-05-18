export default function BackgroundImage() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/carlayangel/fondo.svg"
        alt=""
        loading="eager"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          display: 'block',
        }}
      />
      {/* Velo crema para suavizar y dar warmth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(250, 244, 235, 0.55)',
        }}
      />
    </div>
  )
}
