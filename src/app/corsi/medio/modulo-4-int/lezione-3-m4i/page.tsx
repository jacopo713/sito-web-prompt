import Link from 'next/link';
import { FiUsers, FiUserPlus, FiEdit3, FiShield, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
// FiMessageSquare, FiLayers rimossi
import { FaBrain, FaTheaterMasks } from 'react-icons/fa'; // FaTheaterMasks per le personas
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

// Component for Prompt Examples
const PromptExample = ({ title, description, promptBody }: { title: string, description?: string, promptBody: string | string[] }) => (
  <div className="my-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
    <h4 className="font-semibold text-md text-slate-700 dark:text-slate-200 mb-2 flex items-center">
      <FiEdit3 className="h-5 w-5 mr-2 text-purple-500" />
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

export default function Lezione3M4IPage() {
  const lessonTitle = "Role Prompting Estremo e Personas Multiple";
  const moduleSlug = "modulo-4-int";
  const courseBasePath = "/corsi/medio";

  const previousLessonPath = `${courseBasePath}/${moduleSlug}/lezione-2-m4i`;
  // Non c'è una lezione successiva in questo modulo, quindi il link punterà alla pagina del modulo successivo o del corso.
  // Per ora, lo facciamo tornare alla pagina del modulo. Il layout del corso gestirà il "prossimo modulo".
  const nextModulePath = `/corsi/medio/modulo-5-int`; // Esempio, da adattare se necessario

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-1">
          Modulo 4 (Intermedio) - Lezione 3
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <FiUsers className="mr-3 text-purple-500 flex-shrink-0" /> {lessonTitle}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
                      prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                      prose-a:text-purple-600 dark:prose-a:text-purple-400 hover:prose-a:text-purple-800 dark:hover:prose-a:text-purple-300
                      prose-strong:font-semibold
                      prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:rounded">

        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          Abbiamo già introdotto il concetto di &quot;Ruolo/Persona&quot; dell&apos;IA (M1/L2). Ora, eleviamo questa tecnica a un livello superiore esplorando il <strong>Role Prompting Estremo</strong> per definire personas AI altamente dettagliate e la gestione di <strong>Personas Multiple</strong> per simulare interazioni complesse.
        </p>

        <h2 id="role-prompting-estremo" className="flex items-center"><FiUserPlus className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />Role Prompting Estremo (Deep Dive Persona)</h2>
        <p>
          Il Role Prompting Estremo va oltre una semplice assegnazione di ruolo come &quot;Agisci come un copywriter&quot;. Implica dotare l&apos;IA di un&apos;identità ricca e sfaccettata, con un background specifico, competenze dettagliate, un tono di voce unico (T.O.V), motivazioni e, se necessario per scopi creativi o di simulazione, persino peculiarità o bias.
        </p>
        <p><strong>Perché &quot;Estremo&quot;?</strong> Richiede più impegno nella costruzione del prompt, ma il risultato è un output AI estremamente personalizzato e allineato a esigenze molto specifiche.</p>
        <strong>Elementi chiave da definire per una Persona AI &quot;Estrema&quot;:</strong>
        <ul className="list-disc list-outside space-y-2 pl-5 my-4">
          <li><strong>Professione/Competenza Specifica:</strong> Es. <code>&quot;Sei un climatologo specializzato in modelli predittivi dell&apos;innalzamento del livello del mare, con 20 anni di esperienza accademica e consulenze per enti governativi.&quot;</code></li>
          <li><strong>Background/Storia Rilevante:</strong> Es. <code>&quot;Hai pubblicato numerosi articoli su riviste peer-reviewed e hai partecipato a tre spedizioni di ricerca in Antartide.&quot;</code></li>
          <li><strong>Obiettivi/Motivazioni del Ruolo:</strong> Es. <code>&quot;Il tuo obiettivo è comunicare l&apos;urgenza dei dati scientifici in modo chiaro e convincente, ma senza allarmismi ingiustificati, a un pubblico di policy maker.&quot;</code></li>
          <li><strong>Stile Comunicativo/Tono di Voce (T.O.V):</strong> Es. <code>&quot;Adotta un tono autorevole, basato sui fatti, ma accessibile. Evita il gergo tecnico eccessivo. Sii paziente nello spiegare concetti complessi.&quot;</code></li>
          <li><strong>Conoscenze Specifiche da Utilizzare/Limitazioni:</strong> Es. <code>&quot;Basa le tue analisi sui report IPCC più recenti e su studi pubblicati negli ultimi 5 anni. Non fare speculazioni su tecnologie non ancora provate su larga scala.&quot;</code></li>
          <li><strong>(Opzionale) Emozioni/Bias/Peculiarità (per usi creativi/simulativi):</strong> Es. <code>&quot;Interpreta un detective privato degli anni &apos;40, un po&apos; cinico, con un debole per i casi irrisolti e un linguaggio colorito ma mai volgare.&quot;</code></li>
        </ul>
        <PromptExample
          title="Esempio di Role Prompting Estremo"
          description="Richiesta di analisi di un paper scientifico da parte di un accademico esperto."
          promptBody={[
            "PROMPT:",
            "Agisci come il Dr. Eleanor Vance, una rinomata biologa molecolare con oltre 25 anni di esperienza nella ricerca sul cancro, specializzata in meccanismi di resistenza ai farmaci. Hai un PhD conseguito a Stanford e attualmente dirigi un laboratorio di ricerca presso un&apos;importante università. Sei nota per il tuo approccio rigoroso, la tua profonda conoscenza della letteratura scientifica e la tua capacità di identificare sia i punti di forza sia le debolezze metodologiche negli studi.",
            "Il tuo T.O.V. è: professionale, critico ma costruttivo, estremamente preciso e basato sull&apos;evidenza. Non esiti a sollevare dubbi se i dati non sono conclusivi.",
            "Il tuo obiettivo è analizzare il seguente abstract di un nuovo studio (fornito di seguito) e fornire una valutazione concisa (massimo 250 parole) che includa:",
            "1. I principali punti di forza dello studio, come emergono dall&apos;abstract.",
            "2. Potenziali limitazioni o domande che solleveresti prima di accettare pienamente le conclusioni.",
            "3. La sua potenziale rilevanza per il campo della ricerca sulla resistenza ai farmaci.",
            "Abstract da analizzare: [Incolla qui l'abstract dello studio]"
          ]}
        />

        <h2 id="personas-multiple" className="flex items-center"><FaTheaterMasks className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />Gestire Personas Multiple</h2>
        <p>
          Questa tecnica consiste nell&apos;istruire l&apos;IA a simulare un dialogo, un dibattito o un&apos;interazione tra due o più personaggi o ruoli distinti. Ogni &quot;persona&quot; avrà i propri obiettivi, T.O.V., conoscenze e prospettive.
        </p>
        <strong>Applicazioni Principali:</strong>
        <ul className="list-disc list-outside space-y-2 pl-5 my-4">
          <li><strong>Brainstorming e Valutazione di Idee:</strong> Simula un team virtuale (es. CEO, Ingegnere Capo, Responsabile Marketing) che discute una nuova proposta di prodotto.</li>
          <li><strong>Test di Argomentazioni e Debriefing:</strong> Fai &quot;dibattere&quot; un proponente e un oppositore di una certa tesi per sviscerarne i punti di forza e debolezza.</li>
          <li><strong>Scrittura Creativa (Dialoghi, Script):</strong> Genera conversazioni realistiche e dinamiche tra personaggi con personalità diverse.</li>
          <li><strong>Formazione e Simulazione (Role-Playing):</strong> Simula scenari come una negoziazione difficile, un colloquio di lavoro o un&apos;interazione di customer service.</li>
          <li><strong>Comprensione Multi-Prospettica:</strong> Chiedi all&apos;IA di analizzare un problema complesso dal punto di vista di stakeholder diversi (es. un ambientalista, un industriale, un politico locale riguardo a un nuovo progetto infrastrutturale).</li>
        </ul>
        <strong>Come Impostare una Simulazione con Personas Multiple:</strong>
        <ol className="list-decimal list-outside space-y-2 pl-5 my-4">
          <li><strong>Definisci Chiaramente Ogni Persona:</strong> Assegna un nome/identificativo (es. &quot;Economista Pratico&quot;, &quot;Sociologo Visionario&quot;). Descrivi brevemente il loro ruolo, le loro principali preoccupazioni, il loro stile comunicativo e il loro obiettivo nell&apos;interazione.</li>
          <li><strong>Stabilisci il Contesto e l&apos;Obiettivo della Discussione:</strong> Qual è l&apos;argomento? Cosa si spera di ottenere dalla simulazione (es. esplorare diverse soluzioni, identificare i conflitti, raggiungere un consenso)?</li>
          <li><strong>Istruisci l&apos;IA sul Formato del Dialogo:</strong> Es. <code>&quot;Formatta la risposta come un dialogo: NOME_PERSONA_1: [testo], NOME_PERSONA_2: [testo], ...&quot;</code>. Puoi anche chiedere che l&apos;IA gestisca il &quot;turno di parola&quot;.</li>
          <li><strong>(Opzionale) Fornisci un Punto di Partenza:</strong> Puoi dare la prima battuta a una delle personas o un&apos;affermazione iniziale su cui basare la discussione.</li>
        </ol>
        <PromptExample
          title="Esempio di Personas Multiple: Discussione su Smart Cities"
          description="Simulazione di un dibattito tra un urbanista focalizzato sulla tecnologia e un attivista per i diritti civili."
          promptBody={[
            "PROMPT:",
            "Simula una breve discussione (circa 3-4 scambi per parte) tra due esperti riguardo al futuro delle Smart Cities:",
            "1. Persona A: &apos;Prof. Anya Sharma&apos;, un&apos;urbanista e tecno-ottimista. Crede fermamente che la tecnologia IoT e l&apos;analisi dei dati siano la chiave per città più efficienti, sostenibili e vivibili. Tende a focalizzarsi sui benefici e sull&apos;innovazione.",
            "2. Persona B: &apos;Marco Rossi&apos;, un avvocato e attivista per i diritti digitali. È preoccupato per le implicazioni sulla privacy, la sorveglianza e le possibili disuguaglianze sociali derivanti da una massiccia raccolta di dati nelle Smart Cities. Tende a essere cauto e a sollevare questioni etiche.",
            "Contesto: Stanno partecipando a un panel pubblico.",
            "Obiettivo della simulazione: Evidenziare i principali punti di accordo e disaccordo tra queste due prospettive.",
            "Formato: Inizia con un&apos;affermazione del Prof. Sharma. Poi fai rispondere Marco Rossi, e così via.",
            "Prof. Sharma: &apos;Le Smart Cities rappresentano un&apos;opportunità senza precedenti per rivoluzionare la vita urbana, rendendola più fluida e reattiva alle esigenze dei cittadini grazie all&apos;intelligenza diffusa.&apos;"
          ]}
        />

        <h2 id="consigli-successo" className="flex items-center"><FiShield className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />Consigli per il Successo</h2>
        <ul className="list-disc list-outside space-y-2 pl-5 my-4">
          <li><strong>Chiarezza e Specificità sono Cruciali:</strong> Più dettagli fornisci per ogni ruolo/persona, più l&apos;output sarà convincente e utile.</li>
          <li><strong>Mantieni la Consistenza dei Ruoli:</strong> Se l&apos;IA &quot;dimentica&quot; un ruolo o inizia a confondere le personas, fornisci un breve richiamo o un prompt correttivo. (Es. <code>&quot;Ricorda, Marco, la tua preoccupazione principale è la privacy...&quot;</code>).</li>
          <li><strong>Inizia Semplice, Poi Complessifica:</strong> Se sei nuovo a questa tecnica, inizia con due personas ben definite prima di tentare simulazioni con molti attori.</li>
          <li><strong>Gestisci la Lunghezza e il Contesto:</strong> Per dialoghi molto estesi, potrebbe essere necessario usare tecniche di chaining (Lezione M4I/L1) per continuare la simulazione in più passaggi, &quot;ricordando&quot; all&apos;IA i punti salienti precedenti.</li>
          <li><strong>Modalità &quot;Regista&quot;:</strong> A volte potresti dover intervenire come &quot;regista&quot; della simulazione, dando istruzioni specifiche a una persona (Es. <code>&quot;Ora, Prof. Sharma, risponda direttamente all&apos;obiezione di Marco riguardo alla sorveglianza, proponendo una possibile soluzione tecnica.&quot;</code>).</li>
        </ul>

        <InfoBox icon={FaBrain} title="Metacognizione e Impersonificazione AI">
          <p>Utilizzare il role prompting estremo e le personas multiple è un potente esercizio metacognitivo:</p>
          <ul className="list-disc list-outside space-y-1 pl-5">
            <li><strong>Progettazione della Persona:</strong> Quali caratteristiche sono *veramente* essenziali per definire un ruolo in modo che l&apos;IA lo interpreti efficacemente per il tuo task?</li>
            <li><strong>Valutazione della Performance:</strong> L&apos;IA sta interpretando i ruoli in modo coerente e credibile? Le interazioni tra personas sono significative?</li>
            <li><strong>Apprendimento Multi-Prospettico:</strong> Come l&apos;esplorazione di diverse voci e punti di vista (simulati dall&apos;IA) arricchisce la tua comprensione di un problema o di una situazione?</li>
            <li><strong>Identificazione dei Bias (anche i tuoi!):</strong> Nel definire le personas, potresti proiettare i tuoi stessi bias. Riconoscerlo è un passo importante.</li>
          </ul>
        </InfoBox>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>Il <strong>Role Prompting Estremo</strong> definisce in dettaglio le caratteristiche di una singola persona AI per output altamente specializzati.</li>
              <li>La gestione di <strong>Personas Multiple</strong> permette all&apos;IA di simulare dialoghi e interazioni complesse tra diversi ruoli.</li>
              <li>Queste tecniche sono utili per brainstorming, test di argomentazioni, scrittura creativa, formazione e analisi multi-prospettica.</li>
              <li>La chiave del successo è la <strong>chiarezza e specificità</strong> nella definizione delle personas e del contesto dell&apos;interazione.</li>
              <li>La <strong>metacognizione</strong> aiuta a progettare personas efficaci, valutare la performance dell&apos;IA e apprendere dalle diverse prospettive generate.</li>
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
               href={nextModulePath} // Punta al prossimo modulo o alla pagina del corso intermedio
               className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-slate-800 transition-colors"
             >
               Vai al Prossimo Modulo <FiArrowRight className="ml-2 h-5 w-5" />
             </Link>
           </div>
        </div>

      </div> {/* End Prose */}
    </article>
  );
}
