import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

export default function Join() {
  const { joinData, addRegistration } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    vehicleType: '',
    vehicleYear: '',
    licensePlate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = joinData?.title || 'Bergabung Bersama Kami';
  const description = joinData?.description || 'Isi formulir pendaftaran di bawah ini untuk menjadi bagian dari keluarga besar Auto Claser Club. Admin kami akan segera memproses pendaftaran Anda.';
  const adminWhatsApp = joinData?.adminWhatsApp || '6281234567890';
  const imgUrl = joinData?.imageUrl || 'https://images.unsplash.com/photo-1503370321287-320dcf7366d4?auto=format&fit=crop&q=80&w=1000';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.vehicleType || !formData.vehicleYear || !formData.licensePlate) {
      toast.error("Harap isi semua kolom pendaftaran.");
      return;
    }

    setIsSubmitting(true);

    try {
      await addRegistration({
        ...formData,
        createdAt: new Date().toISOString()
      });
      
      toast.success("Berhasil mendaftar! Mengalihkan ke WhatsApp...");

      const message = `Halo Admin ACC, saya ingin mendaftar menjadi anggota. Berikut data diri saya:%0A%0A` +
                      `*Nama Lengkap:* ${formData.name}%0A` +
                      `*No. WhatsApp:* ${formData.phone}%0A` +
                      `*Alamat/Domisili:* ${formData.address}%0A` +
                      `*Jenis Kendaraan:* ${formData.vehicleType}%0A` +
                      `*Tahun Kendaraan:* ${formData.vehicleYear}%0A` +
                      `*Nomor Polisi:* ${formData.licensePlate}%0A%0A` +
                      `Terima kasih.`;

      const waLink = `https://wa.me/${adminWhatsApp}?text=${message}`;
      
      setFormData({
        name: '',
        phone: '',
        address: '',
        vehicleType: '',
        vehicleYear: '',
        licensePlate: '',
      });

      setTimeout(() => {
        window.open(waLink, '_blank');
      }, 1500);
      
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan data.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="join" className="py-24 bg-theme-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <div className="bg-theme-surface border border-theme-border rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-theme-text mb-6">Formulir Pendaftaran</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-theme-muted mb-1">Nama Lengkap</label>
                  <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full bg-theme-bg border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-primary transition-colors" placeholder="Masukkan nama lengkap Anda" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-theme-muted mb-1">No. WhatsApp</label>
                  <input required type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-theme-bg border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-primary transition-colors" placeholder="contoh: 081234567890" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-theme-muted mb-1">Alamat / Domisili</label>
                  <textarea required id="address" name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full bg-theme-bg border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-primary transition-colors resize-none" placeholder="Masukkan alamat lengkap atau kota domisili" />
                </div>
                <div>
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-theme-muted mb-1">Model / Varian Kendaraan</label>
                  <input required type="text" id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full bg-theme-bg border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-primary transition-colors" placeholder="contoh: Honda Civic FD1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vehicleYear" className="block text-sm font-medium text-theme-muted mb-1">Tahun Kendaraan</label>
                    <input required type="text" id="vehicleYear" name="vehicleYear" value={formData.vehicleYear} onChange={handleChange} className="w-full bg-theme-bg border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-primary transition-colors" placeholder="contoh: 2010" />
                  </div>
                  <div>
                    <label htmlFor="licensePlate" className="block text-sm font-medium text-theme-muted mb-1">Nomor Polisi</label>
                    <input required type="text" id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleChange} className="w-full bg-theme-bg border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-primary transition-colors" placeholder="contoh: B 1234 ABC" />
                  </div>
                </div>
                
                <button disabled={isSubmitting} type="submit" className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl mt-6 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]">
                  <Send size={20} /> {isSubmitting ? 'Mengirim...' : 'Kirim via WhatsApp'}
                </button>
                <p className="text-xs text-center text-theme-muted mt-4">
                  Data Anda aman bersama kami. Setelah klik kirim, Anda akan diarahkan ke WhatsApp Admin.
                </p>
              </form>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-theme-text leading-tight">
              {title}
            </h2>
            <div className="h-1 w-20 bg-theme-primary rounded-full" />
            <p className="text-lg text-theme-muted leading-relaxed">
              {description}
            </p>
            <div className="rounded-2xl overflow-hidden aspect-video shadow-2xl relative">
               <img 
                 src={imgUrl} 
                 alt="Pendaftaran"
                 onError={(e) => {
                   const t = e.currentTarget as HTMLImageElement;
                   const fb = 'https://images.unsplash.com/photo-1503370321287-320dcf7366d4?auto=format&fit=crop&q=80&w=1000';
                   if (t.src !== fb) t.src = fb;
                 }}
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-theme-bg/80 to-transparent"></div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
