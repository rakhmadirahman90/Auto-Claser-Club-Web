import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemberProfile } from '../types';

interface KtaCardViewProps {
  currentMember: MemberProfile;
  playSound: (type: 'click' | 'beep' | 'success' | 'error' | 'fill') => void;
  myEtollBalance: number;
  handleTopUp: (amount: number) => void;
  handlePayToll: () => void;
  selectedTollGate: number;
  setSelectedTollGate: (index: number) => void;
  tollGateActive: null | 'authenticating' | 'open' | 'closed' | 'error';
  tollMessage: string;
  myPertaliteQuota: number;
  selectedLiters: number;
  setSelectedLiters: (liters: number) => void;
  handleFillPertalite: () => void;
  petrolActive: null | 'filling' | 'completed';
  dispenserLiters: number;
  dispenserPrice: number;
}

const TOLL_GATES = [
  { name: 'GTO JORR Seksi E3', price: 16000, desc: 'Jakarta Outer Ring Road' },
  { name: 'GTO Pasteur', price: 10500, desc: 'Bandung Purwakarta' },
  { name: 'GTO Makassar Seksi IV', price: 12000, desc: 'Tol Reformasi Pettarani' }
];

export default function KtaCardView({
  currentMember,
  playSound,
  myEtollBalance,
  handleTopUp,
  handlePayToll,
  selectedTollGate,
  setSelectedTollGate,
  tollGateActive,
  tollMessage,
  myPertaliteQuota,
  selectedLiters,
  setSelectedLiters,
  handleFillPertalite,
  petrolActive,
  dispenserLiters,
  dispenserPrice,
}: KtaCardViewProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Helper toggle flip
  const handleCardClick = () => {
    playSound('click');
    setIsFlipped(!isFlipped);
  };

  return (
    <div id="kta-terpadu-root" className="space-y-6 w-full max-w-4xl mx-auto">
      
      {/* SECTION 1: THE INTERACTIVE 3D FLIP KTA CARD */}
      <div id="kta-3d-wrap" className="w-full flex flex-col items-center justify-center p-6 bg-neutral-900/45 rounded-3xl border border-amber-500/10 shadow-inner relative overflow-hidden">
        
        {/* Ambient grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />
        
        <div className="flex flex-col items-center space-y-2 mb-4 text-center">
          <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 uppercase tracking-widest font-mono">
            KTA DIGITAL TERPADU ACC
          </span>
          <p className="text-xs text-theme-muted">
            {isFlipped ? "Tampak Belakang (Ketentuan KTA) - Klik kartu untuk memutar balik" : "Tampak Depan (KTA Resmi & Status Saldo) - Klik kartu untuk memutar balik"}
          </p>
        </div>

        {/* 3D Perspective Card Wrapper */}
        <div className="perspective-1000 w-full max-w-[360px] h-[218px] sm:h-[228px] py-1">
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-full h-full rounded-2xl shadow-2xl preserve-3d cursor-pointer select-none"
            onClick={handleCardClick}
          >
            
            {/* ================================================== */}
            {/* FRONT SIDE (Tampak Depan) */}
            {/* ================================================== */}
            <div 
              id="kta-card-front" 
              className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-neutral-950 via-[#1b1204] to-neutral-900 p-3.5 sm:p-4 text-white flex flex-col justify-between overflow-hidden border border-amber-500/25 backface-hidden shadow-[0_0_20px_rgba(245,158,11,0.15)]"
            >
              {/* Card Holographic watermark overlay */}
              <div className="absolute top-0 right-0 w-[150%] h-[150%] -translate-y-1/2 translate-x-1/3 bg-[radial-gradient(circle_at_bottom_left,transparent_40%,rgba(245,158,11,0.06)_50%,transparent_60%)] -rotate-12 pointer-events-none" />
              
              {/* Header section with Logo & Club Name */}
              <div className="flex justify-between items-start shrink-0 relative z-10 border-b border-amber-500/25 pb-1 sm:pb-1.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <img 
                    src="/logo.jpg" 
                    alt="ACC Logo" 
                    className="h-7 sm:h-8 w-auto object-contain rounded-md bg-white p-0.5 border border-amber-500/20 shadow-md" 
                  />
                  <div>
                    <h3 className="font-extrabold tracking-widest text-amber-500 text-[9.5px] sm:text-[11px] leading-none uppercase">
                      Auto Claser Club
                    </h3>
                    <p className="text-[5.5px] sm:text-[6.5px] tracking-widest text-neutral-400 font-mono italic mt-0.5 sm:mt-1">
                      LOYALITAS TANPA BATAS
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[6px] sm:text-[7px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-black font-sans leading-none shadow">
                    KTA TERPADU
                  </span>
                  <span className="text-[5px] sm:text-[6px] text-amber-500 font-mono mt-0.5 font-bold tracking-widest">
                    INDONESIA
                  </span>
                </div>
              </div>

              {/* Profile details & Live Digital balances HUD panel */}
              <div className="flex gap-2 sm:gap-2.5 items-center flex-1 my-1 sm:my-1.5 min-h-0 relative z-10">
                
                {/* Photo frame */}
                <div className="relative w-11 h-14 sm:w-[54px] sm:h-[68px] rounded-lg overflow-hidden border border-amber-500/40 bg-neutral-900 shrink-0 shadow-md">
                  {currentMember.imageUrl ? (
                    <img 
                      src={currentMember.imageUrl} 
                      alt={currentMember.name} 
                      className="w-full h-full object-cover object-top" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-amber-950 text-[#f59e0b] font-bold text-xs sm:text-base">
                      {currentMember.name.substring(0,2).toUpperCase()}
                    </div>
                  )}
                  {/* Smart active pulse light */}
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-500 rounded-full border border-black shadow animate-pulse" />
                </div>

                {/* Profile Information & Integrated HUD Details */}
                <div className="flex-1 flex flex-col justify-center min-h-0 space-y-0.5">
                  <div className="truncate text-[11px] sm:text-xs md:text-sm font-black text-amber-500 font-sans tracking-wide leading-none">
                    {currentMember.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[5.5px] sm:text-[6px] px-1 py-0.2 bg-amber-500/10 text-amber-500 rounded border border-amber-500/20 uppercase font-black tracking-wide leading-none">
                      {currentMember.role}
                    </span>
                  </div>

                  {/* INTEGRATED LIVE WALLET DATA (ACC Pay & BBM) */}
                  <div className="border-t border-neutral-800/80 pt-0.5 mt-0.5 grid grid-cols-2 gap-x-1 gap-y-0.5 text-neutral-300">
                    <div>
                      <span className="block text-[5px] sm:text-[5.5px] text-neutral-500 leading-none uppercase">💳 ACC Pay (e-Toll)</span>
                      <span className="font-bold text-[8.5px] sm:text-[9.5px] text-amber-400 font-mono leading-none">
                        Rp{myEtollBalance.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[5px] sm:text-[5.5px] text-neutral-500 leading-none uppercase">⛽ Kuota Pertalite</span>
                      <span className="font-bold text-[8.5px] sm:text-[9.5px] text-emerald-400 font-mono leading-none">
                        {myPertaliteQuota} L / Hari
                      </span>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-1 border-t border-neutral-900 pt-0.5 text-[5.5px] sm:text-[6.5px] font-mono text-neutral-400">
                      <div>
                        <span className="text-neutral-500 block leading-none text-[4.5px] sm:text-[5px]">PLAT MOBIL</span>
                        <span className="text-white font-bold leading-none">{currentMember.licensePlate || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block leading-none text-[4.5px] sm:text-[5px]">UNIT MOBIL</span>
                        <span className="text-neutral-200 font-bold leading-none truncate block">{currentMember.car || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom card metrics representing NFC copper interface */}
              <div className="flex justify-between items-end shrink-0 relative z-10 border-t border-amber-500/20 pt-1">
                {/* Smart Card Chip Visual */}
                <div className="flex items-center gap-1">
                  <div className="w-5 h-3.5 rounded bg-gradient-to-br from-amber-200 via-[#f59e0b] to-yellow-600 border border-amber-600/40 relative overflow-hidden flex flex-col justify-around p-0.5 shadow-inner">
                    <div className="grid grid-cols-3 gap-0.5 h-full opacity-60">
                      {[...Array(6)].map((_, i) => <div key={i} className="border border-amber-900/20 rounded-[1px] bg-amber-200/50" />)}
                    </div>
                  </div>
                  {/* Wave Contactless Symbol */}
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                {/* Embedded Membership number */}
                <div className="font-mono text-center text-[8.5px] sm:text-[10px] md:text-[11px] font-black tracking-widest text-[#f59e0b] bg-black/60 px-1.5 py-0.5 rounded border border-neutral-808">
                  {currentMember.membershipNumber}
                </div>

                {/* Date Joined */}
                <div className="text-[5px] sm:text-[5.5px] text-neutral-400 text-right font-mono leading-none">
                  <span className="block text-amber-500 font-bold text-[4.5px] sm:text-[5px]">MULAI JOIN</span>
                  {currentMember.yearJoined}
                </div>
              </div>
            </div>

            {/* ================================================== */}
            {/* REVERSE SIDE (Tampak Belakang - KETENTUAN KTA) */}
            {/* ================================================== */}
            <div 
              id="kta-card-back" 
              className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#0c0c0d] via-[#141416] to-[#070708] p-3.5 sm:p-4 text-white flex flex-col justify-between overflow-hidden border border-neutral-800 rotate-y-180 backface-hidden shadow-2xl"
            >
              {/* Magnetic Strip Visual mimicking physical layout */}
              <div className="absolute left-0 top-3 right-0 h-5 sm:h-6 bg-neutral-950 border-y border-neutral-900 z-0" />
              
              <div className="h-3.5 sm:h-4.5" />

              {/* Rules and guidelines list */}
              <div className="text-[5px] sm:text-[6px] md:text-[6.5px] text-neutral-300 space-y-0.5 relative z-10 font-sans leading-normal border-b border-neutral-800/60 pb-1 sm:pb-1.5 pr-2">
                <p className="font-extrabold text-amber-500 text-[6px] sm:text-[7.5px] mb-0.5 uppercase tracking-wide">
                  KETENTUAN KTA DIGITAL TERPADU ACC:
                </p>
                <p>1. Kartu ini merupakan KTA Digital Terpadu resmi Auto Claser Club (ACC).</p>
                <p>2. Dilengkapi NFC Smart Chip terintegrasi saldo <span className="text-amber-400 font-bold">e-Toll</span> & Barcode <span className="text-emerald-400 font-bold">Subsidi Pertalite</span>.</p>
                <p>3. Melekat secara sah untuk kendaraan terdaftar {currentMember.car} No. Pol {currentMember.licensePlate}.</p>
                <p>4. Jaga kerahasiaan data barcode dan dilarang memindahtangankan kuota BBM.</p>
                <p>5. Patuhi rambu jalan raya dan junjung penuh slogan Kekeluargaan Tanpa Batas!</p>
              </div>

              {/* Signature, Barcode & Official logo seal */}
              <div className="flex justify-between items-center relative z-10 mt-1">
                <div className="text-left select-none">
                  <span className="block text-[4px] sm:text-[4.5px] text-neutral-500 tracking-widest font-mono">CHAIRMAN SIGNATURE</span>
                  <div className="h-4 sm:h-5 flex items-end">
                    <span className="font-serif italic text-[9.5px] sm:text-[11px] text-amber-400 font-bold tracking-widest drop-shadow shadow-amber-500/20">
                      Sukri Lanra
                    </span>
                  </div>
                  <span className="block text-[4.5px] sm:text-[5.5px] text-neutral-400 font-bold border-t border-neutral-800 mt-0.5">
                    OM SUKRI LANRA (KETUM ACC)
                  </span>
                </div>

                {/* Barcode representation for SPBU scans & ACC Seal */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="flex flex-col items-center bg-white p-0.5 sm:p-1 rounded border border-neutral-800 shadow shadow-amber-500/10">
                    <div className="w-12 h-3.5 sm:w-16 sm:h-4.5 flex gap-[1px] items-stretch justify-center">
                      {[1,3,2,1,4,1,2,3,1,2,1,3,2,4,1,3].map((w, idx) => (
                        <div key={idx} className="bg-black" style={{ width: `${w * 0.7}px` }} />
                      ))}
                    </div>
                    <span className="block text-[4px] sm:text-[4.5px] font-mono font-bold text-neutral-900 mt-0.5 tracking-tighter">
                      ACC-{currentMember.membershipNumber}
                    </span>
                  </div>
                  
                  {/* ACC Round Mini Seal Logo */}
                  <img 
                    src="/logo.jpg" 
                    alt="ACC Logo Back" 
                    className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border border-amber-500/40 bg-white p-0.5 object-contain shadow-md" 
                  />
                </div>
              </div>
            </div>

          </motion.div>
        </div>
        
        {/* Flip Hint */}
        <p className="mt-3 text-center text-[10px] sm:text-xs text-theme-muted font-medium bg-theme-bg/60 px-4 py-1 rounded-full border border-theme-border/60 shadow-sm leading-none flex items-center justify-center gap-1.5">
          <span>🔄</span> Klik kartu untuk melihat {isFlipped ? "Tampak Depan (Profil)" : "Tampak Belakang (Ketentuan & Barcode)"}
        </p>

      </div>

      {/* SECTION 2: HIGHLY COMPLETE UNIFIED KTA CONSOLE (e-Toll & Pertalite) */}
      <div id="kta-console-panel" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* PANEL COLUMN A: E-TOLL GATE PAYMENTS (ACC Pay) */}
        <div id="etoll-wallet-panel" className="bg-theme-surface border border-theme-border/70 rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="border-b border-theme-border pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛣️</span>
                <div>
                  <h4 className="font-extrabold text-sm text-theme-text uppercase">
                    Fasilitas e-Toll Digital
                  </h4>
                  <span className="text-[9px] font-mono text-cyan-500 font-bold block uppercase tracking-wider leading-none mt-0.5">
                    Kartu Terpadu - ACC PAY enabled
                  </span>
                </div>
              </div>
              <span className="text-[10px] bg-theme-bg text-theme-text border border-theme-border px-2 py-1 rounded-lg font-mono font-bold">
                Saldo: Rp{myEtollBalance.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Quick Balance Refill Top Up */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-neutral-400">
                💰 Isi Ulang Cepat (Instant Top-Up)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[20000, 50000, 100000, 200000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleTopUp(amt)}
                    className="py-1.5 px-0.5 bg-neutral-900/60 hover:bg-amber-500 border border-theme-border text-theme-text hover:text-black rounded-xl text-[10px] font-black transition-all cursor-pointer shadow-sm text-center"
                  >
                    +{amt/1000}k
                  </button>
                ))}
              </div>
            </div>

            {/* Toll gate simulator choice list */}
            <div className="space-y-2 pt-2 border-t border-theme-border/40">
              <label className="block text-[11px] font-bold text-neutral-400">
                🚗 Gerbang Tol Otomatis (GTO) Terintegrasi
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TOLL_GATES.map((gate, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playSound('click');
                      setSelectedTollGate(idx);
                    }}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedTollGate === idx 
                        ? 'border-cyan-400 bg-cyan-950/20 text-cyan-400' 
                        : 'border-theme-border bg-neutral-900/40 text-theme-muted hover:border-theme-border/80'
                    }`}
                  >
                    <span className="block text-[8px] font-black truncate uppercase leading-none">
                      {gate.name.split(' ')[1]}
                    </span>
                    <span className="block text-xs font-black font-mono mt-1 text-white">
                      Rp{(gate.price/1000).toFixed(1)}k
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Trigger Tap button */}
              <button
                onClick={handlePayToll}
                disabled={tollGateActive === 'authenticating'}
                className="w-full py-2.5 mt-2 bg-gradient-to-r from-sky-500 to-indigo-600 disabled:opacity-50 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:brightness-105 uppercase"
              >
                💳 Tempel KTA Terpadu di Scanner GTO
              </button>
            </div>
          </div>

          {/* Electronic GTO Gate Visual Screener */}
          <div className="mt-4">
            <AnimatePresence mode="wait">
              {tollGateActive ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-3 rounded-xl border text-center font-mono text-xs relative overflow-hidden ${
                    tollGateActive === 'error' ? 'bg-red-950/20 border-red-500/35 text-red-300' :
                    tollGateActive === 'open' ? 'bg-emerald-950/20 border-emerald-500/35 text-emerald-300' :
                    'bg-neutral-950 border-neutral-800 text-neutral-300'
                  }`}
                >
                  <span className="text-[7.5px] text-neutral-500 block font-bold mb-1 tracking-widest">[ LAYAR MONITOR GTO ]</span>
                  
                  {tollGateActive === 'open' && (
                    <div className="flex flex-col items-center justify-center my-1.5 gap-1">
                      <div className="text-sm font-black text-emerald-400 leading-none">🟢 GERBANG TERBUKA</div>
                      <div className="h-3 w-full flex items-center justify-center gap-1">
                        <motion.div 
                          initial={{ rotate: 0 }}
                          animate={{ rotate: -55 }}
                          className="w-12 h-1 bg-amber-400 origin-left border border-amber-600 rounded"
                        />
                        <span className="text-[8px] text-emerald-400 font-bold font-sans">PALANG TERANGKAT</span>
                      </div>
                    </div>
                  )}

                  {tollGateActive === 'closed' && (
                    <div className="flex flex-col items-center justify-center my-1.5 gap-1">
                      <div className="text-sm font-black text-red-500 leading-none">🔴 SIAP SCANNING</div>
                      <div className="h-3 w-full flex items-center justify-center font-sans text-[8px] text-red-400 font-bold gap-1">
                        <div className="w-12 h-1 bg-amber-400 border border-amber-600 rounded" />
                        <span>PALANG TERTUTUP</span>
                      </div>
                    </div>
                  )}

                  <p className="text-[10.5px] font-sans font-black mt-1 leading-relaxed leading-none">
                    {tollMessage}
                  </p>
                </motion.div>
              ) : (
                <div className="p-3 bg-neutral-950/40 border border-theme-border/40 rounded-xl text-center text-theme-muted text-[10.5px] font-mono font-medium py-4">
                  [ System Standby: Silahkan tempel KTA untuk membuka tol ]
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* PANEL COLUMN B: SUBSIDIZED PERTALITE REFILLS */}
        <div id="fuel-station-panel" className="bg-theme-surface border border-theme-border/70 rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4">
            <div className="border-b border-theme-border pb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">⛽</span>
                <div>
                  <h4 className="font-extrabold text-sm text-theme-text uppercase">
                    Subsidi BBM Terpadu
                  </h4>
                  <span className="text-[9px] font-mono text-emerald-500 font-bold block uppercase tracking-wider leading-none mt-0.5">
                    Subsidi Tepat Pertamina & ACC
                  </span>
                </div>
              </div>
              <span className="text-[10px] bg-theme-bg text-theme-text border border-theme-border px-2 py-1 rounded-lg font-mono font-bold">
                BBM: {myPertaliteQuota} Liter / hari
              </span>
            </div>

            {/* Liter selector controls */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-neutral-400">
                🎛️ Atur Volume Pengisian Pertalite:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 20].map((lt) => (
                  <button
                    key={lt}
                    onClick={() => {
                      playSound('click');
                      setSelectedLiters(lt);
                    }}
                    className={`py-1.5 px-1 text-[11px] font-black rounded-xl border cursor-pointer transition-all ${
                      selectedLiters === lt 
                        ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' 
                        : 'border-theme-border bg-neutral-900/40 text-theme-muted hover:border-theme-border/80'
                    }`}
                  >
                    {lt} L
                  </button>
                ))}
                <button
                  onClick={() => {
                    playSound('click');
                    setSelectedLiters(Math.min(myPertaliteQuota, 40));
                  }}
                  className={`py-1.5 px-0.5 text-[11px] font-black rounded-xl border cursor-pointer transition-all ${
                    selectedLiters === Math.min(myPertaliteQuota, 40)
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
                      : 'border-theme-border bg-neutral-900/40 text-theme-muted hover:border-theme-border/80'
                  }`}
                >
                  FULL
                </button>
              </div>
            </div>

            {/* Run refueling process */}
            <div className="pt-2 border-t border-theme-border/40 space-y-2">
              <p className="text-[10px] text-theme-muted leading-tight">
                Pindai kode barcode KTA Digital Terpadu Anda di dispenser otomatis SPBU terdekat untuk mengisi.
              </p>
              
              <button
                onClick={handleFillPertalite}
                disabled={petrolActive === 'filling'}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:brightness-105 uppercase"
              >
                ⚡ Pindai Barcode KTA & Isi Bensin
              </button>
            </div>
          </div>

          {/* Live fuel station active printer */}
          <div className="mt-4">
            <AnimatePresence mode="wait">
              {petrolActive ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3 bg-neutral-950 border border-emerald-500/15 text-neutral-300 rounded-xl font-mono text-center relative overflow-hidden"
                >
                  <span className="text-[7.5px] text-emerald-500 block font-bold mb-1 tracking-widest">[ DISPENSER DIGITAL SPBU ]</span>
                  
                  {petrolActive === 'filling' && (
                    <div className="space-y-1.5 py-1">
                      <div className="flex justify-center gap-3 items-center">
                        <div className="text-left">
                          <span className="block text-[6.5px] text-neutral-500 leading-none">TERISI</span>
                          <span className="text-sm font-black text-amber-400 leading-none block font-mono">
                            {dispenserLiters.toFixed(1)} L
                          </span>
                        </div>
                        <div className="border-l border-neutral-800 h-5" />
                        <div className="text-left">
                          <span className="block text-[6.5px] text-neutral-500 leading-none">BIAYA</span>
                          <span className="text-sm font-black text-emerald-400 leading-none block font-mono">
                            Rp{dispenserPrice.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-neutral-800 rounded-full h-1 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-75"
                          style={{ width: `${(dispenserLiters / selectedLiters) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-neutral-400 block animate-pulse">
                        Proses pengisian BBM sedang berjalan...
                      </span>
                    </div>
                  )}

                  {petrolActive === 'completed' && (
                    <div className="text-[#10b981] bg-emerald-950/10 p-2 border border-emerald-500/25 rounded-lg space-y-1 text-left text-[10px]">
                      <div className="text-center font-bold text-[10px] mb-1">STNK/QR {currentMember.licensePlate} VERIFIED</div>
                      <div className="border-t border-dashed border-neutral-800 pt-1 space-y-0.5 text-neutral-300 text-[9.5px]">
                        <div className="flex justify-between">
                          <span>Volume BBM:</span>
                          <span className="font-bold text-white">{dispenserLiters.toFixed(1)} Liter</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pembayaran:</span>
                          <span className="font-bold text-amber-400">Rp{dispenserPrice.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed border-neutral-800 pt-0.5 text-[8.5px] text-emerald-400">
                          <span>Sisa kuota:</span>
                          <span>{myPertaliteQuota} Liter</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="p-3 bg-neutral-950/40 border border-theme-border/40 rounded-xl text-center text-theme-muted text-[10.5px] font-mono font-medium py-4">
                  [ System Standby: Silahkan scan barcode KTA untuk mengisi bensin ]
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
