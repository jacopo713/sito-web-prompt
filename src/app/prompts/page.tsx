// src/app/prompts/page.tsx
import { samplePrompts, Prompt } from '@/data/prompts'; // Usiamo l'alias @ per src
// Link, FiCopy, FiArrowRightCircle rimossi perché non utilizzati
import { FiCheckSquare } from 'react-icons/fi'; // Icone aggiuntive

/**
 * Componente per visualizzare un singolo prompt card.
 */
const PromptCard = ({ prompt }: { prompt: Prompt }) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{prompt.title}</h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">{prompt.description}</p>
        {prompt.promptBody && (
          <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-md overflow-x-auto custom-scrollbar max-h-32">
            <pre className="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-wrap break-words">
              <code>{prompt.promptBody}</code>
            </pre>
          </div>
        )}
        <div className="mb-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-2">Categoria:</span>
          <span className="inline-block bg-sky-100 dark:bg-sky-700 text-sky-700 dark:text-sky-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            {prompt.category}
          </span>
        </div>
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {prompt.tags.map(tag => (
              <span key={tag} className="text-xs bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Pulsanti di azione (commentati se richiedono "use client" e non ancora implementati) */}
      {/* {prompt.promptBody && (
        <button
          // onClick={() => handleCopy(prompt.promptBody)} // Richiede "use client"
          className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-colors"
        >
          <FiCopy className="mr-2" /> Copia Prompt
        </button>
      )} */}
      {/* Link a una pagina dettaglio prompt (se la implementeremo) */}
      {/* <Link href={`/prompts/${prompt.id}`} className="mt-2 w-full flex items-center justify-center px-4 py-2 border border-indigo-500 text-sm font-medium rounded-md text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 dark:focus:ring-offset-slate-900 transition-colors">
          Dettagli <FiArrowRightCircle className="ml-2" />
      </Link> */}
    </div>
  );
};


export default function PromptsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-5xl">
          Libreria dei Prompt
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Esplora la nostra collezione di prompt pronti all&apos;uso, progettati per aiutarti a ottenere il massimo dalle tue interazioni con l&apos;IA.
        </p>
      </div>

      {samplePrompts && samplePrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {samplePrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <FiCheckSquare className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-50">Nessun prompt disponibile</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Torna più tardi o aggiungi nuovi prompt al sistema.
          </p>
        </div>
      )}
    </div>
  );
}
