// src/types/index.ts
export interface FormData {
  name: string;
  email: string;
  age?: string; // Nuovo: Età (opzionale, ma possiamo renderlo obbligatorio nel form)
  gender?: string; // Nuovo: Sesso (opzionale)
  occupation?: string; // Nuovo: Lavoro (opzionale)
  challenge: string; // Mantenuto
  coachingReason?: string; // Nuovo: Motivo richiesta coaching
  goals: string; // Mantenuto
  neurodiversity?: string; // Nuovo: Eventuali neurodivergenze (opzionale)
  availability: string; // Modificato: per ora testo libero per preferenze giorno/orario
}
