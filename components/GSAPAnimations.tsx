"use client";

import { useEffect } from "react";

export default function GSAPAnimations() {
  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        document
          .querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
          .forEach((el) => {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.transform = "none";
          });
        return;
      }

      /* Hero entrance */
      const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTL
        .to(".hero-pre",         { opacity: 1, y: 0, duration: 1.1, delay: 0.3 })
        .to(".hero-script",      { opacity: 1, y: 0, duration: 1.5 }, "-=.5")
        .to(".full-names",       { opacity: 1, y: 0, duration: 1.1 }, "-=.8")
        .to(".divider-ornament", { opacity: 1,        duration: 0.9 }, "-=.6")
        .to(".date-display",     { opacity: 1, y: 0, duration: 1.0 }, "-=.6")
        .to(".hero-cta-wrap",    { opacity: 1, y: 0, duration: 0.9 }, "-=.5");

      /* Scroll reveal — up */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 83%", once: true },
        });
      });

      /* Scroll reveal — left */
      gsap.utils.toArray<HTMLElement>(".reveal-left").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 83%", once: true },
        });
      });

      /* Scroll reveal — right */
      gsap.utils.toArray<HTMLElement>(".reveal-right").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 83%", once: true },
        });
      });

      /* Scroll reveal — scale */
      gsap.utils.toArray<HTMLElement>(".reveal-scale").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 83%", once: true },
        });
      });

      /* Parallax hero */
      gsap.to(".hero-inner", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: ".hero", scrub: 1.8 },
      });

      gsap.to(".hero-blob", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: ".hero", scrub: 2.5 },
      });

      /* Countdown pop-in */
      gsap.from(".countdown-item", {
        opacity: 0,
        scale: 0.86,
        y: 24,
        stagger: 0.13,
        duration: 0.9,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".countdown-grid", start: "top 80%", once: true },
      });

      /* Schedule stagger */
      gsap.utils.toArray<HTMLElement>(".schedule-item.reveal").forEach(
        (el, i) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.14,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        }
      );
    }

    init();
  }, []);

  return null;
}
