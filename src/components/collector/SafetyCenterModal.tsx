import React, { useState } from 'react';
import { Volume2, ShieldAlert, Check, X, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Language, SafetyGuide } from '../../types';
import { SAFETY_GUIDES } from '../../data/mockData';
import { speakText, sounds } from '../../utils/audio';

interface SafetyCenterModalProps {
  language: Language;
  onClose: () => void;
}

export const SafetyCenterModal: React.FC<SafetyCenterModalProps> = ({
  language,
  onClose
}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handlePlayAudio = (guide: SafetyGuide) => {
    sounds.playClick();
    setActiveCardId(guide.id);
    const script = guide.audioScript[language] || guide.audioScript.hi;
    speakText(script, language);
  };

  return (
    <div className="bg-[#FFFFFF] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] p-4 sm:p-7 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b-3 border-[#121316] pb-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#FF5500] text-white border-2 border-black">
            <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-mono-industrial font-black bg-[#FF5500] text-white px-2 py-0.5 border border-black uppercase">
              CRITICAL HAZARD PROTOCOLS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase mt-0.5">
              सुरक्षा केंद्र (SAFETY FIRST)
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1.5 bg-[#121316] text-[#CCFF00] font-mono-industrial text-xs font-bold border border-black hover:bg-neutral-800"
        >
          CLOSE [X]
        </button>
      </div>

      <p className="text-xs font-mono-industrial text-neutral-700 font-bold mb-6">
        Informal burning and acid extraction cause permanent organ damage. Authorized recyclers accept intact materials at fair rates. Click <strong>SUNO</strong> for spoken vernacular instructions.
      </p>

      {/* 4 PICTORIAL SAFETY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {SAFETY_GUIDES.map((guide) => {
          const isPlaying = activeCardId === guide.id;

          return (
            <div
              key={guide.id}
              className={`p-5 border-3 border-[#121316] transition-all shadow-[5px_5px_0px_#121316] flex flex-col justify-between ${
                guide.hazardColor === 'signal-red' ? 'bg-[#FFF5F5]' : 'bg-[#FFF9F2]'
              }`}
            >
              <div>
                {/* Header row with icon & code */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl select-none" role="img" aria-label={guide.code}>
                      {guide.icon}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono-industrial font-black bg-[#121316] text-[#FF5500] px-1.5 py-0.5 border border-black">
                        {guide.code}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black font-display text-[#121316] uppercase mt-0.5">
                        {guide.title[language] || guide.title.hi}
                      </h3>
                    </div>
                  </div>

                  {/* Audio Play Button */}
                  <button
                    onClick={() => handlePlayAudio(guide)}
                    className={`flex items-center gap-1.5 px-3 py-2 border-2 border-black font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
                      isPlaying
                        ? 'bg-[#CCFF00] text-black animate-pulse'
                        : 'bg-[#121316] text-[#CCFF00] hover:bg-neutral-800'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>SUNO (सुनो)</span>
                  </button>
                </div>

                {/* Short high-impact warning text */}
                <p className="text-xs sm:text-sm font-mono-industrial text-neutral-800 font-bold mb-4 leading-relaxed">
                  {guide.warning[language] || guide.warning.hi}
                </p>

                {/* Pictorial DO / DONT boxes */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono-industrial mt-2">
                  <div className="bg-emerald-50 border-2 border-emerald-700 p-2 text-emerald-900">
                    <span className="font-black flex items-center gap-1 text-[11px] mb-1">
                      <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                      KYA KAREIN (DO)
                    </span>
                    <span className="font-bold text-[11px] leading-tight block">
                      {guide.actionAllowed[language] || guide.actionAllowed.hi}
                    </span>
                  </div>

                  <div className="bg-red-50 border-2 border-red-700 p-2 text-red-900">
                    <span className="font-black flex items-center gap-1 text-[11px] mb-1">
                      <X className="w-3.5 h-3.5 text-red-700 stroke-[3]" />
                      MAT KAREIN (DON'T)
                    </span>
                    <span className="font-bold text-[11px] leading-tight block">
                      {guide.actionProhibited[language] || guide.actionProhibited.hi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-4 pt-3 border-t border-neutral-300 flex items-center justify-between text-[10px] font-mono-industrial text-neutral-500">
                <span>CPCB E-WASTE MANAGEMENT (RULES 2022)</span>
                <span className="text-neutral-700 font-bold">100% LEGAL PROTECTION</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={onClose}
          className="py-3 px-8 bg-[#121316] text-[#CCFF00] font-mono-industrial text-xs font-black border-2 border-black hover:bg-neutral-800 shadow-[3px_3px_0px_#CCFF00]"
        >
          ← RETURN TO HOME DASHBOARD
        </button>
      </div>
    </div>
  );
};
