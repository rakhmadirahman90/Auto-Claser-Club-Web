import { BlogPost, Activity, Chapter, CommitteeMember } from './types';

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
  {
    id: '1',
    name: 'Ir. Herdian Syahputra, M.T.',
    role: 'Ketua Umum (President)',
    description: 'Pemimpin tertinggi pengurus pusat, merancang visi misi besar, penasihat utama, serta penanggung jawab jalannya AD/ART klub otomotif.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    displayOrder: 1
  },
  {
    id: '2',
    name: 'Chandra Wijaya',
    role: 'Wakil Ketua Umum',
    description: 'Mengkoordinasikan perluasan dan sertifikasi unit chapter regional seluruh Indonesia, serta menjembatani sinergi kemitraan eksternal.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    displayOrder: 2
  },
  {
    id: '3',
    name: 'Amelia Putri, S.I.Kom',
    role: 'Sekretaris Jenderal',
    description: 'Pusat administratif klub, mendata surat-surat legalitas, registrasi anggota baru nasional, dan menyusun agenda rapat tahunan.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    displayOrder: 3
  },
  {
    id: '4',
    name: 'Rian Anggoro',
    role: 'Bendahara Umum',
    description: 'Melakukan pencatatan arus dana kas, mengatur budgeting kegiatan sosial baksos, serta menyajikan audit keuangan transparan bagi internal.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    displayOrder: 4
  },
  {
    id: '5',
    name: 'Aris Munandar',
    role: 'Divisi Kegiatan & Touring',
    description: 'Menjadi Road Captain handal, menyusun standard operating safety touring bersama Kepolisian, serta merancang acara kumpul nasional.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    displayOrder: 5
  },
  {
    id: '6',
    name: 'Desta Pratama',
    role: 'Divisi Humas & Media',
    description: 'Menjaga image publik organisasi, mengolah isi konten digital sosial media resmi, dokumentasi pers, dan portal situs resmi.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    displayOrder: 6
  }
];

