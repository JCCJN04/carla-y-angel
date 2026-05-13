import { Suspense } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import GSAPAnimations from "@/components/GSAPAnimations";

export default function Home() {
  return (
    <>
      <GSAPAnimations />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <header className="hero" role="banner">
        <div className="hero-blob" aria-hidden="true" />

        <div className="hero-inner">
          <p className="hero-pre" aria-label="Nos casamos">
            Nos casamos
          </p>

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

          <p className="full-names">
            Carla Gabriela Gómez González
            <br />
            Ángel Jalil Alegría Estudillo
          </p>

          <div className="divider-ornament" aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M8 1 L15 8 L8 15 L1 8 Z" />
            </svg>
          </div>

          <p
            className="date-display"
            aria-label="Fecha: 27 de noviembre de 2026"
          >
            27 · XI · 2026
          </p>

          <div className="hero-cta-wrap">
            <a
              href="#programa"
              className="hero-cta"
              aria-label="Ver detalles del evento"
            >
              Ver detalles
              <svg
                viewBox="0 0 10 10"
                aria-hidden="true"
                strokeWidth="1.5"
              >
                <path
                  d="M5 1v8M1 5l4 4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-connector" aria-hidden="true" />
      </header>

      {/* ══ MENSAJE ═══════════════════════════════════════════════════ */}
      <section className="section reveal" aria-labelledby="msg-title">
        <p className="section-label">Una invitación de corazón</p>
        <h2 id="msg-title" className="section-title gradient-heading">
          Queremos que estés ahí
        </h2>
        <p className="section-body">
          Después de mucho tiempo compartido, llegó el día de hacerlo oficial.
          Queremos que estés con nosotros cuando le digamos sí al resto de
          nuestras vidas.
          <br />
          <br />
          Tu presencia no es un detalle — es parte de quiénes somos.
        </p>
        <div className="section-ornament" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M8 1 L15 8 L8 15 L1 8 Z" />
          </svg>
        </div>
      </section>

      {/* ══ COUNTDOWN ═════════════════════════════════════════════════ */}
      <div
        className="band band--warm reveal"
        role="region"
        aria-label="Cuenta regresiva"
      >
        <p className="section-label">Faltan</p>
        <Suspense
          fallback={
            <div className="countdown-grid">
              {["Días", "Horas", "Min", "Seg"].map((l) => (
                <div key={l} className="countdown-item">
                  <div className="countdown-card-l1">
                    <div className="countdown-card-l2">
                      <div className="countdown-card-l3">
                        <span className="countdown-num">—</span>
                        <span className="countdown-label">{l}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <CountdownTimer />
        </Suspense>
      </div>

      {/* ══ PROGRAMA ══════════════════════════════════════════════════ */}
      <section
        id="programa"
        className="section reveal"
        style={{ maxWidth: 700 }}
        aria-labelledby="prog-title"
      >
        <p className="section-label">Programa del día</p>
        <h2 id="prog-title" className="section-title gradient-heading">
          27 de Noviembre, 2026
        </h2>

        <ul className="schedule-list" role="list">
          <li className="schedule-item reveal">
            <time className="schedule-time" dateTime="2026-11-27T16:00">
              16:00
            </time>
            <div className="schedule-line" aria-hidden="true">
              <span className="schedule-dot" />
            </div>
            <div className="schedule-info">
              <div className="schedule-name">Misa de matrimonio</div>
              <div className="schedule-place">Iglesia San José Mirador</div>
            </div>
          </li>

          <li className="schedule-item schedule-item--pending reveal">
            <span className="schedule-time">Próx.</span>
            <div className="schedule-line" aria-hidden="true">
              <span className="schedule-dot" />
            </div>
            <div className="schedule-info">
              <div className="schedule-name">Ceremonia civil</div>
              <div className="schedule-place">Lugar por confirmar</div>
              <div className="schedule-note">Horario próximamente</div>
            </div>
          </li>

          <li className="schedule-item reveal">
            <time className="schedule-time" dateTime="2026-11-27T18:00">
              18:00
            </time>
            <div className="schedule-line" aria-hidden="true">
              <span className="schedule-dot" />
            </div>
            <div className="schedule-info">
              <div className="schedule-name">Recepción &amp; fiesta</div>
              <div className="schedule-place">Salón Glück</div>
            </div>
          </li>
        </ul>
      </section>

      {/* ══ SEDES ═════════════════════════════════════════════════════ */}
      <section className="section reveal" aria-labelledby="venues-title">
        <p className="section-label">Lugares</p>
        <h2 id="venues-title" className="section-title gradient-heading">
          ¿Dónde nos vemos?
        </h2>

        <div className="venue-grid">
          <article className="venue-card-l1 reveal-left">
            <div className="venue-card-l2">
              <div className="venue-card-l3">
                <div className="venue-card">
                  <div className="venue-card-inner">
                    <div className="venue-icon" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2v4M10 4h4" />
                        <path d="M5 10h14v11H5z" />
                        <path d="M9 21v-6h6v6" />
                        <path d="M12 6l-7 4M12 6l7 4" />
                      </svg>
                    </div>
                    <h3 className="venue-card-name">
                      Iglesia San José Mirador
                    </h3>
                    <div className="venue-card-addr">
                      Misa · 16:00 hrs
                      <br />
                      Monterrey, N.L.
                    </div>
                    <a
                      href="https://maps.google.com/?q=Iglesia+San+Jose+Mirador+Monterrey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="venue-link"
                      aria-label="Ver Iglesia San José Mirador en Google Maps"
                    >
                      Ver en mapa
                      <svg
                        viewBox="0 0 8 8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        <path d="M1 7L7 1M2 1h5v5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="venue-card-l1 reveal-right">
            <div className="venue-card-l2">
              <div className="venue-card-l3">
                <div className="venue-card">
                  <div className="venue-card-inner">
                    <div className="venue-icon" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 2l4 8 4-8" />
                        <path d="M6.8 10h10.4l-1.2 8H8z" />
                        <path d="M9 18v3M15 18v3M7 21h10" />
                      </svg>
                    </div>
                    <h3 className="venue-card-name">Salón Glück</h3>
                    <div className="venue-card-addr">
                      Recepción · 18:00 hrs
                      <br />
                      Monterrey, N.L.
                    </div>
                    <a
                      href="https://maps.google.com/?q=Salon+Gluck+Monterrey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="venue-link"
                      aria-label="Ver Salón Glück en Google Maps"
                    >
                      Ver en mapa
                      <svg
                        viewBox="0 0 8 8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        <path d="M1 7L7 1M2 1h5v5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ══ RSVP ══════════════════════════════════════════════════════ */}
      <div id="rsvp" className="rsvp-wrap" role="region" aria-labelledby="rsvp-title">
        <div className="rsvp-inner reveal">
          <p className="section-label">Confirmación de asistencia</p>
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

          <div className="rsvp-embed-wrap">
            <div className="rsvp-embed-mid">
              <iframe
                src="https://tally.so/embed/1ADYGl?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height={520}
                title="RSVP — Boda Carla &amp; Ángel"
                allow="clipboard-write"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══ CIERRE ════════════════════════════════════════════════════ */}
      <div className="closing-wrap" role="contentinfo">
        <div className="closing-inner reveal">
          <p className="section-label">Con todo nuestro amor</p>
          <h2 className="closing-script">¡Te esperamos!</h2>
          <p className="closing-body">
            Hay días que se recuerdan para siempre.
            <br />
            Nos da mucho gusto que este sea uno de los tuyos también.
          </p>
          <div className="closing-divider" aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M8 1 L15 8 L8 15 L1 8 Z" />
            </svg>
          </div>
          <div className="closing-names-script">Carla &amp; Ángel</div>
          <p className="closing-date">27 · XI · 2026</p>

          <div className="closing-contact">
            ¿Dudas o preguntas?
            <br />
            <a
              href="https://wa.me/521XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            &nbsp;·&nbsp;
            <a href="mailto:TODO@correo.com">correo electrónico</a>
          </div>
        </div>
      </div>

      <footer>
        <p>
          Carla Gabriela Gómez González &amp; Ángel Jalil Alegría Estudillo
          &mdash; 27 de Noviembre 2026
        </p>
      </footer>
    </>
  );
}
