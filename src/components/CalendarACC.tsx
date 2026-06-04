import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';

export default function CalendarACC() {
  const { calendarEvents } = useData();
  const currentYear = new Date().getFullYear();
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return (
    <div className="p-6 md:p-10 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-theme-text mb-8 text-center">Kalender ACC {currentYear}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map((month, monthIndex) => (
          <motion.div
            key={month}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: monthIndex * 0.05 }}
            className="bg-theme-surface border border-theme-border p-4 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-theme-primary mb-3 text-center">{month}</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-theme-muted">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                <div key={day}>{day}</div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const event = calendarEvents.find(e => e.date === day && e.month === monthIndex);
                
                const getEventStyle = (type: string) => {
                    switch (type) {
                        case 'agenda': return 'bg-blue-100 text-blue-800';
                        case 'birthday': return 'bg-pink-100 text-pink-800';
                        case 'holiday': return 'bg-red-100 text-red-800';
                        default: return 'bg-theme-primary/10 text-theme-primary';
                    }
                };
                
                return (
                  <div 
                    key={i} 
                    className={`p-1 rounded cursor-pointer relative text-center min-h-[3rem] ${event ? `${getEventStyle(event.type)} font-bold` : 'hover:bg-theme-bg'}`}
                    onClick={() => event && setSelectedEvent(event)}
                  >
                    <div className="text-xs">{day}</div>
                    {event && (
                      <div className="text-[9px] truncate leading-tight mt-0.5 px-0.5">
                        {event.title}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-theme-surface p-6 rounded-3xl shadow-xl w-full max-w-sm"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-theme-text mb-2 capitalize">{selectedEvent.type}</h3>
              <p className="text-theme-muted mb-4">{selectedEvent.title}</p>
              <button
                className="w-full bg-theme-primary text-white py-2 rounded-xl font-semibold hover:opacity-90"
                onClick={() => setSelectedEvent(null)}
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
