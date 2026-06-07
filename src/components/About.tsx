import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Users, Shield, MapPin, Info, History, Network, 
  FileCheck, Download, Eye, X, Award 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { COMMITTEE_MEMBERS } from '../data';

export default function About() {
  const { chapters, aboutData, committee } = useData();
  const location = useLocation();
  const hash = location.hash.toLowerCase();

  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const title = aboutData?.title || "Tentang Auto Claser Club";
  const desc1 = aboutData?.description1 || "Auto Claser Club (ACC) adalah komunitas otomotif yang mewadahi para pemilik dan pecinta mobil. Berdiri atas dasar kesamaan hobi dan kecintaan terhadap dunia otomotif, ACC berkembang menjadi lebih dari sekadar klub mobil; kami adalah keluarga kedua bagi anggotanya.";
  const desc2 = aboutData?.description2 || "Dengan ribuan member yang tersebar di berbagai wilayah nusantara, kami aktif mengadakan berbagai kegiatan positif mulai dari kopi darat (kopdar), touring, kegiatan sosial, hingga edukasi keselamatan berkendara bersama instansi terkait.";
  const fallbackImg = "https://images.unsplash.com/photo-1541348263662-e068fba22af2?auto=format&fit=crop&q=80&w=1000";
  const imgUrl = aboutData?.imageUrl || fallbackImg;
  const statsMembers = aboutData?.statsMembers || "500+";

  // Choose tab based on current hash
  let activeTab = 'about';
  if (hash === '#sejarah') activeTab = 'sejarah';
  else if (hash === '#struktur') activeTab = 'struktur';
  else if (hash === '#dokumen') activeTab = 'dokumen';

  const tabs = [
    { id: 'about', label: 'Tentang', hash: '#about', icon: Info },
    { id: 'sejarah', label: 'Sejarah', hash: '#sejarah', icon: History },
    { id: 'struktur', label: 'Struktur', hash: '#struktur', icon: Network },
    { id: 'dokumen', label: 'Dokumen Resmi', hash: '#dokumen', icon: FileCheck },
  ];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2000);
  };

  const renderTentang = () => (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 sm:mb-20">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-theme-text">
            {title}
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-theme-primary rounded-full" />
          
          <p className="text-theme-muted text-sm sm:text-base md:text-lg leading-relaxed">
            {desc1}
          </p>
          <p className="text-theme-muted text-sm sm:text-base md:text-lg leading-relaxed">
            {desc2}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
            <div className="bg-theme-surface/50 p-4 sm:p-6 rounded-lg border border-theme-border">
              <Users className="text-theme-primary mb-3 sm:mb-4" size={28} />
              <h3 className="text-lg sm:text-xl font-bold text-theme-text mb-1">Persaudaraan</h3>
              <p className="text-theme-muted text-xs sm:text-sm">Solidaritas sebagai keluarga besar yang saling membantu dan menghargai.</p>
            </div>
            <div className="bg-theme-surface/50 p-4 sm:p-6 rounded-lg border border-theme-border">
              <Shield className="text-theme-secondary mb-3 sm:mb-4" size={28} />
              <h3 className="text-lg sm:text-xl font-bold text-theme-text mb-1">Aksi Positif</h3>
              <p className="text-theme-muted text-xs sm:text-sm">Gaya hidup positif, tertib berlalu lintas, dan aktif dalam baksos.</p>
            </div>
          </div>
        </div>

        <div className="relative mt-8 lg:mt-0">
          <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
            <img 
              src={imgUrl}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== fallbackImg) {
                  target.src = fallbackImg;
                }
              }}
              alt="Community Gathering" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-theme-primary/20 mix-blend-multiply" />
          </div>
          
          {/* Stats Badge */}
          <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-theme-surface border border-theme-border p-4 sm:p-6 rounded-xl shadow-xl flex items-center gap-4 sm:gap-6">
            <div>
              <p className="text-2xl sm:text-4xl font-black text-theme-text">{statsMembers}</p>
              <p className="text-theme-muted text-xs sm:text-sm font-medium">Anggota Aktif</p>
            </div>
            <div className="w-[1px] h-10 sm:h-12 bg-theme-border" />
            <div>
              <p className="text-2xl sm:text-4xl font-black text-theme-secondary">{chapters.length}</p>
              <p className="text-theme-muted text-xs sm:text-sm font-medium">Chapter Regional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="mt-32">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-theme-text mb-4">Chapter & Regional</h3>
          <p className="text-theme-muted max-w-2xl mx-auto">Kami tersebar di berbagai pelosok nusantara, siap menyambut Anda kapanpun dan dimanapun.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="bg-theme-surface/40 border border-theme-border hover:border-zinc-600 px-6 py-4 rounded-full flex items-center gap-3 transition-colors cursor-default">
              <MapPin className="text-theme-primary" size={20} />
              <span className="text-theme-muted font-medium">{chapter.name}</span>
              <span className="bg-theme-bg text-xs font-bold text-theme-muted px-2 py-1 rounded-full">{chapter.memberCount} Member</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSejarah = () => {
    const timelineData = [
      {
        year: '2018',
        title: 'Inisiasi & Pendirian Club',
        desc: 'Diinisiasi pertama kali pada 15 Agustus 2018 di Jakarta oleh 12 deklarator pendiri. Bermula dari hobi bincang santai dan kopi darat (kopdar) mingguan di bilangan Senayan, sepakat merancang wadah berskala nasional.',
        icon: Users,
        badgeColor: 'bg-theme-primary'
      },
      {
        year: '2020',
        title: 'Deklarasi Nasional & Badan Hukum',
        desc: 'Auto Claser Club disahkan di bawah akta notaris resmi dan didaftarkan sebagai organisasi perkumpulan berbadan hukum nasional. Struktur Pengurus Pusat dibentuk bersama formulasi AD/ART.',
        icon: Shield,
        badgeColor: 'bg-theme-secondary'
      },
      {
        year: '2022',
        title: 'Kopdarnas I Yogyakarta',
        desc: 'Kopi Darat Nasional pertama sukses diselenggarakan di Kota Yogyakarta, menyatukan ratusan anggota dari berbagai penjuru daerah di Indonesia untuk memupuk persaudaraan sejati.',
        icon: MapPin,
        badgeColor: 'bg-theme-primary'
      },
      {
        year: '2024 - Sekarang',
        title: 'Afiliasi IMI & Pengabdian Sosial',
        desc: 'Resmi terdaftar di bawah naungan Ikatan Motor Indonesia (IMI). Meluncurkan kampanye nasional Smart Driving serta menggalakkan bantuan kemanusiaan tanggap bencana di berbagai daerah.',
        icon: Award,
        badgeColor: 'bg-theme-secondary text-[#ef4444]'
      }
    ];

    return (
      <div className="max-w-4xl mx-auto py-2">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4.5xl font-bold text-theme-text mb-4">Lintas Sejarah ACC</h2>
          <div className="h-1 w-20 bg-theme-secondary rounded-full mx-auto mb-6" />
          <p className="text-theme-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Perjalanan panjang membangun wadah dedikasi otomotif dan persaudaraan tanpa batas dari tahun ke tahun.
          </p>
        </div>

        <div className="relative border-l border-theme-border ml-4 sm:ml-8 md:ml-32 space-y-12 sm:space-y-16">
          {timelineData.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <div key={index} className="relative pl-8 sm:pl-12">
                <span className={`absolute -left-[20px] top-1 flex h-10 w-10 items-center justify-center rounded-full ${item.badgeColor} text-white shadow-xl border-4 border-theme-bg z-10`}>
                  <ItemIcon size={16} />
                </span>

                <div className="absolute left-[-150px] top-1.5 hidden md:block text-right w-28">
                  <span className="text-xl font-black text-theme-secondary">{item.year}</span>
                </div>

                <div className="bg-theme-surface/50 border border-theme-border p-5 sm:p-6 rounded-2xl shadow-md hover:border-theme-primary/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-theme-text">
                      {item.title}
                    </h3>
                    <span className="text-xs sm:text-sm font-black text-theme-secondary md:hidden bg-theme-bg px-3 py-1 rounded-full border border-theme-border">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-theme-muted text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStruktur = () => {
    const committeeList = [...COMMITTEE_MEMBERS.filter(s => !committee?.find(f => f.id === s.id)), ...(committee || [])];

    // Filter to find President (role containing "President" or "Ketua Umum" or first element if neither found)
    const president = committeeList.find(m => m.role.toLowerCase().includes('president') || m.role.toLowerCase().includes('ketua umum')) || committeeList[0];
    
    // VP is role containing 'wakil'
    const vp = committeeList.find(m => m.role.toLowerCase().includes('wakil')) || committeeList[1];
    
    // Others are the rest of the members
    const others = committeeList.filter(m => m.id !== president?.id && m.id !== vp?.id);

    return (
      <div className="max-w-6xl mx-auto py-2">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4.5xl font-bold text-theme-text mb-4">Masa Kepengurusan Pusat</h2>
          <div className="h-1 w-20 bg-theme-primary rounded-full mx-auto mb-6" />
          <p className="text-theme-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Sinergi pimpinan dan dewan divisi yang mendedikasikan waktu, pikiran, dan tenaga demi kejayaan Auto Claser Club tingkat Nasional.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-10">
          {/* Level 1: President Card */}
          {president && (
            <div className="w-full max-w-sm">
              <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-theme-primary to-theme-secondary shadow-2xl overflow-hidden hover:scale-[1.03] duration-300 transition-all cursor-default">
                <div className="bg-theme-surface p-6 rounded-[14px]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 rounded-xl overflow-hidden shadow-lg shadow-black/30 border border-theme-border/60 flex-shrink-0">
                      {president.imageUrl ? (
                        <img src={president.imageUrl} alt={president.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center text-white font-extrabold text-xl">
                          {president.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase text-theme-primary tracking-widest block">{president.role}</span>
                      <h3 className="text-lg font-bold text-theme-text mt-0.5">{president.name}</h3>
                    </div>
                  </div>
                  <p className="text-theme-muted text-xs sm:text-sm leading-relaxed">{president.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Level 2: VP Card */}
          {vp && (
            <div className="w-full max-w-sm">
              <div className="bg-theme-surface/80 hover:bg-theme-surface border border-theme-border hover:border-theme-secondary/40 p-6 rounded-2xl shadow-xl transition-all hover:scale-[1.02] duration-300 cursor-default">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-xl overflow-hidden shadow-lg shadow-black/30 border border-theme-border/60 flex-shrink-0">
                    {vp.imageUrl ? (
                      <img src={vp.imageUrl} alt={vp.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl">
                        {vp.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-theme-secondary tracking-widest block">{vp.role}</span>
                    <h3 className="text-lg font-bold text-theme-text mt-0.5">{vp.name}</h3>
                  </div>
                </div>
                <p className="text-theme-muted text-xs sm:text-sm leading-relaxed">{vp.description}</p>
              </div>
            </div>
          )}

          {/* Core Pengurus Grid */}
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 border-t border-theme-border/50 pt-10">
            {others.map((item, index) => (
              <div 
                key={item.id || index} 
                className="bg-theme-surface/40 hover:bg-theme-surface border border-theme-border/80 hover:border-zinc-700 p-5 rounded-2xl flex flex-col justify-between transition-all hover:translate-y-[-4px] duration-300 cursor-default"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg overflow-hidden shadow-md border border-theme-border/40 flex-shrink-0 bg-theme-bg">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-sm">
                          {item.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <div className="leading-tight">
                      <span className="text-[10px] font-black uppercase text-theme-muted tracking-widest block">{item.role}</span>
                      <h4 className="text-sm font-bold text-theme-text mt-0.5">{item.name}</h4>
                    </div>
                  </div>
                  <p className="text-theme-muted text-xs leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDokumen = () => {
    const dokumenData = [
      {
        id: 'sk',
        title: 'SK Kemenkumham RI',
        no: 'No. AHU-0012394.AH.01.07.Tahun 2020',
        issuer: 'Kementerian Hukum & Hak Asasi Manusia Republik Indonesia',
        date: '25 Agustus 2020',
        desc: 'Keputusan resmi Pemerintah Republik Indonesia menetapkan legalitas Auto Claser Club sebagai badan hukum resmi perkumpulan nasional terdaftar.',
        type: 'Badan Hukum Perkumpulan'
      },
      {
        id: 'akta',
        title: 'Akta Pendirian Notaris',
        no: 'Akta No. 42 Tanggal 10 Oktober 2019',
        issuer: 'Linda Suryani, S.H., M.Kn. (Notaris Jakarta)',
        date: '10 Oktober 2019',
        desc: 'Akta legalisasi autentik yang ditandatangani segenap deklarator pendiri sebagai dasar konstitusional berdirinya perkumpulan sosial ACC.',
        type: 'Akta Notaris Resmi'
      },
      {
        id: 'adart',
        title: 'AD / ART Organisasi',
        no: 'Edisi Hasil Musyawarah Nasional II 2024',
        issuer: 'Dewan Presidium Kepengurusan Pusat ACC',
        date: '12 Januari 2024',
        desc: 'Anggaran Dasar & Anggaran Rumah Tangga formal yang mengatur seluruh skema organisasi, administrasi keanggotaan, serta regulasi kode etik pengendara.',
        type: 'Aturan Dasar Kegiatan'
      },
      {
        id: 'imi',
        title: 'Sertifikat Afiliasi IMI',
        no: 'Sertifikat Keanggotaan No. IMI-ACC-1052',
        issuer: 'Ikatan Motor Indonesia (Indonesian Motor Association)',
        date: '04 Juni 2021',
        desc: 'Status keanggotaan terdaftar resmi di bawah naungan induk asosiasi otomotif tertinggi Indonesia, menjamin pengakuan resmi di ranah kegiatan hobi nasional.',
        type: 'Sertifikasi Induk Olahraga'
      }
    ];

    return (
      <div className="max-w-6xl mx-auto py-2">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4.5xl font-bold text-theme-text mb-4">Legalitas & Dokumen Resmi</h2>
          <div className="h-1 w-20 bg-theme-primary rounded-full mx-auto mb-6" />
          <p className="text-theme-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Transparansi legalitas di hadapan hukum dan negara. Menegaskan Auto Claser Club sebagai wadah kredibel yang patuh regulasi nasional.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {dokumenData.map((docItem) => (
            <div 
              key={docItem.id} 
              className="bg-theme-surface/50 border border-theme-border p-6 rounded-2xl flex flex-col justify-between hover:border-theme-primary/30 transition-all hover:scale-[1.01] duration-300"
            >
              <div>
                <span className="text-[10px] font-black uppercase text-theme-secondary bg-theme-secondary/15 px-3 py-1 rounded-full border border-theme-secondary/30 tracking-widest">{docItem.type}</span>
                <h3 className="text-lg sm:text-xl font-bold text-theme-text mt-4 mb-2">{docItem.title}</h3>
                <p className="font-mono text-xs text-theme-muted mb-4">{docItem.no}</p>
                <p className="text-theme-muted text-xs sm:text-sm leading-relaxed mb-6">{docItem.desc}</p>
              </div>

              <div className="flex items-center justify-between border-t border-theme-border/50 pt-4 mt-2">
                <div className="text-left">
                  <p className="text-[10px] uppercase text-theme-muted font-bold tracking-wider">Diterbitkan Oleh</p>
                  <p className="text-xs text-theme-text font-bold mt-0.5 truncate max-w-[180px] sm:max-w-xs">{docItem.issuer}</p>
                </div>
                <button
                  onClick={() => setSelectedDoc(docItem)}
                  className="flex items-center gap-2 px-4 py-2 bg-theme-surface hover:bg-theme-bg text-theme-primary border border-theme-border hover:border-theme-primary text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Eye size={14} />
                  <span>Detail</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="about" className="py-8 sm:py-16 md:py-24 bg-theme-bg border-y border-theme-border flex-1 flex flex-col justify-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Sleek Profile/About Sub-menu Tab Selector */}
        <div className="flex justify-center mb-10 sm:mb-16 border-b border-theme-border/60">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-px scrollbar-none max-w-full">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  to={`/${tab.hash}`}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 border-b-2 text-xs sm:text-sm uppercase tracking-wider font-bold transition-all whitespace-nowrap relative ${
                    isActive 
                      ? 'border-theme-primary text-theme-primary' 
                      : 'border-transparent text-theme-muted hover:text-theme-text'
                  }`}
                >
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-theme-primary" 
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dynamic Nested View Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === 'about' && renderTentang()}
            {activeTab === 'sejarah' && renderSejarah()}
            {activeTab === 'struktur' && renderStruktur()}
            {activeTab === 'dokumen' && renderDokumen()}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Document Detail Overlay Modal with download simulation */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-theme-surface border border-theme-border p-6 sm:p-8 rounded-2xl w-full max-w-lg relative shadow-2xl font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedDoc(null)}
                className="absolute top-4 right-4 text-theme-muted hover:text-theme-text p-2 hover:bg-theme-bg rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              <span className="text-[10px] font-black uppercase text-theme-primary bg-theme-primary/10 px-3 py-1 rounded-full tracking-widest">{selectedDoc.type}</span>
              <h3 className="text-xl sm:text-2xl font-black text-theme-text mt-4 mb-2">{selectedDoc.title}</h3>
              <p className="font-mono text-xs text-theme-muted bg-theme-bg p-3 rounded-lg border border-theme-border/60 mb-6 font-bold">{selectedDoc.no}</p>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase text-theme-muted tracking-wider">Lembaga Penerbit / Otoritas</p>
                  <p className="text-sm font-bold text-theme-text mt-1">{selectedDoc.issuer}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-theme-muted tracking-wider">Tanggal Pengesahan / Rilis</p>
                  <p className="text-sm font-bold text-theme-text mt-1">{selectedDoc.date}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-theme-muted tracking-wider">Fungsi Legalitas</p>
                  <p className="text-xs sm:text-sm text-theme-muted mt-1 leading-relaxed">{selectedDoc.desc}</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleDownload}
                  className="px-5 py-2.5 bg-theme-surface hover:bg-theme-bg border border-theme-border hover:border-theme-secondary text-xs font-bold text-theme-text tracking-wider uppercase rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  {downloadSuccess ? (
                    <span className="text-theme-secondary font-black animate-pulse">✓ Terunduh!</span>
                  ) : (
                    <>
                      <Download size={14} />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-5 py-2.5 bg-theme-secondary hover:bg-red-700 text-xs font-bold text-theme-text tracking-wider uppercase rounded-lg transition-all flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
                >
                  <X size={14} />
                  <span>Tutup</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
