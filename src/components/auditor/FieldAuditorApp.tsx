import React, { useState } from 'react';
import {
  ShieldAlert,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Compass,
  FileText,
  Scale,
  Camera,
  Check,
  X,
  Printer,
  UserCheck,
  Send,
  Navigation,
  Phone
} from 'lucide-react';
import { AuditorTicket, Language, TicketStatus, UserAccount } from '../../types';
import { INITIAL_AUDITOR_TICKETS } from '../../data/mockData';
import { MaterialSvgGraphic } from '../brutalist/MaterialSvgGraphic';
import { sounds } from '../../utils/audio';

interface FieldAuditorAppProps {
  language: Language;
  currentUser: UserAccount | null;
  onOpenAuth: () => void;
  onSwitchToRole: (role: 'collector' | 'recycler' | 'admin' | 'landing') => void;
}

export const FieldAuditorApp: React.FC<FieldAuditorAppProps> = ({
  language,
  currentUser,
  onOpenAuth,
  onSwitchToRole
}) => {
  const [tickets, setTickets] = useState<AuditorTicket[]>(INITIAL_AUDITOR_TICKETS);
  const [selectedTicketId, setSelectedTicketId] = useState<string>(INITIAL_AUDITOR_TICKETS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'RESOLVED'>('ALL');
  const [activeTab, setActiveTab] = useState<'QUEUE' | 'MAP' | 'REPORT'>('QUEUE');

  // Investigation form state
  const [scaleValid, setScaleValid] = useState<boolean>(false);
  const [purityMatch, setPurityMatch] = useState<boolean>(true);
  const [verifiedWeight, setVerifiedWeight] = useState<number>(28.0);
  const [correctiveRate, setCorrectiveRate] = useState<number>(205);
  const [notes, setNotes] = useState<string>(
    'Conducted surprise on-site audit at Kurla shed. Aggregator attempted to classify high-grade FR-4 server motherboards as low-grade phenolic single-sided boards. Mechanical spring scale showed +3.5kg error margin.'
  );
  const [resolutionChoice, setResolutionChoice] = useState<TicketStatus>('PRICE_CORRECTED');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  // Filtering
  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.lotId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.recyclerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.collectorName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'ACTIVE') return t.status === 'INVESTIGATION_ACTIVE' || t.status === 'PENDING_DISPATCH';
    if (statusFilter === 'RESOLVED') return t.status === 'RESOLVED_LEGITIMATE' || t.status === 'PRICE_CORRECTED' || t.status === 'FACILITY_FLAGGED';
    return true;
  });

  const handleSelectTicket = (t: AuditorTicket) => {
    sounds.playClick();
    setSelectedTicketId(t.id);
    setVerifiedWeight(t.verifiedWeightKg || t.reportedWeightKg);
    setCorrectiveRate(t.fairBenchmarkRate);
    setNotes(t.inspectionNotes || '');
    setResolutionChoice(t.status === 'PENDING_DISPATCH' ? 'INVESTIGATION_ACTIVE' : t.status);
    setReportSubmitted(t.status === 'RESOLVED_LEGITIMATE' || t.status === 'PRICE_CORRECTED');
  };

  const handleSubmitResolution = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();

    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              status: resolutionChoice,
              verifiedWeightKg: verifiedWeight,
              correctiveRatePerKg: resolutionChoice === 'PRICE_CORRECTED' ? correctiveRate : undefined,
              inspectionNotes: notes,
              scaleCalibrationValid: scaleValid,
              materialPurityMatch: purityMatch,
              updatedAt: '2026-09-29 12:45 PM',
              actionTaken:
                resolutionChoice === 'PRICE_CORRECTED'
                  ? `Recycler ordered to disburse shortfall at ₹${correctiveRate}/KG. Collector compensated ₹${(
                      correctiveRate * verifiedWeight -
                      t.totalQuotedAmount
                    ).toLocaleString('en-IN')}. Scale sealed for recalibration.`
                  : resolutionChoice === 'FACILITY_FLAGGED'
                  ? 'Facility suspended from Kabadi Link platform. Notice issued under Rule 16 of E-Waste Management Rules 2022.'
                  : 'Case closed as legitimate market variation.'
            }
          : t
      )
    );

    setReportSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#121316] pb-16 font-sans">
      {/* Top Auditor Command Header */}
      <div className="bg-[#121316] text-white border-b-4 border-black px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#FF5500] text-white font-mono-industrial font-black text-xs px-2 py-0.5 border border-white uppercase">
                STATE POLLUTION CONTROL BOARD (MPCB)
              </span>
              <span className="text-xs font-mono-industrial text-neutral-400">
                FIELD VERIFICATION DISPATCH
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              FIELD AUDITOR VERIFICATION CONSOLE
            </h2>
            <div className="text-xs font-mono-industrial text-neutral-400 flex flex-wrap items-center gap-3 mt-0.5">
              <span>Auditor: <strong className="text-[#CCFF00]">{currentUser?.name || 'Inspector Anil Gaikwad'}</strong></span>
              <span>·</span>
              <span>Badge: <strong>{currentUser?.badgeNumber || 'AUD-MPCB-0941'}</strong></span>
              <span>·</span>
              <span>Sector: <strong>{currentUser?.wardArea || 'Kurla & Dharavi Industrial Wards'}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-[#CCFF00] font-mono-industrial text-xs font-black border border-neutral-600 flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{currentUser ? 'SWITCH USER' : 'STAFF LOGIN'}</span>
            </button>

            <button
              onClick={() => onSwitchToRole('collector')}
              className="px-3 py-1.5 bg-white text-black hover:bg-neutral-200 font-mono-industrial text-xs font-black border border-black"
            >
              ← COLLECTOR APP
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="bg-white border-b-3 border-[#121316] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 py-2 font-mono-industrial text-xs font-black">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'QUEUE', label: `VERIFICATION TICKETS (${tickets.length})` },
              { id: 'MAP', label: 'TACTICAL ANOMALY MAP' },
              { id: 'REPORT', label: 'ACTIVE INSPECTION REPORT' }
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

          {/* Quick Ticket Stats Pills */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="px-2 py-1 bg-red-100 border border-red-500 text-red-900 text-[11px] font-bold">
              2 HIGH RISK
            </span>
            <span className="px-2 py-1 bg-amber-100 border border-amber-500 text-amber-900 text-[11px] font-bold">
              1 ACTIVE AUDIT
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* VIEW 1: MAP VIEW */}
        {activeTab === 'MAP' && (
          <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000] mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono-industrial font-black bg-[#121316] text-[#CCFF00] px-2 py-0.5 border border-black uppercase">
                  GEOSPATIAL AUDIT RADAR
                </span>
                <h3 className="text-2xl font-black font-display uppercase mt-1">
                  MUMBAI METROPOLITAN FLAGGED TRANSACTIONS MAP
                </h3>
              </div>
              <div className="text-xs font-mono-industrial text-neutral-600">
                Auditor Base: <strong>Dharavi Sector 3 Police Station Camp</strong>
              </div>
            </div>

            {/* Tactical Dark Map Canvas Simulation */}
            <div className="relative w-full h-80 sm:h-96 bg-[#181B22] border-3 border-black overflow-hidden flex items-center justify-center">
              {/* Radar Grid Circles */}
              <div className="absolute w-44 h-44 border border-neutral-700/80 rounded-full" />
              <div className="absolute w-80 h-80 border border-neutral-700/60 rounded-full" />
              <div className="absolute w-[440px] h-[440px] border border-neutral-700/40 rounded-full" />
              <div className="absolute w-[600px] h-[600px] border border-neutral-700/20 rounded-full" />

              {/* Grid Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-neutral-700/40" />
                <div className="h-full w-[1px] bg-neutral-700/40 -ml-[1px]" />
              </div>

              {/* Center Auditor Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-6 h-6 bg-[#0044FF] border-2 border-white flex items-center justify-center text-white text-[10px] font-black animate-pulse">
                  AU
                </div>
                <span className="text-[10px] font-mono-industrial font-black bg-black text-[#CCFF00] px-1.5 py-0.5 mt-1 border border-[#CCFF00]">
                  OFFICER LOCATION (YOU)
                </span>
              </div>

              {/* Anomaly Map Pins */}
              {tickets.map((t) => {
                const isSelected = selectedTicketId === t.id;
                // Pin positions relative to center
                const pinStyle =
                  t.id === 'TCK-2026-081'
                    ? { top: '30%', right: '32%' }
                    : t.id === 'TCK-2026-079'
                    ? { bottom: '38%', left: '38%' }
                    : t.id === 'TCK-2026-074'
                    ? { top: '15%', right: '15%' }
                    : { bottom: '22%', right: '25%' };

                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedTicketId(t.id);
                      setActiveTab('REPORT');
                    }}
                    style={pinStyle}
                    className="absolute z-20 flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-6 h-6 border-2 border-black flex items-center justify-center text-[10px] font-black transition-transform group-hover:scale-125 ${
                        t.riskLevel === 'HIGH'
                          ? 'bg-[#EE1111] text-white animate-bounce'
                          : t.riskLevel === 'MEDIUM'
                          ? 'bg-[#FF5500] text-white'
                          : 'bg-emerald-400 text-black'
                      } ${isSelected ? 'ring-4 ring-white' : ''}`}
                    >
                      !
                    </div>
                    <span className="text-[10px] font-mono-industrial font-black bg-[#121316] text-white px-2 py-0.5 mt-1 border border-neutral-600 shadow-[2px_2px_0px_#000] truncate max-w-[170px]">
                      {t.lotId} ({t.distanceKm}KM)
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-industrial bg-[#F4F1EA] p-3 border-2 border-black">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-3 h-3 bg-[#EE1111] border border-black" />
                  HIGH RISK (URGENT DISPATCH)
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-3 h-3 bg-[#FF5500] border border-black" />
                  MEDIUM RISK (TRANSACTION REVIEW)
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-3 h-3 bg-emerald-400 border border-black" />
                  RESOLVED / AUDITED
                </span>
              </div>
              <span className="text-neutral-500 font-bold">CLICK PIN TO OPEN ON-SITE AUDIT REPORT</span>
            </div>
          </div>
        )}

        {/* WORKSPACE GRID: LEFT QUEUE, RIGHT INVESTIGATION WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT 5 COLS: TICKETS QUEUE */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-black font-display uppercase">
                  VERIFICATION QUEUE
                </h3>
                <span className="text-xs font-mono-industrial font-bold text-neutral-500">
                  {filteredTickets.length} TICKETS
                </span>
              </div>

              {/* Search bar */}
              <div className="relative mb-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Lot ID (e.g. KL-2026-004902)..."
                  className="w-full bg-[#F4F1EA] border-2 border-black px-3 py-2 text-xs font-mono-industrial font-bold text-black focus:outline-none focus:bg-white"
                />
                <Search className="w-4 h-4 text-neutral-500 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>

              {/* Filter tabs */}
              <div className="flex gap-1 mb-4">
                {(['ALL', 'ACTIVE', 'RESOLVED'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`flex-1 py-1 text-center font-mono-industrial text-xs font-bold border-2 border-black ${
                      statusFilter === filter ? 'bg-[#121316] text-[#CCFF00]' : 'bg-[#F4F1EA] text-neutral-700'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Tickets list */}
              <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                {filteredTickets.map((t) => {
                  const isSelected = selectedTicketId === t.id;

                  return (
                    <div
                      key={t.id}
                      onClick={() => handleSelectTicket(t)}
                      className={`p-3.5 border-3 transition-all cursor-pointer select-none text-xs font-mono-industrial ${
                        isSelected
                          ? 'bg-white border-black shadow-[4px_4px_0px_#000] ring-2 ring-[#CCFF00]'
                          : 'bg-[#F4F1EA] border-neutral-700 hover:bg-white hover:border-black'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-black text-black">{t.lotId}</span>
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 border border-black uppercase ${
                            t.riskLevel === 'HIGH'
                              ? 'bg-[#EE1111] text-white'
                              : t.riskLevel === 'MEDIUM'
                              ? 'bg-[#FF5500] text-white'
                              : 'bg-emerald-200 text-emerald-950'
                          }`}
                        >
                          {t.riskLevel} RISK
                        </span>
                      </div>

                      <div className="font-bold text-black text-sm mb-1 leading-tight">
                        {t.flagReason}
                      </div>

                      <div className="text-neutral-600 space-y-0.5">
                        <div>Material: <strong>{t.material} ({t.reportedWeightKg} KG)</strong></div>
                        <div>Target Recycler: <strong>{t.recyclerName}</strong></div>
                        <div className="text-red-700">
                          Quoted: <strong>₹{t.quotedRatePerKg}/KG</strong> vs Mandi: <strong>₹{t.fairBenchmarkRate}/KG</strong>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-neutral-300 flex items-center justify-between text-[10px]">
                        <span className="text-neutral-500">{t.distanceKm} KM AWAY</span>
                        <span className={`font-bold px-1.5 py-0.5 border ${
                          t.status === 'INVESTIGATION_ACTIVE'
                            ? 'bg-amber-100 text-amber-900 border-amber-500'
                            : t.status === 'PRICE_CORRECTED' || t.status === 'RESOLVED_LEGITIMATE'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-500'
                            : 'bg-neutral-200 text-neutral-800 border-neutral-400'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLS: ACTIVE INVESTIGATION WORKSPACE */}
          <div className="lg:col-span-7">
            <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#000]">
              <div className="flex flex-wrap items-center justify-between border-b-2 border-black pb-3 mb-4 gap-2">
                <div>
                  <span className="text-[10px] font-mono-industrial font-black bg-[#CCFF00] text-black px-2 py-0.5 border border-black uppercase">
                    ON-SITE AUDIT DOSSIER
                  </span>
                  <h3 className="text-2xl font-black font-display uppercase mt-1">
                    LOT #{selectedTicket.lotId}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono-industrial font-black px-2 py-1 border border-black ${
                    selectedTicket.status === 'PRICE_CORRECTED' || selectedTicket.status === 'RESOLVED_LEGITIMATE'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#FF5500] text-white'
                  }`}>
                    {selectedTicket.status}
                  </span>
                </div>
              </div>

              {/* Target Incident Meta Card */}
              <div className="bg-[#F4F1EA] border-2 border-black p-4 mb-5 text-xs font-mono-industrial">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <span className="text-neutral-500 block font-bold">FLAGGED SHED / FACILITY</span>
                    <span className="font-black text-black text-sm">{selectedTicket.recyclerName}</span>
                    <span className="text-neutral-600 block mt-0.5">{selectedTicket.facilityLocation}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 block font-bold">REPORTING COLLECTOR</span>
                    <span className="font-black text-black text-sm">{selectedTicket.collectorName}</span>
                    <span className="text-neutral-600 block mt-0.5">{selectedTicket.collectorContact}</span>
                  </div>
                </div>

                {/* Evidence Graphics Strip */}
                <div className="border-t border-neutral-300 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="h-28 bg-black border border-black">
                    <MaterialSvgGraphic material={selectedTicket.material} className="w-full h-full" />
                  </div>

                  <div className="sm:col-span-2 bg-white p-3 border border-black space-y-1">
                    <span className="font-black text-red-900 block">AI STATISTICAL ANOMALY TRIGGER:</span>
                    <p className="text-neutral-800 font-bold leading-tight">{selectedTicket.flagReason}</p>
                    <div className="pt-2 text-[11px] text-neutral-600 flex items-center justify-between">
                      <span>Quoted Payout: <strong>₹{selectedTicket.totalQuotedAmount.toLocaleString('en-IN')}</strong></span>
                      <span>Fair Benchmark: <strong>₹{(selectedTicket.fairBenchmarkRate * selectedTicket.reportedWeightKg).toLocaleString('en-IN')}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ON-SITE PHYSICAL AUDIT FORM */}
              <form onSubmit={handleSubmitResolution} className="space-y-4">
                <div className="border-2 border-black p-4 bg-white">
                  <h4 className="font-mono-industrial font-black text-sm uppercase text-black mb-3 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#0044FF]" />
                    <span>PHYSICAL MEASUREMENTS & SENSORY CHECKLIST</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-industrial">
                    {/* Scale Calibration Check */}
                    <div>
                      <label className="font-bold text-neutral-700 block mb-1">
                        FACILITY SCALE CALIBRATION STAMP:
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setScaleValid(true)}
                          className={`flex-1 py-2 font-bold border-2 border-black ${
                            scaleValid ? 'bg-emerald-500 text-white' : 'bg-[#F4F1EA] text-neutral-800'
                          }`}
                        >
                          ✓ VALID STAMP
                        </button>
                        <button
                          type="button"
                          onClick={() => setScaleValid(false)}
                          className={`flex-1 py-2 font-bold border-2 border-black ${
                            !scaleValid ? 'bg-[#EE1111] text-white' : 'bg-[#F4F1EA] text-neutral-800'
                          }`}
                        >
                          ⚠ TAMPERED / EXPIRED
                        </button>
                      </div>
                    </div>

                    {/* Material Purity Match */}
                    <div>
                      <label className="font-bold text-neutral-700 block mb-1">
                        TRUE PHYSICAL MATERIAL PURITY:
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPurityMatch(true)}
                          className={`flex-1 py-2 font-bold border-2 border-black ${
                            purityMatch ? 'bg-emerald-500 text-white' : 'bg-[#F4F1EA] text-neutral-800'
                          }`}
                        >
                          HIGH GRADE (MATCHES AI)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPurityMatch(false)}
                          className={`flex-1 py-2 font-bold border-2 border-black ${
                            !purityMatch ? 'bg-amber-400 text-black' : 'bg-[#F4F1EA] text-neutral-800'
                          }`}
                        >
                          LOWER GRADE DUST/SCRAP
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Certified Re-Weighing Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-industrial mt-3">
                    <div>
                      <label className="font-bold text-neutral-700 block mb-1">
                        CERTIFIED RE-WEIGHED NET WEIGHT (KG):
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={verifiedWeight}
                        onChange={(e) => setVerifiedWeight(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#F4F1EA] border-2 border-black p-2 font-black text-sm text-black"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-neutral-700 block mb-1">
                        ENFORCED MANDI RATE PER KG (₹):
                      </label>
                      <input
                        type="number"
                        value={correctiveRate}
                        onChange={(e) => setCorrectiveRate(parseInt(e.target.value) || 0)}
                        className="w-full bg-[#F4F1EA] border-2 border-black p-2 font-black text-sm text-black"
                      />
                    </div>
                  </div>
                </div>

                {/* INSPECTOR FINDINGS & EVIDENCE NOTES */}
                <div>
                  <label className="font-mono-industrial font-black text-xs text-neutral-800 uppercase block mb-1">
                    INSPECTOR AUDIT FINDINGS & INTERVIEW NOTES
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#F4F1EA] border-2 border-black p-3 font-mono-industrial text-xs font-bold text-black focus:outline-none focus:bg-white"
                    placeholder="Enter on-site statements, scale seal numbers, or environmental hazards observed..."
                  />
                </div>

                {/* RESOLUTION ACTION SELECTION */}
                <div>
                  <label className="font-mono-industrial font-black text-xs text-neutral-800 uppercase block mb-2">
                    RESOLUTION VERDICT & CORRECTIVE ACTION
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'PRICE_CORRECTED',
                        label: 'ENFORCE PRICE CORRECTION',
                        desc: 'Credit difference to collector, fine dealer'
                      },
                      {
                        id: 'RESOLVED_LEGITIMATE',
                        label: 'CLEAR AS LEGITIMATE',
                        desc: 'Justified by verified low purity grade'
                      },
                      {
                        id: 'FACILITY_FLAGGED',
                        label: 'SUSPEND FACILITY LICENSE',
                        desc: 'Egregious fraud / illegal open acid burning'
                      }
                    ].map((res) => (
                      <button
                        key={res.id}
                        type="button"
                        onClick={() => {
                          sounds.playClick();
                          setResolutionChoice(res.id as TicketStatus);
                        }}
                        className={`p-3 text-left border-2 font-mono-industrial transition-all ${
                          resolutionChoice === res.id
                            ? 'bg-[#121316] text-[#CCFF00] border-black shadow-[3px_3px_0px_#CCFF00]'
                            : 'bg-[#F4F1EA] text-neutral-800 border-neutral-500 hover:bg-white'
                        }`}
                      >
                        <div className="text-xs font-black uppercase">{res.label}</div>
                        <div className="text-[10px] text-neutral-400 mt-1">{res.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action Row */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs font-mono-industrial text-neutral-600">
                    Signing as: <strong>{currentUser?.name || 'Inspector Anil Gaikwad (MPCB)'}</strong>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 bg-[#CCFF00] hover:bg-[#b8e600] text-black border-3 border-black font-mono-industrial text-xs font-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>SIGN & DISPATCH RESOLUTION STAMP</span>
                  </button>
                </div>
              </form>

              {/* Final Success Certificate Box if Submitted */}
              {reportSubmitted && (
                <div className="mt-5 p-4 bg-emerald-50 border-3 border-emerald-700 text-emerald-950 font-mono-industrial text-xs animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black flex items-center gap-1.5 text-sm text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 stroke-[3]" />
                      OFFICIAL RESOLUTION SEALED & BROADCASTED
                    </span>
                    <button
                      onClick={() => window.print()}
                      className="px-2 py-1 bg-white border border-emerald-700 font-bold hover:bg-neutral-100 flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      PRINT ORDER
                    </button>
                  </div>
                  <p className="font-bold">
                    Case {selectedTicket.id} updated to <strong>{selectedTicket.status}</strong>.
                    Updated records pushed to CPCB National Registry and Collector ledger.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
