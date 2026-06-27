"use client";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

/*
 * ICON POOL — coding languages + DB/Redis only
 * variant: devicon class suffix supporting wordmarks for DB engines
 */
const DEVICON_POOL = [
  { icon: "javascript",  variant: "plain colored" },
  { icon: "typescript",  variant: "plain colored" },
  { icon: "python",      variant: "plain colored" },
  { icon: "php",         variant: "plain colored" },
  { icon: "rust",        variant: "plain colored" },
  { icon: "go",          variant: "plain colored" },
  { icon: "cplusplus",   variant: "plain colored" },
  { icon: "mongodb",     variant: "plain-wordmark colored" },
  { icon: "postgresql",  variant: "plain-wordmark colored" },
  { icon: "mysql",       variant: "plain-wordmark colored" },
  { icon: "redis",       variant: "plain-wordmark colored" },
  { icon: "sqlite",      variant: "plain-wordmark colored" },
];

export default function TechStackSection() {
  const innerRef      = useRef(null);
  const middleRef     = useRef(null);
  const outerRef      = useRef(null);
  const innerLeftRef  = useRef(null);
  const middleLeftRef = useRef(null);
  const outerLeftRef  = useRef(null);

  const CONTAINER = 1300;
  const CENTER    = CONTAINER / 2;
  const ICON      = 120; // bigger hit-area (was 100)

  const ringConfigs = [
    { radius: 260, count: 4 },
    { radius: 430, count: 6 },
    { radius: 620, count: 9 },
  ];

  const allIcons = useMemo(() => {
    const result       = [];
    const shuffledPool = [...DEVICON_POOL].sort(() => Math.random() - 0.5);
    let poolIndex      = 0;

    ringConfigs.forEach(({ radius, count }, ringIndex) => {
      for (let i = 0; i < count; i++) {
        const entry = shuffledPool[poolIndex % shuffledPool.length];
        poolIndex++;
        result.push({
          icon:      entry.icon,
          variant:   entry.variant,
          radius,
          baseAngle: (360 / count) * i,
          ringIndex,
          id:        `${ringIndex}-${i}`,
        });
      }
    });
    return result;
  }, []);

  const speeds     = [360 / 30, 360 / 30, 360 / 30];
  const delays     = [0, 0, 0];
  const startTimes = useRef(null);

  useEffect(() => {
    [innerRef, middleRef, outerRef, innerLeftRef, middleLeftRef, outerLeftRef]
      .forEach((ref, i) => {
        gsap.to(ref.current, {
          rotate:          360,
          duration:        80,
          repeat:          -1,
          ease:            "none",
          delay:           delays[i % 3],
          transformOrigin: "center center",
        });
      });

    const ticker = gsap.ticker.add((time) => {
      if (!startTimes.current) startTimes.current = time;
      const elapsed    = time - startTimes.current;

      const ringAngles = delays.map((delay, i) => {
        const t = Math.max(0, elapsed - delay);
        return (speeds[i] * t) % 360;
      });

      allIcons.forEach(({ radius, baseAngle, ringIndex, id }) => {
        const rightEl = document.getElementById(`icon-right-${id}`);
        const leftEl  = document.getElementById(`icon-left-${id}`);

        const totalAngle = baseAngle + ringAngles[ringIndex];
        const rad        = (totalAngle * Math.PI) / 180;
        const x          = CENTER + radius * Math.sin(rad);
        const y          = CENTER - radius * Math.cos(rad);

        if (rightEl) {
          rightEl.style.left = `${x - ICON / 2}px`;
          rightEl.style.top  = `${y - ICON / 2}px`;
        }
        if (leftEl) {
          leftEl.style.left = `${x - ICON / 2}px`;
          leftEl.style.top  = `${y - ICON / 2}px`;
        }
      });
    });

    return () => gsap.ticker.remove(ticker);
  }, [allIcons]);

  /* Icon tile — h-28 w-28 card, 52px glyph */
  const OrbitIcon = ({ icon, variant, baseAngle, radius, idPrefix }) => {
    const rad = (baseAngle * Math.PI) / 180;
    const x   = CENTER + radius * Math.sin(rad);
    const y   = CENTER - radius * Math.cos(rad);

    return (
      <div
        id={idPrefix}
        className="absolute flex items-center justify-center transition-transform duration-300 hover:scale-110 z-20"
        style={{
          left:   `${x - ICON / 2}px`,
          top:    `${y - ICON / 2}px`,
          width:  `${ICON}px`,
          height: `${ICON}px`,
        }}
      >
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-[36px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
          <i className={`devicon-${icon}-${variant} text-[52px] relative z-10`} />
        </div>
      </div>
    );
  };

  const RingSet = ({ outerRingRef, middleRingRef, innerRingRef }) => (
    <>
      {[
        { ref: outerRingRef,  cfg: ringConfigs[2] },
        { ref: middleRingRef, cfg: ringConfigs[1] },
        { ref: innerRingRef,  cfg: ringConfigs[0] },
      ].map(({ ref, cfg }) => (
        <div
          key={cfg.radius}
          ref={ref}
          className="absolute rounded-full border border-neutral-300/40"
          style={{
            width:  `${cfg.radius * 2}px`,
            height: `${cfg.radius * 2}px`,
            left:   `${CENTER - cfg.radius}px`,
            top:    `${CENTER - cfg.radius}px`,
          }}
        />
      ))}
    </>
  );

  const orbitBase = (pos) => ({
    position: "absolute",
    ...pos,
    width:    CONTAINER,
    height:   CONTAINER,
    overflow: "visible",
  });

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F8FAFC] flex items-center justify-center">
      {/* ── CENTER CONTENT ── */}
      <div className="relative z-10 w-full max-w-2xl text-center px-5 sm:px-6">
        {/* Headline */}
        <h1 className="font-semibold text-neutral-900 text-[clamp(1.75rem,7vw,3.75rem)] leading-[1.15] tracking-[-0.02em]">
          Ancient roots. <br /> Modern language.
        </h1>
       
        {/* Body */}
        <p className="mt-5 sm:mt-7 max-w-md sm:max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed text-neutral-600">
          Every line of code carries a lineage. These are the languages
          and data engines at the core — chosen for precision, performance,
          and the quiet confidence of tools that just work.
        </p>

       
      </div>

      {/* ── RIGHT ORBIT (bottom-right) ── */}
      <div
        className="absolute [transform:scale(0.32)] sm:[transform:scale(0.55)] md:[transform:scale(0.75)] lg:[transform:scale(1)]"
        style={{
          ...orbitBase({
            bottom: `-${CONTAINER / 2}px`,
            right:  `-${CONTAINER / 2}px`,
          }),
          transformOrigin: "bottom right",
        }}
      >
        <div className="absolute" style={{ width: CONTAINER, height: CONTAINER }}>
          {allIcons.map(({ icon, variant, baseAngle, radius, id }) => (
            <OrbitIcon
              key={`right-${id}`}
              icon={icon}
              variant={variant}
              baseAngle={baseAngle}
              radius={radius}
              idPrefix={`icon-right-${id}`}
            />
          ))}
        </div>
        <RingSet
          outerRingRef={outerRef}
          middleRingRef={middleRef}
          innerRingRef={innerRef}
        />
      </div>

      {/* ── LEFT ORBIT (top-left) ── */}
      <div
        className="absolute [transform:scale(0.32)] sm:[transform:scale(0.55)] md:[transform:scale(0.75)] lg:[transform:scale(1)]"
        style={{
          ...orbitBase({
            top:  `-${CONTAINER / 2}px`,
            left: `-${CONTAINER / 2}px`,
          }),
          transformOrigin: "top left",
        }}
      >
        <div className="absolute" style={{ width: CONTAINER, height: CONTAINER }}>
          {allIcons.map(({ icon, variant, baseAngle, radius, id }) => (
            <OrbitIcon
              key={`left-${id}`}
              icon={icon}
              variant={variant}
              baseAngle={baseAngle}
              radius={radius}
              idPrefix={`icon-left-${id}`}
            />
          ))}
        </div>
        <RingSet
          outerRingRef={outerLeftRef}
          middleRingRef={middleLeftRef}
          innerRingRef={innerLeftRef}
        />
      </div>
    </section>
  );
}