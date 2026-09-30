import React, { useState } from 'react';
import { Volume2, Wifi, WifiOff, Globe, Sparkles, Mic, UserCheck, Lock } from 'lucide-react';
import { Language, PerformanceMode, UserAccount } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';
import { speakText, sounds } from '../../utils/audio';

interface CollectorHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  performanceMode: PerformanceMode;
  onPerformanceModeChange: (mode: PerformanceMode) => void;
  onTriggerVoiceAction: (command: string) => void;
  activeRole: 'collector' | 'recycler' | 'admin' | 'auditor' | 'landing' | 'judge';
  onRoleChange: (role: 'collector' | 'recycler' | 'admin' | 'auditor' | 'landing' | 'judge') => void;
  currentUser?: UserAccount | null;
  onOpenAuth?: () => void;
}

export const CollectorHeader: React.FC<CollectorHeaderProps> = ({
  language,
  onLanguageChange,
  isOffline,
  onToggleOffline,
  performanceMode,
  onPerformanceModeChange,
  onTriggerVoiceAction,
  activeRole,
  onRoleChange,
  currentUser,
  onOpenAuth
}) => {
  const t = TRANSLATIONS[language];
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const handleVoiceCommand = () => {
    sounds.playScan();
    setIsListening(true);
    setVoiceNotice(t.bhavSunaoListening || 'सुनिए...');

    // vernacular speech recognition simulation
    setTimeout(() => {
      setIsListening(false);
      const commandText = language === 'hi' ? 'आज का PCB भाव सुनाओ' : language === 'mr' ? 'आजचा PCB भाव ऐका' : "Read today's PCB rate";
      setVoiceNotice(`🎤 "${commandText}"`);
      speakText(
        language === 'hi'
          ? 'आज मुंबई में मदरबोर्ड पीसीबी का भाव दो सौ पांच रुपये प्रति किलो है। ग्रीन लूप रीसाइक्लर दो सौ दस रुपये दे रहा है।'
          : language === 'mr'
          ? 'आज मुंबईमध्ये मदरबोर्ड पीसीबीचा भाव दोनशे पाच रुपये प्रति किलो आहे. ग्रीन लूप रिसायकलर दोनशे दहा रुपये देत आहे.'
          : 'Today in Mumbai, PCB rate is 205 rupees per kilo. GreenLoop recycler is offering 210 rupees.',
        language
      );
      onTriggerVoiceAction('PRICE');
      setTimeout(() => setVoiceNotice(null), 4000);
    }, 1200);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#121316] text-[#F4F1EA] border-b-4 border-[#121316] shadow-[0_4px_0_rgba(0,0,0,0.2)]">
      {/* Top Banner: Role switcher & offline toggle for quick SIH judging demo */}
      <div className="bg-[#1A1C23] border-b border-[#2C313E] px-3 py-1.5 flex flex-wrap items-center justify-between text-xs font-mono-industrial">
        <div className="flex items-center gap-2">
          <span className="text-[#CCFF00] font-black tracking-widest text-[11px] uppercase">
            SIH26299 PROTOTYPE
          </span>
          <span className="text-neutral-500">|</span>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => onRoleChange('collector')}
              className={`px-2 py-0.5 font-bold transition-all whitespace-nowrap ${
                activeRole === 'collector'
                  ? 'bg-[#CCFF00] text-[#121316]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              COLLECTOR
            </button>
            <button
              onClick={() => onRoleChange('recycler')}
              className={`px-2 py-0.5 font-bold transition-all whitespace-nowrap ${
                activeRole === 'recycler'
                  ? 'bg-[#CCFF00] text-[#121316]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              RECYCLER
            </button>
            <button
              onClick={() => onRoleChange('auditor')}
              className={`px-2 py-0.5 font-bold transition-all whitespace-nowrap ${
                activeRole === 'auditor'
                  ? 'bg-[#FF5500] text-white'
                  : 'text-amber-400 hover:text-white'
              }`}
            >
              FIELD AUDITOR
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              className={`px-2 py-0.5 font-bold transition-all whitespace-nowrap ${
                activeRole === 'admin'
                  ? 'bg-[#CCFF00] text-[#121316]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              ADMIN
            </button>
            <button
              onClick={() => onRoleChange('landing')}
              className={`px-2 py-0.5 font-bold transition-all whitespace-nowrap ${
                activeRole === 'landing'
                  ? 'bg-[#0044FF] text-white'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              LANDING
            </button>
            <button
              onClick={() => onRoleChange('judge')}
              className={`px-2 py-0.5 font-bold transition-all whitespace-nowrap ${
                activeRole === 'judge'
                  ? 'bg-[#FF5500] text-white'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              JUDGE MODE
            </button>
          </div>
        </div>

        {/* Offline & Performance controls */}
        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <button
            onClick={onToggleOffline}
            title="Simulate Offline Connection"
            className={`flex items-center gap-1.5 px-2.5 py-0.5 font-bold border transition-colors ${
              isOffline
                ? 'bg-[#EE1111] text-white border-[#EE1111] animate-pulse'
                : 'bg-emerald-950/80 text-emerald-400 border-emerald-700 hover:bg-emerald-900'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOffline ? 'OFFLINE SIMULATED' : 'ONLINE'}</span>
          </button>

          {/* Performance Mode Switcher */}
          <div className="hidden md:flex items-center border border-neutral-700 bg-black/40 text-[10px]">
            <span className="px-1.5 text-neutral-400">PERF:</span>
            {(['FULL', 'BALANCED', 'LITE'] as PerformanceMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onPerformanceModeChange(mode)}
                className={`px-1.5 py-0.5 font-bold ${
                  performanceMode === mode ? 'bg-[#CCFF00] text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#CCFF00] text-[#121316] border-2 border-black flex items-center justify-center font-black text-xl brutalist-shadow-sm select-none">
            KL
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              KABADI LINK
              <span className="text-[11px] font-mono-industrial font-bold bg-[#CCFF00] text-[#121316] px-1.5 py-0.5 border border-black">
                VERNACULAR
              </span>
            </h1>
            <p className="text-xs text-neutral-400 font-medium hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls: Voice + Auth + Language Switcher */}
        <div className="flex items-center gap-2">
          {/* Auth Button */}
          {onOpenAuth && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAuth();
              }}
              className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-neutral-100 text-black font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            >
              {currentUser ? <UserCheck className="w-4 h-4 text-emerald-700" /> : <Lock className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline truncate max-w-[120px]">
                {currentUser ? currentUser.name.split(' ')[0] : 'LOGIN / SIGNUP'}
              </span>
            </button>
          )}

          {/* Voice Assistant Trigger */}
          <button
            onClick={handleVoiceCommand}
            disabled={isListening}
            className={`flex items-center gap-1.5 px-3 py-2 border-2 border-black font-mono-industrial text-xs font-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
              isListening ? 'bg-[#FF5500] text-white animate-pulse' : 'bg-[#CCFF00] text-[#121316] hover:bg-[#b8e600]'
            }`}
          >
            <Mic className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">{t.bhavSunao}</span>
            <Volume2 className="w-3.5 h-3.5" />
          </button>

          {/* Vernacular Language Switcher */}
          <div className="flex items-center border-2 border-black bg-white p-0.5 shadow-[2px_2px_0px_#000]">
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-2 py-1 text-xs font-bold font-sans transition-colors ${
                language === 'mr' ? 'bg-[#121316] text-[#CCFF00]' : 'text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 text-xs font-bold font-sans transition-colors ${
                language === 'hi' ? 'bg-[#121316] text-[#CCFF00]' : 'text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 text-xs font-bold font-sans transition-colors ${
                language === 'en' ? 'bg-[#121316] text-[#CCFF00]' : 'text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Voice feedback banner if active */}
      {voiceNotice && (
        <div className="bg-[#CCFF00] text-[#121316] px-4 py-1.5 border-t-2 border-black text-xs font-mono-industrial font-black flex items-center justify-between animate-fadeIn">
          <span>{voiceNotice}</span>
          <span className="text-[10px] bg-black text-[#CCFF00] px-1.5 py-0.5">AUDIO SYNTH</span>
        </div>
      )}
    </header>
  );
};
