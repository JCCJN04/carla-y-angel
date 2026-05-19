'use client';

import { useState, useEffect } from 'react';

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClick = () => {
    if (isExiting) return;
    setIsExiting(true);
    document.body.style.overflow = '';
    setTimeout(onOpen, 950);
  };

  return (
    <div className={`env-screen${isExiting ? ' env-screen--exit' : ''}`}>
      {/* Background — mismo fondo del proyecto */}
      <div aria-hidden="true" className="env-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/carlayangel/fondo.svg" alt="" loading="eager" decoding="async" />
        <div className="env-bg-veil" />
      </div>

      <div className="env-content">
        {/* ── Título ── */}
        <div className="env-title">
          <h1 className="env-names">
            Carla <span className="env-amp">&amp;</span> Ángel
          </h1>
        </div>

        {/* ── Sobre (clickeable) ── */}
        <div className="env-img-wrap" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Resplandor suave alrededor (estilo citli y amed) */}
          <div 
            aria-hidden="true" 
            style={{
              position: 'absolute',
              inset: '-1rem',
              backgroundColor: 'rgba(210, 160, 160, 0.3)', // Aumentado el glow
              borderRadius: '2rem',
              filter: 'blur(35px)',
              transform: 'scale(1.15)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          
          {/* Sombra base en la parte inferior */}
          <div 
            style={{
              position: 'absolute',
              left: '3rem',
              right: '3rem',
              bottom: '-0.5rem',
              height: '2.5rem',
              backgroundColor: 'rgba(0,0,0,0.3)',
              filter: 'blur(20px)',
              borderRadius: '50%',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/sobre.png"
            alt="Sobre de invitación"
            className={`env-img${isExiting ? ' env-img--exit' : ''}`}
            onClick={handleClick}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            role="button"
            tabIndex={0}
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.45))', // Sombra directa mucho más marcada
              position: 'relative',
              zIndex: 10,
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
          />
        </div>

        {/* ── Pista: texto + flecha ── */}
        <div className="env-hint">
          <p className="env-instruction">
            Toca el sobre para<br />abrir tu invitación
          </p>
        </div>

      </div>
    </div>
  );
}
