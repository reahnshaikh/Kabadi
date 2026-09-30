import React, { useState, useEffect } from 'react';
import { Camera, X, Check, RefreshCw, Upload, Sparkles, AlertTriangle } from 'lucide-react';
import { Language, MaterialCategory, AIClassification } from '../../types';
import { MaterialSvgGraphic } from '../brutalist/MaterialSvgGraphic';
import { sounds } from '../../utils/audio';

interface AiCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onClassificationConfirmed: (classification: AIClassification) => void;
}

export const AiCameraModal: React.FC<AiCameraModalProps> = ({
  isOpen,
  onClose,
  language,
  onClassificationConfirmed
}) => {
  const [stage, setStage] = useState<'IDLE' | 'SCANNING' | 'RESULT'>('IDLE');
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>('PCB');
  const [manualOverrideOpen, setManualOverrideOpen] = useState(false);
  const [sampleType, setSampleType] = useState<MaterialCategory>('PCB');

  const categories: MaterialCategory[] = [
    'PCB',
    'CABLE',
    'BATTERY',
    'CRT',
    'LCD',
    'MOTOR',
    'MAGNET',
    'MIXED_PLASTIC',
    'OTHER'
  ];

  const classificationData: Record<MaterialCategory, AIClassification> = {
    PCB: {
      category: 'PCB',
      categoryName: 'Green Motherboard & Server Scrap',
      confidence: 91,
      features: ['Gold plated contact fingers', 'IC surface mount chips', 'FR-4 fiberglass laminate matrix'],
      alternatives: [
        { category: 'CABLE', name: 'Ribbon cable harness', confidence: 6 },
        { category: 'OTHER', name: 'Mixed electronic component', confidence: 3 }
      ],
      explanation: 'Computer vision model matched PCB pattern with 91% confidence based on IC surface mounts and gold edge fingers.'
    },
    CABLE: {
      category: 'CABLE',
      categoryName: 'Insulated Copper & Power Harness',
      confidence: 96,
      features: ['Stripped stranded copper', 'Heavy PVC sheathing', 'Flexible multi-core braid'],
      alternatives: [
        { category: 'MOTOR', name: 'Motor winding copper', confidence: 3 },
        { category: 'OTHER', name: 'Mixed scrap harness', confidence: 1 }
      ],
      explanation: 'Stranded copper core with color-coded polymer jacketing identified with high confidence.'
    },
    BATTERY: {
      category: 'BATTERY',
      categoryName: 'Lithium-Ion / Sealed Lead Acid',
      confidence: 89,
      features: ['Terminal electrodes (+/-)', 'Prismatic rectangular cell', 'Hazard label typography'],
      alternatives: [
        { category: 'OTHER', name: 'Power supply unit (SMPS)', confidence: 7 },
        { category: 'MIXED_PLASTIC', name: 'Plastic housing', confidence: 4 }
      ],
      explanation: 'Terminal polarity markings and sealed metal canister geometry detected.'
    },
    CRT: {
      category: 'CRT',
      categoryName: 'Cathode Ray Tube Leaded Glass',
      confidence: 94,
      features: ['Heavy curved glass bell', 'Electron gun neck', 'Lead-shielded envelope'],
      alternatives: [
        { category: 'LCD', name: 'Thick bezel monitor', confidence: 5 },
        { category: 'MIXED_PLASTIC', name: 'Old TV casing', confidence: 1 }
      ],
      explanation: 'Conical glass envelope and vacuum seal neck structure matched.'
    },
    LCD: {
      category: 'LCD',
      categoryName: 'Flat Panel Display Panel',
      confidence: 92,
      features: ['Polarizer film layers', 'CCFL/LED backlight array', 'Thin flat profile'],
      alternatives: [{ category: 'CRT', name: 'Thick monitor', confidence: 8 }],
      explanation: 'Flat substrate glass and diffuser sheets detected.'
    },
    MOTOR: {
      category: 'MOTOR',
      categoryName: 'Copper Stator & Armature',
      confidence: 90,
      features: ['Circular iron stator', 'Copper wire coils', 'Center steel rotor shaft'],
      alternatives: [{ category: 'MAGNET', name: 'Ferrite rotor', confidence: 10 }],
      explanation: 'Heavy wound copper windings and cylindrical iron core detected.'
    },
    MAGNET: {
      category: 'MAGNET',
      categoryName: 'Neodymium / Ferrite Ring',
      confidence: 88,
      features: ['Sintered metallic coating', 'Compact hard drive voice coil magnet'],
      alternatives: [{ category: 'MOTOR', name: 'Motor core', confidence: 12 }],
      explanation: 'Plated rare-earth neodymium geometry identified.'
    },
    MIXED_PLASTIC: {
      category: 'MIXED_PLASTIC',
      categoryName: 'Flame-Retardant ABS & HIPS Casing',
      confidence: 87,
      features: ['Molded polymer ribs', 'Recycle symbol #7 / ABS stamp'],
      alternatives: [{ category: 'OTHER', name: 'Mixed appliance scrap', confidence: 13 }],
      explanation: 'Injection molded electronic enclosure plastic identified.'
    },
    OTHER: {
      category: 'OTHER',
      categoryName: 'Unsorted Electronic Scrap',
      confidence: 75,
      features: ['Heterogeneous metal/plastic assembly'],
      alternatives: [{ category: 'PCB', name: 'Concealed board', confidence: 25 }],
      explanation: 'Mixed assemblies requiring manual sorting.'
    }
  };

  const handleStartScan = (material: MaterialCategory = 'PCB') => {
    sounds.playScan();
    setSampleType(material);
    setSelectedCategory(material);
    setStage('SCANNING');

    // Simulate AI classification scanning latency
    setTimeout(() => {
      sounds.playSuccess();
      setStage('RESULT');
    }, 1800);
  };

  useEffect(() => {
    if (isOpen) {
      setStage('IDLE');
      setManualOverrideOpen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentResult = classificationData[selectedCategory];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#F4F1EA] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#121316] text-white border-b-3 border-[#121316]">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#CCFF00]" />
            <span className="font-mono-industrial font-black text-sm tracking-wider uppercase text-[#CCFF00]">
              MAAL KA PHOTO LO — AI SCAN
            </span>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* STAGE 1: IDLE / CAPTURE VIEW */}
          {stage === 'IDLE' && (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-black font-display text-[#121316] uppercase">
                  ई-कचरे का साफ फोटो लें
                </h2>
                <p className="text-xs font-mono-industrial text-neutral-600 font-bold mt-1">
                  AI will classify material grade, circuit density, and predict fair market benchmark.
                </p>
              </div>

              {/* Sample Photo Preview Area */}
              <div className="relative border-3 border-[#121316] bg-[#121316] p-2 mb-4">
                <MaterialSvgGraphic material={sampleType} className="w-full h-52 sm:h-64" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/80 border border-[#CCFF00] p-2 text-xs font-mono-industrial text-white">
                  <span>SAMPLE: <strong>{sampleType}</strong></span>
                  <span className="text-[#CCFF00]">READY FOR NEURAL SCAN</span>
                </div>
              </div>

              {/* Quick sample selector for testing */}
              <div className="mb-4">
                <label className="text-[11px] font-mono-industrial font-black text-neutral-700 uppercase block mb-1.5">
                  Or select test e-waste lot sample:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['PCB', 'CABLE', 'BATTERY', 'CRT', 'MOTOR'] as MaterialCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSampleType(cat)}
                      className={`px-3 py-1 text-xs font-mono-industrial font-bold border-2 border-[#121316] ${
                        sampleType === cat ? 'bg-[#CCFF00] text-black shadow-[2px_2px_0px_#000]' : 'bg-white text-neutral-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleStartScan(sampleType)}
                  className="flex items-center justify-center gap-2 py-4 px-4 bg-[#CCFF00] hover:bg-[#b8e600] text-[#121316] border-3 border-[#121316] font-mono-industrial text-sm font-black shadow-[4px_4px_0px_#121316] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                  <span>START AI SCAN NOW</span>
                </button>

                <button
                  onClick={() => handleStartScan('PCB')}
                  className="flex items-center justify-center gap-2 py-4 px-4 bg-white hover:bg-neutral-100 text-[#121316] border-3 border-[#121316] font-mono-industrial text-sm font-black shadow-[4px_4px_0px_#121316] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  <Upload className="w-5 h-5" />
                  <span>UPLOAD FROM GALLERY</span>
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: SCANNING ANIMATION */}
          {stage === 'SCANNING' && (
            <div className="py-6 text-center">
              <div className="relative border-4 border-[#121316] bg-[#121316] p-2 mb-6 overflow-hidden">
                <MaterialSvgGraphic material={sampleType} className="w-full h-56 sm:h-72 opacity-75" />

                {/* Animated Scan Laser Line */}
                <div className="absolute left-0 right-0 h-1.5 bg-[#CCFF00] shadow-[0_0_12px_#CCFF00] animate-scanline" />

                {/* HUD Overlay Elements */}
                <div className="absolute top-4 left-4 border border-[#CCFF00] px-2 py-1 bg-black/90 font-mono-industrial text-[11px] text-[#CCFF00] font-bold text-left">
                  TENSOR CONV-2D RUNNING...
                  <br />
                  <span className="text-white">FEATURE MATRIX: 1024-D</span>
                </div>

                <div className="absolute bottom-4 right-4 border border-[#FF5500] px-2 py-1 bg-black/90 font-mono-industrial text-[11px] text-[#FF5500] font-bold">
                  DETECTING SOLDER & IC CHIPS
                </div>

                {/* Target reticle */}
                <div className="absolute inset-12 border-2 border-dashed border-[#CCFF00]/50 pointer-events-none flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-[#CCFF00] animate-spin" />
                </div>
              </div>

              <div className="inline-block bg-[#121316] text-[#CCFF00] font-mono-industrial font-black text-sm px-4 py-2 border-2 border-[#CCFF00] animate-pulse">
                SCANNING MATERIAL... ANALYZING COPPER & COMPONENT RATIO
              </div>
            </div>
          )}

          {/* STAGE 3: RESULT & CORRECTION */}
          {stage === 'RESULT' && (
            <div>
              {/* Material Intelligence Card */}
              <div className="bg-white border-3 border-[#121316] shadow-[5px_5px_0px_#121316] p-4 sm:p-5 mb-5">
                <div className="flex items-center justify-between border-b-2 border-[#121316] pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono-industrial font-black bg-[#CCFF00] text-black px-2 py-0.5 border border-black uppercase">
                      MATERIAL DETECTED
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black font-display text-[#121316] mt-1">
                      {currentResult.category}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black font-mono-industrial text-emerald-600">
                      {currentResult.confidence}%
                    </div>
                    <div className="text-[10px] font-mono-industrial text-neutral-500 font-bold uppercase">
                      CONFIDENCE SCORE
                    </div>
                  </div>
                </div>

                <div className="text-sm font-mono-industrial font-bold text-neutral-800 mb-2">
                  Category: <span className="text-black font-black">{currentResult.categoryName}</span>
                </div>

                {/* Feature Tags */}
                <div className="mb-4">
                  <span className="text-[11px] font-mono-industrial font-bold text-neutral-500 uppercase block mb-1">
                    Visual Feature Points Detected:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentResult.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono-industrial bg-neutral-100 border border-[#121316] px-2 py-1 font-bold text-neutral-900"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Alternative categories */}
                <div className="border-t-2 border-dashed border-neutral-300 pt-3">
                  <span className="text-[11px] font-mono-industrial font-bold text-neutral-600 uppercase block mb-1.5">
                    Possible Alternatives:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {currentResult.alternatives.map((alt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedCategory(alt.category)}
                        className="text-xs font-mono-industrial bg-[#F4F1EA] hover:bg-neutral-200 border border-[#121316] px-2 py-1 font-bold text-neutral-800"
                      >
                        {alt.category} ({alt.confidence}%)
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Manual Category Override Drawer */}
              {manualOverrideOpen && (
                <div className="bg-[#121316] text-white border-3 border-black p-4 mb-5 shadow-[4px_4px_0px_#CCFF00]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-industrial font-black text-[#CCFF00] uppercase">
                      MANUAL OVERRIDE — SELECT CORRECT CATEGORY
                    </span>
                    <button
                      onClick={() => setManualOverrideOpen(false)}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      CLOSE [X]
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setManualOverrideOpen(false);
                        }}
                        className={`p-2 text-xs font-mono-industrial font-bold border text-left ${
                          selectedCategory === cat
                            ? 'bg-[#CCFF00] text-black border-white font-black'
                            : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons: Confirm vs Manual Change */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    sounds.playSuccess();
                    onClassificationConfirmed(currentResult);
                  }}
                  className="flex items-center justify-center gap-2 py-4 px-4 bg-[#CCFF00] hover:bg-[#b8e600] text-[#121316] border-3 border-[#121316] font-mono-industrial text-base font-black shadow-[4px_4px_0px_#121316] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>USE {selectedCategory} (NEXT: WEIGHT)</span>
                </button>

                <button
                  onClick={() => setManualOverrideOpen(!manualOverrideOpen)}
                  className="flex items-center justify-center gap-2 py-4 px-4 bg-white hover:bg-neutral-100 text-[#121316] border-3 border-[#121316] font-mono-industrial text-sm font-black shadow-[4px_4px_0px_#121316] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>CHANGE CATEGORY</span>
                </button>
              </div>

              <div className="mt-3 text-center">
                <button
                  onClick={() => setStage('IDLE')}
                  className="text-xs font-mono-industrial font-bold text-neutral-600 underline hover:text-black"
                >
                  ← RETAKE PHOTO
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
