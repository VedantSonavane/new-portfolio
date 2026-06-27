import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronRight, ChevronLeft } from "lucide-react";

// Asset imports
import p1 from "../../assets/images/work/w1.jpeg";
import p2 from "../../assets/images/work/w2.jpeg";
import p3 from "../../assets/images/work/w3.jpeg";
import p4 from "../../assets/images/work/w4.jpeg";
import p5 from "../../assets/images/work/w5.jpeg";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Decathlon",
    category: "Work Experience • Cluster Leader",
    image: p1,
    description:
      "Led day-to-day operations and team execution at the cluster level—focused on ownership, consistency, and measurable outcomes on the floor.",
    href: "#",
    cta: "View Role",
  },
  {
    id: 2,
    title: "Ollato Eduversity",
    category: "Platform • Mental Health / Education",
    image: p2,
    description:
      "A platform supporting students' mental health and stress management through expert guidance and personalized programs. Built with HTML, CSS, PHP with multi-panel access, video calling, payment API integration, and AWS deployment.",
    href: "#",
    cta: "Visit Site",
  },
  {
    id: 3,
    title: "Digigrow Solutions",
    category: "Agency Websites · E-Commerce · Learning Platforms",
    image: p3,
    description:
      "Freelance web development work for Digigrow Solutions, contributing to multiple client-facing projects across Webflow and WordPress. Involved in building official company websites, e-commerce experiences, and learning-oriented platforms.",
    href: "#",
    cta: "View Work",
  },
  {
    id: 4,
    title: "Urbane Travels",
    category: "Product • Travel Booking",
    image: p4,
    description:
      "A travel platform integrating transportation APIs for smooth booking. Includes B2B, B2C, and admin panels. Built with React, Node.js, and Tailwind CSS.",
    href: "#",
    cta: "Visit Site",
  },
  {
    id: 5,
    title: "Vynqe",
    category: "Decision Continuity",
    image: p5,
    description:
      "Decision continuity for complex organisations—capturing judgement, accountability, defensibility, and longitudinal review. Outputs remain non-prescriptive.",
    href: "#",
    cta: "Explore",
  },
];

function splitHeadingIntoLines(el) {
  if (!el) return { lines: [] };
  const raw = el.innerHTML.replace(/<br\s*\/?>/gi, "[[BR]]");
  const parts = raw.split("[[BR]]").map((s) => s.trim()).filter(Boolean);

  const html = parts
    .map(
      (line) => `
        <span style="display:block; overflow:hidden;">
          <span class="gsap-line" style="display:inline-block; will-change:transform;">
            ${line}
          </span>
        </span>
      `
    )
    .join('<span style="display:block; height:0.1em;"></span>');

  el.innerHTML = html;
  return { lines: Array.from(el.querySelectorAll(".gsap-line")) };
}

export default function WorkSection() {
  const rootRef       = useRef(null);
  const stickyWrapRef = useRef(null);
  const hRef          = useRef(null);
  const pRef          = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, index));
    setActiveIndex(clamped);
  };

  const prevProject = () =>
    setActiveIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  const nextProject = () =>
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "ArrowRight") nextProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ─── 1. SCROLL-DRIVEN PROJECT STEPPING ──────────────────────────────────────
  useLayoutEffect(() => {
    const wrapper = stickyWrapRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const total = PROJECTS.length;
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const newIndex = Math.min(total - 1, Math.floor(self.progress * total));
          if (newIndex !== activeIndexRef.current) goTo(newIndex);
        },
      });
    }, wrapper);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── 2. SCROLL REVEAL ON SECTION ENTER ──────────────────────────────────────
  useLayoutEffect(() => {
    const section    = stickyWrapRef.current;
    const headingEl  = hRef.current;
    const originalHTML = headingEl?.innerHTML || "";

    const ctx = gsap.context(() => {
      const split = splitHeadingIntoLines(headingEl);

      gsap.set(split.lines,          { yPercent: 110, opacity: 0 });
      gsap.set(pRef.current,         { y: 20, opacity: 0 });
      gsap.set(".project-container", { y: 30, opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.1 })
        .to(pRef.current,          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .to(".project-container",  { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");

      ScrollTrigger.create({
        trigger:     section,
        start:       "top 75%",
        onEnter:     () => tl.restart(true),
        onEnterBack: () => tl.restart(true),
        onLeave:     () => tl.pause(0),
        onLeaveBack: () => tl.pause(0),
      });
    }, section);

    return () => {
      ctx.revert();
      if (headingEl) headingEl.innerHTML = originalHTML;
    };
  }, []);

  // ─── 3. CONTENT FADE ON INDEX CHANGE ────────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-info-content",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.05 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [activeIndex]);

  const active = PROJECTS[activeIndex];

  return (
    <div
      ref={stickyWrapRef}
      id="experience"
      style={{ height: `${(PROJECTS.length + 1) * 100}vh` }}
      className="relative"
    >
      {/* STICKY VIEWPORT */}
      <div
        ref={rootRef}
        className="sticky top-0 w-full h-screen overflow-hidden text-white bg-black"
      >
        {/* BACKGROUND IMAGES */}
        <div className="absolute inset-0 z-0">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(${p.image})`,
                opacity:    i === activeIndex ? 1 : 0,
                transform:  i === activeIndex ? "scale(1.04)" : "scale(1)",
                transition: "opacity 1s ease-in-out, transform 1.2s ease-in-out",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* GRADIENT */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/90" />

        {/* SCROLL HINT */}
        <div
          className={`absolute bottom-6 right-5 sm:bottom-8 sm:right-8 z-[5] flex items-center gap-2 text-white/40 text-[10px] sm:text-xs tracking-widest transition-opacity duration-500 ${
            activeIndex === PROJECTS.length - 1 ? "opacity-0" : "opacity-100"
          }`}
        >
          <span>SCROLL</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M7 13l-4-4M7 13l4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* CONTENT GRID */}
        <div className="relative z-[2] mx-auto h-full w-full max-w-7xl px-5 sm:px-8 py-14 sm:py-20 md:py-24 grid grid-rows-[auto_1fr_auto] gap-6 sm:gap-10">

          {/* HEADER */}
          <div className="max-w-5xl">
            <h1
              ref={hRef}
              className="text-[clamp(1.75rem,6vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white"
            >
              Experience shaped by <br /> responsibility,
              ownership, and work that holds.
            </h1>
            <p
              ref={pRef}
              className="mt-4 sm:mt-6 max-w-xl sm:max-w-2xl text-sm sm:text-base font-light text-white/70 leading-relaxed opacity-0"
            >
              This body of work reflects hands-on roles within
              organisations—where decisions, collaboration, and execution
              carried real responsibility.
            </p>
          </div>

          <div />

          {/* PROJECT SECTION */}
          <div className="project-container w-full">

            {/* Category pill */}
            <div className="project-info-content">
              <p className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-wide text-white/85 backdrop-blur-md">
                {active.category}
              </p>
            </div>

            {/* Project title */}
            <h3 className="project-info-content font-regular text-[clamp(1.9rem,5.5vw,5.4rem)] leading-none mb-3 sm:mb-5 min-h-[1.2em]">
              {active.title}
            </h3>

            {/* Description */}
            <p className="project-info-content max-w-xl sm:max-w-2xl text-sm sm:text-lg text-white/75 font-light leading-relaxed line-clamp-3 sm:line-clamp-none min-h-[4em] sm:min-h-[4.6em] mb-6 sm:mb-8">
              {active.description}
            </p>

            {/* CTA + Nav buttons */}
            <div className="project-info-content flex flex-wrap items-center gap-3 sm:gap-5">
              <a
                href={active.href}
                className="group inline-flex items-center gap-2 sm:gap-3 rounded-full px-5 sm:px-8 py-3 sm:py-4 text-sm border border-white/20 bg-white/10 backdrop-blur-xl transition-all hover:bg-white hover:text-black"
              >
                <span>{active.cta}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={prevProject}
                  className="rounded-full p-2.5 sm:p-3 border border-white/15 bg-white/5 backdrop-blur-xl hover:bg-white/10 active:scale-95 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextProject}
                  className="rounded-full p-2.5 sm:p-3 border border-white/15 bg-white/5 backdrop-blur-xl hover:bg-white/10 active:scale-95 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Project chips */}
            <div className="project-info-content mt-5 sm:mt-8 flex flex-wrap gap-1.5 sm:gap-2">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs border transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10"
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}