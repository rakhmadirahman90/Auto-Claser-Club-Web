import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';

export default function News() {
  const { posts } = useData();

  return (
    <section id="news" className="py-8 sm:py-16 md:py-24 bg-theme-bg border-t border-theme-border flex-1 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full font-sans">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-4">
          <div>
            <span className="text-theme-secondary font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 block font-sans">Berita & Galeri</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-theme-text font-sans">
              Cerita <span className="text-theme-primary">Perjalanan</span>
            </h2>
          </div>
          <a href="#" className="flex items-center gap-2 text-sm text-theme-muted hover:text-theme-text transition-colors">
            Lihat Semua Berita <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Main featured post (first item) */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer lg:row-span-2 min-h-[300px] sm:min-h-[400px] lg:min-h-full"
            >
              <img 
                src={posts[0].imageUrl || 'https://images.unsplash.com/photo-1511226888494-1a98622c1598?auto=format&fit=crop&q=80&w=1000'}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  const fallback = 'https://images.unsplash.com/photo-1511226888494-1a98622c1598?auto=format&fit=crop&q=80&w=1000';
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
                alt={posts[0].title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/60 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="inline-block bg-theme-primary text-theme-text text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4">
                  {posts[0].category}
                </span>
                <p className="text-theme-muted text-sm mb-2">{posts[0].date}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-theme-text mb-3 group-hover:text-blue-400 transition-colors">
                  {posts[0].title}
                </h3>
                <p className="text-theme-muted line-clamp-2 md:line-clamp-3">
                  {posts[0].excerpt}
                </p>
              </div>
            </motion.div>
          )}

          {/* Secondary posts */}
          <div className="space-y-6 sm:space-y-8">
            {posts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 group cursor-pointer bg-theme-surface/30 p-4 rounded-xl border border-theme-border/50 hover:border-zinc-700 transition-colors"
              >
                <div className="sm:w-48 h-48 sm:h-auto shrink-0 rounded-lg overflow-hidden relative">
                  <img 
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1511226888494-1a98622c1598?auto=format&fit=crop&q=80&w=1000'}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      const fallback = 'https://images.unsplash.com/photo-1511226888494-1a98622c1598?auto=format&fit=crop&q=80&w=1000';
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="py-2">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-theme-secondary text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-theme-muted text-xs">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-theme-text mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-theme-muted text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
