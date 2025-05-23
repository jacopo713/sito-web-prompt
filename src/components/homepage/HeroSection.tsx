import React from 'react';
import { FaBrain } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

interface HeroSectionProps {
  onScrollToCourses: () => void;
}

/**
 * Hero section component for the homepage.
 * Displays the main title, subtitle, and a call-to-action button.
 */
export default function HeroSection({ onScrollToCourses }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 md:py-32 lg:py-40 min-h-[calc(80vh-4rem)] pattern-bg">
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-purple-600/20 dark:from-sky-600/30 dark:via-indigo-600/30 dark:to-purple-700/30 opacity-50 dark:opacity-60 mix-blend-multiply dark:mix-blend-hard-light filter blur-3xl motion-safe:animate-pulse-slow"></div>

      {/* Content Box */}
      <div className="relative z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg p-8 md:p-12 rounded-xl shadow-2xl max-w-3xl ring-1 ring-slate-900/5 dark:ring-white/10">
        <FaBrain className="mx-auto mb-4 h-12 w-12 text-indigo-500 dark:text-indigo-400" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-500">
            Metacognizione Avanzata
          </span>
          <span className="block text-slate-700 dark:text-slate-300 mt-2 sm:mt-3">
            Amplifica i Risultati con l&apos;IA
          </span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400">
          Sblocca il vero potenziale dell&apos;Intelligenza Artificiale imparando a dirigere il tuo pensiero. La metacognizione è la chiave per formulare prompt che trasformano le tue interazioni AI in risultati straordinari.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onScrollToCourses}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-all duration-150 transform hover:scale-105 active:scale-95"
          >
            Potenzia la Tua Mente AI
            <FiChevronDown className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
