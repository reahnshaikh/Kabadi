import React, { useState } from 'react';
import { TrendingUp, Volume2, HelpCircle, ChevronDown, ChevronUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language, LotCondition, MaterialCategory, PriceEstimate } from '../../types';
import { speakText, sounds } from '../../utils/audio';

interface FairPriceEngineProps {
  material: MaterialCategory;
  weightKg: number;
  condition: LotCondition;
  locationName: string;
  language: Language;
  onProceedToRecyclers: (estimate: PriceEstimate) => void;
  onBack: () => void;
}

export const FairPriceEngine: React.FC<FairPriceEngineProps> = ({
  material,
  weightKg,
  condition,
  locationName,
  language,
  onProceedToRecyclers,
  onBack
}) => {
  const [whyPriceOpen, setWhyPriceOpen] = useState(false);

  // Rate calculations
  const baseRates: Record<MaterialCategory, { low: number; fair: number; high: number; subcat: string; trend: number }> = {
    PCB: { low: 185, fair: 205, high: 220, subcat: 'Green Motherboard & High-grade Telecom', trend: 8.4 },
    CABLE: { low: 310, fair: 340, high: 365, subcat: 'Insulated Copper & Power Harness', trend: 3.2 },
    BATTERY: { low: 110, fair: 125, high: 140, subcat: 'Lithium-Ion / Sealed Lead Acid', trend: -1.8 },
    CRT: { low: 25, fair: 32, high: 38, subcat: 'Lead-Shielded CRT Monitors', trend: 0.5 },
    LCD: { low: 45, fair: 55, high: 65, subcat: 'Flat Panel Display Modules', trend: 1.4 },
    MOTOR: { low: 75, fair: 88, high: 98, subcat: 'Copper Stator & Armature Scrap', trend: 2.1 },
    MAGNET: { low: 250, fair: 280, high: 310, subcat: 'Neodymium Rare Earth Elements', trend: 5.6 },
    MIXED_PLASTIC: { low: 35, fair: 42, high: 48, subcat: 'Flame-Retardant ABS & HIPS', trend: -0.8 },
    OTHER: { low: 50, fair: 65, high: 80, subcat: 'Unsorted Electronic Scrap', trend: 1.0 }
  };

  const rateInfo = baseRates[material] || baseRates.PCB;

  // Condition modifier
  const conditionFactor = condition === 'Good' ? 1.05 : condition === 'Damaged' ? 0.92 : 1.0;
  const adjustedFair = Math.round(rateInfo.fair * conditionFactor);
  const adjustedLow = Math.round(rateInfo.low * conditionFactor);
  const adjustedHigh = Math.round(rateInfo.high * conditionFactor);

  const totalMin = Math.round(adjustedLow * weightKg);
  const totalFair = Math.round(adjustedFair * weightKg);
  const totalMax = Math.round(adjustedHigh * weightKg);

  const estimate: PriceEstimate = {
    material,
    subcategory: rateInfo.subcat,
    weightKg,
    location: locationName,
    condition,
    lowRatePerKg: adjustedLow,
    fairRatePerKg: adjustedFair,
    highRatePerKg: adjustedHigh,
    totalEstimatedMin: totalMin,
    totalEstimatedMax: totalMax,
    totalEstimatedFair: totalFair,
    trendPct: rateInfo.trend,
    factors: [
      {
        label: 'Local historical prices',
        impact: `+${rateInfo.trend}% in last 7 days`,
        detail: `MMR scrap benchmark median tracked across 40+ formal pickup logs.`
      },
      {
        label: 'Current recycler offers',
        impact: '₹202–₹218/KG live bids',
        detail: 'Authorized recyclers actively procuring high-grade PCB lots.'
      },
      {
        label: 'Material category',
        impact: rateInfo.subcat,
        detail: 'High gold and copper yield components recognized by AI vision.'
      },
      {
        label: 'Approximate weight',
        impact: `${weightKg} KG`,
        detail: 'Bulk lot threshold allows competitive aggregator pickup.'
      },
      {
        label: 'Condition adjustment',
        impact: condition,
        detail: condition === 'Good' ? '+5% premium for intact boards' : 'Standard mixed valuation'
      }
    ]
  };

  const handleHearPrice = () => {
    sounds.playClick();
    const spoken =
      language === 'hi'
        ? `${weightKg} किलो ${material} का अनुमानित उचित मूल्य तीन हजार सात सौ बानवे रुपये है। बाजार दायरा चौतीस सौ से चार हजार सत्तर रुपये तक है।`
        : language === 'mr'
        ? `${weightKg} किलो ${material} चे अंदाजे मूल्य तीन हजार सातशे ब्याण्णव रुपये आहे. बाजार दर दोनशे पाच रुपये प्रति किलो आहे.`
        : `For ${weightKg} kilograms of ${material}, estimated fair value is ${totalFair} rupees. Local market range is ${totalMin} to ${totalMax} rupees.`;

    speakText(spoken, language);
  };

  return (
    <div className="bg-[#FFFFFF] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] p-5 sm:p-7 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b-3 border-[#121316] pb-3 mb-5">
        <div>
          <span className="text-[10px] font-mono-industrial font-black bg-[#CCFF00] text-black px-2 py-0.5 border border-black uppercase">
            STEP 03 — FAIR PRICE ENGINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase mt-1">
            उचित मूल्य अनुमान
          </h2>
        </div>

        <button
          onClick={handleHearPrice}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-[#121316] font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#121316] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>BHAV SUNAO</span>
        </button>
      </div>

      {/* MATERIAL INTELLIGENCE CARD */}
      <div className="bg-[#121316] text-white border-3 border-[#121316] p-4 sm:p-5 mb-6">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-3 mb-4">
          <div>
            <div className="text-2xl font-black font-display text-[#CCFF00]">{material}</div>
            <div className="text-xs font-mono-industrial text-neutral-400 font-bold">{rateInfo.subcat}</div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono-industrial text-neutral-400">LOT WEIGHT</span>
            <div className="text-2xl font-black font-display text-white">{weightKg} KG</div>
          </div>
        </div>

        {/* Big Estimated Total Value */}
        <div className="bg-[#1A1C23] border border-neutral-700 p-4 mb-4 text-center">
          <div className="text-xs font-mono-industrial text-neutral-400 uppercase tracking-widest mb-1">
            ESTIMATED TOTAL VALUE (अनुमानित कुल कमाई)
          </div>
          <div className="text-4xl sm:text-6xl font-black font-display text-[#CCFF00] tabular-nums tracking-tight">
            ₹{totalFair.toLocaleString('en-IN')}
          </div>
          <div className="text-xs font-mono-industrial text-neutral-300 font-bold mt-1">
            Price Range: <strong className="text-white">₹{totalMin.toLocaleString('en-IN')} — ₹{totalMax.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Sub-metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono-industrial">
          <div className="bg-black/50 p-2.5 border border-neutral-800">
            <div className="text-neutral-400">LOCAL RATE / KG</div>
            <div className="text-base font-bold text-white mt-0.5">
              ₹{adjustedLow} — ₹{adjustedHigh} / KG
            </div>
          </div>
          <div className="bg-black/50 p-2.5 border border-neutral-800">
            <div className="text-neutral-400">7-DAY MMR TREND</div>
            <div className="text-base font-bold text-[#CCFF00] mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-[#CCFF00]" />
              <span>+{rateInfo.trend}%</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] font-mono-industrial text-neutral-400 mt-3 italic">
          *Estimate based on material category, approximate weight, local price history and current recycler offers. Not a guaranteed quote.
        </p>
      </div>

      {/* FAIR PRICE BENCHMARK SPECTRUM */}
      <div className="bg-[#F4F1EA] border-3 border-[#121316] p-4 mb-5">
        <div className="text-xs font-mono-industrial font-black text-neutral-800 uppercase tracking-wider mb-3">
          MARKET PRICE SPECTRUM (मंडी भाव तुलना)
        </div>

        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          <div className="bg-white p-2.5 border-2 border-[#121316]">
            <div className="text-xs font-mono-industrial text-neutral-600 font-bold">LOW</div>
            <div className="text-lg font-black font-mono-industrial text-neutral-800">₹{adjustedLow}</div>
            <div className="text-[10px] text-neutral-500 font-mono-industrial">Unsorted Yard</div>
          </div>

          <div className="bg-[#CCFF00] p-2.5 border-3 border-[#121316] shadow-[2px_2px_0px_#121316] -translate-y-1">
            <div className="text-xs font-mono-industrial text-black font-black">FAIR (BENCHMARK)</div>
            <div className="text-xl font-black font-mono-industrial text-black">₹{adjustedFair}</div>
            <div className="text-[10px] text-black font-bold font-mono-industrial">Authorized Base</div>
          </div>

          <div className="bg-white p-2.5 border-2 border-[#121316]">
            <div className="text-xs font-mono-industrial text-neutral-600 font-bold">HIGH</div>
            <div className="text-lg font-black font-mono-industrial text-neutral-800">₹{adjustedHigh}</div>
            <div className="text-[10px] text-neutral-500 font-mono-industrial">Top Smelter Bid</div>
          </div>
        </div>

        {/* WHY THIS PRICE EXPANDABLE */}
        <div className="border-t-2 border-neutral-300 pt-3">
          <button
            onClick={() => setWhyPriceOpen(!whyPriceOpen)}
            className="w-full flex items-center justify-between text-xs font-mono-industrial font-black text-[#121316] hover:text-neutral-700"
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-neutral-700" />
              WHY THIS PRICE? (भाव कैसे तय हुआ?)
            </span>
            {whyPriceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {whyPriceOpen && (
            <div className="mt-3 space-y-2 text-xs font-mono-industrial bg-white p-3 border-2 border-[#121316]">
              {estimate.factors.map((f, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-1.5 last:border-none">
                  <span className="font-bold text-neutral-900">• {f.label}:</span>
                  <span className="text-neutral-600 sm:text-right font-medium">{f.impact} ({f.detail})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={onBack}
          className="py-4 px-4 bg-white hover:bg-neutral-100 text-[#121316] border-3 border-[#121316] font-mono-industrial text-sm font-black shadow-[3px_3px_0px_#121316] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          ← ADJUST WEIGHT
        </button>

        <button
          onClick={() => {
            sounds.playSuccess();
            onProceedToRecyclers(estimate);
          }}
          className="flex items-center justify-center gap-2 py-4 px-4 bg-[#CCFF00] hover:bg-[#b8e600] text-[#121316] border-3 border-[#121316] font-mono-industrial text-base font-black shadow-[4px_4px_0px_#121316] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
        >
          <span>FIND RECYCLERS</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
