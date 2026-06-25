"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Project Data ─────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    name: "Spectreme AI",
    type: "Client Work",
    year: "2025 Jan",
    url: "https://spectreme.ai/",
    tagline: "Next-gen cybersecurity for high-trust enterprises.",
    desc: "Cybersecurity & IT services firm serving Middle East markets (UAE, Lebanon). Built to communicate authority, trust, and 24/7 defense readiness across penetration testing, DFIR, and cloud security.",
    meta: [
      { label: "Role",   value: "Frontend Design & Integration" },
      { label: "Vibe",   value: "Dark · Authoritative · Enterprise", italic: true },
      { label: "Sector", value: "Cybersecurity / IT Services" },
    ],
    tech: ["WordPress", "Custom CSS", "Slider Revolution", "Hostinger"],
  },
  {
    name: "DigitaLearn",
    type: "Client Work",
    year: "2025 Mar",
    url: "https://digitalearn.info/",
    tagline: "From zero to job-ready in 8–12 weeks.",
    desc: "Cybersecurity training platform focused on Indian students and career switchers. Designed around trust, outcomes, and WhatsApp-first conversions for a mobile-first audience.",
    meta: [
      { label: "Role",   value: "Design & Development" },
      { label: "Vibe",   value: "Practical · Trust-first · Conversion-led", italic: true },
      { label: "Sector", value: "EdTech / Cybersecurity Training" },
    ],
    tech: ["HTML5", "Tailwind CSS", "Vanilla JS", "Hostinger"],
  },
  {
    name: "Airah Diamonds",
    type: "Client Work",
    year: "2025",
    url: "https://www.airahdiamonds.com/",
    tagline: "Luxury, designed to feel intentional.",
    desc: "E-commerce experience for fine diamond jewellery. Built with a dark editorial aesthetic and slow, premium micro-interactions to elevate product selection into a luxury experience.",
    meta: [
      { label: "Role",   value: "Full Stack Development" },
      { label: "Vibe",   value: "Luxury · Editorial · Minimal", italic: true },
      { label: "Sector", value: "Jewellery / E-Commerce" },
    ],
    tech: ["React", "TypeScript", "Styled Components", "Firebase"],
  },
  {
    name: "Offshore365",
    type: "Client Work",
    year: "2025 Aug",
    url: "https://www.offshore365.in/",
    tagline: "Remote staffing, simplified.",
    desc: "Offshore hiring platform connecting Indian businesses with vetted remote talent. Structured service layers and strong CTAs guiding users from awareness to conversion quickly.",
    meta: [
      { label: "Role",   value: "Design & Development" },
      { label: "Vibe",   value: "Corporate · Clean · Conversion-first", italic: true },
      { label: "Sector", value: "HR / Remote Staffing" },
    ],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
  },
  {
    name: "AllSpace365",
    type: "Client Work",
    year: "2026 Jan",
    url: "https://allspace365.com/",
    tagline: "Workspace intelligence at scale.",
    desc: "Enterprise workspace platform for managing flexible office and co-working spaces. Designed with strong hierarchy and spatial clarity for CXO-level decision makers.",
    meta: [
      { label: "Role",   value: "Design & Development" },
      { label: "Vibe",   value: "Premium · Spatial · Enterprise", italic: true },
      { label: "Sector", value: "Commercial Real Estate / Workspace" },
    ],
    tech: ["React", "Tailwind CSS", "GSAP", "Netlify"],
  },
];

/* ─── Themes ─────────────────────────────────────────────────────────────── */
const THEMES = [
  {
    bg: "#F8FAFC", text: "#111111", textMuted: "#444444",
    textFaint: "#888888", divider: "#b5b5b5",
    tagBg: "#ffffff", tagBorder: "#c5c5c5", tagText: "#333333",
    linkColor: "#000000", ghostNum: "rgba(0,0,0,0.05)",
  },
  {
    bg: "#0F0F0F", text: "#F0F0EE", textMuted: "#aaaaaa",
    textFaint: "#666666", divider: "#333333",
    tagBg: "#161616", tagBorder: "#333333", tagText: "#cccccc",
    linkColor: "#ffffff", ghostNum: "rgba(255,255,255,0.04)",
  },
];

const ALL_PANELS = PROJECTS.length + 1;

/* ─── MobileProjectCard ──────────────────────────────────────────────────── */
function MobileProjectCard({ project, index }) {
  const t      = THEMES[index % 2];
  const numStr = String(index + 1).padStart(2, "0");
  const isLight = index % 2 === 0;

  return (
    <div
      className="relative  px-6 py-10 flex flex-col gap-5 font-['Inter','Helvetica_Neue',sans-serif]"
      style={{ background: t.bg, color: t.text }}
    >
      {/* Ghost number */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-3 font-black select-none pointer-events-none leading-none tracking-[-0.06em]"
        style={{
          fontSize: "clamp(80px,28vw,130px)",
          color: t.ghostNum,
        }}
      >
        {numStr}
      </span>

      {/* Year + name */}
      <div className="flex flex-col gap-0.5 relative z-10">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: t.textFaint }}
        >
          {project.year}
        </span>
        <h2
          className="font-extrabold leading-[1.1] tracking-[-0.03em]"
          style={{ fontSize: "clamp(26px,7vw,38px)", color: t.text }}
        >
          {project.name}
        </h2>
      </div>

      {/* Tagline */}
      <p
        className="font-semibold leading-[1.3] tracking-[-0.02em] relative z-10"
        style={{ fontSize: "clamp(16px,4.5vw,21px)", color: t.text }}
      >
        {project.tagline}
      </p>

      {/* Divider */}
      <div className="w-9 h-px" style={{ background: t.divider }} />

      {/* Desc */}
      <p
        className="text-[14px] font-medium leading-[1.75] relative z-10"
        style={{ color: t.textMuted }}
      >
        {project.desc}
      </p>

      {/* Meta */}
      <div className="flex flex-col gap-2 relative z-10">
        {project.meta.map(({ label, value, italic }) => (
          <div key={label} className="flex gap-3 items-start">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.18em] shrink-0 pt-[2px]"
              style={{ color: t.textFaint, minWidth: 52 }}
            >
              {label}
            </span>
            <span
              className="text-[13px] font-semibold"
              style={{ color: t.textMuted, fontStyle: italic ? "italic" : "normal" }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="text-[11px] font-semibold tracking-wide border rounded px-3 py-[3px]"
            style={{ color: t.tagText, borderColor: t.tagBorder, background: t.tagBg }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[13px] font-bold no-underline border-b-[1.5px] pb-0.5 w-fit tracking-wide relative z-10"
        style={{ color: t.linkColor, borderColor: t.linkColor }}
      >
        Visit project
        <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const wrapperRef     = useRef(null);
  const stickyRef      = useRef(null);
  const activePanelRef = useRef(0);

  const introGhostRef   = useRef(null);
  const introEyebrowRef = useRef(null);
  const introLine1Ref   = useRef(null);
  const introLine2Ref   = useRef(null);
  const introSubRef     = useRef(null);
  const introNudgeRef   = useRef(null);

  const panelRefs = useRef([]);
  const ghostRefs = useRef([]);
  const yearRefs  = useRef([]);
  const nameRefs  = useRef([]);
  const tagRefs   = useRef([]);
  const divRefs   = useRef([]);
  const descRefs  = useRef([]);
  const metaRefs  = useRef([]);
  const tagsRefs  = useRef([]);
  const linkRefs  = useRef([]);

  const themeFor = (panelIdx) =>
    panelIdx === 0 ? THEMES[0] : THEMES[(panelIdx - 1) % 2];

  const animateIntroIn = () => {
    const els = [
      introGhostRef.current, introEyebrowRef.current,
      introLine1Ref.current, introLine2Ref.current,
      introSubRef.current,   introNudgeRef.current,
    ];
    gsap.killTweensOf(els);

    gsap.set(introGhostRef.current,   { x: "40%", opacity: 0, scale: 1.06 });
    gsap.set(introEyebrowRef.current, { y: 16, opacity: 0 });
    gsap.set(introLine1Ref.current,   { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 12 });
    gsap.set(introLine2Ref.current,   { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 12 });
    gsap.set(introSubRef.current,     { opacity: 0, filter: "blur(12px)", y: 8 });
    gsap.set(introNudgeRef.current,   { opacity: 0, y: 10 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(introGhostRef.current,   { x: "0%", opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 0);
    tl.to(introEyebrowRef.current, { y: 0, opacity: 1, duration: 0.6 }, 0.3);
    tl.to(introLine1Ref.current,   { clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }, 0.45);
    tl.to(introLine2Ref.current,   { clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }, 0.6);
    tl.to(introSubRef.current,     { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 }, 0.78);
    tl.to(introNudgeRef.current,   { opacity: 1, y: 0, duration: 0.5 }, 1.05);
  };

  const animateProjectIn = (i) => {
    const metaRows = metaRefs.current[i]?.querySelectorAll(".meta-row");
    const techTags = tagsRefs.current[i]?.querySelectorAll(".tech-tag");

    gsap.killTweensOf([
      ghostRefs.current[i], yearRefs.current[i], nameRefs.current[i],
      tagRefs.current[i],   divRefs.current[i],  descRefs.current[i],
      linkRefs.current[i],
    ]);
    if (metaRows?.length) gsap.killTweensOf(metaRows);
    if (techTags?.length)  gsap.killTweensOf(techTags);

    gsap.set(ghostRefs.current[i], { x: "28%", opacity: 0 });
    gsap.set(yearRefs.current[i],  { y: 14, opacity: 0 });
    gsap.set(nameRefs.current[i],  { x: 60, opacity: 0 });
    gsap.set(tagRefs.current[i],   { clipPath: "inset(0 100% 0 0)", opacity: 0 });
    gsap.set(divRefs.current[i],   { scaleX: 0, opacity: 0, transformOrigin: "left center" });
    gsap.set(descRefs.current[i],  { opacity: 0, filter: "blur(8px)", y: 8 });
    gsap.set(linkRefs.current[i],  { y: 8, opacity: 0 });
    if (metaRows?.length) gsap.set(metaRows, { y: 14, opacity: 0 });
    if (techTags?.length)  gsap.set(techTags, { scale: 0.8, opacity: 0, y: 6 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(ghostRefs.current[i], { x: "0%", opacity: 1, duration: 1.0, ease: "power2.out" }, 0);
    tl.to(yearRefs.current[i],  { y: 0, opacity: 1, duration: 0.45 }, 0.08);
    tl.to(nameRefs.current[i],  { x: 0, opacity: 1, duration: 0.65 }, 0.14);
    tl.to(tagRefs.current[i],   { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.75, ease: "power4.out" }, 0.24);
    tl.to(divRefs.current[i],   { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.34);
    tl.to(descRefs.current[i],  { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.7 }, 0.4);
    if (metaRows?.length) tl.to(metaRows, { y: 0, opacity: 1, duration: 0.45, stagger: 0.07 }, 0.5);
    if (techTags?.length)  tl.to(techTags, { scale: 1, opacity: 1, y: 0, duration: 0.35, stagger: 0.055, ease: "back.out(1.6)" }, 0.62);
    tl.to(linkRefs.current[i],  { y: 0, opacity: 1, duration: 0.4 }, 0.76);
  };

  const switchToPanel = (from, to) => {
    if (from >= 0 && panelRefs.current[from]) {
      gsap.to(panelRefs.current[from], { opacity: 0, duration: 0.3, ease: "power2.inOut" });
    }
    if (panelRefs.current[to]) {
      gsap.set(panelRefs.current[to], { opacity: 1 });
    }
    gsap.to(stickyRef.current, {
      backgroundColor: themeFor(to).bg,
      duration: 0.55,
      ease: "power2.inOut",
    });
    if (to === 0) animateIntroIn();
    else          animateProjectIn(to - 1);
  };

  useLayoutEffect(() => {
    panelRefs.current.forEach((p, i) => {
      if (p) gsap.set(p, { opacity: i === 0 ? 1 : 0 });
    });
    activePanelRef.current = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end:   "bottom bottom",
        onUpdate(self) {
          const next = Math.min(ALL_PANELS - 1, Math.floor(self.progress * ALL_PANELS));
          if (next !== activePanelRef.current) {
            const prev = activePanelRef.current;
            activePanelRef.current = next;
            switchToPanel(prev, next);
          }
        },
      });
    });

    requestAnimationFrame(() => animateIntroIn());
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ══════════════════════════ DESKTOP ══════════════════════════════ */}
      <div className="hidden md:block">
        <div
          ref={wrapperRef}
          className="relative"
          style={{ height: `${(ALL_PANELS + 1) * 100}vh` }}
        >
          <div
            ref={stickyRef}
            className="sticky top-0 w-full h-screen overflow-hidden font-['Inter','Helvetica_Neue',sans-serif]"
            style={{ backgroundColor: THEMES[0].bg }}
          >

            {/* ── Panel 0: Intro ───────────────────────────────────────── */}
            <div
              ref={(el) => (panelRefs.current[0] = el)}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {/* Ghost */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <span
                  ref={introGhostRef}
                  className="font-black select-none whitespace-nowrap leading-none tracking-[-0.06em]"
                  style={{
                    fontSize: "clamp(140px,26vw,360px)",
                    color: THEMES[0].ghostNum,
                    willChange: "transform, opacity",
                  }}
                >
                  PROJECTS
                </span>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-5xl mx-auto w-full">


                <h1
                  className="text-6xl font-semibold mb-6 tracking-[-0.03em] leading-[1.08]"
                  style={{ color: THEMES[0].text }}
                >
                  <span
                    ref={introLine1Ref}
                    className="block overflow-hidden opacity-0"
                    style={{ clipPath: "inset(0 0 100% 0)" }}
                  >
                    Some things are
                  </span>
                  <span
                    ref={introLine2Ref}
                    className="block overflow-hidden opacity-0"
                    style={{ clipPath: "inset(0 0 100% 0)" }}
                  >
                    built to be remembered.
                  </span>
                </h1>

                <p
                  ref={introSubRef}
                  className="mt-6 max-w-2xl text-sm md:text-base font-light leading-relaxed opacity-0"
                  style={{ color: THEMES[0].textMuted }}
                >
                  A selection of projects shaped by real constraints, real clients,
                  and the kind of care that outlasts the launch.
                </p>
              </div>
            </div>

            {/* ── Panels 1–N: Projects ─────────────────────────────────── */}
            {PROJECTS.map((project, index) => {
              const t      = themeFor(index + 1);
              const numStr = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={project.name}
                  ref={(el) => (panelRefs.current[index + 1] = el)}
                  className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0"
                >
                  {/* Ghost */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                    <span
                      ref={(el) => (ghostRefs.current[index] = el)}
                      className="font-black select-none leading-none tracking-[-0.06em] opacity-0"
                      style={{
                        fontSize: "clamp(220px,38vw,620px)",
                        color: t.ghostNum,
                        willChange: "transform, opacity",
                      }}
                    >
                      {numStr}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">

                    {/* LEFT */}
                    <div className="w-full md:w-[42%] flex flex-col items-center md:items-start text-center md:text-left">
                      <span
                        ref={(el) => (yearRefs.current[index] = el)}
                        className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 opacity-0"
                        style={{ color: t.textFaint }}
                      >
                        {project.year}
                      </span>
                      <h2
                        ref={(el) => (nameRefs.current[index] = el)}
                        className="font-extrabold leading-[1.05] tracking-[-0.03em] opacity-0"
                        style={{
                          fontSize: "clamp(32px,4.2vw,58px)",
                          color: t.text,
                          willChange: "transform, opacity",
                        }}
                      >
                        {project.name}
                      </h2>
                    </div>

                    {/* RIGHT */}
                    <div className="w-full md:w-[58%] flex justify-center md:justify-start">
                      <div className="w-full max-w-[480px] flex flex-col gap-5 text-center md:text-left items-center md:items-start">

                        <p
                          ref={(el) => (tagRefs.current[index] = el)}
                          className="font-semibold leading-[1.25] tracking-[-0.025em] opacity-0"
                          style={{
                            fontSize: "clamp(21px,2.6vw,32px)",
                            color: t.text,
                            clipPath: "inset(0 100% 0 0)",
                            willChange: "clip-path, opacity",
                          }}
                        >
                          {project.tagline}
                        </p>

                        <div
                          ref={(el) => (divRefs.current[index] = el)}
                          className="w-9 h-px opacity-0"
                          style={{ background: t.divider, transformOrigin: "left center" }}
                        />

                        <p
                          ref={(el) => (descRefs.current[index] = el)}
                          className="text-[14px] md:text-[15px] font-medium leading-[1.82] opacity-0"
                          style={{ color: t.textMuted }}
                        >
                          {project.desc}
                        </p>

                        <div ref={(el) => (metaRefs.current[index] = el)} className="w-full flex flex-col gap-2">
                          {project.meta.map(({ label, value, italic }) => (
                            <div
                              key={label}
                              className="meta-row flex flex-col sm:flex-row gap-1.5 sm:gap-4 items-center md:items-start opacity-0"
                            >
                              <span
                                className="text-[10px] font-bold uppercase tracking-[0.2em] shrink-0"
                                style={{ color: t.textFaint, minWidth: 58 }}
                              >
                                {label}
                              </span>
                              <span
                                className="text-[13px] font-semibold"
                                style={{ color: t.textMuted, fontStyle: italic ? "italic" : "normal" }}
                              >
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div
                          ref={(el) => (tagsRefs.current[index] = el)}
                          className="flex flex-wrap gap-2 justify-center md:justify-start"
                        >
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="tech-tag text-[11px] font-semibold tracking-wide border rounded px-3 py-[3px] opacity-0"
                              style={{ color: t.tagText, borderColor: t.tagBorder, background: t.tagBg }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <a
                          ref={(el) => (linkRefs.current[index] = el)}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[13px] font-bold no-underline border-b-[1.5px] pb-0.5 w-fit tracking-wide mt-1 opacity-0"
                          style={{ color: t.linkColor, borderColor: t.linkColor }}
                        >
                          Visit project
                          <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Progress dots */}
                  <div className="hidden md:flex absolute bottom-6 left-8 items-center gap-2 pointer-events-none z-20" aria-hidden="true">
                    {PROJECTS.map((_, i) => (
                      <div
                        key={i}
                        className="h-[3px] rounded-[2px] transition-[width,opacity] duration-300 ease-out"
                        style={{
                          width: i === index ? "22px" : "6px",
                          background: t.textFaint,
                          opacity: i === index ? 1 : 0.25,
                        }}
                      />
                    ))}
                  </div>

                  {/* Counter */}
                  <div
                    className="hidden md:block absolute bottom-6 right-8 z-20 pointer-events-none text-[11px] font-semibold tracking-[0.18em]"
                    style={{ color: t.textFaint }}
                  >
                    {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════ MOBILE ═══════════════════════════════ */}
      <div className="md:hidden flex flex-col font-['Inter','Helvetica_Neue',sans-serif]">
        {/* Intro header */}
        <div className="px-5 pt-20 pb-14 bg-[#F8FAFC]">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] mb-7 text-[#888888]">
            Selected Work · 2025–2026
          </p>
          <h1
            className="text-[clamp(2rem,9vw,3.75rem)] font-semibold tracking-[-0.03em] leading-[1.08] text-[#111111] mb-5"
          >
            <span className="block">Some things are</span>
            <span className="block">built to be remembered.</span>
          </h1>
          <p className="max-w-2xl text-sm font-light leading-relaxed text-[#444444]">
            A selection of projects shaped by real constraints, real clients,
            and the kind of care that outlasts the launch.
          </p>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-3 px-3 pb-16">
          {PROJECTS.map((project, index) => (
            <MobileProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}