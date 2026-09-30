import React from 'react';
import { Camera, MapPin, TrendingUp, Package, IndianRupee, ShieldAlert } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { sounds } from '../../utils/audio';

interface CollectorActionGridProps {
  language: Language;
  onOpenPhotoScan: () => void;
  onOpenRecyclerSearch: () => void;
  onOpenPriceBoard: () => void;
  onOpenMyLots: () => void;
  onOpenEarnings: () => void;
  onOpenSafety: () => void;
}

export const CollectorActionGrid: React.FC<CollectorActionGridProps> = ({
  language,
  onOpenPhotoScan,
  onOpenRecyclerSearch,
  onOpenPriceBoard,
  onOpenMyLots,
  onOpenEarnings,
  onOpenSafety
}) => {
  const t = TRANSLATIONS[language];

  const actions = [
    {
      id: 'photo',
      number: '01',
      title: t.photoLo,
      subtitle: t.photoLoSub,
      icon: <Camera className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />,
      bg: 'bg-[#CCFF00] hover:bg-[#bbf000] text-[#121316]',
      border: 'border-3 border-[#121316]',
      shadow: 'shadow-[6px_6px_0px_#121316]',
      badge: 'AI SCAN',
      badgeBg: 'bg-[#121316] text-[#CCFF00]',
      onClick: onOpenPhotoScan
    },
    {
      id: 'recycler',
      number: '02',
      title: t.recyclerDhundo,
      subtitle: t.recyclerDhundoSub,
      icon: <MapPin className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />,
      bg: 'bg-[#FFFFFF] hover:bg-neutral-100 text-[#121316]',
      border: 'border-3 border-[#121316]',
      shadow: 'shadow-[6px_6px_0px_#121316]',
      badge: 'VERIFIED',
      badgeBg: 'bg-emerald-600 text-white',
      onClick: onOpenRecyclerSearch
    },
    {
      id: 'price',
      number: '03',
      title: t.meraBhav,
      subtitle: t.meraBhavSub,
      icon: <TrendingUp className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />,
      bg: 'bg-[#FFFFFF] hover:bg-neutral-100 text-[#121316]',
      border: 'border-3 border-[#121316]',
      shadow: 'shadow-[6px_6px_0px_#121316]',
      badge: 'DAILY INDEX',
      badgeBg: 'bg-[#0044FF] text-white',
      onClick: onOpenPriceBoard
    },
    {
      id: 'lots',
      number: '04',
      title: t.meraMaal,
      subtitle: t.meraMaalSub,
      icon: <Package className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />,
      bg: 'bg-[#FFFFFF] hover:bg-neutral-100 text-[#121316]',
      border: 'border-3 border-[#121316]',
      shadow: 'shadow-[6px_6px_0px_#121316]',
      badge: 'SAVED LOTS',
      badgeBg: 'bg-neutral-800 text-white',
      onClick: onOpenMyLots
    },
    {
      id: 'earnings',
      number: '05',
      title: t.meriKamai,
      subtitle: t.meriKamaiSub,
      icon: <IndianRupee className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />,
      bg: 'bg-[#CCFF00] hover:bg-[#bbf000] text-[#121316]',
      border: 'border-3 border-[#121316]',
      shadow: 'shadow-[6px_6px_0px_#121316]',
      badge: 'CASH & UPI',
      badgeBg: 'bg-[#121316] text-[#CCFF00]',
      onClick: onOpenEarnings
    },
    {
      id: 'safety',
      number: '06',
      title: t.safety,
      subtitle: t.safetySub,
      icon: <ShieldAlert className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />,
      bg: 'bg-[#FF5500] hover:bg-[#e64c00] text-white',
      border: 'border-3 border-[#121316]',
      shadow: 'shadow-[6px_6px_0px_#121316]',
      badge: 'CRITICAL RULES',
      badgeBg: 'bg-[#121316] text-[#FF5500]',
      onClick: onOpenSafety
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
      {actions.map((act) => (
        <button
          key={act.id}
          onClick={() => {
            sounds.playClick();
            act.onClick();
          }}
          className={`
            relative p-5 sm:p-6 text-left transition-all duration-150 select-none
            ${act.bg} ${act.border} ${act.shadow}
            active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
            hover:-translate-x-[2px] hover:-translate-y-[2px]
            cursor-pointer group flex flex-col justify-between min-h-[140px] sm:min-h-[160px]
          `}
        >
          {/* Top meta row with number & badge */}
          <div className="flex items-center justify-between w-full mb-3">
            <span className="font-mono-industrial font-black text-xl sm:text-2xl opacity-80">
              {act.number}
            </span>
            <span className={`text-[10px] font-mono-industrial font-black px-2 py-0.5 border border-black uppercase ${act.badgeBg}`}>
              {act.badge}
            </span>
          </div>

          {/* Center icon & labels */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 border-2 border-[#121316] shrink-0 group-hover:scale-105 transition-transform">
              {act.icon}
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-display tracking-tight uppercase leading-none">
                {act.title}
              </div>
              <div className="text-xs font-mono-industrial font-bold opacity-80 mt-1">
                {act.subtitle}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
