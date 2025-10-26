import { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseRadius?: number;
  particleSpeed?: number;
  className?: string;
  theme?: 'light' | 'dark';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  draw: (ctx: CanvasRenderingContext2D, theme: 'light' | 'dark') => void;
  update: (mouse: Mouse, width: number, height: number) => void;
}

interface Mouse {
  x: number | null;
  y: number | null;
  radius: number;
}

function ParticleCanvas({
  particleCount = 60,
  connectionDistance = 150,
  mouseRadius = 120,
  particleSpeed = 0.5,
  className = '',
  theme = 'dark'
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let particles: Particle[] = [];
    let animationFrameId: number;

    const mouse: Mouse = {
      x: null,
      y: null,
      radius: mouseRadius
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      init();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    class ParticleClass implements Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.baseVx = this.vx;
        this.baseVy = this.vy;
        this.radius = 2;
      }

      draw(ctx: CanvasRenderingContext2D, currentTheme: 'light' | 'dark') {
        const colors = currentTheme === 'dark'
          ? {
              primary: 'rgba(102, 126, 234, 0.8)',
              secondary: 'rgba(118, 75, 162, 0.8)',
              glow: 'rgba(102, 126, 234, 0)'
            }
          : {
              primary: 'rgba(102, 126, 234, 0.6)',
              secondary: 'rgba(118, 75, 162, 0.6)',
              glow: 'rgba(102, 126, 234, 0)'
            };

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 4
        );
        gradient.addColorStop(0, colors.primary);
        gradient.addColorStop(0.5, colors.secondary);
        gradient.addColorStop(1, colors.glow);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.primary;
        ctx.fill();
      }

      update(mouse: Mouse, width: number, height: number) {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            this.vx -= Math.cos(angle) * force * 3;
            this.vy -= Math.sin(angle) * force * 3;
          }
        }

        const friction = 0.92;
        this.vx += (this.baseVx - this.vx) * 0.08;
        this.vy += (this.baseVy - this.vy) * 0.08;
        this.vx *= friction;
        this.vy *= friction;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) {
          this.vx *= -1;
          this.x = Math.max(0, Math.min(width, this.x));
        }
        if (this.y < 0 || this.y > height) {
          this.vy *= -1;
          this.y = Math.max(0, Math.min(height, this.y));
        }
      }
    }

    function init() {
      particles = [];
      const density = (width * height) / 12000;
      const count = Math.min(particleCount, Math.floor(density));

      for (let i = 0; i < count; i++) {
        particles.push(new ParticleClass());
      }
    }

    function connect(currentTheme: 'light' | 'dark') {
      if (!ctx) return;
      const baseOpacity = currentTheme === 'dark' ? 0.4 : 0.25;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * baseOpacity;

            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );

            if (currentTheme === 'dark') {
              gradient.addColorStop(0, `rgba(102, 126, 234, ${opacity})`);
              gradient.addColorStop(0.5, `rgba(110, 100, 200, ${opacity})`);
              gradient.addColorStop(1, `rgba(118, 75, 162, ${opacity})`);
            } else {
              gradient.addColorStop(0, `rgba(102, 126, 234, ${opacity * 0.8})`);
              gradient.addColorStop(0.5, `rgba(110, 100, 200, ${opacity * 0.8})`);
              gradient.addColorStop(1, `rgba(118, 75, 162, ${opacity * 0.8})`);
            }

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(particle => {
        particle.update(mouse, width, height);
        particle.draw(ctx, theme);
      });

      connect(theme);
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, connectionDistance, mouseRadius, particleSpeed, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default ParticleCanvas;
