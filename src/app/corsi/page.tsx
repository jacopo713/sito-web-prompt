// src/app/corsi/page.tsx
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FiBookOpen, FiGrid, FiLoader, FiAlertTriangle } from 'react-icons/fi';
import CourseCardList from '@/components/homepage/CourseCardList';
import { coursesData as allCoursesData, CourseData } from '@/data/homepageData';

export default function CorsiPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const corsiDaMostrare: CourseData[] = allCoursesData;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=${encodeURIComponent('/corsi')}`);
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <FiLoader className="animate-spin h-12 w-12 text-indigo-600 dark:text-indigo-400" />
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">Caricamento corsi...</p>
      </div>
    );
  }

  if (!user) {
    return (
       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <FiAlertTriangle className="h-12 w-12 text-yellow-500 dark:text-yellow-400" />
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">Accesso richiesto per visualizzare i corsi.</p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sarai reindirizzato alla pagina di login.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-4rem)] py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <FiBookOpen className="mx-auto h-16 w-16 sm:h-20 sm:w-20 mb-6 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            I Nostri Corsi
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Esplora la nostra offerta formativa progettata per potenziare le tue abilità nell&apos;interazione con l&apos;Intelligenza Artificiale e sviluppare una solida competenza metacognitiva.
          </p>
        </header>

        {corsiDaMostrare && corsiDaMostrare.length > 0 ? (
          <CourseCardList courses={corsiDaMostrare} />
        ) : (
          <div className="text-center py-10">
            <FiGrid className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
            <h3 className="mt-4 text-xl font-medium text-slate-700 dark:text-slate-200">
              Nessun corso disponibile al momento.
            </h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Torna a trovarci presto per scoprire nuove offerte formative!
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline font-medium transition-colors duration-150">
            &larr; Torna alla Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
