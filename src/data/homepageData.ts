import React from 'react';
import { FiZap, FiLayers, FiBriefcase, FiEdit, FiBookOpen, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { FaBrain, FaGraduationCap } from 'react-icons/fa';

// Interface for Course Data
export interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  icon: React.ElementType;
  features: string[];
  ctaText: string;
  ctaLink?: string; // Link per navigazione diretta
  priceId?: string; // NUOVO: ID del prezzo Stripe
  highlight?: boolean;
}

// Interface for Target Audience Item
export interface TargetAudienceData {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const coursesData: CourseData[] = [
  {
    id: "base",
    title: "Prompting Efficace e Metacognizione Iniziale",
    subtitle: "Le fondamenta per dialogare con l'IA",
    description: "Parti con il piede giusto: impara a formulare prompt chiari, a valutare criticamente le risposte AI e a sviluppare la consapevolezza del tuo processo di pensiero.",
    price: "€47",
    icon: FiZap,
    features: [
      "Fondamenti di Prompt Design: struttura, chiarezza, contesto",
      "Introduzione alla Metacognizione: osserva e valuta i tuoi prompt",
      "Pensiero Critico Base: riconoscere errori e output inadeguati",
      "Tecniche di Raffinamento: migliorare i tuoi prompt passo-passo",
      "Gestione dell'Attenzione: usare l'IA senza distrazioni",
      "Stimolare la Curiosità Epistemica: fare le domande giuste all'IA",
      "Abilità Logico-Analitiche Iniziali: capire perché un prompt funziona",
    ],
    ctaText: "Acquista Ora il Corso Base", // Testo modificato
    priceId: "price_1RRHuIApK1iq6ElBlNYHVCsf", // ID del prezzo per il corso base
    // ctaLink: "/corsi/base" // Rimosso o commentato, il click gestirà il checkout
  },
  {
    id: "medio",
    title: "Metacognizione Applicata e Prompting Avanzato",
    subtitle: "Flessibilità e strategia per risultati superiori",
    description: "Approfondisci le tue abilità: adatta il linguaggio, gestisci task complessi, affina il pensiero critico e usa la metacognizione per iterare efficacemente con l'IA. Include tutti i contenuti del Corso Base.",
    price: "€97",
    icon: FiLayers,
    features: [
      "Tutto del Corso Base, potenziato!",
      "Prompt Design Intermedio: task creativi, analitici e misti",
      "Metacognizione Applicata: monitora e regola le tue strategie",
      "Pensiero Critico Sviluppato: identificare bias e coerenza logica",
      "Flessibilità Cognitiva: adattare approcci e testare alternative",
      "Problem Solving Strategico (Base): scomporre problemi, brainstorming con IA",
      "Abilità Logico-Analitiche Sviluppate: analizzare le risposte complesse",
      "Raffinamento iterativo dei prompt per obiettivi specifici",
    ],
    ctaText: "Acquista Ora il Corso Intermedio", // Per coerenza, anche se non implementiamo subito il checkout per questo
    priceId: "PRICE_ID_CORSO_MEDIO_QUI", // Placeholder per il futuro Price ID del corso medio
    // ctaLink: "/corsi/medio",
    highlight: true,
  },
  {
    id: "avanzato",
    title: "Padronanza Metacognitiva e Ingegneria del Prompt",
    subtitle: "Guida l'IA con maestria olistica e strategica",
    description: "Diventa un vero esperto: orchestra prompt complessi, risolvi problemi sfidanti, usa l'IA per l'autoapprendimento e guida l'evoluzione della tua interazione uomo-macchina.",
    price: "€167",
    icon: FaBrain,
    features: [
      "Tutto del Corso Medio, elevato all'eccellenza!",
      "Ingegneria del Prompt Avanzata: chaining, mega-prompt, meta-prompting",
      "Metacognizione Olistica e Strategica: pianificazione e previsione",
      "Pensiero Critico Esperto: valutazione etica e limiti dei modelli",
      "Problem Solving Strategico Avanzato: innovazione e gestione dell'ambiguità",
      "Autoapprendimento Continuo con l'IA: piani di crescita personalizzati",
      "Flessibilità Cognitiva Superiore: integrare l'IA in processi innovativi",
      "Comprensione approfondita per massimizzare output specialistici",
    ],
    ctaText: "Prossimamente",
    // priceId: "PRICE_ID_CORSO_AVANZATO_QUI", // Placeholder
  },
];

export const targetAudienceData: TargetAudienceData[] = [
  {
    icon: FiBriefcase,
    title: "Professionisti e Manager",
    description: "Ottimizza flussi di lavoro, analizza dati complessi e prendi decisioni strategiche più informate integrando l'IA nelle tue attività quotidiane."
  },
  {
    icon: FiEdit,
    title: "Creativi e Content Creator",
    description: "Supera i blocchi creativi, genera idee innovative per testi, immagini e strategie, e personalizza contenuti con un'efficacia senza precedenti."
  },
  {
    icon: FaGraduationCap,
    title: "Studenti e Ricercatori",
    description: "Potenzia le tue ricerche, analizza fonti, riassumi testi complessi e struttura i tuoi studi in modo più efficiente e approfondito."
  },
  {
    icon: FiTrendingUp,
    title: "Imprenditori e Innovatori",
    description: "Esplora nuove opportunità di business, valida idee, automatizza task e rimani all'avanguardia sfruttando la potenza dell'IA generativa."
  },
  {
    icon: FiBookOpen,
    title: "Appassionati di Apprendimento",
    description: "Soddisfa la tua curiosità, impara nuove competenze e scopri come l'IA può diventare un potente alleato nel tuo percorso di crescita personale."
  },
  {
    icon: FiUsers,
    title: "Chiunque Voglia Migliorare",
    description: "Se desideri comunicare in modo più efficace, pensare in modo più critico e sfruttare gli strumenti AI del futuro, questi corsi sono per te."
  }
];
