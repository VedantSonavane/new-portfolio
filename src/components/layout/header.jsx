import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, FileText, Github, Linkedin } from "lucide-react";
import gsap from "gsap";

export default function Header() {
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Reach", href: "#contact" },
  ];

  const socials = [
    { label: "GitHub", href: "https://github.com/VedantSonavane", icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vedant-sonavane-33b426204/", icon: Linkedin },
  ];

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    open
      ? gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -15, display: "none" },
          { opacity: 1, y: 0, display: "block", duration: 0.35 }
        )
      : gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -15,
          duration: 0.25,
          onComplete: () =>
            gsap.set(mobileMenuRef.current, { display: "none" }),
        });
  }, [open]);

  const scrollToSection = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-[100] px-3 pt-3 sm:px-5 md:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="flex items-center justify-between rounded-full bg-white/60 backdrop-blur-xl border-b-2 border-white px-4 py-3 shadow-sm sm:px-6">

          <button
            onClick={() => scrollToSection("#hero")}
            className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl"
          >
            VedDev
          </button>

          <nav className="hidden lg:flex gap-6">
            {nav.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm text-neutral-700 hover:text-black transition"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">

            <div className="flex gap-1 border-r border-black/10 pr-3">
              {socials.map((s) => {
                const Icon = s.icon;

                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full text-neutral-600 hover:text-black hover:bg-black/5 transition"
                  >
                    <Icon size={16}/>
                  </a>
                );
              })}
            </div>

           <button
  onClick={() =>
    window.open(
      "https://raw.githubusercontent.com/VedantSonavane/resume-/main/vednew.pdf",
      "_blank"
    )
  }
  className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600 hover:bg-black/5 transition"
>
  Resume
  <FileText size={15}/>
</button>

            <button
              onClick={() => window.open("https://6s626jvdwh.zite.so","_blank")}
              className="group flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm text-white hover:bg-neutral-800 transition"
            >
              Get a Quote
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"/>
            </button>

          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-full border bg-white/30 p-2"
          >
            {open ? <X size={20}/> : <div className="grid grid-cols-2 gap-1">
              <span className="h-2 w-2 rounded bg-neutral-500"/>
              <span className="h-2 w-2 rounded bg-neutral-500"/>
              <span className="h-2 w-2 rounded bg-neutral-500"/>
              <span className="h-2 w-2 rounded bg-neutral-500"/>
            </div>}
          </button>

        </div>


        <div
          ref={mobileMenuRef}
          style={{display:"none"}}
          className="md:hidden mt-3 rounded-2xl bg-white/90 backdrop-blur-xl p-5 shadow-xl"
        >

          <div className="flex flex-col gap-2">
            {nav.map((item)=>
              <button
                key={item.href}
                onClick={()=>scrollToSection(item.href)}
                className="px-3 py-2 text-left rounded-lg hover:bg-black/5"
              >
                {item.label}
              </button>
            )}
          </div>


          <div className="mt-5 flex items-center justify-between border-t pt-4">

            <div className="flex gap-2">
              {socials.map((s)=>{
                const Icon=s.icon;

                return(
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-neutral-600"
                  >
                    <Icon size={20}/>
                  </a>
                );
              })}
            </div>


            <div className="flex gap-2">

              <button
                onClick={()=>window.open("/resume.pdf","_blank")}
                className="flex items-center gap-2 rounded-full text-neutral-600 border px-4 py-3 text-sm"
              >
                <FileText size={15} className="text-neutral-600"/>
                Resume
              </button>

              <button
                onClick={()=>window.open("https://6s626jvdwh.zite.so","_blank")}
                className="rounded-full bg-neutral-900 px-5 py-3 text-sm text-white"
              >
                Quote
              </button>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
}