import React from 'react';
import { ArrowRight, ShieldCheck, Camera, Sparkles, TrendingUp, Cpu, MapPin, WifiOff, Users, Play } from 'lucide-react';
import { InteractiveRecyclingCanvas } from './InteractiveRecyclingCanvas';
import { PRICE_RECORDS, SAFETY_GUIDES } from '../../data/mockData';
import { sounds } from '../../utils/audio';

interface BrutalistLandingPageProps {
  onLaunchCollector: () => void;
  onLaunchRecycler: () => void;
  onLaunchJudge: () => void;
  onLaunchAdmin: () => void;
  onLaunchAuditor?: () => void;
}

export const BrutalistLandingPage: React.FC<BrutalistLandingPageProps> = ({
  onLaunchCollector,
  onLaunchRecycler,
  onLaunchJudge,
  onLaunchAdmin,
  onLaunchAuditor
}) => {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#121316] selection:bg-[#CCFF00] selection:text-black">
      {/* Top Banner */}
      <div className="bg-[#121316] text-[#CCFF00] font-mono-industrial text-xs py-2 px-4 border-b-2 border-black flex flex-wrap items-center justify-between">
        <span>SMART INDIA HACKATHON 2026 // SIH26299 PROTOTYPE</span>
        <div className="flex items-center gap-3">
          <button
            onClick={onLaunchJudge}
            className="text-white hover:text-[#CCFF00] font-bold underline flex items-center gap-1"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>OPEN 2-MIN JUDGE MODE</span>
          </button>
          <span>·</span>
          <span>CPCB E-WASTE RULES 2022 COMPLIANT</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b-4 border-black bg-[#F4F1EA] pt-12 pb-20 px-4 sm:px-6">
        <InteractiveRecyclingCanvas />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="inline-block bg-[#121316] text-[#CCFF00] px-3 py-1 font-mono-industrial text-xs font-black border-2 border-black uppercase mb-4 shadow-[3px_3px_0px_#CCFF00]">
            DIGITAL PUBLIC INFRASTRUCTURE
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#121316] uppercase leading-[0.95] mb-6">
            KABADI LINK
          </h1>

          <p className="text-xl sm:text-2xl font-bold font-display text-neutral-800 max-w-3xl mb-4 leading-tight">
            "Kabadi se Recycler tak — Seedha. Sahi. Traceable."
          </p>

          <p className="text-base sm:text-lg font-mono-industrial text-neutral-700 max-w-2xl mb-8 font-medium">
            A vernacular, low-literacy, offline-tolerant digital bridge connecting informal e-waste collectors with authorized recycling centers across India.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sounds.playClick();
                onLaunchCollector();
              }}
              className="px-6 py-4 bg-[#CCFF00] hover:bg-[#b8e600] text-black border-3 border-black font-mono-industrial text-base font-black shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex items-center gap-2"
            >
              <span>LAUNCH COLLECTOR APP</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onLaunchJudge();
              }}
              className="px-6 py-4 bg-[#121316] hover:bg-neutral-800 text-white border-3 border-black font-mono-industrial text-base font-black shadow-[5px_5px_0px_#CCFF00] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current text-[#CCFF00]" />
              <span>JUDGE PRESENTATION MODE</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onLaunchRecycler();
              }}
              className="px-5 py-4 bg-white hover:bg-neutral-100 text-black border-3 border-black font-mono-industrial text-sm font-black shadow-[4px_4px_0px_#000]"
            >
              RECYCLER PORTAL
            </button>

            {onLaunchAuditor && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onLaunchAuditor();
                }}
                className="px-5 py-4 bg-[#FF5500] hover:bg-[#e04b00] text-white border-3 border-black font-mono-industrial text-sm font-black shadow-[4px_4px_0px_#000]"
              >
                FIELD AUDITOR
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 01 THE GAP */}
      <section className="py-16 px-4 sm:px-6 border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono-industrial font-black text-neutral-500 mb-2">
            <span>01</span>
            <span>·</span>
            <span>THE REALITY GAP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase mb-6">
            INFORMAL COLLECTION EXISTS. FORMAL RECYCLING ACCESS DOES NOT.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-3 border-black bg-[#FFF5F5]">
              <span className="text-xs font-mono-industrial font-black text-red-800 uppercase block mb-1">
                TODAY (INFORMAL EXTRACTION)
              </span>
              <ul className="text-sm font-mono-industrial space-y-2 text-neutral-800 font-bold">
                <li>• 95% of India's e-waste handled by informal kabadi pickers.</li>
                <li>• Primitive acid bathing and open cable burning cause toxic lung/kidney collapse.</li>
                <li>• Uncalibrated scales & exploitative middlemen cut earnings by 20–35%.</li>
              </ul>
            </div>

            <div className="p-6 border-3 border-black bg-[#F4F1EA]">
              <span className="text-xs font-mono-industrial font-black text-emerald-800 uppercase block mb-1">
                WITH KABADI LINK
              </span>
              <ul className="text-sm font-mono-industrial space-y-2 text-neutral-800 font-bold">
                <li>• Direct digital link to CPCB authorized facilities without middlemen.</li>
                <li>• Calibrated weighment, transparent live mandi rate, instant cash/UPI.</li>
                <li>• 100% legal chain of custody and scientific hydrometallurgical recovery.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02 OUR BRIDGE */}
      <section className="py-16 px-4 sm:px-6 border-b-4 border-black bg-[#121316] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono-industrial font-black text-[#CCFF00] mb-2">
            <span>02</span>
            <span>·</span>
            <span>CORE ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase mb-8 text-white">
            THE 7-STEP DIGITAL BRIDGE
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              { num: '01', title: 'PHOTO LO', desc: 'AI Camera scan' },
              { num: '02', title: 'IDENTIFY', desc: 'PCB/Cable/Battery' },
              { num: '03', title: 'FAIR PRICE', desc: 'Mandi benchmark' },
              { num: '04', title: 'MATCH', desc: 'Authorized center' },
              { num: '05', title: 'HANDOVER', desc: 'Digital QR slip' },
              { num: '06', title: 'GET PAID', desc: 'Instant cash / UPI' },
              { num: '07', title: 'TRACE', desc: 'CPCB chain proof' }
            ].map((step, i) => (
              <div key={i} className="p-3 border-2 border-neutral-700 bg-neutral-900 font-mono-industrial">
                <div className="text-[#CCFF00] font-black text-base">{step.num}</div>
                <div className="text-white font-black text-xs uppercase mt-1">{step.title}</div>
                <div className="text-[10px] text-neutral-400 mt-1">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 PRICE TRANSPARENCY */}
      <section className="py-16 px-4 sm:px-6 border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono-industrial font-black text-neutral-500 mb-2">
            <span>03</span>
            <span>·</span>
            <span>PRICE TRANSPARENCY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase mb-6">
            REAL-TIME COMMODITY BENCHMARKS
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PRICE_RECORDS.slice(0, 4).map((p) => (
              <div key={p.id} className="p-4 border-3 border-black bg-[#F4F1EA] shadow-[4px_4px_0px_#000]">
                <span className="text-xs font-mono-industrial font-black text-neutral-600 block">{p.material}</span>
                <div className="text-3xl font-black font-display text-black mt-1">₹{p.currentAvgPrice}/KG</div>
                <div className="text-[11px] font-mono-industrial font-bold text-emerald-700 mt-1">
                  +{p.trendPct7d}% (7D Index)
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 OFFLINE FIRST */}
      <section className="py-16 px-4 sm:px-6 border-b-4 border-black bg-[#121316] text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-industrial font-black text-[#CCFF00] mb-2">
              <span>08</span>
              <span>·</span>
              <span>RESILIENT ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase text-white">
              NO SIGNAL ≠ NO SERVICE
            </h2>
            <p className="text-sm font-mono-industrial text-neutral-300 mt-2 max-w-xl">
              Informal scrap markets frequently experience severe network blackouts. Kabadi Link operates offline: photos are cached, weights recorded, transactions drafted, and automatically synchronized when connection restores.
            </p>
          </div>

          <button
            onClick={onLaunchCollector}
            className="px-6 py-4 bg-[#CCFF00] text-black border-2 border-black font-mono-industrial text-sm font-black shadow-[4px_4px_0px_#CCFF00] self-start md:self-auto"
          >
            TEST OFFLINE MODE IN APP →
          </button>
        </div>
      </section>

      {/* 09 IMPACT */}
      <section className="py-16 px-4 sm:px-6 border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono-industrial font-black text-neutral-500 mb-2">
            <span>09</span>
            <span>·</span>
            <span>SYSTEM IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase mb-6">
            MEASURABLE FIELD CONVERSION
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 border-3 border-black bg-[#CCFF00] shadow-[4px_4px_0px_#000]">
              <div className="text-3xl sm:text-4xl font-black font-display text-black">1,420+</div>
              <span className="text-xs font-mono-industrial font-black text-neutral-900 block mt-1">
                COLLECTORS ONBOARDED
              </span>
            </div>

            <div className="p-4 border-3 border-black bg-white shadow-[4px_4px_0px_#000]">
              <div className="text-3xl sm:text-4xl font-black font-display text-black">18,940</div>
              <span className="text-xs font-mono-industrial font-bold text-neutral-600 block mt-1">
                E-WASTE LOTS TRACED
              </span>
            </div>

            <div className="p-4 border-3 border-black bg-white shadow-[4px_4px_0px_#000]">
              <div className="text-3xl sm:text-4xl font-black font-display text-black">42</div>
              <span className="text-xs font-mono-industrial font-bold text-neutral-600 block mt-1">
                CPCB RECYCLERS CONNECTED
              </span>
            </div>

            <div className="p-4 border-3 border-black bg-white shadow-[4px_4px_0px_#000]">
              <div className="text-3xl sm:text-4xl font-black font-display text-emerald-800">284 TONS</div>
              <span className="text-xs font-mono-industrial font-bold text-neutral-600 block mt-1">
                DIVERTED FROM ACID BURNING
              </span>
            </div>
          </div>

          <div className="mt-8 text-center text-xs font-mono-industrial text-neutral-500">
            *Synthetic demo figures generated for Smart India Hackathon jury review.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#121316] text-white border-t-4 border-black text-center font-mono-industrial text-xs">
        <p className="font-bold text-[#CCFF00]">
          KABADI LINK // "Kabadi se Recycler tak — Seedha. Sahi. Traceable."
        </p>
        <p className="text-neutral-500 mt-1">
          Built for Smart India Hackathon 2026. Designed with brutalist utility principles for vernacular low-literacy field conditions.
        </p>
      </footer>
    </div>
  );
};
