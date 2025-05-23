"use client"; // Necessario per useState, useEffect, onClick handlers

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiShoppingCart, FiLoader } from 'react-icons/fi';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/context/AuthContext'; // Per ottenere l'utente loggato
import { useRouter } from 'next/navigation'; // Per reindirizzare al login

// Define the structure for a single course, to be passed as a prop
export interface CourseCardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  icon: React.ElementType;
  features: string[];
  ctaText: string;
  ctaLink?: string;
  priceId?: string; // ID del prezzo Stripe
  highlight?: boolean;
}

interface CourseCardProps {
  course: CourseCardData;
}

// Inizializza Stripe fuori dal componente per non ricaricarlo ad ogni render
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

/**
 * Displays a single course card.
 */
export default function CourseCard({ course }: CourseCardProps) {
  const {
    id,
    title,
    subtitle,
    description,
    price,
    icon: CourseIcon,
    features,
    ctaText,
    ctaLink,
    priceId, // ID del prezzo Stripe
    highlight,
  } = course;

  const { user } = useAuth(); // Ottieni l'utente corrente
  const router = useRouter();
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setCheckoutError(null);
    if (!user) {
      // Se l'utente non è loggato, reindirizza alla pagina di login
      // passando la pagina corrente come `redirect` query param
      // così da poter tornare qui dopo il login.
      // Per ora, assumiamo che l'acquisto sia possibile solo da loggati.
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (!priceId) {
      setCheckoutError("Price ID non configurato per questo corso.");
      console.error("Price ID mancante per il corso:", title);
      return;
    }
    if (!stripePromise) {
      setCheckoutError("Configurazione Stripe mancante (chiave pubblicabile).");
      console.error("Stripe Publishable Key non trovata.");
      return;
    }

    setIsLoadingCheckout(true);

    try {
      const response = await fetch('/api/checkout-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: priceId, userId: user.uid }), // Passa l'ID utente
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore nella creazione della sessione di checkout.');
      }

      const { sessionId } = data;
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Errore durante il redirect a Stripe:", error);
          setCheckoutError(error.message || "Errore durante il reindirizzamento al pagamento.");
        }
      } else {
        setCheckoutError("Errore nell'inizializzazione di Stripe.");
      }
    } catch (err: unknown) {
      console.error("Errore handleCheckout:", err);
      const message = err instanceof Error ? err.message : "Si è verificato un errore sconosciuto.";
      setCheckoutError(message);
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  const canPurchase = !!priceId; // Il corso è acquistabile se ha un priceId

  return (
    <div
      className={`flex flex-col rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1
        ${highlight ? 'bg-indigo-50 dark:bg-indigo-900/30 ring-2 ring-indigo-500' : 'bg-white dark:bg-slate-800'}`}
    >
      <div className={`p-6 ${highlight ? 'pt-8' : 'pt-6'} relative`}>
        {highlight && (
          <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            CONSIGLIATO
          </div>
        )}
        <div className={`inline-flex items-center justify-center p-3 rounded-lg mb-3
          ${highlight ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'}`}
        >
          <CourseIcon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">{subtitle}</p>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 min-h-[6rem] sm:min-h-[5rem] md:min-h-[6rem] lg:min-h-[5.5rem]">{description}</p>
      </div>

      <div className={`px-6 pb-6 flex-grow flex flex-col justify-between ${highlight ? 'pt-0' : 'pt-4'}`}>
        <div>
          <p className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{price}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Accesso Illimitato</p>

          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className={`flex-shrink-0 h-5 w-5 mr-2 mt-0.5 ${highlight ? 'text-indigo-500' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {checkoutError && (
          <p className="text-xs text-red-500 dark:text-red-400 mb-2 text-center">{checkoutError}</p>
        )}

        {canPurchase && id === "base" ? ( // Se ha priceId ED è il corso base (o qualsiasi corso tu voglia rendere acquistabile)
          <button
            onClick={handleCheckout}
            disabled={isLoadingCheckout}
            className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm transition-colors
              ${highlight
                ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 focus:ring-indigo-400'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-60`}
          >
            {isLoadingCheckout ? (
              <FiLoader className="animate-spin mr-2 h-5 w-5" />
            ) : (
              <FiShoppingCart className="mr-2 h-5 w-5" />
            )}
            {isLoadingCheckout ? 'Attendere...' : ctaText}
          </button>
        ) : ctaLink ? ( // Se non è acquistabile direttamente via Stripe MA ha un ctaLink
          <Link
            href={ctaLink}
            className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm transition-colors
              ${highlight
                ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 focus:ring-indigo-400'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900`}
          >
            {ctaText} <FiArrowRight className="ml-2 h-5 w-5" />
          </Link>
        ) : ( // Bottone disabilitato se non c'è né priceId (per questo corso) né ctaLink
          <button
            type="button"
            disabled
            className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm
              ${highlight
                ? 'text-white bg-indigo-400 cursor-not-allowed'
                : 'text-indigo-400 bg-indigo-50 cursor-not-allowed dark:text-indigo-700 dark:bg-indigo-900/20'}
              opacity-60`}
          >
            {ctaText} <FiArrowRight className="ml-2 h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
