import Link from 'next/link';
import {
  FiAlertTriangle,
  FiCheckSquare,
  FiClock,
  FiArchive,
  FiShield,
  FiHeadphones,
  FiHeart,
  FiArrowLeft,
  FiArrowRight,
  FiCrosshair
} from 'react-icons/fi'; // FiZap rimosso
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

// Component for a practical tip
const PracticalTip = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <li className="flex items-start my-3 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-md border border-slate-200 dark:border-slate-700">
    <Icon className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
    <div>
      <strong className="text-slate-800 dark:text-slate-200">{title}:</strong>
      <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{children}</p>
    </div>
  </li>
);

export default function Lezione1M3Page() {
  const lessonTitle = "Gestione dell'Attenzione e Focus con l'IA";
  const moduleSlug = "modulo-3";
  // lessonSlug rimosso perché non utilizzato
  const previousLessonSlug = "/corsi/base/modulo-2/lezione-3-m2";
  const nextLessonSlug = `/corsi/base/${moduleSlug}/lezione-2-m3`;

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Modulo 3 - Lezione 1</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <FiCrosshair className="mr-3 text-indigo-500 flex-shrink-0" />
          {lessonTitle}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
                      prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-800 dark:hover:prose-a:text-indigo-300
                      prose-strong:font-semibold
                      prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:rounded">

        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          L&apos;intelligenza artificiale è uno strumento incredibilmente potente, un vero e proprio &quot;coltellino svizzero&quot; per la mente. Tuttavia, questa stessa versatilità può trasformarsi in una trappola per la nostra attenzione, conducendoci alla &quot;Sindrome dell&apos;Oggetto Luccicante AI&quot;. È fin troppo facile perdersi in esplorazioni infinite, deviare dall&apos;obiettivo principale e sentirsi sopraffatti. L&apos;obiettivo di questa lezione è fornirti strategie concrete per dirigere la tua attenzione e quella dell&apos;IA in modo consapevole, massimizzando produttività e qualità del lavoro.
        </p>

        <h2 id="perche-attenzione-cruciale">
          Perché la Gestione dell&apos;Attenzione è Fondamentale nell&apos;Era dell&apos;IA?
        </h2>
        <ul className="list-disc list-outside space-y-2 pl-5 my-4">
          <li><strong>Rischio di Sovraccarico Cognitivo:</strong> L&apos;IA genera informazioni a una velocità che supera spesso la nostra capacità di assimilazione critica. Senza un focus chiaro, si rischia di annegare nei dati.</li>
          <li><strong>Mantenere la Direzione Strategica:</strong> La facilità con cui l&apos;IA può esplorare tangenti può farci perdere di vista l&apos;obiettivo originale del nostro lavoro.</li>
          <li><strong>Efficienza vs. Esplorazione Fine a Sé Stessa:</strong> È importante distinguere tra l&apos;uso mirato dell&apos;IA per un task specifico e la semplice (ma a volte utile) curiosità esplorativa. Entrambe hanno un ruolo, ma vanno gestite con consapevolezza.</li>
          <li><strong>Qualità del &quot;Deep Work&quot; con l&apos;IA:</strong> Anche collaborando con un&apos;IA, il lavoro profondo e concentrato produce risultati qualitativamente superiori.</li>
          <li><strong>Prevenire l&apos;Erosione Attentiva:</strong> L&apos;abitudine a risposte istantanee e a cambi di contesto rapidi può, a lungo termine, diminuire la nostra capacità di mantenere un focus prolungato. Allenare l&apos;attenzione *mentre* si usa l&apos;IA diventa una meta-abilità cruciale.</li>
        </ul>
        <InfoBox icon={FiAlertTriangle} title="Il Costo Nascosto della Divagazione Continua">
          <p>Piccole deviazioni, se ripetute, si accumulano portando a una significativa perdita di tempo e a un progressivo allontanamento dagli obiettivi primari. Ogni cambio di focus non necessario comporta un &quot;residuo attentivo&quot;, ovvero la mente impiega tempo per disimpegnarsi dal task precedente e concentrarsi pienamente sul nuovo.</p>
        </InfoBox>

        <h2 id="trappole-comuni">
          Riconoscere le Trappole Comuni per l&apos;Attenzione con l&apos;IA
        </h2>
        <ul className="list-disc list-outside space-y-2 pl-5 my-4">
          <li><strong>I &quot;Rabbit Holes&quot; della Curiosità:</strong> L&apos;IA menziona un concetto interessante ma secondario, e ci si immerge in una nuova catena di prompt per esplorarlo, dimenticando il task iniziale.</li>
          <li><strong>Il Perfezionismo Prematuro nel Prompting:</strong> Passare troppo tempo a rifinire ossessivamente un singolo prompt prima ancora di aver valutato un primo output.</li>
          <li><strong>Multi-tasking Inefficace:</strong> Tentare di usare l&apos;IA per un compito mentre si è attivamente impegnati in un altro lavoro che richiede concentrazione.</li>
          <li><strong>La Fascinazione Fine a Sé Stessa:</strong> Testare i limiti dell&apos;IA o fare domande &quot;solo per vedere cosa risponde&quot;, anche quando non è funzionale al task.</li>
          <li><strong>L&apos;Illusione della Produttività:</strong> Generare grandi quantità di testo o idee con l&apos;IA può dare una falsa sensazione di progresso se queste non sono allineate con l&apos;obiettivo reale o non vengono poi elaborate criticamente.</li>
        </ul>

        <h2 id="strategie-olistiche">
           Strategie Olistiche per Potenziare Attenzione e Focus con l&apos;IA
        </h2>
        <p>La capacità di mantenere il focus non dipende solo da tecniche specifiche usate durante l&apos;interazione con l&apos;IA, ma da un approccio più ampio che considera il nostro ambiente e il nostro benessere generale.</p>

        <h3 id="ambiente-esterno-interno">4.1 Preparare il Terreno: L&apos;Ambiente Esterno e Interno</h3>

        <h4>A. L&apos;Ambiente Fisico – Il Tuo Spazio di Concentrazione</h4>
        <ul className="list-none space-y-3 my-4">
          <PracticalTip icon={FiHeadphones} title="Crea la Tua Bolla di Focus Sonoro">
            Una postazione di lavoro confortevole (ergonomia, illuminazione) è il primo passo. Minimizza le distrazioni sonore ambientali; se necessario, usa cuffie con cancellazione del rumore. Se la musica ti aiuta, prediligi quella strumentale, ambient, lo-fi beats o suoni specifici per la concentrazione (es. rumore bianco/rosa, suoni binaurali). Evita musica con testi o volumi che possano catturare la tua attenzione primaria. L&apos;obiettivo è un sottofondo che isola, non una nuova distrazione.
          </PracticalTip>
        </ul>

        <h4>B. L&apos;Ambiente Digitale – Domare le Sirene della Dopamina</h4>
        <ul className="list-none space-y-3 my-4">
          <PracticalTip icon={FiShield} title="La Fortezza Digitale Anti-Distrazione">
            Disattiva tutte le notifiche non essenziali (social media, email, app di messaggistica) durante le sessioni di lavoro focalizzato con l&apos;IA. Chiudi tabulazioni del browser e applicazioni non strettamente necessarie per il task corrente. Ogni elemento visibile sullo schermo è un potenziale &quot;gancio&quot; per la tua attenzione. Per chi è particolarmente sensibile alle distrazioni digitali (es. persone con ADHD), considera l&apos;uso di app o estensioni per bloccare siti specifici durante le ore di lavoro e tieni il telefono fisicamente lontano o in modalità aereo.
          </PracticalTip>
        </ul>
        <InfoBox icon={FaBrain} title="ADHD e IA: Canalizzare l'Energia, Evitare le Distrazioni">
            <p>Per le persone con ADHD, l&apos;interazione con l&apos;IA può essere a doppio taglio: la novità e la rapidità di risposta possono essere stimolanti, ma anche aumentare il rischio di iper-focus su dettagli irrilevanti o di passare compulsivamente da un&apos;idea all&apos;altra. Le strategie di timeboxing, la scomposizione dei task e la creazione di un ambiente digitale privo di &quot;ricompense dopaminiche&quot; immediate (come i social) sono ancora più cruciali. L&apos;obiettivo è usare l&apos;IA per strutturare e canalizzare l&apos;energia creativa, non per alimentarne la dispersione.</p>
        </InfoBox>

        <h4>C. Le Fondamenta del Benessere – Il Carburante per un Cervello Attento</h4>
        <ul className="list-none space-y-3 my-4">
          <PracticalTip icon={FiHeart} title="Il Triangolo del Benessere per il Focus: Corpo, Mente, Serenità">
            Un approccio integrato al benessere è il miglior potenziatore a lungo termine della tua capacità di concentrazione:
            <ul className="list-disc list-outside space-y-1 pl-5 mt-2">
              <li><strong>Esercizio Fisico Regolare:</strong> Migliora il flusso sanguigno al cervello, riduce lo stress e aumenta l&apos;energia. Anche brevi pause attive sono benefiche.</li>
              <li><strong>Alimentazione Bilanciata:</strong> Evita picchi glicemici da zuccheri e cibi processati. Privilegia nutrienti che supportano le funzioni cognitive e mantieniti idratato.</li>
              <li><strong>Sonno di Qualità:</strong> Essenziale per la chiarezza mentale e la capacità di mantenere il focus. La sua mancanza è una delle principali cause di scarsa concentrazione.</li>
              <li><strong>Serenità Mentale:</strong> Pratiche come mindfulness, meditazione breve o tecniche di respirazione aiutano a calmare la mente e a migliorare la presenza.</li>
              <li><strong>Allenamento Mentale Attivo:</strong> Oltre all&apos;IA, attività come lettura, puzzle o apprendimento di nuove abilità mantengono la mente agile.</li>
            </ul>
          </PracticalTip>
        </ul>

        <h3 id="tecniche-interazione-ia">4.2 Tecniche Specifiche Durante L&apos;Interazione con L&apos;IA</h3>
        <ul className="list-none space-y-3 my-4">
          <PracticalTip icon={FiCheckSquare} title="Obiettivo Chiaro e Scritto (Il Tuo 'Contratto' con la Sessione AI)">
            Prima di iniziare una sessione con l&apos;IA, definisci chiaramente per iscritto (bastano 1-3 frasi) cosa vuoi ottenere. Rileggilo periodicamente per assicurarti di essere ancora in rotta. (Richiamo M1/L3 - Metacognizione).
          </PracticalTip>
          <PracticalTip icon={FiClock} title="Timeboxing (Il Timer è il Tuo Alleato)">
            Alloca blocchi di tempo specifici e definiti (es. Tecnica del Pomodoro: 25-45 minuti di lavoro focalizzato, seguiti da una breve pausa). Questo aiuta a mantenere l&apos;intensità del focus e a prevenire la fatica mentale.
          </PracticalTip>
          <PracticalTip icon={FiArchive} title="Prompt Singolo e Parcheggio Idee (Iterazione Focalizzata)">
            Evita prompt &quot;omnibus&quot; che cercano di fare troppe cose. Scomponi il lavoro in richieste più piccole. Se emergono idee interessanti ma non pertinenti all&apos;obiettivo attuale, annotale rapidamente in un &quot;parcheggio idee&quot; (un file di testo, un blocco note) per esplorarle *dopo*. (Richiamo M2/L3 - Raffinamento).
          </PracticalTip>
          <li className="text-slate-700 dark:text-slate-300"><strong>Limitare le Iterazioni &quot;Perfettive&quot; Infruttuose:</strong> Datti un numero massimo di tentativi (es. 3-5) per raffinare un singolo output prima di fare un passo indietro e rivalutare l&apos;approccio generale, se non stai ottenendo il risultato voluto.</li>
          <li className="text-slate-700 dark:text-slate-300"><strong>Sessioni Dedicate all&apos;Esplorazione Libera (Controllata e Intenzionale):</strong> Va bene esplorare e &quot;giocare&quot; con l&apos;IA, ma pianifica questi momenti separatamente dal lavoro mirato, per soddisfare la curiosità senza compromettere i task principali.</li>
        </ul>

        <h2 id="ia-come-autofocus">
          L&apos;IA come Strumento di Auto-Focus (Meta-Abilità)
        </h2>
        <p>
          Puoi attivamente chiedere all&apos;IA di aiutarti a mantenere o ritrovare il focus:
        </p>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
            <li><code>&quot;Il mio obiettivo principale è [descrivi obiettivo]. Basandoti sulla nostra conversazione finora, quali sono i prossimi 2-3 passi/prompt più logici per rimanere focalizzati su questo?&quot;</code></li>
            <li><code>&quot;Ho la sensazione di star divagando. Puoi riassumere come l&apos;ultimo output si collega al mio obiettivo iniziale di [obiettivo]?&quot;</code></li>
            <li><code>&quot;Dato [obiettivo], aiutami a creare una checklist di sotto-compiti che posso affrontare uno alla volta con te, per non perdere la direzione.&quot;</code></li>
        </ul>
        <InfoBox icon={FaBrain} title="L'IA come Tuo Coach Attentivo">
          <p>In questo modo, l&apos;IA si trasforma da potenziale fonte di distrazione a partner attivo nel mantenimento della concentrazione e nel perseguimento strategico dei tuoi obiettivi.</p>
        </InfoBox>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>La gestione dell&apos;attenzione è cruciale per non essere sopraffatti dalla potenza dell&apos;IA e per mantenere la direzione strategica.</li>
              <li>Riconoscere le comuni &quot;trappole per l&apos;attenzione&quot; (rabbit holes, perfezionismo prematuro, multitasking) è il primo passo per evitarle.</li>
              <li>Un approccio <strong>olistico</strong> alla gestione del focus include: la cura dell&apos;ambiente fisico e digitale, e il mantenimento di abitudini di benessere (esercizio, alimentazione, sonno, serenità mentale).</li>
              <li>Tecniche specifiche come la definizione chiara degli obiettivi, il timeboxing, il parcheggio delle idee e l&apos;iterazione focalizzata sono essenziali durante l&apos;interazione con l&apos;IA.</li>
              <li>L&apos;IA stessa può essere usata come strumento per aiutarti a mantenere il focus e a strutturare il lavoro.</li>
              <li>La gestione dell&apos;attenzione è un&apos;abilità che si coltiva con la pratica consapevole, fondamentale nell&apos;era dell&apos;Intelligenza Artificiale.</li>
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
