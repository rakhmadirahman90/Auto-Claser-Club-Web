import React from 'react';
import { Palette } from 'lucide-react';
import { useTheme, ThemeType } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

const themes: { id: ThemeType; name: string; colors: string[] }[] = [
  { id: 'dark', name: 'Dark Mode', colors: ['bg-theme-bg', 'bg-theme-primary', 'bg-theme-secondary'] },
  { id: 'light', name: 'Light Mode', colors: ['bg-slate-100', 'bg-theme-primary', 'bg-theme-secondary'] },
  { id: 'midnight', name: 'Midnight', colors: ['bg-slate-900', 'bg-sky-500', 'bg-amber-500'] },
  { id: 'forest', name: 'Forest', colors: ['bg-emerald-950', 'bg-emerald-500', 'bg-rose-500'] },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-theme-surface border border-theme-border rounded-2xl shadow-2xl p-4 w-64"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-theme-text">Pilih Tema</h3>
            </div>
            <div className="space-y-2">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                    theme === t.id ? 'bg-theme-primary/10 border-theme-primary' : 'hover:bg-theme-border/50 border-transparent'
                  } border`}
                >
                  <span className="text-theme-text text-sm font-medium">{t.name}</span>
                  <div className="flex gap-1">
                    {t.colors.map((c, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${c}`} />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-theme-primary text-theme-text flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
      >
        <Palette size={24} />
      </button>
    </div>
  );
}
