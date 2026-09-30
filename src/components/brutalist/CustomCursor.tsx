import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Determine contextual cursor label based on hovered element
      const target = e.target as HTMLElement | null;
      if (!target) {
        setLabel(null);
        return;
      }

      if (target.closest('[data-cursor="explore"]')) {
        setLabel('EXPLORE');
      } else if (target.closest('[data-cursor="open-lot"]')) {
        setLabel('OPEN LOT');
      } else if (target.closest('[data-cursor="inspect"]')) {
        setLabel('INSPECT');
      } else if (target.closest('button, a, [role="button"]')) {
        setLabel('VIEW');
      } else {
        setLabel(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;
    const updateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.25,
        y: prev.y + (pos.y - prev.y) * 0.25
      }));
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Small center dot */}
      <div
        className="fixed w-2 h-2 bg-[#CCFF00] border border-[#121316] rounded-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {/* Delayed outer ring */}
      <div
        className={`fixed border-2 border-[#121316] flex items-center justify-center transition-all duration-75 ease-out -translate-x-1/2 -translate-y-1/2 ${
          label
            ? 'w-24 h-8 bg-[#121316] text-[#CCFF00] font-mono-industrial text-[10px] font-black uppercase tracking-wider px-2 shadow-[2px_2px_0px_#CCFF00]'
            : 'w-7 h-7 bg-transparent rounded-full'
        }`}
        style={{ left: `${trail.x}px`, top: `${trail.y}px` }}
      >
        {label && <span>{label}</span>}
      </div>
    </div>
  );
};
