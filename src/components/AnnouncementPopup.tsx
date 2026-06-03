import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { X, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AnnouncementPopup() {
  const { announcementData } = useData();
  const [isOpen, setIsOpen] = useState(false);

  const displayData = announcementData?.title ? announcementData : {
    id: 'announcement',
    isActive: true,
    title: '🎉 Kopdar Akbar Auto Claser Club 2026',
    content: 'Halo member ACC!\n\nJangan lewatkan **Kopdar Akbar** yang akan diselenggarakan akhir bulan ini. Acara ini wajib dihadiri oleh seluruh chapter. \n\n**Detail Acara:**\n- Tanggal: Sabtu, 27 Juni 2026\n- Lokasi: Gunung Mas, Puncak Bogor\n- Waktu: 08.00 WIB - Selesai\n\nSiapkan kendaraanmu dan gunakan seragam resmi ACC. *Solidarity Forever!*',
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000'
  };

  useEffect(() => {
    // Only show if the data exists, it's active, and we have a title or content
    if (!displayData?.isActive || (!displayData.title && !displayData.content)) {
      setIsOpen(false);
      return;
    }

    const lastSeenDate = localStorage.getItem('announcement_last_seen_date');
    const today = new Date().toISOString().split('T')[0];
    
    // Also track which announcement was seen, in case it changes the same day
    const lastSeenId = localStorage.getItem('announcement_last_seen_id');
    // We'll use a hash of title+content to detect changes, since ID is always 'announcement'
    const currentHash = btoa(encodeURIComponent(`${displayData.title}|${displayData.content}`)).substring(0, 16);

    if (lastSeenDate !== today || lastSeenId !== currentHash) {
      // Small delay to make it feel less abrupt
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [displayData.isActive, displayData.title, displayData.content]);

  const handleClose = () => {
    setIsOpen(false);
    
    if (displayData) {
      const today = new Date().toISOString().split('T')[0];
      const currentHash = btoa(encodeURIComponent(`${displayData.title}|${displayData.content}`)).substring(0, 16);
      localStorage.setItem('announcement_last_seen_date', today);
      localStorage.setItem('announcement_last_seen_id', currentHash);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && displayData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-theme-surface border border-theme-border rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg z-10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 bg-theme-bg hover:bg-theme-border rounded-full text-theme-text transition-colors z-20"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                <Info size={24} />
              </div>
              <h2 className="text-2xl font-bold text-theme-text pr-8">{displayData.title}</h2>
            </div>
            
            <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 mb-6">
              {displayData.imageUrl && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-lg border border-theme-border/50 bg-theme-bg">
                  <img 
                    src={displayData.imageUrl} 
                    alt="Pengumuman" 
                    className="w-full h-auto object-contain max-h-[300px]"
                  />
                </div>
              )}
              
              <div className="prose prose-invert prose-theme max-w-none text-theme-muted">
                <ReactMarkdown>{displayData.content}</ReactMarkdown>
              </div>
            </div>
            
            <div className="pt-4 border-t border-theme-border">
              <button 
                onClick={handleClose}
                className="w-full bg-theme-text text-theme-text-inv hover:bg-opacity-90 font-bold py-3 rounded-xl transition-colors"
              >
                Tutup Peringatan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
