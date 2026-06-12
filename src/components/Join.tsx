import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, Download, RotateCw, ExternalLink, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

export default function Join() {
  const { joinData, addRegistration } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    vehicleType: '',
    vehicleYear: '',
    licensePlate: '',
    photo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Holds the registered info to display the interactive unique KTA
  const [registeredMember, setRegisteredMember] = useState<{
    name: string;
    phone: string;
    address: string;
    vehicleType: string;
    vehicleYear: string;
    licensePlate: string;
    photo: string;
    membershipNumber: string;
    yearJoined: string;
  } | null>(null);

  const title = joinData?.title || 'Bergabung Bersama Kami';
  const description = joinData?.description || 'Isi formulir pendaftaran di bawah ini untuk menjadi bagian dari keluarga besar Auto Claser Club. Admin kami akan segera memproses pendaftaran Anda.';
  
  // Sanitizing the WhatsApp number input to properly clean spaces, non-digits, and leading zeros
  const rawAdminWA = joinData?.adminWhatsApp || '6289616746342';
  let adminWhatsApp = rawAdminWA.trim().replace(/\D/g, '');
  if (adminWhatsApp.startsWith('0')) {
    adminWhatsApp = '62' + adminWhatsApp.substring(1);
  } else if (adminWhatsApp === '') {
    adminWhatsApp = '6289616746342';
  }

  const imgUrl = (joinData?.imageUrl && joinData.imageUrl.trim() !== '') 
    ? joinData.imageUrl 
    : 'https://images.unsplash.com/photo-1503370321287-320dcf7366d4?auto=format&fit=crop&q=80&w=1000';

  // Synthesizer beep utility for direct touch-responsive audio feedback
  const playSound = (type: 'beep' | 'success' | 'click') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === 'click') {
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
      } else if (type === 'beep') {
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
      }
    } catch (e) {
      console.warn("Audio Context blocked or unsupported:", e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress at 70% quality using JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setFormData(prev => ({ ...prev, photo: compressedDataUrl }));
        playSound('beep');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.vehicleType || !formData.vehicleYear || !formData.licensePlate) {
      toast.error("Harap isi semua kolom pendaftaran.");
      return;
    }

    setIsSubmitting(true);

    try {
      await addRegistration({
        ...formData,
        createdAt: new Date().toISOString()
      });
      
      playSound('success');

      // Generate a unique registration KTA identifier
      const currentYear = new Date().getFullYear();
      const genKtaNumber = `REG-${Math.floor(1000 + Math.random() * 9000)}`;
      const uniqueKtaNumber = `KTA-${currentYear}-${genKtaNumber}`;

      setRegisteredMember({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        vehicleType: formData.vehicleType,
        vehicleYear: formData.vehicleYear,
        licensePlate: formData.licensePlate.toUpperCase(),
        photo: formData.photo,
        membershipNumber: uniqueKtaNumber,
        yearJoined: currentYear.toString()
      });

      toast.success("Pendaftaran Berhasil! Kartu Tanda Anggota Anda telah siap di bawah ini.");
      
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan data.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!registeredMember) return;
    playSound('click');

    const message = `Halo Admin ACC, saya baru saja mendaftar menjadi anggota via Website dan membuat KTA Preview dengan Nomor Registrasi: ${registeredMember.membershipNumber}. Berikut data diri saya:%0A%0A` +
                    `*Nama Lengkap:* ${registeredMember.name}%0A` +
                    `*No. WhatsApp:* ${registeredMember.phone}%0A` +
                    `*Alamat/Domisili:* ${registeredMember.address}%0A` +
                    `*Jenis Kendaraan:* ${registeredMember.vehicleType}%0A` +
                    `*Tahun Kendaraan:* ${registeredMember.vehicleYear}%0A` +
                    `*Nomor Polisi:* ${registeredMember.licensePlate}%0A%0A` +
                    `Mohon diproses untuk aktivasi KTA resmi. Terima kasih.`;

    const waLink = `https://wa.me/${adminWhatsApp}?text=${message}`;
    window.open(waLink, '_blank');
  };

  // Download high quality PNG of the KTA card via html2canvas
  const handleDownloadCard = async (side: 'front' | 'back') => {
    playSound('click');
    const targetId = side === 'front' ? 'reg-card-front-capture' : 'reg-card-back-capture';
    const cardEl = document.getElementById(targetId);
    if (!cardEl) return;

    const downloadToast = toast.loading('Memproses resolusi tinggi...');
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardEl, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2 // High Resolution output
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `KTA_ACC_${side.toUpperCase()}_${registeredMember?.name.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
      toast.success(`KTA Tampak ${side === 'front' ? 'Depan' : 'Belakang'} sukses diunduh!`, { id: downloadToast });
    } catch (err) {
      console.error(err);
      toast.error('Gagal mengunduh kartu. Silakan screenshot manual kartu Anda.', { id: downloadToast });
    }
  };

  const handleResetForm = () => {
    playSound('click');
    setRegisteredMember(null);
    setFormData({
      name: '',
      phone: '',
      address: '',
      vehicleType: '',
      vehicleYear: '',
      licensePlate: '',
      photo: '',
    });
    setIsFlipped(false);
  };

  return (
    <section id="join" className="py-8 sm:py-16 md:py-24 bg-theme-bg relative flex-1 flex flex-col justify-start md:justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {registeredMember ? (
          // ==========================================
          // SUCCESS PREVIEW & GENERATE KTA SCREEN
          // ==========================================
          <div className="max-w-3xl mx-auto bg-theme-surface border border-theme-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-500 animate-pulse" />
            
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center justify-center bg-emerald-500/10 text-emerald-500 p-3 rounded-full border border-emerald-500/20">
                <CheckCircle size={36} className="animate-bounce" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-theme-text tracking-tight uppercase">
                Selamat, Pendaftaran Berhasil!
              </h2>
              <p className="text-xs sm:text-sm text-theme-muted max-w-lg mx-auto">
                Kartu Tanda Anggota (KTA) Digital Anda telah berhasil digenerate secara otomatis. Silakan putar kartu untuk melihat ketentuan atau unduh untuk disimpan.
              </p>
            </div>

            {/* Interactive 3D KTA Card view */}
            <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-neutral-950/60 rounded-2xl border border-theme-border/60 mb-8 overflow-hidden">
              <div className="text-center mb-4">
                <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  PREVIEW KTA PENDAFTARAN RESMI
                </span>
                <p className="text-[10px] text-theme-muted mt-1.5">
                  Klik kartu untuk memutar balik Tampak Belakang/Depan
                </p>
              </div>

              {/* 3D Container with custom width ratio */}
              <div className="perspective-1000 w-full max-w-[340px] h-[210px] sm:h-[220px] py-1">
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative w-full h-full rounded-2xl preserve-3d cursor-pointer select-none active:scale-95 transition-transform"
                  onClick={() => {
                    playSound('click');
                    setIsFlipped(!isFlipped);
                  }}
                >
                  {/* FRONT SIDE */}
                  <div 
                    id="reg-card-front-capture"
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-neutral-950 via-[#191105] to-neutral-900 p-4 text-white flex flex-col justify-between overflow-hidden border border-amber-500/30 backface-hidden shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                  >
                    {/* Watermark gradient pattern */}
                    <div className="absolute top-0 right-0 w-[150%] h-[150%] -translate-y-1/2 translate-x-1/3 bg-[radial-gradient(circle_at_bottom_left,transparent_40%,rgba(245,158,11,0.06)_50%,transparent_60%)] -rotate-12 pointer-events-none" />

                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-amber-500/25 pb-1 sm:pb-1.5">
                      <div className="flex items-center gap-1.5">
                        <img 
                          src="/logo.jpg" 
                          alt="ACC Logo" 
                          className="h-7 w-auto object-contain rounded bg-white p-0.5 border border-amber-500/20" 
                        />
                        <div>
                          <h3 className="font-extrabold tracking-widest text-amber-500 text-[9px] sm:text-[10.5px] leading-none uppercase">
                            Auto Claser Club
                          </h3>
                          <p className="text-[5.5px] tracking-widest text-neutral-400 font-mono italic mt-0.5">
                            LOYALITAS TANPA BATAS
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-[5.5px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-black font-sans leading-none shadow">
                          REGISTRASI BARU
                        </span>
                        <span className="text-[5px] text-amber-500 font-mono mt-0.5 font-bold tracking-widest">
                          INDONESIA
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex gap-2.5 items-center flex-1 my-1.5 label-profile">
                      {/* Photo box */}
                      <div className="relative w-11 h-14 sm:w-[48px] sm:h-[62px] rounded overflow-hidden border border-amber-500/30 bg-neutral-900 shrink-0 shadow-md">
                        {registeredMember.photo ? (
                          <img 
                            src={registeredMember.photo} 
                            alt={registeredMember.name} 
                            className="w-full h-full object-cover object-top" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-amber-950 text-[#f59e0b] font-bold text-xs">
                            {registeredMember.name.substring(0,2).toUpperCase()}
                          </div>
                        )}
                        <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-yellow-500 rounded-full animate-pulse" />
                      </div>

                      {/* Particulars */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] sm:text-xs font-black text-amber-500 tracking-wide truncate leading-tight">
                          {registeredMember.name}
                        </div>
                        <span className="inline-block text-[5px] px-1 py-0.2 bg-amber-500/15 text-amber-400 rounded font-black uppercase tracking-wide">
                          ANGGOTA REGISTERED
                        </span>

                        {/* Metadata fields */}
                        <div className="grid grid-cols-2 gap-x-1.5 gap-y-0.5 mt-1 border-t border-neutral-800/80 pt-1 text-left">
                          <div>
                            <span className="text-[#a1a1aa] block text-[4.5px] leading-none">UNIT KENDARAAN</span>
                            <span className="text-white text-[7.5px] font-bold block truncate">
                              {registeredMember.vehicleType} ({registeredMember.vehicleYear})
                            </span>
                          </div>
                          <div>
                            <span className="text-[#a1a1aa] block text-[4.5px] leading-none">PLAT NOMOR</span>
                            <span className="text-amber-400 text-[7.5px] font-mono font-bold block">
                              {registeredMember.licensePlate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end border-t border-amber-500/20 pt-1 text-left">
                      <div className="flex items-center gap-1 shrink-0">
                        <div className="w-4 h-3 rounded bg-gradient-to-br from-amber-200 via-amber-500 to-yellow-600 border border-amber-600/30 overflow-hidden flex flex-col justify-around p-0.2">
                          <div className="grid grid-cols-3 gap-0.2 h-full opacity-60">
                            {[...Array(6)].map((_, i) => <div key={i} className="border border-amber-900/10 bg-amber-200/40 rounded-[0.5px]" />)}
                          </div>
                        </div>
                        <svg className="w-2.5 h-2.5 text-amber-500/70" fill="none" viewBox="0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>

                      <div className="font-mono text-[8px] sm:text-[9.5px] font-black text-[#f59e0b] bg-black/50 px-1.5 py-0.2.5 rounded border border-neutral-800">
                        {registeredMember.membershipNumber}
                      </div>

                      <div className="text-[5px] text-neutral-400 text-right font-mono leading-none">
                        <span className="block text-amber-500 font-bold text-[4.5px]">BERGABUNG</span>
                        {registeredMember.yearJoined}
                      </div>
                    </div>
                  </div>

                  {/* REVERSE SIDE */}
                  <div 
                    id="reg-card-back-capture"
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#0c0c0d] via-[#141416] to-[#070708] p-4 text-white flex flex-col justify-between overflow-hidden border border-neutral-800 rotate-y-180 backface-hidden shadow-2xl"
                  >
                    <div className="absolute left-0 top-3 right-0 h-5 bg-neutral-950 border-y border-neutral-900 z-0" />
                    <div className="h-4" />

                    {/* Terms */}
                    <div className="text-[5px] text-neutral-300 space-y-0.5 relative z-10 font-sans leading-normal border-b border-neutral-800/60 pb-1">
                      <p className="font-extrabold text-amber-500 text-[5.5px] uppercase tracking-wide">
                        KETENTUAN KTA TERPADU REGISTERED:
                      </p>
                      <p>1. Kartu merupakan bukti Pra-Registrasi resmi di Auto Claser Club (ACC).</p>
                      <p>2. Hubungi Admin WhatsApp untuk proses verifikasi KTA Fisik & pengaktifan saldo.</p>
                      <p>3. Berlaku sah untuk unit kendaraan {registeredMember.vehicleType} [{registeredMember.licensePlate}].</p>
                      <p>4. Jaga kerahasiaan nomor KTA Anda demi kepentingan perlindungan keanggotaan.</p>
                    </div>

                    {/* Signatures & Barcode */}
                    <div className="flex justify-between items-center relative z-10">
                      <div className="text-left select-none">
                        <span className="block text-[3.5px] text-neutral-500 tracking-wider font-mono">CHAIRMAN SIGNATURE</span>
                        <div className="h-4 flex items-end">
                          <span className="font-serif italic text-[8.5px] text-amber-400 font-bold tracking-widest">
                            Sukri Lanra
                          </span>
                        </div>
                        <span className="block text-[4px] text-neutral-400 font-bold border-t border-neutral-800 mt-0.5">
                          KETUA UMUM ACC
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="flex flex-col items-center bg-white p-0.5 rounded border border-neutral-800">
                          <div className="w-12 h-3 flex gap-[1px] items-stretch justify-center">
                            {[1,3,2,1,4,1,2,3,1,2,1,3,2,4,1,3].map((w, idx) => (
                              <div key={idx} className="bg-black" style={{ width: `${w * 0.6}px` }} />
                            ))}
                          </div>
                          <span className="block text-[3.5px] font-mono font-bold text-neutral-950 tracking-tighter mt-0.5">
                            {registeredMember.membershipNumber}
                          </span>
                        </div>
                        
                        <img 
                          src="/logo.jpg" 
                          alt="ACC Seal Logo" 
                          className="w-5 h-5 rounded-full border border-amber-500/40 bg-white p-0.5 object-contain" 
                        />
                      </div>
                    </div>
                  </div>

                </motion.div>
              </div>

              {/* Control bar */}
              <div className="flex flex-wrap gap-2.5 justify-center mt-5 w-full">
                <button
                  type="button"
                  onClick={() => handleDownloadCard('front')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-black text-xs font-black rounded-lg hover:bg-amber-400 cursor-pointer shadow transition-colors"
                >
                  <Download size={13} /> Unduh Depan
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadCard('back')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 text-white text-xs font-black rounded-lg hover:bg-neutral-700 cursor-pointer shadow transition-colors border border-theme-border/80"
                >
                  <Download size={13} /> Unduh Belakang
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setIsFlipped(!isFlipped);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 text-neutral-200 text-xs font-bold rounded-lg hover:bg-neutral-700 cursor-pointer shadow transition-colors border border-theme-border/80"
                >
                  <RotateCw size={13} /> Putar Kartu
                </button>
              </div>
            </div>

            {/* Steps panel to finish registration */}
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 sm:p-5 text-left mb-8 space-y-3">
              <h4 className="font-extrabold text-[#f59e0b] text-sm uppercase flex items-center gap-1.5">
                <span>⚠️</span> LAKUKAN LANGKAH TERAKHIR:
              </h4>
              <p className="text-xs text-theme-muted leading-relaxed">
                Kartu di atas berstatus <strong>Registered (Dalam Antrean Verifikasi)</strong>. Silakan selesaikan pendaftaran Anda dengan menghubungi Admin ACC via WhatsApp agar data dicocokkan, divalidasi, dan diaktivasi untuk e-Toll Dan Kuota Pertamina Subsidi Tepat.
              </p>
              
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-extrabold px-5 py-3 rounded-xl transition-all shadow-md text-sm cursor-pointer mt-1 hover:scale-[1.01]"
              >
                <Send size={15} /> Hubungi Admin ACC via WhatsApp <ExternalLink size={14} />
              </button>
            </div>

            {/* Back button */}
            <div className="flex justify-center border-t border-theme-border/50 pt-6">
              <button
                type="button"
                onClick={handleResetForm}
                className="flex items-center gap-1.5 text-xs text-theme-muted hover:text-theme-text font-bold uppercase transition-colors max-w-xs cursor-pointer"
              >
                <RefreshCw size={13} /> Formulir Baru (Daftar Lagi)
              </button>
            </div>

          </div>
        ) : (
          // ==========================================
          // ORIGINAL JOIN FORM CONTAINER
          // ==========================================
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-8 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-theme-text mb-4 sm:mb-6">Formulir Pendaftaran</h3>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-theme-muted mb-1">Nama Lengkap</label>
                    <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full bg-theme-bg border border-theme-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm text-theme-text focus:outline-none focus:border-theme-primary transition-colors" placeholder="Masukkan nama lengkap Anda" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-theme-muted mb-1">No. WhatsApp</label>
                    <input required type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-theme-bg border border-theme-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm text-theme-text focus:outline-none focus:border-theme-primary transition-colors" placeholder="contoh: 081234567890" />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-theme-muted mb-1">Alamat / Domisili</label>
                    <textarea required id="address" name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full bg-theme-bg border border-theme-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm text-theme-text focus:outline-none focus:border-theme-primary transition-colors resize-none" placeholder="Masukkan alamat lengkap atau kota domisili" />
                  </div>
                  <div>
                    <label htmlFor="vehicleType" className="block text-xs sm:text-sm font-medium text-theme-muted mb-1">Model / Varian Kendaraan</label>
                    <input required type="text" id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full bg-theme-bg border border-theme-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm text-theme-text focus:outline-none focus:border-theme-primary transition-colors" placeholder="contoh: Honda Civic FD1" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="vehicleYear" className="block text-xs sm:text-sm font-medium text-theme-muted mb-1">Tahun</label>
                      <input required type="text" id="vehicleYear" name="vehicleYear" value={formData.vehicleYear} onChange={handleChange} className="w-full bg-theme-bg border border-theme-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm text-theme-text focus:outline-none focus:border-theme-primary transition-colors" placeholder="contoh: 2010" />
                    </div>
                    <div>
                      <label htmlFor="licensePlate" className="block text-xs sm:text-sm font-medium text-theme-muted mb-1">Nomor Polisi</label>
                      <input required type="text" id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleChange} className="w-full bg-theme-bg border border-theme-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm text-theme-text focus:outline-none focus:border-theme-primary transition-colors animate-none" placeholder="B 1234 ABC" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="photo" className="block text-xs sm:text-sm font-medium text-theme-muted mb-1">Upload Foto Peserta/Kendaraan (Opsional)</label>
                    <input type="file" id="photo" accept="image/*" onChange={handlePhotoUpload} className="w-full bg-theme-bg border border-theme-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm text-theme-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-theme-primary/10 file:text-theme-primary hover:file:bg-theme-primary/20 focus:outline-none focus:border-theme-primary transition-colors" />
                    {formData.photo && (
                      <div className="mt-2 h-24 w-24 rounded-lg overflow-hidden border border-theme-border animate-fade-in">
                        <img src={formData.photo} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>
                  
                  <button disabled={isSubmitting} type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold py-3 sm:py-4 rounded-xl mt-4 sm:mt-6 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] text-sm sm:text-base cursor-pointer shadow-lg">
                    <Send size={18} /> {isSubmitting ? 'Mengirim Data...' : 'Kirim Pendaftaran'}
                  </button>
                  <p className="text-[10px] sm:text-xs text-center text-theme-muted mt-3 leading-relaxed">
                    Data Anda aman tersimpan di database. Setelah mendaftar, KTA digital Anda akan digenerate secara langsung untuk dipreview & diunduh sebelum menghubungi Admin ACC.
                  </p>
                </form>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="order-1 md:order-2 space-y-4 sm:space-y-6"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-theme-text leading-tight">
                {title}
              </h2>
              <div className="h-1 w-16 sm:w-20 bg-theme-primary rounded-full" />
              <p className="text-sm sm:text-base md:text-lg text-theme-muted leading-relaxed">
                {description}
              </p>
              <div className="rounded-2xl overflow-hidden aspect-video shadow-2xl relative">
                 <img 
                   src={imgUrl} 
                   alt="Pendaftaran"
                   onError={(e) => {
                     const t = e.currentTarget as HTMLImageElement;
                     const fb = 'https://images.unsplash.com/photo-1503370321287-320dcf7366d4?auto=format&fit=crop&q=80&w=1000';
                     if (t.src !== fb) t.src = fb;
                   }}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-theme-bg/80 to-transparent"></div>
              </div>
            </motion.div>
            
          </div>
        )}
      </div>
    </section>
  );
}
