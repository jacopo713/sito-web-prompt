import Link from 'next/link';
import { FiLayers, FiType, FiTarget, FiPaperclip, FiEdit, FiCode, FiClipboard, FiArrowLeft, FiArrowRight, FiAlertCircle, FiStar } from 'react-icons/fi';
import { FaBrain, FaProjectDiagram } from 'react-icons/fa';
import React from 'react'; // Aggiunto per chiarezza, anche se spesso implicito

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

// Page component
export default function Lezione2M1Page() {
  const lessonTitle = "Struttura del Prompt Efficace e Strategie Chiave";
  const moduleSlug = "modulo-1";
  const previousLessonSlug = `/corsi/base/${moduleSlug}/lezione-1`;
  const nextLessonSlug = `/corsi/base/${moduleSlug}/lezione-3`;

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Modulo 1 - Lezione 2</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
          {lessonTitle}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
                      prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-800 dark:hover:prose-a:text-indigo-300
                      prose-strong:font-semibold
                      prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:rounded">

        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          Nella lezione precedente abbiamo visto cos&apos;è un prompt e perché è cruciale. Ora, analizziamo la <strong>struttura</strong> di un prompt efficace per capirne i componenti fondamentali e, soprattutto, come adattare la <strong>strategia</strong> di interazione in base al nostro obiettivo.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="componenti-chiave">
          <FiLayers className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          I Componenti Chiave di un Prompt
        </h2>
        <p>
          Un prompt ben costruito solitamente include, implicitamente o esplicitamente, diversi elementi:
        </p>
        <ul className="list-none space-y-3 my-4">
           <li className="flex items-start"><FiTarget className="h-5 w-5 mr-3 mt-1 text-indigo-500 flex-shrink-0" /> <div><strong>Task/Obiettivo:</strong> L&apos;azione principale che l&apos;IA deve compiere. Deve essere chiaro e specifico (es. &quot;Scrivi&quot;, &quot;Analizza&quot;, &quot;Traduci&quot;, &quot;Riassumi&quot;, &quot;Genera codice&quot;).</div></li>
           <li className="flex items-start"><FiPaperclip className="h-5 w-5 mr-3 mt-1 text-indigo-500 flex-shrink-0" /> <div><strong>Contesto:</strong> Le informazioni di background necessarie (dati, definizioni, pubblico, scopo, situazione). Ne parleremo approfonditamente nella Lezione M2/L2.</div></li>
           <li className="flex items-start"><FaBrain className="h-5 w-5 mr-3 mt-1 text-indigo-500 flex-shrink-0" /> <div><strong>Ruolo/Persona:</strong> Definire come l&apos;IA deve comportarsi (es. &quot;Agisci come un esperto di...&quot;, &quot;Sei un assistente virtuale...&quot;). Guida tono e stile.</div></li>
           <li className="flex items-start"><FiType className="h-5 w-5 mr-3 mt-1 text-indigo-500 flex-shrink-0" /> <div><strong>Formato Output:</strong> Come desideriamo la risposta (es. JSON, lista, tabella, paragrafo, email).</div></li>
           <li className="flex items-start"><FiClipboard className="h-5 w-5 mr-3 mt-1 text-indigo-500 flex-shrink-0" /> <div><strong>Esempi (Few-Shot):</strong> Fornire esempi concreti di input/output desiderato è incredibilmente efficace per guidare l&apos;IA.</div></li>
           <li className="flex items-start"><FiAlertCircle className="h-5 w-5 mr-3 mt-1 text-indigo-500 flex-shrink-0" /> <div><strong>Vincoli/Regole:</strong> Limiti da rispettare (lunghezza, stile, elementi da escludere).</div></li>
        </ul>
        <p>
          Non tutti i prompt necessitano esplicitamente di *tutti* questi elementi, ma pensarci aiuta a costruire richieste più complete ed efficaci.
        </p>

         <h2 className="flex items-center scroll-mt-20" id="struttura-strategia">
          <FaProjectDiagram className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Struttura e Strategia: Adattarsi al Compito
        </h2>
        <p>
          Qui entra in gioco la tua osservazione chiave: <strong>come strutturiamo l&apos;interazione e forniamo le informazioni cambia drasticamente</strong> se stiamo costruendo qualcosa di tecnico/analitico o esplorando idee creative.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="border border-sky-200 dark:border-sky-800 rounded-lg p-4 bg-sky-50/50 dark:bg-sky-900/20">
             <h3 className="font-semibold text-sky-700 dark:text-sky-300 mb-2 flex items-center"><FiCode className="mr-2"/>Approccio Analitico/Tecnico (Fase per Fase)</h3>
             <p className="text-sm text-slate-600 dark:text-slate-300 mb-2"><strong>Obiettivo:</strong> Precisione, logica, risultati controllati, costruzione incrementale.</p>
             <strong className="text-sm text-slate-700 dark:text-slate-200">Quando usarlo:</strong>
             <ul className="list-disc list-outside text-sm space-y-1 pl-5 mt-1 mb-3 text-slate-500 dark:text-slate-400">
               <li>Sviluppo software (come costruire un sito web).</li>
               <li>Debugging di codice.</li>
               <li>Analisi dati strutturata.</li>
               <li>Pianificazione dettagliata di progetti.</li>
               <li>Risoluzione di problemi matematici/logici complessi.</li>
             </ul>
             <strong className="text-sm text-slate-700 dark:text-slate-200">Strategia:</strong>
             <ul className="list-disc list-outside text-sm space-y-1 pl-5 mt-1 text-slate-500 dark:text-slate-400">
               <li><strong>Scomporre</strong> il macro-obiettivo in sotto-task gestibili.</li>
               <li>Usare <strong>prompt distinti</strong> (o sezioni ben separate) per ogni sotto-task.</li>
               <li>Fornire solo il <strong>contesto specifico e necessario</strong> per quella fase.</li>
               <li>Chiedere output chiari e spesso strutturati (codice, JSON, lista).</li>
               <li>Iterare e correggere ogni fase prima di passare alla successiva.</li>
               <li>Utilizzare &quot;Ragiona passo dopo passo&quot; per processi complessi.</li>
             </ul>
             <InfoBox icon={FiLayers} title="Esempio: Costruire un Sito Web">
                 <ol className="list-decimal list-outside space-y-1 pl-4 text-xs">
                     <li><strong>Prompt 1 (Setup):</strong> <code className='text-xs'>&quot;Genera il comando \`npx create-next-app@latest\` con TypeScript, Tailwind, ESLint e App Router abilitati.&quot;</code></li>
                     <li><strong>Prompt 2 (Navbar):</strong> <code className='text-xs'>&quot;Crea un componente React \`Navbar.tsx\` funzionale con link a Home, Corsi, Login usando Tailwind.&quot;</code> (Fornire codice completo)</li>
                     <li><strong>Prompt 3 (Layout):</strong> <code className='text-xs'>&quot;Crea il file \`src/app/layout.tsx\` importando la Navbar e definendo la struttura HTML base.&quot;</code></li>
                     <li><strong>Prompt 4 (Homepage):</strong> <code className='text-xs'>&quot;Crea la struttura base per \`src/app/page.tsx\` con un titolo H1 e un paragrafo introduttivo.&quot;</code></li>
                     <li>... e così via, componente per componente, pagina per pagina.</li>
                 </ol>
             </InfoBox>
           </div>

            <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4 bg-purple-50/50 dark:bg-purple-900/20">
             <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center"><FiEdit className="mr-2"/>Approccio Creativo/Olistico (Bozza Iniziale)</h3>
             <p className="text-sm text-slate-600 dark:text-slate-300 mb-2"><strong>Obiettivo:</strong> Esplorazione, generazione di idee, originalità, visione d&apos;insieme.</p>
             <strong className="text-sm text-slate-700 dark:text-slate-200">Quando usarlo:</strong>
             <ul className="list-disc list-outside text-sm space-y-1 pl-5 mt-1 mb-3 text-slate-500 dark:text-slate-400">
               <li>Brainstorming e ideazione.</li>
               <li>Scrittura creativa (storie, articoli, poesie).</li>
               <li>Generazione di concept di design.</li>
               <li>Sintesi o spiegazioni esplorative.</li>
               <li>Creazione di diverse opzioni/variazioni.</li>
             </ul>
             <strong className="text-sm text-slate-700 dark:text-slate-200">Strategia:</strong>
             <ul className="list-disc list-outside text-sm space-y-1 pl-5 mt-1 text-slate-500 dark:text-slate-400">
               <li>Fornire un <strong>contesto ricco e ampio</strong> nel primo prompt (tema, stile, tono, personaggi, obiettivi generali, ispirazioni).</li>
               <li>Chiedere una <strong>bozza completa iniziale</strong> o un set ampio di opzioni.</li>
               <li>Includere <strong>esempi forniti dall&apos;utente</strong> (<FiStar className="inline h-3 w-3 mb-0.5"/> es. un paragrafo nel tuo stile, 2-3 slogan d&apos;esempio) per esprimere la tua visione creativa e guidare l&apos;IA.</li>
               <li>Usare prompt successivi per <strong>raffinare, modificare, espandere o focalizzarsi</strong> su dettagli specifici della bozza iniziale.</li>
               <li>Dare più libertà all&apos;IA, magari con vincoli meno rigidi all&apos;inizio.</li>
             </ul>
              <InfoBox icon={FiEdit} title="Esempio: Scrivere un Articolo">
                 <ol className="list-decimal list-outside space-y-1 pl-4 text-xs">
                     <li><strong>Prompt 1 (Bozza):</strong> <code className='text-xs'>&quot;Scrivi una bozza di articolo (circa 800 parole) sull&apos;impatto dell&apos;IA sulla creatività umana. Includi pro e contro, cita esempi recenti e adotta un tono equilibrato ma coinvolgente. **Ecco un esempio del tono che vorrei:** &apos;L&apos;intelligenza artificiale non è più fantascienza; è uno strumento potente che sta rimodellando il nostro modo di creare...&apos;&quot;</code></li>
                     <li><strong>Prompt 2 (Raffinamento):</strong> <code className='text-xs'>&quot;Nella bozza precedente, espandi la sezione sui &apos;contro&apos; con un esempio specifico di de-skilling. Rendi l&apos;introduzione più accattivante.&quot;</code></li>
                     <li><strong>Prompt 3 (Dettaglio):</strong> <code className='text-xs'>&quot;Controlla la fluidità del terzo paragrafo e suggerisci una frase conclusiva più potente.&quot;</code></li>
                     <li>... e così via, lavorando sulla bozza generale.</li>
                 </ol>
             </InfoBox>
           </div>
        </div>

        <InfoBox icon={FaBrain} title="Metacognizione: Scegliere la Strategia">
          <p>Prima di iniziare un&apos;interazione complessa, fermati un istante e chiediti:</p>
          <ul className="list-disc list-outside space-y-1 pl-5">
             <li>Qual è la natura del mio obiettivo finale? Richiede precisione incrementale o esplorazione olistica?</li>
             <li>Scomporre il compito in fasi mi aiuterebbe a mantenere il controllo e la qualità (Analitico)?</li>
             <li>Ottenere una visione d&apos;insieme iniziale mi darebbe una base migliore su cui lavorare (Creativo)?</li>
             <li>Posso combinare gli approcci? (Es. Brainstorming creativo iniziale -&gt; Pianificazione analitica successiva).</li>
          </ul>
          <p>Scegliere consapevolmente la strategia giusta è un&apos;abilità chiave del prompt design efficace.</p>
        </InfoBox>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>Un prompt efficace ha componenti chiave: Task, Contesto, Ruolo, Formato, Esempi, Vincoli.</li>
              <li>La <strong>strategia di prompting</strong> va adattata al tipo di compito.</li>
              <li><strong>Approccio Analitico (Fase per Fase):</strong> Scomporre task complessi (es. codice, analisi) in sotto-obiettivi, affrontandoli con prompt specifici e contesto mirato.</li>
              <li><strong>Approccio Creativo (Olistico):</strong> Fornire contesto ricco inizialmente (inclusi <strong>esempi utente</strong>), chiedere una bozza completa, poi raffinare con prompt successivi (es. scrittura, brainstorming).</li>
              <li>La <strong>metacognizione</strong> aiuta a scegliere l&apos;approccio migliore prima di iniziare.</li>
           </ul>

           <div className="flex justify-between items-center mt-8">
             <Link
                href={previousLessonSlug}
                className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
             >
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Lezione Precedente
             </Link>

             <Link
               href={nextLessonSlug}
               className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors"
             >
               Lezione Successiva <FiArrowRight className="ml-2 h-5 w-5" />
             </Link>
           </div>
        </div>

      </div>
    </article>
  );
}
