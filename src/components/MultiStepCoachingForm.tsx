// src/components/MultiStepCoachingForm.tsx
'use client';

import React, { useState, FormEvent } from 'react';
import { FormData } from '@/types';

interface MultiStepCoachingFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onSuccessfulSubmit: () => void;
  targetEmail: string;
}

const TOTAL_STEPS = 3;

export default function MultiStepCoachingForm({
  formData,
  updateFormData,
  onSuccessfulSubmit,
  targetEmail,
}: MultiStepCoachingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    setError(null); // Reset error on navigation attempt
    // Validation for Step 1
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.age || !formData.occupation) {
        setError("Nome, Email, Età e Lavoro/Professione sono obbligatori.");
        return;
      }
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        setError("Inserisci un indirizzo email valido.");
        return;
      }
      if (formData.age && (isNaN(parseInt(formData.age)) || parseInt(formData.age) <= 0)) {
        setError("Inserisci un'età valida.");
        return;
      }
    }
    // Validation for Step 2
    if (currentStep === 2) {
      if (!formData.challenge || !formData.coachingReason) {
        setError("La descrizione della sfida e il motivo della richiesta sono obbligatori.");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handlePrev = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Reset error on submit attempt
    // Validation for Step 3 (final step)
    if (currentStep === TOTAL_STEPS) {
      if (!formData.goals || !formData.availability) {
        setError("La descrizione degli obiettivi e le preferenze di disponibilità sono obbligatorie.");
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/submit-coaching-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, targetEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Errore durante l_invio della richiesta.');
      }
      onSuccessfulSubmit();
    } catch (err: unknown) {
      console.error('Submission error:', err);
      let message = 'Si è verificato un errore. Riprova più tardi.';
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: // Informazioni di Base
        return (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-slate-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                Indirizzo Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-slate-50"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                  Età <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age || ''}
                  onChange={(e) => updateFormData({ age: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-slate-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                  Genere (Opzionale)
                </label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  value={formData.gender || ''}
                  onChange={(e) => updateFormData({ gender: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-slate-50"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                Lavoro / Professione <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                value={formData.occupation || ''}
                onChange={(e) => updateFormData({ occupation: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-slate-50"
                required
              />
            </div>
          </>
        );
      case 2: // La Tua Situazione
        return (
          <>
            <div className="mb-4">
              <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                Qual è la tua sfida principale o l&apos;area su cui vorresti lavorare con il coaching? <span className="text-red-500">*</span>
              </label>
              <textarea
                name="challenge"
                id="challenge"
                rows={3}
                value={formData.challenge}
                onChange={(e) => updateFormData({ challenge: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-slate-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="coachingReason" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                Qual è il motivo principale per cui richiedi una sessione di coaching? <span className="text-red-500">*</span>
              </label>
              <textarea
                name="coachingReason"
                id="coachingReason"
                rows={3}
                value={formData.coachingReason || ''}
                onChange={(e) => updateFormData({ coachingReason: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-slate-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="neurodiversity" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                Hai qualche neurodivergenza o condizione specifica che ritieni utile condividere (es. ADHD, dislessia, ecc.)? (Opzionale)
              </label>
              <input
                type="text"
                name="neurodiversity"
                id="neurodiversity"
                value={formData.neurodiversity || ''}
                onChange={(e) => updateFormData({ neurodiversity: e.target.value })}
                placeholder="Lascia vuoto se non applicabile"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-slate-50"
              />
            </div>
          </>
        );
      case 3: // Obiettivi e Preferenze
        return (
          <>
            <div className="mb-4">
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                Quali obiettivi specifici speri di raggiungere con il coaching? <span className="text-red-500">*</span>
              </label>
              <textarea
                name="goals"
                id="goals"
                rows={3}
                value={formData.goals}
                onChange={(e) => updateFormData({ goals: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-slate-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
                Indica alcuni giorni (es. Lunedì pomeriggio, Martedì mattina) o fasce orarie in cui saresti generalmente disponibile. <span className="text-red-500">*</span>
              </label>
              <textarea
                name="availability"
                id="availability"
                rows={2}
                value={formData.availability}
                onChange={(e) => updateFormData({ availability: e.target.value })}
                placeholder="Es. Lunedì e Mercoledì dopo le 18:00; Sabato mattina"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-slate-50"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Verrai ricontattato per confermare la data e l&apos;ora esatta della sessione.</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">Passo {currentStep} di {TOTAL_STEPS}</h3>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            ></div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="min-h-[280px] sm:min-h-[320px]"> {/* Adjusted min-height for better layout */}
         {renderStep()}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1 || isLoading}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors"
          >
            Precedente
          </button>
          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 disabled:opacity-50 transition-colors"
            >
              Successivo
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-slate-800 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Invio in corso...' : 'Invia Richiesta'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
