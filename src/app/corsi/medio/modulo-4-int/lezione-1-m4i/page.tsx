import Link from 'next/link';
import { FiGitMerge, FiChevronsRight, FiLayers, FiSettings, FiArrowLeft, FiArrowRight, FiLayout } from 'react-icons/fi';
// FiZap, FiFileText rimossi perché non usati
import { FaBrain } from 'react-icons/fa';
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

const PromptExample = ({ title, description, promptBody }: { title: string, description?: string, promptBody: string | string[] }) => (
  <div className="my-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
    <h4 className="font-semibold text-md text-slate-700 dark:text-slate-200 mb-2 flex items-center">
      {title.toLowerCase().includes("chaining") ? <FiLayers className="h-5 w-5 mr-2 text-purple-500" /> : <FiLayout className="h-5 w-5 mr-2 text-purple-500" />}
      {title}
    </h4>
    {description && <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{description}</p>}
    <div className="bg-slate-100 dark:bg-slate-700 rounded p-3 text-sm">
      {Array.isArray(promptBody) ? (
        promptBody.map((line, index) => (
          <pre key={index} className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap break-words font-mono text-xs sm:text-sm">
            <code>{line}</code>
          </pre>
        ))
      ) : (
        <pre className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap break-words font-mono text-xs sm:text-sm">
          <code>{promptBody}</code>
        </pre>
      )}
    </div>
  </div>
);


export default function Lezione1M4IPage() {
  const lessonTitle = "Tecniche di Chaining e Sequential Prompting";
  const moduleSlug = "modulo-4-int";
  const courseBasePath = "/corsi/medio"; 

  const previousLessonPath = `${courseBasePath}/${moduleSlug}`; 
  const nextLessonPath = `${courseBasePath}/${moduleSlug}/lezione-2-m4i`;

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-1">
          Modulo 4 (Intermedio) - Lezione 1
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <FiGitMerge className="mr-3 text-purple-500 flex-shrink-0" /> {lessonTitle}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
                      prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                      prose-a:text-purple-600 dark:prose-a:text-purple-400 hover:prose-a:text-purple-800 dark:hover:prose-a:text-purple-300
                      prose-strong:font-semibold
                      prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:rounded">

        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          Benvenuto/a a questa lezione sulle tecniche di <strong>Chaining</strong> (concatenamento) e <strong>Sequential Prompting</strong>. Questi approcci avanzati ti permettono di scomporre task complessi in passaggi gestibili, guidando l&apos;IA verso risultati più accurati, controllati e di alta qualità.
        </p>

        <h2 id="chaining-prompt" className="flex items-center"><FiLayers className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />Chaining (Concatenamento di Prompt)</h2>
        <p>
          Il <strong>Chaining</strong> consiste nell&apos;utilizzare l&apos;output di un prompt come input (o parte del contesto) per il prompt successivo. È come costruire una catena, dove ogni anello si basa sul precedente.
        </p>
        <strong>Vantaggi del Chaining:</strong>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li><strong>Scomposizione di Problemi Complessi:</strong> Affronta un task grande un pezzo alla volta.</li>
          <li><strong>Mantenimento del Contesto Mirato:</strong> Ogni prompt si concentra su un aspetto specifico, utilizzando informazioni raffinate dal passaggio precedente.</li>
          <li><strong>Maggiore Controllo sull&apos;Output Finale:</strong> Puoi verificare e correggere ogni step.</li>
          <li><strong>Qualità Superiore:</strong> Spesso, guidare l&apos;IA passo-passo produce risultati migliori che chiedere tutto in un unico, enorme prompt.</li>
        </ul>

        <PromptExample
          title="Esempio Pratico di Chaining: Dall'Idea all'Introduzione di un Articolo"
          promptBody={[
            "Prompt 1 (Generazione Idee):\n\"Genera 5 idee originali per un articolo di blog sull'impatto dell'IA sulla produttività nel marketing. Fornisci un titolo breve e una descrizione di 2-3 frasi per ciascuna idea.\"",
            "\nOutput Atteso da Prompt 1:\n- Idea 1: Titolo A, Descrizione A\n- Idea 2: Titolo B, Descrizione B\n...",
            "\nPrompt 2 (Selezione e Sviluppo Outline - Supponiamo di scegliere Idea 2):\n\"Considerando l'idea 'Titolo B: Descrizione B', crea un'outline dettagliata per un articolo di blog di circa 800 parole. Includi sezioni principali, sotto-punti e possibili dati o esempi da citare.\"",
            "\nOutput Atteso da Prompt 2:\n- Introduzione\n- Sezione 1: Punto X\n  - Sottopunto X.1\n  - Sottopunto X.2\n- Sezione 2: Punto Y\n...",
            "\nPrompt 3 (Scrittura Introduzione):\n\"Utilizzando l'outline generata precedentemente (basata su 'Titolo B: Descrizione B'), scrivi un'introduzione accattivante e informativa per l'articolo (circa 100-150 parole). L'introduzione deve catturare l'attenzione del lettore e presentare brevemente i temi principali che verranno trattati.\""
          ]}
        />
        <p>
          In questo esempio, ogni prompt si basa sul risultato del precedente, guidando l&apos;IA verso la creazione di un&apos;introduzione pertinente e ben strutturata.
        </p>

        <h2 id="sequential-prompting" className="flex items-center"><FiChevronsRight className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />Sequential Prompting</h2>
        <p>
          Il <strong>Sequential Prompting</strong> è simile al chaining, ma si concentra maggiormente sulla guida dell&apos;IA attraverso una <strong>sequenza logica di azioni o fasi di un processo</strong>. Non sempre l&apos;output testuale del prompt precedente diventa l&apos;input diretto del successivo; piuttosto, si istruisce l&apos;IA a compiere il passo successivo di un workflow.
        </p>
        <p>
          Questo approccio è particolarmente utile per task di sviluppo, progettazione o pianificazione, dove si costruisce qualcosa incrementalmente.
        </p>
        <strong>Differenza Chiave dal Chaining Puro:</strong>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
            <li><strong>Chaining:</strong> Enfasi sul flusso di dati testuali (output-to-input).</li>
            <li><strong>Sequential:</strong> Enfasi sul flusso di lavoro e sulla progressione logica delle istruzioni. Spesso il contesto è mantenuto implicitamente dall&apos;IA (nella finestra di contesto della chat) o richiamato esplicitamente dall&apos;utente.</li>
        </ul>
        <PromptExample
          title="Esempio Pratico di Sequential Prompting: Costruzione Homepage Semplice (Next.js)"
          description="Guidiamo l'IA passo-passo nella creazione dei componenti e della pagina."
          promptBody={[
            "Prompt A (Struttura HTML Base Concettuale):\n\"Definisci la struttura HTML di base per una homepage semplice. Deve includere: 1. Un header con un titolo del sito. 2. Una sezione 'Hero' con un titolo principale e un sottotitolo. 3. Una sezione 'Chi Siamo' con un paragrafo. 4. Un footer con il copyright. Usa tag semantici HTML5.\"",
            "\nPrompt B (Componente Header React con Tailwind CSS):\n\"Ora, basandoti sulla struttura dell&apos;header definita prima, scrivi il codice JSX per un componente React funzionale chiamato &apos;Header&apos;. Questo componente deve visualizzare il titolo del sito &apos;Progetto Web Semplice&apos;. Utilizza Tailwind CSS per lo styling: l&apos;header deve avere uno sfondo &apos;bg-slate-200&apos;, padding &apos;p-4&apos;, e il titolo del sito deve essere centrato (&apos;text-center&apos;) e con font grassetto (&apos;font-bold&apos;).\"",
            "\nPrompt C (Componente HeroSection React con Tailwind CSS):\n\"Proseguiamo con la sezione &apos;Hero&apos;. Crea un componente React funzionale chiamato &apos;HeroSection&apos;. Deve mostrare un titolo principale &apos;Benvenuti nel Nostro Sito&apos; e un sottotitolo &apos;Esplora i nostri contenuti e servizi&apos;. Usa Tailwind CSS: la sezione deve avere un padding verticale ampio (&apos;py-16&apos;), testo centrato, il titolo principale deve essere grande (&apos;text-4xl font-bold&apos;) e il sottotitolo più piccolo (&apos;text-xl text-gray-600&apos;).\"",
            "\nPrompt D (Pagina Principale Next.js - page.tsx):\n\"Infine, crea il codice completo per il file &apos;src/app/page.tsx&apos; di una homepage Next.js (App Router). Importa e utilizza i componenti &apos;Header&apos; e &apos;HeroSection&apos; che abbiamo definito. Includi anche dei placeholder testuali per la sezione &apos;Chi Siamo&apos; (es. <p>Una breve descrizione sulla nostra mission...</p>) e per il footer (es. <p>&copy; 2024 Progetto Web Semplice. Tutti i diritti riservati.</p>) direttamente nel JSX della pagina.\""
          ]}
        />
        <p>
          Qui, ogni prompt guida l&apos;IA al passo successivo della creazione della pagina web, basandosi concettualmente sul lavoro fatto prima.
        </p>

        <h2 id="consigli-pratici" className="flex items-center"><FiSettings className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />Consigli Pratici per Chaining e Sequential Prompting</h2>
        <ul className="list-disc list-outside space-y-2 pl-5 my-4">
          <li><strong>Obiettivi Chiari per Ogni Step:</strong> Definisci cosa vuoi ottenere da ogni singolo prompt nella catena/sequenza.</li>
          <li><strong>Mantenimento del Contesto:</strong> Se la conversazione è lunga o l&apos;IA sembra &quot;dimenticare&quot;, richiama esplicitamente informazioni cruciali dai passaggi precedenti (es. &quot;Ricorda che stiamo lavorando sull&apos;idea Y...&quot;, &quot;Considerando la struttura dati definita prima...&quot;).</li>
          <li><strong>Identificatori e Variabili Implicite:</strong> Puoi fare riferimento a output precedenti usando frasi come &quot;il risultato precedente&quot;, &quot;l&apos;elenco generato&quot;, &quot;la funzione X&quot;. L&apos;IA spesso capisce questi riferimenti contestuali.</li>
          <li><strong>Verifica Intermedia:</strong> Controlla l&apos;output di ogni step. È più facile correggere un piccolo errore in un passaggio intermedio che un grosso problema alla fine di una lunga catena.</li>
          <li><strong>Iterazione su Singoli Step:</strong> Se un passaggio non è soddisfacente, concentrati sul raffinare quel singolo prompt prima di procedere.</li>
          <li><strong>Modularità:</strong> Pensa ai tuoi prompt come a funzioni o moduli. Un buon output da uno step facilita lo step successivo.</li>
        </ul>

        <InfoBox icon={FaBrain} title="Metacognizione nel Prompting Avanzato">
          <p>Applicare il chaining e il sequential prompting richiede un elevato livello di metacognizione (M1/L3):</p>
          <ul className="list-disc list-outside space-y-1 pl-5">
            <li><strong>Pianificazione Strategica:</strong> Devi visualizzare l&apos;intero processo e come i vari prompt si collegheranno per raggiungere l&apos;obiettivo finale.</li>
            <li><strong>Monitoraggio del Flusso:</strong> Sei consapevole di come l&apos;informazione e il contesto si evolvono attraverso la sequenza? L&apos;IA sta seguendo la logica che hai impostato?</li>
            <li><strong>Valutazione dell&apos;Efficacia:</strong> Ogni prompt nella catena è ottimale? C&apos;è un modo più efficiente per strutturare la sequenza?</li>
            <li><strong>Adattamento Flessibile:</strong> Se un output intermedio non è quello atteso, come modifichi i prompt successivi o quello corrente per correggere la rotta?</li>
          </ul>
          <p>Queste tecniche trasformano il prompting da una singola richiesta a una vera e propria programmazione conversazionale del comportamento dell&apos;IA.</p>
        </InfoBox>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>Il <strong>Chaining</strong> usa l&apos;output di un prompt come input per il successivo, creando una catena di trasformazione dei dati.</li>
              <li>Il <strong>Sequential Prompting</strong> guida l&apos;IA attraverso una serie logica di istruzioni per completare un processo, costruendo incrementalmente.</li>
              <li>Entrambe le tecniche aiutano a gestire la complessità, migliorare il controllo e aumentare la qualità dei risultati.</li>
              <li>È cruciale definire obiettivi chiari per ogni step, mantenere il contesto e verificare gli output intermedi.</li>
              <li>Applicare la <strong>metacognizione</strong> è fondamentale per pianificare, monitorare e adattare queste sequenze di prompt.</li>
           </ul>

           <div className="flex justify-between items-center mt-8">
             <Link
                href={previousLessonPath}
                className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
             >
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Torna al Modulo
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
