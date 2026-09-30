import React, { useState } from 'react';
import { Play, Check, ChevronRight, ChevronLeft, ArrowRight, ShieldCheck, Camera, IndianRupee, RefreshCw } from 'lucide-react';
import { MaterialSvgGraphic } from '../brutalist/MaterialSvgGraphic';
import { sounds } from '../../utils/audio';

interface JudgePresentationModeProps {
  onLaunchCollectorApp: () => void;
  onExit: () => void;
}

export const JudgePresentationMode: React.FC<JudgePresentationModeProps> = ({
  onLaunchCollectorApp,
  onExit
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: '01. THE PROBLEM',
      subtitle: '95% OF INDIA’S E-WASTE HANDLED INFORMALLY',
      headline: 'Informal collection exists. Formal recycling access does not.',
      points: [
        'Waste pickers lack direct access to CPCB authorized smelters.',
        'Exploitative local scrap yards deduct 20–35% with uncalibrated scales.',
        'Desperation leads to open-pit burning of cables and toxic acid PCB leaching.'
      ],
      tag: 'GROUND REALITY',
      color: 'bg-red-50 border-red-700 text-red-950',
      badgeColor: 'bg-[#EE1111] text-white',
      graphic: 'cable'
    },
    {
      title: '02. THE COLLECTOR',
      subtitle: 'VERNACULAR & LOW-LITERACY FIRST',
      headline: 'Low literacy, offline tolerant, voice enabled.',
      points: [
        'Zero English or complex menus required: Marathi, Hindi, and English support.',
        '6 giant brutalist tactile touch targets with audio speech ("BHAV SUNAO").',
        'Works reliably on ₹6,000 low-end Android smartphones without network dependencies.'
      ],
      tag: 'HUMAN-CENTERED',
      color: 'bg-[#FFF9F2] border-amber-700 text-amber-950',
      badgeColor: 'bg-[#FF5500] text-white',
      graphic: 'scale'
    },
    {
      title: '03. AI IDENTIFICATION',
      subtitle: 'COMPUTER VISION CLASSIFICATION',
      headline: 'Photo → Material Grade → Confidence Matrix.',
      points: [
        'Trained on electronic component visual points: microchips, solder, copper traces.',
        'Identifies PCB, Cables, SLA Batteries, CRT glass, LCD panels in 1.8 seconds.',
        'Collector is never locked in: instant manual override always permitted.'
      ],
      tag: 'EDGE AI',
      color: 'bg-[#F4F1EA] border-black text-black',
      badgeColor: 'bg-[#121316] text-[#CCFF00]',
      graphic: 'pcb'
    },
    {
      title: '04. PRICE TRANSPARENCY',
      subtitle: 'LOCAL MANDI BENCHMARK',
      headline: 'Explainable Fair Value Engine: ₹3,792 for 18.5 KG PCB.',
      points: [
        'Replaces arbitrary scrap dealer quotes with live mandi market spectrum.',
        'Shows Low / Fair / High rates with transparent 7-day commodity trends.',
        'Collector gains +23% higher income on formal authorized sale.'
      ],
      tag: 'ECONOMIC INCENTIVE',
      color: 'bg-[#F4F1EA] border-black text-black',
      badgeColor: 'bg-[#0044FF] text-white',
      graphic: 'pcb'
    },
    {
      title: '05. RECYCLER MATCH',
      subtitle: 'INTELLIGENT ROUTING & VERIFICATION',
      headline: 'Recommendation Score (94%) based on distance & authorized status.',
      points: [
        'Only genuine CPCB/SPCB authorized facilities receive verified badge.',
        'Compares multiple buyer rates, distance, and mobile van pickup availability.',
        'Eliminates predatory middleman commissions.'
      ],
      tag: 'MARKETPLACE',
      color: 'bg-[#F4F1EA] border-black text-black',
      badgeColor: 'bg-emerald-700 text-white',
      graphic: 'facility'
    },
    {
      title: '06. TRACEABLE HANDOVER',
      subtitle: 'PERMANENT DIGITAL LOT PASSPORT',
      headline: 'Digital Handover + QR Provenance + Instant Payment.',
      points: [
        'GPS, time, calibrated weighment, and photographic proof sealed on lot.',
        'Collector receives instant Cash or UPI without compliance paperwork burdens.',
        'Generates auditable EPR compliance certificate for government monitoring.'
      ],
      tag: 'CPCB COMPLIANCE',
      color: 'bg-emerald-50 border-emerald-800 text-emerald-950',
      badgeColor: 'bg-[#CCFF00] text-black',
      graphic: 'pcb'
    }
  ];

  const current = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#121316] text-white p-4 sm:p-8 flex flex-col justify-between">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b-2 border-neutral-700 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-[#CCFF00] text-black font-mono-industrial font-black text-xs px-2.5 py-1 uppercase">
            SIH26299 JURY PRESENTATION
          </span>
          <span className="text-xs font-mono-industrial text-neutral-400">
            Slide {currentSlide + 1} of {slides.length} (Under 2 Minutes)
          </span>
        </div>

        <button
          onClick={onExit}
          className="text-xs font-mono-industrial font-bold text-neutral-400 hover:text-white underline"
        >
          EXIT PRESENTATION [ESC]
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="max-w-5xl mx-auto w-full my-auto">
        <div className={`p-6 sm:p-10 border-4 border-black ${current.color} shadow-[10px_10px_0px_#000]`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className={`text-xs font-mono-industrial font-black px-2 py-0.5 border border-black uppercase ${current.badgeColor}`}>
              {current.tag}
            </span>
            <span className="text-xs font-mono-industrial font-bold opacity-75">
              {current.title}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight mb-2">
            {current.headline}
          </h2>
          <div className="text-xs font-mono-industrial font-bold uppercase tracking-wider opacity-80 mb-6">
            {current.subtitle}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left 2 Cols: Bullet Points */}
            <div className="md:col-span-2 space-y-3 font-mono-industrial text-sm font-bold">
              {current.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-white/70 p-3 border-2 border-black">
                  <Check className="w-5 h-5 text-black shrink-0 mt-0.5 stroke-[3]" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Right: Graphic */}
            <div className="border-3 border-black bg-black p-2">
              <MaterialSvgGraphic
                material={current.graphic === 'pcb' ? 'PCB' : current.graphic === 'cable' ? 'CABLE' : 'BATTERY'}
                className="w-full h-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Footer */}
      <div className="max-w-5xl mx-auto w-full mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              setCurrentSlide((prev) => Math.max(0, prev - 1));
            }}
            disabled={currentSlide === 0}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-mono-industrial text-xs font-bold border border-neutral-600 disabled:opacity-30"
          >
            ← PREVIOUS
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
            }}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 bg-white text-black font-mono-industrial text-xs font-bold border border-black disabled:opacity-30"
          >
            NEXT →
          </button>
        </div>

        {/* Launch live working app */}
        <button
          onClick={() => {
            sounds.playSuccess();
            onLaunchCollectorApp();
          }}
          className="px-6 py-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-mono-industrial text-xs font-black border-2 border-black shadow-[3px_3px_0px_#CCFF00] flex items-center justify-center gap-2"
        >
          <span>TRY INTERACTIVE COLLECTOR APP (LIVE)</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
