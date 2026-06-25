import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import climbVideo from "../../assets/videos/climb.mp4";

gsap.registerPlugin(ScrollTrigger);

const LEFT_POINTS = [
  {
    id: "02",
    title: "Learned By Building.",
    text: "Projects became classrooms. Every mistake taught faster than tutorials ever could.",
  },
  {
    id: "04",
    title: "Stayed In Motion.",
    text: "Kept shipping through confusion, pressure, rewrites, crashes, and uncertainty.",
  },
];

const RIGHT_POINTS = [
  {
    id: "01",
    title: "Curiosity Led First.",
    text: "Started exploring interfaces, systems, code, motion, and ideas without knowing where it would lead.",
  },
  {
    id: "03",
    title: "Growth Became Habit.",
    text: "Frontend, backend, APIs, design, deployment — learned by climbing through every layer.",
  },
];

export default function ClimbSection() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const stickyRef = useRef(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let tween;

    const ctx = gsap.context(() => {
      video.pause();

      // PIN
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        pinSpacing: false,
        scrub: true,
      });

      // VIDEO SCRUB
      const setupVideo = () => {
        video.currentTime = 0;

        tween = gsap.to(video, {
          currentTime: video.duration || 1,
          ease: "none",
          paused: true,
        });

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            tween.progress(self.progress);
          },
        });
      };

      if (video.readyState >= 1) {
        setupVideo();
      } else {
        video.addEventListener("loadedmetadata", setupVideo);
      }

      // VIDEO SCALE
      gsap.to(".video-wrap", {
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // LEFT ITEMS
      gsap.fromTo(
        ".left-item",
        {
          y: 120,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "15% top",
            end: "45% top",
            scrub: 1.5,
          },
        }
      );

      // RIGHT ITEMS
      gsap.fromTo(
        ".right-item",
        {
          y: 120,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "20% top",
            end: "50% top",
            scrub: 1.5,
          },
        }
      );

      // TITLE
      gsap.from(".hero-line", {
        y: 80,
        opacity: 0,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        },
      });

      // MOBILE
      gsap.from(".mobile-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
        },
      });
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (tween) tween.kill();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-[340vh] overflow-hidden bg-black text-white"
    >
      {/* PINNED CONTAINER */}
      <div
        ref={stickyRef}
        className="relative flex h-screen w-full flex-col items-center justify-between py-12 px-6 overflow-hidden xl:flex-row xl:justify-center xl:p-0"
      >
        {/* LEFT SIDE (DESKTOP) */}
        <div className="absolute left-[5%] top-1/2 hidden w-[280px] -translate-y-1/2 xl:flex xl:flex-col gap-20">
          {LEFT_POINTS.map((item) => (
            <div key={item.id} className="left-item" style={{ opacity: 0 }}>
              <h3 className="serif-font text-3xl font-light">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[240px] text-[14px] leading-[1.8] text-white/40">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* CENTER VIDEO & DESKTOP TITLE */}
        <div className="relative z-10 flex my-auto flex-col items-center justify-center xl:my-0">
          {/* VIDEO CONTAINER */}
          <div className="video-wrap relative flex items-center justify-center">
            <video
              ref={videoRef}
              src={climbVideo}
              muted
              playsInline
              preload="auto"
              className="pointer-events-none relative h-[40vh] w-[85vw] max-w-[340px] xs:max-w-[400px] sm:h-[45vh] md:max-w-[450px] xl:h-[50vh] xl:w-[90vw] xl:max-w-[500px] select-none object-contain will-change-transform"
            />
          </div>

          {/* DESKTOP ONLY TITLE */}
          <div className="mt-12 hidden text-center xl:block">
            <h2 className="font-semibold text-7xl text-white">
              Still Rising Still Climbing.
            </h2>
            <p className="hero-line mx-auto mt-8 max-w-[580px] text-[15px] leading-[1.9] tracking-[0.01em] text-white/40">
              Learned through motion. Built through repetition.
              <br />
              Climbed through every unknown.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="absolute right-[5%] top-1/2 hidden w-[280px] -translate-y-1/2 xl:flex xl:flex-col gap-20">
          {RIGHT_POINTS.map((item) => (
            <div key={item.id} className="right-item" style={{ opacity: 0 }}>
              <h3 className="serif-font text-3xl font-light">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[240px] text-[14px] leading-[1.8] text-white/40">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* MOBILE & TABLET BOTTOM BREAK */}
        <div className="w-full z-20 xl:hidden mt-auto">
          <div className="mx-auto max-w-md text-left xs:text-center sm:max-w-lg">
            <h2
              className="mobile-reveal text-[3.25rem] xs:text-[4rem] sm:text-[4.5rem]  leading-[0.82] tracking-[-0.06em]"
             
            >
              Still Rising Still Climbing.
            </h2>

            <p className="mobile-reveal mt-6 max-w-[320px] xs:mx-auto text-[14px] leading-[1.8] text-white/42">
              Built through mistakes.
              <br />
              Learned through movement.
              <br />
              Kept climbing anyway.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}