import React, { useState } from 'react';
import { TrendingUp, Volume2, Bell, BellRing, ArrowUpRight, Search, Check } from 'lucide-react';
import { PriceRecord, Language, MaterialCategory } from '../../types';
import { PRICE_RECORDS } from '../../data/mockData';
import { speakText, sounds } from '../../utils/audio';

interface PriceBoardModalProps {
  initialMaterial?: string;
  language: Language;
  onClose: () => void;
  onSelectForLot?: (material: MaterialCategory) => void;
}

export const PriceBoardModal: React.FC<PriceBoardModalProps> = ({
  initialMaterial = 'PCB',
  language,
  onClose,
  onSelectForLot
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>(initialMaterial);
  const [timeFilter, setTimeFilter] = useState<'7D' | '30D' | '6M'>('7D');
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [alertThreshold, setAlertThreshold] = useState<number>(215);

  const record = PRICE_RECORDS.find((p) => p.material === selectedMaterial) || PRICE_RECORDS[0];

  const handleHearBhav = () => {
    sounds.playClick();
    const spoken =
      language === 'hi'
        ? `${record.material} का आज का औसत भाव ${record.currentAvgPrice} रुपये प्रति किलो है। इस हफ्ते इसमें आठ दशमलव चार प्रतिशत की बढ़ोतरी हुई है।`
        : language === 'mr'
        ? `${record.material} चा आजचा सरासरी भाव ${record.currentAvgPrice} रुपये प्रति किलो आहे. बाजारात मागणी चांगली आहे.`
        : `Today's benchmark price for ${record.material} is ${record.currentAvgPrice} rupees per kilogram with ${record.trendPct7d} percent weekly gain.`;

    speakText(spoken, language);
  };

  const chartData =
    timeFilter === '7D'
      ? record.history7d.map((d) => ({ label: d.day, price: d.price }))
      : timeFilter === '30D'
      ? record.history30d.map((d) => ({ label: d.day, price: d.price }))
      : record.history6m.map((d) => ({ label: d.month, price: d.price }));

  const minPrice = Math.min(...chartData.map((d) => d.price)) - 10;
  const maxPrice = Math.max(...chartData.map((d) => d.price)) + 10;
  const range = maxPrice - minPrice || 1;

  return (
    <div className="bg-[#FFFFFF] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] p-4 sm:p-7 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-3 border-[#121316] pb-3 mb-5 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0044FF] text-white flex items-center justify-center font-black border-2 border-black">
            ₹
          </div>
          <div>
            <span className="text-[10px] font-mono-industrial font-black bg-[#121316] text-[#CCFF00] px-2 py-0.5 border border-black uppercase">
              MUMBAI MANDI BENCHMARK
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase mt-0.5">
              MERA BHAV — PRICE BOARD
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleHearBhav}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-[#121316] font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#121316]"
          >
            <Volume2 className="w-4 h-4" />
            <span>BHAV SUNAO</span>
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[#121316] text-[#CCFF00] font-mono-industrial text-xs font-bold border border-black hover:bg-neutral-800"
          >
            CLOSE [X]
          </button>
        </div>
      </div>

      {/* Material Selector Ribbon */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-5">
        {PRICE_RECORDS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              sounds.playClick();
              setSelectedMaterial(p.material);
            }}
            className={`px-3 py-2 text-xs font-mono-industrial font-black border-2 border-[#121316] transition-all whitespace-nowrap ${
              selectedMaterial === p.material
                ? 'bg-[#121316] text-[#CCFF00] shadow-[2px_2px_0px_#CCFF00]'
                : 'bg-[#F4F1EA] text-[#121316] hover:bg-white'
            }`}
          >
            {p.material} · ₹{p.currentAvgPrice}
          </button>
        ))}
      </div>

      {/* Main Board Card */}
      <div className="bg-[#F4F1EA] border-3 border-[#121316] p-4 sm:p-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-neutral-300 pb-3 mb-4">
          <div>
            <div className="text-3xl sm:text-5xl font-black font-display text-black">
              ₹{record.currentAvgPrice}{' '}
              <span className="text-xl font-mono-industrial font-bold text-neutral-600">
                {record.unit}
              </span>
            </div>
            <div className="text-xs font-mono-industrial text-neutral-700 font-bold mt-1">
              Subcategory: <strong>{record.subcategory}</strong>
            </div>
          </div>

          {/* Time range tabs */}
          <div className="flex items-center border-2 border-black bg-white p-0.5 shadow-[2px_2px_0px_#121316] self-start sm:self-auto">
            {(['7D', '30D', '6M'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  sounds.playClick();
                  setTimeFilter(filter);
                }}
                className={`px-3 py-1 font-mono-industrial text-xs font-black ${
                  timeFilter === filter ? 'bg-[#121316] text-[#CCFF00]' : 'text-neutral-700'
                }`}
              >
                {filter === '7D' ? '7 DAYS' : filter === '30D' ? '30 DAYS' : '6 MONTHS'}
              </button>
            ))}
          </div>
        </div>

        {/* BRUTALIST SVG TREND CHART */}
        <div className="bg-[#121316] p-4 border-2 border-black text-white mb-4">
          <div className="flex items-center justify-between text-xs font-mono-industrial mb-2">
            <span className="text-[#CCFF00] font-black">
              HISTORICAL TREND ({timeFilter})
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +{record.trendPct7d}% TREND
            </span>
          </div>

          <div className="h-44 sm:h-52 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-neutral-700">
            {chartData.map((pt, i) => {
              const heightPct = Math.max(15, Math.min(95, ((pt.price - minPrice) / range) * 100));

              return (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <span className="text-[10px] font-mono-industrial text-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-bold">
                    ₹{pt.price}
                  </span>
                  <div
                    className="w-full bg-[#CCFF00] border-2 border-black group-hover:bg-white transition-all shadow-[2px_0px_0px_#000]"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[9px] font-mono-industrial text-neutral-400 mt-2 truncate max-w-full">
                    {pt.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono-industrial text-neutral-400 mt-2">
            <span>Range: ₹{record.rangeMin} – ₹{record.rangeMax}/KG</span>
            <span>MMR Index Aggregator: 6 Authorized Recyclers</span>
          </div>
        </div>

        {/* PRICE ALERT SIMULATOR */}
        <div className="bg-white border-2 border-black p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-industrial">
          <div>
            <span className="font-black text-black flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-[#0044FF]" />
              PRICE ALERT (भाव सूचना)
            </span>
            <span className="text-neutral-600 block mt-0.5">
              Send SMS when {record.material} crosses ₹{alertThreshold}/KG
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
              className="w-20 px-2 py-1 border-2 border-black font-bold text-center"
            />
            <button
              onClick={() => {
                sounds.playSuccess();
                setAlertActive(!alertActive);
              }}
              className={`px-3 py-1.5 font-bold border-2 border-black transition-colors ${
                alertActive
                  ? 'bg-emerald-500 text-black shadow-[2px_2px_0px_#000]'
                  : 'bg-[#121316] text-[#CCFF00] hover:bg-neutral-800'
              }`}
            >
              {alertActive ? '✓ ALERT SET' : 'ENABLE ALERT'}
            </button>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="py-2.5 px-4 bg-white border-2 border-black font-mono-industrial text-xs font-bold"
        >
          BACK
        </button>

        {onSelectForLot && (
          <button
            onClick={() => onSelectForLot(record.material)}
            className="py-3 px-5 bg-[#CCFF00] hover:bg-[#b8e600] text-black border-2 border-black font-mono-industrial text-xs font-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5"
          >
            <span>CREATE LOT FOR {record.material}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </button>
        )}
      </div>
    </div>
  );
};
