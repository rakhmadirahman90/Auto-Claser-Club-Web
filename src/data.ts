import { BlogPost, Activity, Chapter } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Kopdar Gabungan ACC Regional Jabodetabek Awal Tahun',
    excerpt: 'Mempererat tali persaudaraan antar member di awal tahun dengan semangat baru dan visi yang lebih solid.',
    date: '10 Jan 2026',
    imageUrl: 'https://images.unsplash.com/photo-1511226888494-1a98622c1598?auto=format&fit=crop&q=80&w=1000',
    category: 'Kopdar'
  },
  {
    id: '2',
    title: 'Touring Ceria Jalur Selatan - Menembus Keindahan Alam',
    excerpt: 'Perjalanan panjang yang menguji ketahanan mesin sekaligus memanjakan mata dengan pemandangan pesisir selatan.',
    date: '25 Feb 2026',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-01f11e2f89da?auto=format&fit=crop&q=80&w=1000',
    category: 'Touring'
  },
  {
    id: '3',
    title: 'Bakti Sosial Ramadhan bersama Panti Asuhan',
    excerpt: 'Auto Claser Club berbagi kebahagiaan di bulan yang suci bersama komunitas lokal.',
    date: '15 Mar 2026',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000',
    category: 'Baksos'
  },
  {
    id: '4',
    title: 'Edukasi Safety Riding Bersama Kepolisian',
    excerpt: 'Kegiatan edukasi dan simulasi keselamatan berkendara yang diikuti oleh 50 member, berkolaborasi dengan Satlantas setempat.',
    date: '02 Apr 2026',
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000',
    category: 'Edukasi'
  },
  {
    id: '5',
    title: 'Menembus Batas: Touring Lintas Pulau Berjalan Sukses',
    excerpt: 'Para rombongan club berhasil menyelesaikan misi touring lintas pulau dengan lancar, selamat, dan memperbanyak relasi di berbagai daerah.',
    date: '20 Mei 2026',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000',
    category: 'Touring'
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
