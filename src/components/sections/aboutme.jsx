// AboutSection.jsx — GSAP + Tailwind CSS only, fully responsive

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 01-1.979-1.98 1.98 1.98 0 011.979-1.98c1.092 0 1.98.887 1.98 1.98a1.98 1.98 0 01-1.98 1.98zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SkillBar = ({ label, pct, barRef }) => (
  <div>
    <div className="flex justify-between items-baseline mb-1.5">
      <span className="text-[13px] text-[#333] tracking-[0.01em]">{label}</span>
      <span className="text-[10px] text-[#bbb]">{pct}%</span>
    </div>
    <div className="w-full h-[3px] bg-[#e5e7eb] rounded-sm overflow-hidden">
      <div
        ref={barRef}
        data-pct={pct}
        className="h-full bg-[#1a1a1a] rounded-sm"
        style={{ width: "0%" }}
      />
    </div>
  </div>
);

const SKILLS = [
  { label: "Frontend",   pct: 92 },
  { label: "Backend",    pct: 84 },
  { label: "DevOps",     pct: 70 },
  { label: "Creativity", pct: 88 },
];

export default function AboutSection() {
  const sectionRef  = useRef(null);
  const imgRef      = useRef(null);
  const nameRef     = useRef(null);
  const dividerRef  = useRef(null);
  const contactRef  = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef     = useRef(null);
  const workRef     = useRef(null);
  const eduRef      = useRef(null);
  const skillsRef   = useRef(null);
  const barRefs     = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── LEFT COLUMN ──────────────────────────────────────────────────
      const leftTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      leftTl
        .fromTo(
          imgRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.1 }
        )
        .fromTo(
          nameRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.45 },
          "-=0.3"
        )
        .fromTo(
          contactRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.2"
        );

      // ── RIGHT COLUMN ─────────────────────────────────────────────────
      const fadeUp = (el, delay = 0) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.75,
            ease: "power3.out", delay,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      };

      fadeUp(headlineRef.current);
      fadeUp(bodyRef.current, 0.08);
      fadeUp(workRef.current);
      fadeUp(eduRef.current);
      fadeUp(skillsRef.current);

      // ── SKILL BARS ───────────────────────────────────────────────────
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const pct = bar.getAttribute("data-pct");
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${pct}%`, duration: 1.1,
            ease: "power2.out", delay: i * 0.1,
            scrollTrigger: { trigger: skillsRef.current, start: "top 85%", once: true },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
            id="about"

      className="relative w-full min-h-screen bg-[#F8FAFC] text-neutral-900 flex items-center justify-center font-['Inter','Helvetica_Neue',sans-serif]"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr] gap-10 sm:gap-14 lg:gap-28">

        {/* ── LEFT ── */}
        <div className="flex flex-col gap-5">

          {/* Portrait */}
          <div
            ref={imgRef}
            className="w-full bg-[#e5e5e5] overflow-hidden opacity-0"
            style={{ aspectRatio: "3/4" }}
          >
              <img
              src="/src/assets/images/aboutme.jpg"
              alt="Vedant Sonavane"
              className="w-full h-full object-cover object-top grayscale block"
            />
          </div>

          {/* Name + contact */}
          <div className="border-t border-[#d4d4d4] pt-4">
            <p
              ref={nameRef}
              className="text-[32px] font-semibold tracking-[-0.03em] leading-[1.1] text-[#111] opacity-0"
            >
              VEDANT<br />SONAVANE
            </p>

            <div
              ref={dividerRef}
              className="w-7 h-px bg-[#a3a3a3] my-3"
            />

            <div ref={contactRef} className="opacity-0">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#aaa] mb-2.5">
                Software Developer
              </p>
              <div className="flex flex-col gap-0.5">
                {["+91 8291998556", "vedantsonavane799@gmail.com", "Mumbai, India"].map((t) => (
                  <p key={t} className="text-[11.5px] text-[#555] leading-[1.7]">{t}</p>
                ))}
              </div>
              <div className="mt-3.5">
                <a
                  href="https://linkedin.com/in/vedantsonavane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#555] no-underline border-b border-[#d4d4d4] pb-px"
                >
                  <LinkedInIcon />
                  linkedin.com/in/vedantsonavane
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex flex-col gap-10 sm:gap-12">

          {/* About */}
          <div>
            <p
              ref={headlineRef}
              className="text-[clamp(24px,3.2vw,42px)] font-semibold tracking-[-0.03em] leading-[1.2] text-[#111] mb-4 sm:mb-[18px] opacity-0"
            >
             Building intelligent systems <br /> with a human touch.
            </p>
            <p
              ref={bodyRef}
              className="text-[14px] text-[#666] leading-[1.95] max-w-[480px] opacity-0"
            >
              Code is a material — like clay, like light.<br />
              I shape it into things that breathe: systems that scale,
              interfaces that feel inevitable, and products
              people return to without knowing why.
            </p>
          </div>

          {/* Work */}
          <div ref={workRef} className="opacity-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#111] mb-4">
              Work
            </p>
            <div className="flex gap-6 items-baseline">
              <span className="text-[11px] text-[#111] min-w-[48px] tracking-[0.04em]">2026</span>
              <div>
                <p className="text-[15px] text-[#111] font-medium mb-1">Vynqe</p>
                <p className="text-[12.5px] text-[#888] leading-[1.65]">
                  Building AI-driven platforms where intelligence meets craft.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div ref={eduRef} className="opacity-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#111] mb-4">
              Education
            </p>
            <div className="flex gap-6 items-baseline">
              <span className="text-[11px] text-[#111] min-w-[48px]">2024</span>
              <div>
                <p className="text-[15px] text-[#111] font-medium mb-1">University of Mumbai</p>
                <p className="text-[12.5px] text-[#888]">B.Sc. Information Technology · CGPA 8.2</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div ref={skillsRef} className="opacity-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#111] mb-[18px]">
              Skills
            </p>
            <div className="flex flex-col gap-4 max-w-[420px]">
              {SKILLS.map(({ label, pct }, i) => (
                <SkillBar
                  key={label}
                  label={label}
                  pct={pct}
                  barRef={(el) => (barRefs.current[i] = el)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}