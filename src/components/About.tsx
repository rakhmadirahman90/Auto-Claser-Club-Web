import React from 'react';
import { Users, Shield, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';

export default function About() {
  const { chapters, aboutData } = useData();

  const title = aboutData?.title || "Tentang Auto Claser Club";
  const desc1 = aboutData?.description1 || "Auto Claser Club (ACC) adalah komunitas otomotif yang mewadahi para pemilik dan pecinta mobil. Berdiri atas dasar kesamaan hobi dan kecintaan terhadap dunia otomotif, ACC berkembang menjadi lebih dari sekadar klub mobil; kami adalah keluarga kedua bagi anggotanya.";
  const desc2 = aboutData?.description2 || "Dengan ribuan member yang tersebar di berbagai wilayah nusantara, kami aktif mengadakan berbagai kegiatan positif mulai dari kopi darat (kopdar), touring, kegiatan sosial, hingga edukasi keselamatan berkendara bersama instansi terkait.";
  const fallbackImg = "https://images.unsplash.com/photo-1541348263662-e068fba22af2?auto=format&fit=crop&q=80&w=1000";
  const imgUrl = aboutData?.imageUrl || fallbackImg;
  const statsMembers = aboutData?.statsMembers || "500+";

  return (
    <section id="about" className="py-24 bg-theme-bg border-y border-theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-theme-text mb-6">
              {title}
            </h2>
            <div className="h-1 w-20 bg-theme-primary rounded-full mb-8" />
            
            <p className="text-theme-muted text-lg leading-relaxed mb-6">
              {desc1}
            </p>
            <p className="text-theme-muted text-lg leading-relaxed mb-8">
              {desc2}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-theme-surface/50 p-6 rounded-lg border border-theme-border">
                <Users className="text-theme-primary mb-4" size={32} />
                <h3 className="text-xl font-bold text-theme-text mb-2">Persaudaraan</h3>
                <p className="text-theme-muted text-sm">Solidaritas sebagai keluarga besar yang saling membantu dan menghargai.</p>
              </div>
              <div className="bg-theme-surface/50 p-6 rounded-lg border border-theme-border">
                <Shield className="text-theme-secondary mb-4" size={32} />
                <h3 className="text-xl font-bold text-theme-text mb-2">Aksi Positif</h3>
                <p className="text-theme-muted text-sm">Gaya hidup positif, tertib berlalu lintas, dan aktif dalam baksos.</p>
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
                src={imgUrl}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== fallbackImg) {
                    target.src = fallbackImg;
                  }
                }}
                alt="Community Gathering" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-theme-primary/20 mix-blend-multiply" />
            </div>
            
            {/* Stats Badge */}
            <div className="absolute -bottom-8 -left-8 bg-theme-surface border border-theme-border p-6 rounded-xl shadow-xl flex items-center gap-6">
              <div>
                <p className="text-4xl font-black text-theme-text">{statsMembers}</p>
                <p className="text-theme-muted font-medium">Anggota Aktif</p>
              </div>
              <div className="w-[1px] h-12 bg-theme-surface" />
              <div>
                <p className="text-4xl font-black text-theme-secondary">{chapters.length}</p>
                <p className="text-theme-muted font-medium">Chapter Regional</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chapters Section */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-theme-text mb-4">Chapter & Regional</h3>
            <p className="text-theme-muted max-w-2xl mx-auto">Kami tersebar di berbagai pelosok nusantara, siap menyambut Anda kapanpun dan dimanapun.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="bg-theme-surface/40 border border-theme-border hover:border-zinc-600 px-6 py-4 rounded-full flex items-center gap-3 transition-colors cursor-default">
                <MapPin className="text-theme-primary" size={20} />
                <span className="text-theme-muted font-medium">{chapter.name}</span>
                <span className="bg-theme-bg text-xs font-bold text-theme-muted px-2 py-1 rounded-full">{chapter.memberCount} Member</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
