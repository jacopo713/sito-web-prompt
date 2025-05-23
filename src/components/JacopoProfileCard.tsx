import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiMessageSquare, FiBookOpen } from 'react-icons/fi'; // FiArrowRight rimossa

interface JacopoProfileCardProps {
  variant?: 'default' | 'compact'; // Per possibili variazioni di stile
  showSubtitle?: boolean;
  className?: string;
}

/**
 * Reusable component to display Jacopo's profile.
 * Includes his image, a brief description, and links to coaching and courses.
 */
export default function JacopoProfileCard({
  variant = 'default',
  showSubtitle = true,
  className = '',
}: JacopoProfileCardProps) {
  const imageSize = variant === 'compact' ? 120 : 180; // Dimensioni diverse per varianti

  return (
    <div className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center ${className}`}>
      <div className="mb-4">
        <Image
          src="/images/jacopo.jpg" // Path relativo alla cartella public
          alt="Jacopo, Live Coach e Creatore di Corsi presso Fagyl"
          width={imageSize}
          height={imageSize}
          className="rounded-full mx-auto object-cover ring-4 ring-indigo-500 dark:ring-indigo-400 shadow-md"
          priority={variant === 'default'} // Dai priorità all'immagine se nella variante principale (es. homepage)
        />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
        Jacopo (Fagyl)
      </h3>
      {showSubtitle && (
        <p className="text-md text-indigo-600 dark:text-indigo-400 mb-3 font-medium">
          Il Tuo Live Coach & Esperto di Prompting
        </p>
      )}
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
        Con anni di esperienza nell&apos;ottimizzazione dei processi cognitivi e nella comunicazione efficace con l&apos;IA, Jacopo ti guida a trasformare le tue interazioni con l&apos;intelligenza artificiale in risultati concreti e di alta qualità.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link
          href="/live-coach"
          className="flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors"
        >
          <FiMessageSquare className="mr-2 h-4 w-4" />
          Scopri il Live Coaching
        </Link>
        <Link
          href="/corsi"
          className="flex items-center justify-center px-5 py-2.5 border border-indigo-300 dark:border-indigo-600 text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-700/30 hover:bg-indigo-100 dark:hover:bg-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors"
        >
          <FiBookOpen className="mr-2 h-4 w-4" />
          Esplora i Corsi
        </Link>
      </div>
    </div>
  );
}
