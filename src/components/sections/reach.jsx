import { useRef, useEffect } from "react";
import { Mail, Phone, Linkedin, Github, FileText, Send } from "lucide-react";
import { Squircle } from "@squircle-js/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RESUME_PATH = "/src/assets/vednew.pdf";
const BANNER_GIF =
  "https://i.pinimg.com/originals/81/0c/d4/810cd4d3fe1b6edb9786ff3feac05f3c.gif";
const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=vedantsonavane799@gmail.com";

export default function CTASection() {
  const sectionRef = useRef(null);
  const gifRef = useRef(null);
  const formRef = useRef(null);
  const headlineRef = useRef(null);
  const contactRef = useRef(null);
  const dividerRef = useRef(null);
  const bigTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st74 = { trigger: sectionRef.current, start: "top 78%" };
      const st72 = { trigger: sectionRef.current, start: "top 74%" };

      gsap.fromTo(
        gifRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: st74,
        },
      );

      gsap.fromTo(
        formRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          delay: 0.08,
          scrollTrigger: st74,
        },
      );

      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: st72,
        },
      );

      const fields = formRef.current?.querySelectorAll(".form-field");
      if (fields?.length) {
        gsap.fromTo(
          fields,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.09,
            delay: 0.25,
            scrollTrigger: st72,
          },
        );
      }

      gsap.fromTo(
        contactRef.current,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.42,
          scrollTrigger: st72,
        },
      );

      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
        },
      );

      if (bigTextRef.current) {
        gsap.fromTo(
          bigTextRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: bigTextRef.current, start: "top 94%" },
          },
        );

        gsap.to(bigTextRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: bigTextRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F8FAFC] overflow-hidden flex flex-col justify-center items-center"
      style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20 flex flex-col justify-center items-center gap-8 sm:gap-10">
        {/* SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center justify-center w-full">
          {/* LEFT */}
          <div
            ref={gifRef}
            className="flex flex-col gap-6 sm:gap-8 w-full max-w-xl mx-auto lg:mx-0"
          >
            {/* GIF with squircle corners */}
            <Squircle
              cornerRadius={28}
              cornerSmoothing={1}
              className="relative w-full overflow-hidden shadow-[0_4px_40px_-8px_rgba(0,0,0,0.13)]"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={BANNER_GIF}
                alt="banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </Squircle>

            <div ref={headlineRef}>
              <h2 className="text-[clamp(1.7rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-900">
                Let's Grow Something
                <br />
                Great Together.
              </h2>
              <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-neutral-500 font-light max-w-sm">
                Scalable systems, intelligent workflows, and modern experiences
                for ambitious brands and startups.
              </p>
            </div>
          </div>

          {/* RIGHT — Form + contact */}
          <div
            ref={formRef}
            className="flex flex-col gap-5 sm:gap-6 w-full max-w-xl mx-auto lg:mx-0"
          >
            <p className="text-[clamp(1.7rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-900">
              Got something in mind? Drop a line.
            </p>

            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Name + Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-[14px] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-900">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-white border border-neutral-200 rounded-full px-4 py-3 text-[13px] text-neutral-800 placeholder-neutral-300 outline-none focus:border-neutral-700 transition-colors duration-200"
                  />
                </div>

                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-[14px] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-900">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full bg-white border border-neutral-200 rounded-full px-4 py-3 text-[13px] text-neutral-800 placeholder-neutral-300 outline-none focus:border-neutral-700 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Message Full Row */}
              <div className="form-field flex flex-col gap-1.5">
                <label className="text-[10px] sm:text-[14px] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-900">
                  Message
                </label>

                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white border border-neutral-200 rounded-3xl px-4 py-3 text-[13px] text-neutral-800 placeholder-neutral-300 outline-none focus:border-neutral-700 resize-none transition-colors duration-200"
                />
              </div>

              {/* Actions */}
              <div className="form-field flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                <button
                  type="button"
                  className="group inline-flex items-center gap-2 bg-neutral-900 text-white text-[13px] font-medium px-5 sm:px-6 py-2.5 rounded-full shadow-md hover:bg-neutral-800 hover:-translate-y-px active:scale-95 transition-all duration-200"
                >
                  Send Message
                  <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-neutral-200 bg-white text-neutral-700 text-[13px] font-medium px-5 sm:px-6 py-2.5 rounded-full shadow-sm hover:border-neutral-700 hover:-translate-y-px active:scale-95 transition-all duration-200"
                >
                  <FileText className="w-3.5 h-3.5 opacity-50" />
                  Résumé
                </a>
              </div>
            </div>

            {/* Contact — below form */}
            <div
              ref={contactRef}
              className="flex flex-col gap-2.5 pt-5 border-t border-neutral-100"
            >
              <p className=" text-[13px] sm:text-[14px] leading-relaxed text-neutral-500 font-light max-w-sm">
                Or reach directly
              </p>

              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 text-[13px] text-neutral-600 hover:text-neutral-900 transition-colors w-fit"
              >
                <span className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0">
                  <Mail className="w-3 h-3" />
                </span>
                <span className="truncate">vedantsonavane799@gmail.com</span>
              </a>

              <a
                href="tel:+918291998556"
                className="group inline-flex items-center gap-2.5 text-[13px] text-neutral-600 hover:text-neutral-900 transition-colors w-fit"
              >
                <span className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0">
                  <Phone className="w-3 h-3" />
                </span>
                +91 82919 98556
              </a>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://www.linkedin.com/in/vedant-sonavane-33b426204/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-600 flex items-center justify-center transition-all duration-200"
                >
                  <Linkedin className="w-3 h-3" />
                </a>
                <a
                  href="https://github.com/VedantSonavane"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-600 flex items-center justify-center transition-all duration-200"
                >
                  <Github className="w-3 h-3" />
                </a>
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-600 flex items-center justify-center transition-all duration-200"
                >
                  <Mail className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
