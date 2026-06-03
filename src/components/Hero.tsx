import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Hero() {
  const { heroData } = useData();

  const title = heroData?.title || "Satu Aspal,\nSatu Keluarga.";
  const subtitle = heroData?.subtitle || "Solidaritas Tanpa Batas";
  const desc = heroData?.description || "Selamat datang di website resmi Auto Claser Club. Rumah bagi para pecinta otomotif, berbagi informasi, modifikasi, dan persaudaraan nyata.";
  const fallbackImg = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000";
  const imgUrl = heroData?.imageUrl || fallbackImg;

  // Since title might have \n, we replace it with <br/>
  const formatTitle = () => {
    return title.split('\n').map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <section id="home" className="relative flex-1 h-full min-h-0 flex items-center w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-theme-bg via-theme-bg/85 to-transparent z-10" />
        <img
          src={imgUrl}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== fallbackImg) {
              target.src = fallbackImg;
            }
          }}
          alt="Car Scene"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl py-2"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-6">
            <span className="h-1 w-8 sm:w-12 bg-theme-primary rounded-full"></span>
            <span className="text-theme-muted font-medium tracking-widest uppercase text-xs sm:text-sm">{subtitle}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-theme-text leading-tight mb-4 sm:mb-6" style={{ whiteSpace: 'pre-line' }}>
            {title}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-theme-muted mb-6 sm:mb-8 max-w-2xl leading-relaxed">
            {desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md sm:max-w-none">
            <Link
              to="/#join"
              className="inline-flex justify-center items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-theme-secondary hover:bg-red-700 text-theme-text font-bold rounded-md transition-all uppercase tracking-widest text-xs sm:text-sm"
            >
              Gabung Sekarang
              <ChevronRight size={16} />
            </Link>
            <Link
              to="/#about"
              className="inline-flex justify-center items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-theme-border hover:border-theme-primary hover:text-theme-primary text-theme-text font-bold rounded-md transition-all uppercase tracking-widest text-xs sm:text-sm"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
