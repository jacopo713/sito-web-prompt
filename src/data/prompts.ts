// src/data/prompts.ts

export interface Prompt {
  id: string;
  title: string;
  description: string;
  promptBody?: string; // Testo effettivo del prompt da copiare (opzionale)
  category: string;
  tags: string[];
}

export const samplePrompts: Prompt[] = [
  {
    id: "p12",
    title: "Analisi Validità Studio Scientifico",
    description: "Valuta l'oggettività e la validità di uno studio scientifico (Studio 1), analizzando dati, esperimenti e risultati per determinare se sono necessarie ulteriori conferme.",
    promptBody: "Ragiona passo dopo passo su questo studio (Studio 1) e valuta se è oggettivamente valido o se sono necessari altri studi per confermare il risultato ottenuto, per farlo analizza i dati raccolti e gli esperimenti effettuati e i relativi risultati.",
    category: "Analisi Dati & Business", // O "Ricerca & Accademia"
    tags: ["analisi studio", "ricerca scientifica", "validità", "dati", "esperimenti", "metodologia", "peer review"]
  },
  {
    id: "p13",
    title: "Generatore Idee Innovative con Analisi Difficoltà",
    description: "Richiede 10 idee innovative e creative su temi diversificati, con una valutazione della fattibilità e del livello di difficoltà per la loro implementazione.",
    promptBody: "ciao, avrei bisogno di 10 idee innovative che coprano temi diversificati, le idee devono essere creative e allo stesso tempo avere fattibilità, per ogni idea innovativa spiega il livello di difficoltà per metterla in pratica, ti ringrazio",
    category: "Creatività & Marketing",
    tags: ["idee innovative", "creatività", "fattibilità", "brainstorming", "livello difficoltà", "multi-settore", "analisi preliminare"]
  }
];
