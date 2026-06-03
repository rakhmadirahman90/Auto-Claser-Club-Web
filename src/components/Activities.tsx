import React from 'react';
import { ACTIVITIES } from '../data';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Activities() {
  return (
    <section id="activities" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-2 block">Agenda</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Kegiatan <span className="text-red-500">Mendatang</span>
          </h2>
          <div className="h-1 w-20 bg-red-600 rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACTIVITIES.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-blue-500 transition-colors group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={activity.imageUrl} 
                  alt={activity.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-red-600 z-20 px-3 py-1 rounded-full flex items-center gap-2">
                  <Calendar size={14} className="text-white" />
                  <span className="text-white text-sm font-bold">{activity.date}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {activity.title}
                </h3>
                <div className="flex items-center gap-2 text-zinc-400">
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
