import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Edit2, Trash2, ArrowLeft, LogOut, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loginWithGoogle, logout } from '../firebase';
import toast from 'react-hot-toast';
import { BLOG_POSTS, ACTIVITIES, CHAPTERS } from '../data';
import ImageUpload from '../components/ImageUpload';
import { HeroData, AboutData, Registration } from '../types';

type TabType = 'posts' | 'activities' | 'chapters' | 'hero' | 'about' | 'join' | 'announcement' | 'registrations';

export default function Admin() {
  const { 
    user,
    posts, activities, chapters, heroData, aboutData, joinData, announcementData, registrations,
    addPost, updatePost, deletePost,
    addActivity, updateActivity, deleteActivity,
    addChapter, updateChapter, deleteChapter,
    updateHero, updateAbout, updateJoin, updateAnnouncement,
    deleteRegistration
  } = useData();

  const [activeTab, setActiveTab] = useState<TabType>('posts');
  
  // Basic states for forms
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const formRef = useRef<HTMLDivElement>(null);
  
  // Auto-load hero/about data into form when the tab is clicked
  useEffect(() => {
    if (activeTab === 'hero') {
      setFormData(heroData || { title: '', subtitle: '', description: '', imageUrl: '' });
      setEditingId('hero');
    } else if (activeTab === 'about') {
      setFormData(aboutData || { title: '', description1: '', description2: '', statsMembers: '', imageUrl: '' });
      setEditingId('about');
    } else if (activeTab === 'join') {
      setFormData(joinData || { title: '', description: '', adminWhatsApp: '', imageUrl: '' });
      setEditingId('join');
    } else if (activeTab === 'announcement') {
      setFormData(announcementData || { 
        isActive: true, 
        title: '🎉 Kopdar Akbar Auto Claser Club 2026', 
        content: 'Halo member ACC!\n\nJangan lewatkan **Kopdar Akbar** yang akan diselenggarakan akhir bulan ini. Acara ini wajib dihadiri oleh seluruh chapter. \n\n**Detail Acara:**\n- Tanggal: Sabtu, 27 Juni 2026\n- Lokasi: Gunung Mas, Puncak Bogor\n- Waktu: 08.00 WIB - Selesai\n\nSiapkan kendaraanmu dan gunakan seragam resmi ACC. *Solidarity Forever!*', 
        imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000' 
      });
      setEditingId('announcement');
    } else {
      setEditingId(null);
      setFormData({});
    }
  }, [activeTab, heroData, aboutData, joinData, announcementData]);

  useEffect(() => {
    if (editingId && formRef.current) {
      // Small delay to ensure the element is rendered and not hidden
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [editingId]);

  if (!user) {
    return (
      <div className="min-h-screen bg-theme-bg text-theme-text font-sans flex items-center justify-center p-4">
        <div className="bg-theme-surface border border-theme-border p-8 rounded-2xl max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <img src="/logo.jpg" alt="ACC Logo" className="h-20 w-auto object-contain" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-theme-muted mb-8">Silakan login dengan akun Google Anda untuk mengakses halaman admin.</p>
          <button 
            onClick={loginWithGoogle}
            className="w-full bg-theme-text text-theme-text-inv font-bold py-3 px-4 rounded-lg hover:bg-theme-border transition-colors"
          >
            Sign in with Google
          </button>
          <div className="mt-6">
            <Link to="/" className="text-theme-muted hover:text-theme-text transition-colors text-sm">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = (id: string, item: any) => {
    setEditingId(id);
    setFormData(item);
  };

  const handleCancel = () => {
    if (activeTab === 'hero') {
      setFormData(heroData || { title: '', subtitle: '', description: '', imageUrl: '' });
    } else if (activeTab === 'about') {
      setFormData(aboutData || { title: '', description1: '', description2: '', statsMembers: '', imageUrl: '' });
    } else if (activeTab === 'join') {
      setFormData(joinData || { title: '', description: '', adminWhatsApp: '', imageUrl: '' });
    } else if (activeTab === 'announcement') {
      setFormData(announcementData || { 
        isActive: true, 
        title: '🎉 Kopdar Akbar Auto Claser Club 2026', 
        content: 'Halo member ACC!\n\nJangan lewatkan **Kopdar Akbar** yang akan diselenggarakan akhir bulan ini. Acara ini wajib dihadiri oleh seluruh chapter. \n\n**Detail Acara:**\n- Tanggal: Sabtu, 27 Juni 2026\n- Lokasi: Gunung Mas, Puncak Bogor\n- Waktu: 08.00 WIB - Selesai\n\nSiapkan kendaraanmu dan gunakan seragam resmi ACC. *Solidarity Forever!*', 
        imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000' 
      });
    } else {
      setEditingId(null);
      setFormData({});
    }
  };

  const handleSave = async () => {
    let savePromise: Promise<any> = Promise.resolve();

    if (activeTab === 'posts') {
      if (editingId === 'new') {
        savePromise = addPost({ ...formData, id: Date.now().toString() });
      } else if (editingId) {
        savePromise = updatePost(editingId, formData);
      }
    } else if (activeTab === 'activities') {
      if (editingId === 'new') {
        savePromise = addActivity({ ...formData, id: Date.now().toString() });
      } else if (editingId) {
        savePromise = updateActivity(editingId, formData);
      }
    } else if (activeTab === 'chapters') {
      if (editingId === 'new') {
        savePromise = addChapter({ ...formData, id: Date.now().toString() });
      } else if (editingId) {
        savePromise = updateChapter(editingId, formData);
      }
    } else if (activeTab === 'hero') {
      savePromise = updateHero({ ...formData, id: 'hero' });
    } else if (activeTab === 'about') {
      savePromise = updateAbout({ ...formData, id: 'about' });
    } else if (activeTab === 'join') {
      savePromise = updateJoin({ ...formData, id: 'join' });
    } else if (activeTab === 'announcement') {
      savePromise = updateAnnouncement({ ...formData, id: 'announcement' });
    }

    toast.promise(savePromise, {
      loading: 'Menyimpan...',
      success: 'Data berhasil disimpan!',
      error: 'Gagal menyimpan data.'
    }).then(() => {
      if (!['hero', 'about', 'join', 'announcement'].includes(activeTab)) {
        setEditingId(null);
      }
    }).catch(() => {});
  };

  const handleDelete = async (id: string) => {    
    let deletePromise: Promise<any> = Promise.resolve();
    if (activeTab === 'posts') deletePromise = deletePost(id);
    if (activeTab === 'activities') deletePromise = deleteActivity(id);
    if (activeTab === 'chapters') deletePromise = deleteChapter(id);
    if (activeTab === 'registrations') deletePromise = deleteRegistration(id);

    toast.promise(deletePromise, {
      loading: 'Menghapus...',
      success: 'Data berhasil dihapus!',
      error: 'Gagal menghapus data.'
    });
  };

  const handleSeedData = async () => {    
    const seedPromise = (async () => {
      // Create concurrent additions
      const allPromises = [
        ...BLOG_POSTS.map(p => addPost(p)),
        ...ACTIVITIES.map(a => addActivity(a)),
        ...CHAPTERS.map(c => addChapter(c))
      ];
      await Promise.all(allPromises);
    })();

    toast.promise(seedPromise, {
      loading: 'Sedang mengisi data...',
      success: 'Data awal berhasil ditambahkan!',
      error: 'Gagal mengisi data.'
    });
  };

  const renderFormInputs = () => {
    if (activeTab === 'posts') {
      return (
        <>
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
          <textarea className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text min-h-32" placeholder="Excerpt" value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="Date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="Category" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
          <ImageUpload value={formData.imageUrl || ''} onChange={url => setFormData({...formData, imageUrl: url})} />
        </>
      );
    }
    if (activeTab === 'activities') {
      return (
        <>
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="Location" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="Date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
          <ImageUpload value={formData.imageUrl || ''} onChange={url => setFormData({...formData, imageUrl: url})} />
        </>
      );
    }
    if (activeTab === 'chapters') {
      return (
        <>
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" type="number" placeholder="Member Count" value={formData.memberCount || 0} onChange={e => setFormData({...formData, memberCount: parseInt(e.target.value) || 0})} />
        </>
      );
    }
    if (activeTab === 'hero') {
      return (
        <>
          <label className="block text-sm text-theme-muted mb-1">Judul Utama</label>
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="contoh: Satu Aspal, Satu Keluarga." value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Sub Judul</label>
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="contoh: Solidaritas Tanpa Batas" value={formData.subtitle || ''} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Deskripsi Singkat</label>
          <textarea className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text min-h-32" placeholder="Deskripsi Singkat" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Gambar Latar Hero</label>
          <ImageUpload value={formData.imageUrl || ''} onChange={url => setFormData({...formData, imageUrl: url})} />
        </>
      );
    }
    if (activeTab === 'about') {
      return (
        <>
          <label className="block text-sm text-theme-muted mb-1">Judul</label>
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="contoh: Tentang Auto Claser Club" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Paragraf 1</label>
          <textarea className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text min-h-32" placeholder="Paragraf Pertama" value={formData.description1 || ''} onChange={e => setFormData({...formData, description1: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Paragraf 2</label>
          <textarea className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text min-h-32" placeholder="Paragraf Kedua" value={formData.description2 || ''} onChange={e => setFormData({...formData, description2: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Teks Member Aktif (contoh: 500+)</label>
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="contoh: 500+" value={formData.statsMembers || ''} onChange={e => setFormData({...formData, statsMembers: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Gambar Tentang Kami</label>
          <ImageUpload value={formData.imageUrl || ''} onChange={url => setFormData({...formData, imageUrl: url})} />
        </>
      );
    }
    if (activeTab === 'join') {
      return (
        <>
          <label className="block text-sm text-theme-muted mb-1">Judul Pendaftaran</label>
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="contoh: Bergabung Bersama Kami" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Deskripsi/Instruksi</label>
          <textarea className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text min-h-32" placeholder="contoh: Isi formulir berikut ini..." value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Nomor WhatsApp Admin (Awal 62...)</label>
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="contoh: 62812345678" value={formData.adminWhatsApp || ''} onChange={e => setFormData({...formData, adminWhatsApp: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Gambar Latar Pendaftaran</label>
          <ImageUpload value={formData.imageUrl || ''} onChange={url => setFormData({...formData, imageUrl: url})} />
        </>
      );
    }
    if (activeTab === 'announcement') {
      return (
        <>
          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.isActive || false} 
              onChange={e => setFormData({...formData, isActive: e.target.checked})}
              className="w-5 h-5 accent-theme-primary"
            />
            <span className="text-theme-text font-bold">Aktifkan Pengumuman Popup</span>
          </label>
          <label className="block text-sm text-theme-muted mb-1">Judul Pengumuman</label>
          <input className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text" placeholder="contoh: Informasi Penting Mingguan" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Isi Pengumuman (Mendukung Markdown Markdown)</label>
          <textarea className="w-full bg-theme-surface border border-theme-border p-2 rounded mb-2 text-theme-text min-h-32 font-mono text-sm" placeholder="Isi detail pengumuman..." value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
          <label className="block text-sm text-theme-muted mb-1">Gambar Banner (Opsional)</label>
          <ImageUpload value={formData.imageUrl || ''} onChange={url => setFormData({...formData, imageUrl: url})} />
        </>
      );
    }
    return null;
  };

  const dataList = activeTab === 'posts' ? posts : activeTab === 'activities' ? activities : activeTab === 'registrations' ? registrations : chapters;
  const isDataEmpty = posts.length === 0 && activities.length === 0 && chapters.length === 0;

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text font-sans p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-theme-muted hover:text-theme-text transition-colors bg-theme-surface p-2 rounded-full">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            {isDataEmpty && (
              <button 
                onClick={handleSeedData}
                className="flex items-center gap-2 text-sm text-theme-primary bg-theme-primary/10 border border-theme-primary px-4 py-2 rounded-md transition-colors"
              >
                <Database size={16} /> Seed Default Data
              </button>
            )}
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-sm text-theme-muted hover:text-theme-text bg-theme-surface border border-theme-border px-4 py-2 rounded-md transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-theme-border pb-4 overflow-x-auto">
          <button onClick={() => { setActiveTab('hero'); }} className={`shrink-0 whitespace-nowrap px-4 py-2 font-bold rounded-md ${activeTab === 'hero' ? 'bg-theme-primary text-white' : 'bg-theme-surface hover:bg-theme-border'}`}>Beranda</button>
          <button onClick={() => { setActiveTab('about'); }} className={`shrink-0 whitespace-nowrap px-4 py-2 font-bold rounded-md ${activeTab === 'about' ? 'bg-theme-primary text-white' : 'bg-theme-surface hover:bg-theme-border'}`}>Tentang Kami</button>
          <button onClick={() => { setActiveTab('join'); }} className={`shrink-0 whitespace-nowrap px-4 py-2 font-bold rounded-md ${activeTab === 'join' ? 'bg-theme-primary text-white' : 'bg-theme-surface hover:bg-theme-border'}`}>Pendaftaran</button>
          <button onClick={() => { setActiveTab('announcement'); }} className={`shrink-0 whitespace-nowrap px-4 py-2 font-bold rounded-md ${activeTab === 'announcement' ? 'bg-theme-primary text-white' : 'bg-theme-surface hover:bg-theme-border'}`}>Pengumuman</button>
          <button onClick={() => { setActiveTab('posts'); }} className={`shrink-0 whitespace-nowrap px-4 py-2 font-bold rounded-md ${activeTab === 'posts' ? 'bg-theme-primary text-white' : 'bg-theme-surface hover:bg-theme-border'}`}>Berita</button>
          <button onClick={() => { setActiveTab('activities'); }} className={`shrink-0 whitespace-nowrap px-4 py-2 font-bold rounded-md ${activeTab === 'activities' ? 'bg-theme-primary text-white' : 'bg-theme-surface hover:bg-theme-border'}`}>Agenda</button>
          <button onClick={() => { setActiveTab('chapters'); }} className={`shrink-0 whitespace-nowrap px-4 py-2 font-bold rounded-md ${activeTab === 'chapters' ? 'bg-theme-primary text-white' : 'bg-theme-surface hover:bg-theme-border'}`}>Chapter</button>
          <button onClick={() => { setActiveTab('registrations'); }} className={`shrink-0 whitespace-nowrap px-4 py-2 font-bold rounded-md ${activeTab === 'registrations' ? 'bg-theme-primary text-white' : 'bg-theme-surface hover:bg-theme-border'}`}>Pendaftar</button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* List Sidebar for List-based tabs */}
          {['posts', 'activities', 'chapters', 'registrations'].includes(activeTab) && (
            <div className={`md:col-span-1 space-y-4 ${editingId ? 'hidden md:block' : 'block'}`}>
              {activeTab !== 'registrations' && (
                <button 
                  onClick={() => handleEdit('new', {})}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold transition-colors"
                >
                  <Plus size={18} /> Tambah Baru
                </button>
              )}
              <div className="bg-theme-surface border border-theme-border rounded-xl max-h-[600px] overflow-y-auto w-full">
                {dataList.map((item: any) => (
                  <div 
                    key={item.id} 
                    onClick={() => activeTab !== 'registrations' && handleEdit(item.id, item)}
                    className={`p-4 border-b border-theme-border flex justify-between items-center group transition-colors ${activeTab !== 'registrations' ? 'cursor-pointer hover:bg-theme-bg' : ''} ${editingId === item.id ? 'bg-theme-primary/10 border-l-4 border-l-theme-primary' : 'border-l-4 border-l-transparent'}`}
                  >
                    <div className="truncate flex-1 pr-4">
                       <p className={`font-bold truncate text-sm ${editingId === item.id ? 'text-theme-primary' : ''}`}>{item.title || item.name}</p>
                       {activeTab === 'registrations' && (
                         <p className="text-xs text-theme-muted">{new Date(item.createdAt).toLocaleDateString()}</p>
                       )}
                    </div>
                    <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      {activeTab !== 'registrations' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleEdit(item.id, item); }} 
                          className="p-1.5 bg-theme-primary hover:bg-theme-primary/80 rounded text-white"
                        >
                          <Edit2 size={14} />
                        </button>
                      )}
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                        className="p-1.5 bg-theme-secondary hover:bg-red-500 rounded text-white"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {dataList.length === 0 && (
                  <div className="p-8 text-center text-theme-muted text-sm">
                    Belum ada data.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Editor Area */}
          <div className={`${['hero', 'about', 'join', 'announcement'].includes(activeTab) ? 'md:col-span-3' : 'md:col-span-2'} ${['posts', 'activities', 'chapters'].includes(activeTab) && !editingId ? 'hidden md:block' : 'block'}`} ref={formRef}>
            {activeTab === 'registrations' ? (
               <div className="bg-theme-surface border border-theme-border rounded-xl p-6 sm:p-8 max-h-[600px] overflow-y-auto">
                 <h2 className="text-xl font-bold mb-6 text-theme-text text-center">Daftar Pendaftar (Seluruhnya)</h2>
                 <div className="space-y-4">
                   {registrations.map(reg => (
                     <div key={reg.id} className="border border-theme-border rounded-lg p-6 bg-theme-bg/50">
                       <div className="flex justify-between items-start mb-4 border-b border-theme-border pb-4">
                         <div>
                           <h3 className="font-bold text-lg text-theme-text">{reg.name}</h3>
                           <p className="text-sm font-mono text-theme-primary">{reg.phone}</p>
                         </div>
                         <div className="text-right">
                           <p className="text-xs text-theme-muted">Tgl. Daftar</p>
                           <p className="text-sm font-medium">{new Date(reg.createdAt).toLocaleString()}</p>
                         </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4 text-sm">
                         <div>
                           <p className="text-theme-muted mb-1 text-xs uppercase tracking-widest">Alamat / Domisili</p>
                           <p>{reg.address}</p>
                         </div>
                         <div>
                           <p className="text-theme-muted mb-1 text-xs uppercase tracking-widest">Kendaraan</p>
                           <p>{reg.vehicleType}</p>
                         </div>
                         <div>
                           <p className="text-theme-muted mb-1 text-xs uppercase tracking-widest">Tahun Kendaraan</p>
                           <p>{reg.vehicleYear}</p>
                         </div>
                         <div>
                           <p className="text-theme-muted mb-1 text-xs uppercase tracking-widest">Nomor Polisi</p>
                           <p>{reg.licensePlate}</p>
                         </div>
                       </div>
                     </div>
                   ))}
                   {registrations.length === 0 && (
                     <p className="text-center text-theme-muted">Belum ada pendaftar.</p>
                   )}
                 </div>
               </div>
            ) : editingId ? (
              <div className="bg-theme-surface border border-theme-border rounded-xl p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-theme-text">
                    {['hero', 'about', 'join', 'announcement'].includes(activeTab) ? `Edit ${activeTab === 'hero' ? 'Beranda' : activeTab === 'about' ? 'Tentang Kami' : activeTab === 'join' ? 'Pendaftaran' : 'Pengumuman'}` : (editingId === 'new' ? 'Tambah' : 'Edit')} Data
                  </h2>
                  {!['hero', 'about', 'join', 'announcement'].includes(activeTab) && (
                    <button 
                      onClick={handleCancel}
                      className="md:hidden text-theme-primary hover:text-blue-400 font-bold text-sm transition-colors"
                    >
                      &larr; Kembali ke Daftar
                    </button>
                  )}
                </div>
                {renderFormInputs()}
                <div className="flex gap-4 mt-6">
                  <button onClick={handleSave} className="bg-theme-primary hover:bg-blue-600 text-white px-6 py-2 rounded-md font-bold transition-colors">Simpan</button>
                  {!['hero', 'about', 'join'].includes(activeTab) && (
                    <button onClick={handleCancel} className="bg-theme-surface hover:bg-theme-border border border-theme-border text-theme-text px-6 py-2 rounded-md font-bold transition-colors">Batal</button>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-theme-border rounded-xl flex items-center justify-center text-theme-muted p-12 text-center min-h-[400px]">
                Pilih item dari daftar di sebelah kiri untuk mengedit atau klik "Tambah Baru".
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

