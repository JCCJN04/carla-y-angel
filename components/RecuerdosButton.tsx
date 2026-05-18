"use client";

export default function RecuerdosButton() {
  function open() {
    window.dispatchEvent(new CustomEvent("open-recuerdos"));
  }

  return (
    <div className="recuerdos-shortcut">
      <button className="recuerdos-shortcut-btn" onClick={open}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        Recuerdos
      </button>
    </div>
  );
}
