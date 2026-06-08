import React from 'react';
import { motion } from 'motion/react';
import { MemberProfile } from '../types';

interface PertaliteViewProps {
  currentMember: MemberProfile;
  myPertaliteQuota: number;
  selectedLiters: number;
  setSelectedLiters: (liters: number) => void;
  handleFillPertalite: () => void;
  petrolActive: null | 'filling' | 'completed';
  dispenserLiters: number;
  dispenserPrice: number;
  playSound: (type: 'click' | 'beep' | 'success' | 'error' | 'fill') => void;
}

export default function PertaliteView({
  currentMember,
  myPertaliteQuota,
  selectedLiters,
  setSelectedLiters,
  handleFillPertalite,
  petrolActive,
  dispenserLiters,
  dispenserPrice,
  playSound,
}: PertaliteViewProps) {
  return (
    <div className="space-y-4">
      {/* Voucher Pass MyPertamina Card */}
      <div className="w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-emerald-800 via-[#012d22] to-neutral-950 p-4 text-white flex flex-col justify-between overflow-hidden relative border border-emerald-500/20 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(52,211,153,0.1),transparent_60%)] pointer-events-none" />

        <div className="flex justify-between items-start relative z-10 border-b border-emerald-500/20 pb-1 flex-wrap gap-1">
          <div>
            <h4 className="font-extrabold text-[#10b981] text-xs sm:text-sm tracking-wider flex items-center gap-1.5 leading-none">
              <span className="p-0.5 bg-emerald-500/20 rounded">⛽</span>
              Subsidi Tepat PT Pertamina
            </h4>
            <span className="text-[7px] tracking-widest font-mono text-neutral-400 block uppercase mt-0.5">
              PROGRAM KHUSUS ANGGOTA ACC
            </span>
          </div>
          <span className="text-[7px] bg-emerald-500 text-black px-1.5 py-0.5 rounded font-black font-mono leading-none">
            PERTALITE
          </span>
        </div>

        {/* Barcode scanning with vertical stripes & pulsing red laser line */}
        <div className="my-1 relative z-10 flex flex-col items-center justify-center gap-1">
          <div className="w-full max-w-[240px] h-10 bg-white/95 rounded flex items-center justify-center p-1.5 relative overflow-hidden shadow-inner select-none">
            <div className="flex gap-[1.2px] items-stretch h-full w-full justify-center">
              {[1, 3, 2, 1, 4, 1, 2, 3, 1, 3, 2, 1, 4, 1, 2, 3, 1, 3, 2, 1, 4, 1, 2, 1, 3, 2].map((w, idx) => (
                <div key={idx} className="bg-neutral-900" style={{ width: `${w * 2.2}px` }} />
              ))}
            </div>
            
            {/* Moving Scanning Red Laser Beam */}
            <motion.div 
              className="absolute left-0 right-0 h-[1.5px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          
          <div className="font-mono text-[8px] text-emerald-300 font-bold tracking-widest bg-emerald-950/40 px-2 rounded">
            {currentMember.licensePlate || 'SAMPLE'} / {currentMember.name.toUpperCase()}
          </div>
        </div>

        {/* Display detail tags */}
        <div className="flex justify-between items-end relative z-10 text-[9px] font-mono border-t border-emerald-500/20 pt-1 flex-wrap gap-1">
          <div>
            <span className="block text-[6px] text-neutral-500">MEMBER VEHICLE</span>
            <span className="font-extrabold text-neutral-200">{currentMember.car}</span>
          </div>
          <div className="text-right">
            <span className="block text-[6px] text-neutral-500">SISA KUOTA BBM</span>
            <span className="font-black text-emerald-400 text-xs sm:text-sm font-mono block">
              {myPertaliteQuota} Liter / Hari
            </span>
          </div>
        </div>
      </div>

      {/* Fuel Dispenser Station Control Console */}
      <div className="bg-theme-bg border border-theme-border rounded-2xl p-4 space-y-4">
        {/* LITER SELECTION CONTROL */}
        <div>
          <span className="block text-xs font-bold text-theme-text mb-2 flex items-center gap-1">
            🎛️ Atur Volume Pengisian Pertalite
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 20].map((lt) => (
              <button
                key={lt}
                onClick={() => {
                  playSound('click');
                  setSelectedLiters(lt);
                }}
                className={`py-1.5 px-2 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                  selectedLiters === lt 
                    ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' 
                    : 'border-theme-border bg-theme-surface text-theme-muted hover:bg-theme-border'
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
              className={`py-1.5 px-2 text-xs font-black rounded-xl border cursor-pointer transition-all ${
                selectedLiters === Math.min(myPertaliteQuota, 40)
                  ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' 
                  : 'border-theme-border bg-theme-surface text-theme-muted hover:bg-theme-border'
              }`}
            >
              Penuh
            </button>
          </div>
        </div>

        <button
          onClick={handleFillPertalite}
          disabled={petrolActive === 'filling'}
          className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:brightness-105"
        >
          ⚡ SCAN BARCODE & ISI BENSIN
        </button>

        {/* RECEIPT / PRINT OUT DISPLAY */}
        {petrolActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 bg-neutral-900 border border-emerald-500/20 text-neutral-300 rounded-xl font-mono text-xs text-center"
          >
            <span className="text-[8px] text-emerald-400 block font-bold mb-1.5">
              [ POMPA DISPENSER BBM SPBU ACC ]
            </span>

            {petrolActive === 'filling' && (
              <div className="space-y-2 py-1">
                <div className="flex justify-center gap-4 items-center">
                  <div>
                    <span className="block text-[7px] text-neutral-500 leading-none mb-1">TERISI</span>
                    <span className="text-lg font-black text-amber-400 leading-none block font-mono">
                      {dispenserLiters.toFixed(1)} L
                    </span>
                  </div>
                  <div className="border-l border-neutral-800 h-6" />
                  <div>
                    <span className="block text-[7px] text-neutral-500 leading-none mb-1">HARGA</span>
                    <span className="text-lg font-black text-[#10b981] leading-none block font-mono">
                      Rp {dispenserPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-75"
                    style={{ width: `${(dispenserLiters / selectedLiters) * 100}%` }}
                  />
                </div>
                <span className="text-[8px] text-neutral-400 block animate-pulse">
                  Mengisi volume tangki, mohon tunggu...
                </span>
              </div>
            )}

            {petrolActive === 'completed' && (
              <div className="text-[#10b981] bg-emerald-950/10 p-2.5 border border-emerald-500/20 rounded-lg space-y-1 py-2 text-left text-[11px]">
                <div className="text-center font-bold text-[11px] mb-1">✅ BERHASIL SELESAI POULING</div>
                <div className="border-t border-dashed border-neutral-700 pt-1 space-y-0.5 text-neutral-300 text-[10px]">
                  <div className="flex justify-between">
                    <span>Nama Anggota:</span>
                    <span className="font-bold text-white truncate max-w-[120px] inline-block">{currentMember.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plat Nomor:</span>
                    <span className="font-bold text-amber-400">{currentMember.licensePlate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volume BBM:</span>
                    <span className="font-bold">{dispenserLiters.toFixed(1)} L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Bayar:</span>
                    <span className="font-bold">Rp {dispenserPrice.toLocaleString('id-ID')} (LUNAS)</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-neutral-700 pt-1 text-[9px] text-[#10b981]">
                    <span>Sisa Kuota:</span>
                    <span>{myPertaliteQuota} L</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
