import React from 'react';

/**
 * Footer component for the homepage.
 */
export default function FooterHomepage() {
  return (
    <footer className="text-center py-8 border-t border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        &copy; {new Date().getFullYear()} Fagyl Corsi. Potenzia la tua interazione AI.
      </p>
    </footer>
  );
}
