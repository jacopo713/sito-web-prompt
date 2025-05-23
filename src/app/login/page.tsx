// src/app/login/page.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth, googleAuthProvider, signInWithPopup, signOut } from '@/lib/firebase/clientApp';
import { FirebaseError } from 'firebase/app'; // Importa FirebaseError per una tipizzazione più precisa
import { FaGoogle, FaSignOutAlt } from 'react-icons/fa';
import { FiLogIn, FiLoader } from 'react-icons/fi';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  const handleGoogleSignIn = async () => {
    console.log("Tentativo di login con Google...");
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log("Login con Google RIUSCITO:", result.user);

      const redirectTo = searchParamsHook.get('redirect') || '/ai-chat';
      console.log(`Redirecting to: ${redirectTo}`);
      router.push(redirectTo);

    } catch (error: unknown) { // MODIFICATO: da any a unknown
      console.error("Errore DETTAGLIATO durante il login con Google:", error);
      let errorCode: string | undefined = undefined;
      let errorMessage: string = 'Si è verificato un errore sconosciuto.';

      if (error instanceof FirebaseError) { // Type guard per FirebaseError
        errorCode = error.code;
        errorMessage = error.message;
      } else if (error instanceof Error) { // Type guard generico per Error
        errorMessage = error.message;
      }

      if (errorCode === 'auth/popup-closed-by-user') {
        console.warn('Login popup chiuso dall_utente.');
        // Non mostrare un alert per questa azione utente specifica
      } else if (errorCode === 'auth/cancelled-popup-request') {
        console.warn('Richieste multiple di popup, una è stata cancellata.');
      } else if (errorCode === 'auth/popup-blocked') {
        alert('Il popup per il login con Google è stato bloccato dal browser. Assicurati che i popup siano abilitati per questo sito.');
      } else {
        alert(`Errore durante il login: ${errorMessage}`);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Errore durante il logout:", error);
      // Potresti voler gestire questo errore più esplicitamente
      if (error instanceof Error) {
        alert(`Errore durante il logout: ${error.message}`);
      } else {
        alert('Errore sconosciuto durante il logout.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <FiLoader className="animate-spin h-10 w-10 text-indigo-600 dark:text-indigo-400" />
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">Verifica stato autenticazione...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-xl shadow-2xl max-w-md w-full text-center">
        {user ? (
          <>
            <Image
              src={user.photoURL || '/default-avatar.png'}
              alt={user.displayName || 'User Avatar'}
              width={96}
              height={96}
              className="rounded-full mx-auto mb-6 shadow-md object-cover"
              priority
            />
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Benvenuto, {user.displayName || user.email}!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Sei già autenticato.
            </p>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900 transition-all duration-150 transform hover:scale-105 active:scale-95"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
            <button
              onClick={() => {
                const redirectTo = searchParamsHook.get('redirect') || '/ai-chat';
                router.push(redirectTo);
              }}
              className="mt-4 w-full flex items-center justify-center px-6 py-3 border border-indigo-600 dark:border-indigo-400 text-base font-medium rounded-md shadow-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-700/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-colors"
            >
              Continua
            </button>
          </>
        ) : (
          <>
            <FiLogIn className="mx-auto mb-6 h-16 w-16 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              Accedi a Fagyl Corsi
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Usa il tuo account Google per accedere rapidamente a tutti i contenuti e funzionalità.
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-all duration-150 transform hover:scale-105 active:scale-95"
            >
              <FaGoogle className="mr-3" />
              Accedi con Google
            </button>
            <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">
              Cliccando su &quot;Accedi con Google&quot;, accetti i nostri Termini di Servizio e la Politica sulla Privacy.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
