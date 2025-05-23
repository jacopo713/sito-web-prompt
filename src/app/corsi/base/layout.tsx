// src/app/corsi/base/layout.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Importa useRouter
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FiGrid, FiChevronRight, FiCheckSquare, FiSquare, FiLock, FiLoader } from 'react-icons/fi'; // Importa FiLoader
import { FaBrain } from 'react-icons/fa';
import { baseCourseStructure, getBaseFlatLessons } from '@/data/courseStructure'; // CORRETTO: Usa getBaseFlatLessons
import type { Module, Lesson, LessonStatus } from '@/data/courseStructure';
import { useAuth } from '@/context/AuthContext'; // Importa useAuth

const LOCAL_STORAGE_COMPLETED_LESSONS_KEY = 'completedCourseLessons_v1';

const StatusIcon = ({ status }: { status: LessonStatus }) => {
  switch (status) {
    case 'completed':
      return <FiCheckSquare className="h-4 w-4 text-green-500 flex-shrink-0" />;
    case 'current':
      return <FiChevronRight className="h-4 w-4 text-indigo-500 dark:text-indigo-400 animate-pulse flex-shrink-0" />;
    case 'locked':
      return <FiLock className="h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />;
    case 'unlocked':
    default:
      return <FiSquare className="h-4 w-4 text-slate-300 dark:text-slate-600 flex-shrink-0" />;
  }
};

export default function BaseCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseTitle = "Prompting Efficace e Metacognizione Iniziale";
  const pathname = usePathname();
  const router = useRouter(); // Inizializza router
  const { user, loading: authLoading } = useAuth(); // Ottieni utente e stato di caricamento auth

  const flatLessons = useMemo(() => getBaseFlatLessons(baseCourseStructure), []); // CORRETTO: Usa getBaseFlatLessons

  const [activeLessonPath, setActiveLessonPath] = useState<string | null>(null);
  const [completedLessonSlugs, setCompletedLessonSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCompleted = localStorage.getItem(LOCAL_STORAGE_COMPLETED_LESSONS_KEY);
      if (storedCompleted) {
        try {
          const parsedSlugs = JSON.parse(storedCompleted);
          if (Array.isArray(parsedSlugs)) {
            setCompletedLessonSlugs(new Set(parsedSlugs));
          } else {
            setCompletedLessonSlugs(new Set());
          }
        } catch (e) {
          console.error("Failed to parse completed lessons from localStorage", e);
          setCompletedLessonSlugs(new Set());
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_COMPLETED_LESSONS_KEY, JSON.stringify(Array.from(completedLessonSlugs)));
    }
  }, [completedLessonSlugs]);

  useEffect(() => {
    const currentLessonInFlatList = flatLessons.find(l => l.fullSlug === pathname);
    if (currentLessonInFlatList) {
      setActiveLessonPath(currentLessonInFlatList.fullSlug);

      const currentLessonIndexInFlatList = flatLessons.findIndex(l => l.fullSlug === currentLessonInFlatList.fullSlug);

      if (currentLessonIndexInFlatList > -1) {
        setCompletedLessonSlugs(prevCompletedSlugs => {
          const newCompletedSlugs = new Set(prevCompletedSlugs);
          let changed = false;
          for (let i = 0; i < currentLessonIndexInFlatList; i++) {
            if (!newCompletedSlugs.has(flatLessons[i].fullSlug)) {
              newCompletedSlugs.add(flatLessons[i].fullSlug);
              changed = true;
            }
          }
          return changed ? newCompletedSlugs : prevCompletedSlugs;
        });
      }
    }
  }, [pathname, flatLessons]);

  const getLessonStatus = useCallback((lessonFullSlugToEvaluate: string): LessonStatus => {
    if (completedLessonSlugs.has(lessonFullSlugToEvaluate)) {
      return activeLessonPath === lessonFullSlugToEvaluate ? 'current' : 'completed';
    }
    if (activeLessonPath === lessonFullSlugToEvaluate) {
      return 'current';
    }
    const lessonIndex = flatLessons.findIndex(l => l.fullSlug === lessonFullSlugToEvaluate);
    if (lessonIndex === 0) return 'unlocked';

    if (lessonIndex > 0) {
        const previousLessonSlug = flatLessons[lessonIndex - 1].fullSlug;
        if (completedLessonSlugs.has(previousLessonSlug) || activeLessonPath === previousLessonSlug) {
            return 'unlocked';
        }
    }
    return 'unlocked'; 
  }, [activeLessonPath, completedLessonSlugs, flatLessons]);

  useEffect(() => {
    if (!authLoading && !user) {
      const currentPath = pathname;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, authLoading, router, pathname]);

  if (authLoading || (!user && pathname.startsWith('/corsi/base/'))) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
        <FiLoader className="animate-spin h-12 w-12 text-indigo-600 dark:text-indigo-400" />
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
          {authLoading ? 'Verifica autenticazione...' : 'Accesso richiesto...'}
        </p>
      </div>
    );
  }

  if (!user && pathname.startsWith('/corsi/base/')) {
      return null; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/corsi/base" className="flex items-center space-x-2 group" aria-label="Torna alla panoramica del corso">
            <FaBrain className="h-6 w-6 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors"/>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {courseTitle}
              </span>
          </Link>
          <div>
            <Link href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                Esci dal Corso
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-24 self-start">
            <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg p-5">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-5 flex items-center">
                <FiGrid className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Contenuto del Corso
              </h2>
              <nav>
                <ul className="space-y-4">
                  {baseCourseStructure.map((module: Module) => (
                    <li key={module.moduleSlug}>
                      <Link href={`/corsi/base/${module.moduleSlug}`} className='block mb-3 group'>
                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {module.moduleTitle}
                        </h3>
                      </Link>
                      <ul className="space-y-1">
                        {module.lessons.map((lesson: Lesson) => {
                          const lessonFullSlug = `/corsi/base/${module.moduleSlug}/${lesson.slug}`;
                          const status = getLessonStatus(lessonFullSlug);
                          
                          return (
                            <li key={lesson.slug}>
                              <Link
                                href={lessonFullSlug}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                                  status === 'current'
                                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium'
                                    : status === 'locked' 
                                      ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-70' 
                                      : status === 'completed'
                                        ? 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                }`}
                                aria-current={status === 'current' ? 'page' : undefined}
                              >
                                <StatusIcon status={status} />
                                <span>{lesson.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <main className="flex-grow min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
