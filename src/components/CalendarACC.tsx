import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { calendarEvents as CALENDAR_EVENTS } from '../data/calendarEvents';

export default function CalendarACC() {
  const { calendarEvents: dbEvents } = useData();
  const calendarEvents = [...CALENDAR_EVENTS.filter(s => !dbEvents?.find(f => f.id === s.id)), ...(dbEvents || [])];
  const currentYear = new Date().getFullYear();
  const [selectedDayEvents, setSelectedDayEvents] = useState<{ day: number; monthIndex: number; events: any[] } | null>(null);
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return (
    <div className="p-6 md:p-10 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-theme-text mb-8 text-center animate-fade-in">Kalender ACC {currentYear}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map((month, monthIndex) => (
          <motion.div
            key={month}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: monthIndex * 0.05 }}
            className="bg-theme-surface border border-theme-border p-4 rounded-2xl shadow-md flex flex-col"
          >
            <h3 className="text-lg font-semibold text-theme-primary mb-3 text-center">{month}</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-theme-muted mb-2">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                <div key={day} className="font-extrabold text-[10px] uppercase tracking-wider">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 flex-1">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const dayEvents = calendarEvents.filter(e => e.date === day && e.month === monthIndex);
                const hasEvents = dayEvents.length > 0;
                
                const getEventBadgeStyle = (type: string) => {
                    switch (type) {
                        case 'agenda': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
                        case 'birthday': return 'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20';
                        case 'holiday': return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
                        default: return 'bg-theme-primary/10 text-theme-primary hover:bg-theme-primary/20';
                    }
                };
                
                return (
                  <div 
                    key={i} 
                    className={`p-1 rounded-xl transition-all cursor-pointer relative text-left min-h-[4rem] flex flex-col justify-between border ${
                      hasEvents 
                        ? 'bg-theme-surface border-theme-border/60 hover:border-theme-primary/40 shadow-sm' 
                        : 'border-transparent hover:bg-theme-bg/30'
                    }`}
                    onClick={() => hasEvents && setSelectedDayEvents({ day, monthIndex, events: dayEvents })}
                  >
                    <div className="text-xs font-bold text-theme-text/80 ml-1 mt-0.5">{day}</div>
                    <div className="flex-1 flex flex-col justify-end gap-0.5 w-full min-w-0 mt-1">
                      {dayEvents.slice(0, 2).map((event, idx) => (
                        <div 
                          key={idx} 
                          className={`text-[9px] truncate leading-normal px-1 py-0.5 rounded font-bold max-w-full ${getEventBadgeStyle(event.type)}`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[8px] text-theme-muted font-black ml-1 mb-0.5 leading-none">
                          +{dayEvents.length - 2} agenda
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedDayEvents && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDayEvents(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-theme-surface border border-theme-border p-6 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 border-b border-theme-border/40 pb-3">
                <h3 className="text-lg font-black text-theme-text">
                  Agenda Tanggal {selectedDayEvents.day} {months[selectedDayEvents.monthIndex]}
                </h3>
                <button 
                  onClick={() => setSelectedDayEvents(null)}
                  className="text-theme-muted hover:text-theme-text transition-colors p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 my-4 max-h-[50vh] overflow-y-auto pr-1">
                {selectedDayEvents.events.map((evt, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-theme-border/60 bg-theme-bg/30 flex items-start gap-3">
                    <div className="text-2xl mt-0.5 select-none">
                      {evt.type === 'holiday' ? '🛑' : evt.type === 'birthday' ? '🎂' : '📅'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider mb-1.5 ${
                        evt.type === 'holiday' ? 'bg-red-500/10 text-red-500' :
                        evt.type === 'birthday' ? 'bg-pink-500/10 text-pink-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {evt.type === 'holiday' ? 'Libur Nasional' : evt.type === 'birthday' ? 'Ulang Tahun' : 'Kegiatan Club'}
                      </span>
                      <p className="font-extrabold text-theme-text text-sm leading-relaxed break-words">{evt.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="w-full mt-2 bg-theme-primary text-white py-3 rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-theme-primary/10"
                onClick={() => setSelectedDayEvents(null)}
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
