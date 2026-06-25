import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GOALS = [
  {
    id: "01",
    title: "Stay Close to the Build",
    text: "Work inside early-stage teams where product and execution move together.",
  },
  {
    id: "02",
    title: "Grow Through Responsibility",
    text: "Learn in environments where ownership and pressure sharpen technical depth.",
  },
  {
    id: "03",
    title: "Become Operationally Sharp",
    text: "Grow into a senior full stack developer with stronger systems thinking.",
  },
];

export default function GoalsSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".goal-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
        },
      });

      gsap.to(".bg-scale", {
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* BACKGROUND */}
      <div
        className="bg-scale absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/originals/39/65/ea/3965eabb21416bc6b2fef3ef157492fd.gif')",
        }}
      />

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-l from-black via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center py-16 sm:py-24 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-14">
          <div className="ml-auto w-full max-w-3xl text-left sm:text-right">
            
            {/* MAIN QUOTE */}
            <h2 className="font-semibold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
              Keeping sight
              <br /> of the long game.
            </h2>

            {/* SHORT INTRO */}
            <p className="goal-reveal mt-5 sm:mt-7 ml-0 sm:ml-auto max-w-xl text-[13px] sm:text-sm leading-relaxed text-white/55 font-light">
              Over the next few years, I want to stay close to real product
              building, stronger engineering environments, and work that
              compounds long-term growth.
            </p>

            {/* GOALS */}
            <div className="mt-10 sm:mt-12 space-y-6 sm:space-y-8">
              {GOALS.map((goal) => (
                <div
                  key={goal.id}
                  className="
                    goal-reveal
                    border-t border-white/10 pt-5
                    flex flex-col gap-2
                    sm:flex-row sm:items-start sm:justify-between sm:gap-6
                  "
                >
                  {/* Number Tag */}
                  <span className="text-[10px] sm:text-[11px] tracking-[0.25em] text-white/20 block pt-1">
                    {goal.id}
                  </span>

                  {/* Text Container */}
                  <div className="w-full max-w-lg sm:text-right">
                    <h3 className="text-[clamp(1.15rem,4vw,1.6rem)] leading-tight font-light tracking-tight text-white">
                      {goal.title}
                    </h3>

                    <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-white/45 font-light">
                      {goal.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}