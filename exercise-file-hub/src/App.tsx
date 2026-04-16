/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function App() {
  const [downloading, setDownloading] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);

  const exercises = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleDownload = (id: number) => {
    setDownloading(id);
    
    // This points to the /public/exercises/ folder
    // Note: Files in 'public' are served from the root path '/'
    const filePath = `/exercises/exercise_${id}.zip`;
    
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = filePath;
      // This suggests a filename to the browser
      link.download = `Упражнение_${id}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloading(null);
      if (!completed.includes(id)) {
        setCompleted(prev => [...prev, id]);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg text-ink font-sans selection:bg-accent selection:text-white">
      <div className="max-w-[1200px] mx-auto p-8 md:p-16 min-h-screen flex flex-col">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-ink pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted mb-2">
              <span className="w-2 h-2 bg-accent rounded-full" />
              Упражненията на Виктор
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-[-0.05em] uppercase leading-none">
              Упражнения
            </h1>
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest text-muted">
            Е-Бизнес
          </div>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 flex-grow">
          {exercises.map((id, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="h-full"
            >
              <button
                onClick={() => handleDownload(id)}
                disabled={downloading === id}
                className={`
                  group relative w-full h-full flex flex-col justify-between p-6 bg-white border-2 border-ink 
                  transition-all duration-100 cursor-pointer text-left
                  hover:bg-ink hover:text-bg
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] opacity-60 group-hover:text-bg">
                    Упражнение
                  </span>
                  <div className="text-[80px] font-black leading-[0.8] my-4 tracking-[-0.05em] group-hover:text-bg">
                    {id.toString().padStart(2, '0')}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className={`
                    inline-block px-3 py-2 border border-ink text-[10px] font-bold uppercase tracking-wider
                    group-hover:border-bg group-hover:text-bg
                    ${completed.includes(id) ? 'bg-accent text-white border-accent' : ''}
                  `}>
                    {downloading === id ? 'Downloading...' : completed.includes(id) ? 'Готово' : 'Изтегли'}
                  </div>
                </div>

                {/* Progress bar simulation */}
                <AnimatePresence>
                  {downloading === id && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute bottom-0 left-0 h-1 bg-accent"
                    />
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[12px] font-medium text-muted">
          <div>© 2026 Виктор Господинов</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Е-Бизнес</span>
            <span className="hidden md:inline">•</span>
            <span>ТУ-София</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
