import { FiCpu, FiMessageSquare, FiRepeat, FiZap, FiArrowRight, FiTrendingUp, FiCheckCircle, FiInfo, FiArrowLeft } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';
import Link from 'next/link';

// Componente semplice per un blocco "Callout/InfoBox"
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

export default function Lezione1Page() {
  const lessonTitle = "Cos'è un Prompt e Perché è Cruciale?";
  const moduleSlug = "modulo-1";
  const nextLessonSlug = `/corsi/base/${moduleSlug}/lezione-2`;
  // For the very first lesson, there's no previous lesson.
  const previousLessonSlug = null;


  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Modulo 1 - Lezione 1</p>
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
          Benvenuti alla prima lezione del nostro viaggio nel mondo del Prompt Design e della Metacognizione! Prima di immergerci nelle tecniche specifiche, capiamo le basi.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="cosa-sono-ai">
          <FiCpu className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Cos&apos;è un Chatbot AI? (In Breve)
        </h2>
        <p>
          Probabilmente interagite già con Chatbot basati su Intelligenza Artificiale (IA) come <strong>ChatGPT</strong>, <strong>Claude</strong>, <strong>Gemini</strong> o <strong>DeepSeek</strong>. Ma cosa sono esattamente? In breve, si tratta di sofisticati programmi informatici, costruiti su <strong>Grandi Modelli Linguistici (LLM - Large Language Models)</strong>.
        </p>
        <InfoBox icon={FiInfo} title="Come funzionano gli LLM?">
          <p>Questi modelli sono stati addestrati analizzando enormi quantità di testo e dati. Grazie a questo addestramento, sono in grado di:</p>
          <ul className="list-disc list-outside space-y-1 pl-5">
            <li>Comprendere il linguaggio umano.</li>
            <li>Seguire istruzioni complesse.</li>
            <li>Rispondere a domande in modo coerente.</li>
            <li>Generare testi creativi e tecnici.</li>
            <li>Mantenere una conversazione naturale.</li>
          </ul>
        </InfoBox>
        <p>
           Il &quot;motore&quot; che guida queste potenti IA a fornirci i risultati desiderati è il <strong>prompt</strong>: l&apos;istruzione, la domanda o l&apos;input che noi forniamo loro. Ed è qui che entra in gioco il Prompt Design.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="prompt-design">
          <FiMessageSquare className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          Il Prompt Design: L&apos;Arte di Dialogare con l&apos;IA
        </h2>
        <p>
          Il Prompt Design non è solo &quot;scrivere una domanda&quot;, ma è <strong>l&apos;abilità – quasi un&apos;arte –</strong> di formulare input chiari, precisi, contestualizzati e strutturati per guidare l&apos;IA a generare l&apos;output migliore possibile per i nostri scopi.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="ia-estensione">
           <FiTrendingUp className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
           L&apos;IA come Estensione del Nostro Potenziale
        </h2>
        <p>
          Immaginiamo l&apos;Intelligenza Artificiale come un <strong>assistente incredibilmente capace</strong>, pronto ad aiutarci a estendere le nostre capacità cognitive, creative e operative. Che si tratti di scrivere codice, generare idee, analizzare dati o creare contenuti, l&apos;IA può agire come un <strong>amplificatore del nostro potenziale</strong>.
        </p>
        <InfoBox icon={FiZap} title="L'Effetto Moltiplicativo dei Buoni Prompt">
           <p>L&apos;efficacia di questa &quot;estensione&quot; dipende crucialmente dalla qualità della nostra comunicazione. Man mano che gli strumenti IA diventano più potenti, la nostra capacità di guidarli è ancora più determinante.</p>
           <p>Fornire <strong>prompt ben strutturati</strong>, che considerino diversi aspetti e forniscano contesto, non produce un miglioramento lineare, ma spesso un <strong>effetto moltiplicativo sui risultati</strong>: la qualità, profondità e utilità dell&apos;output possono aumentare esponenzialmente.</p>
        </InfoBox>

        <h2 className="flex items-center scroll-mt-20" id="metacognizione">
           <FaBrain className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
           Il Ciclo Virtuoso della Metacognizione
        </h2>
        <p>
          Qui si inserisce un concetto fondamentale: la <strong>Metacognizione</strong>, ovvero la capacità di &quot;pensare sul proprio pensiero&quot;. Nel contesto dell&apos;IA, applicare la metacognizione significa:
        </p>
        <ol className="list-decimal list-outside space-y-2 pl-5 mb-6">
           <li><strong>Osservare consapevolmente</strong> come formuliamo i nostri prompt: perché scegliamo certe parole? Qual è la nostra strategia?</li>
           <li><strong>Monitorare criticamente</strong> le risposte dell&apos;IA: soddisfano le aspettative? Dove sono le lacune? Come ha interpretato l&apos;IA il nostro input?</li>
           <li><strong>Regolare e adattare</strong> il nostro approccio: come possiamo modificare il prompt (e quindi il nostro modo di strutturare la richiesta nel pensiero) per ottenere un risultato migliore?</li>
        </ol>
        <InfoBox icon={FiRepeat} title="Un Sistema Crescente di Potenzialità">
           <p>Questo processo crea un <strong>ciclo virtuoso</strong>: migliorando i prompt attraverso la riflessione, non solo otteniamo output migliori, ma affiniamo anche la nostra capacità di pensare in modo strutturato e di comunicare chiaramente.</p>
           <p>Comprendere come &quot;ragiona&quot; l&apos;IA ci permette di creare prompt ancora più efficaci, innescando una crescita continua.</p>
        </InfoBox>

         <h2 className="flex items-center scroll-mt-20" id="strutturare-pensiero">
           <FiCheckCircle className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
           Strutturare il Pensiero per Massimizzare l&apos;Efficacia
        </h2>
        <p>
           In fondo, scrivere un buon prompt è un esercizio potente per <strong>strutturare il proprio pensiero</strong>. Richiede di chiarire l&apos;obiettivo, scomporre un compito complesso, anticipare ambiguità e comunicare in modo logico.
        </p>
        <p>
           Questa abilità di strutturazione è universalmente benefica. Tecniche simili di scomposizione, pianificazione e auto-riflessione sono utili in molti contesti per affrontare compiti complessi, superare blocchi creativi o semplicemente organizzare meglio le idee.
        </p>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>I Chatbot AI (basati su LLM) comprendono e generano linguaggio.</li>
              <li>Il <strong>Prompt</strong> è l&apos;istruzione chiave che diamo all&apos;IA.</li>
              <li>Il <strong>Prompt Design</strong> è l&apos;abilità di formulare input efficaci.</li>
              <li>L&apos;IA agisce come <strong>amplificatore</strong> del nostro potenziale, potenziato da buoni prompt.</li>
              <li>La <strong>Metacognizione</strong> (pensare sul pensiero) crea un ciclo virtuoso per migliorare prompt e risultati.</li>
              <li>Scrivere prompt aiuta a <strong>strutturare il pensiero</strong>.</li>
           </ul>

           <div className="flex justify-between items-center mt-8">
            {previousLessonSlug ? (
                <Link
                    href={previousLessonSlug}
                    className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    <FiArrowLeft className="mr-2 h-4 w-4" />
                    Lezione Precedente
                </Link>
            ) : (
                <span className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 opacity-50 cursor-not-allowed">
                    <FiArrowLeft className="mr-2 h-4 w-4" />
                    Lezione Precedente
                </span>
            )}

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
