// LogoSlider.jsx (Tailwind + GSAP reveal on enter, repeats every time)
import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brandIcons = import.meta.glob("../../assets/icons/brandicons/*.svg", {
  eager: true,
  import: "default",
});

export default function LogoSlider() {
  const sectionRef = useRef(null);
  const hRef       = useRef(null);
  const pRef       = useRef(null);
  const sliderRef  = useRef(null);
  const footRef    = useRef(null);

  const logos = useMemo(
    () =>
      Object.entries(brandIcons).map(([path, src], index) => {
        const name = path.split("/").pop().replace(".svg", "");
        return { id: index, name, src };
      }),
    []
  );

  const displayLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headingEl    = hRef.current;
      const originalHTML = headingEl?.innerHTML || "";
      const split        = splitHeadingIntoLines(headingEl);

      gsap.set(split.lines,   { yPercent: 110, opacity: 0 });
      gsap.set(pRef.current,  { y: 14, opacity: 0 });
      gsap.set(sliderRef.current, { y: 18, opacity: 0 });
      gsap.set(footRef.current,   { y: 10, opacity: 0 });

      const tl = gsap.timeline({ paused: true });

      tl.to(split.lines, {
        yPercent: 0,
        opacity:  1,
        duration: 0.8,
        ease:     "power3.out",
        stagger:  0.08,
      })
        .to(pRef.current,    { y: 0, opacity: 1, duration: 0.6,  ease: "power3.out" }, "-=0.35")
        .to(sliderRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.35")
        .to(footRef.current, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "-=0.45");

      const st = ScrollTrigger.create({
        trigger:     section,
        start:       "top 70%",
        end:         "bottom 30%",
        onEnter:     () => tl.restart(true),
        onEnterBack: () => tl.restart(true),
        onLeave:     () => tl.pause(0),
        onLeaveBack: () => tl.pause(0),
      });

      return () => {
        st?.kill();
        tl?.kill();
        if (headingEl) headingEl.innerHTML = originalHTML;
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-[#F8FAFC] text-neutral-900 px-5 sm:px-8 flex items-center"
    >
      <div className="w-full flex flex-col items-center justify-center py-14 sm:py-16">

        {/* Heading + subtitle */}
        <div className="mx-auto w-full max-w-7xl text-center px-2 sm:px-0">
                   <h1 className="font-semibold text-neutral-900 text-[clamp(1.75rem,7vw,3.75rem)] leading-[1.15] tracking-[-0.02em]">
         
            The infrastructure <br /> of modern craftsmanship.
          </h1>

          <p
            ref={pRef}
            className="mt-5 sm:mt-6 mx-auto max-w-xl sm:max-w-2xl text-sm sm:text-base font-light leading-relaxed text-neutral-600"
          >
            The workflow integrates high-fidelity design systems with
            industrial-grade engineering. Built on tools like Figma and Spline,
            it forms a stable technical foundation for translating creative
            intent into scalable, performant digital products.
          </p>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="relative mx-auto mt-7 w-full max-w-7xl overflow-hidden py-3"
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

          <div className="flex w-max items-center gap-2.5 sm:gap-3 will-change-transform animate-logo-marquee">
            {displayLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                title={logo.name}
                className="relative flex items-center justify-center rounded-[28px] sm:rounded-[32px]
                           h-[68px] w-[68px] sm:h-20 sm:w-20
                           px-[18px] py-[6px] sm:px-[23px] sm:py-[7px]
                           bg-gradient-to-b from-white via-zinc-50 to-zinc-100
                           shadow-md hover:shadow-lg transition-shadow duration-300 shrink-0"
              >
                <span className="pointer-events-none absolute left-[10px] right-[10px] bottom-2 h-[10px] rounded-full blur-[6px] opacity-35" />
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-full w-full max-h-[32px] max-w-[32px] sm:max-h-[38px] sm:max-w-[38px] object-contain opacity-90"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <p
          ref={footRef}
          className="mt-5 sm:mt-6 text-center text-[9px] sm:text-[10px] md:text-[11px] tracking-wide text-neutral-500/60 leading-relaxed"
        >
          Icons represent tools I've used in real builds.
          <br />
          <span className="mt-1 block">
            Built with intention — where code and craft meet.
          </span>
        </p>

        {/* Keyframes */}
        <style>{`
          @keyframes logo-marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-33.333%); }
          }
          .animate-logo-marquee {
            animation: logo-marquee 60s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}

/**
 * Splits the heading into line spans for GSAP yPercent reveal.
 * Preserves <br/> as actual breaks.
 */
function splitHeadingIntoLines(el) {
  if (!el) return { lines: [] };

  const raw   = el.innerHTML.replace(/<br\s*\/?>/gi, "[[BR]]");
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
    .join('<span style="display:block; height:0.2em;"></span>');

  el.innerHTML = html;
  return { lines: Array.from(el.querySelectorAll(".gsap-line")) };
}