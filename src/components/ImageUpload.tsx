import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
  value: string;
  onChange: (base64url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar (jpg, png, dll)');
      return;
    }

    setIsCompressing(true);

    try {
      const options = {
        maxSizeMB: 0.1, // compress roughly to 100kb max
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        onChange(base64data);
        setIsCompressing(false);
      };
      reader.onerror = () => {
        alert('Gagal membaca file gambar');
        setIsCompressing(false);
      };

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengompresi gambar');
      setIsCompressing(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="mb-2">
      {value ? (
        <div className="relative inline-block w-full rounded-lg overflow-hidden border border-theme-border bg-theme-bg">
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
          <button
            onClick={handleRemove}
            type="button"
            className="absolute top-2 right-2 bg-theme-surface/80 p-1.5 rounded-full text-theme-text hover:bg-theme-secondary hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="relative border-2 border-dashed border-theme-border rounded-lg p-6 flex flex-col items-center justify-center bg-theme-surface/50 hover:bg-theme-surface transition-colors min-h-32 text-theme-muted cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isCompressing}
          />
          {isCompressing ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin text-theme-primary" size={24} />
              <span className="text-sm">Mengompresi...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={24} />
              <span className="text-sm font-medium">Klik atau seret gambar ke sini</span>
              <span className="text-xs">Maksimal resolusi otomatis disesuaikan dan dikompress tinggi</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
