import React from 'react';
import { motion } from 'motion/react';
import { MemberProfile } from '../types';

interface ETollViewProps {
  currentMember: MemberProfile;
  myEtollBalance: number;
  handleTopUp: (amount: number) => void;
  handlePayToll: () => void;
  selectedTollGate: number;
  setSelectedTollGate: (index: number) => void;
  tollGateActive: null | 'authenticating' | 'open' | 'closed' | 'error';
  tollMessage: string;
  playSound: (type: 'click' | 'beep' | 'success' | 'error' | 'fill') => void;
}

const TOLL_GATES = [
  { name: 'GTO JORR Seksi E3 (Jakarta)', price: 16000, desc: 'Jakarta Outer Ring Road' },
  { name: 'GTO Pasteur (Bandung)', price: 10500, desc: 'Tol Purbaleunyi Margahayu' },
  { name: 'GTO Makassar Seksi IV', price: 12000, desc: 'Tol Reformasi - Bandara' }
];

export default function ETollView({
  currentMember,
  myEtollBalance,
  handleTopUp,
  handlePayToll,
  selectedTollGate,
  setSelectedTollGate,
  tollGateActive,
  tollMessage,
  playSound,
}: ETollViewProps) {
  return (
    <div className="space-y-4">
      {/* E-Toll Card Shell */}
      <div className="w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-indigo-900 p-4 text-white flex flex-col justify-between overflow-hidden relative border border-cyan-400/20 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.2),transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(to_top,rgba(0,0,0,0.4),transparent)] pointer-events-none" />

        <div className="flex justify-between items-start relative z-10">
          <div>
            <h4 className="font-black text-sm tracking-widest uppercase flex items-center gap-1.5 leading-none">
              <span className="p-0.5 bg-white/10 rounded-md">🛣️</span>
              e-Toll Card
            </h4>
            <span className="text-[7px] opacity-75 tracking-widest font-mono">
              AUTO CLASER CLUB CUSTOM EDITION
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-extrabold italic text-sm tracking-tighter text-[#22d3ee] leading-none">
              e-money
            </span>
            <span className="text-[7px] font-bold text-white bg-blue-50 px-1 rounded mt-0.5">
              ACC PAY
            </span>
          </div>
        </div>

        {/* Monospace credit card numbers */}
        <div className="my-1 text-xs sm:text-sm font-mono tracking-widest text-[#22d3ee] flex gap-2 justify-center drop-shadow">
          <span>6032</span>
          <span>0811</span>
          <span>2026</span>
          <span>{currentMember.membershipNumber.replace(/\D/g, '').padEnd(4, '8')}</span>
        </div>

        <div className="flex justify-between items-end relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 rounded bg-gradient-to-tr from-yellow-100 to-yellow-400 opacity-80 border border-yellow-600/30 flex flex-col justify-around p-0.5">
              <div className="grid grid-cols-2 gap-0.5 h-full opacity-60">
                {[...Array(4)].map((_, i) => <div key={i} className="bg-neutral-800/20 rounded-[1px]" />)}
              </div>
            </div>
            {/* NFC signals */}
            <svg className="w-3.5 h-3.5 text-[#22d3ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <div className="text-right">
            <span className="block text-[7px] uppercase tracking-widest text-neutral-300">SALDO MOBIL</span>
            <span className="font-black font-mono text-base sm:text-lg text-yellow-300 drop-shadow">
              Rp {myEtollBalance.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* Controller Actions Console */}
      <div className="bg-theme-bg border border-theme-border rounded-2xl p-4 space-y-4">
        {/* TOP UP ACTIONS */}
        <div>
          <span className="block text-xs font-bold text-theme-text mb-2 flex items-center gap-1">
            💰 Top Up Instant Saldo Digital KTA
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[20000, 50000, 100000, 200000].map((amt) => (
              <button
                key={amt}
                onClick={() => handleTopUp(amt)}
                className="py-2 px-1 bg-theme-surface hover:bg-theme-primary hover:text-white border border-theme-border rounded-xl text-[10px] font-bold text-theme-text transition-all cursor-pointer shadow-sm"
              >
                +{amt/1000}k
              </button>
            ))}
          </div>
        </div>

        {/* GTO ROADGATE SIMULATION */}
        <div className="border-t border-theme-border pt-3">
          <span className="block text-xs font-bold text-theme-text mb-2 flex items-center gap-1">
            🚗 Uji Coba Bayar Tol GTO
          </span>
          
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {TOLL_GATES.map((gate, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playSound('click');
                  setSelectedTollGate(idx);
                }}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedTollGate === idx 
                    ? 'border-cyan-400 bg-cyan-950/10 text-[#22d3ee]' 
                    : 'border-theme-border bg-theme-surface text-theme-muted'
                }`}
              >
                <span className="block text-[8px] font-bold truncate leading-none uppercase">
                  {gate.name.split(' ')[1]}
                </span>
                <span className="block text-xs font-black mt-0.5 font-mono">
                  Rp{(gate.price/1000).toFixed(1)}k
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handlePayToll}
            disabled={tollGateActive === 'authenticating'}
            className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:brightness-105"
          >
            💳 TAP KARTU DI SCANNER GTO
          </button>
        </div>

        {/* SCREEN PRINTOUT SIMULATION */}
        {tollGateActive && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`p-3 rounded-xl border text-center relative overflow-hidden font-mono text-xs ${
              tollGateActive === 'error' ? 'bg-red-950/10 border-red-500/30 text-red-400' :
              tollGateActive === 'open' ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' :
              'bg-neutral-900 border-neutral-700 text-neutral-300'
            }`}
          >
            <div className="text-[8px] uppercase font-bold tracking-widest mb-1 flex items-center justify-center gap-1.5">
              {tollGateActive === 'authenticating' && <span className="animate-spin text-cyan-400">🌀</span>}
              <span>[ GTO TERMINAL SCREEN ]</span>
            </div>
            
            {tollGateActive === 'open' && (
              <div className="flex flex-col items-center justify-center my-2 gap-1.5">
                <div className="text-lg font-black text-emerald-400 leading-none">🟢 SILAHKAN JALAN</div>
                <div className="h-4 w-full flex items-center justify-center">
                  <motion.div 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -55 }}
                    className="w-16 h-1 bg-amber-400 origin-left border border-amber-600"
                  />
                  <span className="text-[9px] text-green-400 font-bold ml-2">BARRIER TERBUKA</span>
                </div>
              </div>
            )}

            {tollGateActive === 'closed' && (
              <div className="flex flex-col items-center justify-center my-2 gap-1.5">
                <div className="text-lg font-black text-red-500 leading-none">🔴 BERHENTI</div>
                <div className="h-4 w-full flex items-center justify-center">
                  <div className="w-16 h-1 bg-amber-400 border border-amber-600" />
                  <span className="text-[9px] text-red-400 font-bold ml-2">BARRIER MATI</span>
                </div>
              </div>
            )}

            <p className="text-xs font-black leading-relaxed font-sans mt-1">
              {tollMessage}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
