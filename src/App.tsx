import React, { useState, useEffect } from 'react';
import {
  Language,
  PerformanceMode,
  MaterialLot,
  Recycler,
  PriceEstimate,
  AIClassification,
  MaterialCategory,
  LotCondition,
  UserAccount
} from './types';
import {
  INITIAL_COLLECTOR,
  INITIAL_LOTS,
  PRICE_RECORDS,
  RECYCLERS,
  INITIAL_TRANSACTIONS,
  TRANSLATIONS,
  DEMO_ACCOUNTS
} from './data/mockData';
import { CustomCursor } from './components/brutalist/CustomCursor';
import { CollectorHeader } from './components/collector/CollectorHeader';
import { SignatureDemoFlow, DemoStep } from './components/collector/SignatureDemoFlow';
import { HeroPriceTicker } from './components/collector/HeroPriceTicker';
import { CollectorActionGrid } from './components/collector/CollectorActionGrid';
import { AiCameraModal } from './components/collector/AiCameraModal';
import { WeightInput } from './components/collector/WeightInput';
import { FairPriceEngine } from './components/collector/FairPriceEngine';
import { RecyclerMatchModal } from './components/collector/RecyclerMatchModal';
import { HandoverModal } from './components/collector/HandoverModal';
import { EarningsLedgerModal } from './components/collector/EarningsLedgerModal';
import { SafetyCenterModal } from './components/collector/SafetyCenterModal';
import { LotPassportModal } from './components/collector/LotPassportModal';
import { PriceBoardModal } from './components/collector/PriceBoardModal';
import { TraceabilityTimelineModal } from './components/traceability/TraceabilityTimelineModal';
import { RecyclerApp } from './components/recycler/RecyclerApp';
import { AdminApp } from './components/admin/AdminApp';
import { FieldAuditorApp } from './components/auditor/FieldAuditorApp';
import { AuthModal } from './components/auth/AuthModal';
import { BrutalistLandingPage } from './components/landing/BrutalistLandingPage';
import { JudgePresentationMode } from './components/landing/JudgePresentationMode';
import { sounds } from './utils/audio';
import { RefreshCw, WifiOff, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation role & view
  const [activeRole, setActiveRole] = useState<'collector' | 'recycler' | 'admin' | 'auditor' | 'landing' | 'judge'>('collector');

  // Authenticated user session (defaults to Inspector Anil Gaikwad or Collector)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(DEMO_ACCOUNTS[0]);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Vernacular language
  const [language, setLanguage] = useState<Language>('hi');

  // Performance mode (Low-End Android vs Full)
  const [performanceMode, setPerformanceMode] = useState<PerformanceMode>('FULL');

  // Offline simulation state
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgress, setSyncProgress] = useState<number>(0);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // Signature Demo Journey Step (1 to 7)
  const [currentStep, setCurrentStep] = useState<DemoStep>(1);
  const [isRunningAutoDemo, setIsRunningAutoDemo] = useState<boolean>(false);

  // Active Lot State for the demo journey
  const [activeLot, setActiveLot] = useState<MaterialLot>(INITIAL_LOTS[0]);
  const [activeRecycler, setActiveRecycler] = useState<Recycler>(RECYCLERS[0]);
  const [activeEstimate, setActiveEstimate] = useState<PriceEstimate | null>(null);

  // Modals & Panels
  const [modalOpen, setModalOpen] = useState<{
    camera: boolean;
    weight: boolean;
    priceEngine: boolean;
    recyclerMatch: boolean;
    handover: boolean;
    earnings: boolean;
    safety: boolean;
    lotPassport: boolean;
    priceBoard: boolean;
    traceability: boolean;
  }>({
    camera: false,
    weight: false,
    priceEngine: false,
    recyclerMatch: false,
    handover: false,
    earnings: false,
    safety: false,
    lotPassport: false,
    priceBoard: false,
    traceability: false
  });

  // Offline toggle simulation
  const handleToggleOffline = () => {
    sounds.playClick();
    if (isOffline) {
      // Transitioning from offline back to online -> trigger sync animation
      setIsOffline(false);
      setIsSyncing(true);
      setSyncProgress(24);
      setTimeout(() => setSyncProgress(52), 400);
      setTimeout(() => setSyncProgress(78), 800);
      setTimeout(() => {
        setSyncProgress(100);
        setIsSyncing(false);
        setSyncNotice('✓ ALL 7 OFFLINE RECORDS SYNCHRONIZED');
        sounds.playSuccess();
        setTimeout(() => setSyncNotice(null), 3500);
      }, 1200);
    } else {
      setIsOffline(true);
      setSyncNotice('● OFFLINE MODE: Data will be safely cached on this device.');
      setTimeout(() => setSyncNotice(null), 3000);
    }
  };

  // Close all sub-modals helper
  const closeAllModals = () => {
    setModalOpen({
      camera: false,
      weight: false,
      priceEngine: false,
      recyclerMatch: false,
      handover: false,
      earnings: false,
      safety: false,
      lotPassport: false,
      priceBoard: false,
      traceability: false
    });
  };

  // Step selector from stepper
  const handleSelectStep = (step: DemoStep) => {
    setCurrentStep(step);
    closeAllModals();

    if (step === 1) {
      setModalOpen((prev) => ({ ...prev, camera: true }));
    } else if (step === 2) {
      setModalOpen((prev) => ({ ...prev, weight: true }));
    } else if (step === 3) {
      setModalOpen((prev) => ({ ...prev, priceEngine: true }));
    } else if (step === 4) {
      setModalOpen((prev) => ({ ...prev, recyclerMatch: true }));
    } else if (step === 5) {
      setModalOpen((prev) => ({ ...prev, handover: true }));
    } else if (step === 6) {
      setModalOpen((prev) => ({ ...prev, earnings: true }));
    } else if (step === 7) {
      setModalOpen((prev) => ({ ...prev, traceability: true }));
    }
  };

  // 1-Click Signature Journey Runner
  const handleRunSignatureDemo = () => {
    setIsRunningAutoDemo(true);
    closeAllModals();
    setCurrentStep(1);
    setModalOpen((prev) => ({ ...prev, camera: true }));

    // Advance smoothly through the signature demo steps
    setTimeout(() => {
      // Step 2: Weight
      setCurrentStep(2);
      closeAllModals();
      setModalOpen((prev) => ({ ...prev, weight: true }));
    }, 2800);

    setTimeout(() => {
      // Step 3: Price Engine
      setCurrentStep(3);
      closeAllModals();
      setModalOpen((prev) => ({ ...prev, priceEngine: true }));
    }, 5500);

    setTimeout(() => {
      // Step 4: Recycler Match
      setCurrentStep(4);
      closeAllModals();
      setModalOpen((prev) => ({ ...prev, recyclerMatch: true }));
    }, 8500);

    setTimeout(() => {
      // Step 5: Handover
      setCurrentStep(5);
      closeAllModals();
      setModalOpen((prev) => ({ ...prev, handover: true }));
      setIsRunningAutoDemo(false);
    }, 11500);
  };

  // When AI camera confirms material classification
  const handleClassificationConfirmed = (classification: AIClassification) => {
    setActiveLot((prev) => ({
      ...prev,
      category: classification.category,
      aiConfidence: classification.confidence,
      status: 'CLASSIFIED'
    }));
    setCurrentStep(2);
    closeAllModals();
    setModalOpen((prev) => ({ ...prev, weight: true }));
  };

  // When Weight & Condition confirmed
  const handleWeightConfirmed = (data: { weightKg: number; condition: LotCondition; locationName: string }) => {
    setActiveLot((prev) => ({
      ...prev,
      weightKg: data.weightKg,
      condition: data.condition,
      locationName: data.locationName,
      status: 'PRICED'
    }));
    setCurrentStep(3);
    closeAllModals();
    setModalOpen((prev) => ({ ...prev, priceEngine: true }));
  };

  // When Fair Price proceeds to Recyclers
  const handleProceedToRecyclers = (estimate: PriceEstimate) => {
    setActiveEstimate(estimate);
    setCurrentStep(4);
    closeAllModals();
    setModalOpen((prev) => ({ ...prev, recyclerMatch: true }));
  };

  // When Recycler selected
  const handleSelectRecycler = (recycler: Recycler) => {
    setActiveRecycler(recycler);
    setActiveLot((prev) => ({
      ...prev,
      matchedRecyclerId: recycler.id,
      quotedRatePerKg: recycler.offeredRatePerKg[prev.category] || 210,
      status: 'MATCHED'
    }));
    setCurrentStep(5);
    closeAllModals();
    setModalOpen((prev) => ({ ...prev, handover: true }));
  };

  // When Handover Completed
  const handleHandoverComplete = (updatedLot: MaterialLot) => {
    setActiveLot(updatedLot);
    setCurrentStep(6);
  };

  const t = TRANSLATIONS[language];

  // RENDER SEPARATE VIEWS IF SELECTED
  if (activeRole === 'landing') {
    return (
      <>
        <CustomCursor />
        <BrutalistLandingPage
          onLaunchCollector={() => setActiveRole('collector')}
          onLaunchRecycler={() => setActiveRole('recycler')}
          onLaunchJudge={() => setActiveRole('judge')}
          onLaunchAdmin={() => setActiveRole('admin')}
          onLaunchAuditor={() => setActiveRole('auditor')}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          currentUser={currentUser}
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            if (u.role === 'AUDITOR') setActiveRole('auditor');
            else if (u.role === 'RECYCLER') setActiveRole('recycler');
            else if (u.role === 'ADMIN') setActiveRole('admin');
            else setActiveRole('collector');
          }}
          onLogout={() => setCurrentUser(null)}
        />
      </>
    );
  }

  if (activeRole === 'judge') {
    return (
      <>
        <CustomCursor />
        <JudgePresentationMode
          onLaunchCollectorApp={() => setActiveRole('collector')}
          onExit={() => setActiveRole('collector')}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          currentUser={currentUser}
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            if (u.role === 'AUDITOR') setActiveRole('auditor');
            else if (u.role === 'RECYCLER') setActiveRole('recycler');
            else if (u.role === 'ADMIN') setActiveRole('admin');
            else setActiveRole('collector');
          }}
          onLogout={() => setCurrentUser(null)}
        />
      </>
    );
  }

  if (activeRole === 'recycler') {
    return (
      <>
        <CustomCursor />
        <RecyclerApp
          language={language}
          onSwitchToCollector={() => setActiveRole('collector')}
          onOpenTraceability={() => {
            setActiveRole('collector');
            setCurrentStep(7);
            closeAllModals();
            setModalOpen((prev) => ({ ...prev, traceability: true }));
          }}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          currentUser={currentUser}
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            if (u.role === 'AUDITOR') setActiveRole('auditor');
            else if (u.role === 'RECYCLER') setActiveRole('recycler');
            else if (u.role === 'ADMIN') setActiveRole('admin');
            else setActiveRole('collector');
          }}
          onLogout={() => setCurrentUser(null)}
        />
      </>
    );
  }

  if (activeRole === 'admin') {
    return (
      <>
        <CustomCursor />
        <AdminApp
          onSwitchToCollector={() => setActiveRole('collector')}
          onSwitchToAuditor={() => setActiveRole('auditor')}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          currentUser={currentUser}
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            if (u.role === 'AUDITOR') setActiveRole('auditor');
            else if (u.role === 'RECYCLER') setActiveRole('recycler');
            else if (u.role === 'ADMIN') setActiveRole('admin');
            else setActiveRole('collector');
          }}
          onLogout={() => setCurrentUser(null)}
        />
      </>
    );
  }

  if (activeRole === 'auditor') {
    return (
      <>
        <CustomCursor />
        <FieldAuditorApp
          language={language}
          currentUser={currentUser}
          onOpenAuth={() => setAuthModalOpen(true)}
          onSwitchToRole={(role) => setActiveRole(role)}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          currentUser={currentUser}
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            if (u.role === 'AUDITOR') setActiveRole('auditor');
            else if (u.role === 'RECYCLER') setActiveRole('recycler');
            else if (u.role === 'ADMIN') setActiveRole('admin');
            else setActiveRole('collector');
          }}
          onLogout={() => setCurrentUser(null)}
        />
      </>
    );
  }

  // DEFAULT: COLLECTOR APP
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#121316] font-sans pb-16 selection:bg-[#CCFF00] selection:text-black">
      {/* Desktop custom cursor */}
      <CustomCursor />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(u) => {
          setCurrentUser(u);
          if (u.role === 'AUDITOR') setActiveRole('auditor');
          else if (u.role === 'RECYCLER') setActiveRole('recycler');
          else if (u.role === 'ADMIN') setActiveRole('admin');
          else setActiveRole('collector');
        }}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Collector Header with Language, Voice, and Network status */}
      <CollectorHeader
        language={language}
        onLanguageChange={setLanguage}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        performanceMode={performanceMode}
        onPerformanceModeChange={setPerformanceMode}
        onTriggerVoiceAction={(cmd) => {
          if (cmd === 'PRICE') {
            closeAllModals();
            setModalOpen((prev) => ({ ...prev, priceBoard: true }));
          }
        }}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Syncing Overlay Banner when returning online */}
      {isSyncing && (
        <div className="bg-[#121316] text-[#CCFF00] p-2.5 border-b-2 border-[#CCFF00] font-mono-industrial text-xs font-black flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#CCFF00]" />
            <span>SYNCING 7 LOCAL E-WASTE RECORDS... ({syncProgress}%)</span>
          </div>
          <div className="w-32 bg-neutral-800 h-2 border border-[#CCFF00]">
            <div className="bg-[#CCFF00] h-full transition-all duration-300" style={{ width: `${syncProgress}%` }} />
          </div>
        </div>
      )}

      {/* Sync Notice Toast */}
      {syncNotice && (
        <div className="bg-[#CCFF00] text-[#121316] p-2 text-center font-mono-industrial text-xs font-black border-b-2 border-black">
          {syncNotice}
        </div>
      )}

      {/* Signature Demo Flow Stepper (01 to 07) */}
      <SignatureDemoFlow
        currentStep={currentStep}
        onSelectStep={handleSelectStep}
        language={language}
        onRunSignatureDemo={handleRunSignatureDemo}
        isRunningAutoDemo={isRunningAutoDemo}
      />

      {/* MAIN COLLECTOR BODY */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Active Modal / Flow Step Container if opened */}
        {modalOpen.camera && (
          <AiCameraModal
            isOpen={true}
            onClose={closeAllModals}
            language={language}
            onClassificationConfirmed={handleClassificationConfirmed}
          />
        )}

        {modalOpen.weight && (
          <div className="mb-8">
            <WeightInput
              material={activeLot.category}
              initialWeight={activeLot.weightKg}
              onWeightConfirmed={handleWeightConfirmed}
              onBack={() => {
                closeAllModals();
                setCurrentStep(1);
                setModalOpen((prev) => ({ ...prev, camera: true }));
              }}
            />
          </div>
        )}

        {modalOpen.priceEngine && (
          <div className="mb-8">
            <FairPriceEngine
              material={activeLot.category}
              weightKg={activeLot.weightKg}
              condition={activeLot.condition}
              locationName={activeLot.locationName}
              language={language}
              onProceedToRecyclers={handleProceedToRecyclers}
              onBack={() => {
                closeAllModals();
                setCurrentStep(2);
                setModalOpen((prev) => ({ ...prev, weight: true }));
              }}
            />
          </div>
        )}

        {modalOpen.recyclerMatch && (
          <div className="mb-8">
            <RecyclerMatchModal
              material={activeLot.category}
              weightKg={activeLot.weightKg}
              locationName={activeLot.locationName}
              language={language}
              onSelectRecycler={handleSelectRecycler}
              onBack={() => {
                closeAllModals();
                setCurrentStep(3);
                setModalOpen((prev) => ({ ...prev, priceEngine: true }));
              }}
            />
          </div>
        )}

        {modalOpen.handover && (
          <div className="mb-8">
            <HandoverModal
              lot={activeLot}
              recycler={activeRecycler}
              language={language}
              onHandoverComplete={handleHandoverComplete}
              onOpenLotPassport={() => {
                closeAllModals();
                setModalOpen((prev) => ({ ...prev, lotPassport: true }));
              }}
              onOpenEarnings={() => {
                closeAllModals();
                setCurrentStep(6);
                setModalOpen((prev) => ({ ...prev, earnings: true }));
              }}
              onBack={() => {
                closeAllModals();
                setCurrentStep(4);
                setModalOpen((prev) => ({ ...prev, recyclerMatch: true }));
              }}
            />
          </div>
        )}

        {modalOpen.earnings && (
          <div className="mb-8">
            <EarningsLedgerModal
              transactions={INITIAL_TRANSACTIONS}
              language={language}
              onClose={closeAllModals}
              onOpenLotDetails={(lotId) => {
                closeAllModals();
                setModalOpen((prev) => ({ ...prev, lotPassport: true }));
              }}
            />
          </div>
        )}

        {modalOpen.safety && (
          <div className="mb-8">
            <SafetyCenterModal
              language={language}
              onClose={closeAllModals}
            />
          </div>
        )}

        {modalOpen.lotPassport && (
          <div className="mb-8">
            <LotPassportModal
              lot={activeLot}
              language={language}
              onClose={closeAllModals}
              onOpenTraceability={() => {
                closeAllModals();
                setCurrentStep(7);
                setModalOpen((prev) => ({ ...prev, traceability: true }));
              }}
            />
          </div>
        )}

        {modalOpen.priceBoard && (
          <div className="mb-8">
            <PriceBoardModal
              initialMaterial={activeLot.category}
              language={language}
              onClose={closeAllModals}
              onSelectForLot={(mat) => {
                setActiveLot((prev) => ({ ...prev, category: mat }));
                closeAllModals();
                setCurrentStep(2);
                setModalOpen((prev) => ({ ...prev, weight: true }));
              }}
            />
          </div>
        )}

        {modalOpen.traceability && (
          <div className="mb-8">
            <TraceabilityTimelineModal
              language={language}
              onClose={closeAllModals}
            />
          </div>
        )}

        {/* HERO SECTION: AAJ KA BHAV */}
        <HeroPriceTicker
          prices={PRICE_RECORDS}
          language={language}
          onOpenPriceBoard={(mat) => {
            closeAllModals();
            setModalOpen((prev) => ({ ...prev, priceBoard: true }));
          }}
        />

        {/* 6 GIANT ACTION GRID (COLLECTOR CORE) */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono-industrial font-black text-xs text-neutral-600 uppercase tracking-widest">
              TAP AN ACTION BELOW (कार्रवाई चुनें)
            </span>
            <span className="text-xs font-mono-industrial text-neutral-500 hidden sm:inline">
              OPERATING IN: {INITIAL_COLLECTOR.operatingArea}
            </span>
          </div>

          <CollectorActionGrid
            language={language}
            onOpenPhotoScan={() => {
              closeAllModals();
              setCurrentStep(1);
              setModalOpen((prev) => ({ ...prev, camera: true }));
            }}
            onOpenRecyclerSearch={() => {
              closeAllModals();
              setCurrentStep(4);
              setModalOpen((prev) => ({ ...prev, recyclerMatch: true }));
            }}
            onOpenPriceBoard={() => {
              closeAllModals();
              setModalOpen((prev) => ({ ...prev, priceBoard: true }));
            }}
            onOpenMyLots={() => {
              closeAllModals();
              setModalOpen((prev) => ({ ...prev, lotPassport: true }));
            }}
            onOpenEarnings={() => {
              closeAllModals();
              setCurrentStep(6);
              setModalOpen((prev) => ({ ...prev, earnings: true }));
            }}
            onOpenSafety={() => {
              closeAllModals();
              setModalOpen((prev) => ({ ...prev, safety: true }));
            }}
          />
        </div>

        {/* RECENT ACTIVITY & QUICK VERIFICATION STRIP */}
        <div className="bg-[#121316] text-white p-5 border-3 border-black shadow-[6px_6px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-ping" />
              <span className="font-mono-industrial font-black text-xs text-[#CCFF00] uppercase">
                LAST HANDOVER VERIFIED
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-display mt-0.5">
              18.5 KG PCB → GREENLOOP RECYCLING
            </div>
            <div className="text-xs font-mono-industrial text-neutral-400 mt-0.5">
              Handover Ref: <strong>KL-HO-842193</strong> · Payment: <strong>₹3,885 (CASH RECEIVED)</strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                closeAllModals();
                setCurrentStep(7);
                setModalOpen((prev) => ({ ...prev, traceability: true }));
              }}
              className="px-4 py-2.5 bg-[#CCFF00] hover:bg-[#b8e600] text-black border-2 border-black font-mono-industrial text-xs font-black shadow-[3px_3px_0px_#CCFF00]"
            >
              VIEW TIMELINE
            </button>
            <button
              onClick={() => {
                closeAllModals();
                setModalOpen((prev) => ({ ...prev, lotPassport: true }));
              }}
              className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600 font-mono-industrial text-xs font-bold"
            >
              VIEW PASSPORT QR
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
