import React from 'react';
import { CheckCircle2, ShieldCheck, Clock, MapPin, Hash, ArrowDown, ExternalLink } from 'lucide-react';
import { TraceabilityRecord, Language } from '../../types';
import { SAMPLE_TRACEABILITY_RECORD } from '../../data/mockData';
import { sounds } from '../../utils/audio';

interface TraceabilityTimelineModalProps {
  record?: TraceabilityRecord;
  language: Language;
  onClose: () => void;
}

export const TraceabilityTimelineModal: React.FC<TraceabilityTimelineModalProps> = ({
  record = SAMPLE_TRACEABILITY_RECORD,
  language,
  onClose
}) => {
  return (
    <div className="bg-[#FFFFFF] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] p-4 sm:p-7 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-3 border-[#121316] pb-3 mb-6 gap-2">
        <div>
          <span className="text-[10px] font-mono-industrial font-black bg-[#CCFF00] text-black px-2 py-0.5 border border-black uppercase">
            STEP 07 — END-TO-END TRACEABILITY TIMELINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase mt-0.5">
            E-WASTE CHAIN OF CUSTODY
          </h2>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1.5 bg-[#121316] text-[#CCFF00] font-mono-industrial text-xs font-bold border border-black hover:bg-neutral-800"
        >
          CLOSE [X]
        </button>
      </div>

      {/* Lot Meta Summary */}
      <div className="bg-[#121316] text-white p-4 border-3 border-black mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-industrial">
        <div>
          <span className="text-neutral-400 block text-[10px]">LOT ID</span>
          <span className="font-black text-[#CCFF00] text-sm">{record.lotId}</span>
        </div>
        <div>
          <span className="text-neutral-400 block text-[10px]">HANDOVER REFERENCE</span>
          <span className="font-black text-white text-sm">{record.handoverRef}</span>
        </div>
        <div>
          <span className="text-neutral-400 block text-[10px]">VERIFIED MATERIAL</span>
          <span className="font-black text-white text-sm">{record.weightKg} KG {record.material}</span>
        </div>
        <div>
          <span className="text-neutral-400 block text-[10px]">FINAL RECOVERY DESTINY</span>
          <span className="font-black text-emerald-400 text-[11px] leading-tight block">
            CPCB Smelting & Extraction
          </span>
        </div>
      </div>

      {/* STEP-BY-STEP VERTICAL TIMELINE */}
      <div className="relative border-l-4 border-[#121316] ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-6 my-6">
        {record.steps.map((step, index) => (
          <div key={index} className="relative group">
            {/* Step marker node */}
            <div className="absolute -left-[27px] sm:-left-[35px] top-0 w-6 h-6 bg-[#CCFF00] border-3 border-[#121316] rounded-none flex items-center justify-center font-mono-industrial text-[10px] font-black shadow-[2px_2px_0px_#121316]">
              {index + 1}
            </div>

            {/* Card Content */}
            <div className="bg-[#F4F1EA] border-2 border-[#121316] p-4 shadow-[4px_4px_0px_#121316] hover:bg-white transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-neutral-300 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-industrial font-black bg-[#121316] text-[#CCFF00] px-1.5 py-0.5 uppercase">
                    {step.stage}
                  </span>
                  <h3 className="text-base font-black font-display text-black">
                    {step.label}
                  </h3>
                </div>

                <div className="text-xs font-mono-industrial text-neutral-600 flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{step.timestamp}</span>
                </div>
              </div>

              <p className="text-xs font-mono-industrial text-neutral-800 font-bold mb-3">
                {step.details}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-industrial text-neutral-600 bg-white p-2 border border-neutral-300">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{step.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>Actor: <strong>{step.actor}</strong></span>
                  {step.hash && (
                    <span className="font-mono bg-neutral-100 px-1 border border-neutral-300 text-neutral-700">
                      {step.hash}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Stamp Footer */}
      <div className="bg-emerald-50 border-3 border-emerald-700 p-4 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-industrial">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <div>
            <span className="font-black text-emerald-900 block">
              100% CPCB EXTENDED PRODUCER RESPONSIBILITY (EPR) COMPLIANT
            </span>
            <span className="text-emerald-800">
              Formal audit trail valid for state pollution control boards (SPCB / MPCB).
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="self-start sm:self-auto px-4 py-2 bg-emerald-800 text-white font-black hover:bg-emerald-900 border border-black shadow-[2px_2px_0px_#000]"
        >
          DONE
        </button>
      </div>
    </div>
  );
};
