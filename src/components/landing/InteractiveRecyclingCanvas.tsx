import React, { useEffect, useRef } from 'react';

interface InteractiveRecyclingCanvasProps {
  performanceMode?: 'FULL' | 'BALANCED' | 'LITE';
}

export const InteractiveRecyclingCanvas: React.FC<InteractiveRecyclingCanvasProps> = ({
  performanceMode = 'FULL'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (performanceMode === 'LITE') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes representing e-waste components transitioning to clean sorted metals
    const count = performanceMode === 'BALANCED' ? 35 : 65;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      size: Math.random() * 3 + 2,
      color: Math.random() > 0.6 ? '#CCFF00' : Math.random() > 0.3 ? '#0044FF' : '#FF5500',
      type: Math.random() > 0.5 ? 'square' : 'circle'
    }));

    let mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles with brutalist industrial lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(18, 19, 22, ${0.25 * (1 - dist / 90)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        // Subtle attraction to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) {
          p.x += (dx / d) * 0.4;
          p.y += (dy / d) * 0.4;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.strokeStyle = '#121316';
        ctx.lineWidth = 1.5;

        if (p.type === 'square') {
          ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
          ctx.strokeRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [performanceMode]);

  if (performanceMode === 'LITE') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-industrial-grid opacity-30 pointer-events-none" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair opacity-80"
    />
  );
};
