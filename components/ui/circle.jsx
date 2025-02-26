import { useRef, useEffect, useCallback } from "react";

const PARTICLE_COUNT = 200;
const MAX_PARTICLE_AGE = 100;

class Particle {
  constructor(x, y) {
    this.reset(x, y);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.age = 0;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 2 + 1;
    this.radius = Math.random() * 2 + 1;
    this.opacity = 1;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.age++;
    this.opacity = 1 - this.age / MAX_PARTICLE_AGE;
    return this.age < MAX_PARTICLE_AGE;
  }
}

export function Circles({ className }) {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const particles = useRef(
    Array.from({ length: PARTICLE_COUNT }, () => new Particle(0, 0))
  );
  const mousePos = useRef({ x: -1000, y: -1000 });

  const updateParticles = useCallback((ctx) => {
    particles.current.forEach((particle) => {
      if (!particle.update()) {
        particle.reset(mousePos.current.x, mousePos.current.y);
      }
      ctx.fillStyle = `rgba(255,255,255,${particle.opacity * 0.2})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  const drawParticles = useCallback((ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateParticles(ctx);
  }, [updateParticles]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawParticles(ctx, canvas);
    requestRef.current = requestAnimationFrame(animate);
  }, [drawParticles]);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  useEffect(() => {
   
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current.x = e.clientX - rect.left;
      mousePos.current.y = e.clientY - rect.top;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [animate, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`}
      style={{ background: "#100C08" }}
    />
  );
}
