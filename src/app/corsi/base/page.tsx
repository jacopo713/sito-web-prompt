import Link from 'next/link';
import { FiTarget, FiUsers, FiGrid, FiChevronRight, FiZap, FiLayers, FiAward, FiBookOpen } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';

// Dati del corso aggiornati
const courseData = {
  title: "Prompting Efficace e Metacognizione Iniziale",
  subtitle: "Le fondamenta per dialogare con l'IA e trasformare le tue idee in risultati concreti.",
  icon: FaBrain,
  description: "Questo corso è il tuo punto di partenza per padroneggiare l'arte del prompt design e sviluppare una consapevolezza metacognitiva cruciale. Imparerai non solo a formulare prompt chiari ed efficaci, ma anche a capire 'come pensare' quando interagisci con qualsiasi modello di Intelligenza Artificiale, ottimizzando il tuo lavoro e la tua creatività. Copre tutti gli aspetti fondamentali, dalle basi del prompt design alle tecniche di raffinamento, gestione dell'attenzione e sviluppo della curiosità epistemica.",
  targetAudience: [
    "Principianti assoluti che vogliono capire come usare al meglio le IA.",
    "Studenti e professionisti che desiderano integrare l'IA nel loro flusso di lavoro.",
    "Creativi, marketer, sviluppatori che cercano di ottenere output di qualità superiore dalle IA.",
    "Chiunque sia curioso di sbloccare il potenziale del dialogo uomo-macchina."
  ],
  learningObjectives: [
    "Comprendere i principi fondamentali del prompt design: struttura, chiarezza, contesto.",
    "Introdurre e applicare concetti base di metacognizione per osservare e valutare i propri prompt.",
    "Sviluppare un pensiero critico di base per riconoscere errori e output inadeguati dall'IA.",
    "Apprendere tecniche di raffinamento per migliorare i prompt passo-passo.",
    "Imparare a gestire l'attenzione per un uso dell'IA focalizzato e senza distrazioni.",
    "Stimolare la curiosità epistemica per formulare le domande giuste all'IA.",
    "Applicare abilità logico-analitiche iniziali per capire perché un prompt funziona (o non funziona)."
  ],
  modules: [
    { 
      id: "modulo-1", 
      title: "Modulo 1: Le Basi del Prompt Design e Consapevolezza Metacognitiva", 
      description: "Introduzione ai concetti chiave: cos'è un prompt, la sua struttura, il ruolo della metacognizione e il pensiero critico nella valutazione delle risposte AI.",
      icon: FiZap,
      lessonsCount: 4 
    },
    { 
      id: "modulo-2", 
      title: "Modulo 2: Tecniche di Prompting e Raffinamento", 
      description: "Esplorazione di strategie di prompting analitiche e creative, come fornire contesto efficace e le tecniche per iterare e migliorare i tuoi prompt.",
      icon: FiLayers,
      lessonsCount: 3 
    },
    { 
      id: "modulo-3", 
      title: "Modulo 3: Mindset e Abilità Efficaci con l'IA", 
      description: "Sviluppo di abilità trasversali: gestione dell'attenzione, stimolo della curiosità epistemica e potenziamento delle capacità logico-analitiche per interazioni avanzate.",
      icon: FiAward, // O FaBrain per coerenza
      lessonsCount: 3
    },
  ]
};

export default function BaseCoursePage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <header className="bg-indigo-700 dark:bg-indigo-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-12 sm:py-16 text-center">
          <courseData.icon className="mx-auto h-16 w-16 sm:h-20 sm:w-20 mb-6 text-indigo-300 dark:text-indigo-400" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {courseData.title}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-indigo-200 dark:text-indigo-300 max-w-3xl mx-auto">
            {courseData.subtitle}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Colonna Sinistra: Descrizione, Obiettivi, Target */}
          <div className="lg:col-span-2 space-y-10">
            <section aria-labelledby="course-description">
              <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8">
                <h2 id="course-description" className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
                  <FiBookOpen className="h-7 w-7 mr-3 text-indigo-600 dark:text-indigo-400" />
                  Descrizione del Corso
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {courseData.description}
                </p>
              </div>
            </section>

            <section aria-labelledby="learning-objectives">
              <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8">
                <h2 id="learning-objectives" className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
                  <FiTarget className="h-7 w-7 mr-3 text-indigo-600 dark:text-indigo-400" />
                  Cosa Imparerai
                </h2>
                <ul className="space-y-3">
                  {courseData.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <FiChevronRight className="h-5 w-5 mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="target-audience">
              <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8">
                <h2 id="target-audience" className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
                  <FiUsers className="h-7 w-7 mr-3 text-indigo-600 dark:text-indigo-400" />
                  A Chi è Rivolto Questo Corso
                </h2>
                <ul className="space-y-3">
                  {courseData.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-start">
                      <FiChevronRight className="h-5 w-5 mr-2 mt-1 text-indigo-500 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Colonna Destra: Moduli del Corso */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 sticky top-24">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-8 flex items-center">
                <FiGrid className="h-7 w-7 mr-3 text-indigo-600 dark:text-indigo-400" />
                Struttura del Corso
              </h2>
              {courseData.modules.length > 0 ? (
                <ul className="space-y-6">
                  {courseData.modules.map((module) => ( // Removed index here as module.id is unique key
                    <li key={module.id} className="border-b border-slate-200 dark:border-slate-700 pb-6 last:pb-0 last:border-b-0">
                      <Link href={`/corsi/base/${module.id}`} className="group block"> {/* Link to module page */}
                        <div className="flex items-center mb-2">
                          <module.icon className="h-6 w-6 mr-3 text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors" />
                          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {module.title}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 ml-9">{module.description}</p>
                        <div className="ml-9 text-xs text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline">
                          {/* Displaying lesson count and linking to the first lesson of the module as an example */}
                          {module.lessonsCount} Lezioni &rarr; 
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">I moduli del corso saranno disponibili a breve.</p>
              )}
               <div className="mt-10">
                <Link 
                    href={`/corsi/base/${courseData.modules[0]?.id}/${baseCourseStructure[0]?.lessons[0]?.slug || ''}`} // Link to first lesson of first module
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-all"
                >
                    Inizia ad Imparare Ora
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <footer className="text-center py-8 border-t border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          &copy; {new Date().getFullYear()} Fagyl Corsi. Tutti i diritti riservati.
        </p>
      </footer>
    </div>
  );
}

// Re-adding baseCourseStructure here to resolve the reference in the Inizia ad Imparare Ora link
// This is a workaround for this specific file structure. Ideally, this would come from a shared data source.
const baseCourseStructure: Module[] = [ // Make sure this interface is also defined or imported if not already
  {
    moduleSlug: "modulo-1",
    moduleTitle: "Modulo 1: Basi Prompt & Metacognizione",
    lessons: [
      { slug: "lezione-1", title: "Cos'è un Prompt e Perché è Cruciale?" },
      { slug: "lezione-2", title: "Struttura del Prompt Efficace" },
      { slug: "lezione-3", title: "Introduzione alla Metacognizione" },
      { slug: "lezione-4", title: "Pensiero Critico: Valutare le Risposte AI" },
    ]
  },
  {
    moduleSlug: "modulo-2",
    moduleTitle: "Modulo 2: Tecniche di Prompting e Raffinamento",
    lessons: [
      { slug: "lezione-1-m2", title: "Prompt Creativi vs. Analitici" },
      { slug: "lezione-2-m2", title: "Fornire Contesto Efficace" },
      { slug: "lezione-3-m2", title: "Tecniche di Raffinamento Iterativo" },
    ]
  },
  {
    moduleSlug: "modulo-3",
    moduleTitle: "Modulo 3: Mindset e Abilità Efficaci",
    lessons: [
      { slug: "lezione-1-m3", title: "Gestione dell'Attenzione e Focus con l'IA" },
      { slug: "lezione-2-m3", title: "Curiosità Epistemica e Domande Esplorative" },
      { slug: "lezione-3-m3", title: "Analisi Logica e Comprensione degli Output" },
    ]
  }
];
interface Lesson { slug: string; title: string; }
interface Module { moduleSlug: string; moduleTitle: string; lessons: Lesson[]; }
