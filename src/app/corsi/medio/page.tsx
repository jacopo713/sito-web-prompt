import Link from 'next/link';
import { FiTarget, FiUsers, FiGrid, FiChevronRight, FiZap, FiLayers, FiAward, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';
import { coursesData } from '@/data/homepageData'; // Per i dati generali del corso
import { intermediateCourseStructure } from '@/data/courseStructure'; // Per la struttura dei moduli
// CourseModule rimosso perché il tipo Module viene da courseStructure.ts

// Trova i dati specifici per il corso intermedio
const courseInfo = coursesData.find(course => course.id === 'medio');

// Dati specifici per la pagina del corso intermedio (potrebbero essere espansi o provenire da un'altra fonte)
const intermediateCourseDetails = {
  title: courseInfo?.title || "Metacognizione Applicata e Prompting Avanzato",
  subtitle: courseInfo?.subtitle || "Flessibilità e strategia per risultati superiori. Include il Corso Base!",
  icon: courseInfo?.icon || FiLayers,
  description: courseInfo?.description || "Approfondisci le tue abilità: adatta il linguaggio, gestisci task complessi, affina il pensiero critico e usa la metacognizione per iterare efficacemente con l'IA. Questo corso include tutti i contenuti del Corso Base e li espande con tecniche e strategie di livello intermedio.",
  targetAudience: [
    "Chi ha completato il Corso Base o ha già familiarità con i fondamenti del prompting.",
    "Professionisti che vogliono integrare l'IA in task più complessi e analitici.",
    "Creativi che cercano di sbloccare nuove potenzialità con prompt multi-step e strategici.",
    "Sviluppatori e analisti che vogliono usare l'IA per problem solving e debugging avanzato.",
    "Chiunque desideri sviluppare una flessibilità cognitiva e strategica superiore nell'uso dell'IA."
  ],
  learningObjectives: [
    "Padroneggiare tutte le competenze del Corso Base.",
    "Progettare prompt per task creativi, analitici e misti di media complessità.",
    "Applicare la metacognizione per monitorare e regolare attivamente le proprie strategie di interazione con l'IA.",
    "Sviluppare un pensiero critico avanzato per identificare bias, coerenza logica e limiti dell'IA.",
    "Aumentare la flessibilità cognitiva, testando approcci alternativi e adattando il linguaggio all'IA.",
    "Utilizzare l'IA per il problem solving strategico di base, scomponendo problemi e facilitando il brainstorming.",
    "Affinarre le abilità logico-analitiche per interpretare risposte complesse e output multi-sfaccettati.",
    "Implementare tecniche di raffinamento iterativo mirate a obiettivi specifici e complessi."
  ],
  // i moduli verranno presi da intermediateCourseStructure
};

// Icone per i moduli specifici dell'intermedio (esempio)
const intermediateModuleIcons: { [key: string]: React.ElementType } = {
  "modulo-4-int": FiTrendingUp,
  "modulo-5-int": FaBrain,
  "modulo-6-int": FiAward,
};

export default function IntermediateCoursePage() {
  if (!courseInfo) {
    return <p>Dati del corso non trovati.</p>;
  }

  const firstModule = intermediateCourseStructure[0];
  const firstLesson = firstModule?.lessons[0];
  // Il link "Inizia ad Imparare Ora" deve puntare alla prima lezione del corso base,
  // dato che il corso intermedio lo include.
  const startLearningLink = firstModule && firstLesson ? `/corsi/base/${firstModule.moduleSlug}/${firstLesson.slug}` : '/corsi';


  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <header className="bg-purple-700 dark:bg-purple-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-12 sm:py-16 text-center">
          <intermediateCourseDetails.icon className="mx-auto h-16 w-16 sm:h-20 sm:w-20 mb-6 text-purple-300 dark:text-purple-400" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {intermediateCourseDetails.title}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-purple-200 dark:text-purple-300 max-w-3xl mx-auto">
            {intermediateCourseDetails.subtitle}
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
                  <FiBookOpen className="h-7 w-7 mr-3 text-purple-600 dark:text-purple-400" />
                  Descrizione del Corso
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {intermediateCourseDetails.description}
                </p>
              </div>
            </section>

            <section aria-labelledby="learning-objectives">
              <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8">
                <h2 id="learning-objectives" className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
                  <FiTarget className="h-7 w-7 mr-3 text-purple-600 dark:text-purple-400" />
                  Cosa Imparerai
                </h2>
                <ul className="space-y-3">
                  {intermediateCourseDetails.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <FiChevronRight className="h-5 w-5 mr-2 mt-1 text-purple-500 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="target-audience">
              <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8">
                <h2 id="target-audience" className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
                  <FiUsers className="h-7 w-7 mr-3 text-purple-600 dark:text-purple-400" />
                  A Chi è Rivolto Questo Corso
                </h2>
                <ul className="space-y-3">
                  {intermediateCourseDetails.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-start">
                      <FiChevronRight className="h-5 w-5 mr-2 mt-1 text-purple-500 flex-shrink-0" />
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
                <FiGrid className="h-7 w-7 mr-3 text-purple-600 dark:text-purple-400" />
                Struttura del Corso Intermedio
              </h2>
              {intermediateCourseStructure.length > 0 ? (
                <ul className="space-y-6">
                  {intermediateCourseStructure.map((module) => {
                    let ModuleIconToUse: React.ElementType = FiLayers; // Default icon
                    if (module.isBaseModule) {
                      if (module.moduleSlug === "modulo-1") ModuleIconToUse = FiZap;
                      else if (module.moduleSlug === "modulo-2") ModuleIconToUse = FiLayers;
                      else if (module.moduleSlug === "modulo-3") ModuleIconToUse = FiAward;
                    } else {
                       ModuleIconToUse = intermediateModuleIcons[module.moduleSlug as keyof typeof intermediateModuleIcons] || FiLayers;
                    }
                    // Il link alla pagina del modulo deve distinguere se è un modulo base o intermedio
                    // per usare il layout corretto.
                    const modulePagePath = module.isBaseModule ? `/corsi/base/${module.moduleSlug}` : `/corsi/medio/${module.moduleSlug}`;
                    
                    return (
                      <li key={module.moduleSlug} className="border-b border-slate-200 dark:border-slate-700 pb-6 last:pb-0 last:border-b-0">
                        <Link href={modulePagePath} className="group block">
                          <div className="flex items-center mb-2">
                            <ModuleIconToUse className={`h-6 w-6 mr-3 ${module.isBaseModule ? 'text-indigo-500 dark:text-indigo-400' : 'text-purple-500 dark:text-purple-400'} group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors`} />
                            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {module.moduleTitle} {module.isBaseModule && <span className="text-xs text-indigo-500 dark:text-indigo-400">(Base)</span>}
                            </h3>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 ml-9">
                            Contiene {module.lessons.length} lezioni.
                            {module.isBaseModule && " Copre i fondamenti essenziali."}
                            {!module.isBaseModule && " Approfondimenti e tecniche avanzate."}
                          </p>
                          <div className="ml-9 text-xs text-purple-600 dark:text-purple-400 font-semibold group-hover:underline">
                            {module.lessons.length} Lezioni &rarr;
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">I moduli del corso saranno disponibili a breve.</p>
              )}
              <div className="mt-10">
                <Link
                    href={startLearningLink}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-slate-900 transition-all"
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
