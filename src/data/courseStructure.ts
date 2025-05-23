// src/data/courseStructure.ts

export interface Lesson {
  slug: string;
  title: string;
  duration?: string; // Optional: estimated time for lesson
}

export interface Module {
  moduleSlug: string;
  moduleTitle: string;
  lessons: Lesson[];
  isBaseModule?: boolean; // Flag to identify modules from the base course
}

export type LessonStatus = 'completed' | 'current' | 'unlocked' | 'locked';

export const baseCourseStructure: Module[] = [
  {
    moduleSlug: "modulo-1",
    moduleTitle: "Modulo 1: Basi Prompt & Metacognizione",
    lessons: [
      { slug: "lezione-1", title: "Cos'è un Prompt e Perché è Cruciale?", duration: "10 min" },
      { slug: "lezione-2", title: "Struttura del Prompt Efficace e Strategie Chiave", duration: "15 min" },
      { slug: "lezione-3", title: "Introduzione alla Metacognizione nel Prompting", duration: "12 min" },
      { slug: "lezione-4", title: "Pensiero Critico: Valutare le Risposte AI", duration: "18 min" },
    ],
    isBaseModule: true,
  },
  {
    moduleSlug: "modulo-2",
    moduleTitle: "Modulo 2: Tecniche di Prompting e Raffinamento",
    lessons: [
      { slug: "lezione-1-m2", title: "Prompt Creativi vs. Analitici: Adattare la Strategia", duration: "15 min" },
      { slug: "lezione-2-m2", title: "Fornire Contesto Efficace: Guida l'IA", duration: "18 min" },
      { slug: "lezione-3-m2", title: "Tecniche di Raffinamento Iterativo", duration: "20 min" },
    ],
    isBaseModule: true,
  },
  {
    moduleSlug: "modulo-3",
    moduleTitle: "Modulo 3: Mindset e Abilità Efficaci con l'IA",
    lessons: [
      { slug: "lezione-1-m3", title: "Gestione dell'Attenzione e Focus con l'IA", duration: "15 min" },
      { slug: "lezione-2-m3", title: "Curiosità Epistemica e Domande Esplorative", duration: "18 min" },
      { slug: "lezione-3-m3", title: "Analisi Logica e Comprensione degli Output", duration: "22 min" },
    ],
    isBaseModule: true,
  }
];

export const intermediateCourseModules: Module[] = [
  {
    moduleSlug: "modulo-4-int",
    moduleTitle: "Modulo 4 (Intermedio): Prompt Design Avanzato",
    lessons: [
      { slug: "lezione-1-m4i", title: "Tecniche di Chaining e Sequential Prompting", duration: "25 min" },
      { slug: "lezione-2-m4i", title: "Gestire Task Complessi con l'IA", duration: "30 min" },
      { slug: "lezione-3-m4i", title: "Role Prompting Estremo e Personas Multiple", duration: "20 min" },
    ],
    isBaseModule: false,
  },
  {
    moduleSlug: "modulo-5-int",
    moduleTitle: "Modulo 5 (Intermedio): Metacognizione Applicata e Strategie",
    lessons: [
      { slug: "lezione-1-m5i", title: "Monitoraggio Attivo delle Strategie Cognitive", duration: "25 min" },
      { slug: "lezione-2-m5i", title: "Flessibilità Cognitiva: Testare e Adattare Approcci", duration: "28 min" },
      { slug: "lezione-3-m5i", title: "Problem Solving Strategico con l'IA (Base)", duration: "30 min" },
    ],
    isBaseModule: false,
  },
  {
    moduleSlug: "modulo-6-int",
    moduleTitle: "Modulo 6 (Intermedio): Pensiero Critico e Analisi Logica Sviluppata",
    lessons: [
      { slug: "lezione-1-m6i", title: "Identificare Bias Cognitivi e Limiti dell'IA", duration: "25 min" },
      { slug: "lezione-2-m6i", title: "Analisi della Coerenza Logica in Output Complessi", duration: "28 min" },
      { slug: "lezione-3-m6i", title: "Valutazione Etica e Implicazioni dei Prompt", duration: "22 min" },
    ],
    isBaseModule: false,
  }
];

// Struttura completa del corso intermedio (Base + Intermedio)
export const intermediateCourseStructure: Module[] = [
  ...baseCourseStructure,
  ...intermediateCourseModules
];

// Helper function to get a flat list of all lessons for the BASE course
export const getBaseFlatLessons = (structure: Module[] = baseCourseStructure): { fullSlug: string; moduleSlug: string; moduleTitle: string; lesson: Lesson }[] => {
  const lessons: { fullSlug: string; moduleSlug: string; moduleTitle: string; lesson: Lesson }[] = [];
  structure.forEach(module => {
    module.lessons.forEach(lesson => {
      lessons.push({
        fullSlug: `/corsi/base/${module.moduleSlug}/${lesson.slug}`,
        moduleSlug: module.moduleSlug,
        moduleTitle: module.moduleTitle,
        lesson
      });
    });
  });
  return lessons;
};

// Helper function to get a flat list of all lessons for the INTERMEDIATE course
export const getIntermediateFlatLessons = (structure: Module[] = intermediateCourseStructure): { fullSlug:string; moduleSlug: string; moduleTitle: string; lesson: Lesson; isBaseModule?: boolean }[] => {
  const lessons: { fullSlug: string; moduleSlug: string; moduleTitle: string; lesson: Lesson; isBaseModule?: boolean }[] = [];
  structure.forEach(module => {
    module.lessons.forEach(lesson => {
      // Determina il path base a seconda se il modulo è del corso base o intermedio
      const coursePathSegment = module.isBaseModule ? 'base' : 'medio';
      lessons.push({
        fullSlug: `/corsi/${coursePathSegment}/${module.moduleSlug}/${lesson.slug}`,
        moduleSlug: module.moduleSlug,
        moduleTitle: module.moduleTitle,
        lesson,
        isBaseModule: module.isBaseModule
      });
    });
  });
  return lessons;
};
