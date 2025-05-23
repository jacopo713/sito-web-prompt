import Link from 'next/link';
import { FiCode, FiEdit3, FiHelpCircle, FiArrowLeft, FiArrowRight } from 'react-icons/fi'; // Rimossi FiCheckSquare, FiRepeat, FiInfo
import { FaBrain } from 'react-icons/fa';
import React from 'react';

// Simple component for callout/info boxes
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

// Component to display prompt examples consistently
const PromptExample = ({ title, description, type, promptBody }: { title: string, description: string, type: 'Analitico' | 'Creativo', promptBody: string }) => (
  <div className={`border-l-4 ${type === 'Analitico' ? 'border-sky-500' : 'border-purple-500'} bg-slate-50 dark:bg-slate-800/50 rounded-r-lg p-4 sm:p-5 my-5 shadow`}>
    <h4 className={`text-md font-semibold mb-1 flex items-center ${type === 'Analitico' ? 'text-sky-700 dark:text-sky-300' : 'text-purple-700 dark:text-purple-300'}`}>
      {type === 'Analitico' ? <FiCode className="mr-2 flex-shrink-0" /> : <FiEdit3 className="mr-2 flex-shrink-0" />}
      {title} ({type})
    </h4>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{description}</p>
    <div className="bg-slate-100 dark:bg-slate-700 rounded p-3">
      <pre className="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-wrap break-words font-mono">
        <code>{promptBody}</code>
      </pre>
    </div>
  </div>
);

export default function Lezione1M2Page() {
  const lessonTitle = "Prompt Creativi vs. Analitici: Adattare la Strategia";
  const moduleSlug = "modulo-2";
  // const lessonSlug = "lezione-1-m2"; // Rimosso perché non usato
  const previousLessonSlug = "/corsi/base/modulo-1/lezione-4";
  const nextLessonSlug = `/corsi/base/${moduleSlug}/lezione-2-m2`;

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Modulo 2 - Lezione 1</p>
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
          Come abbiamo discusso, non esiste un unico modo &quot;giusto&quot; per scrivere un prompt. La strategia migliore dipende dall&apos;obiettivo: cerchiamo precisione e logica, o esplorazione e creatività? Analizziamo le due principali modalità.
        </p>

        <h2 className="flex items-center scroll-mt-20" id="prompt-analitici">
          <FiCode className="h-6 w-6 mr-3 text-sky-600 dark:text-sky-400 flex-shrink-0" />
          Prompt Analitici: Guidare il Ragionamento
        </h2>
        <p>
          Quando il compito richiede <strong>precisione, logica, passaggi sequenziali, analisi dettagliate o debugging</strong>, un approccio analitico è preferibile. Si tratta di guidare l&apos;IA passo dopo passo.
        </p>
        <strong>Quando usarli:</strong>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li>Risolvere problemi matematici o logici.</li>
          <li>Analizzare dati secondo criteri specifici.</li>
          <li>Scrivere o correggere codice.</li>
          <li>Seguire istruzioni complesse e multi-step.</li>
          <li>Estrarre informazioni specifiche da un testo.</li>
          <li>Riassumere mantenendo fatti chiave.</li>
        </ul>
        <strong>Perché funzionano:</strong>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li>Riducono l&apos;ambiguità specificando ogni passo.</li>
          <li>Permettono all&apos;IA di &quot;concentrarsi&quot; su un sotto-task alla volta.</li>
          <li>Rendono il processo di pensiero dell&apos;IA più trasparente e verificabile (Chain-of-Thought).</li>
          <li>Minimizzano il rischio di errori dovuti a interpretazioni errate o &quot;salti&quot; logici.</li>
        </ul>
        <strong>Tecniche Comuni:</strong>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li>Usare istruzioni esplicite come: <code>&quot;Ragiona passo dopo passo&quot;</code>, <code>&quot;Mostra il tuo lavoro&quot;</code>, <code>&quot;Spiega il tuo ragionamento&quot;</code>.</li>
          <li>Scomporre il problema in sotto-domande o sotto-task.</li>
          <li>Chiedere un output strutturato (es. JSON, tabella Markdown).</li>
          <li>Fornire criteri di valutazione chiari.</li>
        </ul>

        <PromptExample
          title="Debugging Funzione Python"
          description="Prompt analitico per trovare un errore in un codice, guidando l'IA passo-passo."
          type="Analitico"
          promptBody={`Ragiona passo dopo passo per identificare l'errore logico nella seguente funzione Python.
La funzione dovrebbe restituire la somma dei numeri pari in una lista, ma sta dando risultati errati.

\`\`\`python
def somma_pari(numeri):
  somma = 0
  for num in numeri:
    if num % 2 == 1: # Errore qui! Dovrebbe essere num % 2 == 0
      somma += num
  return somma

lista_test = [1, 2, 3, 4, 5, 6]
risultato = somma_pari(lista_test) # Atteso: 12, Ottenuto: 9
print(risultato)
\`\`\`

1.  Analizza cosa fa la condizione \`if num % 2 == 1:\`.
2.  Spiega perché questo causa un risultato errato rispetto all'obiettivo (sommare numeri pari).
3.  Suggerisci la correzione necessaria al codice.
4.  Mostra la funzione corretta.`}
        />

        <h2 className="flex items-center scroll-mt-20" id="prompt-creativi">
          <FiEdit3 className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />
          Prompt Creativi: Stimolare l&apos;Esplorazione
        </h2>
        <p>
          Quando l&apos;obiettivo è <strong>generare idee, scrivere testi originali, esplorare possibilità o pensare fuori dagli schemi</strong>, un approccio più olistico e meno rigido è spesso migliore. Si fornisce un contesto ricco e si lascia più libertà all&apos;IA.
        </p>
        <strong>Quando usarli:</strong>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li>Brainstorming di idee (nomi, slogan, soluzioni).</li>
          <li>Scrittura creativa (storie, poesie, script).</li>
          <li>Generazione di contenuti marketing o social.</li>
          <li>Creazione di diverse opzioni o variazioni.</li>
          <li>Esplorazione di concetti da diverse angolazioni.</li>
        </ul>
        <strong>Perché funzionano:</strong>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li>Un input ricco permette all&apos;IA di fare più connessioni associative.</li>
          <li>Meno vincoli rigidi incoraggiano l&apos;IA a proporre soluzioni inaspettate.</li>
          <li>Simulano meglio un processo di brainstorming umano, dove si parte larghi per poi convergere.</li>
        </ul>
        <strong>Tecniche Comuni:</strong>
        <ul className="list-disc list-outside space-y-1 pl-5 my-3">
          <li>Fornire contesto ampio (background, target audience, tono desiderato, valori).</li>
          <li>Usare il role-playing (es. <code>&quot;Agisci come un romanziere...&quot;</code>, <code>&quot;Sei un esperto di marketing virale...&quot;</code>).</li>
          <li>Dare vincoli ispirazionali (es. <code>&quot;Deve essere spiritoso e memorabile&quot;</code>, <code>&quot;Evoca un senso di avventura&quot;</code>).</li>
          <li>Chiedere un numero specifico di opzioni (es. <code>&quot;Genera 5 slogan...&quot;</code>).</li>
          <li>Includere esempi di ciò che ti piace o non ti piace.</li>
        </ul>

        <PromptExample
          title="Generazione Slogan per Caffè Bio"
          description="Prompt creativo per generare idee di marketing, fornendo contesto e tono."
          type="Creativo"
          promptBody={`Agisci come un copywriter esperto specializzato in prodotti sostenibili.
Sto lanciando un nuovo marchio di caffè biologico ed equosolidale chiamato "Terra Pura". Il nostro target sono consumatori consapevoli, attenti all'ambiente e alla qualità (età 25-50). Il tono deve essere caldo, autentico, leggermente aspirazionale ma non pretenzioso.

Genera 7 slogan brevi e memorabili per il caffè "Terra Pura" che comunichino questi valori:
- Gusto eccezionale
- Rispetto per l'ambiente e i coltivatori
- Un momento di piacere consapevole

Evita frasi troppo generiche come "buono e naturale". Sii evocativo.`}
        />

        <h2 className="flex items-center scroll-mt-20" id="zona-grigia">
          <FiHelpCircle className="h-6 w-6 mr-3 text-slate-500 dark:text-slate-400 flex-shrink-0" />
          La Zona Grigia: Combinare gli Approcci
        </h2>
        <p>
          Molti compiti complessi beneficiano di una <strong>combinazione</strong> dei due approcci. Ad esempio, potresti iniziare con un prompt creativo per generare idee e poi usare un prompt analitico per valutare la fattibilità di quelle idee secondo criteri specifici.
        </p>
        <p>
          Oppure, all&apos;interno di un singolo prompt lungo, potresti avere una sezione iniziale più aperta (creativa) per definire il contesto e una sezione finale più strutturata (analitica) per specificare il formato dell&apos;output.
        </p>

        <InfoBox icon={FaBrain} title="Metacognizione in Azione">
          <p>La vera abilità sta nel <strong>riconoscere quale approccio (o mix) sia più adatto al TUO specifico obiettivo</strong> in quel momento.</p>
          <p>Prima di scrivere il prompt, chiediti:</p>
          <ul className="list-disc list-outside space-y-1 pl-5">
             <li>Ho bisogno di una risposta precisa e verificabile (Analitico) o di opzioni e idee (Creativo)?</li>
             <li>Quanto è complesso il compito? Beneficerà di una scomposizione (Analitico)?</li>
             <li>Quanta libertà voglio dare all&apos;IA (Creativo)?</li>
          </ul>
          <p>Osserva i risultati: se un prompt analitico produce output troppo rigidi, prova a renderlo leggermente più aperto. Se un prompt creativo è troppo vago, aggiungi più struttura o vincoli.</p>
        </InfoBox>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-xl font-semibold mb-4">Punti Chiave di Questa Lezione</h3>
           <ul className="list-disc list-outside space-y-2 pl-5 mb-6 text-slate-700 dark:text-slate-300">
              <li>La strategia di prompting dipende dall&apos;obiettivo del task.</li>
              <li>I <strong>Prompt Analitici</strong> guidano l&apos;IA passo-passo per precisione e logica (es. debugging, analisi dati). Usano tecniche come &quot;Ragiona passo dopo passo&quot;.</li>
              <li>I <strong>Prompt Creativi</strong> forniscono contesto ricco e meno vincoli per stimolare idee e originalità (es. brainstorming, scrittura creativa). Usano tecniche come role-playing e vincoli ispirazionali.</li>
              <li>Molti compiti richiedono un <strong>mix</strong> dei due approcci.</li>
              <li>La <strong>metacognizione</strong> è cruciale per scegliere e adattare la strategia giusta.</li>
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
