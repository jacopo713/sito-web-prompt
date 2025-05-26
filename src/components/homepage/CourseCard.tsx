"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiShoppingCart, FiLoader, FiCheck, FiStar } from 'react-icons/fi';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

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
  priceId?: string;
  highlight?: boolean;
}

interface CourseCardProps {
  course: CourseCardData;
}

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

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
    priceId,
    highlight,
  } = course;

  const { user } = useAuth();
  const router = useRouter();
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckout = async () => {
    setCheckoutError(null);
    if (!user) {
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
        body: JSON.stringify({ priceId: priceId, userId: user.uid }),
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

  const canPurchase = !!priceId;

  return (
    <div
      className={`group relative flex flex-col h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
        highlight 
          ? 'bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/50 dark:via-slate-800 dark:to-purple-950/30 ring-2 ring-indigo-400/50' 
          : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Highlight Badge */}
      {highlight && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-1 animate-pulse">
            <FiStar className="h-3 w-3" />
            <span>CONSIGLIATO</span>
          </div>
        </div>
      )}

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sky-100/50 to-indigo-100/50 dark:from-sky-900/30 dark:to-indigo-900/30 rounded-full blur-xl transform -translate-x-12 translate-y-12"></div>
      </div>

      {/* Header Section */}
      <div className="relative p-6 sm:p-8 flex-grow">
        {/* Icon with Animation */}
        <div className={`inline-flex items-center justify-center p-4 rounded-2xl mb-6 transition-all duration-300 ${
          highlight 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
            : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white'
        } ${isHovered ? 'scale-110 rotate-3' : ''}`}>
          <CourseIcon className="h-8 w-8" />
        </div>

        {/* Course Info */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {title}
          </h3>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {subtitle}
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {price}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 line-through opacity-60">
              €{parseInt(price.replace('€', '')) * 2}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Accesso illimitato • Aggiornamenti gratuiti
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Cosa Include:
          </h4>
          <ul className="space-y-2">
            {features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <FiCheck className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                  highlight ? 'text-indigo-500' : 'text-green-500 group-hover:text-indigo-500'
                }`} />
                <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
            {features.length > 4 && (
              <li className="text-xs text-slate-500 dark:text-slate-400 pl-6">
                +{features.length - 4} altri contenuti...
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Footer/CTA Section */}
      <div className="relative p-6 sm:p-8 pt-0">
        {checkoutError && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-xs text-red-600 dark:text-red-400">{checkoutError}</p>
          </div>
        )}

        {canPurchase && id === "base" ? (
          <button
            onClick={handleCheckout}
            disabled={isLoadingCheckout}
            className={`w-full inline-flex items-center justify-center px-6 py-4 text-base font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
              highlight
                ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/25 hover:shadow-indigo-500/40'
                : 'text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-indigo-600 hover:to-purple-600 hover:shadow-indigo-500/25'
            }`}
          >
            {isLoadingCheckout ? (
              <>
                <FiLoader className="animate-spin mr-2 h-5 w-5" />
                Elaborazione...
              </>
            ) : (
              <>
                <FiShoppingCart className="mr-2 h-5 w-5" />
                {ctaText}
              </>
            )}
          </button>
        ) : ctaLink ? (
          <Link
            href={ctaLink}
            className={`w-full inline-flex items-center justify-center px-6 py-4 text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
              highlight
                ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/40'
                : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40'
            }`}
          >
            {ctaText} <FiArrowRight className="ml-2 h-5 w-5" />
          </Link>
        ) : (
          <button
            disabled
            className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-semibold rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60"
          >
            {ctaText} <FiArrowRight className="ml-2 h-5 w-5" />
          </button>
        )}

        {/* Trust Indicators */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Accesso immediato</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Garanzia 30 giorni</span>
          </div>
        </div>
      </div>
    </div>
  );
}
