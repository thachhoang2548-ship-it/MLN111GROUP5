import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ era = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Re-adjust sizes on resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticles = 60;

    // Define colors based on the current era
    const getEraColors = () => {
      switch (era) {
        case 0: // Slave Society (Bronze, Brown, Beige)
          return ['rgba(139, 69, 19, 0.4)', 'rgba(210, 180, 140, 0.4)', 'rgba(205, 127, 50, 0.4)'];
        case 1: // Feudalism (Deep Red, Gold)
          return ['rgba(128, 0, 0, 0.5)', 'rgba(255, 215, 0, 0.4)', 'rgba(194, 24, 7, 0.3)'];
        case 2: // Capitalism (Grey, Steel Blue, Industrial Red)
          return ['rgba(112, 128, 144, 0.4)', 'rgba(194, 24, 7, 0.4)', 'rgba(30, 41, 59, 0.6)'];
        case 3: // Socialism/Future (Vibrant Red, Glowing Yellow, Cyber Gold)
          return ['rgba(239, 68, 68, 0.5)', 'rgba(251, 191, 36, 0.5)', 'rgba(254, 240, 138, 0.4)'];
        default:
          return ['rgba(194, 24, 7, 0.3)', 'rgba(255, 215, 0, 0.2)'];
      }
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 4 + 1;
        this.speedY = -(Math.random() * 1.5 + 0.5);
        this.speedX = Math.random() * 1 - 0.5;
        const colors = getEraColors();
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.3;
        this.isGear = Math.random() < 0.15; // 15% particles are gears
        this.gearRotation = Math.random() * Math.PI;
        this.gearSpeed = (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.isGear) {
          this.gearRotation += this.gearSpeed;
        }

        // Wrap around edge
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;

        // Reset if goes off top
        if (this.y < -20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;

        if (this.isGear && (era === 2 || era === 3)) {
          // Draw a small outline gear
          ctx.translate(this.x, this.y);
          ctx.rotate(this.gearRotation);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 2.5, 0, Math.PI * 2);
          ctx.stroke();

          // Draw teeth
          const teeth = 6;
          for (let i = 0; i < teeth; i++) {
            ctx.rotate(Math.PI / (teeth / 2));
            ctx.fillRect(this.size * 2.2, -1.5, this.size, 3);
          }
        } else {
          // Regular circular dust/ember
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      const p = new Particle();
      // Scatter initial positions vertically
      p.y = Math.random() * height;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render background vignette
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, 'rgba(15, 15, 18, 0.2)');
      gradient.addColorStop(1, 'rgba(5, 5, 6, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [era]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
