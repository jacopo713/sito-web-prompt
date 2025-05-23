// src/components/Header.tsx
import React from 'react';
import Link from 'next/link'; // Import Link for client-side navigation

/**
 * Props for the Header component.
 * @interface HeaderProps
 * @property {string} siteTitle - The title of the site to be displayed in the header.
 */
interface HeaderProps {
  siteTitle: string;
}

/**
 * Header component for the application.
 * Displays the site title and potentially navigation links.
 * @param {HeaderProps} props - The properties passed to the component.
 * // L'annotazione JSDoc @returns è stata rimossa o può essere cambiata in @returns {React.ReactElement}
 */
// Omettiamo il tipo di ritorno esplicito : JSX.Element
export default function Header({ siteTitle }: HeaderProps) {
  return (
    <header className="bg-slate-800 dark:bg-slate-950 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4 h-16">
        <Link href="/" className="text-xl sm:text-2xl font-bold hover:text-sky-400 transition-colors">
          {siteTitle}
        </Link>
        <nav>
          {/* Navigation links can be added here later */}
          {/* Example: <Link href="/about" className="hover:text-sky-400">About</Link> */}
        </nav>
      </div>
    </header>
  );
}
