'use client';

import { useEffect, useState } from 'react';

/* ── Weather icon ── */
function WeatherIcon({ code, size = 36 }: { code: string; size?: number }) {
  const c = code.slice(0, 2);
  const base = {
    width: size, height: size,
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const gold   = 'var(--gold)';
  const cin    = 'var(--cinnamon)';
  const quartz = 'var(--quartz)';

  /* ── Sol despejado ── */
  if (c === '01') return (
    <svg viewBox="0 0 48 48" style={base}>
      {/* rayos largos */}
      <line x1="24" y1="4"  x2="24" y2="10" stroke={gold}   strokeWidth="2.2"/>
      <line x1="24" y1="38" x2="24" y2="44" stroke={gold}   strokeWidth="2.2"/>
      <line x1="4"  y1="24" x2="10" y2="24" stroke={gold}   strokeWidth="2.2"/>
      <line x1="38" y1="24" x2="44" y2="24" stroke={gold}   strokeWidth="2.2"/>
      {/* rayos diagonales */}
      <line x1="9.5"  y1="9.5"  x2="13.7" y2="13.7" stroke={gold} strokeWidth="1.8"/>
      <line x1="34.3" y1="34.3" x2="38.5" y2="38.5" stroke={gold} strokeWidth="1.8"/>
      <line x1="38.5" y1="9.5"  x2="34.3" y2="13.7" stroke={gold} strokeWidth="1.8"/>
      <line x1="13.7" y1="34.3" x2="9.5"  y2="38.5" stroke={gold} strokeWidth="1.8"/>
      {/* círculo exterior */}
      <circle cx="24" cy="24" r="9"  stroke={gold}   strokeWidth="1.5"/>
      {/* círculo interior relleno */}
      <circle cx="24" cy="24" r="6"  fill={gold} opacity="0.18"/>
    </svg>
  );

  /* ── Parcialmente nublado ── */
  if (c === '02') return (
    <svg viewBox="0 0 48 48" style={base}>
      {/* sol detrás */}
      <circle cx="18" cy="18" r="7"  stroke={gold}   strokeWidth="1.6"/>
      <line x1="18" y1="6"  x2="18" y2="9"  stroke={gold} strokeWidth="1.5"/>
      <line x1="18" y1="27" x2="18" y2="30" stroke={gold} strokeWidth="1.5"/>
      <line x1="6"  y1="18" x2="9"  y2="18" stroke={gold} strokeWidth="1.5"/>
      <line x1="27" y1="18" x2="30" y2="18" stroke={gold} strokeWidth="1.5"/>
      <line x1="9.8" y1="9.8"  x2="12"  y2="12"  stroke={gold} strokeWidth="1.3"/>
      <line x1="24"  y1="24"   x2="26.2" y2="26.2" stroke={gold} strokeWidth="1.3"/>
      <line x1="26.2" y1="9.8" x2="24" y2="12"    stroke={gold} strokeWidth="1.3"/>
      {/* nube encima */}
      <path d="M38 34a7 7 0 000-14 7 7 0 00-13.3 2.2A5.5 5.5 0 0020 34z"
            stroke={cin} strokeWidth="1.8" fill="rgba(248,245,241,0.5)"/>
    </svg>
  );

  /* ── Nublado ── */
  if (c === '03' || c === '04') return (
    <svg viewBox="0 0 48 48" style={base}>
      {/* nube trasera */}
      <path d="M36 30a6 6 0 000-12 6 6 0 00-11.4 1.8A4.5 4.5 0 0020 30z"
            stroke={quartz} strokeWidth="1.4" fill="rgba(204,200,192,0.25)"/>
      {/* nube delantera */}
      <path d="M40 38a8 8 0 000-16 8 8 0 00-15.2 2.4A6 6 0 0018 38z"
            stroke={cin} strokeWidth="1.8" fill="rgba(248,245,241,0.55)"/>
    </svg>
  );

  /* ── Lluvia ligera / fuerte ── */
  if (c === '09' || c === '10') return (
    <svg viewBox="0 0 48 48" style={base}>
      <path d="M38 26a8 8 0 000-16 8 8 0 00-15.2 2.4A6 6 0 0016 26z"
            stroke={cin} strokeWidth="1.8" fill="rgba(248,245,241,0.5)"/>
      {/* gotas inclinadas */}
      <line x1="18" y1="31" x2="15" y2="39" stroke={quartz} strokeWidth="1.8"/>
      <line x1="25" y1="31" x2="22" y2="39" stroke={quartz} strokeWidth="1.8"/>
      <line x1="32" y1="31" x2="29" y2="39" stroke={quartz} strokeWidth="1.8"/>
      <line x1="21" y1="35" x2="18" y2="43" stroke={quartz} strokeWidth="1.4" opacity="0.6"/>
      <line x1="28" y1="35" x2="25" y2="43" stroke={quartz} strokeWidth="1.4" opacity="0.6"/>
    </svg>
  );

  /* ── Tormenta ── */
  if (c === '11') return (
    <svg viewBox="0 0 48 48" style={base}>
      <path d="M38 26a8 8 0 000-16 8 8 0 00-15.2 2.4A6 6 0 0016 26z"
            stroke={cin} strokeWidth="1.8" fill="rgba(248,245,241,0.5)"/>
      <polyline points="28,28 22,36 27,36 21,44"
                stroke={gold} strokeWidth="2.2" fill="none"/>
    </svg>
  );

  /* ── Nieve ── */
  if (c === '13') return (
    <svg viewBox="0 0 48 48" style={base}>
      <path d="M38 26a8 8 0 000-16 8 8 0 00-15.2 2.4A6 6 0 0016 26z"
            stroke={cin} strokeWidth="1.8" fill="rgba(248,245,241,0.5)"/>
      {/* copo de nieve */}
      <line x1="25" y1="31" x2="25" y2="43" stroke={quartz} strokeWidth="1.6"/>
      <line x1="19.3" y1="34" x2="30.7" y2="40" stroke={quartz} strokeWidth="1.6"/>
      <line x1="30.7" y1="34" x2="19.3" y2="40" stroke={quartz} strokeWidth="1.6"/>
      <circle cx="25" cy="31" r="1.2" fill={quartz}/>
      <circle cx="25" cy="43" r="1.2" fill={quartz}/>
      <circle cx="19.3" cy="34" r="1.2" fill={quartz}/>
      <circle cx="30.7" cy="34" r="1.2" fill={quartz}/>
      <circle cx="30.7" cy="40" r="1.2" fill={quartz}/>
      <circle cx="19.3" cy="40" r="1.2" fill={quartz}/>
    </svg>
  );

  /* ── Niebla / default ── */
  return (
    <svg viewBox="0 0 48 48" style={base}>
      <line x1="8"  y1="16" x2="40" y2="16" stroke={quartz} strokeWidth="1.8"/>
      <line x1="4"  y1="22" x2="44" y2="22" stroke={quartz} strokeWidth="2"/>
      <line x1="8"  y1="28" x2="40" y2="28" stroke={quartz} strokeWidth="1.8"/>
      <line x1="12" y1="34" x2="36" y2="34" stroke={quartz} strokeWidth="1.4"/>
    </svg>
  );
}

/* ── Types ── */
interface DayWeather {
  label: string;   // "VIE", "SÁB", etc.
  date: string;    // "27"
  temp: number;
  minTemp: number;
  desc: string;
  icon: string;
  isWedding: boolean;
}

/* ── Fallback: historical Chihuahua November averages ── */
const DAYS_ES = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

function buildFallback(): DayWeather[] {
  const wedding = new Date(2026, 10, 27); // Nov 27 2026
  return [-2, -1, 0, 1, 2].map((offset) => {
    const d = new Date(wedding);
    d.setDate(d.getDate() + offset);
    const temps = [18, 19, 19, 18, 17];
    const mins  = [3, 4, 3, 2, 3];
    const icons = ['01d', '01d', '02d', '01d', '01d'];
    const descs = ['Soleado', 'Soleado', 'Parcialmente nublado', 'Soleado', 'Soleado'];
    const i = offset + 2;
    return {
      label: DAYS_ES[d.getDay()],
      date: String(d.getDate()),
      temp: temps[i],
      minTemp: mins[i],
      desc: descs[i],
      icon: icons[i],
      isWedding: offset === 0,
    };
  });
}

/* ── Component ── */
export default function WeatherSection() {
  const [days, setDays] = useState<DayWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'api' | 'fallback'>('fallback');

  useEffect(() => {
    const KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const LAT = process.env.NEXT_PUBLIC_LOCATION_LAT;
    const LON = process.env.NEXT_PUBLIC_LOCATION_LON;

    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${KEY}&lang=es&units=metric`
        );
        const data = await res.json();

        const wedding = new Date(2026, 10, 27);
        const weddingDates = [-2, -1, 0, 1, 2].map((o) => {
          const d = new Date(wedding);
          d.setDate(d.getDate() + o);
          return d.toISOString().slice(0, 10);
        });

        // Group api list by date
        const byDate: Record<string, { temps: number[]; icon: string; desc: string }> = {};
        for (const item of data.list ?? []) {
          const dateKey = item.dt_txt.slice(0, 10);
          if (!byDate[dateKey]) byDate[dateKey] = { temps: [], icon: '', desc: '' };
          byDate[dateKey].temps.push(item.main.temp);
          // prefer midday
          if (item.dt_txt.includes('12:00')) {
            byDate[dateKey].icon = item.weather[0].icon;
            byDate[dateKey].desc = item.weather[0].description;
          }
        }

        const matched = weddingDates.filter((d) => byDate[d]);
        if (matched.length === 0) throw new Error('no matching dates');

        const result: DayWeather[] = weddingDates.map((dateStr, idx) => {
          const d = new Date(dateStr + 'T12:00:00');
          const entry = byDate[dateStr];
          if (!entry) {
            // fallback for missing dates
            const fb = buildFallback()[idx];
            return { ...fb, label: DAYS_ES[d.getDay()], date: String(d.getDate()) };
          }
          return {
            label: DAYS_ES[d.getDay()],
            date: String(d.getDate()),
            temp: Math.round(Math.max(...entry.temps)),
            minTemp: Math.round(Math.min(...entry.temps)),
            desc: entry.desc || 'Soleado',
            icon: entry.icon || '01d',
            isWedding: idx === 2,
          };
        });

        setDays(result);
        setSource('api');
      } catch {
        setDays(buildFallback());
        setSource('fallback');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const weddingDay = days.find((d) => d.isWedding);

  return (
    <section className="weather-section section reveal" aria-labelledby="weather-title">
      <p className="section-label">El día de la boda</p>
      <h2 id="weather-title" className="section-title gradient-heading">
        El clima en Chiapas
      </h2>

      {loading ? (
        <div className="weather-loading">Cargando pronóstico…</div>
      ) : (
        <div className="weather-card">
          {/* ── Hero row ── */}
          {weddingDay && (
            <div className="weather-hero">
              {/* Left: icon */}
              <div className="weather-hero-icon">
                <WeatherIcon code={weddingDay.icon} size={72} />
              </div>

              {/* Center: big temp */}
              <div className="weather-hero-center">
                <div className="weather-hero-temp-row">
                  <span className="weather-hero-max">{weddingDay.temp}</span>
                  <span className="weather-hero-unit">°C</span>
                </div>
                <div className="weather-hero-range">
                  <span className="weather-range-label">Máx</span>
                  <span className="weather-range-sep">·</span>
                  <span className="weather-range-min">{weddingDay.minTemp}° mín</span>
                </div>
              </div>

              {/* Right: desc */}
              <div className="weather-hero-right">
                <p className="weather-hero-desc">{weddingDay.desc}</p>
              </div>
            </div>
          )}

          {/* ── Divider ── */}
          <div className="weather-divider" aria-hidden="true" />

          {/* ── 5-day strip ── */}
          <div className="weather-strip">
            {days.map((d) => (
              <div
                key={d.date}
                className={`weather-day${d.isWedding ? ' weather-day--wedding' : ''}`}
              >
                <span className="weather-day-label">{d.label}</span>
                <span className="weather-day-date">{d.date}</span>
                <WeatherIcon code={d.icon} size={26} />
                <div className="weather-day-temps">
                  <span className="weather-day-max">{d.temp}°</span>
                  <span className="weather-day-min">{d.minTemp}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
