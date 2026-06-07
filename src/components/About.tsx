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
  const [selectedMember, setSelectedMember] = useState<any>(null);
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
    const getRoleRank = (roleStr: string): number => {
      const r = (roleStr || '').toLowerCase();
      if (r.includes('pembina')) return 1;
      if (r.includes('penasehat') || r.includes('penasihat')) return 2;
      if ((r.includes('ketua') && (r.includes('umum') || r.includes('pusat') || r.includes('nasional'))) || r.includes('president') || r.startsWith('ketum')) {
        if (r.includes('wakil') || r.includes('vice')) return 5;
        return 3;
      }
      if (r.includes('ketua harian')) return 4;
      if (r.includes('wakil ketua') || r.includes('vice president') || r.includes('waketum') || r.includes('wakil ketua harian')) return 5;
      if (r.includes('sekretaris') || r.includes('sekertaris') || r.includes('sekjen') || r.includes('secretary')) return 6;
      if (r.includes('bendahara') || r.includes('treasurer')) return 7;
      if (r.includes('korwil') || r.includes('koordinator wilayah')) return 8;
      if (r.includes('divisi') || r.includes('devisi') || r.includes('bidang') || r.includes('departemen') || r.includes('koordinator') || r.includes('seksi') || r.includes('kabid')) return 9;
      return 10;
    };

    const committeeList = [...COMMITTEE_MEMBERS.filter(s => !committee?.find(f => f.id === s.id)), ...(committee || [])].filter(m => !m.isDeleted);

    // Strictly sort by Rank and then by displayOrder
    committeeList.sort((a, b) => {
      const rankA = getRoleRank(a.role);
      const rankB = getRoleRank(b.role);
      if (rankA !== rankB) return rankA - rankB;
      const orderA = a.displayOrder ?? 99;
      const orderB = b.displayOrder ?? 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name);
    });

    // Partition lists for a pristine structural tree display
    const pembina = committeeList.filter(m => m.role.toLowerCase().includes('pembina'));
    const penasehat = committeeList.filter(m => m.role.toLowerCase().includes('penasehat') || m.role.toLowerCase().includes('penasihat'));
    
    const harian = committeeList.filter(m => {
      const r = m.role.toLowerCase();
      return (
        (r.includes('ketua') || r.includes('sekretaris') || r.includes('sekertaris') || r.includes('bendahara') || r.includes('president') || r.includes('ketum') || r.includes('wakil')) &&
        !r.includes('pembina') && !r.includes('penasehat') && !r.includes('penasihat') && !r.includes('korwil') && !r.includes('divisi') && !r.includes('devisi')
      );
    });

    const korwil = committeeList.filter(m => m.role.toLowerCase().includes('korwil') || m.role.toLowerCase().includes('koordinator wilayah'));
    const divisi = committeeList.filter(m => {
      const r = m.role.toLowerCase();
      return (r.includes('divisi') || r.includes('devisi') || r.includes('bidang') || r.includes('departemen')) && !r.includes('pembina') && !r.includes('penasehat') && !r.includes('penasihat');
    });

    const others = committeeList.filter(m => {
      return !pembina.some(x => x.id === m.id) &&
             !penasehat.some(x => x.id === m.id) &&
             !harian.some(x => x.id === m.id) &&
             !korwil.some(x => x.id === m.id) &&
             !divisi.some(x => x.id === m.id);
    });

    const partitionDivisions = () => {
      const grouped: { name: string; coordinator: any; members: any[] }[] = [];
      const divNames = [
        'Humas',
        'OKK',
        'IT & Dokumentasi',
        'Touring',
        'Seni & Budaya',
        'Kemitraan & Wirausaha',
        'Sosial & Keagamaan',
        'Peralatan dan Perlengkapan'
      ];
      
      const map = new Map<string, any[]>();
      divisi.forEach(m => {
        const key = m.role.replace(/^(di|de)visi\s+/i, '').trim();
        if (!map.has(key)) {
          map.set(key, []);
        }
        map.get(key)!.push(m);
      });

      const sortedKeys = Array.from(map.keys()).sort((a, b) => {
        const indexA = divNames.indexOf(a);
        const indexB = divNames.indexOf(b);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
      });

      sortedKeys.forEach(key => {
        const list = map.get(key)!;
        const coordinator = list[0];
        const members = list.slice(1);
        grouped.push({
          name: key,
          coordinator,
          members
        });
      });

      return grouped;
    };

    const divisionGroups = partitionDivisions();

    // Sub-render helper for clean circular / card avatars with face centering
    const renderMemberCard = (item: any, colorTheme: 'gold' | 'silver' | 'bronze' | 'blue' | 'purple' | 'emerald') => {
      let gradient = 'from-amber-400 to-yellow-600';
      if (colorTheme === 'silver') gradient = 'from-slate-400 to-slate-600';
      if (colorTheme === 'bronze') gradient = 'from-orange-400 to-amber-700';
      if (colorTheme === 'blue') gradient = 'from-blue-400 to-indigo-600';
      if (colorTheme === 'purple') gradient = 'from-purple-400 to-pink-600';
      if (colorTheme === 'emerald') gradient = 'from-emerald-400 to-teal-600';

      return (
        <div 
          key={item.id} 
          onClick={() => setSelectedMember(item)}
          className="bg-theme-surface border border-theme-border/70 hover:border-theme-primary/40 p-4 rounded-2xl flex items-center gap-4 transition-all hover:translate-y-[-2px] duration-200 shadow-sm cursor-pointer"
        >
          <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 border-2 border-theme-border bg-theme-bg shadow-inner flex items-center justify-center relative">
            {item.imageUrl && item.imageUrl.trim() !== '' ? (
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="h-full w-full object-cover object-top" 
                referrerPolicy="no-referrer" 
              />
            ) : (
              <div className={`h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-extrabold text-sm`}>
                {item.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-black uppercase text-theme-primary tracking-widest block truncate">
              {item.role}
            </span>
            <h4 className="text-sm font-bold text-theme-text mt-0.5 truncate">{item.name}</h4>
            {item.description && (
              <p className="text-[11px] text-theme-muted mt-1 leading-normal line-clamp-1">{item.description}</p>
            )}
          </div>
        </div>
      );
    };

    return (
      <div className="max-w-6xl mx-auto py-2 space-y-16">
        {/* Title Block */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-4.5xl font-extrabold text-theme-text mb-4 tracking-tight">Struktur Kepengurusan ACC</h2>
          <div className="h-1.5 w-24 bg-theme-primary rounded-full mx-auto mb-6" />
          <p className="text-theme-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Formasi resmi dewan pembina, penasehat, pengurus harian serta jajaran divisi yang mendedikasikan waktu, pikiran, dan tenaga demi Auto Claser Club.
          </p>
        </div>

        {/* 1. Dewan Pembina Section */}
        {pembina.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-theme-border/60 pb-3">
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 animate-pulse" />
              <h3 className="text-lg font-black tracking-wider text-theme-text uppercase">Dewan Pembina</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pembina.map(m => renderMemberCard(m, 'gold'))}
            </div>
          </div>
        )}

        {/* 2. Dewan Penasehat Section */}
        {penasehat.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-theme-border/60 pb-3">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
              <h3 className="text-lg font-black tracking-wider text-theme-text uppercase">Dewan Penasehat</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {penasehat.map(m => renderMemberCard(m, 'silver'))}
            </div>
          </div>
        )}

        {/* 3. Pengurus Harian Inti Section */}
        {harian.length > 0 && (
          <div className="space-y-6 bg-theme-surface/35 border border-theme-border/40 p-6 rounded-3xl">
            <div className="flex items-center gap-3 border-b border-theme-border/60 pb-3 mb-6">
              <div className="h-2.5 w-2.5 rounded-full bg-theme-primary" />
              <h3 className="text-lg font-black tracking-wider text-theme-text uppercase">Pengurus Harian Inti</h3>
            </div>
            
            {/* Featured Ketua Umum at the top-center */}
            {harian.find(m => m.role.toLowerCase() === 'ketua umum') && (() => {
              const ketum = harian.find(m => m.role.toLowerCase() === 'ketua umum')!;
              return (
                <div className="flex justify-center mb-10">
                  <div 
                    onClick={() => setSelectedMember(ketum)}
                    className="w-full max-w-md relative p-0.5 rounded-2xl bg-gradient-to-r from-theme-primary to-theme-secondary shadow-lg overflow-hidden hover:scale-[1.02] duration-300 transition-all cursor-pointer"
                  >
                    <div className="bg-theme-surface p-5 rounded-[14px] flex items-center gap-5">
                      <div className="h-20 w-20 rounded-2xl overflow-hidden shrink-0 border-2 border-theme-primary bg-theme-bg shadow-md flex items-center justify-center relative">
                        {ketum.imageUrl && ketum.imageUrl.trim() !== '' ? (
                          <img src={ketum.imageUrl} alt={ketum.name} className="h-full w-full object-cover object-top" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center text-white font-black text-xl">
                            {ketum.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-black uppercase text-theme-primary tracking-widest block">{ketum.role}</span>
                        <h4 className="text-lg font-bold text-theme-text mt-1">{ketum.name}</h4>
                        <p className="text-xs text-theme-muted mt-1 leading-relaxed">{ketum.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Rest of the executive members below */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {harian
                .filter(m => m.role.toLowerCase() !== 'ketua umum')
                .map(m => renderMemberCard(m, 'bronze'))}
            </div>
          </div>
        )}

        {/* 4. Koordinator Wilayah Selection */}
        {korwil.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-theme-border/60 pb-3">
              <div className="h-2.5 w-2.5 rounded-full bg-sky-500" />
              <h3 className="text-lg font-black tracking-wider text-theme-text uppercase">Koordinator Wilayah (Korwil)</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {korwil.map(m => renderMemberCard(m, 'blue'))}
            </div>
          </div>
        )}

        {/* 5. Jajaran Divisi & Departemen */}
        {divisionGroups.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-theme-border/60 pb-3">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-lg font-black tracking-wider text-theme-text uppercase">Jajaran Divisi & Departemen</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {divisionGroups.map(divGroup => {
                return (
                  <div 
                    key={divGroup.name}
                    className="bg-theme-surface/40 border border-theme-border/60 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm hover:border-theme-primary/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Division Name Header */}
                      <div className="flex items-center justify-between border-b border-theme-border/45 pb-2.5 mb-4">
                        <h4 className="text-sm font-black text-theme-text tracking-wide uppercase flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          Divisi {divGroup.name}
                        </h4>
                        <span className="text-[10px] font-extrabold text-white bg-emerald-600/95 px-2.5 py-0.5 rounded-full shadow-sm">
                          {1 + divGroup.members.length} Personel
                        </span>
                      </div>

                      {/* Coordinator section at the top of the division */}
                      {divGroup.coordinator && (
                        <div className="mb-5">
                          <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider mb-2 block bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 w-max">
                            👑 Koordinator Divisi
                          </span>
                          <div 
                            onClick={() => setSelectedMember(divGroup.coordinator)}
                            className="bg-theme-surface border-2 border-theme-primary/45 p-4 rounded-2xl flex items-center gap-4 transition-all shadow-md hover:translate-y-[-2px] duration-200 cursor-pointer"
                          >
                            <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 border-2 border-theme-primary bg-theme-bg shadow-inner flex items-center justify-center relative">
                              {divGroup.coordinator.imageUrl && divGroup.coordinator.imageUrl.trim() !== '' ? (
                                <img 
                                  src={divGroup.coordinator.imageUrl} 
                                  alt={divGroup.coordinator.name} 
                                  className="h-full w-full object-cover object-top" 
                                  referrerPolicy="no-referrer" 
                                />
                              ) : (
                                <div className="h-full w-full bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center text-white font-extrabold text-sm">
                                  {divGroup.coordinator.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-black uppercase text-theme-primary tracking-widest block truncate">
                                {divGroup.coordinator.role}
                              </span>
                              <h4 className="text-sm font-bold text-theme-text mt-0.5 truncate">{divGroup.coordinator.name}</h4>
                              {divGroup.coordinator.description && (
                                <p className="text-[11px] text-theme-muted mt-1 leading-normal line-clamp-2">{divGroup.coordinator.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Members / Anggota Section below */}
                      {divGroup.members.length > 0 && (
                        <div className="space-y-2 pt-3 border-t border-theme-border/30">
                          <span className="text-[10px] font-black uppercase text-theme-muted tracking-wide mb-2 block">
                            👥 Anggota Divisi
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {divGroup.members.map(member => (
                              <div 
                                key={member.id} 
                                onClick={() => setSelectedMember(member)}
                                className="bg-theme-surface/70 border border-theme-border/50 p-3 rounded-xl flex items-center gap-3 transition-all hover:translate-y-[-1px] duration-150 cursor-pointer"
                              >
                                <div className="h-10 w-10 rounded-full overflow-hidden shrink-0 border border-theme-border bg-theme-bg flex items-center justify-center relative">
                                  {member.imageUrl && member.imageUrl.trim() !== '' ? (
                                    <img 
                                      src={member.imageUrl} 
                                      alt={member.name} 
                                      className="h-full w-full object-cover object-top" 
                                      referrerPolicy="no-referrer" 
                                    />
                                  ) : (
                                    <div className="h-full w-full bg-slate-500 flex items-center justify-center text-white font-black text-[10px]">
                                      {member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="text-[9px] font-bold uppercase text-theme-muted block truncate">
                                    {member.role}
                                  </span>
                                  <h5 className="text-xs font-bold text-theme-text mt-0.5 truncate">{member.name}</h5>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. Other / Custom Fields */}
        {others.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-theme-border/60 pb-3">
              <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />
              <h3 className="text-lg font-black tracking-wider text-theme-text uppercase">Struktur Kepengurusan Lainnya</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map(m => renderMemberCard(m, 'purple'))}
            </div>
          </div>
        )}
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

      {/* Committee Member Detail Overlay Modal */}
      <AnimatePresence>
        {selectedMember && (() => {
          const m = selectedMember;
          
          // Compute organization tier
          const getOrganizationTier = (roleStr: string): string => {
            const r = (roleStr || '').toLowerCase();
            if (r.includes('pembina')) return 'Dewan Pembina ACC';
            if (r.includes('penasehat') || r.includes('penasihat')) return 'Dewan Penasehat ACC';
            if ((r.includes('ketua') && (r.includes('umum') || r.includes('pusat') || r.includes('nasional'))) || r.includes('president') || r.startsWith('ketum')) return 'Badan Pengurus Pusat';
            if (r.includes('ketua harian')) return 'Badan Pengurus Harian';
            if (r.includes('wakil') || r.includes('sekretaris') || r.includes('bendahara') || r.includes('sekjen') || r.includes('secretary') || r.includes('treasurer')) return 'Badan Pengurus Harian';
            if (r.includes('korwil') || r.includes('koordinator wilayah')) return 'Koordinator Regional ACC';
            if (r.includes('divisi') || r.includes('devisi') || r.includes('bidang') || r.includes('departemen')) return 'Jajaran Divisi & Departemen';
            return 'Staff Khusus Organisasi ACC';
          };

          const tier = getOrganizationTier(m.role);

          // Find gradient based on role
          let modalGrad = 'from-emerald-500/20 via-teal-500/10 to-transparent';
          let borderTh = 'border-emerald-500/30';
          let badgeBg = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
          if (tier.includes('Pembina')) {
            modalGrad = 'from-amber-500/20 via-yellow-600/10 to-transparent';
            borderTh = 'border-amber-500/30';
            badgeBg = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
          } else if (tier.includes('Penasehat')) {
            modalGrad = 'from-slate-400/20 via-slate-500/10 to-transparent';
            borderTh = 'border-slate-400/30';
            badgeBg = 'bg-slate-400/15 text-slate-300 border-slate-400/30';
          } else if (tier.includes('Pusat') || tier.includes('Harian')) {
            modalGrad = 'from-orange-500/19 via-amber-700/10 to-transparent';
            borderTh = 'border-orange-500/30';
            badgeBg = 'bg-orange-500/15 text-orange-400 border-orange-500/30';
          } else if (tier.includes('Regional')) {
            modalGrad = 'from-blue-500/20 via-indigo-600/10 to-transparent';
            borderTh = 'border-blue-500/30';
            badgeBg = 'bg-blue-500/15 text-blue-400 border-blue-500/30';
          }

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-theme-surface border border-theme-border/85 p-5 sm:p-7 rounded-3xl w-full max-w-sm relative shadow-2xl font-sans overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background decorative glow */}
                <div className={`absolute top-0 left-0 right-0 h-44 bg-gradient-to-b ${modalGrad} pointer-events-none -z-10`} />

                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-theme-muted hover:text-theme-text p-2 hover:bg-theme-bg/80 border border-theme-border/50 rounded-full transition-all cursor-pointer z-10"
                >
                  <X size={18} />
                </button>

                {/* Profile Header Elements */}
                <div className="flex flex-col items-center text-center mt-4">
                  {/* Avatar wrapper */}
                  <div className={`h-24 w-24 rounded-full overflow-hidden border-4 ${borderTh} bg-theme-bg shadow-xl flex items-center justify-center relative mb-4`}>
                    {m.imageUrl && m.imageUrl.trim() !== '' ? (
                      <img 
                        src={m.imageUrl} 
                        alt={m.name} 
                        className="h-full w-full object-cover object-top" 
                        referrerPolicy="no-referrer" 
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center text-white font-black text-2xl">
                        {m.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Tier Tag */}
                  <span className={`text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full border ${badgeBg} mb-2`}>
                    {tier}
                  </span>

                  {/* Member Name & Role */}
                  <h3 className="text-xl font-bold text-theme-text leading-tight px-2">{m.name}</h3>
                  <p className="text-xs font-semibold text-theme-primary mt-1 tracking-wider uppercase">{m.role}</p>
                </div>

                {/* Detailed card container */}
                <div className="mt-6 space-y-4">
                  <div className="bg-theme-bg/60 border border-theme-border/60 p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-theme-muted tracking-wide mb-1.5">
                      Dedikasi & Deskripsi Peran
                    </p>
                    <p className="text-xs sm:text-sm text-theme-text leading-relaxed font-medium">
                      {m.description || `Menjabat sebagai ${m.role} di kepengurusan Auto Claser Club (ACC) Nasional, mendedikasikan kontribusi aktif bagi kekeluargaan dan kejayaan klub.`}
                    </p>
                  </div>

                  {/* Metadata fields */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-theme-bg/40 border border-theme-border/40 p-3 rounded-xl text-center">
                      <span className="text-[9px] font-bold uppercase text-theme-muted block mb-0.5">Status Pengurus</span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Aktif Resmi
                      </span>
                    </div>
                    <div className="bg-theme-bg/40 border border-theme-border/40 p-3 rounded-xl text-center">
                      <span className="text-[9px] font-bold uppercase text-theme-muted block mb-0.5">KTA Elektronik</span>
                      <span className="text-xs font-bold text-theme-text uppercase font-mono border border-theme-border/50 px-1 py-0.5 rounded bg-theme-bg">
                        ACC-KTA-{m.id.startsWith('c') ? m.id.toUpperCase() : `ID${m.id}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action footer */}
                <div className="flex gap-2.5 mt-6 justify-end">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-theme-primary to-theme-secondary text-white text-xs font-black tracking-wider uppercase rounded-xl hover:scale-[1.02] shadow-sm transition-all cursor-pointer text-center"
                  >
                    Selesai
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
