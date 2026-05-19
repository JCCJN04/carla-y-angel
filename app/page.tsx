import { Suspense } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import GSAPAnimations from "@/components/GSAPAnimations";
import TallyEmbed from "@/components/TallyEmbed";
import WeatherSection from "@/components/WeatherSection";
import RecuerdosButton from "@/components/RecuerdosButton";
import InvitationWrapper from "@/components/InvitationWrapper";

export default function Home() {
  return (
    <InvitationWrapper>
      <GSAPAnimations />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <header className="hero" role="banner">
        <div className="hero-blob-wrap" aria-hidden="true">
          <div className="hero-blob" />
        </div>

        <div className="hero-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            className="hero-script"
            role="heading"
            aria-level={1}
            style={{ opacity: 0 }}
          >
            <span>Carla</span>
            <span className="ampersand-script">&amp;</span>
            <span>Ángel</span>
          </div>

          <div 
            style={{ 
              marginTop: '2rem',
              width: '100%',
              maxWidth: '340px',
              padding: '0 1rem',
              position: 'relative'
            }}
          >
            {/* Marco decorativo dorado sutil */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-0.5rem 0.5rem',
                border: '1px solid rgba(196, 160, 90, 0.35)',
                borderRadius: '10rem 10rem 1rem 1rem',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/carlayangel/foto-calle-bw-noche-caminando.jpeg" 
              alt="Carla y Ángel caminando de noche"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '4/5',
                objectFit: 'cover',
                borderRadius: '10rem 10rem 1rem 1rem', // Estilo arco editorial
                boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                display: 'block',
                position: 'relative',
                zIndex: 1
              }}
            />
          </div>
        </div>

        <div className="hero-connector" aria-hidden="true" />
      </header>

      {/* ══ MENSAJE ═══════════════════════════════════════════════════ */}
      <section className="section reveal" aria-labelledby="msg-title">
        <h2 id="msg-title" className="section-title gradient-heading">
          Queremos que estés ahí
        </h2>
        <p className="section-body">
          Después de mucho tiempo compartido, llegó el día de hacerlo oficial.
          Queremos que estés con nosotros cuando le digamos sí al resto de
          nuestras vidas.
        </p>
      </section>

      {/* ══ GALERÍA ═══════════════════════════════════════════════════ */}
      <section className="gallery-section" aria-label="Fotos de compromiso">
        {/* Row 1: portrait left + landscape right */}
        <div className="gallery-row gallery-row--a">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-luces-abrazo.jpeg"
            alt="Carla y Ángel bajo un arco de luces doradas"
            className="gallery-img gallery-img--portrait gallery-img--1"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-calle-bw-beso-inclinado.jpeg"
            alt="Beso en la calle bajo luces de navidad"
            className="gallery-img gallery-img--landscape gallery-img--2"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Row 2: 2 images */}
        <div className="gallery-row gallery-row--d">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-puente-estrella-beso.jpeg"
            alt="Beso en el puente con estrella dorada al fondo"
            className="gallery-img gallery-img--3"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-calle-bw-periodico.jpeg"
            alt="Beso con periódico Carla y Ángel"
            className="gallery-img gallery-img--5"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <RecuerdosButton />

      {/* ══ COUNTDOWN ═════════════════════════════════════════════════ */}

      <div
        className="band band--warm reveal"
        role="region"
        aria-label="Cuenta regresiva"
      >
        {/* Decorative corner ornaments */}
        <svg aria-hidden="true" className="band-ornament band-ornament--tl" viewBox="0 0 120 120" fill="none">
          <path d="M10 10 Q60 10 60 60" stroke="rgba(196,160,90,0.35)" strokeWidth="0.8"/>
          <path d="M10 10 Q10 60 60 60" stroke="rgba(196,160,90,0.35)" strokeWidth="0.8"/>
          <circle cx="10" cy="10" r="3" fill="rgba(196,160,90,0.4)"/>
          <circle cx="60" cy="60" r="2" fill="rgba(196,160,90,0.25)"/>
          <path d="M25 10 Q25 25 10 25" stroke="rgba(196,160,90,0.2)" strokeWidth="0.6"/>
          <path d="M10 40 Q40 40 40 10" stroke="rgba(196,160,90,0.15)" strokeWidth="0.5"/>
        </svg>
        <svg aria-hidden="true" className="band-ornament band-ornament--tr" viewBox="0 0 120 120" fill="none">
          <path d="M110 10 Q60 10 60 60" stroke="rgba(196,160,90,0.35)" strokeWidth="0.8"/>
          <path d="M110 10 Q110 60 60 60" stroke="rgba(196,160,90,0.35)" strokeWidth="0.8"/>
          <circle cx="110" cy="10" r="3" fill="rgba(196,160,90,0.4)"/>
          <circle cx="60" cy="60" r="2" fill="rgba(196,160,90,0.25)"/>
          <path d="M95 10 Q95 25 110 25" stroke="rgba(196,160,90,0.2)" strokeWidth="0.6"/>
          <path d="M110 40 Q80 40 80 10" stroke="rgba(196,160,90,0.15)" strokeWidth="0.5"/>
        </svg>
        <svg aria-hidden="true" className="band-ornament band-ornament--bl" viewBox="0 0 120 120" fill="none">
          <path d="M10 110 Q60 110 60 60" stroke="rgba(196,160,90,0.35)" strokeWidth="0.8"/>
          <path d="M10 110 Q10 60 60 60" stroke="rgba(196,160,90,0.35)" strokeWidth="0.8"/>
          <circle cx="10" cy="110" r="3" fill="rgba(196,160,90,0.4)"/>
          <circle cx="60" cy="60" r="2" fill="rgba(196,160,90,0.25)"/>
        </svg>
        <svg aria-hidden="true" className="band-ornament band-ornament--br" viewBox="0 0 120 120" fill="none">
          <path d="M110 110 Q60 110 60 60" stroke="rgba(196,160,90,0.35)" strokeWidth="0.8"/>
          <path d="M110 110 Q110 60 60 60" stroke="rgba(196,160,90,0.35)" strokeWidth="0.8"/>
          <circle cx="110" cy="110" r="3" fill="rgba(196,160,90,0.4)"/>
          <circle cx="60" cy="60" r="2" fill="rgba(196,160,90,0.25)"/>
        </svg>

        {/* Top & bottom edge lines */}
        <div className="band-edge band-edge--top" aria-hidden="true" />
        <div className="band-edge band-edge--bottom" aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="band-script">Cuenta regresiva</span>
          <Suspense
            fallback={
              <div className="countdown-grid">
                {["Días", "Horas", "Minutos", "Segundos"].map((l) => (
                  <div key={l} className="countdown-item">
                    <div className="countdown-circle">
                      <span className="countdown-num">—</span>
                    </div>
                    <span className="countdown-label">{l}</span>
                  </div>
                ))}
              </div>
            }
          >
            <CountdownTimer />
          </Suspense>
        </div>
      </div>

      {/* ══ PROGRAMA ══════════════════════════════════════════════════ */}
      <section
        id="programa"
        className="section reveal"
        style={{ maxWidth: 700 }}
        aria-labelledby="prog-title"
      >
        <h2 id="prog-title" className="section-title gradient-heading">
          Programa del día
        </h2>

        <div style={{ position: 'relative', maxWidth: '36rem', margin: '3rem auto 0', padding: '1rem' }}>
          {/* Contenedor principal con forma orgánica moderna */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#ebe6dc',
              padding: '4rem 0.5rem',
              boxShadow: '0 15px 50px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              borderRadius: '40% 60% 50% 50% / 45% 50% 50% 55%',
              transform: 'rotate(0deg)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/carlayangel/itinerario.png"
              alt="Itinerario del día"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transform: 'scale(1.15)',
                mixBlendMode: 'multiply',
                filter: 'grayscale(100%) contrast(150%) brightness(110%)'
              }}
              loading="lazy"
            />
          </div>
          
          {/* Sombra decorativa desfasada */}
          <div
            style={{
              position: 'absolute',
              bottom: '0.5rem',
              right: '0.5rem',
              width: 'calc(100% - 3rem)',
              height: 'calc(100% - 3rem)',
              backgroundColor: 'rgba(212, 197, 185, 0.4)',
              borderRadius: '40% 60% 50% 50% / 45% 50% 50% 55%',
              zIndex: -1
            }}
          />
        </div>
      </section>

      {/* ══ SEDES ═════════════════════════════════════════════════════ */}
      <section className="section reveal" aria-labelledby="venues-title">
        <h2 id="venues-title" className="section-title gradient-heading">
          ¿Dónde nos vemos?
        </h2>

        <div className="venue-grid">
          {/* ── Iglesia ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p className="venue-event-label" style={{ textAlign: 'center' }}>Ceremonia Religiosa</p>
            <article className="venue-card-l1 reveal-left">
              <div className="venue-card-l2">
                <div className="venue-card-l3">
                  <div className="venue-card venue-card--map">
                    <div className="venue-map-top">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/carlayangel/iglesia.png"
                        alt="Iglesia San José Mirador"
                        style={{ width: '100%', height: 210, objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div className="venue-card-inner venue-card-body">
                      <p className="venue-card-time">16:00 hrs</p>
                      <h3 className="venue-card-name">Iglesia San José Mirador</h3>
                      <div className="venue-card-addr">Chiapas</div>
                      <div className="venue-card-divider" aria-hidden="true" />
                      <a
                        href="https://maps.google.com/?q=Iglesia+San+Jose+Mirador+Chiapas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue-link venue-link--block"
                        aria-label="Ver Iglesia San José Mirador en Google Maps"
                      >
                        Ver ubicación
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* ── Salón ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p className="venue-event-label" style={{ textAlign: 'center' }}>Ceremonia Civil y Recepción</p>
            <article className="venue-card-l1 reveal-right">
              <div className="venue-card-l2">
                <div className="venue-card-l3">
                  <div className="venue-card venue-card--map">
                    <div className="venue-map-top">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/carlayangel/salon.png"
                        alt="Salón Glück"
                        style={{ width: '100%', height: 210, objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div className="venue-card-inner venue-card-body">
                      <p className="venue-card-time">18:00 hrs</p>
                      <h3 className="venue-card-name">Salón Glück</h3>
                      <div className="venue-card-addr">Chiapas</div>
                      <div className="venue-card-divider" aria-hidden="true" />
                      <a
                        href="https://maps.google.com/?q=Salon+Gluck+Chiapas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue-link venue-link--block"
                        aria-label="Ver Salón Glück en Google Maps"
                      >
                        Ver ubicación
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ══ CLIMA ═════════════════════════════════════════════════════ */}
      <WeatherSection />

      {/* ══ RSVP ══════════════════════════════════════════════════════ */}
      <div id="rsvp" className="rsvp-wrap" role="region" aria-labelledby="rsvp-title">
        <div className="rsvp-inner reveal">
          <h2 id="rsvp-title" className="rsvp-script">
            ¿Nos acompañas?
          </h2>
          <p className="section-body" style={{ marginTop: ".75rem" }}>
            Solo necesitamos saber si estarás con nosotros.
            <br />
            Confirma antes del{" "}
            <strong>1 de noviembre de 2026</strong> — nos ayuda a preparar
            cada detalle con cariño.
          </p>

          <div className="rsvp-embed-direct">
            <TallyEmbed />
          </div>
        </div>
      </div>

      {/* ══ CIERRE ════════════════════════════════════════════════════ */}
      <div className="closing-wrap" role="contentinfo">
        <div className="closing-inner reveal">
          <h2 className="closing-script">¡Te esperamos!</h2>
          <p className="closing-body">
            Hay días que se recuerdan para siempre.
            <br />
            Nos da mucho gusto que este sea uno de los tuyos también.
          </p>
          <div className="closing-names-script">Carla &amp; Ángel</div>

        </div>
      </div>

      <footer>
        <p>
          <a
            href="https://invitacionesdigitalesmty.com.mx/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            HECHO POR INVITACIONESDIGITALESMTY.COM.MX
          </a>
        </p>
      </footer>
    </InvitationWrapper>
  );
}
