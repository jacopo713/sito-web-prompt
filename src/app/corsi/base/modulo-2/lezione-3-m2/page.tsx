import Link from 'next/link';
import { FiRepeat, FiMessageCircle, FiDatabase, FiZap, FiThumbsUp, FiSearch, FiArrowLeft, FiArrowRight, FiFileText, FiTerminal } from 'react-icons/fi';
import { FaProjectDiagram } from 'react-icons/fa'; // FaBrain rimosso

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

// Component PracticalTip rimosso perché non utilizzato

export default function Lezione3M2Page() {
  const lessonTitle = "Tecniche di Raffinamento Iterativo";
  const moduleSlug = "modulo-2";
  // lessonSlug rimosso perché non utilizzato
  const previousLessonSlug = `/corsi/base/${moduleSlug}/lezione-2-m2`;
  const nextLessonSlug = `/corsi/base/modulo-3/lezione-1-m3`;

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Modulo 2 - Lezione 3</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <FiRepeat className="mr-3 text-indigo-500 flex-shrink-0" /> {lessonTitle}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
                      prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-800 dark:hover:prose-a:text-indigo-300
                      prose-strong:font-semibold
                      prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:rounded">

        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          Abbiamo esplorato come fornire contesto (M2/L2) e adattare le strategie di prompting (M2/L1). Ora, ci concentriamo su un processo dinamico e fondamentale: il <strong>raffinamento iterativo</strong>. Ottenere l&apos;output desiderato dall&apos;IA è spesso un dialogo, una serie di aggiustamenti basati sull&apos;osservazione.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="raffinamento-definizione">
          <FiZap className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Cos&apos;è il Raffinamento Iterativo?
        </h2>
        <p>
          Il raffinamento iterativo è il processo di <strong>miglioramento progressivo dei tuoi prompt</strong> attraverso cicli di input, output e analisi. Invece di aspettarsi la perfezione al primo tentativo, si adotta un approccio per cui ogni interazione è un&apos;opportunità per affinare la richiesta e avvicinarsi al risultato ideale.
        </p>
        <p>
          Questo processo si basa sul ciclo metacognitivo (Pianifica -&gt; Esegui -&gt; Osserva/Verifica -&gt; Rifletti/Adatta) che abbiamo introdotto nel Modulo 1.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="raffinamento-in-chat">
          <FiMessageCircle className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Raffinamento &quot;Live&quot;: Modifiche Durante la Conversazione
        </h2>
        <p>
          Una delle forme più immediate di raffinamento avviene <strong>all&apos;interno di una singola sessione di chat</strong>. Osservando come l&apos;IA interpreta e risponde al tuo prompt, puoi apportare modifiche al volo.
        </p>
        <strong>Come funziona:</strong>
        <ul className="list-disc list-outside space-y-2 pl-5 my-4">
          <li><strong>Prompt Iniziale:</strong> Fornisci la tua prima richiesta.</li>
          <li><strong>Analisi dell&apos;Output:</strong> La risposta è quella attesa? È troppo generica? Manca di specificità? Ha frainteso un concetto chiave?</li>
          <li><strong>Modifica del Prompt:</strong>
            <ul className="list-['\2713'] list-outside space-y-1 pl-5 my-2">
              <li><strong>Aggiungere chiarezza:</strong> Se l&apos;IA sembra confusa, riformula la frase ambigua o aggiungi definizioni.</li>
              <li><strong>Fornire più contesto:</strong> Se la risposta è troppo generica, aggiungi dettagli sul tuo obiettivo, sul pubblico o sul formato desiderato.</li>
              <li><strong>Correggere la rotta:</strong> Se l&apos;IA sta andando nella direzione sbagliata, interrompila e reindirizzala con un&apos;istruzione più precisa (es. &quot;No, non intendevo X, concentrati piuttosto su Y&quot;).</li>
              <li><strong>Chiedere alternative:</strong> &quot;Puoi darmi un&apos;altra versione?&quot;, &quot;E se lo facessi in modo più formale?&quot;.</li>
              <li><strong>Specificare vincoli:</strong> &quot;Limita la risposta a 200 parole&quot;, &quot;Non includere riferimenti a Z&quot;.</li>
            </ul>
          </li>
          <li><strong>Ripetizione:</strong> Continua questo ciclo finché l&apos;output non è soddisfacente.</li>
        </ul>
        <InfoBox icon={FiSearch} title="Osservare il Comportamento del Contesto">
          <p>Durante una chat, presta attenzione a come l&apos;IA <strong>&quot;ricorda&quot; o &quot;dimentica&quot;</strong> il contesto delle interazioni precedenti. Se l&apos;IA inizia a perdere il filo, potrebbe essere necessario:</p>
          <ul className="list-disc list-outside space-y-1 pl-5">
            <li>Richiamare esplicitamente informazioni precedenti (es. &quot;Ricorda che stiamo parlando di X...&quot;).</li>
            <li>Fornire un breve riassunto dei punti chiave finora discussi.</li>
            <li>Scomporre un task molto lungo in sotto-task più piccoli, ognuno con un prompt più focalizzato.</li>
          </ul>
          <p>Questo &quot;sentire&quot; come si evolve il contesto della chat è una parte importante del raffinamento live.</p>
        </InfoBox>

        <h2 className="flex items-center scroll-mt-20" id="prompt-ben-scritto">
          <FiThumbsUp className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          L&apos;Importanza di un Buon Prompt Iniziale
        </h2>
        <p>
          Sebbene il raffinamento iterativo sia potente, ciò non diminuisce l&apos;importanza di iniziare con il miglior prompt possibile. Come hai giustamente osservato, <strong>un prompt ben scritto, con il contesto giusto e sufficienti informazioni, produce risultati significativamente migliori di un prompt formulato in modo incompleto o affrettato</strong>.
        </p>
        <p>
          Partire bene significa:
        </p>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li>Meno cicli di raffinamento necessari.</li>
          <li>Risparmio di tempo e token (se applicabile).</li>
          <li>Maggiore probabilità che l&apos;IA colga l&apos;intenzione principale fin da subito.</li>
        </ul>
        <p>
          Il raffinamento serve per perfezionare, non per compensare una mancanza totale di chiarezza iniziale.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="raffinamento-indiretto">
          <FiDatabase className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Il Raffinamento &quot;Indiretto&quot;: La Qualità del Contesto Esterno
        </h2>
        <p>
          C&apos;è un aspetto del raffinamento che opera in modo più &quot;indiretto&quot;, ma è altrettanto cruciale, specialmente quando l&apos;IA deve interagire con informazioni fornite da te, come documenti o codice sorgente. La tua osservazione è molto pertinente: <strong>se i documenti (o il codice, o qualsiasi dato di input strutturato) che fornisci all&apos;IA sono puliti, ben organizzati e ben catalogati, l&apos;intelligenza artificiale riesce a fornire output migliori.</strong>
        </p>
        <InfoBox icon={FaProjectDiagram} title="Curare il Proprio &quot;Ecosistema&quot; Informativo">
          <p>Questo significa che parte del &quot;raffinamento&quot; avviene <strong>prima ancora di scrivere il prompt</strong>, attraverso la cura del materiale di riferimento:</p>
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>
              <strong>Documenti Puliti (<FiFileText className="inline mr-1 mb-0.5"/>):</strong> Se chiedi all&apos;IA di analizzare o riassumere documenti, assicurati che siano ben formattati, privi di errori di battitura evidenti, con una struttura chiara (titoli, paragrafi). Un documento confuso genererà un&apos;analisi confusa.
            </li>
            <li>
              <strong>Codice Ben Organizzato (<FiTerminal className="inline mr-1 mb-0.5"/>):</strong> Se stai usando un&apos;IA per aiutarti con un progetto software, un codice sorgente con nomi di variabili e funzioni semantici, commenti chiari dove necessario, e una struttura di cartelle logica, permetterà all&apos;IA di comprendere meglio il contesto del tuo progetto e fornire suggerimenti o codice più pertinenti. L&apos;IA &quot;naviga&quot; i percorsi e i file che le fornisci.
            </li>
            <li>
              <strong>Dati Strutturati:</strong> Se fornisci dati tabellari o JSON, assicurati che siano consistenti e corretti.
            </li>
          </ul>
          <p>Questo &quot;soffermarsi sulle cose fatte in passato&quot; per mantenere un &quot;codice pulito e ben catalogato&quot; è una forma di preparazione che abilita l&apos;IA a performare al meglio, perché le permette di &quot;capire bene tutti i rami dei percorsi di file creati con il progetto&quot;.</p>
        </InfoBox>
        <p>
          Questo tipo di raffinamento indiretto è un investimento: il tempo speso a organizzare e pulire le tue informazioni si traduce in interazioni AI più efficienti e risultati di qualità superiore.
        </p>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>Il <strong>raffinamento iterativo</strong> è il processo di miglioramento progressivo dei prompt attraverso cicli di input, output e analisi.</li>
              <li>Il <strong>raffinamento &quot;live&quot;</strong> avviene durante una singola chat, modificando il prompt in base alle risposte dell&apos;IA e al comportamento del contesto conversazionale.</li>
              <li>Partire con un <strong>prompt iniziale ben scritto</strong> e contestualizzato riduce il numero di iterazioni necessarie.</li>
              <li>Il <strong>raffinamento &quot;indiretto&quot;</strong> riguarda la qualità del materiale fornito all&apos;IA (documenti, codice): informazioni pulite e ben organizzate portano a output migliori.</li>
              <li>Curare il proprio &quot;ecosistema informativo&quot; è un investimento che migliora l&apos;efficacia delle interazioni AI.</li>
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
