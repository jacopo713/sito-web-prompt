'use client'; // Mark this component as a Client Component

import React from 'react';
import { useSearchParams } from 'next/navigation'; // Hook to read URL query parameters

/**
 * Content for the coaching request page, handles client-side logic.
 */
export default function CoachingPageClientContent() {
  const searchParams = useSearchParams();
  const coachingType = searchParams.get('type'); // Get the 'type' query parameter from the URL

  // Function to format the coaching type for display (e.g., 'analytical-assistant' -> 'Analytical Assistant')
  const formatCoachingType = (type: string | null): string => {
    if (!type) return 'Non specificato';
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      {coachingType ? (
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8 max-w-2xl mx-auto">
          <p className="text-xl mb-2 text-slate-700 dark:text-slate-200">
            Hai selezionato il servizio di coaching:
          </p>
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6 capitalize">
            {formatCoachingType(coachingType)}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 mb-6">
            Siamo lieti del tuo interesse! Per procedere con la tua richiesta, ti preghiamo di compilare il modulo sottostante (attualmente in fase di sviluppo).
          </p>
          {/* Placeholder for a future form */}
          <div className="mt-6 p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-center italic">
              (Modulo di richiesta coaching in costruzione)
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-center text-sm mt-2">
              A breve potrai inserire qui i tuoi dettagli per essere ricontattato.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200 p-6 rounded-md max-w-2xl mx-auto shadow" role="alert">
          <p className="font-bold text-lg">Attenzione!</p>
          <p>Non hai specificato un tipo di coaching.</p>
          <p className="mt-2">
            Per favore, seleziona un servizio dalla nostra pagina dedicata.
          </p>
        </div>
      )}
    </>
  );
}
