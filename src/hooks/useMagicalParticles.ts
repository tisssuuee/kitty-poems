import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'sparkle' | 'dust' | 'star' | 'heart';
}

export const useMagicalParticles = (isActive: boolean, theme: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  const createParticle = useCallback((x: number, y: number, type: Particle['type'] = 'sparkle'): Particle => {
    const colors = theme?.gradient || ['#ff6ec7', '#00d4ff', '#ffff00'];
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 - 1,
      life: 0,
      maxLife: 60 + Math.random() * 60,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      type
    };
  }, [theme]);

  const addBurstParticles = useCallback((x: number, y: number, count: number = 10) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(x, y, Math.random() > 0.7 ? 'heart' : 'sparkle'));
    }
  }, [createParticle]);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    const alpha = 1 - (particle.life / particle.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = particle.color;
    
    switch (particle.type) {
      case 'sparkle':
        // Draw a sparkle/star shape
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          const x = particle.x + Math.cos(angle) * particle.size;
          const y = particle.y + Math.sin(angle) * particle.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.fill();
        break;
      
      case 'heart':
        // Draw a simple heart shape
        ctx.font = `${particle.size * 2}px Arial`;
        ctx.fillText('💖', particle.x - particle.size, particle.y + particle.size);
        break;
      
      case 'dust':
      case 'star':
      default:
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
    ctx.restore();
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.1; // gravity
      particle.life++;

      if (particle.life < particle.maxLife) {
        drawParticle(ctx, particle);
        return true;
      }
      return false;
    });

    // Occasionally add ambient particles
    if (Math.random() < 0.1) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particlesRef.current.push(createParticle(x, y, 'dust'));
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isActive, drawParticle, createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (isActive) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, animate]);

  return {
    canvasRef,
    addBurstParticles
  };
};
