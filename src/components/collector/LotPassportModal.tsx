import React from 'react';
import { ShieldCheck, QrCode, CheckCircle2, MapPin, Calendar, Scale, ArrowRight, Printer, Share2 } from 'lucide-react';
import { MaterialLot, Language } from '../../types';
import { MaterialSvgGraphic } from '../brutalist/MaterialSvgGraphic';
import { RECYCLERS } from '../../data/mockData';
import { sounds } from '../../utils/audio';

interface LotPassportModalProps {
  lot: MaterialLot;
  language: Language;
  onClose: () => void;
  onOpenTraceability: () => void;
}

export const LotPassportModal: React.FC<LotPassportModalProps> = ({
  lot,
  language,
  onClose,
  onOpenTraceability
}) => {
  const recycler = RECYCLERS.find((r) => r.id === lot.matchedRecyclerId) || RECYCLERS[0];

  return (
    <div className="bg-[#FFFFFF] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] p-4 sm:p-7 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-3 border-[#121316] pb-3 mb-5 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#CCFF00] border-2 border-black">
            <ShieldCheck className="w-6 h-6 text-black stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-mono-industrial font-black bg-[#121316] text-[#CCFF00] px-2 py-0.5 border border-black uppercase">
              PERMANENT CPCB PROVENANCE RECORD
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase mt-0.5">
              DIGITAL LOT PASSPORT
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

      {/* Main Passport Certificate Layout */}
      <div className="border-3 border-[#121316] bg-[#F4F1EA] p-5 mb-5 relative overflow-hidden">
        {/* Top bar with Lot ID and QR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-neutral-300 pb-4 mb-4">
          <div>
            <span className="text-xs font-mono-industrial font-black text-neutral-500 uppercase">
              UNIQUE LOT IDENTIFIER
            </span>
            <div className="text-3xl font-black font-mono-industrial text-[#121316]">
              {lot.id}
            </div>
            <div className="text-xs font-mono-industrial text-neutral-600 mt-1 flex items-center gap-2">
              <span>Handover Ref: <strong>{lot.handoverRef || 'KL-HO-842193'}</strong></span>
              <span>·</span>
              <span className="text-emerald-700 font-bold">100% Traceable</span>
            </div>
          </div>

          {/* Verification QR */}
          <div className="flex items-center gap-3 bg-white p-2 border-2 border-black self-start sm:self-auto">
            <div className="w-14 h-14 bg-black p-1">
              <svg viewBox="0 0 40 40" className="w-full h-full fill-[#CCFF00]">
                <rect x="2" y="2" width="12" height="12" fill="#CCFF00" />
                <rect x="5" y="5" width="6" height="6" fill="#121316" />
                <rect x="26" y="2" width="12" height="12" fill="#CCFF00" />
                <rect x="29" y="5" width="6" height="6" fill="#121316" />
                <rect x="2" y="26" width="12" height="12" fill="#CCFF00" />
                <rect x="5" y="29" width="6" height="6" fill="#121316" />
                <rect x="18" y="18" width="5" height="5" />
                <rect x="26" y="26" width="6" height="6" />
              </svg>
            </div>
            <div className="text-[10px] font-mono-industrial text-neutral-700">
              <span className="font-bold text-black block">CPCB AUDIT QR</span>
              <span>E-Waste Rules 2022</span>
              <span className="text-emerald-600 font-bold block">✓ VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Material & Photograph Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="sm:col-span-1 border-2 border-black bg-black">
            <MaterialSvgGraphic material={lot.category} className="w-full h-36" />
          </div>

          <div className="sm:col-span-2 grid grid-cols-2 gap-2 text-xs font-mono-industrial">
            <div className="bg-white p-2.5 border border-black">
              <span className="text-neutral-500 font-bold block">MATERIAL GRADE</span>
              <span className="text-base font-black text-black">{lot.category}</span>
              <span className="text-[10px] text-neutral-600">{lot.subcategory}</span>
            </div>

            <div className="bg-white p-2.5 border border-black">
              <span className="text-neutral-500 font-bold block">VERIFIED WEIGHT</span>
              <span className="text-xl font-black text-black">{lot.weightKg} KG</span>
              <span className="text-[10px] text-neutral-600">Condition: {lot.condition}</span>
            </div>

            <div className="bg-white p-2.5 border border-black">
              <span className="text-neutral-500 font-bold block">COLLECTION POINT</span>
              <span className="font-black text-black truncate block">{lot.locationName}</span>
              <span className="text-[10px] text-neutral-600">GPS: 19.0435° N, 72.8567° E</span>
            </div>

            <div className="bg-white p-2.5 border border-black">
              <span className="text-neutral-500 font-bold block">TOTAL DISBURSED</span>
              <span className="text-xl font-black text-emerald-800">
                ₹{(lot.paymentAmount || 3885).toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-neutral-600">Rate: ₹{lot.quotedRatePerKg || 210}/KG</span>
            </div>
          </div>
        </div>

        {/* Chain of Custody Stamp */}
        <div className="bg-[#121316] text-white p-3.5 border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-industrial">
          <div>
            <span className="text-neutral-400 block text-[10px]">AUTHORIZED RECYCLER DESTINATION</span>
            <span className="font-black text-[#CCFF00] text-sm">{recycler.name}</span>
            <span className="text-[11px] text-neutral-300 block">{recycler.facility}</span>
          </div>

          <div className="sm:text-right">
            <span className="text-neutral-400 block text-[10px]">E-MANIFEST HASH</span>
            <span className="font-mono text-white text-[11px]">0x77ee842193f401bb992144</span>
            <span className="text-emerald-400 font-bold block text-[10px]">✓ CHAIN OF CUSTODY SECURED</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => {
            sounds.playClick();
            window.print();
          }}
          className="px-4 py-2.5 bg-white border-2 border-black font-mono-industrial text-xs font-bold shadow-[2px_2px_0px_#000] flex items-center gap-1.5"
        >
          <Printer className="w-4 h-4" />
          <span>PRINT / SAVE PDF</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            onOpenTraceability();
          }}
          className="px-5 py-2.5 bg-[#CCFF00] hover:bg-[#b8e600] text-black border-2 border-black font-mono-industrial text-xs font-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5"
        >
          <span>STEP 07: VIEW TRACEABILITY TIMELINE</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
