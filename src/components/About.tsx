import React from 'react';
import { Users, Shield, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { CHAPTERS } from '../data';

export default function About() {
  return (
    <section id="about" className="py-24 bg-black border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Tentang <span className="text-blue-500">Auto Claser</span> <span className="text-red-500">Club</span>
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full mb-8" />
            
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              Auto Claser Club (ACC) adalah komunitas otomotif yang mewadahi para pemilik dan pecinta mobil. 
              Berdiri atas dasar kesamaan hobi dan kecintaan terhadap dunia otomotif, ACC berkembang menjadi 
              lebih dari sekadar klub mobil; kami adalah keluarga kedua bagi anggotanya.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Dengan ribuan member yang tersebar di berbagai wilayah nusantara, kami aktif mengadakan berbagai 
              kegiatan positif mulai dari kopi darat (kopdar), touring, kegiatan sosial, hingga edukasi 
              keselamatan berkendara bersama instansi terkait.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
                <Users className="text-blue-500 mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Persaudaraan</h3>
                <p className="text-zinc-500 text-sm">Solidaritas sebagai keluarga besar yang saling membantu dan menghargai.</p>
              </div>
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
                <Shield className="text-red-500 mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Aksi Positif</h3>
                <p className="text-zinc-500 text-sm">Gaya hidup positif, tertib berlalu lintas, dan aktif dalam baksos.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1541348263662-e068fba22af2?auto=format&fit=crop&q=80&w=1000" 
                alt="Community Gathering" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
            </div>
            
            {/* Stats Badge */}
            <div className="absolute -bottom-8 -left-8 bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl flex items-center gap-6">
              <div>
                <p className="text-4xl font-black text-white">500+</p>
                <p className="text-zinc-400 font-medium">Anggota Aktif</p>
              </div>
              <div className="w-[1px] h-12 bg-zinc-700" />
              <div>
                <p className="text-4xl font-black text-red-500">{CHAPTERS.length}</p>
                <p className="text-zinc-400 font-medium">Chapter Regional</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chapters Section */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Chapter & Regional</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto">Kami tersebar di berbagai pelosok nusantara, siap menyambut Anda kapanpun dan dimanapun.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {CHAPTERS.map((chapter) => (
              <div key={chapter.id} className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 px-6 py-4 rounded-full flex items-center gap-3 transition-colors cursor-default">
                <MapPin className="text-blue-500" size={20} />
                <span className="text-zinc-300 font-medium">{chapter.name}</span>
                <span className="bg-black text-xs font-bold text-zinc-500 px-2 py-1 rounded-full">{chapter.memberCount} Member</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
