import React, { useState } from 'react';
import { ArrowRight, Eye, Heart, Share2, X, Calendar, Tag, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { BLOG_POSTS } from '../data';
import toast from 'react-hot-toast';

export default function News() {
  const { posts: dbPosts, likePost, viewPost } = useData();
  const posts = dbPosts.length > 0 ? dbPosts : BLOG_POSTS;

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const handleOpenPost = (post: any) => {
    setSelectedPost(post);
    viewPost(post.id);
  };

  const handleLikePost = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    if (likedPosts[postId]) {
      toast.error('Sudah menyukai berita ini!');
      return;
    }
    setLikedPosts(prev => ({ ...prev, [postId]: true }));
    likePost(postId);
    
    // Smoothly update state local display for active modal
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev: any) => ({
        ...prev,
        likes: (prev.likes || 0) + 1
      }));
    }
    toast.success('Berita disukai! Terima kasih.');
  };

  const handleSharePost = (e: React.MouseEvent, post: any) => {
    e.stopPropagation();
    const shareText = `Baca "${post.title}" di Portal Resmi Auto Claser Club!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: shareUrl,
      }).catch(() => {
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        toast.success('Link berita berhasil disalin ke clipboard!');
      });
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast.success('Link berita berhasil disalin ke clipboard!');
    }
  };

  return (
    <section id="news" className="py-8 sm:py-16 md:py-24 bg-theme-bg border-t border-theme-border flex-1 flex flex-col justify-start md:justify-center">
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
              onClick={() => handleOpenPost(posts[0])}
              className="relative rounded-2xl overflow-hidden group cursor-pointer lg:row-span-2 min-h-[300px] sm:min-h-[400px] lg:min-h-full shadow-lg border border-theme-border/40 hover:border-theme-primary/30 transition-all duration-300"
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
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/70 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                <span className="inline-block bg-theme-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg mb-4">
                  {posts[0].category}
                </span>
                <p className="text-theme-muted text-xs sm:text-sm mb-2">{posts[0].date}</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-theme-text mb-3 group-hover:text-theme-primary transition-colors leading-snug">
                  {posts[0].title}
                </h3>
                <p className="text-theme-muted text-sm line-clamp-2 md:line-clamp-3 mb-4">
                  {posts[0].excerpt}
                </p>

                {/* Micro interaction stats */}
                <div className="flex items-center justify-between border-t border-theme-border/30 pt-4 mt-2">
                  <div className="flex items-center gap-4 text-xs text-theme-muted">
                    <span className="flex items-center gap-1.5"><Eye size={14} className="text-blue-400" /> {posts[0].views || 0}</span>
                    <button 
                      onClick={(e) => handleLikePost(e, posts[0].id)} 
                      className={`flex items-center gap-1.5 hover:text-theme-primary transition-colors ${likedPosts[posts[0].id] ? 'text-theme-primary font-bold' : ''}`}
                    >
                      <Heart size={14} className={likedPosts[posts[0].id] ? "fill-theme-primary text-theme-primary" : "text-theme-secondary shrink-0"} /> {likedPosts[posts[0].id] ? (posts[0].likes || 0) + 1 : (posts[0].likes || 0)}
                    </button>
                  </div>
                  <button 
                    onClick={(e) => handleSharePost(e, posts[0])}
                    className="flex items-center gap-1 text-xs text-theme-muted hover:text-theme-primary transition-colors"
                  >
                    <Share2 size={13} /> Bagikan
                  </button>
                </div>
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
                onClick={() => handleOpenPost(post)}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 group cursor-pointer bg-theme-surface/35 p-4 sm:p-5 rounded-2xl border border-theme-border/40 hover:border-theme-primary/30 transition-all duration-300"
              >
                <div className="sm:w-44 h-40 sm:h-auto shrink-0 rounded-xl overflow-hidden relative">
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
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-2.5">
                      <span className="text-theme-secondary text-xs font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-theme-muted text-xs">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-theme-text mb-2 group-hover:text-theme-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-theme-muted text-xs sm:text-sm line-clamp-2 md:line-clamp-3 mb-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Micro stats */}
                  <div className="flex items-center justify-between border-t border-theme-border/30 pt-3 text-xs text-theme-muted">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5"><Eye size={13} className="text-blue-400" /> {post.views || 0}</span>
                      <button 
                        onClick={(e) => handleLikePost(e, post.id)} 
                        className={`flex items-center gap-1.5 hover:text-theme-primary transition-colors ${likedPosts[post.id] ? 'text-theme-primary font-bold' : ''}`}
                      >
                        <Heart size={13} className={likedPosts[post.id] ? "fill-theme-primary text-theme-primary" : "text-theme-secondary shrink-0"} /> {likedPosts[post.id] ? (post.likes || 0) + 1 : (post.likes || 0)}
                      </button>
                    </div>
                    <button 
                      onClick={(e) => handleSharePost(e, post)} 
                      className="flex items-center gap-1 hover:text-theme-primary transition-colors"
                    >
                      <Share2 size={12} /> Bagikan
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern, Premium News Detail Interactive Modal Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Backdrop Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative bg-theme-surface border border-theme-border rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl z-10"
            >
              {/* Image banner section */}
              <div className="relative h-[220px] sm:h-[320px] w-full shrink-0">
                <img 
                  src={selectedPost.imageUrl || 'https://images.unsplash.com/photo-1511226888494-1a98622c1598?auto=format&fit=crop&q=80&w=1000'}
                  alt={selectedPost.title}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    const fallback = 'https://images.unsplash.com/photo-1511226888494-1a98622c1598?auto=format&fit=crop&q=80&w=1000';
                    if (target.src !== fallback) {
                      target.src = fallback;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-transparent to-black/50" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 p-2 rounded-full transition-all border border-white/10"
                  title="Tutup Berita"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-4 left-4 sm:left-6 flex gap-2">
                  <span className="bg-theme-primary text-white text-xs font-black tracking-wide uppercase px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm font-sans">
                    <Tag size={10} /> {selectedPost.category}
                  </span>
                  <span className="bg-black/55 backdrop-blur-md text-slate-300 text-xs font-semibold px-3 py-1 rounded-lg flex items-center gap-1 font-sans">
                    <Calendar size={10} /> {selectedPost.date}
                  </span>
                </div>
              </div>

              {/* Scrollable news text body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-theme-text leading-tight sm:leading-snug">
                    {selectedPost.title}
                  </h2>
                </div>

                {/* Live Views and Likes Dashboard */}
                <div className="flex flex-wrap gap-4 items-center bg-theme-bg/50 px-4 py-3 rounded-2xl border border-theme-border/60 justify-between">
                  <div className="flex gap-4 text-xs sm:text-sm text-theme-muted">
                    <span className="flex items-center gap-1.5">
                      <Eye size={16} className="text-blue-400 shrink-0" />
                      <strong className="text-theme-text font-black">{selectedPost.views || 0}</strong> kali dilihat
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Heart size={16} className="text-rose-500 shrink-0" />
                      <strong className="text-theme-text font-black">{selectedPost.likes || 0}</strong> menyukai
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleLikePost(e, selectedPost.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        likedPosts[selectedPost.id]
                          ? 'bg-theme-primary/15 text-theme-primary border border-theme-primary/30'
                          : 'bg-theme-surface hover:bg-theme-secondary/15 hover:text-theme-secondary hover:border-theme-secondary/30 border border-theme-border'
                      }`}
                    >
                      <Heart size={14} className={likedPosts[selectedPost.id] ? "fill-theme-primary text-theme-primary" : "text-theme-secondary"} />
                      {likedPosts[selectedPost.id] ? 'Disukai' : 'Suka'}
                    </button>
                    <button
                      onClick={(e) => handleSharePost(e, selectedPost)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-theme-surface hover:bg-theme-primary/10 border border-theme-border hover:border-theme-primary/30 transition-all cursor-pointer text-theme-muted hover:text-theme-primary"
                    >
                      <Share2 size={14} />
                      Bagikan
                    </button>
                  </div>
                </div>

                {/* Author Metadata Frame (Who wrote the post) */}
                <div className="flex items-center gap-4 bg-theme-surface p-4 rounded-2xl border border-theme-border/60">
                  <div className="h-12 w-12 rounded-xl overflow-hidden bg-theme-bg/60 border border-theme-border/40 shrink-0 flex items-center justify-center text-lg">
                    {selectedPost.authorAvatar ? (
                      <img src={selectedPost.authorAvatar} alt={selectedPost.authorName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-rose-500 font-extrabold text-xs">
                        {(selectedPost.authorName || 'ACC').split(' ').filter(Boolean).map((n: string) => n[0]).join('').substring(0,2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] text-theme-secondary font-black tracking-wider uppercase block">Penulis Berita</span>
                    <p className="text-sm font-black text-theme-text">{selectedPost.authorName || 'Aris Munandar'}</p>
                    <p className="text-[11px] text-theme-muted font-semibold mt-0.5 flex items-center gap-1">
                      <UserCheck size={11} className="text-theme-primary" /> {selectedPost.authorRole || 'Divisi Humas & Media'}
                    </p>
                  </div>
                </div>

                {/* Rich content display (split with spacing) */}
                <div className="border-t border-theme-border/40 pt-5 space-y-4">
                  {selectedPost.content ? (
                    selectedPost.content.split('\n').filter(Boolean).map((paragraph: string, idx: number) => (
                      <p key={idx} className="text-theme-muted text-sm sm:text-base leading-relaxed text-justify">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-theme-muted text-sm sm:text-base leading-relaxed text-justify">
                      {selectedPost.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
