import React from 'react';
import { FaBrain } from 'react-icons/fa';
import { FiChevronDown, FiZap, FiTarget } from 'react-icons/fi';

interface HeroSectionProps {
  onScrollToCourses: () => void;
}

/**
 * Hero section component for the homepage.
 * Displays the main title, subtitle, and a call-to-action button.
 */
export default function HeroSection({ onScrollToCourses }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 md:py-32 lg:py-40 min-h-[calc(85vh-4rem)] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-indigo-950/50 dark:to-purple-950/30"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-sky-400/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Animated Icon */}
        <div className="mb-8 animate-bounce">
          <div className="relative inline-flex">
            <FaBrain className="h-16 w-16 sm:h-20 sm:w-20 text-indigo-600 dark:text-indigo-400 drop-shadow-lg" />
            <div className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
            <FiZap className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-pulse" />
          </div>
        </div>

        {/* Main Heading with Animation */}
        <div className="space-y-6 mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 dark:from-indigo-400 dark:via-purple-400 dark:to-sky-400 animate-gradient-x">
              Metacognizione Avanzata
            </span>
            <span className="block text-slate-800 dark:text-slate-200 mt-2 sm:mt-4">
              Amplifica i Risultati con l&apos;IA
            </span>
          </h1>
          
          <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400">
            <FiTarget className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">Il Futuro del Prompting Strategico</span>
          </div>
        </div>

        {/* Enhanced Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
          Sblocca il vero potenziale dell&apos;Intelligenza Artificiale imparando a dirigere il tuo pensiero. 
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> La metacognizione è la chiave</span> per formulare prompt che trasformano le tue interazioni AI in risultati straordinari.
        </p>

        {/* Enhanced CTA Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <button
            onClick={onScrollToCourses}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50"
          >
            {/* Button Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl group-hover:shadow-indigo-500/25 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button Content */}
            <span className="relative flex items-center space-x-2">
              <span>Potenzia la Tua Mente AI</span>
              <FiChevronDown className="h-5 w-5 group-hover:animate-bounce" />
            </span>
          </button>
          
          <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Inizia subito • Nessuna carta richiesta</span>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400">
            <div className="flex -space-x-1">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full border-2 border-white dark:border-slate-800"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white dark:border-slate-800"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white dark:border-slate-800"></div>
            </div>
            <span className="text-sm font-medium">500+ Studenti</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
            <span className="text-sm font-medium">Valutazione 5★</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400">
            <FiTarget className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-medium">Risultati Garantiti</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
