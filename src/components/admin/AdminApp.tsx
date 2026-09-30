import React, { useState } from 'react';
import { Database, AlertTriangle, ShieldCheck, TrendingUp, Search, Download, Filter, Layers, BarChart3, HelpCircle } from 'lucide-react';
import { MaterialCategory, AnomalyAlert } from '../../types';
import { INITIAL_ANOMALIES, INITIAL_TRANSACTIONS, PRICE_RECORDS, RECYCLERS, UNIT_ECONOMICS_DATA } from '../../data/mockData';
import { sounds } from '../../utils/audio';

interface AdminAppProps {
  onSwitchToCollector: () => void;
  onSwitchToAuditor?: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onSwitchToCollector, onSwitchToAuditor }) => {
  const [activeTab, setActiveTab] = useState<'ANOMALIES' | 'DATASETS' | 'PIPELINE' | 'ECONOMICS'>('ANOMALIES');
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>(INITIAL_ANOMALIES);
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const pipelineStages = [
    { name: 'FIELD COLLECTION', desc: 'Informal scrap collectors scan lot, record approximate weight & photograph.' },
    { name: 'DATA VALIDATION', desc: 'Edge rules verify GPS boundaries, weight bounds, and image tensor resolution.' },
    { name: 'ANONYMIZATION', desc: 'Personal collector identifiers stripped; only anonymized UUID & ward code persisted.' },
    { name: 'DATABASE ENGINE', desc: 'Encrypted document store records immutable lot payload with local caching.' },
    { name: 'AI / COMPUTER VISION', desc: 'Convolutional neural network extracts material category and solder density.' },
    { name: 'PRICE INTELLIGENCE', desc: 'Hedonic regression indexes MMR Mandi rate, international metal futures, and local bids.' },
    { name: 'RECYCLER MATCHING', desc: 'Constraint solver matches nearest authorized facility with highest offered rate.' },
    { name: 'TRACEABILITY GRAPH', desc: 'State machine generates signed digital lot passport with CPCB compliance hash.' },
    { name: 'REPORTING & EPR', desc: 'Aggregated analytics exported to State Pollution Control Board dashboards.' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#121316] pb-12">
      {/* Header */}
      <div className="bg-[#121316] text-white border-b-4 border-black px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#CCFF00] text-black font-mono-industrial font-black text-xs px-2 py-0.5 border border-black uppercase">
                ADMIN & INTELLIGENCE CONSOLE
              </span>
              <span className="text-xs font-mono-industrial text-neutral-400">
                STATE POLLUTION CONTROL BOARD / CPCB PORTAL
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              KABADI LINK DATA GOVERNANCE
            </h2>
          </div>

          <button
            onClick={onSwitchToCollector}
            className="px-3 py-1.5 bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 font-mono-industrial text-xs font-bold self-start md:self-auto"
          >
            ← SWITCH TO COLLECTOR APP
          </button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="bg-white border-b-3 border-[#121316] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-none py-2 font-mono-industrial text-xs font-black">
          {[
            { id: 'ANOMALIES', label: 'TRANSACTION ANOMALY DETECTION (AI)' },
            { id: 'DATASETS', label: 'MATERIAL & TRANSACTION DATASETS' },
            { id: 'PIPELINE', label: 'DATA LIFECYCLE PIPELINE' },
            { id: 'ECONOMICS', label: 'PLATFORM UNIT ECONOMICS' }
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* TAB 1: ANOMALY DETECTION */}
        {activeTab === 'ANOMALIES' && (
          <div className="space-y-6">
            <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-3 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black font-display uppercase">
                    AI TRANSACTION ANOMALY SURVEILLANCE
                  </h3>
                  <p className="text-xs font-mono-industrial text-neutral-600 mt-0.5">
                    Flagging statistical price outliers, unusual weight ratios, and duplicate lots.
                    <strong> Never labeled as fraud — flagged for verification.</strong>
                  </p>
                </div>
                <div className="px-3 py-1 bg-amber-100 border border-amber-600 text-amber-900 font-mono-industrial text-xs font-bold">
                  {anomalies.length} ALERTS FLAGGED
                </div>
              </div>

              <div className="space-y-4">
                {anomalies.map((anom) => (
                  <div
                    key={anom.id}
                    className="p-5 border-3 border-black bg-[#FFF9F2] shadow-[4px_4px_0px_#000]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-300 pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#EE1111] text-white font-mono-industrial font-black text-xs px-2 py-0.5 border border-black uppercase">
                          RISK LEVEL: {anom.riskLevel}
                        </span>
                        <span className="font-mono-industrial font-black text-sm text-black">
                          {anom.id} · LOT: {anom.lotId}
                        </span>
                      </div>
                      <span className="text-xs font-mono-industrial font-bold bg-amber-200 text-amber-900 px-2 py-0.5 border border-amber-400">
                        {anom.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="md:col-span-2">
                        <div className="text-sm font-black font-display text-red-950 uppercase mb-1">
                          WHY FLAGGED? {anom.flagReason}
                        </div>
                        <p className="text-xs font-mono-industrial text-neutral-800 leading-relaxed font-medium">
                          {anom.explanation}
                        </p>
                      </div>

                      <div className="bg-white p-3 border-2 border-black text-xs font-mono-industrial space-y-1">
                        <div>Material: <strong>{anom.material}</strong></div>
                        <div>Quoted Rate: <strong className="text-red-700">₹{anom.quotedPrice}/KG</strong></div>
                        <div>Market Median: <strong>₹{anom.historicalMedian}/KG</strong></div>
                        <div>Deviation: <strong className="text-red-700">{anom.deviationPct}%</strong></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-200 text-xs font-mono-industrial">
                      <span className="text-neutral-600">Reported Facility: <strong>{anom.recyclerName}</strong></span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            sounds.playSuccess();
                            setAnomalies(anomalies.filter((a) => a.id !== anom.id));
                          }}
                          className="px-3 py-1 bg-white hover:bg-neutral-100 border border-black font-bold"
                        >
                          DISMISS (VERIFIED LEGITIMATE)
                        </button>
                        <button
                          onClick={() => {
                            sounds.playSuccess();
                            if (onSwitchToAuditor) {
                              onSwitchToAuditor();
                            } else {
                              alert(`Verification ticket issued to Field Inspector for Lot ${anom.lotId}`);
                            }
                          }}
                          className="px-3 py-1 bg-[#121316] text-[#CCFF00] font-bold border border-black hover:bg-neutral-800"
                        >
                          DISPATCH FIELD AUDITOR →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DATASETS EXPLORER */}
        {activeTab === 'DATASETS' && (
          <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-3 mb-4">
              <div>
                <h3 className="text-2xl font-black font-display uppercase">
                  CENTRAL TRANSACTION & LOT REPOSITORY
                </h3>
                <span className="text-xs font-mono-industrial text-neutral-500 font-bold">
                  Immutable records with data quality indicators
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    alert('Full dataset exported as CSV (Demo simulation)');
                  }}
                  className="px-3 py-1.5 bg-[#CCFF00] text-black border-2 border-black font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT CSV</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono-industrial text-xs border-collapse">
                <thead>
                  <tr className="bg-[#121316] text-white border-2 border-black">
                    <th className="p-2.5">LOT ID</th>
                    <th className="p-2.5">MATERIAL</th>
                    <th className="p-2.5">WEIGHT</th>
                    <th className="p-2.5">RATE</th>
                    <th className="p-2.5">TOTAL</th>
                    <th className="p-2.5">RECYCLER</th>
                    <th className="p-2.5">PAYMENT</th>
                    <th className="p-2.5">QUALITY STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {INITIAL_TRANSACTIONS.map((txn, i) => (
                    <tr key={txn.id} className="border-b border-neutral-300 hover:bg-[#F4F1EA]">
                      <td className="p-2.5 font-bold text-black">{txn.lotId}</td>
                      <td className="p-2.5 font-bold">{txn.material}</td>
                      <td className="p-2.5">{txn.weightKg} KG</td>
                      <td className="p-2.5">₹{txn.ratePerKg}/KG</td>
                      <td className="p-2.5 font-bold">₹{txn.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 truncate max-w-[160px]">{txn.recyclerName}</td>
                      <td className="p-2.5">
                        <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 border border-emerald-400 font-bold">
                          {txn.paymentMethod}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 border border-emerald-600 font-bold">
                          ✓ VALID
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DATA LIFECYCLE PIPELINE */}
        {activeTab === 'PIPELINE' && (
          <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000]">
            <div className="border-b-2 border-black pb-3 mb-6">
              <h3 className="text-2xl font-black font-display uppercase">
                KABADI LINK DATA LIFECYCLE PIPELINE
              </h3>
              <p className="text-xs font-mono-industrial text-neutral-600">
                Interactive architecture for Smart India Hackathon jury review. Click any stage to inspect transformation details.
              </p>
            </div>

            {/* Pipeline Stage Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {pipelineStages.map((st, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedPipelineStage(i);
                  }}
                  className={`p-3.5 border-2 text-left font-mono-industrial transition-all ${
                    selectedPipelineStage === i
                      ? 'bg-[#121316] text-[#CCFF00] border-black shadow-[4px_4px_0px_#CCFF00]'
                      : 'bg-[#F4F1EA] text-neutral-800 border-[#121316] hover:bg-white'
                  }`}
                >
                  <div className="text-[10px] font-bold opacity-60">STAGE 0{i + 1}</div>
                  <div className="text-sm font-black mt-0.5 uppercase">{st.name}</div>
                </button>
              ))}
            </div>

            {/* Active Stage Detailed Breakdown */}
            <div className="bg-[#121316] text-white p-5 border-3 border-black">
              <span className="text-[10px] font-mono-industrial text-[#CCFF00] font-black uppercase">
                STAGE 0{selectedPipelineStage + 1} SPECIFICATION
              </span>
              <h4 className="text-2xl font-black font-display text-white mt-1 uppercase">
                {pipelineStages[selectedPipelineStage].name}
              </h4>
              <p className="text-sm font-mono-industrial text-neutral-300 mt-2 font-medium">
                {pipelineStages[selectedPipelineStage].desc}
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: UNIT ECONOMICS */}
        {activeTab === 'ECONOMICS' && (
          <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000]">
            <div className="border-b-2 border-black pb-3 mb-5">
              <span className="text-[10px] font-mono-industrial font-black bg-[#CCFF00] text-black px-2 py-0.5 border border-black uppercase">
                SUSTAINABILITY & FINANCIAL VIABILITY
              </span>
              <h3 className="text-2xl font-black font-display uppercase mt-1">
                PLATFORM UNIT ECONOMICS & MARGIN ANALYSIS
              </h3>
              <p className="text-xs font-mono-industrial text-neutral-600 mt-0.5 italic">
                *Illustrative assumptions for prototype demonstration.
              </p>
            </div>

            {/* Base Assumptions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono-industrial text-xs">
              <div className="bg-[#F4F1EA] p-3 border-2 border-black">
                <span className="text-neutral-500 font-bold block">AVG TRANSACTION VALUE</span>
                <span className="text-xl font-black text-black">₹3,792.50</span>
                <span className="text-[10px] text-neutral-600">~18.5 KG at ₹205/KG</span>
              </div>

              <div className="bg-[#F4F1EA] p-3 border-2 border-black">
                <span className="text-neutral-500 font-bold block">RECYCLER SERVICE FEE</span>
                <span className="text-xl font-black text-emerald-800">1.50%</span>
                <span className="text-[10px] text-neutral-600">Zero fee on collectors</span>
              </div>

              <div className="bg-[#F4F1EA] p-3 border-2 border-black">
                <span className="text-neutral-500 font-bold block">PLATFORM REVENUE / LOT</span>
                <span className="text-xl font-black text-black">₹56.88</span>
                <span className="text-[10px] text-neutral-600">Recycler commission</span>
              </div>

              <div className="bg-[#F4F1EA] p-3 border-2 border-black">
                <span className="text-neutral-500 font-bold block">CLOUD & FIELD COST</span>
                <span className="text-xl font-black text-black">₹22.50</span>
                <span className="text-[10px] text-neutral-600">SMS + Serverless run</span>
              </div>
            </div>

            {/* Volume Sensitivity Matrix */}
            <h4 className="text-base font-black font-display uppercase mb-3">
              SCALE SENSITIVITY TABLE
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono-industrial text-xs border-collapse">
                <thead>
                  <tr className="bg-[#121316] text-white border-2 border-black">
                    <th className="p-2.5">TIER</th>
                    <th className="p-2.5">VOLUME / MONTH</th>
                    <th className="p-2.5">TOTAL TURNOVER</th>
                    <th className="p-2.5">PLATFORM FEE (1.5%)</th>
                    <th className="p-2.5">OPERATING EXPENSE</th>
                    <th className="p-2.5">NET CONTRIBUTION</th>
                    <th className="p-2.5">CONTRIBUTION MARGIN</th>
                  </tr>
                </thead>
                <tbody>
                  {UNIT_ECONOMICS_DATA.scenarios.map((sc, i) => (
                    <tr key={i} className="border-b border-neutral-300 hover:bg-[#F4F1EA]">
                      <td className="p-2.5 font-black text-black">{sc.name}</td>
                      <td className="p-2.5">{sc.lotsPerMonth.toLocaleString('en-IN')} Lots</td>
                      <td className="p-2.5">₹{(sc.turnoverInr / 100000).toFixed(1)} Lakhs</td>
                      <td className="p-2.5 font-bold text-emerald-800">
                        ₹{sc.platformFeeInr.toLocaleString('en-IN')}
                      </td>
                      <td className="p-2.5 text-neutral-600">
                        ₹{sc.operationalCostInr.toLocaleString('en-IN')}
                      </td>
                      <td className="p-2.5 font-black text-black">
                        ₹{sc.netContributionInr.toLocaleString('en-IN')}
                      </td>
                      <td className="p-2.5 font-black text-emerald-700">
                        {sc.marginPct}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
