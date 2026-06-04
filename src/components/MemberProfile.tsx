import React, { useState, useMemo } from 'react';
import { MEMBER_PROFILES } from '../data';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MemberProfile() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProfiles = useMemo(() => {
    const filtered = MEMBER_PROFILES.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.car.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Reset index if filtered results change
    if (currentIndex >= filtered.length) {
        setCurrentIndex(0);
    }
    return filtered;
  }, [searchTerm, currentIndex]);

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

      <div className="flex-grow relative w-full overflow-y-auto flex items-center justify-center p-2">
        <AnimatePresence mode="wait">
          {filteredProfiles.length > 0 ? (
            <motion.div
              key={filteredProfiles[currentIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-theme-surface border border-theme-border p-5 sm:p-8 rounded-3xl shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg flex flex-col items-center"
            >
              <div className="w-full aspect-[4/3] mb-5 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shrink-0">
                <img 
                  src={filteredProfiles[currentIndex].imageUrl} 
                  alt={filteredProfiles[currentIndex].name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="font-bold text-2xl sm:text-3xl text-theme-text mb-2 truncate w-full text-center">{filteredProfiles[currentIndex].name}</h3>
              <p className="text-theme-primary text-sm sm:text-base font-semibold mb-5">{filteredProfiles[currentIndex].role}</p>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-theme-text w-full">
                <div className="flex justify-between border-b border-theme-border pb-2 sm:pb-3">
                  <span className="text-theme-muted">No. KTA:</span>
                  <span className="font-semibold font-mono">{filteredProfiles[currentIndex].membershipNumber}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-2 sm:pb-3">
                  <span className="text-theme-muted">Nama:</span>
                  <span className="font-semibold font-mono">{filteredProfiles[currentIndex].name}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-2 sm:pb-3">
                  <span className="text-theme-muted">Mobil:</span>
                  <span className="font-semibold font-mono">{filteredProfiles[currentIndex].car}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-2 sm:pb-3">
                  <span className="text-theme-muted">No. Plat:</span>
                  <span className="font-semibold font-mono">{filteredProfiles[currentIndex].licensePlate}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-2 sm:pb-3">
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
        <div className="flex justify-center gap-4 mt-6">
            <button onClick={prevProfile} className="p-3 rounded-full bg-theme-surface border border-theme-border hover:bg-theme-bg text-theme-text">
                <ChevronLeft size={24} />
            </button>
            <button onClick={nextProfile} className="p-3 rounded-full bg-theme-surface border border-theme-border hover:bg-theme-bg text-theme-text">
                <ChevronRight size={24} />
            </button>
        </div>
      )}
    </div>
  );
}
