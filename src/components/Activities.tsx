import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';

export default function Activities() {
  const { activities } = useData();

  return (
    <section id="activities" className="py-8 sm:py-16 md:py-24 bg-theme-bg flex-1 flex flex-col justify-start md:justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-theme-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 block">Agenda</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-theme-text mb-4 sm:mb-6">
            Kegiatan <span className="text-theme-secondary">Mendatang</span>
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-theme-secondary rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-theme-surface/50 rounded-2xl overflow-hidden border border-theme-border hover:border-theme-primary transition-colors group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-theme-bg/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={activity.imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000'}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    const fallback = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000';
                    if (target.src !== fallback) {
                      target.src = fallback;
                    }
                  }}
                  alt={activity.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-theme-secondary z-20 px-3 py-1 rounded-full flex items-center gap-2">
                  <Calendar size={14} className="text-theme-text" />
                  <span className="text-theme-text text-sm font-bold">{activity.date}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-theme-text mb-4 group-hover:text-blue-400 transition-colors">
                  {activity.title}
                </h3>
                <div className="flex items-center gap-2 text-theme-muted">
                  <MapPin size={18} />
                  <span className="text-sm">{activity.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
