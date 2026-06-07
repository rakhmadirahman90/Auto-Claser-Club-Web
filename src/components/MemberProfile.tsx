import React, { useState, useMemo } from 'react';
import { MEMBER_PROFILES } from '../data';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';

export default function MemberProfile() {
  const { memberProfiles } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const mergedProfiles = useMemo(() => {
    const list = [...MEMBER_PROFILES];
    if (memberProfiles && memberProfiles.length > 0) {
      memberProfiles.forEach(newMember => {
        if (!list.some(existing => existing.id === newMember.id || existing.membershipNumber === newMember.membershipNumber)) {
          list.push(newMember);
        }
      });
    }
    return list;
  }, [memberProfiles]);

  const filteredProfiles = useMemo(() => {
    const filtered = mergedProfiles.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.car.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset index if filtered results change
    if (currentIndex >= filtered.length) {
        setCurrentIndex(0);
    }
    return filtered;
  }, [mergedProfiles, searchTerm, currentIndex]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentIndex(0);
  };

  const nextProfile = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProfiles.length);
  };

  const prevProfile = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProfiles.length) % filteredProfiles.length);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-sm md:max-w-xl lg:max-w-2xl mx-auto p-4 md:p-6 overflow-hidden">
      <h2 className="text-2xl font-black mb-4 text-theme-text">Profil Anggota</h2>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-theme-muted" size={18} />
        <input 
          type="text"
          placeholder="Cari anggota..."
          className="w-full pl-10 pr-3 py-2 border border-theme-border rounded-xl bg-theme-surface text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary text-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex-grow relative w-full flex items-center justify-center p-2 min-h-0">
        <AnimatePresence mode="wait">
          {filteredProfiles.length > 0 ? (
            <motion.div
              key={filteredProfiles[currentIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-theme-surface border border-theme-border p-4 sm:p-6 rounded-3xl shadow-lg w-full max-w-sm md:max-w-md flex flex-col items-center max-h-full overflow-y-auto"
            >
              <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-theme-border bg-theme-bg flex items-center justify-center shadow-md mb-4 shrink-0 relative">
                {filteredProfiles[currentIndex].imageUrl ? (
                  <img 
                    src={filteredProfiles[currentIndex].imageUrl} 
                    alt={filteredProfiles[currentIndex].name} 
                    className="w-full h-full object-cover object-top" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-bold text-6xl">
                    {filteredProfiles[currentIndex].name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <h3 className="font-bold text-xl sm:text-2xl text-theme-text mb-1 truncate w-full text-center">{filteredProfiles[currentIndex].name}</h3>
              <p className="text-theme-primary text-xs sm:text-sm font-semibold mb-3">{filteredProfiles[currentIndex].role}</p>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-theme-text w-full">
                <div className="flex justify-between border-b border-theme-border pb-1 sm:pb-2">
                  <span className="text-theme-muted">No. KTA:</span>
                  <span className="font-semibold font-mono">{filteredProfiles[currentIndex].membershipNumber}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-1 sm:pb-2">
                  <span className="text-theme-muted">Nama:</span>
                  <span className="font-semibold font-mono">{filteredProfiles[currentIndex].name}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-1 sm:pb-2">
                  <span className="text-theme-muted">Mobil:</span>
                  <span className="font-semibold font-mono">{filteredProfiles[currentIndex].car}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-1 sm:pb-2">
                  <span className="text-theme-muted">No. Plat:</span>
                  <span className="font-semibold font-mono">{filteredProfiles[currentIndex].licensePlate}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-1 sm:pb-2">
                  <span className="text-theme-muted">Tahun Bergabung:</span>
                  <span className="font-semibold font-mono">{filteredProfiles[currentIndex].yearJoined}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <p className="text-theme-muted text-sm w-full text-center mt-10">Hasil tidak ditemukan.</p>
          )}
        </AnimatePresence>
      </div>

      {filteredProfiles.length > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
            <button onClick={prevProfile} className="p-2 rounded-full border border-theme-border text-theme-text hover:bg-theme-bg transition-colors">
                <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1.5">
                {filteredProfiles.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? 'bg-theme-primary' : 'bg-theme-border'}`}
                        animate={{ scale: index === currentIndex ? 1.2 : 1 }}
                    />
                ))}
            </div>
            <button onClick={nextProfile} className="p-2 rounded-full border border-theme-border text-theme-text hover:bg-theme-bg transition-colors">
                <ChevronRight size={20} />
            </button>
        </div>
      )}
    </div>
  );
}
