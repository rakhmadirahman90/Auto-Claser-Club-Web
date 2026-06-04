import React, { useState, useMemo } from 'react';
import { MEMBER_PROFILES } from '../data';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const ITEMS_PER_PAGE = 1;

export default function MemberProfile() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = useMemo(() => {
    return MEMBER_PROFILES.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.car.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredProfiles.length / ITEMS_PER_PAGE) || 1;

  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-sm mx-auto p-3">
      <h2 className="text-xl font-black mb-3 text-theme-text">Profil Anggota</h2>
      
      <div className="relative mb-3">
        <Search className="absolute left-3 top-2 text-theme-muted" size={16} />
        <input 
          type="text"
          placeholder="Cari..."
          className="w-full pl-8 pr-3 py-1.5 border border-theme-border rounded-lg bg-theme-surface text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary text-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center overflow-hidden">
        {paginatedProfiles.length > 0 ? (
          paginatedProfiles.map((member) => (
            <div key={member.id} className="bg-theme-surface border border-theme-border p-3 rounded-xl shadow-sm w-full">
              <img src={member.imageUrl} alt={member.name} className="w-full h-40 object-cover object-top rounded-lg mb-2" />
              <h3 className="font-bold text-lg text-theme-text mb-0">{member.name}</h3>
              <p className="text-theme-primary text-xs font-semibold mb-2">{member.role}</p>
              <div className="space-y-1 text-xs text-theme-text w-full">
                <div className="flex justify-between border-b border-theme-border pb-1">
                  <span className="text-theme-muted">No. KTA:</span>
                  <span className="font-semibold font-mono">{member.membershipNumber}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-1">
                  <span className="text-theme-muted">Nama:</span>
                  <span className="font-semibold font-mono">{member.name}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-1">
                  <span className="text-theme-muted">Mobil:</span>
                  <span className="font-semibold font-mono">{member.car}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-1">
                  <span className="text-theme-muted">No. Plat:</span>
                  <span className="font-semibold font-mono">{member.licensePlate}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border pb-1">
                  <span className="text-theme-muted">Tahun Bergabung:</span>
                  <span className="font-semibold font-mono">{member.yearJoined}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-theme-muted text-xs">Hasil tidak ditemukan.</p>
        )}
      </div>

      {filteredProfiles.length > 0 && (
        <div className="mt-2 flex justify-center items-center gap-1">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded-full border border-theme-border text-theme-text disabled:opacity-50 hover:bg-theme-bg transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[10px] font-bold text-theme-text px-1">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded-full border border-theme-border text-theme-text disabled:opacity-50 hover:bg-theme-bg transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
