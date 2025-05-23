import Link from 'next/link';
import { FiBriefcase, FiDivideSquare, FiArrowLeft, FiArrowRight, FiMessageSquare, FiEdit } from 'react-icons/fi';
// FiRefreshCw, FiGitPullRequest, FiCpu, FiThumbsUp rimossi
import { FaBrain, FaProjectDiagram } from 'react-icons/fa';
import React from 'react';

// Reusable InfoBox component
const InfoBox = ({ icon: Icon, title, children }: { icon: React.ElementType, title?: string, children: React.ReactNode }) => (
  <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 dark:border-indigo-400 rounded-r-lg p-4 sm:p-6 my-6 shadow-md">
    <div className="flex items-start space-x-3">
      <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
      <div className="flex-grow">
        {title && <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-2">{title}</h3>}
        <div className="text-indigo-700 dark:text-indigo-300 text-sm sm:text-base space-y-2">
          {children}
        </div>
      </div>
    </div>
  </div>
);

// Strategy Component
const StrategyCard = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description: string, children?: React.ReactNode }) => (
  <div className="my-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <h3 className="flex items-center text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">
      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">{description}</p>
    {children && <div className="text-sm text-slate-500 dark:text-slate-400 space-y-2">{children}</div>}
  </div>
);


export default function Lezione2M4IPage() {
  const lessonTitle = "Gestire Task Complessi con l'IA";
  const moduleSlug = "modulo-4-int";
  const courseBasePath = "/corsi/medio";

  const previousLessonPath = `${courseBasePath}/${moduleSlug}/lezione-1-m4i`;
  const nextLessonPath = `${courseBasePath}/${moduleSlug}/lezione-3-m4i`;

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-1">
          Modulo 4 (Intermedio) - Lezione 2
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <FiBriefcase className="mr-3 text-purple-500 flex-shrink-0" /> {lessonTitle}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
                      prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                      prose-a:text-purple-600 dark:prose-a:text-purple-400 hover:prose-a:text-purple-800 dark:hover:prose-a:text-purple-300
                      prose-strong:font-semibold
                      prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:rounded">

        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          Affrontare task complessi con l&apos;IA, come la stesura di un report dettagliato, la pianificazione di un progetto o lo sviluppo di una nuova funzionalità software, richiede un approccio strategico. Un singolo prompt raramente è sufficiente. In questa lezione, esploreremo diverse strategie per gestire efficacemente la complessità.
        </p>

        <h2 id="strategie-principali">Strategie Chiave per Task Complessi</h2>

        <StrategyCard
          icon={FiDivideSquare}
          title="1. Decomposizione del Task (Task Decomposition)"
          description="Scomporre un obiettivo grande e complesso in sotto-obiettivi più piccoli, specifici e sequenziali. Questo è il fondamento della gestione di qualsiasi progetto complesso, umano o assistito da IA."
        >
          <p><strong>Come fare:</strong></p>
          <ul className="list-disc list-outside pl-5 space-y-1">
            <li>Identifica le fasi principali o i &quot;blocchi di lavoro&quot; del task generale.</li>
            <li>Per ogni blocco, definisci chiaramente: l&apos;input necessario, l&apos;output desiderato e il ruolo specifico dell&apos;IA in quella fase.</li>
            <li>Utilizza tecniche di <Link href="./lezione-1-m4i">Sequential Prompting</Link> per guidare l&apos;IA attraverso questi blocchi.</li>
          </ul>
          <p className="mt-2"><strong>Esempio:</strong> Pianificare una campagna di marketing di base.</p>
          <ol className="list-decimal list-outside pl-5 space-y-1 text-xs">
            <li><em>Prompt 1 (Analisi Target):</em> &quot;Descrivi 2-3 profili di buyer personas per un nuovo prodotto [tipo di prodotto] destinato a [mercato di riferimento].&quot;</li>
            <li><em>Prompt 2 (Canali):</em> &quot;Date le buyer personas definite, suggerisci 3 canali di marketing online efficaci per raggiungerle, con pro e contro per ciascuno.&quot;</li>
            <li><em>Prompt 3 (Messaggi Chiave):</em> &quot;Per il canale [Canale X scelto] e la [Persona Y], elabora 2-3 messaggi chiave che evidenzino [beneficio principale del prodotto].&quot;</li>
            <li><em>Prompt 4 (Bozza Contenuto):</em> &quot;Scrivi una bozza di post per social media (circa 50 parole) per il canale [Canale X] basato su [Messaggio Chiave Z].&quot;</li>
          </ol>
        </StrategyCard>

        <StrategyCard
          icon={FiMessageSquare}
          title="2. Gestione del Contesto a Lungo Termine"
          description="I modelli AI hanno una &apos;memoria&apos; limitata (finestra di contesto). Per task lunghi o conversazioni estese, l'IA potrebbe &apos;dimenticare&apos; dettagli o istruzioni iniziali."
        >
          <p><strong>Tecniche per mantenere il contesto:</strong></p>
          <ul className="list-disc list-outside pl-5 space-y-1">
            <li><strong>Riassunti Periodici:</strong> Chiedi all&apos;IA di riassumere i punti chiave discussi o lo stato attuale del progetto. Puoi anche fornire tu un breve riassunto all&apos;inizio di una nuova fase. (Es. <code>&quot;Ricapitolando, finora abbiamo stabilito X e Y. Ora procediamo con Z.&quot;</code>)</li>
            <li><strong>Riferimenti Espliciti:</strong> Richiama informazioni importanti: <code>&quot;Come discusso nel Prompt 2, le buyer personas sono...&quot;</code>, <code>&quot;Basandoci sulla decisione di usare il Canale X...&quot;</code>.</li>
            <li><strong>Documentazione Esterna:</strong> Per progetti molto grandi, tieni traccia delle decisioni chiave, degli output importanti o del contesto generale in un documento separato. Puoi copiare e incollare sezioni rilevanti nei tuoi prompt quando necessario.</li>
            <li><strong>Prompt di Re-focusing:</strong> Se l&apos;IA inizia a divagare, usa un prompt per riportarla sull&apos;obiettivo: <code>&quot;Ok, interessante, ma torniamo al nostro obiettivo principale che è...&quot;</code>.</li>
          </ul>
        </StrategyCard>

        <StrategyCard
          icon={FiEdit}
          title="3. Iterazione e Feedback Granulare"
          description="Non aspettarti la perfezione immediata, specialmente per output complessi. L'iterazione è la chiave."
        >
          <ul className="list-disc list-outside pl-5 space-y-1">
            <li><strong>Feedback Specifico:</strong> Invece di un generico &quot;non va bene&quot; o &quot;migliora&quot;, fornisci critiche costruttive e mirate su parti specifiche dell&apos;output. (Es. <code>&quot;Nel paragrafo X, l&apos;argomentazione Y non è supportata. Aggiungi un esempio o una statistica.&quot;</code>)</li>
            <li><strong>Richieste di Modifica Incrementali:</strong> Chiedi piccole modifiche alla volta. (Es. <code>&quot;Riscrivi questa frase per essere più concisa.&quot;</code> poi <code>&quot;Ora, espandi questo punto con più dettagli.&quot;</code>)</li>
            <li><strong>Auto-Critica Guidata:</strong> Chiedi all&apos;IA di valutare il suo stesso lavoro secondo criteri specifici. (Es. <code>&quot;Analizza il testo che hai appena generato. È abbastanza formale per un pubblico accademico? Ci sono termini che potrebbero essere fraintesi?&quot;</code>)</li>
          </ul>
        </StrategyCard>

        <StrategyCard
          icon={FaProjectDiagram}
          title="4. Combinare Approcci (Analitico e Creativo)"
          description="Molti task complessi beneficiano della flessibilità di alternare tra un prompting analitico (strutturato, logico) e uno creativo (esplorativo, generativo). Richiamo a M2/L1."
        >
          <p><strong>Esempio:</strong> Sviluppo di una nuova funzionalità per un&apos;app.</p>
          <ul className="list-disc list-outside pl-5 space-y-1">
            <li><em>Fase Creativa (Esplorazione):</em> <code>&quot;Brainstorming: quali potrebbero essere 5 modi innovativi per migliorare l&apos;engagement degli utenti nella nostra app [tipo di app]?&quot;</code></li>
            <li><em>Fase Analitica (Selezione e Decomposizione):</em> <code>&quot;Data l&apos;idea X (scelta dal brainstorming), scomponila nei principali requisiti tecnici e funzionali per l&apos;implementazione. Fornisci una stima preliminare dello sforzo per ogni requisito.&quot;</code></li>
            <li><em>Fase Analitica/Sequential (Sviluppo):</em> Procedere con prompt sequenziali per sviluppare ogni requisito.</li>
          </ul>
        </StrategyCard>

        <InfoBox icon={FaBrain} title="Metacognizione nella Gestione dei Task Complessi">
          <p>La gestione efficace di task complessi con l&apos;IA amplifica la necessità di una solida metacognizione:</p>
          <ul className="list-disc list-outside space-y-1 pl-5">
            <li><strong>Pianificazione Strategica Avanzata:</strong> Prevedi non solo i singoli step, ma anche come le diverse strategie (decomposizione, gestione contesto, iterazione) si integreranno.</li>
            <li><strong>Monitoraggio Continuo:</strong> Valuta costantemente: &quot;L&apos;IA ha ancora il contesto corretto? La scomposizione del task è ancora valida o devo raggruppare/dividere ulteriormente? Il mio feedback è abbastanza specifico?&quot;</li>
            <li><strong>Flessibilità Adattiva:</strong> Sii pronto a cambiare la tua macro-strategia (es. passare da una lunga catena di prompt a una serie di interazioni più brevi e focalizzate) se l&apos;approccio attuale non sta producendo i risultati desiderati.</li>
            <li><strong>Consapevolezza dei Limiti:</strong> Riconosci quando un task è troppo complesso per l&apos;attuale finestra di contesto dell&apos;IA o per le sue capacità, e considera come puoi &quot;alleggerire&quot; il carico cognitivo per il modello (o per te stesso).</li>
          </ul>
        </InfoBox>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>I task complessi richiedono strategie di prompting articolate, non un singolo input.</li>
              <li>La <strong>decomposizione del task</strong> in sotto-obiettivi più piccoli è fondamentale.</li>
              <li>La <strong>gestione attiva del contesto</strong> (riassunti, riferimenti, documentazione esterna) è cruciale per interazioni lunghe.</li>
              <li>L&apos;<strong>iterazione con feedback granulare</strong> e specifico migliora progressivamente la qualità dell&apos;output.</li>
              <li><strong>Combinare approcci</strong> analitici e creativi può essere molto efficace per task multi-sfaccettati.</li>
              <li>Una forte <strong>metacognizione</strong> guida la pianificazione, il monitoraggio e l&apos;adattamento delle strategie per task complessi.</li>
           </ul>

           <div className="flex justify-between items-center mt-8">
             <Link
                href={previousLessonPath}
                className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
             >
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Lezione Precedente
             </Link>
             <Link
               href={nextLessonPath}
               className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-slate-800 transition-colors"
             >
               Lezione Successiva <FiArrowRight className="ml-2 h-5 w-5" />
             </Link>
           </div>
        </div>

      </div> {/* End Prose */}
    </article>
  );
}
