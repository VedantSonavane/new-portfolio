import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Box, Github, Instagram, Linkedin, X } from "lucide-react";
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
    { label: "GitHub", href: "https://github.com/", icon: Github },
    { label: "Instagram", href: "https://instagram.com/", icon: Instagram },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: Linkedin },
  ];

  // Header Entrance Animation
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // Mobile Menu Toggle Animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (open) {
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -15, display: "none" },
        { opacity: 1, y: 0, display: "block", duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" });
        },
      });
    }
  }, [open]);

  const scrollToSection = (href) => {
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-[100] px-3 pt-3 sm:px-5 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Navbar Container */}
<div className="relative flex items-center justify-between border-b-2 border-white bg-white/60 backdrop-blur-xl px-4 py-3 shadow-sm rounded-full md:rounded-full sm:px-6">          
          {/* BRAND */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl md:text-2xl"
          >
            VedDev
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {nav.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-light transition text-neutral-700 hover:text-black"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* DESKTOP SOCIALS & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Social Icons (Aligned Right before the button) */}
            <div className="flex items-center gap-2 border-r border-neutral-900/10 pr-4 dark:border-white/10">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-neutral-600 hover:text-black transition-colors rounded-full hover:bg-black/5"
                    title={s.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

           <button
  onClick={() => window.open("https://6s626jvdwh.zite.so", "_blank")}
  className="group flex items-center gap-2 bg-neutral-900 px-5 py-2 text-sm text-white transition hover:bg-neutral-800 rounded-full"
>
  Get a Quote
  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
</button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center border border-white/30 bg-white/30 p-2 rounded-full"
          >
            {open ? <X className="h-5 w-5 text-neutral-500" /> : <Box className="h-5 w-5 text-neutral-500" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          ref={mobileMenuRef}
          style={{ display: "none" }}
          className="md:hidden mt-3 border border-white/30 bg-white/90 backdrop-blur-xl shadow-xl p-5 rounded-2xl"
        >
          <div className="flex flex-col gap-2">
            {nav.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="py-2 text-sm text-neutral-800 rounded-lg hover:bg-black/5 text-left px-3"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-black/10">
            <p className="text-center italic text-neutral-600 text-sm mb-4">
              "Build it with clarity — ship it with confidence."
            </p>

            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                    className="p-2 text-neutral-600 hover:text-black transition-colors rounded-full hover:bg-black/5"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
<button
  onClick={() => window.open("https://6s626jvdwh.zite.so", "_blank")}
  className="flex-1 bg-neutral-900 text-white py-4 text-sm rounded-full font-medium"
>
  Get a Quote
</button>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}