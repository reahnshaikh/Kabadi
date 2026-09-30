import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Truck, MapPin, Star, ArrowRight, ShieldCheck, Filter, Compass } from 'lucide-react';
import { Language, MaterialCategory, Recycler } from '../../types';
import { RECYCLERS } from '../../data/mockData';
import { sounds } from '../../utils/audio';

interface RecyclerMatchModalProps {
  material: MaterialCategory;
  weightKg: number;
  locationName: string;
  language: Language;
  onSelectRecycler: (recycler: Recycler) => void;
  onBack: () => void;
}

export const RecyclerMatchModal: React.FC<RecyclerMatchModalProps> = ({
  material,
  weightKg,
  locationName,
  language,
  onSelectRecycler,
  onBack
}) => {
  const [sortMode, setSortMode] = useState<'MATCH' | 'DISTANCE' | 'PRICE' | 'PICKUP'>('MATCH');
  const [selectedRecyclerId, setSelectedRecyclerId] = useState<string>('REC-GREENLOOP');
  const [viewTab, setViewTab] = useState<'CARDS' | 'MAP'>('CARDS');

  // Sort list
  const sortedRecyclers = [...RECYCLERS].sort((a, b) => {
    if (sortMode === 'DISTANCE') return a.distanceKm - b.distanceKm;
    if (sortMode === 'PRICE') {
      const priceA = a.offeredRatePerKg[material] || 0;
      const priceB = b.offeredRatePerKg[material] || 0;
      return priceB - priceA;
    }
    if (sortMode === 'PICKUP') {
      return (b.pickupAvailable ? 1 : 0) - (a.pickupAvailable ? 1 : 0);
    }
    return (b.matchScore || 0) - (a.matchScore || 0);
  });

  const selectedRecycler = sortedRecyclers.find((r) => r.id === selectedRecyclerId) || sortedRecyclers[0];

  return (
    <div className="bg-[#FFFFFF] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] p-4 sm:p-7 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-3 border-[#121316] pb-3 mb-5 gap-2">
        <div>
          <span className="text-[10px] font-mono-industrial font-black bg-[#CCFF00] text-black px-2 py-0.5 border border-black uppercase">
            STEP 04 — RECYCLER MATCHING ENGINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase mt-1">
            अधिकृत रिसायकलर चुनें
          </h2>
        </div>

        {/* View Switcher: Cards vs Brutalist Map */}
        <div className="flex items-center border-2 border-black bg-white p-0.5 shadow-[2px_2px_0px_#121316]">
          <button
            onClick={() => setViewTab('CARDS')}
            className={`px-3 py-1 font-mono-industrial text-xs font-bold ${
              viewTab === 'CARDS' ? 'bg-[#121316] text-[#CCFF00]' : 'text-neutral-700'
            }`}
          >
            OFFER CARDS
          </button>
          <button
            onClick={() => setViewTab('MAP')}
            className={`px-3 py-1 font-mono-industrial text-xs font-bold ${
              viewTab === 'MAP' ? 'bg-[#121316] text-[#CCFF00]' : 'text-neutral-700'
            }`}
          >
            RADIAL MAP
          </button>
        </div>
      </div>

      {/* Filter and Sort Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F4F1EA] p-2.5 border-2 border-[#121316] mb-5">
        <span className="text-xs font-mono-industrial font-black text-neutral-800 uppercase">
          SORT OFFERS BY:
        </span>
        <div className="flex flex-wrap gap-1">
          {[
            { id: 'MATCH', label: 'BEST MATCH' },
            { id: 'PRICE', label: 'HIGHEST RATE' },
            { id: 'DISTANCE', label: 'NEAREST' },
            { id: 'PICKUP', label: 'PICKUP READY' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sounds.playClick();
                setSortMode(item.id as unknown as typeof sortMode);
              }}
              className={`px-2.5 py-1 text-xs font-mono-industrial font-bold border-2 border-[#121316] transition-colors ${
                sortMode === item.id
                  ? 'bg-[#121316] text-[#CCFF00]'
                  : 'bg-white text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAP VIEW */}
      {viewTab === 'MAP' && (
        <div className="mb-6 bg-[#121316] border-3 border-black p-4 text-white">
          <div className="flex items-center justify-between mb-3 text-xs font-mono-industrial text-[#CCFF00]">
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              RADIAL RECYCLER NETWORK — 15KM RADIUS
            </span>
            <span>BASE: {locationName}</span>
          </div>

          {/* Interactive Dark Map Canvas Simulator */}
          <div className="relative w-full h-64 bg-[#181B22] border-2 border-neutral-700 overflow-hidden flex items-center justify-center">
            {/* Concentric distance rings */}
            <div className="absolute w-48 h-48 border border-neutral-700/60 rounded-full" />
            <div className="absolute w-96 h-96 border border-neutral-700/40 rounded-full" />
            <div className="absolute w-[480px] h-[480px] border border-neutral-700/20 rounded-full" />

            {/* Center Collector Location */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-5 h-5 bg-[#CCFF00] border-2 border-black flex items-center justify-center animate-ping" />
              <div className="w-4 h-4 bg-[#CCFF00] border-2 border-black -mt-4.5" />
              <span className="text-[10px] font-mono-industrial font-black bg-black text-[#CCFF00] px-1 mt-1 border border-[#CCFF00]">
                YOU (DHARAVI)
              </span>
            </div>

            {/* Recycler Markers */}
            <button
              onClick={() => setSelectedRecyclerId('REC-GREENLOOP')}
              className="absolute top-12 right-24 z-20 flex flex-col items-center group cursor-pointer"
            >
              <div className="w-5 h-5 bg-emerald-500 border-2 border-black group-hover:scale-125 transition-transform" />
              <span className="text-[10px] font-mono-industrial font-bold bg-[#121316] text-white px-1 mt-0.5 border border-emerald-400">
                GREENLOOP (4.2km) ₹210/KG
              </span>
            </button>

            <button
              onClick={() => setSelectedRecyclerId('REC-ECOSHRED')}
              className="absolute bottom-12 right-16 z-20 flex flex-col items-center group cursor-pointer"
            >
              <div className="w-5 h-5 bg-emerald-500 border-2 border-black group-hover:scale-125 transition-transform" />
              <span className="text-[10px] font-mono-industrial font-bold bg-[#121316] text-white px-1 mt-0.5 border border-emerald-400">
                ECOSHRED (7.8km) ₹202/KG
              </span>
            </button>

            <button
              onClick={() => setSelectedRecyclerId('REC-METALLOCORP')}
              className="absolute top-8 left-12 z-20 flex flex-col items-center group cursor-pointer"
            >
              <div className="w-5 h-5 bg-blue-500 border-2 border-black group-hover:scale-125 transition-transform" />
              <span className="text-[10px] font-mono-industrial font-bold bg-[#121316] text-white px-1 mt-0.5 border border-blue-400">
                METALLOCORP (13km) ₹218/KG
              </span>
            </button>
          </div>
        </div>
      )}

      {/* RECYCLER OFFER CARDS */}
      <div className="space-y-4 mb-6">
        {sortedRecyclers.map((rec) => {
          const isSelected = selectedRecyclerId === rec.id;
          const rate = rec.offeredRatePerKg[material] || 0;
          const totalVal = Math.round(rate * weightKg);

          return (
            <div
              key={rec.id}
              onClick={() => {
                sounds.playClick();
                setSelectedRecyclerId(rec.id);
              }}
              className={`p-4 sm:p-5 border-3 transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-white border-[#121316] shadow-[6px_6px_0px_#121316] ring-2 ring-[#CCFF00]'
                  : 'bg-[#F4F1EA] border-[#121316] opacity-90 hover:opacity-100 hover:bg-white'
              }`}
            >
              {/* Card top banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-300 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  {rec.matchScore && (
                    <span className="bg-[#121316] text-[#CCFF00] font-mono-industrial font-black text-xs px-2 py-0.5 border border-black">
                      MATCH {rec.matchScore}%
                    </span>
                  )}
                  {rec.authorized ? (
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-700 font-mono-industrial font-black text-[11px] px-2 py-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      CPCB AUTHORIZED
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-800 border border-amber-700 font-mono-industrial font-black text-[11px] px-2 py-0.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      UNVERIFIED / PENDING
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono-industrial font-bold text-neutral-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{rec.distanceKm} KM AWAY</span>
                </div>
              </div>

              {/* Main Card Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Name & Credentials */}
                <div className="md:col-span-2">
                  <h3 className="text-xl font-black font-display text-[#121316] uppercase">
                    {rec.name}
                  </h3>
                  <div className="text-xs font-mono-industrial text-neutral-600 mt-0.5">
                    {rec.facility}
                  </div>
                  <div className="text-[11px] font-mono-industrial text-neutral-500 mt-1">
                    Reg Ref: <strong className="text-neutral-700">{rec.registrationRef}</strong>
                  </div>

                  {/* Badges: Pickup + Materials */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span
                      className={`text-xs font-mono-industrial font-bold px-2 py-0.5 border border-black flex items-center gap-1 ${
                        rec.pickupAvailable ? 'bg-emerald-400 text-black' : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      {rec.pickupAvailable ? 'PICKUP VEHICLE AVAILABLE' : 'DROP-OFF ONLY'}
                    </span>
                    <span className="text-xs font-mono-industrial text-neutral-700">
                      Accepts: <strong>{rec.materialsAccepted.join(', ')}</strong>
                    </span>
                  </div>
                </div>

                {/* Quoted Rate & Total */}
                <div className="bg-[#121316] text-white p-3 border-2 border-black text-right">
                  <div className="text-[10px] font-mono-industrial text-[#CCFF00] font-black uppercase">
                    OFFERED RATE
                  </div>
                  <div className="text-3xl font-black font-display text-white mt-0.5">
                    ₹{rate} <span className="text-sm font-mono-industrial font-normal text-neutral-400">/KG</span>
                  </div>
                  <div className="text-xs font-mono-industrial text-neutral-300 mt-1 border-t border-neutral-700 pt-1">
                    Total for {weightKg}KG: <strong className="text-[#CCFF00]">₹{totalVal.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              {/* Match Score Breakdown if best match */}
              {rec.scoreBreakdown && isSelected && (
                <div className="mt-3 bg-neutral-100 p-2.5 border border-neutral-300 text-xs font-mono-industrial">
                  <span className="font-bold text-neutral-900 block mb-1">
                    RECOMMENDATION SCORE BREAKDOWN ({rec.matchScore}/100):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-neutral-700">
                    <div>Material: <strong>{rec.scoreBreakdown.materialMatch}/30</strong></div>
                    <div>Authorization: <strong>{rec.scoreBreakdown.authorization}/25</strong></div>
                    <div>Distance: <strong>{rec.scoreBreakdown.distance}/20</strong></div>
                    <div>Price: <strong>{rec.scoreBreakdown.price}/20</strong></div>
                    <div>Pickup: <strong>{rec.scoreBreakdown.pickup}/5</strong></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={onBack}
          className="py-4 px-4 bg-white hover:bg-neutral-100 text-[#121316] border-3 border-[#121316] font-mono-industrial text-sm font-black shadow-[3px_3px_0px_#121316] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          ← PRICE ENGINE
        </button>

        <button
          onClick={() => {
            sounds.playSuccess();
            onSelectRecycler(selectedRecycler);
          }}
          className="flex items-center justify-center gap-2 py-4 px-4 bg-[#CCFF00] hover:bg-[#b8e600] text-[#121316] border-3 border-[#121316] font-mono-industrial text-base font-black shadow-[4px_4px_0px_#121316] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
        >
          <span>SELECT {selectedRecycler.name.split(' ')[0]}</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
