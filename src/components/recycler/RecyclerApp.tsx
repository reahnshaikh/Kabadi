import React, { useState } from 'react';
import { Truck, Check, X, ShieldCheck, Clock, ArrowRight, IndianRupee, RefreshCw, Calendar, MapPin } from 'lucide-react';
import { MaterialLot, Language, Recycler } from '../../types';
import { INITIAL_LOTS, RECYCLERS } from '../../data/mockData';
import { MaterialSvgGraphic } from '../brutalist/MaterialSvgGraphic';
import { sounds } from '../../utils/audio';

interface RecyclerAppProps {
  language: Language;
  onSwitchToCollector: () => void;
  onOpenTraceability: () => void;
}

export const RecyclerApp: React.FC<RecyclerAppProps> = ({
  language,
  onSwitchToCollector,
  onOpenTraceability
}) => {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'INCOMING' | 'PICKUP' | 'STATUS'>('DASHBOARD');
  const [lots, setLots] = useState<MaterialLot[]>(INITIAL_LOTS);
  const [recyclingStatus, setRecyclingStatus] = useState<string>('Depopulating circuit boards (260°C)');

  const myRecycler = RECYCLERS[0]; // GreenLoop

  const incomingLots = lots.filter((l) => l.status !== 'RECYCLED');
  const completedCount = lots.filter((l) => l.status === 'HANDOVER_COMPLETED' || l.status === 'PAID').length;
  const todayPurchaseValue = lots.reduce((acc, l) => acc + (l.paymentAmount || l.estimatedValue), 0);

  const handleUpdateStatus = (newStatus: string) => {
    sounds.playSuccess();
    setRecyclingStatus(newStatus);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#121316] pb-12">
      {/* Sub Header for Recycler */}
      <div className="bg-[#121316] text-white border-b-4 border-black px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#CCFF00] text-black font-mono-industrial font-black text-xs px-2 py-0.5 border border-black uppercase">
                AUTHORIZED RECYCLER PORTAL
              </span>
              <span className="text-xs font-mono-industrial text-neutral-400">
                CPCB-REG-EW/MH-1092/2024
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              {myRecycler.name}
            </h2>
            <p className="text-xs font-mono-industrial text-neutral-400">
              Facility: {myRecycler.facility} · {myRecycler.serviceArea}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToCollector}
              className="px-3 py-1.5 bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 font-mono-industrial text-xs font-bold"
            >
              ← SWITCH TO COLLECTOR APP
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white border-b-3 border-[#121316] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-none py-2 font-mono-industrial text-xs font-black">
          {[
            { id: 'DASHBOARD', label: 'DASHBOARD' },
            { id: 'INCOMING', label: `INCOMING LOTS (${incomingLots.length})` },
            { id: 'PICKUP', label: 'SCHEDULED PICKUPS' },
            { id: 'STATUS', label: 'UPDATE RECYCLING STATUS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id as unknown as typeof activeTab);
              }}
              className={`px-4 py-2 border-2 border-[#121316] transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#121316] text-[#CCFF00] shadow-[2px_2px_0px_#CCFF00]'
                  : 'bg-[#F4F1EA] text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* DASHBOARD TAB */}
        {activeTab === 'DASHBOARD' && (
          <div>
            {/* KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 border-3 border-black shadow-[4px_4px_0px_#000]">
                <span className="text-xs font-mono-industrial text-neutral-500 font-bold uppercase block">
                  TODAY'S PURCHASE VALUE
                </span>
                <div className="text-3xl font-black font-display text-black mt-1">
                  ₹{todayPurchaseValue.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] font-mono-industrial text-emerald-700 font-bold">
                  ✓ 100% Formal Bank/Cash Receipts
                </span>
              </div>

              <div className="bg-white p-4 border-3 border-black shadow-[4px_4px_0px_#000]">
                <span className="text-xs font-mono-industrial text-neutral-500 font-bold uppercase block">
                  PENDING HANDOVERS
                </span>
                <div className="text-3xl font-black font-display text-amber-700 mt-1">
                  {incomingLots.length}
                </div>
                <span className="text-[10px] font-mono-industrial text-neutral-500 font-bold">
                  Awaiting Weighment at Gate
                </span>
              </div>

              <div className="bg-white p-4 border-3 border-black shadow-[4px_4px_0px_#000]">
                <span className="text-xs font-mono-industrial text-neutral-500 font-bold uppercase block">
                  ACCEPTED LOTS THIS MONTH
                </span>
                <div className="text-3xl font-black font-display text-black mt-1">
                  38
                </div>
                <span className="text-[10px] font-mono-industrial text-neutral-500 font-bold">
                  Total Weight: 1,840 KG
                </span>
              </div>

              <div className="bg-[#CCFF00] p-4 border-3 border-black shadow-[4px_4px_0px_#000]">
                <span className="text-xs font-mono-industrial text-neutral-800 font-bold uppercase block">
                  CPCB EPR TARGET PROGRESS
                </span>
                <div className="text-3xl font-black font-display text-black mt-1">
                  84.2%
                </div>
                <span className="text-[10px] font-mono-industrial text-black font-bold">
                  Target: 25 Tons / Quarter
                </span>
              </div>
            </div>

            {/* Quick Action Queue */}
            <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000] mb-6">
              <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
                <h3 className="text-xl font-black font-display uppercase">
                  ACTIVE LOTS PENDING CONFIRMATION
                </h3>
                <span className="text-xs font-mono-industrial text-neutral-500 font-bold">
                  REAL-TIME DISPATCH QUEUE
                </span>
              </div>

              <div className="space-y-3">
                {incomingLots.map((lot) => (
                  <div
                    key={lot.id}
                    className="p-4 border-2 border-black bg-[#F4F1EA] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 border-2 border-black bg-black shrink-0">
                        <MaterialSvgGraphic material={lot.category} className="w-full h-full" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-industrial font-black text-sm text-black">{lot.id}</span>
                          <span className="bg-[#CCFF00] text-black text-xs font-mono-industrial font-bold px-1.5 border border-black">
                            {lot.category}
                          </span>
                          <span className="text-xs font-mono-industrial font-bold text-neutral-700">
                            {lot.weightKg} KG
                          </span>
                        </div>
                        <div className="text-xs font-mono-industrial text-neutral-600 mt-1">
                          Location: <strong>{lot.locationName}</strong> · Ref: {lot.handoverRef || 'Awaiting Gate'}
                        </div>
                        <div className="text-[11px] font-mono-industrial text-neutral-500">
                          Collector: <strong>COL-MH-4421 (Rameshwar Shinde)</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <div className="text-right mr-3">
                        <div className="text-[10px] font-mono-industrial text-neutral-500 font-bold">OFFER / PAYOUT</div>
                        <div className="text-xl font-black font-display text-black">
                          ₹{(lot.paymentAmount || lot.estimatedValue).toLocaleString('en-IN')}
                        </div>
                      </div>

                      <button
                        onClick={onOpenTraceability}
                        className="px-3 py-2 bg-[#121316] text-[#CCFF00] font-mono-industrial text-xs font-bold border border-black hover:bg-neutral-800"
                      >
                        VIEW TRACEABILITY
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INCOMING LOTS TAB */}
        {activeTab === 'INCOMING' && (
          <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000]">
            <h3 className="text-2xl font-black font-display uppercase mb-4">
              ALL INCOMING LOTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lots.map((lot) => (
                <div key={lot.id} className="p-4 border-2 border-black bg-[#F4F1EA]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-industrial font-black text-sm">{lot.id}</span>
                    <span className="text-xs font-mono-industrial font-bold bg-[#CCFF00] px-2 py-0.5 border border-black">
                      {lot.status}
                    </span>
                  </div>
                  <div className="h-32 mb-2 bg-black border border-black">
                    <MaterialSvgGraphic material={lot.category} className="w-full h-full" />
                  </div>
                  <div className="text-xs font-mono-industrial space-y-1">
                    <div>Material: <strong>{lot.category} ({lot.subcategory})</strong></div>
                    <div>Weight: <strong>{lot.weightKg} KG</strong> · Condition: {lot.condition}</div>
                    <div>Location: <strong>{lot.locationName}</strong></div>
                    <div>Disbursed: <strong className="text-emerald-800">₹{lot.paymentAmount || lot.estimatedValue}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PICKUP SCHEDULE TAB */}
        {activeTab === 'PICKUP' && (
          <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000]">
            <h3 className="text-2xl font-black font-display uppercase mb-4">
              SCHEDULED PICKUP VAN FLEET
            </h3>
            <div className="border-2 border-black p-4 bg-[#F4F1EA] mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="w-6 h-6 text-[#121316]" />
                <span className="font-mono-industrial font-black text-base">VAN #MH-04-KU-8821</span>
                <span className="bg-emerald-400 text-black text-xs font-mono-industrial font-bold px-2 py-0.5 border border-black">
                  EN ROUTE
                </span>
              </div>
              <div className="text-xs font-mono-industrial text-neutral-700">
                Route: Kanjurmarg → Dharavi 90ft Road → Kurla MIDC
                <br />
                Scheduled pickup: 18.5 KG PCB from Collector Rameshwar Shinde
              </div>
            </div>
          </div>
        )}

        {/* RECYCLING STATUS TAB */}
        {activeTab === 'STATUS' && (
          <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000] max-w-2xl">
            <h3 className="text-2xl font-black font-display uppercase mb-2">
              UPDATE RECYCLING STATUS
            </h3>
            <p className="text-xs font-mono-industrial text-neutral-600 mb-4">
              Update the scientific recycling stage for EPR compliance and tamper-evident blockchain proof.
            </p>

            <div className="bg-[#121316] text-white p-4 border-2 border-black mb-4">
              <span className="text-[10px] font-mono-industrial text-neutral-400 uppercase">CURRENT STATUS</span>
              <div className="text-lg font-black font-mono-industrial text-[#CCFF00] mt-1">
                {recyclingStatus}
              </div>
            </div>

            <div className="space-y-2">
              {[
                'Physical shredding & magnetic separation',
                'Depopulating circuit boards (260°C desoldering)',
                'ISO 14001 Closed-Loop Smelting Chamber',
                'Hydrometallurgical Copper, Silver & Gold extraction complete'
              ].map((st) => (
                <button
                  key={st}
                  onClick={() => handleUpdateStatus(st)}
                  className={`w-full text-left p-3 border-2 border-black font-mono-industrial text-xs font-bold transition-all ${
                    recyclingStatus === st
                      ? 'bg-[#CCFF00] text-black shadow-[2px_2px_0px_#000]'
                      : 'bg-[#F4F1EA] text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
