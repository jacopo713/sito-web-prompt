import Link from 'next/link';
import { FiPaperclip, FiShare2, FiTarget, FiUsers, FiFileText, FiType, FiArchive, FiArrowLeft, FiArrowRight, FiAlertTriangle, FiBox } from 'react-icons/fi';
import { FaBrain, FaProjectDiagram, FaComments } from 'react-icons/fa';

// Reusable InfoBox component (consistent with other lessons)
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

// Component for key context types
const ContextType = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <li className="flex items-start my-3 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-md border border-slate-200 dark:border-slate-700">
    <Icon className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
    <div>
      <strong className="text-slate-800 dark:text-slate-200">{title}:</strong>
      <p className="text-slate-600 dark:text-slate-300 text-sm">{description}</p>
    </div>
  </li>
);

export default function Lezione2M2Page() {
  const lessonTitle = "Fornire Contesto Efficace: Guida l'IA alla Comprensione";
  const moduleSlug = "modulo-2";
  // lessonSlug rimosso perché non utilizzato
  const previousLessonSlug = `/corsi/base/${moduleSlug}/lezione-1-m2`;
  const nextLessonSlug = `/corsi/base/${moduleSlug}/lezione-3-m2`; // Aggiornato per puntare alla lezione successiva effettiva

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Modulo 2 - Lezione 2</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <FiPaperclip className="mr-3 text-indigo-500 flex-shrink-0" /> {lessonTitle}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
                      prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-800 dark:hover:prose-a:text-indigo-300
                      prose-strong:font-semibold
                      prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:rounded">

        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          Abbiamo visto come adattare la strategia di prompting a seconda che il task sia analitico o creativo. Ora approfondiamo uno degli elementi più critici per il successo di *qualsiasi* prompt: il <strong>contesto</strong>. Fornire il contesto giusto è come dare una mappa dettagliata all&apos;IA.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="cosa-e-contesto">
          <FiArchive className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Cos&apos;è il Contesto e Perché è Fondamentale?
        </h2>
        <p>
          Nel prompting, il <strong>contesto</strong> è l&apos;insieme di informazioni di background, dettagli, vincoli e obiettivi che fornisci all&apos;IA per aiutarla a comprendere appieno la tua richiesta e generare una risposta pertinente e utile.
        </p>
        <p>
          Senza contesto, l&apos;IA opera &quot;al buio&quot;, basandosi solo su pattern generali appresi durante l&apos;addestramento. Questo può portare a:
        </p>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li>Risposte troppo generiche o superficiali.</li>
          <li>Fraintendimenti della tua intenzione.</li>
          <li>Output irrilevanti per il tuo caso specifico.</li>
          <li>&quot;Allucinazioni&quot;, come discusso nel Modulo 1, Lezione 4, se l&apos;IA cerca di colmare le lacune informative.</li>
        </ul>
        <InfoBox icon={FiTarget} title="L'Obiettivo del Contesto">
          <p>L&apos;obiettivo primario del contesto è <strong>ridurre l&apos;ambiguità</strong> e <strong>orientare l&apos;IA</strong> verso il tipo specifico di output che desideri.</p>
          <p>Come hai giustamente osservato, è importante <strong>richiamare i collegamenti strutturali</strong>. Ad esempio, quando si costruisce un sito web passo-passo, ogni prompt dovrebbe contestualizzare la richiesta all&apos;interno della struttura generale del sito (es., &quot;Stiamo creando la sezione X della pagina Y&quot;).</p>
        </InfoBox>

        <h2 className="flex items-center scroll-mt-20" id="tipi-di-contesto">
          <FiBox className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Principali Tipi di Contesto da Fornire
        </h2>
        <p>
          Ecco alcuni tipi di contesto chiave che puoi includere nei tuoi prompt:
        </p>
        <ul className="list-none space-y-3 my-4">
          <ContextType icon={FiTarget} title="1. Obiettivo Chiaro (Task Specifico)" description="Cosa vuoi che l'IA faccia esattamente? (es. 'Scrivi un riassunto', 'Genera codice Python per...', 'Analizza questi dati e identifica trend'). Questo era già un componente chiave nella struttura del prompt (M1/L2)." />
          <ContextType icon={FiPaperclip} title="2. Background e Informazioni Rilevanti" description="Quali informazioni di base sono necessarie per capire la richiesta? Dati specifici, definizioni, eventi passati, parti di conversazioni precedenti. (es. 'Dato il seguente testo estratto da [fonte]: ...', 'Considerando che il nostro prodotto è X...')." />
          <ContextType icon={FiUsers} title="3. Pubblico di Riferimento (Audience)" description="A chi è destinata la risposta? Questo influenza tono, linguaggio e livello di dettaglio. (es. 'Spiegalo a un bambino di 10 anni', 'Scrivi per un pubblico di esperti tecnici')." />
          <ContextType icon={FaBrain} title="4. Ruolo dell'IA (Persona)" description="Come vuoi che l'IA si comporti? (es. 'Agisci come un critico letterario', 'Sei un assistente di viaggio esperto'). Questo aiuta a definire lo stile e la prospettiva." />
          <ContextType icon={FiType} title="5. Formato dell'Output" description="Come vuoi che sia strutturata la risposta? (es. 'Rispondi con un elenco puntato', 'Fornisci l'output in formato JSON', 'Scrivi un'email formale')." />
          <ContextType icon={FiFileText} title="6. Esempi (Few-Shot Learning)" description="Mostrare all'IA esempi di input/output desiderati è uno dei modi più potenti per fornire contesto. (es. 'Input: Mela, Output: Frutto. Input: Cane, Output: Animale. Input: Tavolo, Output: ?')." />
          <ContextType icon={FaComments} title="7. Tono e Stile" description="Quale stile comunicativo deve adottare l'IA? (es. 'Usa un tono amichevole e informale', 'Sii professionale e conciso', 'Scrivi in modo umoristico'). È importante, come hai notato, mantenere coerenza con il tono usato precedentemente o specificare un cambio." />
          <ContextType icon={FiAlertTriangle} title="8. Vincoli e Negazioni" description="Cosa *non* deve fare o includere l'IA? (es. 'Non usare gergo tecnico', 'Evita di menzionare X', 'La risposta non deve superare le 200 parole')." />
        </ul>

        <h2 className="flex items-center scroll-mt-20" id="contesto-analitico-creativo">
          <FaProjectDiagram className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Contesto per Prompt Analitici vs. Creativi (Richiamo M2/L1)
        </h2>
        <p>
          Come discusso nella lezione precedente, la natura del contesto cambia:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="border border-sky-200 dark:border-sky-800 rounded-lg p-4 bg-sky-50/50 dark:bg-sky-900/20">
             <h3 className="font-semibold text-sky-700 dark:text-sky-300 mb-2">Contesto Analitico</h3>
             <p className="text-sm text-slate-600 dark:text-slate-300">
               <strong>Specifico e Mirato:</strong> Fornisci solo i dati, le definizioni e i vincoli strettamente necessari per quel particolare sotto-task.
               <br />
               <em>Esempio (Costruzione Sito):</em> <code>&quot;Data la struttura del componente Navbar definita in [Prompt Precedente/File X], crea ora una funzione che gestisca il dropdown menu per il link &apos;Corsi&apos;, assicurandoti che sia accessibile da tastiera.&quot;</code> (Il contesto qui è la struttura esistente e il requisito di accessibilità).
             </p>
           </div>
           <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4 bg-purple-50/50 dark:bg-purple-900/20">
             <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Contesto Creativo</h3>
             <p className="text-sm text-slate-600 dark:text-slate-300">
               <strong>Ricco e Olistico:</strong> Fornisci un quadro più ampio: ispirazioni, emozioni da evocare, valori del brand, esempi di stile, personaggi.
               <br />
               <em>Esempio (Brainstorming Slogan):</em> <code>&quot;Per il nostro nuovo brand di tè biologico &apos;Serenità Verde&apos;, che si rivolge a giovani professionisti stressati in cerca di un momento di calma e benessere, e che usa solo ingredienti naturali e packaging eco-sostenibile, genera 5 slogan che evochino pace, natura e un piccolo lusso quotidiano. Lo stile deve essere elegante ma non pretenzioso, simile a [Esempio di brand/slogan che ti piace].&quot;</code>
             </p>
           </div>
        </div>

        <h2 className="flex items-center scroll-mt-20" id="contesto-conversazionale">
          <FiShare2 className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Gestire il Contesto nelle Conversazioni Lunghe
        </h2>
        <p>
          Nelle interazioni multi-turno, l&apos;IA (specialmente i modelli più recenti) ha una &quot;memoria&quot; della conversazione precedente (la &quot;finestra di contesto&quot;). Tuttavia, questa memoria è limitata.
        </p>
        <strong>Strategie per mantenere il contesto efficace:</strong>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li><strong>Riassumere periodicamente:</strong> Se la conversazione è molto lunga, puoi chiedere all&apos;IA di riassumere i punti chiave discussi finora o farlo tu stesso.</li>
          <li><strong>Riferimenti espliciti:</strong> Invece di dire &quot;come dicevamo prima&quot;, puoi dire &quot;Riguardo al punto X discusso precedentemente (dove parlavamo di Y)...&quot;.</li>
          <li><strong>Focus sul task corrente:</strong> Assicurati che ogni nuovo prompt sia chiaramente focalizzato, anche se si basa su informazioni precedenti.</li>
          <li><strong>Scomposizione:</strong> Per task molto complessi, come la creazione di un intero sito web, è meglio scomporre il lavoro in più conversazioni o sessioni, ciascuna con un focus specifico, piuttosto che tentare di fare tutto in un&apos;unica, lunghissima chat dove il contesto iniziale potrebbe perdersi. In ogni nuova sessione, si può fornire un &quot;contesto di partenza&quot; che riassume lo stato attuale del progetto.</li>
        </ul>
        <InfoBox icon={FaBrain} title="Metacognizione e Contesto">
          <p>La tua capacità metacognitiva (M1/L3) è fondamentale qui. Chiediti costantemente:</p>
          <ul className="list-disc list-outside space-y-1 pl-5">
             <li>L&apos;IA ha tutte le informazioni che le servono per questa specifica richiesta?</li>
             <li>C&apos;è qualcosa che ho detto prima che potrebbe confonderla ora, se non lo chiarisco?</li>
             <li>Il contesto che sto fornendo è rilevante per *questo* specifico output che desidero?</li>
          </ul>
          <p>Se la risposta dell&apos;IA è deludente, la prima cosa da verificare è spesso la qualità e la quantità del contesto fornito.</p>
        </InfoBox>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>Il <strong>contesto</strong> è l&apos;insieme di informazioni che guida l&apos;IA verso una comprensione accurata e un output pertinente.</li>
              <li>Fornire un buon contesto riduce l&apos;ambiguità e previene risposte generiche o errate.</li>
              <li>I tipi di contesto includono: <strong>obiettivo, background, pubblico, ruolo, formato, esempi, tono, vincoli</strong>.</li>
              <li>Il contesto per prompt <strong>analitici</strong> è specifico e mirato; per prompt <strong>creativi</strong> è ricco e olistico.</li>
              <li>Nelle conversazioni lunghe, è cruciale gestire attivamente il contesto attraverso riassunti, riferimenti espliciti e scomposizione dei task.</li>
              <li>La <strong>metacognizione</strong> aiuta a valutare e migliorare costantemente il contesto fornito.</li>
              <li>Ricordarsi di <strong>mantenere coerenza nel tono e nei passaggi precedenti</strong> è un aspetto chiave del contesto conversazionale.</li>
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
               Prossima Lezione <FiArrowRight className="ml-2 h-5 w-5" />
             </Link>
           </div>
        </div>
      </div> {/* End Prose */}
    </article>
  );
}
