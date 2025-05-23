import React from 'react';
import { FaBrain } from 'react-icons/fa';

/**
 * Introductory text for the courses section on the homepage.
 */
export default function CoursesIntroduction() {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
        <FaBrain className="inline-block h-8 w-8 sm:h-10 sm:w-10 mr-3 text-indigo-600 dark:text-indigo-400" />
        Coltiva la Tua Metacognizione AI
      </h2>
      <p className="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
        I nostri corsi sono progettati per sviluppare la tua capacità di &quot;pensare sul pensiero&quot; e orchestrare l&apos;IA con maestria strategica, integrando le TOP abilità per massimizzare l&apos;uso dell&apos;Intelligenza Artificiale.
      </p>
    </div>
  );
}
