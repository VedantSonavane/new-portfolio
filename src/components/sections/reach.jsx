import { useRef, useEffect, useState } from "react";
import { Mail, Phone, FileText, Send } from "lucide-react";
import { Squircle } from "@squircle-js/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contactmeGif from "../../assets/videos/contactme.gif";

gsap.registerPlugin(ScrollTrigger);

const RESUME_PATH = "https://raw.githubusercontent.com/VedantSonavane/resume-/main/vednew.pdf";
const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=vedantsonavane799@gmail.com";
const WEB3FORMS_KEY = "1ba7c230-a672-4b9f-9d8a-0d1e53462919";

const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// cute toast that floats up and fades
const SuccessToast = () => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (!toastRef.current) return;
    gsap.fromTo(
      toastRef.current,
      { y: 16, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }
    );
  }, []);

  return (
    <div
      ref={toastRef}
      className="flex items-start gap-3 bg-neutral-900 text-white rounded-xl px-4 py-3 shadow-lg w-fit"
    >
      <div className="flex flex-col gap-0.5">
        <p className="text-[13px] font-semibold leading-tight">Message sent!</p>
        <p className="text-[11px] text-neutral-400 leading-snug">
          I usually reply within 24 hrs — sit tight ✦
        </p>
      </div>
    </div>
  );
};

const ErrorToast = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { x: -8, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={ref}
      className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 w-fit"
    >
      <span className="text-lg leading-none mt-0.5">😬</span>
      <div className="flex flex-col gap-0.5">
        <p className="text-[13px] font-semibold text-red-700 leading-tight">Oops, something broke.</p>
        <p className="text-[11px] text-red-400 leading-snug">
          Try again or just shoot me an email directly.
        </p>
      </div>
    </div>
  );
};

export default function CTASection() {
  const sectionRef = useRef(null);
  const gifRef = useRef(null);
  const formRef = useRef(null);
  const headlineRef = useRef(null);
  const contactRef = useRef(null);
  const dividerRef = useRef(null);
  const bigTextRef = useRef(null);

  const [formState, setFormState] = useState("idle"); // idle | loading | success | error

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormState("loading");
    try {
      const formData = new FormData(e.target);
      formData.append("access_key", WEB3FORMS_KEY);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setFormState("success");
        e.target.reset();
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 5000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st74 = { trigger: sectionRef.current, start: "top 78%" };
      const st72 = { trigger: sectionRef.current, start: "top 74%" };

      gsap.fromTo(
        gifRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "expo.out", scrollTrigger: st74 }
      );

      gsap.fromTo(
        formRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: 0.08, scrollTrigger: st74 }
      );

      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1, scrollTrigger: st72 }
      );

      const fields = formRef.current?.querySelectorAll(".form-field");
      if (fields?.length) {
        gsap.fromTo(
          fields,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.09, delay: 0.25, scrollTrigger: st72 }
        );
      }

      gsap.fromTo(
        contactRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: 0.42, scrollTrigger: st72 }
      );

      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 68%" } }
      );

      if (bigTextRef.current) {
        gsap.fromTo(
          bigTextRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: bigTextRef.current, start: "top 94%" } }
        );
        gsap.to(bigTextRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: bigTextRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-[#F8FAFC] overflow-hidden flex flex-col justify-center items-center"
      style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20 flex flex-col justify-center items-center gap-8 sm:gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center justify-center w-full">

          {/* LEFT */}
          <div ref={gifRef} className="flex flex-col gap-6 sm:gap-8 w-full max-w-xl mx-auto lg:mx-0">
            <Squircle
              cornerRadius={28}
              cornerSmoothing={1}
              className="relative w-full overflow-hidden shadow-[0_4px_40px_-8px_rgba(0,0,0,0.13)]"
              style={{ aspectRatio: "4/3" }}
            >
              <img src={contactmeGif} alt="banner" className="w-full h-full object-cover" />
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

          {/* RIGHT */}
          <div ref={formRef} className="flex flex-col gap-5 sm:gap-6 w-full max-w-xl mx-auto lg:mx-0">
            <p className="text-[clamp(1.7rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-900">
              Got something in mind? Drop a line.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:gap-4">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-[14px] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-900">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
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
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="w-full bg-white border border-neutral-200 rounded-full px-4 py-3 text-[13px] text-neutral-800 placeholder-neutral-300 outline-none focus:border-neutral-700 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="form-field flex flex-col gap-1.5">
                <label className="text-[10px] sm:text-[14px] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-900">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white border border-neutral-200 rounded-3xl px-4 py-3 text-[13px] text-neutral-800 placeholder-neutral-300 outline-none focus:border-neutral-700 resize-none transition-colors duration-200"
                />
              </div>

              <div className="form-field flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                <button
                  type="submit"
                  disabled={formState === "loading" || formState === "success"}
                  className="group inline-flex items-center gap-2 bg-neutral-900 text-white text-[13px] font-medium px-5 sm:px-6 py-2.5 rounded-full shadow-md hover:bg-neutral-800 hover:-translate-y-px active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {formState === "loading" ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : formState === "success" ? (
                    <>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
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

              {/* Toast feedback */}

              <div className="min-h-[52px] flex items-center">
                {formState === "success" && <SuccessToast key="success" />}
                {formState === "error" && <ErrorToast key="error" />}
              </div>
            </form>

            {/* Contact */}
            <div ref={contactRef} className="flex flex-col gap-2.5 pt-5 border-t border-neutral-100">
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-neutral-500 font-light max-w-sm">
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
                  <LinkedInIcon className="w-3 h-3" />
                </a>

                <a
                  href="https://github.com/VedantSonavane"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-600 flex items-center justify-center transition-all duration-200"
                >
                  <GitHubIcon className="w-3 h-3" />
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