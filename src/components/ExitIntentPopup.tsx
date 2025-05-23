// src/components/ExitIntentPopup.tsx
'use client';

import React from 'react';

interface ExitIntentPopupProps {
  onClose: () => void;
  onContinue: () => void;
  onAlternativeAction: () => void;
  alternativeActionText: string;
}

export default function ExitIntentPopup({
  onClose,
  onContinue,
  onAlternativeAction,
  alternativeActionText,
}: ExitIntentPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Stai per lasciare?</h2>
        <p className="text-gray-600 mb-6">
          Sembra che tu non abbia ancora completato la tua richiesta di coaching.
          Vuoi continuare o preferisci un&apos;alternativa?
        </p>
        <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-col sm:space-y-3">
           <button
            onClick={onContinue}
            className="w-full px-6 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continua a compilare
          </button>
          <button
            onClick={onAlternativeAction}
            className="w-full mt-3 px-6 py-3 text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          >
            {alternativeActionText}
          </button>
          <button
            onClick={onClose}
            className="w-full mt-3 px-6 py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            No, grazie
          </button>
        </div>
      </div>
    </div>
  );
}
