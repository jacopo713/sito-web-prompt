import Link from 'next/link';
import { FiList, FiZap, FiChevronRight, FiLock } from 'react-icons/fi';
import type { Module, Lesson } from '@/data/courseStructure';

interface LessonWithStatus extends Lesson {
  status: 'locked' | 'unlocked' | 'current' | 'completed';
}

interface ModuleWithLessonsStatus extends Omit<Module, 'lessons'> {
  icon: React.ElementType;
  description: string;
  lessons: LessonWithStatus[];
}

const moduleData: ModuleWithLessonsStatus = {
  moduleSlug: "modulo-1",
  moduleTitle: "Modulo 1: Le Basi del Prompt Design e Consapevolezza Metacognitiva", // CORRETTO: da title a moduleTitle
  description: "In questo modulo introduttivo, getteremo le fondamenta per comprendere come funzionano i prompt e come iniziare a riflettere sul nostro modo di interagire con l'IA.",
  icon: FiZap,
  lessons: [
      { slug: "lezione-1", title: "Cos'è un Prompt e Perché è Cruciale?", status: "current" },
      { slug: "lezione-2", title: "Anatomia di un Prompt Efficace", status: "unlocked" },
      { slug: "lezione-3", title: "Introduzione alla Metacognizione nel Prompting", status: "locked" },
      { slug: "lezione-4", title: "Pensiero Critico: Valutare le Risposte AI", status: "locked" },
  ]
};

export default function Modulo1Page() {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
         <div className="flex items-center mb-4">
           <moduleData.icon className="h-8 w-8 mr-3 text-indigo-600 dark:text-indigo-400" />
           <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
             {moduleData.moduleTitle} {/* Usa moduleData.moduleTitle */}
           </h1>
         </div>
         <p className="text-lg text-slate-600 dark:text-slate-400">{moduleData.description}</p>
      </header>

      <section>
         <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
           <FiList className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400" />
           Lezioni del Modulo
         </h2>
         <ul className="space-y-4">
            {moduleData.lessons.map((lesson, index) => (
              <li key={index} className={`p-4 rounded-lg transition-all ${lesson.status === 'locked' ? 'bg-slate-100 dark:bg-slate-700/50 opacity-70' : 'bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'}`}>
                {lesson.status === 'locked' ? (
                  <div className="flex items-center justify-between cursor-not-allowed">
                    <span className="font-medium text-slate-400 dark:text-slate-500">
                      {index + 1}. {lesson.title}
                    </span>
                    <FiLock className="h-5 w-5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                  </div>
                ) : (
                  <Link 
                    href={`/corsi/base/${moduleData.moduleSlug}/${lesson.slug}`}
                    className="flex items-center justify-between"
                  >
                    <span className={`font-medium ${lesson.status === 'current' ? 'text-indigo-700 dark:text-indigo-300' : 'text-indigo-800 dark:text-indigo-200'}`}>
                      {index + 1}. {lesson.title}
                    </span>
                    {lesson.status === 'current' ? 
                      <FiChevronRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 animate-pulse" /> :
                      <FiChevronRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    }
                  </Link>
                )}
              </li>
            ))}
         </ul>
      </section>
    </div>
  );
}
