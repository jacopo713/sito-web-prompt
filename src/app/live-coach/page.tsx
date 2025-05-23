// src/app/live-coach/page.tsx
'use client';

import React, { useState } from 'react';
import CoachingRequestButton from '@/components/CoachingRequestButton';
import MultiStepCoachingForm from '@/components/MultiStepCoachingForm';
import ExitIntentPopup from '@/components/ExitIntentPopup'; // Mantenuto sebbene la logica exit-intent sia commentata
import type { FormData } from '@/types';
import Link from 'next/link';
import { FiBriefcase, FiAward, FiUsers, FiCalendar } from 'react-icons/fi'; // Icone per la sezione "Perché"

const TARGET_COACH_EMAIL = "coach@fagyl.com"; // Email fittizia del coach

export default function LiveCoachPage() {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '', // Nuovo
    gender: '', // Nuovo
    occupation: '', // Nuovo
    challenge: '',
    coachingReason: '', // Nuovo
    goals: '',
    neurodiversity: '', // Nuovo
    availability: '',
  });
  const [showExitIntentPopup, setShowExitIntentPopup] = useState(false); // Mantenuto

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleRequestButtonClick = () => {
    setFormSubmitted(false);
    // Resettiamo il form a valori puliti quando si clicca per richiederlo di nuovo
    setFormData({
      name: '', email: '', age: '', gender: '', occupation: '',
      challenge: '', coachingReason: '', goals: '', neurodiversity: '', availability: '',
    });
    setShowForm(true);
  };

  const handleSuccessfulSubmit = () => {
    setFormSubmitted(true);
    setShowForm(false);
    // Non resettiamo formData qui subito, così possiamo mostrare l'email nel messaggio di successo
  };

  // Logica per Exit Intent Popup (semplificata e attualmente commentata nel suo effetto)
  // useEffect(() => {
  //   const handleMouseOut = (event: MouseEvent) => {
  //     if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
  //       if (showForm && !formSubmitted && (formData.name || formData.email || formData.challenge || formData.goals)) {
  //         // setShowExitIntentPopup(true); // Attualmente commentato
  //       }
  //     }
  //   };
  //   document.addEventListener('mouseout', handleMouseOut);
  //   return () => {
  //     document.removeEventListener('mouseout', handleMouseOut);
  //   };
  // }, [showForm, formSubmitted, formData]);

  const closeExitIntentPopup = () => setShowExitIntentPopup(false);
  const continueFillingForm = () => {
    setShowExitIntentPopup(false);
    setShowForm(true);
  };
  const handleAlternativeActionFromPopup = () => {
    setShowExitIntentPopup(false);
    setShowForm(false);
    // router.push('/corsi'); // Esempio di azione alternativa
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-slate-800 dark:text-slate-100">
          Sblocca il Tuo Potenziale con il <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">Live Coaching</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mx-auto max-w-3xl mb-10">
          Le nostre sessioni di live coaching personalizzate sono progettate per guidarti passo dopo passo
          nell&apos;utilizzo avanzato dei prompt, ottimizzare i tuoi workflow con l&apos;IA e trasformare le tue idee in risultati concreti.
        </p>
        {!showForm && !formSubmitted && (
          <CoachingRequestButton onClick={handleRequestButtonClick} className="text-lg px-10 py-4" />
        )}
      </section>

      {showForm && !formSubmitted && (
        <section id="coaching-form-section" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-slate-200 mb-8 text-center">Completa la Tua Richiesta di Coaching</h2>
          <MultiStepCoachingForm
            formData={formData}
            updateFormData={updateFormData}
            onSuccessfulSubmit={handleSuccessfulSubmit}
            targetEmail={TARGET_COACH_EMAIL}
          />
           <button
              onClick={() => { setShowForm(false); /* setError(null) rimosso; Ripristina formData se necessario */ }}
              className="mt-8 block mx-auto text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 underline"
            >
              Annulla e torna indietro
            </button>
        </section>
      )}

      {formSubmitted && (
        <section className="text-center my-16 py-10 px-4 bg-green-50 dark:bg-green-900/30 rounded-lg shadow-md max-w-2xl mx-auto">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mt-4 mb-3">Richiesta Inviata con Successo!</h2>
          <p className="text-lg text-gray-700 dark:text-slate-200 mb-6 max-w-xl mx-auto">
            Grazie, <strong>{formData.name || 'utente'}</strong>, per aver richiesto una sessione di coaching. Ti contatteremo al più presto all&apos;indirizzo email <strong>{formData.email || 'non specificata'}</strong> per definire i dettagli.
          </p>
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            &larr; Torna alla Homepage
          </Link>
        </section>
      )}

      {!showForm && !formSubmitted && (
        <>
          <section className="my-16">
            <h2 className="text-3xl font-bold text-gray-700 dark:text-slate-200 mb-10 text-center">Perché Scegliere il Nostro Coaching?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:scale-105">
                <FiUsers className="h-10 w-10 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Approccio Personalizzato</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm">
                  Ogni sessione è modellata sui tuoi specifici obiettivi, livello di esperienza e settore di interesse.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:scale-105">
                <FiBriefcase className="h-10 w-10 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Esperti del Settore</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm">
                  Impara da professionisti con anni di esperienza nell&apos;applicazione pratica dell&apos;IA e nella creazione di prompt efficaci.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:scale-105">
                <FiAward className="h-10 w-10 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Risultati Misurabili</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm">
                  Ti aiutiamo a definire metriche di successo e a monitorare i tuoi progressi per un impatto reale.
                </p>
              </div>
            </div>
          </section>

          <section className="my-16 bg-gray-50 dark:bg-slate-800/60 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-700 dark:text-slate-200 mb-10 text-center">Come Funziona?</h2>
            <ol className="list-none space-y-6 text-gray-700 dark:text-slate-300 max-w-2xl mx-auto">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Richiesta Iniziale</h4>
                  <p className="text-sm">Clicca su &quot;Richiedi una Sessione&quot; e compila il modulo dettagliato per farci conoscere le tue esigenze e obiettivi.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Analisi e Contatto</h4>
                  <p className="text-sm">Analizzeremo la tua richiesta e ti contatteremo via email per discutere i prossimi passi ed eventualmente proporti una breve consultazione gratuita.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Sessioni Personalizzate <FiCalendar className="inline ml-1 mb-0.5"/></h4>
                  <p className="text-sm">Incontri one-to-one via videochiamata, focalizzati sui tuoi progetti e sfide. Concordemo insieme le date e gli orari.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Supporto Continuo</h4>
                  <p className="text-sm">Accesso a risorse esclusive e follow-up per garantire la tua crescita e il raggiungimento dei tuoi obiettivi.</p>
                </div>
              </li>
            </ol>
          </section>

          <section className="text-center mt-16 mb-8">
            <h2 className="text-3xl font-bold text-gray-700 dark:text-slate-200 mb-6">Pronto a Fare il Prossimo Passo?</h2>
            <p className="text-xl text-gray-600 dark:text-slate-300 mx-auto max-w-2xl mb-10">
              Non lasciare che i tuoi progetti IA rimangano bloccati. Con la guida giusta, puoi ottenere risultati straordinari.
            </p>
            {!showForm && !formSubmitted && (
                <CoachingRequestButton onClick={handleRequestButtonClick} text="Inizia Ora la Tua Trasformazione" className="text-lg px-10 py-4" />
            )}
          </section>
        </>
      )}

      {showExitIntentPopup && (
        <ExitIntentPopup
          onClose={closeExitIntentPopup}
          onContinue={continueFillingForm}
          onAlternativeAction={handleAlternativeActionFromPopup}
          alternativeActionText="Esplora i corsi gratuiti" // Esempio
        />
      )}
    </div>
  );
}
