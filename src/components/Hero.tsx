import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"
          alt="Car Scene"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-1 w-12 bg-blue-600 rounded-full"></span>
            <span className="text-zinc-300 font-medium tracking-widest uppercase text-sm">Solidaritas Tanpa Batas</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Satu <span className="text-blue-500">Aspal</span>,<br />
            Satu <span className="text-red-500">Keluarga</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
            Selamat datang di website resmi Auto Claser Club. Rumah bagi para pecinta otomotif, 
            berbagi informasi, modifikasi, dan persaudaraan nyata.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#join"
              className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-all uppercase tracking-widest text-sm"
            >
              Gabung Sekarang
              <ChevronRight size={18} />
            </a>
            <a
              href="#about"
              className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-transparent border-2 border-zinc-700 hover:border-blue-500 hover:text-blue-400 text-white font-bold rounded-md transition-all uppercase tracking-widest text-sm"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <a href="#about" className="text-zinc-500 hover:text-white transition-colors">
          <ChevronRight size={24} className="rotate-90" />
        </a>
      </div>
    </section>
  );
}
