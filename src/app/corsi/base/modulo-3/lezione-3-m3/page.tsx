import Link from 'next/link';
import {
  FiBarChart2, // Analisi, logica
  FiGitCommit, // Logica deduttiva (connessioni dirette)
  FiTrendingUp, // Logica induttiva (generalizzazioni)
  FiKey, // Logica abduttiva (trovare la chiave, la spiegazione)
  FiShuffle, // Logica controfattuale (e se...)
  FiUnlock, // Logica modale (possibilità, necessità)
  FiCheckSquare, // Logica deontica (permessi, obblighi) -> FiThumbsUp/Down in text
  FiClock, // Logica temporale
  FiRefreshCw, // Logica non-monotona (revisione)
  FiShare2, // Pensiero sistemico / Logica delle relazioni
  FiCopy, // Logica analogica
  FiCpu, // IA
  FiArrowLeft,
  FiAward // Conclusione modulo/corso
} from 'react-icons/fi'; // FiMessageSquare, FiAlertTriangle, FiArrowRight rimossi
import { FaBrain, FaProjectDiagram, FaBalanceScale } from 'react-icons/fa';
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

// Component for explaining different types of logic
const LogicTypeExplainer = ({ icon: Icon, title, description, exampleAI }: { icon: React.ElementType, title: string, description: string, exampleAI: string }) => (
  <div className="my-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <h3 className="flex items-center text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">
      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{description}</p>
    <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded">
      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Applicazione all&apos;IA:</p>
      <p className="text-xs text-slate-700 dark:text-slate-200">{exampleAI}</p>
    </div>
  </div>
);

export default function Lezione3M3Page() {
  const lessonTitle = "Analisi Logica e Comprensione degli Output: Oltre il Causale";
  const moduleSlug = "modulo-3";
  const previousLessonSlug = `/corsi/base/${moduleSlug}/lezione-2-m3`;
  const nextCoursePageSlug = `/corsi/base`;

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Modulo 3 - Lezione 3</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <FiBarChart2 className="mr-3 text-indigo-500 flex-shrink-0" />
          {lessonTitle}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
                      prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-800 dark:hover:prose-a:text-indigo-300
                      prose-strong:font-semibold
                      prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:rounded">

        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          Comprendere e valutare criticamente gli output dell&apos;IA richiede più di una semplice lettura superficiale. È necessario applicare un&apos;<strong>analisi logica robusta</strong>. In questa lezione, andremo oltre il comune ragionamento causale per esplorare un ventaglio più ampio di logiche che possono affinare la nostra capacità di interpretazione e di interazione con l&apos;IA.
        </p>

        <h2 id="logica-standard-richiamo" className="flex items-center">
          <FaBalanceScale className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Fondamenti: Logica Deduttiva, Induttiva e Abduttiva
        </h2>
        <p>Prima di esplorare logiche meno comuni, richiamiamo brevemente tre pilastri del ragionamento:</p>
        <LogicTypeExplainer
          icon={FiGitCommit}
          title="Logica Deduttiva"
          description="Parte da premesse generali per arrivare a conclusioni specifiche e certe (se le premesse sono vere). Esempio classico: il sillogismo."
          exampleAI="Valutare se l'IA ha seguito esattamente tutte le istruzioni e i vincoli forniti nel prompt. Se il prompt dice 'NON usare X' e l'output contiene X, c'è una falla deduttiva nell'aderenza dell'IA al task."
        />
        <LogicTypeExplainer
          icon={FiTrendingUp}
          title="Logica Induttiva"
          description="Muove da osservazioni specifiche per formulare conclusioni generali probabili, ma non certe. È alla base dell'apprendimento dai dati e dell'identificazione di pattern."
          exampleAI="Dopo diverse interazioni, noti che l'IA tende a dare risposte più concise se il prompt è formulato come domanda diretta. Questa è un'inferenza induttiva sul suo comportamento. Attenzione alle generalizzazioni affrettate."
        />
        <LogicTypeExplainer
          icon={FiKey}
          title="Logica Abduttiva"
          description="È l'inferenza alla spiegazione più plausibile. Data un'osservazione sorprendente, si cerca l'ipotesi che meglio la spiega. È cruciale per diagnosticare e comprendere."
          exampleAI="L'IA fornisce una risposta inaspettata o errata. L'abduzione ti porta a ipotizzare: 'Forse ha frainteso questa parola chiave nel prompt' o 'Forse sta attingendo a un set di dati obsoleto per questo argomento'."
        />

        <h2 id="oltre-causale" className="flex items-center">
          <FaProjectDiagram className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Espandere il Kit di Strumenti Logici: Oltre il Semplice Nesso Causa-Effetto
        </h2>
        <p>
          Limitarsi a cercare semplici cause ed effetti può essere riduttivo nell&apos;analisi degli output AI, che sono spesso il risultato di processi complessi e probabilistici. Esploriamo altre forme di logica:
        </p>
        <LogicTypeExplainer
          icon={FiShuffle}
          title="Logica Controfattuale"
          description="Ragionare su scenari ipotetici: 'Cosa sarebbe successo se...?'. Aiuta a esplorare alternative e a comprendere la sensibilità di un sistema a determinate variabili."
          exampleAI="Se l'IA ha generato un testo mediocre, chiediti: 'Se avessi fornito un esempio di stile diverso nel prompt, come sarebbe cambiato l'output?'. Sperimenta cambiando un elemento del prompt per osservare l'impatto (una forma di A/B testing)."
        />
        <LogicTypeExplainer
          icon={FiUnlock}
          title="Logica Modale"
          description="Si occupa dei concetti di possibilità, necessità, impossibilità. Esplora ciò che *potrebbe* essere vero o ciò che *deve* essere vero."
          exampleAI="Domandati: 'È *possibile* che l'IA abbia interpretato la mia richiesta in più modi? Qual era l'interpretazione più *probabile*? Era *necessario* che fornissi quel dettaglio specifico per ottenere il risultato desiderato, o era superfluo?'"
        />
        <LogicTypeExplainer
          icon={FiCheckSquare}
          title="Logica Deontica"
          description="Riguarda concetti di obbligo, permesso, divieto. È la logica delle norme e delle regole."
          exampleAI="Hai fornito all'IA dei vincoli (es. 'Non superare le 300 parole', 'Usa solo fonti accademiche', 'Evita linguaggio informale'). L'IA ha *rispettato* questi obblighi e divieti? Aveva il *permesso* implicito o esplicito di accedere a certi tipi di informazione?"
        />
        <LogicTypeExplainer
          icon={FiClock}
          title="Logica Temporale"
          description="Considera l'ordine e la durata degli eventi e delle informazioni. Il 'quando' e 'per quanto tempo' sono importanti."
          exampleAI="L'ordine in cui hai presentato le istruzioni nel prompt ha influenzato la struttura o il focus della risposta? Se hai fornito contesto in più fasi, l'IA ha 'ricordato' correttamente le informazioni precedenti nel momento giusto?"
        />
        <LogicTypeExplainer
          icon={FiRefreshCw}
          title="Logica Non-Monotona (o Descrittiva)"
          description="Permette di rivedere conclusioni precedenti alla luce di nuove informazioni. Il ragionamento umano è spesso non-monotono: cambiamo idea con nuovi dati."
          exampleAI="In una conversazione lunga, fornisci nuove informazioni o correzioni. L'IA è in grado di aggiornare il suo 'stato di comprensione' e modificare le risposte successive in modo coerente, o persiste con le inferenze basate sul contesto iniziale? Questo è cruciale per il raffinamento iterativo."
        />
        <LogicTypeExplainer
          icon={FiShare2}
          title="Pensiero Sistemico (Logica delle Relazioni)"
          description="Si concentra sulle interconnessioni e sulle influenze reciproche tra le parti di un sistema, piuttosto che su catene lineari di causa-effetto. Vede il 'tutto' e le sue dinamiche."
          exampleAI="Analizza l'output dell'IA non come una serie di frasi isolate, ma come un testo coeso (o meno). Le diverse sezioni si supportano a vicenda? C'è un flusso logico complessivo? Se hai chiesto un piano complesso, le varie fasi proposte sono interdipendenti e ben coordinate?"
        />
        <LogicTypeExplainer
          icon={FiCopy}
          title="Logica Analogica"
          description="Fare inferenze basate su somiglianze e analogie tra situazioni diverse. Molto potente per la creatività e il problem solving, ma anche fonte di errori se le analogie sono superficiali."
          exampleAI="L'IA spesso 'ragiona' per analogia, applicando pattern appresi da contesti simili. Chiediti: 'L'analogia che l'IA sta implicitamente usando è appropriata per questo caso specifico? O sta forzando una somiglianza che non regge?' Puoi anche usare analogie nei tuoi prompt per guidarla: 'Spiega X come se fosse Y'."
        />

        <h2 id="applicazioni-pratiche-ia" className="flex items-center">
            <FiCpu className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            Applicazioni Pratiche nell&apos;Interazione con l&apos;IA
        </h2>
        <p>Sviluppare la capacità di utilizzare queste diverse logiche ti permette di:</p>
        <ul className="list-disc list-outside space-y-2 pl-5 my-4">
            <li><strong>Analizzare Coerenza e Validità:</strong> Non solo se l&apos;output &quot;suona bene&quot;, ma se è logicamente solido e internamente coerente.</li>
            <li><strong>Identificare Assunzioni Implicite:</strong> Quali presupposti (tuoi o dell&apos;IA) sono alla base della risposta? La logica abduttiva è utile qui.</li>
            <li><strong>Riconoscere Fallacie Logiche:</strong> L&apos;IA, pur non &quot;ragionando&quot; come un umano, può generare testi che contengono fallacie (es. generalizzazioni indebite, false causalità). Riconoscerle è fondamentale (M1/L4).</li>
            <li><strong>Strutturare Prompt Multilogici:</strong> Puoi costruire prompt che guidano l&apos;IA a considerare possibilità (modale), a seguire regole (deontica), a esplorare alternative (controfattuale), ecc.</li>
            <li><strong>Affinarre la &quot;Teoria della Mente&quot; dell&apos;IA:</strong> Anche se è una simulazione, capire i pattern di &quot;ragionamento&quot; dell&apos;IA attraverso queste lenti logiche migliora la tua capacità di prevedere e influenzare i suoi output.</li>
        </ul>

        <InfoBox icon={FaBrain} title="La Logica Potenzia la Metacognizione">
          <p>Padroneggiare diverse forme di logica non è solo un esercizio accademico. È uno strumento potentissimo per la metacognizione (M1/L3, M3/L2). Ti rende più consapevole di *come* stai pensando quando analizzi un output AI, e di *come* potresti pensare in modo più efficace.</p>
          <p>Ti aiuta a porti domande migliori sulla qualità del tuo prompting e sulla qualità delle risposte, portando a un ciclo di miglioramento continuo molto più profondo.</p>
        </InfoBox>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>L&apos;analisi logica degli output AI va oltre la semplice logica causale.</li>
              <li>Le logiche <strong>deduttiva, induttiva e abduttiva</strong> sono fondamentali per la valutazione di base e la formulazione di ipotesi.</li>
              <li>Espandere il proprio repertorio logico con approcci <strong>controfattuale, modale, deontica, temporale, non-monotona, sistemica e analogica</strong> permette un&apos;analisi più ricca e sfaccettata.</li>
              <li>Ogni tipo di logica offre strumenti specifici per interrogare gli output AI, identificare assunzioni, riconoscere fallacie e strutturare prompt più efficaci.</li>
              <li>L&apos;uso consapevole di diverse logiche potenzia enormemente la metacognizione e l&apos;efficacia nell&apos;interazione con l&apos;IA.</li>
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
               href={nextCoursePageSlug}
               className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors"
             >
               Concludi Modulo e Torna al Corso <FiAward className="ml-2 h-5 w-5" />
             </Link>
           </div>
        </div>

      </div> {/* End Prose */}
    </article>
  );
}
