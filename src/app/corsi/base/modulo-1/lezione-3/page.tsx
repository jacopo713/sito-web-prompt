import Link from 'next/link';
import { FiSearch, FiRepeat, FiSliders, FiAlertTriangle, FiChevronsRight, FiEdit2, FiArrowLeft, FiArrowRight, FiSmile, FiFrown, FiMeh } from 'react-icons/fi'; // Rimossi FiCheckCircle non usato
import { FaBrain, FaQuestionCircle, FaLightbulb } from 'react-icons/fa';
import React from 'react'; // Aggiunto per chiarezza

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

// Simple component for highlighting cycle steps
const CycleStep = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <div className="flex items-start my-3">
    <Icon className="h-5 w-5 mr-3 mt-1 text-indigo-500 flex-shrink-0" />
    <div>
      <strong className="text-slate-800 dark:text-slate-200">{title}:</strong>
      <span className="text-slate-600 dark:text-slate-300 ml-1">{children}</span>
    </div>
  </div>
);

export default function Lezione3M1Page() {
  const lessonTitle = "Introduzione alla Metacognizione nel Prompting: Pensare sui Tuoi Prompt";
  const moduleSlug = "modulo-1";
  // const lessonSlug = "lezione-3"; // Rimosso perché non utilizzato
  const previousLessonSlug = `/corsi/base/${moduleSlug}/lezione-2`;
  const nextLessonSlug = `/corsi/base/${moduleSlug}/lezione-4`;

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Modulo 1 - Lezione 3</p>
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
          Abbiamo visto cos&apos;è un prompt e come è composto. Ora introduciamo un concetto potente che eleva la nostra abilità di prompting da semplice &quot;prova ed errore&quot; a un processo consapevole e strategico: la <strong>Metacognizione</strong>.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="cos-e-metacognizione">
          <FaBrain className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Cos&apos;è la Metacognizione (nel Prompting)?
        </h2>
        <p>
          Metacognizione significa letteralmente <strong>&quot;pensare sul proprio pensiero&quot;</strong>. Nel contesto del prompting, si traduce nella capacità di:
        </p>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li>Essere <strong>consapevoli</strong> di come formuliamo i nostri prompt (le parole scelte, la struttura, il contesto fornito, il tono usato).</li>
          <li><strong>Monitorare</strong> attivamente se la nostra strategia di prompting sta funzionando.</li>
          <li><strong>Valutare</strong> perché un prompt ha prodotto un certo risultato (buono o cattivo).</li>
          <li><strong>Regolare</strong> il nostro approccio di conseguenza per migliorare i risultati futuri.</li>
        </ul>
        <p>
           È passare da &quot;scrivo qualcosa e vedo cosa succede&quot; a &quot;scrivo questo *perché* penso che otterrà X, osservo il risultato e capisco *perché* ha funzionato o meno, poi modifico&quot;.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="ciclo-metacognitivo">
          <FiRepeat className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Il Ciclo Metacognitivo del Prompting
        </h2>
        <p>
          Possiamo visualizzare la metacognizione applicata al prompting come un ciclo continuo, simile al ciclo PDCA (Plan-Do-Check-Act) usato nel miglioramento continuo:
        </p>
        <div className="border border-indigo-200 dark:border-indigo-800 rounded-lg p-5 my-6 bg-indigo-50/30 dark:bg-indigo-900/20">
           <CycleStep icon={FaLightbulb} title="1. Pianifica (Plan)">
              Scegli consapevolmente parole, struttura, contesto, esempi, tono e strategia (analitica/creativa) in base al tuo obiettivo. <em>Domanda chiave: Qual è la mia intenzione dietro ogni scelta in questo prompt?</em>
           </CycleStep>
           <CycleStep icon={FiChevronsRight} title="2. Esegui (Do)">
              Invia il prompt all&apos;IA.
           </CycleStep>
            <CycleStep icon={FiSearch} title="3. Osserva/Verifica (Check)">
              Analizza criticamente la risposta dell&apos;IA. Soddisfa l&apos;obiettivo? È accurata, completa, nel formato giusto? Ci sono errori o fraintendimenti? <em>Domanda chiave: L&apos;output corrisponde alle mie aspettative iniziali?</em>
           </CycleStep>
            <CycleStep icon={FaQuestionCircle} title="4. Rifletti &amp; Adatta (Act)"> {/* & anstatt & */}
              Collega l&apos;output all&apos;input. Cosa nel prompt ha funzionato? Cosa no? Perché? Modifica il prompt (riformula, aggiungi/rimuovi contesto, cambia struttura o tono) per migliorare il prossimo tentativo. <em>Domande chiave: Perché ho ottenuto questo risultato? Come posso migliorare il prompt?</em>
           </CycleStep>
        </div>
        <p>
          Questo ciclo trasforma ogni interazione con l&apos;IA in un&apos;opportunità di apprendimento, non solo per ottenere una risposta migliore, ma per affinare la nostra capacità di comunicare efficacemente con questi strumenti.
        </p>

        <h2 className="flex items-center mt-12 mb-6 scroll-mt-20 text-slate-800 dark:text-slate-200" id="ogni-dettaglio-conta">
          <FiSliders className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Ogni Dettaglio Conta: La Sensibilità dell&apos;IA
        </h2>
        <p>
          Applicare la metacognizione diventa cruciale quando ci rendiamo conto di quanto i modelli linguistici siano <strong>sensibili alle sfumature</strong> del nostro input. Piccole variazioni nel prompt possono portare a grandi differenze nell&apos;output.
        </p>

        <div className="space-y-4 mt-4">
          <div>
            <strong className="text-slate-700 dark:text-slate-200">La Scelta delle Parole:</strong>
            <p className="text-slate-600 dark:text-slate-300">
               Usare &quot;riassumi&quot; vs &quot;estrai i punti chiave&quot; vs &quot;spiega brevemente&quot; può produrre output diversi. Sinonimi, aggettivi, avverbi specifici possono cambiare il tono e il focus della risposta. Essere consapevoli del peso di ogni parola è fondamentale.
            </p>
          </div>

          <div>
            <strong className="text-slate-700 dark:text-slate-200">L&apos;Ordine delle Informazioni:</strong>
            <InfoBox icon={FiAlertTriangle} title="L'Ordine Conta!">
                <p>Come hai notato, l&apos;ordine in cui presenti le informazioni o le istruzioni può influenzare il risultato. Ad esempio, chiedere: <code>&quot;Parla dell&apos;impatto dell&apos;IA sull&apos;arte e sulla musica&quot;</code> vs <code>&quot;Parla dell&apos;impatto dell&apos;IA sulla musica e sull&apos;arte&quot;</code>.</p>
                <p>Non è una regola matematica universale, ma spesso i modelli tendono a dare leggermente <strong>più peso o enfasi agli elementi menzionati per primi</strong> (un &quot;primacy effect&quot;).</p>
                <p><strong>Metacognizione in azione qui significa:</strong> essere consapevoli di questo potenziale effetto e decidere deliberatamente quale concetto mettere prima se si vuole dargli maggiore risalto, o usare una struttura (es. elenchi puntati) per dare uguale peso se necessario.</p>
            </InfoBox>
          </div>

          <div>
            <strong className="text-slate-700 dark:text-slate-200 flex items-center"><FiMeh className="mr-2 text-lg"/>Consapevolezza del Tono:</strong>
            <p className="text-slate-600 dark:text-slate-300">
               La metacognizione si estende anche al <strong>tono</strong> che utilizziamo nel prompt. Siamo troppo aggressivi (<FiFrown className="inline text-red-500"/>), eccessivamente passivi o accondiscendenti (<FiSmile className="inline text-yellow-500"/>), oppure chiari e neutrali/collaborativi (<FiMeh className="inline text-green-500"/>)?
            </p>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
               Mentre la &quot;gentilezza&quot; fine a se stessa (es. &quot;per favore&quot;) non garantisce tecnicamente risposte migliori dai modelli attuali, un tono <strong>eccessivamente negativo, esigente o, al contrario, troppo vago e sottomesso</strong> può essere controproducente. Potrebbe portare a rifiuti, risposte meno utili, o semplicemente non comunicare l&apos;istruzione con la chiarezza necessaria.
            </p>
             <p className="text-slate-600 dark:text-slate-300 mt-2">
               <strong>Metacognizione in azione qui significa:</strong> Riconoscere il tono che stiamo usando e scegliere consapevolmente un approccio che favorisca la chiarezza e la collaborazione. Un tono <strong>neutrale, chiaro e rispettosamente assertivo</strong> è spesso un ottimo punto di partenza. Evitare gli estremi aiuta a mantenere la comunicazione efficace.
            </p>
          </div>

          <div>
            <strong className="text-slate-700 dark:text-slate-200">La Struttura e Formattazione:</strong>
            <p className="text-slate-600 dark:text-slate-300">
               Come abbiamo visto nella lezione precedente, usare elenchi, paragrafi separati, markdown (```, ###) aiuta l&apos;IA a &quot;vedere&quot; la struttura logica della nostra richiesta e a processarla in modo più ordinato. Una mancanza di struttura può portare a confusione.
            </p>
          </div>
        </div>

        <p className="mt-4">
           Essere metacognitivi significa prestare attenzione attiva a tutti questi dettagli durante la fase di &quot;Pianifica&quot; e riflettere sul loro impatto durante la fase di &quot;Rifletti &amp; Adatta&quot;.
        </p>

         <h2 className="flex items-center scroll-mt-20" id="pratica-metacognizione">
          <FiEdit2 className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Mettere in Pratica la Metacognizione
        </h2>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
           <li><strong>Tieni traccia:</strong> Salva diverse versioni dei tuoi prompt e le relative risposte per confrontarle.</li>
           <li><strong>Sperimenta attivamente:</strong> Cambia una sola cosa alla volta (una parola, l&apos;ordine, una frase di contesto, il tono) e osserva come cambia l&apos;output.</li>
           <li><strong>Fatti domande:</strong> Prima di inviare: &quot;Sono stato abbastanza specifico? Ho dato il contesto giusto? Il tono è appropriato?&quot;. Dopo aver ricevuto la risposta: &quot;Cosa potrei cambiare per migliorare?&quot;.</li>
           <li><strong>Non accontentarti:</strong> Se la risposta non è perfetta, non limitarti a prenderla. Usa il ciclo metacognitivo per iterare e migliorarla!</li>
        </ul>


        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>La <strong>Metacognizione</strong> nel prompting è la consapevolezza e il controllo del proprio processo di formulazione e valutazione dei prompt.</li>
              <li>Seguire un <strong>Ciclo Metacognitivo</strong> (Pianifica -&gt; Esegui -&gt; Osserva/Verifica -&gt; Rifletti/Adatta) trasforma il prompting in un apprendimento attivo.</li>
              <li>I modelli AI sono <strong>sensibili ai dettagli</strong>: scelta delle parole, ordine delle informazioni, struttura e <strong>tono</strong> del prompt influenzano l&apos;output.</li>
              <li>L&apos;<strong>ordine delle parole/istruzioni</strong> può influenzare l&apos;enfasi data dall&apos;IA (effetto primacy).</li>
              <li>Essere consapevoli del <strong>tono</strong> (evitando estremi aggressivi o passivi) e puntare a chiarezza e rispetto favorisce una comunicazione efficace.</li>
              <li>Praticare attivamente la metacognizione porta a un miglioramento sistematico e a una maggiore efficacia nel prompting.</li>
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
