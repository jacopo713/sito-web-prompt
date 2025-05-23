"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Per leggere i query params
import { FiCheckCircle, FiLoader, FiAlertTriangle } from 'react-icons/fi';

// QUI, in un'applicazione reale, potresti voler verificare la session_id con il tuo backend
// per confermare il pagamento e aggiornare lo stato dell'utente (es. concedere accesso al corso).
// Per ora, mostriamo solo un messaggio di successo generico se session_id è presente.

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [message, setMessage] = useState("Verifica del pagamento in corso...");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (sessionId) {
      // Simula una verifica o semplicemente conferma la presenza della session ID
      // In una app reale, potresti fare una fetch al tuo backend qui.
      console.log("Checkout session ID:", sessionId);
      // Esempio: fetch(`/api/verify-payment?session_id=${sessionId}`).then(...)
      setMessage("Pagamento completato con successo! Grazie per il tuo acquisto.");
      setStatus("success");
    } else {
      setMessage("Informazioni sulla sessione di pagamento non trovate.");
      setStatus("error");
    }
  }, [sessionId]);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
      {status === "loading" && (
        <>
          <FiLoader className="animate-spin h-16 w-16 text-indigo-600 dark:text-indigo-400 mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Attendere...</h1>
        </>
      )}
      {status === "success" && (
        <>
          <FiCheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Pagamento Riuscito!</h1>
        </>
      )}
      {status === "error" && (
        <>
          <FiAlertTriangle className="h-16 w-16 text-red-500 dark:text-red-400 mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Ops!</h1>
        </>
      )}
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        {message}
      </p>
      {status === "success" && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          A breve riceverai una conferma via email e potrai accedere ai contenuti del corso.
        </p>
      )}
      <Link href="/corsi" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
        &larr; Torna ai Corsi
      </Link>
    </div>
  );
}
