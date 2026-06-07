import { BlogPost, Activity, Chapter, CommitteeMember, MemberProfile } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Kopdar Gabungan ACC Regional Jabodetabek Awal Tahun',
    excerpt: 'Mempererat tali persaudaraan antar member di awal tahun dengan semangat baru dan visi yang lebih solid.',
    date: '10 Jan 2026',
    imageUrl: 'https://images.unsplash.com/photo-1511226888494-1a98622c1598?auto=format&fit=crop&q=80&w=1000',
    category: 'Kopdar',
    content: 'Acara Kopdar Gabungan (Kopdargab) awal tahun Auto Claser Club (ACC) Regional Jabodetabek berlangsung sukses dan meriah. Bertempat di area parkir Sentral Senayan, Jakarta, acara ini dihadiri oleh lebih dari 120 member aktif beserta jajaran pengurus pusat dan regional.\n\nTujuan utama dari kopdar perdana di tahun 2026 ini adalah mempererat tali persaudaraan antar member lama dan baru, sekaligus merumuskan agenda kegiatan bersama selama setahun ke depan. Acara diawali dengan sambutan dari Ketua Umum ACC, Ir. Herdian Syahputra, dilanjutkan dengan sesi perkenalan member baru, pembahasan road map event regional, serta coaching clinic singkat mengenai perawatan berkendara.\n\n"Semangat kebersamaan ini harus terus kita pelihara. ACC Jabodetabek adalah barometer pergerakan klub secara nasional," ungkap Aris Munandar selaku koordinator acara. Kopdar ditutup dengan sesi foto bersama dan makan malam santai penuh keakraban.',
    authorName: 'Aris Munandar',
    authorRole: 'Divisi Kegiatan & Touring',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    likes: 45,
    views: 182
  },
  {
    id: '2',
    title: 'Touring Ceria Jalur Selatan - Menembus Keindahan Alam',
    excerpt: 'Perjalanan panjang yang menguji ketahanan mesin sekaligus memanjakan mata dengan pemandangan pesisir selatan.',
    date: '25 Feb 2026',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-01f11e2f89da?auto=format&fit=crop&q=80&w=1000',
    category: 'Touring',
    content: 'Menjawab kerinduan para member akan petualangan jalanan, Auto Claser Club menggelar "Touring Ceria Jalur Selatan" dengan rute menantang sekaligus memanjakan mata. Kegiatan ini menempuh jarak kurang lebih 350 kilometer melewati panorama perbukitan hingga pesisir pantai selatan Pulau Jawa.\n\nSebanyak 35 mobil member ikut ambil bagian dalam iring-iringan rapi ini. Dengan menerapkan standar berkendara ketat dan pengawalan marshal berpengalaman, seluruh rombongan melaju aman. Selama perjalanan, peserta disuguhi udara segar pegunungan dan keelokan hamparan samudera luas.\n\n"Ini bukan sekadar mengemudi, melainkan petualangan spiritual di mana kita menghargai alam Nusantara serta menguji kekompakan berkendara secara berkelompok," kata salah satu peserta senior. Rombongan singgah di beberapa destinasi wisata lokal untuk mempromosikan pariwisata daerah sekaligus memberikan kontribusi ekonomi bagi pedagang kecil.',
    authorName: 'Aris Munandar',
    authorRole: 'Divisi Kegiatan & Touring',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    likes: 89,
    views: 342
  },
  {
    id: '3',
    title: 'Bakti Sosial Ramadhan bersama Panti Asuhan',
    excerpt: 'Auto Claser Club berbagi kebahagiaan di bulan yang suci bersama komunitas lokal.',
    date: '15 Mar 2026',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000',
    category: 'Baksos',
    content: 'Bulan suci Ramadhan selalu menjadi momen berharga bagi Auto Claser Club untuk menyebarkan kebaikan dan berbagi kebahagiaan. Tahun ini, ACC mengadakan program Bakti Sosial bertajuk "ACC Berbagi Berkah Ramadhan" bersama anak-anak yatim di Panti Asuhan Kasih Ibu.\n\nDalam kegiatan ini, para member mengumpulkan donasi berupa sembako, buku bacaan, alat tulis, pakaian layak pakai, serta santunan uang tunai. Kehangatan sangat terasa ketika para member berbuka puasa bersama anak-anak panti, diselingi kuis interaktif bernuansa keagamaan dan pembagian bingkisan lebaran.\n\nAmelia Putri mengungkapkan rasa syukurnya atas terlaksananya baksos ini. "Kami ingin kehadiran club otomotif ini membawa pengaruh nyata dan dampak sosial positif bagi lingkungan sekitar. Senyum bahagia mereka adalah motivasi terbesar kami untuk terus konsisten melakukan aksi kemanusiaan seperti ini di masa-masa mendatang," tuturnya.',
    authorName: 'Amelia Putri, S.I.Kom',
    authorRole: 'Sekretaris Jenderal',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    likes: 124,
    views: 421
  },
  {
    id: '4',
    title: 'Edukasi Safety Riding Bersama Kepolisian',
    excerpt: 'Kegiatan edukasi dan simulasi keselamatan berkendara yang diikuti oleh 50 member, berkolaborasi dengan Satlantas setempat.',
    date: '02 Apr 2026',
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000',
    category: 'Edukasi',
    content: 'Sebagai bagian dari kampanye keselamatan berkendara nasional, Auto Claser Club berkolaborasi dengan Satuan Lalu Lintas (Satlantas) Kepolisian menyelenggarakan workshop "Edukasi Safety Riding & Driving" khusus bagi seluruh member klub otomotif.\n\nWorkshop ini memadukan materi kelas teoretis mengenai teknik pengereman yang benar di jalan basah, etika menyalip, menjaga jarak aman, hingga simulasi praktik langsung di lapangan ber-rintangan. Petugas kepolisian menekankan pentingnya disiplin berlalu lintas sebagai cerminan kepribadian bangsa dan keselamatan bersama.\n\n"Klub otomotif harus menjadi pelopor keselamatan berlalulintas, bukannya pembuat onar atau pelanggar hukum. Dengan pemahaman teknis dan mentalitas sopan berkendara yang mumpuni, kita dapat meminimalisir risiko kecelakaan di jalan raya," tegas Ir. Herdian Syahputra selepas simulasi berkendara.',
    authorName: 'Ir. Herdian Syahputra, M.T.',
    authorRole: 'Ketua Umum (President)',
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    likes: 62,
    views: 215
  },
  {
    id: '5',
    title: 'Menembus Batas: Touring Lintas Pulau Berjalan Sukses',
    excerpt: 'Para rombongan club berhasil menyelesaikan misi touring lintas pulau dengan lancar, selamat, dan memperbanyak relasi di berbagai daerah.',
    date: '20 Mei 2026',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000',
    category: 'Touring',
    content: 'Perjalanan terjauh yang menantang adrenalin dan kekompakan tim akhirnya terselesaikan dengan gemilang. "Touring Lintas Pulau 2026" sukses menaklukkan rute antar pulau dari Jawa hingga menyeberang ke Bali dan Nusa Tenggara Barat.\n\nPetualangan spektakuler ini berlangsung selama sepuluh hari penuh tantangan cuaca ekstrem, tanjakan curam, dan medan berliku. Sebanyak 20 kendaraan andalan member teruji ketahanannya berkat persiapan mekanis optimal sebelum keberangkatan. Di setiap kota persinggahan, rombongan disambut hangat oleh komunitas otomotif lokal, mempererat silaturahmi antar pecinta otomotif nasional.\n\n"Ini adalah pembuktian bahwa dengan manajemen perjalanan yang matang, kesiapan kendaraan, dan kerja sama tim yang solid, tidak ada jarak yang tidak bisa kita taklukkan. Pengalaman ini akan selalu tertanam indah di benak setiap peserta," jelas Aris Munandar selaku Road Captain.',
    authorName: 'Aris Munandar',
    authorRole: 'Divisi Kegiatan & Touring',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    likes: 156,
    views: 562
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Jambore Nasional 2025',
    location: 'Bandung, Jawa Barat',
    date: 'Nov 2025',
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'SOTR & Berbagi Sahur',
    location: 'Jakarta',
    date: 'Mar 2026',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Anniversary Club ke-5',
    location: 'Yogyakarta',
    date: 'Jul 2025',
    imageUrl: 'https://images.unsplash.com/photo-1517026575980-3e1e2daf4ce7?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '4',
    title: 'Kopdar Rutin Gabungan Jabodetabek',
    location: 'Senayan, Jakarta',
    date: 'Jun 2026',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '5',
    title: 'Touring Kemerdekaan RI',
    location: 'Lintas Sumatera - Jawa',
    date: 'Ags 2026',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000'
  }
];

export const CHAPTERS: Chapter[] = [
  { id: '1', name: 'DKI Jakarta', memberCount: 150 },
  { id: '2', name: 'Jawa Barat', memberCount: 120 },
  { id: '3', name: 'Jawa Tengah', memberCount: 85 },
  { id: '4', name: 'Jawa Timur', memberCount: 90 },
  { id: '5', name: 'Sumatera', memberCount: 65 },
  { id: '6', name: 'Sulawesi & Indonesia Timur', memberCount: 40 },
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  { id: 'c1', name: 'Walikota Parepare H.Tasmin Hamid', role: 'Pembina', description: 'Dewan Pembina ACC, Walikota Parepare yang memberikan bimbingan dan dukungan kepengurusan.', displayOrder: 1 },
  { id: 'c2', name: 'Om H. Munir', role: 'Pembina', description: 'Dewan Pembina ACC, penasihat utama strategis kepengurusan.', displayOrder: 2 },
  { id: 'c3', name: 'Om H. Farman Amrullah', role: 'Pembina', description: 'Dewan Pembina ACC, aktif membina pertumbuhan chapter regional.', displayOrder: 3 },
  { id: 'c4', name: 'Om Yopi', role: 'Pembina', description: 'Dewan Pembina ACC, mendukung kesinambungan arah gerak klub nasional.', displayOrder: 4 },
  
  { id: 'c5', name: 'Om Haruna', role: 'Penasehat', description: 'Dewan Penasehat ACC, memberikan masukan & saran kebijakan organisasi.', displayOrder: 5 },
  { id: 'c6', name: 'Om Burhanuddin', role: 'Penasehat', description: 'Dewan Penasehat ACC, pengawas jalannya kode etik kekeluargaan klub.', displayOrder: 6 },
  { id: 'c7', name: 'Om Purwanto', role: 'Penasehat', description: 'Dewan Penasehat ACC, membina nilai kebersamaan antar lintas generasi.', displayOrder: 7 },

  { id: 'c8', name: 'Om Sukri Lanra', role: 'Ketua Umum', description: 'Ketua Umum (President) Auto Claser Club, pimpinan tertinggi pengambil keputusan dan pemegang arah kebijakan klub.', displayOrder: 8 },
  { id: 'c9', name: 'Om H. Barhaman', role: 'Ketua Harian', description: 'Mengkoordinir jalannya operasi harian pengurus pusat nasional secara berkala.', displayOrder: 9 },
  { id: 'c10', name: 'Om Amard', role: 'Wakil Ketua', description: 'Wakil Ketua Umum ACC, mendampingi Ketua Umum dalam pelaksanaan program kerja strategis.', displayOrder: 10 },
  { id: 'c11', name: 'Om Rusdan Tahir', role: 'Sekertaris', description: 'Sekretaris Umum ACC, mengurusi administrasi nasional, keanggotaan, serta dokumentasi korporasi klub.', displayOrder: 11 },
  { id: 'c12', name: 'Om H. Ahmad Yani', role: 'Bendahara', description: 'Bendahara Umum ACC, mengelola keuangan kas nasional, budgeting, dan laporan keuangan transparan.', displayOrder: 12 },

  { id: 'c13', name: 'Om Asdar', role: 'Korwil Sidrap', description: 'Koordinator Wilayah Sidrap, memimpin dan merangkul rekan-rekan regional Sidrap.', displayOrder: 13 },
  { id: 'c14', name: 'Om A.Sugawa', role: 'Korwil Sidrap', description: 'Koordinator Wilayah Sidrap, menggerakkan aktivitas dan persaudaraan otomotif Sidrap.', displayOrder: 14 },
  
  { id: 'c15', name: 'Om Alif Sandi', role: 'Korwil Barru', description: 'Koordinator Wilayah Barru, memfasilitasi persatuan klub di chapter Barru.', displayOrder: 15 },
  { id: 'c16', name: 'Om Saldi', role: 'Korwil Barru', description: 'Koordinator Wilayah Barru, aktif mengoordinasikan kopdar & baksos lokal.', displayOrder: 16 },

  { id: 'c17', name: 'Om Bendrop', role: 'Korwil Palopo', description: 'Koordinator Wilayah Palopo, mengkoordinir aktivitas perkumpulan chapter di wilayah Palopo.', displayOrder: 17 },
  { id: 'c18', name: 'Om Nanang', role: 'Korwil Palopo', description: 'Koordinator Wilayah Palopo, penggerak harian rekan otomotif regional Palopo.', displayOrder: 18 },

  { id: 'c19', name: 'Om Amri', role: 'Korwil Pinrang', description: 'Koordinator Wilayah Pinrang, mengawal kegiatan silaturahmi klub di regional Pinrang.', displayOrder: 19 },
  { id: 'c20', name: 'Om Akmal', role: 'Korwil Pinrang', description: 'Koordinator Wilayah Pinrang, menjalin kebersamaan erat antar member di Pinrang.', displayOrder: 20 },

  { id: 'c21', name: 'Om Maming', role: 'Korwil Majene', description: 'Koordinator Wilayah Majene, penanggung jawab utama kemajuan chapter Majene.', displayOrder: 21 },
  { id: 'c22', name: 'Om Arief', role: 'Korwil Pangkep', description: 'Koordinator Wilayah Pangkep, memimpin konsolidasi serta agenda regional Pangkep.', displayOrder: 22 },

  { id: 'c23', name: 'Om Adhi', role: 'Korwil Makassar', description: 'Koordinator Wilayah Makassar, menggerakkan chapter episentrum Ibukota Makassar.', displayOrder: 23 },
  { id: 'c24', name: 'Om Rizal', role: 'Korwil Makassar', description: 'Koordinator Wilayah Makassar, mendukung sinergi kolaborasi kegiatan kota Makassar.', displayOrder: 24 },

  { id: 'c25', name: 'Om Irwan', role: 'Korwil Mamasa', description: 'Koordinator Wilayah Mamasa, memperluas jangkauan dan mempererat tali persaudaraan di Mamasa.', displayOrder: 25 },
  { id: 'c26', name: 'Om Amiriddin', role: 'Korwil Enrekang', description: 'Koordinator Wilayah Enrekang, koordinator harian aksi hobi dan bakti sosial masyarakat Enrekang.', displayOrder: 26 },

  { id: 'c27', name: 'Om Andi Hasbial', role: 'Divisi Humas', description: 'Penghubung komunikasi internal web, media sosial, & pengenalan citra positif klub ke dunia luar.', displayOrder: 27 },
  { id: 'c28', name: 'Om Sulaeman', role: 'Divisi Humas', description: 'Hubungan masyarakat eksternal, menjalin komunikasi aktif dengan klub-klub sejawat.', displayOrder: 28 },

  { id: 'c29', name: 'Om Asmard', role: 'Divisi OKK', description: 'Divisi Organisasi, Kaderisasi & Keanggotaan, memformulasikan pembinaan nilai keorganisasian angggota.', displayOrder: 29 },
  { id: 'c30', name: 'Om H. Anas', role: 'Divisi OKK', description: 'Mata rantai kaderisasi, bertugas melakukan bimbingan orientasi dasar bagi calon pendaftar.', displayOrder: 30 },
  { id: 'c31', name: 'Om Wahyu', role: 'Divisi OKK', description: 'Mencatat kepatuhan keanggotaan dan pembaruan database administrasi KTA.', displayOrder: 31 },

  { id: 'c32', name: 'Om Rahmadi rahman', role: 'Divisi IT & Dokumentasi', description: 'Merancang dan maintain ekosistem IT klub, mengemas dokumentasi fotografi & videografi kegiatan.', displayOrder: 32 },
  { id: 'c33', name: 'Om Mahmud', role: 'Divisi IT & Dokumentasi', description: 'Arsiparis multimedia digital dan pengarah dokumentasi sinematik touring klub.', displayOrder: 33 },
  { id: 'c34', name: 'Om Umar', role: 'Divisi IT & Dokumentasi', description: 'Membantu penyediaan infrastruktur komunikasi digital dan publikasi visual online.', displayOrder: 34 },

  { id: 'c35', name: 'Om Mayor (Hilmi)', role: 'Divisi Touring', description: 'Pimpinan rombongan / Road Captain kawakan otomotif, menyusun SOP keselamatan berkendara di jalan raya.', displayOrder: 35 },
  { id: 'c36', name: 'Om Firman', role: 'Divisi Touring', description: 'Marshal andal, memetakan rute perjalanan, titik istirahat, serta kelengkapan mekanis konvoi.', displayOrder: 36 },

  { id: 'c37', name: 'Om Anto', role: 'Divisi Seni & Budaya', description: 'Mengorkestrasikan ekspresi seni kreatif, parade kebudayaan lokal daerah, dan event entertaimen.', displayOrder: 37 },
  { id: 'c38', name: 'Om Udin Abdullah', role: 'Divisi Seni & Budaya', description: 'Mendukung kearifan budaya nusantara dalam ragam festival pertemuan akbar ACC.', displayOrder: 38 },

  { id: 'c39', name: 'Om H. Heru Saenong', role: 'Divisi Kemitraan & Wirausaha', description: 'Menghubungkan sponsorship brand terkemuka, serta menumbuhkan ekosistem bisnis kreatif internal member.', displayOrder: 39 },
  { id: 'c40', name: 'Om Ciwang', role: 'Divisi Kemitraan & Wirausaha', description: 'Menggalang relasi partner bisnis eksternal, diskon suku cadang, & merchandise official.', displayOrder: 40 },
  { id: 'c41', name: 'Om Rossi', role: 'Divisi Kemitraan & Wirausaha', description: 'Mengelola perputaran unit wirausaha mandiri komunitas demi kemandirian finansial perkumpulan.', displayOrder: 41 },

  { id: 'c42', name: 'Om Zulkarnain', role: 'Divisi Sosial & Keagamaan', description: 'Pelaksana garda depan program baksos kemanusiaan, korban bencana, serta pengajian bersama.', displayOrder: 42 },
  { id: 'c43', name: 'Om Nasruddin', role: 'Divisi Sosial & Keagamaan', description: 'Mengatur kunjungan ke panti asuhan, kepedulian religius, dan ikatan silaturahmi spiritual.', displayOrder: 43 },
  { id: 'c44', name: 'Om Herul Anas', role: 'Divisi Sosial & Keagamaan', description: 'Menyusun aksi tanggap bencana daerah dan penggalangan donasi sosial teratur.', displayOrder: 44 },

  { id: 'c45', name: 'Om Ardhi', role: 'Devisi Peralatan dan Perlengkapan', description: 'Penanggung jawab ketersediaan logistik fisik, tenda, sound system, & perlengkapan kopdar luar ruang.', displayOrder: 45 },
  { id: 'c46', name: 'Om A.Acong', role: 'Devisi Peralatan dan Perlengkapan', description: 'Mengawal pemeliharaan inventaris peralatan berharga milik pengurus pusat ACC.', displayOrder: 46 },
  { id: 'c47', name: 'Om Mansur', role: 'Devisi Peralatan dan Perlengkapan', description: 'Mendistribusikan kebutuhan sarana prasarana penunjang kenyamanan acara akbarmu.', displayOrder: 47 }
];

export const MEMBER_PROFILES: MemberProfile[] = [
  { id: '1', name: 'Budi Santoso', role: 'Anggota Senior', imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400', car: 'Toyota Avanza', licensePlate: 'B 1234 ABC', yearJoined: '2020', membershipNumber: 'KTA-2020-001' },
  { id: '2', name: 'Siti Aminah', role: 'Anggota', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', car: 'Honda Jazz', licensePlate: 'B 5678 DEF', yearJoined: '2021', membershipNumber: 'KTA-2021-002' },
  { id: '3', name: 'Andi Wijaya', role: 'Anggota', imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400', car: 'Mitsubishi Xpander', licensePlate: 'B 9012 GHI', yearJoined: '2019', membershipNumber: 'KTA-2019-003' },
  { id: '4', name: 'Dewi Lestari', role: 'Anggota', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', car: 'Daihatsu Terios', licensePlate: 'B 3456 JKL', yearJoined: '2022', membershipNumber: 'KTA-2022-004' },
  { id: '5', name: 'Eko Prasetyo', role: 'Anggota', imageUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=400', car: 'Suzuki Ertiga', licensePlate: 'B 7890 MNO', yearJoined: '2020', membershipNumber: 'KTA-2020-005' },
  { id: '6', name: 'Fani Haryati', role: 'Anggota', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400', car: 'Hyundai Creta', licensePlate: 'B 2345 PQR', yearJoined: '2023', membershipNumber: 'KTA-2023-006' },
  { id: '7', name: 'Gani Kurniawan', role: 'Anggota', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', car: 'Kia Sonet', licensePlate: 'B 6789 STU', yearJoined: '2021', membershipNumber: 'KTA-2021-007' },
  { id: '8', name: 'Hani Susanti', role: 'Anggota', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400', car: 'Mazda CX-5', licensePlate: 'B 0123 VWX', yearJoined: '2020', membershipNumber: 'KTA-2020-008' },
  { id: '9', name: 'Indra Gunawan', role: 'Anggota', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400', car: 'Nissan Magnite', licensePlate: 'B 4567 YZA', yearJoined: '2018', membershipNumber: 'KTA-2018-009' },
  { id: '10', name: 'Joko Widodo', role: 'Anggota', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', car: 'Wuling Almaz', licensePlate: 'B 8901 BCD', yearJoined: '2021', membershipNumber: 'KTA-2021-010' },
];

