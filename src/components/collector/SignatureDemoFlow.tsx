import React from 'react';
import { Play, CheckCircle2, ChevronRight } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { sounds } from '../../utils/audio';

export type DemoStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface SignatureDemoFlowProps {
  currentStep: DemoStep;
  onSelectStep: (step: DemoStep) => void;
  language: Language;
  onRunSignatureDemo: () => void;
  isRunningAutoDemo?: boolean;
}

export const SignatureDemoFlow: React.FC<SignatureDemoFlowProps> = ({
  currentStep,
  onSelectStep,
  language,
  onRunSignatureDemo,
  isRunningAutoDemo = false
}) => {
  const t = TRANSLATIONS[language];

  const steps: { id: DemoStep; labelKey: string; enName: string; desc: string }[] = [
    { id: 1, labelKey: 'step01', enName: 'PHOTO', desc: 'Scan e-waste' },
    { id: 2, labelKey: 'step02', enName: 'IDENTIFY', desc: 'AI Classification' },
    { id: 3, labelKey: 'step03', enName: 'PRICE', desc: 'Fair value engine' },
    { id: 4, labelKey: 'step04', enName: 'MATCH', desc: 'Authorized recycler' },
    { id: 5, labelKey: 'step05', enName: 'HANDOVER', desc: 'Digital QR transfer' },
    { id: 6, labelKey: 'step06', enName: 'PAID', desc: 'Cash / UPI receipt' },
    { id: 7, labelKey: 'step07', enName: 'TRACE', desc: 'E-waste timeline' }
  ];

  return (
    <div className="bg-[#121316] text-white border-b-4 border-black p-3 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#CCFF00] text-[#121316] font-mono-industrial font-black text-xs px-2 py-0.5 border border-black uppercase">
                SIGNATURE DEMO JOURNEY
              </span>
              <span className="text-xs text-neutral-400 font-mono-industrial">
                Step {currentStep} of 7
              </span>
            </div>
            <p className="text-xs text-neutral-300 mt-0.5 font-medium">
              "Kabadi se Recycler tak — Seedha. Sahi. Traceable."
            </p>
          </div>

          {/* Quick Demo Runner Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onRunSignatureDemo();
            }}
            disabled={isRunningAutoDemo}
            className={`self-start md:self-auto flex items-center gap-2 px-3 py-1.5 border-2 border-black font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#CCFF00] active:translate-x-0.5 active:translate-y-0.5 ${
              isRunningAutoDemo ? 'bg-amber-400 text-black animate-pulse' : 'bg-[#CCFF00] text-[#121316] hover:bg-[#b8e600]'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunningAutoDemo ? 'DEMO RUNNING...' : 'RUN FULL JOURNEY (1-CLICK)'}</span>
          </button>
        </div>

        {/* Horizontal Step Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 mt-2">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <button
                key={step.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectStep(step.id);
                }}
                className={`flex flex-col items-start p-2 border-2 transition-all duration-150 text-left select-none ${
                  isActive
                    ? 'bg-[#CCFF00] text-[#121316] border-white shadow-[3px_3px_0px_#FFFFFF] -translate-y-0.5'
                    : isCompleted
                    ? 'bg-[#1A261D] text-emerald-400 border-emerald-800 hover:border-emerald-600'
                    : 'bg-[#1A1C23] text-neutral-400 border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <div className="w-full flex items-center justify-between text-[11px] font-mono-industrial font-black">
                  <span>{t[step.labelKey] || step.enName}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : isActive ? (
                    <span className="w-2 h-2 rounded-full bg-[#121316] animate-ping shrink-0" />
                  ) : (
                    <span className="text-[10px] text-neutral-600">0{step.id}</span>
                  )}
                </div>
                <div
                  className={`text-[10px] font-mono-industrial mt-0.5 truncate w-full ${
                    isActive ? 'text-neutral-900 font-bold' : 'text-neutral-400'
                  }`}
                >
                  {step.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
