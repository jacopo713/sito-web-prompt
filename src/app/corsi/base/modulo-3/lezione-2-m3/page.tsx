import Link from 'next/link';
import {
  FiSearch, // Curiosità, esplorazione
  FiSunrise, // Epistemica (conoscenza che sorge)
  FiDatabase, // Intelligenza Cristallizzata
  FiCpu, // Intelligenza Fluida, IA
  FiMessageSquare, // Dialogo con IA
  FiEye, // Riconoscimento pattern
  FiArrowLeft,
  FiArrowRight,
  FiAlertCircle, // Attenzione, riflessione
  FiStar // Suggerimento, best practice
} from 'react-icons/fi'; // FiHelpCircle, FiChevronsRight rimossi
import { FaBrain, FaQuestion, FaComments, FaPuzzlePiece } from 'react-icons/fa';
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

// Component for a key concept or a practical tip
const ConceptHighlight = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <li className="flex items-start my-4 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
    <Icon className="h-7 w-7 mr-4 mt-1 text-sky-500 flex-shrink-0" />
    <div>
      <h4 className="text-md font-semibold text-slate-800 dark:text-slate-200 mb-1">{title}</h4>
      <div className="text-slate-600 dark:text-slate-300 text-sm space-y-1">
        {children}
      </div>
    </div>
  </li>
);

export default function Lezione2M3Page() {
  const lessonTitle = "Curiosità Epistemica e Domande Esplorative";
  const moduleSlug = "modulo-3";
  // lessonSlug rimosso perché non utilizzato
  const previousLessonSlug = `/corsi/base/${moduleSlug}/lezione-1-m3`;
  const nextLessonSlug = `/corsi/base/${moduleSlug}/lezione-3-m3`;

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Modulo 3 - Lezione 2</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <FiSunrise className="mr-3 text-indigo-500 flex-shrink-0" />
          {lessonTitle}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
                      prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-800 dark:hover:prose-a:text-indigo-300
                      prose-strong:font-semibold
                      prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:rounded">

        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          La curiosità è il motore dell&apos;apprendimento. In questa lezione, esploreremo la <strong>curiosità epistemica</strong> – il desiderio di acquisire nuova conoscenza – e come le <strong>domande esplorative</strong> possano arricchire la nostra intelligenza, migliorare le nostre interazioni con l&apos;IA e affinare la nostra metacognizione.
        </p>

        <h2 id="curiosita-epistemica-cristallizzata" className="flex items-center">
          <FiDatabase className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Curiosità Epistemica e Intelligenza Cristallizzata
        </h2>
        <p>
          La <strong>curiosità epistemica</strong> è la spinta a cercare nuove informazioni per colmare lacune nella nostra comprensione. Non è una curiosità superficiale, ma un vero e proprio &quot;bisogno di sapere&quot; che ci spinge a investigare, studiare e apprendere.
        </p>
        <ul className="list-none space-y-3 my-4">
          <ConceptHighlight icon={FiSunrise} title="Come Funziona la Curiosità Epistemica">
            <p>Quando incontriamo qualcosa che non capiamo o che stimola il nostro interesse, la curiosità epistemica si attiva. Questo desiderio di conoscenza ci porta a:</p>
            <ul className="list-disc list-outside space-y-1 pl-5 mt-2">
              <li>Fare domande.</li>
              <li>Cercare attivamente informazioni (leggere, ricercare, chiedere a esperti).</li>
              <li>Riflettere e collegare nuove informazioni a quelle preesistenti.</li>
            </ul>
          </ConceptHighlight>
          <ConceptHighlight icon={FaBrain} title="Accumulo di Conoscenza e Intelligenza Cristallizzata">
            <p>Ogni volta che soddisfiamo la nostra curiosità epistemica, acquisiamo nuova conoscenza. Questa conoscenza, nel tempo, si consolida e va ad arricchire la nostra <strong>intelligenza cristallizzata</strong>.</p>
            <p>L&apos;intelligenza cristallizzata rappresenta l&apos;insieme delle conoscenze, delle abilità e delle esperienze che abbiamo accumulato nel corso della vita. È il nostro &quot;bagaglio culturale&quot; e la nostra saggezza pratica.</p>
            <p><strong>Più siamo curiosi, più apprendiamo, e più la nostra intelligenza cristallizzata si espande.</strong></p>
          </ConceptHighlight>
        </ul>

        <h3 id="skill-quotidiane-input-ia" className="flex items-center">
            <FiStar className="h-5 w-5 mr-3 text-indigo-500 flex-shrink-0"/>
            Dalla Conoscenza alle Skill Quotidiane e Input Migliori per l&apos;IA
        </h3>
        <p>
            Un&apos;intelligenza cristallizzata più ricca ha impatti diretti e positivi:
        </p>
        <ul className="list-disc list-outside space-y-2 pl-5 my-4">
            <li><strong>Miglioramento delle Skill Quotidiane:</strong> Una maggiore conoscenza ci rende più competenti in vari ambiti della vita, dal lavoro alle relazioni personali, alla risoluzione di problemi pratici. Comprendiamo meglio il mondo e sappiamo come agire in modo più efficace.</li>
            <li><strong>Input più Efficaci per l&apos;IA:</strong> Quando interagiamo con l&apos;Intelligenza Artificiale, la nostra intelligenza cristallizzata ci permette di:
                <ul className="list-['\2713'] list-outside space-y-1 pl-5 mt-1">
                    <li>Formulare prompt più precisi e contestualizzati.</li>
                    <li>Fornire all&apos;IA il background necessario per comprendere richieste complesse.</li>
                    <li>Valutare criticamente le risposte dell&apos;IA, confrontandole con il nostro sapere.</li>
                    <li>Identificare sfumature e implicazioni che un utente meno informato potrebbe non cogliere.</li>
                </ul>
            </li>
        </ul>
        <InfoBox icon={FaComments} title="Esempio Pratico: Prompting Arricchito dalla Conoscenza">
          <p>Immagina di dover chiedere all&apos;IA di generare un testo su un evento storico. Se hai una solida conoscenza di base di quell&apos;evento (grazie alla tua intelligenza cristallizzata), potrai:</p>
          <ul className="list-disc list-outside space-y-1 pl-5">
            <li>Specificare nel prompt aspetti particolari da approfondire o angolazioni specifiche da considerare.</li>
            <li>Fornire nomi, date e contesti chiave per guidare l&apos;IA.</li>
            <li>Riconoscere più facilmente eventuali imprecisioni o omissioni nella risposta dell&apos;IA.</li>
          </ul>
          <p>La tua curiosità passata che ha costruito la tua conoscenza attuale, ora ti permette di &quot;dialogare&quot; con l&apos;IA a un livello superiore.</p>
        </InfoBox>

        <h2 id="domande-esplorative-fluida" className="flex items-center">
          <FiCpu className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Domande Esplorative, Curiosità e Intelligenza Fluida
        </h2>
        <p>
          Le <strong>domande esplorative</strong> sono domande aperte, che non hanno una singola risposta giusta. Sono progettate per stimolare il pensiero, la ricerca e la scoperta. Esempi includono: &quot;E se...?&quot;, &quot;Come potremmo...?&quot;, &quot;Quali sono le implicazioni di...?&quot;, &quot;Esistono altri modi per...?&quot;.
        </p>
        <ul className="list-none space-y-3 my-4">
          <ConceptHighlight icon={FaQuestion} title="Arricchire e Stimolare la Curiosità">
            <p>Porre e porsi domande esplorative è un modo potente per nutrire la nostra curiosità. Invece di cercare una risposta definitiva, ci apriamo a nuove possibilità e prospettive. Questo processo è intrinsecamente gratificante e ci mantiene mentalmente attivi e ingaggiati.</p>
          </ConceptHighlight>
          <ConceptHighlight icon={FaPuzzlePiece} title="Attivare l'Intelligenza Fluida">
            <p>L&apos;<strong>intelligenza fluida</strong> è la capacità di ragionare logicamente, risolvere problemi nuovi (per i quali non abbiamo soluzioni pre-apprese), pensare in modo flessibile e astratto, e identificare pattern. Le domande esplorative sono un eccellente allenamento per l&apos;intelligenza fluida perché richiedono di:</p>
            <ul className="list-disc list-outside space-y-1 pl-5 mt-2">
              <li>Analizzare situazioni da diverse angolazioni.</li>
              <li>Generare ipotesi e valutarle.</li>
              <li>Fare connessioni tra idee apparentemente distanti.</li>
              <li>Adattare il proprio pensiero di fronte a nuove informazioni.</li>
            </ul>
          </ConceptHighlight>
        </ul>

        <h2 id="domande-esplorative-ia-metacognizione" className="flex items-center">
          <FiMessageSquare className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Domande Esplorative, IA e Sviluppo Metacognitivo
        </h2>
        <p>
          Interagire con l&apos;IA usando domande esplorative può essere un potente strumento per lo sviluppo della nostra comprensione e della nostra metacognizione.
        </p>
        <ul className="list-none space-y-3 my-4">
          <ConceptHighlight icon={FiSearch} title="L'IA come Partner Esplorativo">
            <p>Possiamo usare l&apos;IA per esplorare scenari, generare idee alternative, o approfondire le implicazioni di un concetto. Chiedere all&apos;IA &quot;Quali potrebbero essere le conseguenze inaspettate di X?&quot; o &quot;Proponi tre modi completamente diversi per risolvere Y&quot; può svelare percorsi di pensiero che non avevamo considerato.</p>
          </ConceptHighlight>
          <ConceptHighlight icon={FiEye} title="Migliorare Metacognizione e Riconoscimento Pattern">
            <p>Osservare come l&apos;IA risponde a diversi stili di domande esplorative è un esercizio metacognitivo di grande valore:</p>
            <ul className="list-disc list-outside space-y-1 pl-5 mt-2">
              <li><strong>Variazione delle Risposte:</strong> Notare come cambiando una parola o la struttura della domanda, l&apos;IA può offrire prospettive radicalmente diverse. Questo ci rende più consapevoli dell&apos;impatto del nostro linguaggio.</li>
              <li><strong>Comprensione dei &quot;Modi di Esprimersi&quot; dell&apos;IA:</strong> Impariamo a riconoscere i pattern nelle risposte dell&apos;IA: tende a essere più analitica o creativa? Come gestisce l&apos;ambiguità? Quali tipi di &quot;ragionamento&quot; (simulato) sembra impiegare?</li>
              <li><strong>Identificazione di Pattern Algoritmici:</strong> Con l&apos;esperienza, possiamo iniziare a intuire come l&apos;algoritmo potrebbe funzionare, quali potrebbero essere i suoi bias impliciti (derivanti dai dati di addestramento) o le sue limitazioni. Questo non significa capire il codice, ma il comportamento osservabile.</li>
            </ul>
          </ConceptHighlight>
        </ul>

        <InfoBox icon={FiAlertCircle} title="Una Cauta Riflessione sulla Percezione delle Emozioni nell'IA">
          <p>Hai sollevato un punto interessante: <em>&quot;non possiamo ancora dire che l&apos;intelligenza artificiale provi emozioni anche se è possibile e non è da trascurare come cosa&quot;</em>. Attualmente, i modelli di IA come quelli che usiamo non provano emozioni nel senso umano. Sono sistemi che processano dati e generano output basati su pattern appresi.</p>
          <p>Tuttavia, possono essere addestrati a:</p>
          <ul className="list-disc list-outside space-y-1 pl-5">
            <li><strong>Riconoscere e classificare il linguaggio emotivo</strong> nei nostri input.</li>
            <li><strong>Generare testo che *simula* espressioni emotive</strong> in modo molto convincente (es. un tono empatico, gioioso, preoccupato).</li>
          </ul>
          <p>Quando interagiamo con un&apos;IA che risponde in modo &quot;empatico&quot;, la nostra metacognizione e il nostro riconoscimento di pattern ci aiutano a ricordare che si tratta di una simulazione sofisticata. Questo non ne diminuisce l&apos;utilità (una risposta empatica può essere più piacevole e costruttiva), ma ci mantiene ancorati alla realtà del funzionamento attuale dell&apos;IA. Continuare a osservare e riflettere su queste interazioni è cruciale man mano che le IA diventano sempre più avanzate nella simulazione di comportamenti complessi.</p>
        </InfoBox>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>La <strong>curiosità epistemica</strong> è il desiderio di sapere che alimenta l&apos;apprendimento e arricchisce l&apos;<strong>intelligenza cristallizzata</strong>.</li>
              <li>Una solida intelligenza cristallizzata migliora le skill quotidiane e permette di formulare <strong>input più efficaci per l&apos;IA</strong>.</li>
              <li>Le <strong>domande esplorative</strong> stimolano la curiosità, attivano l&apos;<strong>intelligenza fluida</strong> e aprono a nuove prospettive.</li>
              <li>Usare domande esplorative con l&apos;IA e variare lo stile delle richieste migliora la <strong>metacognizione</strong>, aiutandoci a capire come &quot;pensa&quot; l&apos;IA e come noi pensiamo.</li>
              <li>Questo processo affina il <strong>riconoscimento di pattern algoritmici</strong> e ci rende più consapevoli della natura delle risposte dell&apos;IA, inclusa la simulazione di espressioni emotive.</li>
              <li>Coltivare attivamente la curiosità e l&apos;arte di porre domande è fondamentale per una crescita continua e un&apos;interazione evoluta con l&apos;IA.</li>
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

      </div> {/* End Prose */}
    </article>
  );
}
