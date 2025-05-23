import Link from 'next/link';
import { FiList, FiChevronRight, FiTrendingUp } from 'react-icons/fi';
import { intermediateCourseStructure } from '@/data/courseStructure';
// Module, Lesson rimossi perché non usati direttamente qui (tipi usati in courseStructure)

// Trova i dati specifici per questo modulo
const currentModuleSlug = "modulo-4-int";
const moduleData = intermediateCourseStructure.find(m => m.moduleSlug === currentModuleSlug);

// Descrizione specifica per questo modulo - assicurati che sia in linea con il programma
const moduleDescription = "Questo modulo si addentra nelle tecniche avanzate di prompt design. Imparerai a costruire sequenze di prompt (chaining), a gestire task complessi suddividendoli e a utilizzare il role prompting in modi sofisticati per ottenere risultati superiori dall'IA.";

const ModuleIcon = FiTrendingUp; // Icona specifica per questo modulo

export default function Modulo4IntermedioPage() {
  if (!moduleData) {
    return (
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
        <p className="text-red-500">Dati del modulo non trovati. Controlla lo slug del modulo ({currentModuleSlug}).</p>
        <Link href="/corsi/medio" className="text-purple-600 hover:underline mt-4 inline-block">
          &larr; Torna al Corso Intermedio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
         <div className="flex items-center mb-4">
           <ModuleIcon className="h-8 w-8 mr-3 text-purple-600 dark:text-purple-400" />
           <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
             {moduleData.moduleTitle}
           </h1>
         </div>
         <p className="text-lg text-slate-600 dark:text-slate-400">{moduleDescription}</p>
         {moduleData.isBaseModule && (
            <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">(Modulo del Corso Base)</p>
         )}
      </header>

      <section>
         <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
           <FiList className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400" />
           Lezioni del Modulo
         </h2>
         {moduleData.lessons && moduleData.lessons.length > 0 ? (
           <ul className="space-y-4">
              {moduleData.lessons.map((lesson, index) => (
                <li key={index} className="p-4 rounded-lg transition-all bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50">
                  <Link
                    // Il link alla lezione sarà gestito dal layout del corso intermedio
                    href={`/corsi/medio/${moduleData.moduleSlug}/${lesson.slug}`}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium text-purple-800 dark:text-purple-200">
                      {index + 1}. {lesson.title}
                      {lesson.duration && <span className="ml-2 text-xs text-purple-600 dark:text-purple-400">({lesson.duration})</span>}
                    </span>
                    <FiChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  </Link>
                </li>
              ))}
           </ul>
         ) : (
            <p className="text-slate-500 dark:text-slate-400">
              Nessuna lezione disponibile per questo modulo al momento.
            </p>
         )}
      </section>

      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
        <Link href="/corsi/medio" className="text-purple-600 dark:text-purple-400 hover:underline">
          &larr; Torna alla panoramica del Corso Intermedio
        </Link>
      </div>
    </div>
  );
}
