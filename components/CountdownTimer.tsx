"use client";

import { useEffect, useRef, useState } from "react";

const WEDDING = new Date("2026-11-27T16:00:00");

function getParts() {
  const diff = WEDDING.getTime() - Date.now();
  const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");
  if (diff <= 0) return { days: "00", hours: "00", min: "00", sec: "00" };
  return {
    days:  pad(Math.floor(diff / 86400000)),
    hours: pad(Math.floor((diff % 86400000) / 3600000)),
    min:   pad(Math.floor((diff % 3600000) / 60000)),
    sec:   pad(Math.floor((diff % 60000) / 1000)),
  };
}

function CountItem({ value, label, id }: { value: string; label: string; id?: string }) {
  const [bump, setBump] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (value !== prev.current) {
      prev.current = value;
      setBump(true);
      const t = setTimeout(() => setBump(false), 200);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="countdown-item">
      <div className="countdown-circle">
        <span id={id} className={`countdown-num${bump ? " bump" : ""}`} aria-live="polite">
          {value}
        </span>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default function CountdownTimer() {
  const [parts, setParts] = useState(getParts);

  useEffect(() => {
    const id = setInterval(() => setParts(getParts()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown-grid">
      <CountItem id="cd-days"  value={parts.days}  label="Días" />
      <CountItem id="cd-hours" value={parts.hours} label="Horas" />
      <CountItem id="cd-min"   value={parts.min}   label="Minutos" />
      <CountItem id="cd-sec"   value={parts.sec}   label="Segundos" />
    </div>
  );
}
