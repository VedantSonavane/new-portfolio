/* eslint-disable no-unused-vars */
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    scene,
    bend,
    yOffset,
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;

    // these will be set later by App.onResize()
    this.screen = null;
    this.viewport = null;

    this.bend = bend;
    this.yOffset = yOffset;

    this.createShader();
    this.createMesh();
    // ❌ DO NOT call onResize() here (screen/viewport not ready yet)
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

        // your squircle mask (keep if you like)
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
    if (!this.viewport) return; // ✅ safe if called before resize

    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;

    // “∩” arch
    const H = this.viewport.width / 2;
    const B = Math.max(0.0001, Math.abs(this.bend));
    const R = (H * H + B * B) / (2 * B);
    const inside = Math.max(0, R * R - x * x);
    const arc = Math.sqrt(inside) - R;

    this.plane.position.y = arc + this.yOffset;

    const t = Math.min(1, Math.abs(x) / R);
    this.plane.rotation.z = -Math.sign(x) * Math.asin(t);

    // infinite wrap
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

    // card size controls ⬇️ (change these numbers)
    const scale = this.screen.height / 2600;

    this.plane.scale.y =
      (this.viewport.height * (1000 * scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (800 * scale)) / this.screen.width;

    this.padding = 0.5;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

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

    this.startOffset = typeof startOffset === "number" ? startOffset : 0.5; // default middle
    this.lastTime = performance.now();

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGeometry();
    this.createMedias(items);

    // ✅ now compute screen/viewport then resize medias
    this.onResize();

    // ✅ start from middle after widthTotal exists
    this.applyStartOffset();

    this.addEventListeners();
    this.update();
  }

  applyStartOffset() {
    if (!this.medias?.length) return;
    const total = this.medias[0]?.widthTotal || 0;
    if (!total) return;

    const offset = total * this.startOffset;

    this.scroll.current = offset;
    this.scroll.target = offset;
    this.scroll.last = offset;
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: 2 });
    this.gl = this.renderer.gl;
    this.gl.canvas.style.display = "block";
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

  createMedias(items) {
    const baseItems =
      items && items.length >= 8
        ? items
        : [...Array(24)].map((_, i) => ({
            image: `https://picsum.photos/seed/${i + 150}/600/800`,
          }));

    this.medias = baseItems.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: baseItems.length,
        scene: this.scene,
        bend: this.bend,
        yOffset: this.yOffset,
      });
    });
  }

  onWheel = (e) => {
    if (!this.enableWheel) return;
    this.scroll.target += e.deltaY * this.scroll.speed;
  };

  onResize = () => {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };

    if (this.medias) {
      this.medias.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }));
    }

    // keep start position consistent after resize
    this.applyStartOffset();
  };

  update = () => {
    const now = performance.now();
    const dt = (now - this.lastTime) / 16.6667;
    this.lastTime = now;

    // continuous motion
    this.scroll.target += this.autoSpeed * dt;

    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";

    if (this.medias) this.medias.forEach((m) => m.update(this.scroll, direction));
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

    if (this.gl?.canvas?.parentNode) {
      this.container.removeChild(this.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 10,
  yOffset = 5,
  scrollEase = 0.06,
  scrollSpeed = 0.006,
  enableWheel = true,
  autoSpeed = 0.02,
  startOffset = 0.5, // ✅ start from middle
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const app = new App(containerRef.current, {
      items,
      bend,
      yOffset,
      scrollEase,
      scrollSpeed,
      enableWheel,
      autoSpeed,
      startOffset,
    });

    return () => app.destroy();
  }, [items, bend, yOffset, scrollEase, scrollSpeed, enableWheel, autoSpeed, startOffset]);

  return <div className="w-full h-full" ref={containerRef} />;
}
