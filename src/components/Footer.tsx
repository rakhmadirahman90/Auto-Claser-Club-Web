import React from 'react';
import { Instagram, Facebook, Youtube, Mail, Phone, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Join Section */}
        <section id="join" className="mb-24">
          <div className="bg-gradient-to-br from-blue-900/20 to-red-900/20 border border-zinc-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Siap Menjadi Bagian dari <span className="text-blue-500">Keluarga?</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-10">
                Pendaftaran anggota baru selalu terbuka. Jadilah bagian dari jaringan komunitas otomotif terbesar dengan semangat persaudaraan tanpa batas.
              </p>
              
              <a 
                href="https://wa.me/1234567890" // Placeholder
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 font-bold px-8 py-4 rounded-full transition-colors uppercase tracking-widest text-sm"
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
            <div className="text-2xl font-black italic tracking-wider flex items-center mb-6">
              <span className="text-blue-600">A</span>
              <span className="text-blue-600">C</span>
              <span className="text-red-600">C</span>
            </div>
            <p className="text-zinc-500 text-sm mb-6 max-w-xs">
              Auto Claser Club - Komunitas otomotif yang menjunjung tinggi persaudaraan dan keselamatan berlalu lintas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-red-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-red-600 hover:text-white transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Tautan Cepat</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-zinc-500 hover:text-blue-400 transition-colors text-sm">Beranda</a></li>
              <li><a href="#about" className="text-zinc-500 hover:text-blue-400 transition-colors text-sm">Profil Klub</a></li>
              <li><a href="#activities" className="text-zinc-500 hover:text-blue-400 transition-colors text-sm">Agenda</a></li>
              <li><a href="#news" className="text-zinc-500 hover:text-blue-400 transition-colors text-sm">Berita & Galeri</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Informasi</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-500 hover:text-red-400 transition-colors text-sm">Syarat & Ketentuan Member</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-red-400 transition-colors text-sm">Daftar Chapter</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-red-400 transition-colors text-sm">Merchandise Resmi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-500 text-sm">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <span>info@autoclaserclub.com</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-500 text-sm">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <span>+62 812 3456 7890 (Humas)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} Auto Claser Club. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs flex gap-4">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
