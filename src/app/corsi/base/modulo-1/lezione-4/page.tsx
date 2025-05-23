import Link from 'next/link';
import { FiAlertOctagon, FiCheckSquare, FiHelpCircle, FiSearch, FiThumbsDown, FiThumbsUp, FiBarChart2, FiArrowLeft, FiArrowRight, FiEye } from 'react-icons/fi';
import { FaBrain, FaBalanceScale } from 'react-icons/fa'; // Using FaBrain for crystallized intelligence
import React from 'react';

// Reusable InfoBox component (consistent with other lessons)
// Omettiamo il tipo di ritorno esplicito : JSX.Element
const InfoBox = ({ icon: Icon, title, children }: { icon: React.ElementType, title?: string, children: React.ReactNode }) => {
  return (
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
};

// Component for Critical Thinking Tip with explicit return
// Omettiamo il tipo di ritorno esplicito : JSX.Element
const CriticalTip = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => {
  return (
    <li className="flex items-start my-3">
      <Icon className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
      <div>
        <strong className="text-slate-800 dark:text-slate-200">{title}:</strong>
        <span className="text-slate-600 dark:text-slate-300 ml-1">{children}</span>
      </div>
    </li>
  );
};


export default function Lezione4M1Page() {
  const lessonTitle = "Pensiero Critico: Valutare le Risposte AI e Riconoscere le \"Allucinazioni\"";
  const moduleSlug = "modulo-1";
  const previousLessonSlug = `/corsi/base/${moduleSlug}/lezione-3`;
  const nextLessonSlug = `/corsi/base/modulo-2/lezione-1-m2`; // M1 is complete, next is M2/L1

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Modulo 1 - Lezione 4</p>
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
          Nelle lezioni precedenti abbiamo imparato a formulare prompt efficaci e a sviluppare una consapevolezza metacognitiva. Ora, affrontiamo un aspetto cruciale: come <strong>valutare criticamente le risposte</strong> generate dall&apos;Intelligenza Artificiale. Questo passaggio è fondamentale per garantire affidabilità e accuratezza.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="perche-valutare">
          <FaBalanceScale className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Perché Valutare Criticamene le Risposte AI?
        </h2>
        <p>
          Le IA generative sono strumenti potenti, ma non infallibili. Possono commettere errori, presentare informazioni distorte o incomplete. Affidarsi ciecamente alle loro risposte senza una revisione critica può portare a decisioni errate, diffondere disinformazione e, come hai giustamente osservato, atrofizzare le nostre capacità di analisi.
        </p>
        <InfoBox icon={FiAlertOctagon} title="Il Pericolo dell'Accettazione Passiva">
          <p>Accettare passivamente le risposte dell&apos;IA senza verifica può essere rischioso. È come usare una calcolatrice che a volte dà risultati sbagliati: prima o poi, l&apos;errore avrà delle conseguenze.</p>
          <p>La revisione critica ci permette di usare l&apos;IA come un <strong>assistente potente</strong>, mantenendo però il controllo e la responsabilità sull&apos;informazione finale.</p>
        </InfoBox>

        <h2 className="flex items-center scroll-mt-20" id="allucinazioni-ia">
          <FiThumbsDown className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Cosa Sono le &quot;Allucinazioni&quot; dell&apos;IA?
        </h2>
        <p>
          Il termine &quot;allucinazione&quot;, nel contesto dell&apos;IA, si riferisce a situazioni in cui il modello genera <strong>informazioni false, prive di senso, non pertinenti o non supportate dai dati di addestramento, presentandole con apparente convinzione</strong>. Queste non sono &quot;bug&quot; nel senso tradizionale, ma piuttosto un effetto collaterale di come i modelli linguistici generano testo basandosi su probabilità e pattern.
        </p>
        <strong>Esempi comuni di allucinazioni includono:</strong>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li>Citazioni di fonti inesistenti o articoli scientifici inventati.</li>
          <li>Dettagli biografici errati su persone reali.</li>
          <li>Date, eventi storici o statistiche palesemente sbagliati.</li>
          <li>Risposte sicure e dettagliate a domande su argomenti di cui l&apos;IA non può avere conoscenza (es. eventi futuri specifici).</li>
          <li>Affermazioni incoerenti o contraddittorie all&apos;interno della stessa risposta.</li>
        </ul>
        <InfoBox icon={FiSearch} title="Segnali d'Allarme Comuni (Pattern Recognition)">
            <p>Presta attenzione a questi segnali che potrebbero indicare un&apos;allucinazione o un&apos;informazione inaccurata:</p>
            <ul className="list-disc list-outside space-y-1 pl-5">
                <li><strong>Eccessiva sicurezza su argomenti oscuri:</strong> Se l&apos;IA fornisce dettagli estremamente specifici su un tema poco noto, verifica con cura.</li>
                <li><strong>Mancanza di fonti o fonti vaghe:</strong> Se l&apos;IA non cita fonti o le cita in modo generico (&quot;studi dimostrano...&quot;), sii scettico.</li>
                <li><strong>Cambiamenti improvvisi nello stile o nel tono:</strong> A volte, una risposta che inizia in modo coerente può degradare in passaggi meno logici o con uno stile diverso.</li>
                <li><strong>Informazioni &quot;troppo belle per essere vere&quot;:</strong> Se una statistica o un fatto sembra sorprendente o irrealistico, probabilmente lo è.</li>
                <li><strong>Incongruenze logiche:</strong> La risposta si contraddice o presenta argomentazioni fallaci?</li>
            </ul>
            <p>Il tuo <strong>&quot;pattern recognition&quot;</strong>, affinato dall&apos;esperienza e dalla conoscenza, è uno strumento chiave qui.</p>
        </InfoBox>

        <h2 className="flex items-center scroll-mt-20" id="strategie-valutazione">
          <FiCheckSquare className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Strategie Pratiche per la Valutazione Critica
        </h2>
        <p>
          Ecco alcune strategie concrete per valutare le risposte dell&apos;IA:
        </p>
        <ul className="list-none space-y-4 my-4">
          <CriticalTip icon={FiHelpCircle} title="1. Verifica dei Fatti (Fact-Checking)">
            Non dare per scontata nessuna affermazione, specialmente se cruciale. Confronta le informazioni con fonti affidabili e indipendenti (siti accademici, testate giornalistiche riconosciute, enciclopedie, documentazione ufficiale). Chiedi all&apos;IA stessa le sue fonti, ma poi verifica quelle fonti!
          </CriticalTip>
          <CriticalTip icon={FiBarChart2} title="2. Analisi della Coerenza e della Logica">
            La risposta è internamente coerente? Le argomentazioni sono ben strutturate e logicamente valide? Ci sono salti logici o contraddizioni? È coerente con altre conoscenze che possiedi sull&apos;argomento?
          </CriticalTip>
          <CriticalTip icon={FiThumbsUp} title="3. Valutazione della Rilevanza e Completezza">
            L&apos;IA ha risposto precisamente alla tua domanda o ha divagato? Ha tralasciato aspetti importanti? Ha fornito informazioni superflue?
          </CriticalTip>
          <CriticalTip icon={FiEye} title="4. Identificazione dei Bias">
            Il linguaggio usato è neutro? Vengono presentati diversi punti di vista, specialmente su temi dibattuti? La risposta potrebbe riflettere bias presenti nei dati di addestramento (culturali, di genere, ecc.)?
          </CriticalTip>
          <CriticalTip icon={FaBrain} title="5. Sfrutta la Tua Intelligenza Cristallizzata">
            Utilizza il tuo bagaglio di conoscenze ed esperienze. Se qualcosa &quot;non ti convince&quot; o ti sembra strano, approfondisci. Questo è il momento in cui la tua esperienza pregressa (l&apos;intelligenza cristallizzata) diventa uno strumento di validazione potentissimo. Come hai detto, questo &quot;mantiene il cervello allenato e migliora i nostri sistemi di verifica&quot;.
          </CriticalTip>
          <CriticalTip icon={FiSearch} title="6. Chiedi Chiarimenti e Alternative">
            Non esitare a &quot;sfidare&quot; l&apos;IA. Chiedi di riformulare, di fornire dettagli aggiuntivi, di spiegare il suo ragionamento o di presentare prospettive alternative. Esempi: <code>&quot;Puoi fornirmi le fonti specifiche per questa affermazione?&quot;</code>, <code>&quot;Come sei arrivato a questa conclusione?&quot;</code>, <code>&quot;Quali sono i principali argomenti contrari a questa tesi?&quot;</code>.
          </CriticalTip>
        </ul>

        <InfoBox icon={FaBrain} title="Allenare il Tuo 'Verificatore Interno'">
          <p>Ogni volta che interagisci con un&apos;IA e ne valuti le risposte, stai affinando il tuo &quot;verificatore interno&quot;. Questo processo non solo ti rende più abile nel prompting, ma potenzia anche le tue capacità di pensiero critico in generale.</p>
          <p>L&apos;obiettivo non è diventare un esperto di IA, ma un utente consapevole e critico della tecnologia, capace di sfruttarne i benefici minimizzandone i rischi.</p>
        </InfoBox>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>La <strong>valutazione critica</strong> delle risposte AI è essenziale per l&apos;accuratezza e per evitare la disinformazione.</li>
              <li>Le <strong>&quot;allucinazioni&quot;</strong> dell&apos;IA sono output falsi o privi di senso presentati come veritieri; riconoscere i segnali d&apos;allarme è fondamentale.</li>
              <li>Strategie di valutazione includono: <strong>verifica dei fatti, analisi della coerenza, valutazione della rilevanza, identificazione dei bias</strong>, e la richiesta di <strong>chiarimenti</strong>.</li>
              <li>L&apos;<strong>intelligenza cristallizzata</strong> e il <strong>&quot;pattern recognition&quot;</strong> giocano un ruolo chiave nel processo di revisione critica.</li>
              <li>La revisione attiva mantiene allenate le nostre capacità cognitive e ci rende utenti più consapevoli.</li>
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
               Prossimo Modulo <FiArrowRight className="ml-2 h-5 w-5" />
             </Link>
           </div>
        </div>

      </div> {/* End Prose */}
    </article>
  );
}
