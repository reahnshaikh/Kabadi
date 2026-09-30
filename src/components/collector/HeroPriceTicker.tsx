import React, { useState } from 'react';
import { TrendingUp, Volume2, ArrowUpRight, Sparkles } from 'lucide-react';
import { Language, PriceRecord } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { speakText, sounds } from '../../utils/audio';

interface HeroPriceTickerProps {
  prices: PriceRecord[];
  language: Language;
  onOpenPriceBoard: (materialId?: string) => void;
}

export const HeroPriceTicker: React.FC<HeroPriceTickerProps> = ({
  prices,
  language,
  onOpenPriceBoard
}) => {
  const t = TRANSLATIONS[language];
  const [selectedMaterial, setSelectedMaterial] = useState<string>('PCB');

  const activeRecord = prices.find((p) => p.material === selectedMaterial) || prices[0];

  const handleHearRate = () => {
    sounds.playClick();
    const matName = activeRecord.material;
    const rate = activeRecord.currentAvgPrice;
    const trend = activeRecord.trendPct7d;

    const speechText =
      language === 'hi'
        ? `आज ${matName} का औसत भाव ${rate} रुपये प्रति किलो है। पिछले सात दिनों में यह आठ प्रतिशत बढ़ा है।`
        : language === 'mr'
        ? `आज ${matName} चा सरासरी दर ${rate} रुपये प्रति किलो आहे. आठवड्यात दर वाढलेला आहे.`
        : `Today's average ${matName} rate is ${rate} rupees per kilogram, trending up ${trend} percent this week.`;

    speakText(speechText, language);
  };

  return (
    <div className="bg-[#FFFFFF] border-3 border-[#121316] shadow-[6px_6px_0px_#121316] p-4 sm:p-6 mb-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[#121316] mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#EE1111] border border-black animate-ping" />
          <span className="font-mono-industrial font-black text-sm tracking-wider uppercase text-[#121316]">
            {t.aajKaBhav}
          </span>
          <span className="text-xs text-neutral-500 font-mono-industrial hidden sm:inline">
            · MUMBAI MMR MANDI INDEX
          </span>
        </div>

        {/* Bhav Sunao Button */}
        <button
          onClick={handleHearRate}
          className="flex items-center gap-2 px-3 py-1 bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-[#121316] font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#121316] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>{t.bhavSunao}</span>
        </button>
      </div>

      {/* Material selection tabs for quick checking */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-4">
        {prices.slice(0, 6).map((item) => (
          <button
            key={item.id}
            onClick={() => {
              sounds.playClick();
              setSelectedMaterial(item.material);
            }}
            className={`px-3 py-1.5 text-xs font-mono-industrial font-black border-2 border-[#121316] transition-all whitespace-nowrap ${
              selectedMaterial === item.material
                ? 'bg-[#121316] text-[#CCFF00] shadow-[2px_2px_0px_#CCFF00]'
                : 'bg-[#F4F1EA] text-[#121316] hover:bg-white'
            }`}
          >
            {item.material}
          </button>
        ))}
      </div>

      {/* Main oversized price display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Left: Huge price hero */}
        <div className="md:col-span-2">
          <div className="text-xs font-mono-industrial text-neutral-600 font-bold uppercase tracking-wider mb-1">
            {activeRecord.subcategory}
          </div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-4xl sm:text-6xl font-black text-[#121316] font-display tracking-tight">
              ₹{activeRecord.currentAvgPrice}
            </span>
            <span className="text-xl sm:text-2xl font-mono-industrial font-bold text-neutral-700">
              / KG
            </span>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#CCFF00] border-2 border-[#121316] text-xs font-mono-industrial font-black shadow-[2px_2px_0px_#121316]">
              <TrendingUp className="w-3.5 h-3.5 text-black" />
              <span>+{activeRecord.trendPct7d}% (7 DAYS)</span>
            </div>
          </div>

          <div className="mt-2 text-xs font-mono-industrial text-neutral-700 flex items-center gap-3">
            <span>Range: <strong>₹{activeRecord.rangeMin} – ₹{activeRecord.rangeMax}/KG</strong></span>
            <span>·</span>
            <span>Verified Offers: <strong>{activeRecord.recyclerOffersCount} Recyclers</strong></span>
          </div>
        </div>

        {/* Right: CTA to open full price board */}
        <div className="flex flex-col justify-end gap-2 border-t md:border-t-0 md:border-l-2 border-[#121316] pt-3 md:pt-0 md:pl-4">
          <div className="text-xs font-mono-industrial text-neutral-500">
            Formal authorized recyclers pay up to <strong>+18%</strong> more than street unverified intermediaries.
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenPriceBoard(activeRecord.material);
            }}
            className="flex items-center justify-between px-4 py-3 bg-[#121316] hover:bg-neutral-800 text-[#CCFF00] font-mono-industrial text-xs font-black border-2 border-[#121316] shadow-[3px_3px_0px_#CCFF00] active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>VIEW COMPLETE PRICE BOARD</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
