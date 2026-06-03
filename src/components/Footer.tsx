import React from 'react';
import { Instagram, Facebook, Youtube, Mail, Phone, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-theme-bg pt-20 pb-10 border-t border-theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Join Section */}
        <section className="mb-24">
          <div className="bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 border border-theme-border rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-theme-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-theme-secondary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-theme-text mb-6">
                Siap Menjadi Bagian dari <span className="text-theme-primary">Keluarga?</span>
              </h2>
              <p className="text-theme-muted text-lg mb-10">
                Pendaftaran anggota baru selalu terbuka. Jadilah bagian dari jaringan komunitas otomotif terbesar dengan semangat persaudaraan tanpa batas.
              </p>
              
              <a 
                href="#join"
                className="inline-flex items-center gap-2 bg-theme-text text-theme-text-inv hover:bg-theme-border font-bold px-8 py-4 rounded-full transition-colors uppercase tracking-widest text-sm"
              >
                Daftar Sekarang
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <img src="/logo.jpg" alt="ACC Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-theme-muted text-sm mb-6 max-w-xs">
              Auto Claser Club - Komunitas otomotif yang menjunjung tinggi persaudaraan dan keselamatan berlalu lintas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-theme-surface flex items-center justify-center text-theme-muted hover:bg-theme-primary hover:text-theme-text transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-theme-surface flex items-center justify-center text-theme-muted hover:bg-theme-secondary hover:text-theme-text transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-theme-surface flex items-center justify-center text-theme-muted hover:bg-theme-secondary hover:text-theme-text transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-theme-text font-bold mb-6">Tautan Cepat</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-theme-muted hover:text-theme-primary transition-colors text-sm">Beranda</a></li>
              <li><a href="#about" className="text-theme-muted hover:text-theme-primary transition-colors text-sm">Profil Klub</a></li>
              <li><a href="#activities" className="text-theme-muted hover:text-theme-primary transition-colors text-sm">Agenda</a></li>
              <li><a href="#news" className="text-theme-muted hover:text-theme-primary transition-colors text-sm">Berita & Galeri</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-theme-text font-bold mb-6">Informasi</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-theme-muted hover:text-theme-secondary transition-colors text-sm">Syarat & Ketentuan Member</a></li>
              <li><a href="#" className="text-theme-muted hover:text-theme-secondary transition-colors text-sm">Daftar Chapter</a></li>
              <li><a href="#" className="text-theme-muted hover:text-theme-secondary transition-colors text-sm">Merchandise Resmi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-theme-text font-bold mb-6">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-theme-muted text-sm">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <span>info@autoclaserclub.com</span>
              </li>
              <li className="flex items-start gap-3 text-theme-muted text-sm">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <span>+62 812 3456 7890 (Humas)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-theme-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-theme-muted text-xs">
            © {new Date().getFullYear()} Auto Claser Club. All rights reserved.
          </p>
          <p className="text-theme-muted text-xs flex gap-4">
            <Link to="/admin" className="hover:text-zinc-400">Admin Dashboard</Link>
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
