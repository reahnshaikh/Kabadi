import React, { useState } from 'react';
import { UserCheck, ShieldCheck, Lock, Phone, Mail, Building, MapPin, X, ArrowRight, UserPlus, LogIn, Sparkles } from 'lucide-react';
import { UserAccount, UserRole } from '../../types';
import { DEMO_ACCOUNTS } from '../../data/mockData';
import { sounds } from '../../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLoginSuccess: (user: UserAccount) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [role, setRole] = useState<UserRole>('AUDITOR');

  // Login form state
  const [phone, setPhone] = useState('+91 98200 44921');
  const [otp, setOtp] = useState('882104');
  const [otpSent, setOtpSent] = useState(false);

  // Signup form state
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newWard, setNewWard] = useState('Dharavi / Kurla Ward');
  const [newBadge, setNewBadge] = useState('');

  if (!isOpen) return null;

  const handleQuickLogin = (account: UserAccount) => {
    sounds.playSuccess();
    onLoginSuccess(account);
    onClose();
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playScan();
    setOtpSent(true);
  };

  const handleVerifyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    // Match matching demo account or create session
    const matched = DEMO_ACCOUNTS.find((a) => a.phone === phone || a.role === role) || {
      id: `USR-${Date.now().toString().slice(-4)}`,
      role,
      name: role === 'AUDITOR' ? 'Field Auditor' : role === 'COLLECTOR' ? 'Collector User' : 'Authorized Recycler',
      phone,
      wardArea: 'Mumbai Metropolitan Region',
      verified: true
    };
    onLoginSuccess(matched);
    onClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    const newUser: UserAccount = {
      id: `USR-${role.slice(0, 3)}-${Date.now().toString().slice(-4)}`,
      role,
      name: newName || 'Registered User',
      phone: newPhone || '+91 98000 00000',
      email: newEmail,
      organization: newOrg || 'Independent Operative',
      badgeNumber: newBadge || `${role}-REG-${Math.floor(1000 + Math.random() * 9000)}`,
      wardArea: newWard,
      verified: true
    };
    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#F4F1EA] border-4 border-[#121316] shadow-[8px_8px_0px_#121316] max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#121316] text-white border-b-3 border-[#121316]">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#CCFF00]" />
            <span className="font-mono-industrial font-black text-sm tracking-wider uppercase text-[#CCFF00]">
              {currentUser ? 'AUTHENTICATED SESSION' : mode === 'LOGIN' ? 'SECURE PORTAL LOGIN' : 'CREATE ACCOUNT'}
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

        <div className="p-5 sm:p-6">
          {/* If already logged in, show current session profile */}
          {currentUser ? (
            <div className="space-y-4">
              <div className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
                <div className="flex items-center justify-between border-b-2 border-neutral-300 pb-2 mb-3">
                  <span className="text-[10px] font-mono-industrial font-black bg-[#CCFF00] text-black px-2 py-0.5 border border-black uppercase">
                    ACTIVE {currentUser.role}
                  </span>
                  <span className="text-xs font-mono-industrial font-bold text-emerald-700 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    CPCB/MPCB VERIFIED
                  </span>
                </div>

                <h3 className="text-2xl font-black font-display text-black">{currentUser.name}</h3>
                <div className="text-xs font-mono-industrial text-neutral-600 mt-1 space-y-0.5">
                  <div>Role: <strong>{currentUser.role}</strong></div>
                  <div>Phone: <strong>{currentUser.phone}</strong></div>
                  {currentUser.organization && <div>Organization: <strong>{currentUser.organization}</strong></div>}
                  {currentUser.badgeNumber && <div>Credential Ref: <strong>{currentUser.badgeNumber}</strong></div>}
                  <div>Operating Zone: <strong>{currentUser.wardArea}</strong></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onLogout();
                  }}
                  className="w-full py-3 bg-[#EE1111] hover:bg-red-700 text-white font-mono-industrial text-xs font-black border-2 border-black shadow-[3px_3px_0px_#000]"
                >
                  SIGN OUT (LOGOUT)
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#121316] text-[#CCFF00] font-mono-industrial text-xs font-black border-2 border-black shadow-[3px_3px_0px_#000]"
                >
                  RETURN TO WORKSPACE
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Quick Persona Fast Login for Judges / Demo Evaluation */}
              <div className="mb-6 p-3.5 bg-[#121316] text-white border-2 border-black shadow-[3px_3px_0px_#CCFF00]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-industrial font-black text-[#CCFF00] uppercase tracking-wider">
                    ⚡ 1-CLICK DEMO AUTH PERSONAS
                  </span>
                  <span className="text-[10px] font-mono-industrial text-neutral-400">SIH 2026 JURY</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEMO_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleQuickLogin(acc)}
                      className="text-left p-2 bg-neutral-900 hover:bg-black border border-neutral-700 text-xs font-mono-industrial transition-colors flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-white truncate">{acc.name}</span>
                        <span className={`text-[9px] font-black px-1 border ${
                          acc.role === 'AUDITOR'
                            ? 'bg-[#FF5500] text-white border-white'
                            : acc.role === 'COLLECTOR'
                            ? 'bg-[#CCFF00] text-black border-black'
                            : 'bg-blue-600 text-white border-white'
                        }`}>
                          {acc.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-1 truncate">{acc.organization || acc.wardArea}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode switch tabs: Login vs Sign Up */}
              <div className="flex items-center border-2 border-black bg-white p-0.5 mb-5 shadow-[2px_2px_0px_#000]">
                <button
                  type="button"
                  onClick={() => setMode('LOGIN')}
                  className={`flex-1 py-2 font-mono-industrial text-xs font-black flex items-center justify-center gap-1.5 ${
                    mode === 'LOGIN' ? 'bg-[#121316] text-[#CCFF00]' : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>SIGN IN</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('SIGNUP')}
                  className={`flex-1 py-2 font-mono-industrial text-xs font-black flex items-center justify-center gap-1.5 ${
                    mode === 'SIGNUP' ? 'bg-[#121316] text-[#CCFF00]' : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>CREATE ACCOUNT</span>
                </button>
              </div>

              {/* Role selector buttons */}
              <div className="mb-4">
                <label className="text-xs font-mono-industrial font-black text-neutral-800 uppercase block mb-1.5">
                  SELECT ACCESS ROLE
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(['AUDITOR', 'COLLECTOR', 'RECYCLER', 'ADMIN'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 px-1 text-center font-mono-industrial text-xs font-bold border-2 border-black transition-colors ${
                        role === r
                          ? 'bg-[#121316] text-[#CCFF00] shadow-[2px_2px_0px_#CCFF00]'
                          : 'bg-white text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* FORM: LOGIN */}
              {mode === 'LOGIN' && (
                <form onSubmit={otpSent ? handleVerifyLogin : handleSendOtp} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono-industrial font-black text-neutral-700 uppercase block mb-1">
                      REGISTERED MOBILE NUMBER (फोन नंबर)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-white border-2 border-black p-2.5 font-mono-industrial text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
                        placeholder="+91 98200 44921"
                      />
                      <Phone className="w-4 h-4 text-neutral-500 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {otpSent && (
                    <div className="animate-fadeIn">
                      <label className="text-xs font-mono-industrial font-black text-neutral-700 uppercase block mb-1">
                        ENTER 6-DIGIT VERIFICATION OTP (ओटीपी)
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full bg-white border-2 border-black p-2.5 font-mono-industrial text-lg font-black tracking-widest text-center text-black"
                        placeholder="882104"
                      />
                      <span className="text-[10px] font-mono-industrial text-neutral-500 block mt-1">
                        *Demo auto-fill active. Any 6-digit number accepted.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#CCFF00] hover:bg-[#b8e600] text-black border-3 border-black font-mono-industrial text-sm font-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <span>{otpSent ? 'VERIFY OTP & SIGN IN' : 'GET VERIFICATION OTP'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </form>
              )}

              {/* FORM: SIGN UP */}
              {mode === 'SIGNUP' && (
                <form onSubmit={handleSignupSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-mono-industrial font-black text-neutral-700 uppercase block mb-1">
                      FULL NAME (नाम)
                    </label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      placeholder="e.g. Rameshwar Shinde / Inspector Meera Sen"
                      className="w-full bg-white border-2 border-black p-2 font-mono-industrial text-xs font-bold text-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono-industrial font-black text-neutral-700 uppercase block mb-1">
                        MOBILE NUMBER
                      </label>
                      <input
                        type="tel"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        required
                        placeholder="+91 98200 00000"
                        className="w-full bg-white border-2 border-black p-2 font-mono-industrial text-xs font-bold text-black"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono-industrial font-black text-neutral-700 uppercase block mb-1">
                        EMAIL (OPTIONAL)
                      </label>
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="official@cpcb.gov.in"
                        className="w-full bg-white border-2 border-black p-2 font-mono-industrial text-xs font-bold text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono-industrial font-black text-neutral-700 uppercase block mb-1">
                        ORGANIZATION / FACILITY
                      </label>
                      <input
                        type="text"
                        value={newOrg}
                        onChange={(e) => setNewOrg(e.target.value)}
                        placeholder="e.g. MPCB E-Waste Cell / Dharavi Union"
                        className="w-full bg-white border-2 border-black p-2 font-mono-industrial text-xs font-bold text-black"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono-industrial font-black text-neutral-700 uppercase block mb-1">
                        OPERATING WARD / ZONE
                      </label>
                      <input
                        type="text"
                        value={newWard}
                        onChange={(e) => setNewWard(e.target.value)}
                        placeholder="e.g. Kurla MIDC / Bhiwandi"
                        className="w-full bg-white border-2 border-black p-2 font-mono-industrial text-xs font-bold text-black"
                      />
                    </div>
                  </div>

                  {role === 'AUDITOR' && (
                    <div>
                      <label className="text-xs font-mono-industrial font-black text-neutral-700 uppercase block mb-1">
                        OFFICIAL AUDITOR BADGE NUMBER
                      </label>
                      <input
                        type="text"
                        value={newBadge}
                        onChange={(e) => setNewBadge(e.target.value)}
                        placeholder="AUD-MPCB-0941"
                        className="w-full bg-white border-2 border-black p-2 font-mono-industrial text-xs font-bold text-black"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#CCFF00] hover:bg-[#b8e600] text-black border-3 border-black font-mono-industrial text-sm font-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <span>REGISTER & START SESSION</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
