import React from 'react';
import { BLOG_POSTS } from '../data';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function News() {
  return (
    <section id="news" className="py-24 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-red-500 font-bold tracking-widest uppercase text-sm mb-2 block">Berita & Galeri</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Cerita <span className="text-blue-500">Perjalanan</span>
            </h2>
          </div>
          <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            Lihat Semua Berita <ArrowRight size={20} />
          </a>
        </div>

        <div className="grid lg:grid-cols-2 flex-col gap-8">
          {/* Main featured post (first item) */}
          {BLOG_POSTS.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer lg:row-span-2 min-h-[400px] lg:min-h-full"
            >
              <img 
                src={BLOG_POSTS[0].imageUrl} 
                alt={BLOG_POSTS[0].title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="inline-block bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4">
                  {BLOG_POSTS[0].category}
                </span>
                <p className="text-zinc-300 text-sm mb-2">{BLOG_POSTS[0].date}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {BLOG_POSTS[0].title}
                </h3>
                <p className="text-zinc-400 line-clamp-2 md:line-clamp-3">
                  {BLOG_POSTS[0].excerpt}
                </p>
              </div>
            </motion.div>
          )}

          {/* Secondary posts */}
          <div className="space-y-8">
            {BLOG_POSTS.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 group cursor-pointer bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors"
              >
                <div className="sm:w-48 h-48 sm:h-auto shrink-0 rounded-lg overflow-hidden relative">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="py-2">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-red-500 text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-3">
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
