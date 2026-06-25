import React, { useLayoutEffect, useRef, useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";

// ✅ Your local images
import h1 from "../../assets/images/hero/h1.jpeg";
import h2 from "../../assets/images/hero/h2.jpeg";
import h3 from "../../assets/images/hero/h3.jpeg";
import h4 from "../../assets/images/hero/h4.jpeg";
import h5 from "../../assets/images/hero/h5.jpeg";
import h6 from "../../assets/images/hero/h6.jpeg";
import h7 from "../../assets/images/hero/h7.jpeg";
import h8 from "../../assets/images/hero/h8.jpeg";
import h9 from "../../assets/images/hero/h9.jpeg";
import h10 from "../../assets/images/hero/h10.jpeg";
import h11 from "../../assets/images/hero/h11.jpeg";
import h12 from "../../assets/images/hero/h12.jpeg";

import j1 from "../../assets/images/showcase/j1.jpeg";
import j2 from "../../assets/images/showcase/j2.jpeg";
import j3 from "../../assets/images/showcase/j3.jpeg";
import j4 from "../../assets/images/showcase/j4.jpeg";
import j5 from "../../assets/images/showcase/j5.jpeg";
import j6 from "../../assets/images/showcase/j6.jpeg";
import j7 from "../../assets/images/showcase/j7.jpeg";
import j8 from "../../assets/images/showcase/j8.jpeg";
import j9 from "../../assets/images/showcase/j9.jpeg";
import j10 from "../../assets/images/showcase/j10.jpeg";
import j11 from "../../assets/images/showcase/j11.jpeg";
import j12 from "../../assets/images/showcase/j12.jpeg";

gsap.registerPlugin(ScrollTrigger);

// ---------- helpers ----------
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- OGL media ----------
class Media {
  constructor({ geometry, gl, image, index, length, scene, bend, yOffset }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.bend = bend;
    this.yOffset = yOffset;

    this.createShader();
    this.createMesh();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;

        float squircleSDF(vec2 p, float n, float r) {
          p = abs(p);
          return pow(pow(p.x, n) + pow(p.y, n), 1.0/n) - r;
        }

        void main() {
          vec4 color = texture2D(tMap, vUv);
          vec2 p = vUv - 0.5;
          float d = squircleSDF(p, 4.0, 0.499);
          float alpha = 1.0 - smoothstep(-0.004, 0.004, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;

    img.onload = () => {
      texture.image = img;
      texture.needsUpdate = true;
    };

    img.onerror = (e) => {
      console.error("Image failed:", this.image, e);
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  update(scroll, direction) {
    if (!this.viewport) return;

    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;

    const H = this.viewport.width / 2;
    const B = Math.max(0.0001, Math.abs(this.bend));
    const R = (H * H + B * B) / (2 * B);

    const inside = Math.max(0, R * R - x * x);
    const arc = Math.sqrt(inside) - R;

    this.plane.position.y = arc + this.yOffset;

    const t = Math.min(1, Math.abs(x) / R);
    this.plane.rotation.z = -Math.sign(x) * Math.asin(t);

    const planeWidth = this.plane.scale.x;
    const viewportWidth = this.viewport.width;

    if (direction === "right" && x + planeWidth < -viewportWidth) {
      this.extra -= this.widthTotal;
    } else if (direction === "left" && x - planeWidth > viewportWidth) {
      this.extra += this.widthTotal;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (!screen || !viewport) return;

    this.screen = screen;
    this.viewport = viewport;

    const scale = this.screen.height / 2600;

    this.plane.scale.y =
      (this.viewport.height * (500 * scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (400 * scale)) / this.screen.width;

    this.padding = 0.5;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

// ---------- OGL app ----------
class App {
  constructor(
    container,
    { items, bend, yOffset, scrollEase, scrollSpeed, enableWheel, autoSpeed, startOffset }
  ) {
    this.container = container;
    this.scroll = { ease: scrollEase, speed: scrollSpeed, current: 0, target: 0, last: 0 };
    this.enableWheel = enableWheel;
    this.autoSpeed = autoSpeed;
    this.bend = bend;
    this.yOffset = yOffset;
    this.startOffset = startOffset;
    this.lastTime = performance.now();

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGeometry();
    this.createMedias(items);

    this.onResize();
    this.applyStartOffset();
    this.addEventListeners();
    this.update();
  }

  applyStartOffset() {
    const total = this.medias?.[0]?.widthTotal || 0;
    const offset = total * this.startOffset;
    this.scroll.current = this.scroll.target = this.scroll.last = offset;
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    this.gl = this.renderer.gl;
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 1, widthSegments: 1 });
  }

  createMedias(items = []) {
    const validItems = items.filter((it) => it?.image && typeof it.image === "string");
    if (!validItems.length) return;

    const baseItems =
      validItems.length >= 24
        ? validItems
        : Array.from({ length: 24 }, (_, i) => validItems[i % validItems.length]);

    this.medias = baseItems.map(
      (data, index) =>
        new Media({
          geometry: this.planeGeometry,
          gl: this.gl,
          image: data.image,
          index,
          length: baseItems.length,
          scene: this.scene,
          bend: this.bend,
          yOffset: this.yOffset,
        })
    );
  }

  onWheel = (e) => {
    if (!this.enableWheel) return;
    this.scroll.target += e.deltaY * this.scroll.speed;
  };

  onResize = () => {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);

    this.camera.perspective({ aspect: this.screen.width / this.screen.height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };

    this.medias?.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }));
  };

  update = () => {
    const now = performance.now();
    const dt = (now - this.lastTime) / 16.6667;
    this.lastTime = now;

    this.scroll.target += this.autoSpeed * dt;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    this.medias?.forEach((m) => m.update(this.scroll, direction));

    this.renderer.render({ scene: this.scene, camera: this.camera });

    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update);
  };

  addEventListeners() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("wheel", this.onWheel, { passive: true });
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("wheel", this.onWheel);
    if (this.gl?.canvas?.parentNode) this.container.removeChild(this.gl.canvas);
  }
}

// ---------- Marquee ticker items ----------
const TICKER_ITEMS = [
  "Full-Stack Engineering",
  "React & Next.js",
  "Scalable Systems",
  "Motion-Driven UI",
  "AI Integrations",
  "10+ Live Projects",
];

function MarqueeTicker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative z-10 w-full overflow-hidden border-t border-neutral-200/60 bg-white/60 backdrop-blur-md py-3">
      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-ltr 28s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-5 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-neutral-800 whitespace-nowrap"
          >
            {item}
            <span className="inline-block h-1 w-1 rounded-full bg-neutral-300" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- page ----------
export default function Home() {
  const rootRef = useRef(null);
  const galleryRef = useRef(null);
  const veilRef = useRef(null);

  const [runKey, setRunKey] = useState(0);

  const BASE_IMAGES = useMemo(
    () => [
      { image: h1 }, { image: h2 }, { image: h3 }, { image: h4 },
      { image: h5 }, { image: h6 }, { image: h7 }, { image: h8 },
      { image: h9 }, { image: h10 }, { image: h11 }, { image: h12 },
      { image: j1 }, { image: j2 }, { image: j3 }, { image: j4 },
      { image: j5 }, { image: j6 }, { image: j7 }, { image: j8 },
      { image: j9 }, { image: j10 }, { image: j11 }, { image: j12 },
    ],
    []
  );

  const GALLERY_ITEMS = useMemo(() => {
    const expanded = Array.from({ length: 24 }, (_, i) => BASE_IMAGES[i % BASE_IMAGES.length]);
    return shuffleArray(expanded);
  }, [BASE_IMAGES]);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => setRunKey((k) => k + 1),
      onEnterBack: () => setRunKey((k) => k + 1),
    });

    return () => st.kill();
  }, []);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {

      gsap.set(".veil-overlay", {
        opacity: 1,
        scale: 1,
        transformOrigin: "center center",
      });
      gsap.set(".gallery-canvas-wrap", {
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
      });
      gsap.set(".reveal-line", {
        clipPath: "inset(0% 0% 100% 0%)",
        y: 28,
        opacity: 0,
      });
      gsap.set(".reveal-subtext", {
        opacity: 0,
        y: 14,
        filter: "blur(8px)",
      });
      gsap.set(".reveal-btn", {
        opacity: 0,
        scale: 0.88,
        y: 10,
      });
      gsap.set(".reveal-footnote", {
        opacity: 0,
        y: 10,
      });
      gsap.set(".ticker-wrap", {
        y: "100%",
        opacity: 0,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.to(".veil-overlay", {
        opacity: 0,
        scale: 1.04,
        duration: 1.1,
        ease: "expo.inOut",
      }, 0);

      tl.to(".gallery-canvas-wrap", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "power3.out",
      }, 0.05);

      tl.to(".reveal-line", {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        opacity: 1,
        duration: 1.05,
        stagger: {
          amount: 0.28,
          ease: "power2.out",
        },
      }, 0.30);

      tl.to(".reveal-subtext", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out",
      }, 0.70);

      tl.to(".reveal-btn", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.10,
        ease: "back.out(1.4)",
      }, 0.90);

      tl.to(".reveal-footnote", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      }, 1.10);

      tl.to(".ticker-wrap", {
        y: "0%",
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
      }, 0.55);

      gsap.to(".cta-arrow", {
        x: 6,
        duration: 0.9,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });

    }, el);

    return () => ctx.revert();
  }, [runKey]);

  useEffect(() => {
    if (!galleryRef.current) return;

    const app = new App(galleryRef.current, {
      items: GALLERY_ITEMS,
      bend: 10,
      yOffset: 5,
      scrollEase: 0.06,
      scrollSpeed: 0.006,
      enableWheel: true,
      autoSpeed: 0.02,
      startOffset: 0.5,
    });

    return () => app.destroy();
  }, [GALLERY_ITEMS]);

  const pressBtn = (e) => {
    gsap.to(e.currentTarget, { scale: 0.94, y: 2, duration: 0.08, ease: "power2.in", overwrite: "auto" });
  };
  const releaseBtn = (e) => {
    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.45, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
  };

  return (
    <main
      ref={rootRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#F8FAFC] text-neutral-900 flex flex-col"
    >

      {/* ── BACKGROUND: OGL gallery canvas ── */}
      <div className="absolute inset-0 z-0 gallery-canvas-wrap">
        <div ref={galleryRef} className="w-full h-full" />
      </div>

      {/* ── VEIL OVERLAY ── */}
      <div
        ref={veilRef}
        className="veil-overlay pointer-events-none absolute inset-0 z-[1] bg-[#F8FAFC]"
      />

      {/* ── FOREGROUND: CENTERED TEXT ── */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 sm:px-8 text-center">
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto mt-56 sm:mt-42 md:mt-52">

          {/* HEADLINE */}
          <h1 className="font-semibold text-neutral-900 text-[clamp(1.75rem,7vw,3.75rem)] leading-[1.15] tracking-[-0.02em]">
            <span className="reveal-line block">Designed with taste.</span>
            <span className="reveal-line block mt-1">Built with  an intention.</span>
          </h1>

          {/* SUBTEXT */}
          <p className="reveal-subtext mt-4 sm:mt-6 max-w-lg sm:max-w-xl text-[clamp(0.78rem,2.2vw,0.9375rem)] font-light leading-relaxed text-neutral-600 px-2 sm:px-0">
            Designing and developing scalable digital experiences through
            modern frontend systems, backend architecture, motion, and
            production-focused engineering.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">

            {/* PRIMARY */}
            <button
              className="reveal-btn group flex items-center justify-center gap-3 rounded-full bg-neutral-900 px-7 py-3 text-[0.8125rem] sm:text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-[background-color,box-shadow] duration-200 hover:bg-neutral-800 w-full sm:w-auto"
              onPointerDown={pressBtn}
              onPointerUp={releaseBtn}
              onPointerLeave={releaseBtn}
            >
              <span>View Selected Work</span>
              <ArrowUpRight className="cta-arrow h-4 w-4 opacity-90 transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
            </button>

            {/* SECONDARY */}
            <button
              className="reveal-btn rounded-full border border-neutral-300 bg-white/80 px-7 py-3 text-[0.8125rem] sm:text-sm font-medium text-neutral-700 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-neutral-400 hover:bg-white w-full sm:w-auto"
              onPointerDown={pressBtn}
              onPointerUp={releaseBtn}
              onPointerLeave={releaseBtn}
            >
              Resume & Experience
            </button>

          </div>
        </div>
      </section>

      {/* FOOTNOTE */}
      <div className="reveal-footnote pointer-events-none relative z-10 px-5 sm:px-6 pb-2">
        <p className="text-center text-[9px] sm:text-[10.5px] tracking-wide text-neutral-500/60 leading-relaxed">
          Imagery used to express mood and direction. Rights remain with original creators.
          <br className="hidden sm:block" />
          <span className="mt-0.5 block sm:inline sm:mt-0 sm:ml-1">Built with intention — where code and craft meet.</span>
        </p>
      </div>

      {/* TICKER */}
      <div className="ticker-wrap relative z-10">
        <MarqueeTicker />
      </div>

    </main>
  );
}