import React, { useState } from 'react';
import { Plus, Minus, MapPin, Check, ArrowRight, Scale, AlertCircle } from 'lucide-react';
import { Language, LotCondition, MaterialCategory } from '../../types';
import { sounds } from '../../utils/audio';

interface WeightInputProps {
  material: MaterialCategory;
  initialWeight?: number;
  onWeightConfirmed: (data: { weightKg: number; condition: LotCondition; locationName: string }) => void;
  onBack: () => void;
}

export const WeightInput: React.FC<WeightInputProps> = ({
  material,
  initialWeight = 18.5,
  onWeightConfirmed,
  onBack
}) => {
  const [weight, setWeight] = useState<number>(initialWeight);
  const [condition, setCondition] = useState<LotCondition>('Mixed');
  const [locationName, setLocationName] = useState<string>('Dharavi 90ft Road, Mumbai');
  const [gpsLocked, setGpsLocked] = useState<boolean>(true);

  const locations = [
    'Dharavi 90ft Road, Mumbai',
    'Kurla West CST Road, Mumbai',
    'Bhiwandi Logistic Hub, Thane',
    'Nehru Place Electronics Market, New Delhi',
    'Mayapuri Industrial Phase-2, New Delhi',
    'Peenya Industrial Area, Bengaluru'
  ];

  const handleAdjustWeight = (delta: number) => {
    sounds.playClick();
    setWeight((prev) => Math.max(0.5, parseFloat((prev + delta).toFixed(1))));
  };

  const handleConditionSelect = (c: LotCondition) => {
    sounds.playClick();
    setCondition(c);
  };

  const handleConfirm = () => {
    sounds.playSuccess();
    onWeightConfirmed({
      weightKg: weight,
      condition,
      locationName
    });
  };

  return (
    <div className="bg-[#FFFFFF] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] p-5 sm:p-7 max-w-2xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-3 border-[#121316] pb-3 mb-6">
        <div>
          <span className="text-[10px] font-mono-industrial font-black bg-[#121316] text-[#CCFF00] px-2 py-0.5 border border-black uppercase">
            STEP 02 — WEIGHT & CONDITION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase mt-1">
            वजन और हालत बताएं
          </h2>
        </div>
        <div className="px-3 py-1 bg-[#CCFF00] border-2 border-[#121316] font-mono-industrial font-black text-sm">
          {material}
        </div>
      </div>

      {/* GIANT OVERSIZED WEIGHT INPUT */}
      <div className="bg-[#F4F1EA] border-3 border-[#121316] p-6 mb-6 text-center">
        <label className="text-xs font-mono-industrial font-black text-neutral-600 uppercase tracking-widest block mb-2">
          APPROXIMATE NET WEIGHT (अंदाजे वजन)
        </label>

        {/* Big Display */}
        <div className="flex items-baseline justify-center gap-2 mb-4">
          <span className="text-6xl sm:text-8xl font-black font-display text-[#121316] tabular-nums tracking-tighter">
            {weight.toFixed(1)}
          </span>
          <span className="text-2xl sm:text-3xl font-mono-industrial font-black text-neutral-800">
            KG
          </span>
        </div>

        {/* Plus / Minus Control Pad */}
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          <button
            onClick={() => handleAdjustWeight(-5.0)}
            className="py-2.5 bg-white hover:bg-neutral-100 text-[#121316] border-2 border-[#121316] font-mono-industrial font-black text-sm shadow-[2px_2px_0px_#121316] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            -5 KG
          </button>
          <button
            onClick={() => handleAdjustWeight(-0.5)}
            className="py-2.5 bg-white hover:bg-neutral-100 text-[#121316] border-2 border-[#121316] font-mono-industrial font-black text-sm shadow-[2px_2px_0px_#121316] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            -0.5
          </button>
          <button
            onClick={() => handleAdjustWeight(0.5)}
            className="py-2.5 bg-white hover:bg-neutral-100 text-[#121316] border-2 border-[#121316] font-mono-industrial font-black text-sm shadow-[2px_2px_0px_#121316] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            +0.5
          </button>
          <button
            onClick={() => handleAdjustWeight(5.0)}
            className="py-2.5 bg-white hover:bg-neutral-100 text-[#121316] border-2 border-[#121316] font-mono-industrial font-black text-sm shadow-[2px_2px_0px_#121316] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            +5 KG
          </button>
        </div>
      </div>

      {/* CONDITION SELECTOR */}
      <div className="mb-6">
        <label className="text-xs font-mono-industrial font-black text-neutral-800 uppercase tracking-wider block mb-2">
          MATERIAL CONDITION (सामग्री की स्थिति)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['Good', 'Mixed', 'Damaged', 'Unknown'] as LotCondition[]).map((c) => (
            <button
              key={c}
              onClick={() => handleConditionSelect(c)}
              className={`py-3 px-2 border-3 border-[#121316] font-mono-industrial text-sm font-black text-center transition-all ${
                condition === c
                  ? 'bg-[#121316] text-[#CCFF00] shadow-[3px_3px_0px_#CCFF00]'
                  : 'bg-white text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* LOCATION SELECTOR */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-mono-industrial font-black text-neutral-800 uppercase tracking-wider">
            COLLECTION LOCATION (स्थान)
          </label>
          <span className="text-[10px] font-mono-industrial font-bold text-emerald-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {gpsLocked ? 'GPS LOCKED: 19.0435° N, 72.8567° E' : 'MANUAL'}
          </span>
        </div>

        <div className="relative">
          <select
            value={locationName}
            onChange={(e) => {
              setLocationName(e.target.value);
              setGpsLocked(false);
            }}
            className="w-full bg-[#F4F1EA] border-3 border-[#121316] px-3 py-2.5 font-mono-industrial font-bold text-sm text-[#121316] appearance-none focus:outline-none focus:bg-white"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <MapPin className="w-4 h-4 text-black absolute right-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* CONFIRMATION BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={onBack}
          className="py-4 px-4 bg-white hover:bg-neutral-100 text-[#121316] border-3 border-[#121316] font-mono-industrial text-sm font-black shadow-[3px_3px_0px_#121316] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          ← RETAKE PHOTO
        </button>

        <button
          onClick={handleConfirm}
          className="flex items-center justify-center gap-2 py-4 px-4 bg-[#CCFF00] hover:bg-[#b8e600] text-[#121316] border-3 border-[#121316] font-mono-industrial text-base font-black shadow-[4px_4px_0px_#121316] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
        >
          <span>ESTIMATE FAIR PRICE</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
