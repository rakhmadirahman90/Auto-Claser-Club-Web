import React, { useState, useMemo } from 'react';
import { MEMBER_PROFILES } from '../data';
import { 
  ChevronLeft, ChevronRight, Search, CheckCircle, ArrowRight, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import KtaCardView from './KtaCardView';
import ETollView from './ETollView';
import PertaliteView from './PertaliteView';

const TOLL_GATES = [
  { name: 'GTO JORR Seksi E3 (Jakarta)', price: 16000, desc: 'Jakarta Outer Ring Road' },
  { name: 'GTO Pasteur (Bandung)', price: 10500, desc: 'Tol Purbaleunyi Margahayu' },
  { name: 'GTO Makassar Seksi IV', price: 12000, desc: 'Tol Reformasi - Bandara' }
];

export default function MemberProfile() {
  const { memberProfiles } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Card view options
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0); // 0 = KTA, 1 = E-Toll Wallet, 2 = Subsidi Pertalite
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Balances and Quotas mapped per Member ID to maintain session state individually!
  const [etollBalances, setEtollBalances] = useState<Record<string, number>>({});
  const [pertaliteQuotas, setPertaliteQuotas] = useState<Record<string, number>>({});

  // Toll simulator state
  const [selectedTollGate, setSelectedTollGate] = useState(0);
  const [tollGateActive, setTollGateActive] = useState<null | 'authenticating' | 'open' | 'closed' | 'error'>(null);
  const [tollMessage, setTollMessage] = useState('');

  // Petrol simulator state
  const [selectedLiters, setSelectedLiters] = useState(15);
  const [petrolActive, setPetrolActive] = useState<null | 'filling' | 'completed'>(null);
  const [dispenserLiters, setDispenserLiters] = useState(0);
  const [dispenserPrice, setDispenserPrice] = useState(0);

  // Synthesizer beep utility for physically touch-responsive feedback
  const playSound = (type: 'beep' | 'success' | 'fill' | 'click' | 'error') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'success') {
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + index * 0.08);
          gain.gain.setValueAtTime(0.08, now + index * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.08 + 0.15);
          osc.start(now + index * 0.08);
          osc.stop(now + index * 0.08 + 0.15);
        });
      } else if (type === 'error') {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.35);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start();
        osc.stop(now + 0.35);
      } else if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else if (type === 'fill') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      }
    } catch (e) {
      console.warn("Audio Context blocked or unsupported:", e);
    }
  };

  const mergedProfiles = useMemo(() => {
    const staticList = MEMBER_PROFILES.map(staticMember => {
      const override = memberProfiles?.find(f => f.id === staticMember.id);
      return override ? { ...staticMember, ...override } : staticMember;
    });

    const customList = (memberProfiles || []).filter(firestoreMember => {
      return !MEMBER_PROFILES.some(staticMember => staticMember.id === firestoreMember.id);
    });

    return [...staticList, ...customList].filter(m => !m.isDeleted);
  }, [memberProfiles]);

  const filteredProfiles = useMemo(() => {
    const filtered = mergedProfiles.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (currentIndex >= filtered.length) {
      setCurrentIndex(0);
    }
    return filtered;
  }, [mergedProfiles, searchTerm, currentIndex]);

  const currentMember = filteredProfiles[currentIndex];

  // Dynamically load E-Toll & Fuel state for active member (defaults: Rp 150.000 / 40L)
  const currentMemberId = currentMember?.id || 'default';
  const myEtollBalance = etollBalances[currentMemberId] !== undefined ? etollBalances[currentMemberId] : 150000;
  const myPertaliteQuota = pertaliteQuotas[currentMemberId] !== undefined ? pertaliteQuotas[currentMemberId] : 40;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const nextProfile = () => {
    playSound('click');
    setCurrentIndex((prev) => (prev + 1) % filteredProfiles.length);
    setIsFlipped(false);
    setTollGateActive(null);
    setPetrolActive(null);
  };

  const prevProfile = () => {
    playSound('click');
    setCurrentIndex((prev) => (prev - 1 + filteredProfiles.length) % filteredProfiles.length);
    setIsFlipped(false);
    setTollGateActive(null);
    setPetrolActive(null);
  };

  const handleTopUp = (amount: number) => {
    playSound('success');
    setEtollBalances(prev => ({
      ...prev,
      [currentMemberId]: myEtollBalance + amount
    }));
  };

  const handlePayToll = () => {
    playSound('click');
    const gate = TOLL_GATES[selectedTollGate];
    
    if (myEtollBalance < gate.price) {
      playSound('error');
      setTollGateActive('error');
      setTollMessage(`Saldo tidak cukup! Sisa saldo Rp ${myEtollBalance.toLocaleString('id-ID')}. Butuh Rp ${gate.price.toLocaleString('id-ID')}`);
      return;
    }

    setTollGateActive('authenticating');
    setTollMessage('Menempelkan kartu e-Toll ke Reader GTO...');

    setTimeout(() => {
      playSound('beep');
      setEtollBalances(prev => ({
        ...prev,
        [currentMemberId]: myEtollBalance - gate.price
      }));
      setTollGateActive('open');
      setTollMessage(`TRANSAKSI SUKSES! Saldo terpotong Rp ${gate.price.toLocaleString('id-ID')}`);
      playSound('success');

      setTimeout(() => {
        setTollGateActive('closed');
        setTimeout(() => {
          setTollGateActive(null);
        }, 800);
      }, 3000);
    }, 1200);
  };

  const handleFillPertalite = () => {
    playSound('click');
    if (myPertaliteQuota <= 0) {
      playSound('error');
      alert("Kuota Subsidi Pertalite Anda hari ini sudah habis (0 Liter).");
      return;
    }

    const litersToFill = Math.min(selectedLiters, myPertaliteQuota);
    setPetrolActive('filling');
    setDispenserLiters(0);
    setDispenserPrice(0);

    const pricePerLiter = 10000; // Rp 10.000 / Liter
    let currentL = 0;

    const interval = setInterval(() => {
      currentL += 0.5;
      if (currentL >= litersToFill) {
        clearInterval(interval);
        setDispenserLiters(litersToFill);
        setDispenserPrice(litersToFill * pricePerLiter);
        setPetrolActive('completed');
        playSound('success');

        setPertaliteQuotas(prev => ({
          ...prev,
          [currentMemberId]: myPertaliteQuota - litersToFill
        }));
      } else {
        setDispenserLiters(currentL);
        setDispenserPrice(currentL * pricePerLiter);
        playSound('fill');
      }
    }, 80);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Search and Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 pb-4 border-b border-theme-border">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-theme-text flex items-center gap-2">
            Wallet KTA Digital ACC
          </h2>
          <p className="text-xs md:text-sm text-theme-muted mt-1">
            Kartu Tanda Anggota dengan Integrasi E-Toll & Barcode Subsidi Pertalite
          </p>
        </div>

        {/* Search input bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 text-theme-muted" size={18} />
          <input 
            type="text"
            placeholder="Cari nama, nomor KTA atau mobil..."
            className="w-full pl-10 pr-4 py-2.5 border border-theme-border rounded-2xl bg-theme-surface text-theme-text font-medium focus:outline-none focus:ring-2 focus:ring-theme-primary text-sm transition-all shadow-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {currentMember ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Column: Member Profile Card View */}
          <div className="bg-theme-surface border border-theme-border rounded-3xl p-6 shadow-xl flex flex-col items-center text-center space-y-5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-indigo-500" />
            
            {/* Member Portrait */}
            <div className="relative w-28 h-36 md:w-32 md:h-40 rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-neutral-900 shadow-2xl shrink-0 animate-fade-in">
              {currentMember.imageUrl ? (
                <img 
                  src={currentMember.imageUrl} 
                  alt={currentMember.name} 
                  className="w-full h-full object-cover object-top" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-amber-900/60 to-amber-950 text-amber-400 font-extrabold text-4xl">
                  {currentMember.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              {/* Contactless symbol wave icon inside photobox */}
              <div className="absolute bottom-1.5 right-1.5 bg-black/75 p-1 rounded-lg z-10 border border-amber-500/30">
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            {/* Name and KTA label */}
            <div className="space-y-1.5">
              <h3 className="text-xl md:text-2xl font-black text-theme-text tracking-tight uppercase">
                {currentMember.name}
              </h3>
              <p className="text-xs font-mono font-bold text-amber-500 tracking-widest bg-amber-500/10 inline-block px-3 py-1 rounded-full border border-amber-500/20">
                {currentMember.membershipNumber}
              </p>
            </div>

            {/* Detail stats table list */}
            <div className="grid grid-cols-2 gap-3.5 w-full bg-theme-bg/60 rounded-2xl p-4 border border-theme-border/60 text-left text-xs md:text-sm">
              <div>
                <span className="block text-[10px] text-theme-muted uppercase tracking-wider mb-0.5">Model Mobil</span>
                <span className="font-bold text-theme-text truncate block">{currentMember.car}</span>
              </div>
              <div>
                <span className="block text-[10px] text-theme-muted uppercase tracking-wider mb-0.5">Plat Nomor</span>
                <span className="font-bold text-amber-500 font-mono tracking-wide">{currentMember.licensePlate}</span>
              </div>
              <div className="border-t border-theme-border/60 pt-2.5 mt-2">
                <span className="block text-[10px] text-theme-muted uppercase tracking-wider mb-0.5">Tahun Bergabung</span>
                <span className="font-mono font-bold text-theme-text">{currentMember.yearJoined}</span>
              </div>
              <div className="border-t border-theme-border/60 pt-2.5 mt-2">
                <span className="block text-[10px] text-theme-muted uppercase tracking-wider mb-0.5">Status Anggota</span>
                <span className="font-bold text-emerald-500 flex items-center gap-1">
                  <CheckCircle size={13} /> Terverifikasi
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Wallet Options Bento List */}
          <div className="space-y-4 font-sans">
            <h3 className="text-xs font-bold text-theme-muted uppercase tracking-widest flex items-center gap-2 pl-1">
              <span>🪪</span> Layanan KTA Digital & Smart Wallet
            </h3>

            <div className="space-y-3">
              {/* Option 1: View KTA Physical Card */}
              <div 
                onClick={() => {
                  playSound('click');
                  const el = document.getElementById('kta-3d-wrap');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="bg-gradient-to-r from-neutral-900 to-neutral-950 hover:from-neutral-950 hover:to-amber-955/20 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all hover:scale-[1.01] hover:border-amber-500/40 shadow-lg group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl shadow-inner shrink-0">
                    🪪
                  </div>
                  <div className="min-w-0">
                    <span className="block font-black text-sm text-amber-500 group-hover:text-amber-400 transition-colors">Putar Balik KTA</span>
                    <span className="block text-xs text-theme-muted truncate">Tampilkan Ketentuan & Barcode Belakang</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 relative z-10 shrink-0">
                  <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all">
                    BUKA
                  </span>
                  <ArrowRight size={14} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 2: EToll Wallet Simulator */}
              <div 
                onClick={() => {
                  playSound('click');
                  const el = document.getElementById('etoll-wallet-panel');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="bg-theme-surface hover:bg-theme-border/60 border border-theme-border rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all hover:scale-[1.01] shadow-lg group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center text-xl shadow-inner shrink-0">
                    🛣️
                  </div>
                  <div className="min-w-0">
                    <span className="block font-black text-sm text-theme-text group-hover:text-theme-primary transition-colors">Bayar GTO Tol (e-Toll)</span>
                    <span className="block text-xs text-theme-muted truncate">Saldo Aktif: <span className="font-bold text-yellow-500 font-mono text-xs">Rp {myEtollBalance.toLocaleString('id-ID')}</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-2 relative z-10 shrink-0">
                  <span className="text-[10px] font-bold text-theme-text bg-theme-bg px-2.5 py-1 rounded-full border border-theme-border group-hover:bg-theme-primary group-hover:text-white transition-all">
                    PINDAH
                  </span>
                  <ArrowRight size={14} className="text-theme-muted group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 3: Pertalite QR barcode subsidy */}
              <div 
                onClick={() => {
                  playSound('click');
                  const el = document.getElementById('fuel-station-panel');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="bg-theme-surface hover:bg-theme-border/60 border border-theme-border rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all hover:scale-[1.01] shadow-lg group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl shadow-inner shrink-0">
                    ⛽
                  </div>
                  <div className="min-w-0">
                    <span className="block font-black text-sm text-theme-text group-hover:text-emerald-500 transition-colors">Kran Subsidi Pertalite</span>
                    <span className="block text-xs text-theme-muted truncate">Kuota Hari ini: <span className="font-bold text-emerald-500 font-mono text-xs">{myPertaliteQuota} Liter</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-2 relative z-10 shrink-0">
                  <span className="text-[10px] font-bold text-[#10b981] bg-theme-bg px-2.5 py-1 rounded-full border border-theme-border group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    PINDAH
                  </span>
                  <ArrowRight size={14} className="text-theme-muted group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Accent helper card guidelines */}
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 text-[11px] text-theme-muted flex gap-3 items-start leading-relaxed shadow-sm">
              <span className="text-base shrink-0">📢</span>
              <p>
                KTA Digital Anda sekarang telah <strong>Terintegrasi Penuh (KTA Terpadu)</strong>. Saldo e-Toll dan kuota BBM Pertalite disatukan ke dalam 1 ID fisik anggota secara otomatis. Klik kartu untuk memutar balik.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* SECTION: PREVIEW KTA DIGITAL RESMI DI HALAMAN UTAMA */}
      {currentMember && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-theme-surface border border-theme-border rounded-3xl p-6 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-theme-border pb-4 gap-3">
            <div>
              <h4 className="text-lg font-black text-theme-text uppercase tracking-tight flex items-center gap-2">
                <span className="bg-amber-500/10 text-amber-500 px-2.5 py-1.5 rounded-xl text-base">🪪</span>
                KTA Digital Terpadu ACC
              </h4>
              <p className="text-xs text-theme-muted mt-1">
                KTA Hybrid Multiguna resmi Auto Claser Club (ACC) – Mengintegrasikan e-Toll (ACC Pay) & program BBM subsidi tepat terproteksi
              </p>
            </div>
            <span className="text-[10px] font-mono font-black text-emerald-500 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/15 uppercase tracking-wider flex items-center gap-1.5 shrink-0 self-start sm:self-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              SISTEM TERPAKET AKTIF
            </span>
          </div>

          <KtaCardView
            currentMember={currentMember}
            playSound={playSound}
            myEtollBalance={myEtollBalance}
            handleTopUp={handleTopUp}
            handlePayToll={handlePayToll}
            selectedTollGate={selectedTollGate}
            setSelectedTollGate={setSelectedTollGate}
            tollGateActive={tollGateActive}
            tollMessage={tollMessage}
            myPertaliteQuota={myPertaliteQuota}
            selectedLiters={selectedLiters}
            setSelectedLiters={setSelectedLiters}
            handleFillPertalite={handleFillPertalite}
            petrolActive={petrolActive}
            dispenserLiters={dispenserLiters}
            dispenserPrice={dispenserPrice}
          />
        </motion.div>
      )}

      {/* FOOTER DIRECT CAROUSEL PAGINATION SYSTEM */}
      {filteredProfiles.length > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4 border-t border-theme-border">
          <button 
            onClick={prevProfile} 
            className="p-2.5 rounded-full border border-theme-border text-theme-text hover:bg-theme-surface transition-colors cursor-pointer"
            title="Anggota Sebelumnya"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="text-xs md:text-sm font-mono text-theme-muted">
            Anggota <span className="font-bold text-theme-text leading-none">{currentIndex + 1}</span> dari <span className="font-bold text-theme-text leading-none">{filteredProfiles.length}</span>
          </div>

          <button 
            onClick={nextProfile} 
            className="p-2.5 rounded-full border border-theme-border text-theme-text hover:bg-theme-surface transition-colors cursor-pointer"
            title="Anggota Berikutnya"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12">
          <Info className="mx-auto text-theme-muted mb-2 animate-bounce" size={36} />
          <p className="text-theme-muted text-sm font-semibold">Tidak ada anggota yang cocok dengan pencarian.</p>
        </div>
      )}
    </div>
  );
}
