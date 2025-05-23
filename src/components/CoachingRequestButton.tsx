// src/components/CoachingRequestButton.tsx
'use client';

import React from 'react';
import Link from 'next/link'; // Necessario per la funzionalità di link

interface CoachingRequestButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}

/**
 * Reusable button component for coaching requests.
 * Prioritizes onClick for button behavior, otherwise acts as a Link if href is provided.
 */
export default function CoachingRequestButton({
  text = "Richiedi una Sessione di Coaching", // Testo di default
  className = "",
  onClick,
  href,
}: CoachingRequestButtonProps) {
  const buttonStyles = `
    inline-block px-8 py-4 font-semibold text-white
    bg-gradient-to-r from-blue-600 to-indigo-700
    rounded-lg shadow-md
    hover:from-blue-700 hover:to-indigo-800
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
    transition duration-150 ease-in-out
    text-center cursor-pointer
    ${className}
  `;

  // Se onClick è fornito, il componente DEVE essere un bottone che esegue l'azione.
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={buttonStyles}
        type="button" // Importante per evitare submit indesiderati se dentro un form
      >
        {text}
      </button>
    );
  }

  // Se onClick NON è fornito, MA href è fornito, allora è un link.
  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {text}
      </Link>
    );
  }

  // Fallback: se né onClick né href sono forniti,
  // è un bottone stilizzato ma non interattivo (o con stile di default).
  // Considera di disabilitarlo o dargli un ruolo chiaro.
  return (
    <button
      className={buttonStyles}
      type="button"
      disabled
    >
      {text}
    </button>
  );
}
