import React from 'react';
import { MaterialCategory } from '../../types';

interface MaterialSvgGraphicProps {
  material: MaterialCategory | 'facility' | 'scale';
  className?: string;
  interactive?: boolean;
}

export const MaterialSvgGraphic: React.FC<MaterialSvgGraphicProps> = ({
  material,
  className = 'w-full h-44',
  interactive = false
}) => {
  if (material === 'PCB') {
    return (
      <div className={`relative overflow-hidden bg-[#0A3D24] border-2 border-[#121316] flex items-center justify-center ${className}`}>
        {/* Circuit board copper trace grid */}
        <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
          <pattern id="pcbGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#125732" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pcbGrid)" />

          {/* Copper Bus Lines */}
          <path d="M 30 40 L 120 40 L 150 70 L 260 70 L 280 90 L 370 90" fill="none" stroke="#E6A817" strokeWidth="3" />
          <path d="M 30 70 L 100 70 L 130 100 L 210 100 L 230 120 L 370 120" fill="none" stroke="#D49010" strokeWidth="2" />
          <path d="M 30 180 L 140 180 L 170 150 L 290 150 L 310 130 L 370 130" fill="none" stroke="#E6A817" strokeWidth="3" />
          <path d="M 80 220 L 180 220 L 210 190 L 340 190" fill="none" stroke="#D49010" strokeWidth="2.5" />

          {/* Integrated Circuit Chips */}
          <rect x="140" y="80" width="100" height="70" fill="#1A1C20" stroke="#333842" strokeWidth="3" rx="2" />
          {/* Chip Pins */}
          {[-25, -15, -5, 5, 15, 25].map((offset, i) => (
            <React.Fragment key={i}>
              <line x1={190 + offset} y1="72" x2={190 + offset} y2="80" stroke="#E6A817" strokeWidth="2" />
              <line x1={190 + offset} y1="150" x2={190 + offset} y2="158" stroke="#E6A817" strokeWidth="2" />
            </React.Fragment>
          ))}
          <text x="190" y="120" fill="#CCFF00" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            INTEL 8086 / KL-E9
          </text>

          {/* Secondary Chip */}
          <rect x="60" y="110" width="50" height="50" fill="#121316" stroke="#555" strokeWidth="2" />
          <text x="85" y="138" fill="#AAA" fontSize="9" fontFamily="monospace" textAnchor="middle">SRAM</text>

          {/* Golden edge connector fingers */}
          {Array.from({ length: 18 }).map((_, i) => (
            <rect key={i} x={30 + i * 19} y="235" width="12" height="15" fill="#FFC72C" stroke="#B28205" strokeWidth="1" />
          ))}

          {/* Capacitors */}
          <circle cx="280" cy="50" r="10" fill="#2B323D" stroke="#777" strokeWidth="2" />
          <circle cx="310" cy="55" r="8" fill="#2B323D" stroke="#777" strokeWidth="2" />
          <circle cx="90" cy="45" r="7" fill="#2B323D" stroke="#777" strokeWidth="1.5" />
        </svg>
        <div className="absolute top-2 right-2 bg-[#121316] text-[#CCFF00] font-mono-industrial text-[10px] px-2 py-0.5 border border-[#CCFF00] font-bold">
          HIGH-GRADE PCB #91%
        </div>
        {interactive && (
          <div className="absolute inset-0 border-2 border-dashed border-[#CCFF00] pointer-events-none" />
        )}
      </div>
    );
  }

  if (material === 'CABLE') {
    return (
      <div className={`relative overflow-hidden bg-[#1A1A1E] border-2 border-[#121316] flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
          {/* Thick industrial copper bundles */}
          <path d="M 0 160 C 100 160, 160 80, 260 90 C 320 95, 360 140, 400 130" fill="none" stroke="#D35400" strokeWidth="24" strokeLinecap="round" />
          <path d="M 0 140 C 90 120, 170 190, 270 160 C 330 140, 370 70, 400 80" fill="none" stroke="#E67E22" strokeWidth="20" strokeLinecap="round" />
          <path d="M 0 90 C 120 70, 180 140, 290 120 C 350 110, 370 180, 400 190" fill="none" stroke="#B85D19" strokeWidth="18" strokeLinecap="round" />
          
          {/* Stripped Copper wire strands at tip */}
          <g transform="translate(280, 75)">
            <line x1="0" y1="0" x2="60" y2="-20" stroke="#FF9933" strokeWidth="5" />
            <line x1="0" y1="5" x2="65" y2="-10" stroke="#FFB366" strokeWidth="4" />
            <line x1="0" y1="10" x2="70" y2="5" stroke="#FF9933" strokeWidth="4" />
            <line x1="0" y1="15" x2="60" y2="20" stroke="#FF8000" strokeWidth="5" />
          </g>

          {/* Insulated PVC Jacket markings */}
          <rect x="180" y="80" width="30" height="40" fill="#121316" stroke="#FFCC00" strokeWidth="2" transform="rotate(-15 180 80)" />
          <text x="185" y="105" fill="#FFF" fontSize="8" fontFamily="monospace" transform="rotate(-15 180 80)">10AWG</text>
        </svg>
        <div className="absolute top-2 right-2 bg-[#FF5500] text-white font-mono-industrial text-[10px] px-2 py-0.5 border border-[#121316] font-bold">
          HEAVY COPPER HARNESS
        </div>
      </div>
    );
  }

  if (material === 'BATTERY') {
    return (
      <div className={`relative overflow-hidden bg-[#242830] border-2 border-[#121316] flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
          {/* Sealed Battery Pack Body */}
          <rect x="70" y="45" width="260" height="160" fill="#15171C" stroke="#4B5563" strokeWidth="5" rx="6" />
          <rect x="80" y="55" width="240" height="140" fill="#1E232B" />

          {/* Positive and Negative Terminal Posts */}
          <rect x="100" y="25" width="30" height="22" fill="#EE1111" stroke="#121316" strokeWidth="3" rx="2" />
          <text x="115" y="40" fill="#FFF" fontSize="18" fontWeight="bold" textAnchor="middle">+</text>

          <rect x="270" y="25" width="30" height="22" fill="#121316" stroke="#6B7280" strokeWidth="3" rx="2" />
          <text x="285" y="40" fill="#FFF" fontSize="22" fontWeight="bold" textAnchor="middle">-</text>

          {/* Industrial Warning Label */}
          <rect x="120" y="80" width="160" height="90" fill="#FF5500" stroke="#121316" strokeWidth="3" />
          <text x="200" y="115" fill="#121316" fontSize="16" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            LITHIUM-ION
          </text>
          <text x="200" y="135" fill="#FFF" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            DO NOT PUNCTURE 48V
          </text>
          <text x="200" y="155" fill="#121316" fontSize="10" fontFamily="monospace" textAnchor="middle">
            AUTHORIZED DISPOSAL ONLY
          </text>
        </svg>
        <div className="absolute top-2 right-2 bg-[#EE1111] text-white font-mono-industrial text-[10px] px-2 py-0.5 border border-white font-bold">
          HAZARD CLASS 9
        </div>
      </div>
    );
  }

  if (material === 'CRT') {
    return (
      <div className={`relative overflow-hidden bg-[#1E2024] border-2 border-[#121316] flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
          {/* CRT Glass Bell Funnel */}
          <path d="M 60 50 L 340 50 L 260 190 L 140 190 Z" fill="#2E3440" stroke="#4C566A" strokeWidth="5" />
          {/* Screen Face */}
          <ellipse cx="200" cy="50" rx="140" ry="25" fill="#3B4252" stroke="#ECEFF4" strokeWidth="3" />
          {/* Electron Gun Neck */}
          <rect x="180" y="190" width="40" height="45" fill="#D08770" stroke="#BF616A" strokeWidth="3" />
          <text x="200" y="125" fill="#EBCB8B" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            LEADED GLASS CRT
          </text>
          <text x="200" y="145" fill="#FFF" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
            DO NOT BREAK VACUUM
          </text>
        </svg>
        <div className="absolute top-2 right-2 bg-[#121316] text-[#FF5500] font-mono-industrial text-[10px] px-2 py-0.5 border border-[#FF5500] font-bold">
          LEAD-SHIELDED CRT
        </div>
      </div>
    );
  }

  // Fallback for MOTOR / MAGNET / FACILITY / OTHER
  return (
    <div className={`relative overflow-hidden bg-[#15171C] border-2 border-[#121316] flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 250" className="w-full h-full object-cover opacity-90">
        <circle cx="200" cy="125" r="75" fill="#2A2E38" stroke="#CCFF00" strokeWidth="4" strokeDasharray="6 4" />
        <circle cx="200" cy="125" r="45" fill="#121316" stroke="#E67E22" strokeWidth="6" />
        <circle cx="200" cy="125" r="18" fill="#CCFF00" />
        {/* Radiating teeth / winding slots */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="125"
            x2={200 + 70 * Math.cos((i * 30 * Math.PI) / 180)}
            y2={125 + 70 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke="#D35400"
            strokeWidth="3"
          />
        ))}
        <text x="200" y="225" fill="#CCFF00" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          {material} RECOVERY LOT
        </text>
      </svg>
      <div className="absolute top-2 right-2 bg-[#121316] text-[#CCFF00] font-mono-industrial text-[10px] px-2 py-0.5 border border-[#CCFF00] font-bold">
        {material} LOT
      </div>
    </div>
  );
};
