// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Assicurati che l'import usi l'alias corretto
import { AuthProvider } from "@/context/AuthContext"; // IMPORTA AuthProvider

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Fagyl Corsi - Impara a Creare Prompt AI Efficaci",
  description: "Diventa un esperto nella creazione di prompt per intelligenza artificiale con i nostri corsi online. Massimizza il potenziale dei chatbot e degli strumenti AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={inter.className}>
      <body className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <AuthProvider> {/* AVVOLGI CON AuthProvider */}
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          {/* Potresti aggiungere un Footer globale qui */}
        </AuthProvider>
      </body>
    </html>
  );
}
