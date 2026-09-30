import React, { useState } from 'react';
import { IndianRupee, ArrowUpRight, TrendingUp, CheckCircle2, Clock, Download, Filter } from 'lucide-react';
import { Language, Transaction } from '../../types';
import { INITIAL_TRANSACTIONS } from '../../data/mockData';
import { sounds } from '../../utils/audio';

interface EarningsLedgerModalProps {
  transactions?: Transaction[];
  language: Language;
  onClose: () => void;
  onOpenLotDetails: (lotId: string) => void;
}

export const EarningsLedgerModal: React.FC<EarningsLedgerModalProps> = ({
  transactions = INITIAL_TRANSACTIONS,
  language,
  onClose,
  onOpenLotDetails
}) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'PAID' | 'PENDING'>('ALL');

  const totalEarnings = transactions.reduce((acc, t) => acc + t.totalAmount, 0);
  const paidEarnings = transactions
    .filter((t) => t.paymentStatus === 'PAID')
    .reduce((acc, t) => acc + t.totalAmount, 0);
  const pendingEarnings = totalEarnings - paidEarnings;

  const filteredTxns = transactions.filter((t) => {
    if (filterMode === 'PAID') return t.paymentStatus === 'PAID';
    if (filterMode === 'PENDING') return t.paymentStatus !== 'PAID';
    return true;
  });

  return (
    <div className="bg-[#FFFFFF] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] p-4 sm:p-7 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-3 border-[#121316] pb-3 mb-6 gap-2">
        <div>
          <span className="text-[10px] font-mono-industrial font-black bg-[#CCFF00] text-black px-2 py-0.5 border border-black uppercase">
            STEP 06 — EARNINGS LEDGER & SETTLEMENTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-[#121316] uppercase mt-1">
            मेरी कमाई (EARNINGS LEDGER)
          </h2>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1.5 bg-[#121316] text-[#CCFF00] font-mono-industrial text-xs font-bold border border-black hover:bg-neutral-800"
        >
          CLOSE [X]
        </button>
      </div>

      {/* METRIC SCORECARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {/* Total Earnings */}
        <div className="bg-[#CCFF00] border-3 border-[#121316] p-4 shadow-[4px_4px_0px_#121316]">
          <span className="text-xs font-mono-industrial font-black text-black uppercase">
            MERI KAMAI (TOTAL)
          </span>
          <div className="text-3xl sm:text-4xl font-black font-display text-black mt-1">
            ₹{totalEarnings.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] font-mono-industrial font-bold text-neutral-800">
            Across {transactions.length} Verified E-Waste Lots
          </span>
        </div>

        {/* Paid */}
        <div className="bg-white border-3 border-[#121316] p-4 shadow-[4px_4px_0px_#121316]">
          <span className="text-xs font-mono-industrial font-bold text-emerald-800 uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            DISBURSED (PAID)
          </span>
          <div className="text-3xl font-black font-display text-emerald-900 mt-1">
            ₹{paidEarnings.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] font-mono-industrial text-neutral-500">
            Cash Receipts & UPI Synced
          </span>
        </div>

        {/* Pending */}
        <div className="bg-white border-3 border-[#121316] p-4 shadow-[4px_4px_0px_#121316]">
          <span className="text-xs font-mono-industrial font-bold text-amber-800 uppercase flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            PENDING HANDOVERS
          </span>
          <div className="text-3xl font-black font-display text-amber-900 mt-1">
            ₹{pendingEarnings.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] font-mono-industrial text-neutral-500">
            Awaiting Facility Gate Receipt
          </span>
        </div>
      </div>

      {/* BEFORE VS WITH KABADI LINK ECONOMIC IMPACT */}
      <div className="bg-[#121316] text-white border-3 border-black p-4 sm:p-5 mb-6 shadow-[5px_5px_0px_#121316]">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-2 mb-3">
          <span className="text-xs font-mono-industrial font-black text-[#CCFF00] uppercase">
            ECONOMIC ADVANTAGE: STREET INTERMEDIARY VS KABADI LINK
          </span>
          <span className="text-[10px] font-mono-industrial text-neutral-400">
            *ILLUSTRATIVE DEMO COMPARISON
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-neutral-900 p-3 border border-neutral-800">
            <span className="text-[11px] font-mono-industrial text-neutral-400 block">
              BEFORE (Informal Middleman Rates)
            </span>
            <div className="text-xl font-bold font-mono-industrial text-neutral-300 mt-1">
              ₹14,950
            </div>
            <span className="text-[10px] text-neutral-500 font-mono-industrial block mt-1">
              Approx ₹165/KG on PCB · High hidden scale deductions
            </span>
          </div>

          <div className="bg-neutral-900 p-3 border-2 border-[#CCFF00]">
            <span className="text-[11px] font-mono-industrial text-[#CCFF00] font-black block">
              WITH KABADI LINK (Authorized Recycler Match)
            </span>
            <div className="text-2xl font-black font-display text-[#CCFF00] mt-1">
              ₹18,420 <span className="text-xs font-mono-industrial text-white">(+23.2% NET GAIN)</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono-industrial block mt-1">
              Fair Mandi rate + calibrated scale + zero predatory cuts
            </span>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono-industrial font-black text-neutral-800 uppercase">
          TRANSACTION HISTORY ({filteredTxns.length})
        </span>

        <div className="flex gap-1">
          {(['ALL', 'PAID', 'PENDING'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                sounds.playClick();
                setFilterMode(mode);
              }}
              className={`px-3 py-1 font-mono-industrial text-xs font-bold border-2 border-[#121316] ${
                filterMode === mode ? 'bg-[#121316] text-[#CCFF00]' : 'bg-[#F4F1EA] text-neutral-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* TRANSACTIONS LIST */}
      <div className="space-y-3 mb-6">
        {filteredTxns.map((t) => (
          <div
            key={t.id}
            onClick={() => onOpenLotDetails(t.lotId)}
            className="p-4 border-2 border-[#121316] bg-white hover:bg-[#F4F1EA] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer shadow-[3px_3px_0px_#121316]"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black font-mono-industrial text-black">{t.lotId}</span>
                <span className="text-xs font-mono-industrial font-bold bg-[#CCFF00] text-black px-1.5 py-0.5 border border-black">
                  {t.material}
                </span>
                <span className="text-xs font-mono-industrial text-neutral-600 font-bold">
                  {t.weightKg} KG
                </span>
              </div>
              <div className="text-xs font-mono-industrial text-neutral-600 mt-1">
                Recycler: <strong>{t.recyclerName}</strong>
              </div>
              <div className="text-[10px] font-mono-industrial text-neutral-500">
                {t.timestamp} · {t.handoverLocation}
              </div>
            </div>

            <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-none pt-2 sm:pt-0">
              <div className="text-xl font-black font-mono-industrial text-black">
                ₹{t.totalAmount.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`text-[10px] font-mono-industrial font-bold px-1.5 py-0.5 border ${
                    t.paymentStatus === 'PAID'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-500'
                      : 'bg-amber-100 text-amber-800 border-amber-500'
                  }`}
                >
                  {t.paymentStatus} via {t.paymentMethod}
                </span>
                <span className="text-[10px] font-mono-industrial text-neutral-500">
                  {t.paymentRef}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="text-[11px] font-mono-industrial text-neutral-600 bg-[#F4F1EA] p-3 border-2 border-neutral-300 flex items-center justify-between">
        <span>*Digital payments are optional. Formal recyclers disburse in physical Cash or UPI upon physical verification.</span>
        <button
          onClick={() => {
            sounds.playClick();
            alert('Receipt ledger exported as CSV (Demo simulation)');
          }}
          className="underline font-bold text-black hover:text-neutral-800 flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" />
          EXPORT CSV
        </button>
      </div>
    </div>
  );
};
