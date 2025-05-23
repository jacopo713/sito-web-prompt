import React from 'react';
import Link from 'next/link';
import { FiXCircle } from 'react-icons/fi';

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
      <FiXCircle className="h-16 w-16 text-red-500 dark:text-red-400 mb-6" />
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Pagamento Annullato</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        Sembra che tu abbia annullato il processo di pagamento. Non ti è stato addebitato alcun importo.
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Se hai riscontrato problemi o hai cambiato idea, puoi sempre riprovare.
      </p>
      <div className="flex space-x-4">
        <Link href="/corsi/base" className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Riprova Acquisto Corso Base
        </Link>
        <Link href="/corsi" className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Esplora Altri Corsi
        </Link>
      </div>
    </div>
  );
}
