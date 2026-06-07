import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { MEMBER_PROFILES } from '../data';
import { X, Sparkles, Car, ChevronLeft, ChevronRight, Hash, Calendar } from 'lucide-react';

export default function NewMemberNotification() {
  const { memberProfiles } = useData();
  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  // Combine static and dynamic profiles
  const allProfiles = React.useMemo(() => {
    const list = [...MEMBER_PROFILES.filter(s => !memberProfiles?.find(f => f.id === s.id)), ...(memberProfiles || [])];
    
    // Sort so newly added database profiles (longer/timestamp IDs) come first.
    // If none exist, we show the ones with higher IDs or just the latest added profiles.
    return list.sort((a, b) => {
      const isNumA = a.id.length > 5;
      const isNumB = b.id.length > 5;
      if (isNumA && !isNumB) return -1;
      if (!isNumA && isNumB) return 1;
      if (isNumA && isNumB) {
        return b.id.localeCompare(a.id);
      }
      return b.id.localeCompare(a.id);
    });
  }, [memberProfiles]);

  // We consider the top 5 sorted profiles as our official "New Members" roster
  const newMembers = React.useMemo(() => {
    return allProfiles.slice(0, 5);
  }, [allProfiles]);

  const latestMember = newMembers[0];

  useEffect(() => {
    if (!latestMember) return;

    // Show the notification teaser slide-in after 3.5 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [latestMember]);

  const handleOpenModal = (index: number) => {
    setCurrentProfileIndex(index);
    setShowModal(true);
    setShowNotification(false);
  };

  const handleNext = () => {
    setCurrentProfileIndex((prev) => (prev + 1) % newMembers.length);
  };

  const handlePrev = () => {
    setCurrentProfileIndex((prev) => (prev - 1 + newMembers.length) % newMembers.length);
  };

  if (!latestMember) return null;

  return (
    <>
      {/* Floating sliding teaser notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed bottom-6 left-6 z-[80] max-w-sm w-[calc(100%-3rem)] bg-theme-surface border border-theme-border rounded-2xl shadow-2xl p-4 flex items-center gap-3 cursor-pointer group"
            onClick={() => handleOpenModal(0)}
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotification(false);
                }}
                className="p-1 hover:bg-theme-bg rounded-lg text-theme-muted hover:text-theme-text transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="relative shrink-0 h-12 w-12 rounded-xl overflow-hidden bg-theme-bg border border-theme-border flex items-center justify-center">
              {latestMember.imageUrl ? (
                <img
                  src={latestMember.imageUrl}
                  alt={latestMember.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-sm font-black text-theme-primary">
                  {latestMember.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full border border-theme-surface">
                <Sparkles size={10} className="animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>

            <div className="flex-1 min-w-0 pr-4">
              <span className="inline-flex items-center gap-1 text-[10px] bg-theme-primary/10 text-theme-primary px-2 py-0.5 rounded-full font-black uppercase tracking-wider mb-1">
                Anggota Baru Bergabung
              </span>
              <h4 className="text-sm font-black text-theme-text truncate leading-tight">
                {latestMember.name}
              </h4>
              <p className="text-xs text-theme-muted truncate">
                {latestMember.car} • No KTA: {latestMember.membershipNumber}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full detail popup modal slider */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative bg-theme-surface border border-theme-border rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md z-10 overflow-hidden flex flex-col items-center"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2.5 bg-theme-bg hover:bg-theme-border rounded-full text-theme-text transition-colors"
                title="Tutup"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-amber-500 animate-pulse" size={20} />
                <h3 className="text-lg font-black text-theme-text uppercase tracking-wider text-center">
                  Sambut Anggota Baru ACC!
                </h3>
              </div>

              {/* Profile Card Body Slider */}
              <div className="w-full relative px-2 mb-6 min-h-[300px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={newMembers[currentProfileIndex].id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center w-full"
                  >
                    <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-theme-border bg-theme-bg flex items-center justify-center shadow-md mb-4 shrink-0 relative">
                      {newMembers[currentProfileIndex].imageUrl ? (
                        <img
                          src={newMembers[currentProfileIndex].imageUrl}
                          alt={newMembers[currentProfileIndex].name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="text-4xl font-black text-theme-muted uppercase">
                          {newMembers[currentProfileIndex].name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-theme-primary text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                        New Joiner
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-theme-text text-center truncate w-full mb-1">
                      {newMembers[currentProfileIndex].name}
                    </h4>
                    <p className="text-xs text-theme-primary font-extrabold uppercase tracking-wide mb-4">
                      {newMembers[currentProfileIndex].role}
                    </p>

                    <div className="w-full space-y-2.5 bg-theme-bg/60 p-4 rounded-2xl border border-theme-border/65 text-sm">
                      <div className="flex justify-between items-center border-b border-theme-border/40 pb-1.5">
                        <span className="text-theme-muted flex items-center gap-1.5">
                          <Hash size={14} className="text-theme-primary" /> No. Keanggotaan:
                        </span>
                        <span className="font-bold text-theme-text font-mono">
                          {newMembers[currentProfileIndex].membershipNumber}
                        </span>
                      </div>

                      <div className="flex justify-between items-center border-b border-theme-border/40 pb-1.5">
                        <span className="text-theme-muted flex items-center gap-1.5">
                          <Car size={14} className="text-theme-primary" /> Tipe Mobil:
                        </span>
                        <span className="font-semibold text-theme-text">
                          {newMembers[currentProfileIndex].car}
                        </span>
                      </div>

                      <div className="flex justify-between items-center border-b border-theme-border/40 pb-1.5">
                        <span className="text-theme-muted flex items-center gap-1.5">
                          <span className="text-theme-primary text-xs font-black">🏷️</span> No. Plat Polisi:
                        </span>
                        <span className="font-bold font-mono text-theme-text uppercase">
                          {newMembers[currentProfileIndex].licensePlate}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-theme-muted flex items-center gap-1.5">
                          <Calendar size={14} className="text-theme-primary" /> Bergabung Sejak:
                        </span>
                        <span className="font-medium text-theme-text">
                          Tahun {newMembers[currentProfileIndex].yearJoined}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Navigation */}
              {newMembers.length > 1 && (
                <div className="flex justify-between items-center w-full mt-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 border border-theme-border bg-theme-bg hover:bg-theme-border rounded-xl text-theme-text transition-colors flex items-center justify-center"
                    title="Sebelumnya"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="flex gap-1.5">
                    {newMembers.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentProfileIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          index === currentProfileIndex ? 'bg-theme-primary w-4' : 'bg-theme-border'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="p-2 border border-theme-border bg-theme-bg hover:bg-theme-border rounded-xl text-theme-text transition-colors flex items-center justify-center"
                    title="Berikutnya"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-theme-primary hover:bg-theme-primary/90 text-white font-bold py-3.5 rounded-xl transition-colors mt-6 text-sm"
              >
                Grup Keluarga Besar ACC
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
