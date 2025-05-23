// Nessun 'use client' qui, questa pagina è un Server Component.

import React, { Suspense } from 'react'; // Importa Suspense
import Link from 'next/link';
import CoachingPageClientContent from './CoachingPageClientContent'; // Importa il componente client

/**
 * Fallback UI to display while the client-side content is loading.
 */
function LoadingFallback() {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
      <p className="ml-3 text-slate-600 dark:text-slate-300">Caricamento dettagli coaching...</p>
    </div>
  );
}

/**
 * Page for handling coaching requests.
 * Wraps client-dependent content in Suspense.
 */
export default function RichiestaCoachingPageContainer() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-slate-800 dark:text-slate-100">Richiesta di Coaching</h1>
      
      <Suspense fallback={<LoadingFallback />}>
        <CoachingPageClientContent />
      </Suspense>

      <div className="mt-10 sm:mt-12 text-center">
        <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline font-medium transition-colors duration-150">
          &larr; Torna alla Homepage
        </Link>
      </div>
    </div>
  );
}
