import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const FALLBACK_SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000", // Red Sports Car
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000", // Porsche rear dark aesthetic
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=2000", // Yellow sportscar on winding road
  "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=2000"  // Night city background car
];

export default function Hero() {
  const { heroData } = useData();

  const title = heroData?.title || "Satu Aspal,\nSatu Keluarga.";
  const subtitle = heroData?.subtitle || "Solidaritas Tanpa Batas";
  const desc = heroData?.description || "Selamat datang di website resmi Auto Claser Club. Rumah bagi para pecinta otomotif, berbagi informasi, modifikasi, dan persaudaraan nyata.";

  const sliderImages = useMemo(() => {
    if (heroData?.imageUrl) {
      const urls = heroData.imageUrl
        .split(/[,\n]/)
        .map(url => url.trim())
        .filter(url => url.length > 0);
      if (urls.length > 0) {
        return urls;
      }
    }
    return FALLBACK_SLIDER_IMAGES;
  }, [heroData?.imageUrl]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (sliderImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4500); // Change image every 4.5 seconds
    return () => clearInterval(interval);
  }, [sliderImages]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % sliderImages.length);
  };

  return (
    <section id="home" className="relative flex-1 h-full min-h-0 flex items-center w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 overflow-hidden bg-black text-theme-text">
      {/* Background Image Carousel with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dark radial and linear gradients for ultimate contrast & elegance */}
        <div className="absolute inset-0 bg-gradient-to-r from-theme-bg via-theme-bg/90 sm:via-theme-bg/80 to-theme-bg/10 z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={currentSlideIndex}
            src={sliderImages[currentSlideIndex]}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
      </div>

      {/* Hero Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl py-2"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-6">
            <span className="h-1 w-8 sm:w-12 bg-theme-primary rounded-full"></span>
            <span className="text-theme-muted font-semibold tracking-widest uppercase text-xs sm:text-sm">{subtitle}</span>
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
              className="inline-flex justify-center items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-theme-secondary hover:bg-red-700 text-theme-text font-bold rounded-md transition-all uppercase tracking-widest text-xs sm:text-sm shadow-lg shadow-theme-secondary/20 hover:scale-[1.02]"
            >
              Gabung Sekarang
              <ChevronRight size={16} />
            </Link>
            <Link
              to="/#about"
              className="inline-flex justify-center items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-theme-border hover:border-theme-primary hover:text-theme-primary text-theme-text font-bold rounded-md transition-all uppercase tracking-widest text-xs sm:text-sm hover:bg-theme-surface/30"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slider Manual Controls & Navigation Dots */}
      {sliderImages.length > 1 && (
        <>
          {/* Previous/Next Navigation Arrows (Desktop hidden on mobile for cleaner look, mobile uses touch or dots) */}
          <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrevSlide}
              aria-label="Slide sebelumnya"
              className="p-3 bg-theme-surface/70 border border-theme-border text-theme-text hover:text-theme-primary rounded-full transition-all backdrop-blur-md hover:bg-theme-surface hover:scale-105"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Slide berikutnya"
              className="p-3 bg-theme-surface/70 border border-theme-border text-theme-text hover:text-theme-primary rounded-full transition-all backdrop-blur-md hover:bg-theme-surface hover:scale-105"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Clean Indicator Dots */}
          <div className="absolute bottom-6 left-6 sm:left-1/2 sm:-translate-x-1/2 z-30 flex items-center gap-2.5">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                aria-label={`Buka slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlideIndex 
                    ? 'w-8 bg-theme-primary' 
                    : 'w-2 bg-theme-muted/50 hover:bg-theme-muted'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

