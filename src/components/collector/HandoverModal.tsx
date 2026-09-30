import React, { useState } from 'react';
import { Check, QrCode, Camera, MapPin, Clock, ShieldCheck, Share2, ArrowRight, IndianRupee, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, MaterialCategory, MaterialLot, Recycler } from '../../types';
import { MaterialSvgGraphic } from '../brutalist/MaterialSvgGraphic';
import { sounds } from '../../utils/audio';

interface HandoverModalProps {
  lot: MaterialLot;
  recycler: Recycler;
  language: Language;
  onHandoverComplete: (updatedLot: MaterialLot) => void;
  onOpenLotPassport: (lot: MaterialLot) => void;
  onOpenEarnings: () => void;
  onBack: () => void;
}

export const HandoverModal: React.FC<HandoverModalProps> = ({
  lot,
  recycler,
  language,
  onHandoverComplete,
  onOpenLotPassport,
  onOpenEarnings,
  onBack
}) => {
  const [step, setStep] = useState<'CONFIRM' | 'PHOTO' | 'COMPLETE'>('CONFIRM');
  const [paymentChoice, setPaymentChoice] = useState<'CASH' | 'UPI' | 'BANK'>('CASH');
  const [upiRef, setUpiRef] = useState<string>('DEMO-UPI-99214X');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const finalRate = recycler.offeredRatePerKg[lot.category] || 210;
  const finalAmount = Math.round(finalRate * lot.weightKg);

  const handleCaptureHandoverPhoto = () => {
    sounds.playScan();
    setTimeout(() => {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // confetti fallback
      }
      setStep('COMPLETE');

      const updated: MaterialLot = {
        ...lot,
        status: 'HANDOVER_COMPLETED',
        handoverRef: 'KL-HO-842193',
        handoverTimestamp: '2026-09-29 11:15 AM',
        paymentMethod: paymentChoice,
        paymentReference: paymentChoice === 'CASH' ? 'CASH-RCPT-8421' : upiRef,
        paymentAmount: finalAmount,
        matchedRecyclerId: recycler.id,
        quotedRatePerKg: finalRate
      };

      onHandoverComplete(updated);
    }, 1200);
  };

  return (
    <div className="bg-[#FFFFFF] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] p-4 sm:p-7 max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="flex items-center justify-between border-b-3 border-[#121316] pb-3 mb-5">
        <div>
          <span className="text-[10px] font-mono-industrial font-black bg-[#CCFF00] text-black px-2 py-0.5 border border-black uppercase">
            STEP 05 — DIGITAL HANDOVER & PAYMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase mt-1">
            {step === 'COMPLETE' ? 'सुपुर्दगी पूरी हुई' : 'माल सुपुर्दगी की पुष्टि'}
          </h2>
        </div>

        <div className="text-right">
          <div className="text-xs font-mono-industrial text-neutral-500 font-bold">LOT ID</div>
          <div className="text-sm font-mono-industrial font-black text-black">{lot.id}</div>
        </div>
      </div>

      {/* CONFIRMATION STAGE */}
      {step === 'CONFIRM' && (
        <div>
          <div className="bg-[#F4F1EA] border-3 border-[#121316] p-4 mb-5">
            <div className="text-xs font-mono-industrial font-black text-neutral-700 uppercase mb-3">
              HANDOVER SPECIFICATIONS (सुपुर्दगी विवरण)
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono-industrial">
              <div className="bg-white p-3 border-2 border-black">
                <span className="text-neutral-500 font-bold block">MATERIAL</span>
                <span className="text-base font-black text-black">{lot.category}</span>
                <span className="text-[11px] text-neutral-600 block">{lot.subcategory}</span>
              </div>

              <div className="bg-white p-3 border-2 border-black">
                <span className="text-neutral-500 font-bold block">VERIFIED WEIGHT</span>
                <span className="text-2xl font-black text-black tabular-nums">{lot.weightKg} KG</span>
                <span className="text-[11px] text-emerald-700 font-bold block">Scale Calibrated ✓</span>
              </div>
            </div>

            <div className="mt-3 bg-white p-3 border-2 border-black text-xs font-mono-industrial">
              <span className="text-neutral-500 font-bold block">RECEIVING RECYCLER</span>
              <span className="text-sm font-black text-black">{recycler.name}</span>
              <span className="text-[11px] text-neutral-600 block">Facility: {recycler.facility}</span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                Auth Ref: {recycler.registrationRef}
              </span>
            </div>

            {/* Agreed Rate & Payout Total */}
            <div className="mt-3 bg-[#121316] text-white p-4 border-2 border-black flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-industrial text-neutral-400 font-bold block">
                  AGREED BUYING RATE
                </span>
                <span className="text-lg font-black text-white">₹{finalRate} / KG</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono-industrial text-[#CCFF00] font-black block">
                  PAYMENT RECEIVABLE
                </span>
                <span className="text-3xl font-black font-display text-[#CCFF00]">
                  ₹{finalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Choice */}
          <div className="mb-6">
            <div className="text-xs font-mono-industrial font-black text-neutral-800 uppercase tracking-wider mb-2">
              PREFERRED PAYMENT METHOD (भुगतान का तरीका)
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'CASH', label: 'CASH (नकद)', desc: 'Instant Handover Cash' },
                { id: 'UPI', label: 'UPI (QR / ID)', desc: 'PhonePe / GPay / Paytm' },
                { id: 'BANK', label: 'BANK IMPS', desc: 'Direct to Account' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    sounds.playClick();
                    setPaymentChoice(m.id as unknown as typeof paymentChoice);
                  }}
                  className={`p-3 border-2 border-[#121316] text-center font-mono-industrial transition-all ${
                    paymentChoice === m.id
                      ? 'bg-[#121316] text-[#CCFF00] shadow-[2px_2px_0px_#CCFF00] font-black'
                      : 'bg-white text-neutral-800 hover:bg-neutral-100 font-bold text-xs'
                  }`}
                >
                  <div className="text-xs font-black">{m.label}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={onBack}
              className="py-4 px-4 bg-white hover:bg-neutral-100 text-[#121316] border-3 border-[#121316] font-mono-industrial text-sm font-black shadow-[3px_3px_0px_#121316] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              ← CHANGE RECYCLER
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setStep('PHOTO');
              }}
              className="flex items-center justify-center gap-2 py-4 px-4 bg-[#CCFF00] hover:bg-[#b8e600] text-[#121316] border-3 border-[#121316] font-mono-industrial text-base font-black shadow-[4px_4px_0px_#121316] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
            >
              <Camera className="w-5 h-5 stroke-[2.5]" />
              <span>RECORD HANDOVER PHOTO</span>
            </button>
          </div>
        </div>
      )}

      {/* PHOTO CAPTURE STEP */}
      {step === 'PHOTO' && (
        <div className="text-center py-4">
          <div className="text-xs font-mono-industrial font-black text-neutral-600 uppercase mb-2">
            TAKE HANDOVER PHOTOGRAPH WITH SCALE
          </div>

          <div className="relative border-4 border-[#121316] bg-[#121316] p-2 mb-5">
            <MaterialSvgGraphic material={lot.category} className="w-full h-56" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white font-mono-industrial">
              <Camera className="w-12 h-12 text-[#CCFF00] mb-2 animate-bounce" />
              <span className="text-sm font-black text-[#CCFF00]">
                CAPTURING PHYSICAL LOT & DIGITAL SCALE
              </span>
              <span className="text-xs text-neutral-300 mt-1">
                GPS: 19.0435° N, 72.8567° E · 11:15 AM
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setStep('CONFIRM')}
              className="py-3 px-4 bg-white border-2 border-black font-mono-industrial text-xs font-bold"
            >
              BACK
            </button>
            <button
              onClick={handleCaptureHandoverPhoto}
              className="py-4 px-4 bg-[#CCFF00] hover:bg-[#b8e600] text-black border-3 border-black font-mono-industrial text-sm font-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1"
            >
              ✓ CONFIRM HANDOVER & DISBURSE
            </button>
          </div>
        </div>
      )}

      {/* STEP COMPLETE: FINAL BRUTALIST STAMP */}
      {step === 'COMPLETE' && (
        <div className="animate-fadeIn">
          {/* Brutalist Stamp Card */}
          <div className="relative bg-[#F4F1EA] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] p-6 mb-6 overflow-hidden">
            {/* Hard Stamp Graphic */}
            <div className="absolute -top-3 -right-3 sm:top-4 sm:right-4 rotate-12 bg-[#CCFF00] text-[#121316] border-4 border-[#121316] px-4 py-2 font-mono-industrial font-black text-sm uppercase shadow-[4px_4px_0px_#121316] select-none">
              ✓ TRANSFER COMPLETE
            </div>

            <span className="text-xs font-mono-industrial font-black bg-[#121316] text-[#CCFF00] px-2 py-0.5 border border-black uppercase">
              OFFICIAL RECEIPT & DIGITAL PASSPORT
            </span>

            <div className="mt-3">
              <div className="text-xs font-mono-industrial text-neutral-500 font-bold">REFERENCE NUMBER</div>
              <div className="text-2xl font-black font-mono-industrial text-[#121316]">
                KL-HO-842193
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 text-xs font-mono-industrial">
              <div className="bg-white p-2.5 border-2 border-black">
                <span className="text-neutral-500 block">LOT ID</span>
                <span className="font-black text-black">{lot.id}</span>
              </div>
              <div className="bg-white p-2.5 border-2 border-black">
                <span className="text-neutral-500 block">WEIGHT & MATERIAL</span>
                <span className="font-black text-black">{lot.weightKg} KG · {lot.category}</span>
              </div>
              <div className="bg-[#121316] text-[#CCFF00] p-2.5 border-2 border-black col-span-2 sm:col-span-1">
                <span className="text-neutral-400 block">PAID AMOUNT</span>
                <span className="font-black text-xl text-[#CCFF00]">₹{finalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Verification checklist pills */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono-industrial bg-white p-3 border-2 border-black mb-4">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>LOCATION CAPTURED</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>TIME RECORDED</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>PHOTO ATTACHED</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>RECYCLER CONFIRMED</span>
              </div>
            </div>

            {/* QR Code section */}
            <div className="flex items-center justify-between bg-white border-2 border-black p-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-[#121316] p-1 flex items-center justify-center">
                  {/* SVG QR Code Simulation */}
                  <svg viewBox="0 0 40 40" className="w-full h-full fill-[#CCFF00]">
                    <rect x="2" y="2" width="12" height="12" fill="#CCFF00" />
                    <rect x="5" y="5" width="6" height="6" fill="#121316" />
                    <rect x="26" y="2" width="12" height="12" fill="#CCFF00" />
                    <rect x="29" y="5" width="6" height="6" fill="#121316" />
                    <rect x="2" y="26" width="12" height="12" fill="#CCFF00" />
                    <rect x="5" y="29" width="6" height="6" fill="#121316" />
                    <rect x="18" y="18" width="5" height="5" />
                    <rect x="26" y="26" width="6" height="6" />
                    <rect x="16" y="6" width="4" height="4" />
                    <rect x="6" y="16" width="4" height="4" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-mono-industrial font-black text-black">
                    DIGITAL LOT PASSPORT QR
                  </div>
                  <div className="text-[11px] font-mono-industrial text-neutral-600">
                    Scan for permanent CPCB compliance provenance
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  setShowQrModal(true);
                }}
                className="px-3 py-1.5 bg-[#121316] text-[#CCFF00] font-mono-industrial text-xs font-bold border border-black hover:bg-neutral-800"
              >
                SHOW QR
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onOpenLotPassport(lot)}
              className="py-3 px-3 bg-white hover:bg-neutral-100 text-[#121316] border-2 border-black font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#000]"
            >
              LOT PASSPORT
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                if (navigator.share) {
                  navigator.share({
                    title: `Kabadi Link Handover ${lot.id}`,
                    text: `Handover complete: ${lot.weightKg}kg ${lot.category} handed over to ${recycler.name}. Payout ₹${finalAmount}.`
                  }).catch(() => {});
                } else {
                  alert(`Share link copied: https://kabadilink.in/verify/${lot.id}`);
                }
              }}
              className="py-3 px-3 bg-white hover:bg-neutral-100 text-[#121316] border-2 border-black font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>SHARE RECORD</span>
            </button>

            <button
              onClick={onOpenEarnings}
              className="py-3 px-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black border-2 border-black font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5"
            >
              <span>VIEW LEDGER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Enlarged QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="bg-white border-4 border-black p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-black font-display mb-1">DIGITAL LOT PASSPORT</h3>
            <p className="text-xs font-mono-industrial text-neutral-600 mb-4">{lot.id}</p>

            <div className="w-48 h-48 mx-auto bg-black p-3 mb-4">
              <svg viewBox="0 0 40 40" className="w-full h-full fill-[#CCFF00]">
                <rect x="2" y="2" width="12" height="12" fill="#CCFF00" />
                <rect x="5" y="5" width="6" height="6" fill="#121316" />
                <rect x="26" y="2" width="12" height="12" fill="#CCFF00" />
                <rect x="29" y="5" width="6" height="6" fill="#121316" />
                <rect x="2" y="26" width="12" height="12" fill="#CCFF00" />
                <rect x="5" y="29" width="6" height="6" fill="#121316" />
                <rect x="18" y="18" width="5" height="5" />
                <rect x="26" y="26" width="6" height="6" />
                <rect x="16" y="6" width="4" height="4" />
                <rect x="6" y="16" width="4" height="4" />
              </svg>
            </div>

            <div className="text-xs font-mono-industrial text-neutral-700 mb-4">
              Authorized CPCB Reference Hash:
              <br />
              <span className="font-bold text-black">0x77ee842193f401bb</span>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 bg-black text-[#CCFF00] font-mono-industrial text-xs font-black"
            >
              CLOSE [X]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
