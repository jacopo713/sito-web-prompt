"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FiAlertTriangle, FiInfo, FiBarChart2, FiTrash2, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import IndicatorCard from '@/components/dashboard/IndicatorCard';
import type { IndicatorCardData } from '@/components/dashboard/IndicatorCard';

interface DashboardAnalyzedIndicator {
  id: string;
  name: string;
  level: string;
  score: number | null;
  description: string;
}

interface CognitiveProfile {
  analysisTimestamp: string;
  cognitiveIndicators: DashboardAnalyzedIndicator[];
  limitations: string;
  chatSessionId?: string;
}

const LOCAL_STORAGE_COGNITIVE_PROFILES_KEY = 'aiChatCognitiveProfiles_v2';
const EMA_PERIOD = 10;
const MAX_EMA_CHANGE_PER_STEP = 10;

const capScoreChange = (newScore: number, previousScore: number | null, maxChange: number = MAX_EMA_CHANGE_PER_STEP): number => {
  if (previousScore === null) return newScore;
  const diff = newScore - previousScore;
  if (Math.abs(diff) > maxChange) {
    return previousScore + (diff > 0 ? maxChange : -maxChange);
  }
  return newScore;
};

const calculateEMAWithCappingAndNulls = (data: (number | null)[], period: number, maxChangePerStep: number = MAX_EMA_CHANGE_PER_STEP): (number | null)[] => {
  if (!data || data.length === 0) return [];
  const k = 2 / (period + 1);
  const emas: (number | null)[] = Array(data.length).fill(null);
  let lastValidEma: number | null = null;

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== null) {
      const currentDataPoint = data[i] as number;
      if (lastValidEma !== null) {
        const uncapedEma = currentDataPoint * k + lastValidEma * (1 - k);
        emas[i] = capScoreChange(uncapedEma, lastValidEma, maxChangePerStep);
      } else {
        emas[i] = currentDataPoint;
      }
      lastValidEma = emas[i];
    } else {
      emas[i] = null;
      // lastValidEma = null; // Commentato: l'EMA dovrebbe continuare dal precedente valore valido, non resettarsi per ogni null
    }
  }
  // Fill forward null EMAs with the last valid EMA if a null score follows valid scores
  let forwardFillEma: number | null = null;
  for (let i = 0; i < emas.length; i++) {
    if (emas[i] !== null) {
      forwardFillEma = emas[i];
    } else if (forwardFillEma !== null && data[i] === null) { // Only fill forward if original data was null
      // emas[i] = forwardFillEma; // Disabilitato per ora, l'EMA si interrompe con dati nulli
    }
  }
  return emas;
};

// ProcessedIndicatorForDashboard rimosso, si usa direttamente IndicatorCardData

export default function DashboardPage() {
  const [profiles, setProfiles] = useState<CognitiveProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProfiles = localStorage.getItem(LOCAL_STORAGE_COGNITIVE_PROFILES_KEY);
      if (storedProfiles) {
        try {
          setProfiles(JSON.parse(storedProfiles) as CognitiveProfile[]);
        } catch (e) {
          console.error("Error parsing cognitive profiles from localStorage", e);
          setProfiles([]);
        }
      }
      setIsLoading(false);
    }
  }, []);

  const processedIndicators = useMemo((): IndicatorCardData[] => {
    if (!profiles.length) return [];

    const sortedProfiles = [...profiles].sort((a, b) => new Date(a.analysisTimestamp).getTime() - new Date(b.analysisTimestamp).getTime());

    const indicatorMap = new Map<string, {
      name: string;
      scores: (number | null)[];
      lastLevel: string;
      lastDescription: string;
    }>();

    sortedProfiles.forEach(profile => {
      if (profile.cognitiveIndicators && Array.isArray(profile.cognitiveIndicators)) {
        profile.cognitiveIndicators.forEach(indicator => {
          if (!indicatorMap.has(indicator.id)) {
            indicatorMap.set(indicator.id, { name: indicator.name, scores: [], lastLevel: indicator.level, lastDescription: indicator.description });
          }
          const entry = indicatorMap.get(indicator.id)!;
          entry.scores.push(indicator.score);
          entry.lastLevel = indicator.level; // Update with the latest profile's level
          entry.lastDescription = indicator.description; // Update with the latest profile's description
        });
      }
    });

    const result: IndicatorCardData[] = [];
    indicatorMap.forEach((data, id) => {
      const rawScores = data.scores;
      const emaValues = calculateEMAWithCappingAndNulls(rawScores, EMA_PERIOD, MAX_EMA_CHANGE_PER_STEP);

      const chartData = rawScores.map((score, index) => ({
        sessionName: `S${index + 1}`,
        rawScore: score,
        emaScore: emaValues[index] !== undefined && emaValues[index] !== null ? Math.round(emaValues[index] as number) : null,
      }));

      const lastRawScore = rawScores.length > 0 ? rawScores[rawScores.length - 1] : null;
      let currentEmaValue: number | null = null;
      // Find the last non-null EMA value
      for (let i = emaValues.length - 1; i >= 0; i--) {
        if (emaValues[i] !== null) {
          currentEmaValue = Math.round(emaValues[i] as number);
          break;
        }
      }

      result.push({
        id,
        name: data.name,
        level: data.lastLevel, // Use the last recorded level for the indicator
        score: lastRawScore, // Last raw score from the history
        description: data.lastDescription, // Use the last recorded description
        currentEMA: currentEmaValue,
        chartData: chartData,
        // emaPeriod: EMA_PERIOD, // emaPeriod is passed as a separate prop to IndicatorCard
      });
    });
    return result.sort((a,b) => a.name.localeCompare(b.name));
  }, [profiles]);

  const handleClearHistory = () => {
    if (typeof window !== 'undefined') {
      if (confirm("Sei sicuro di voler cancellare tutto lo storico dei profili cognitivi? Questa azione è irreversibile.")) {
        localStorage.removeItem(LOCAL_STORAGE_COGNITIVE_PROFILES_KEY);
        setProfiles([]);
      }
    }
  };

  if (isLoading) {
      return <div className="flex justify-center items-center h-screen"><FiRefreshCw className="animate-spin h-8 w-8 text-indigo-500" /> <span className="ml-3">Caricamento Dashboard...</span></div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <FiBarChart2 className="h-8 w-8 mr-3 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              Dashboard Cognitiva Indicativa
            </h1>
          </div>
          <div className="flex space-x-3">
            <button
                onClick={handleClearHistory}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md shadow-sm flex items-center transition-colors"
                title="Cancella tutto lo storico dei profili"
            >
                <FiTrash2 className="mr-2 h-4 w-4" /> Cancella Storico
            </button>
            <Link href="/ai-chat">
              <span className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm flex items-center transition-colors cursor-pointer">
                <FiArrowLeft className="mr-2 h-4 w-4" /> Torna alla Chat
              </span>
            </Link>
          </div>
        </header>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-500 dark:text-yellow-300 p-4 rounded-md shadow-md mb-8" role="alert">
          <div className="flex items-start">
            <FiAlertTriangle className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-1">Disclaimer Importante</h3>
              <p className="text-sm">
                I dati e i grafici presentati in questa dashboard sono basati su un&apos;analisi qualitativa approssimativa degli input testuali forniti durante le sessioni di chat.
                <strong>NON rappresentano una valutazione psicometrica formale, né una diagnosi delle tue capacità cognitive.</strong>
              </p>
              <p className="text-sm mt-1">
                L&apos;obiettivo è unicamente quello di fornire spunti di riflessione indicativi. I &quot;punteggi&quot; sono indici relativi. L&apos;andamento consolidato (EMA) è calcolato sulle ultime {EMA_PERIOD} sessioni valutabili (ignorando quelle &quot;Non Valutabili&quot;) per smussare le variazioni (con variazione massima per passo di {MAX_EMA_CHANGE_PER_STEP} punti). I grafici mostrano i punteggi grezzi di ogni sessione (&quot;Punteggio Sessione&quot;, con interruzioni se non valutabile) e l&apos;andamento dell&apos;EMA. Usa queste informazioni con consapevolezza.
              </p>
            </div>
          </div>
        </div>

        {processedIndicators.length === 0 && !isLoading && (
          <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <FiInfo className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-lg font-medium text-slate-900 dark:text-slate-50">Nessun dato disponibile</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Non ci sono ancora profili cognitivi salvati. Inizia a chattare per generarli.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8">
          {processedIndicators.map((indicator) => (
            <IndicatorCard key={indicator.id} indicator={indicator} emaPeriod={EMA_PERIOD} />
          ))}
        </div>

        {profiles.length > 0 && (
            <div className="mt-10 text-center text-xs text-slate-500 dark:text-slate-400">
                <p>Analisi basata su {profiles.length} sessione{profiles.length === 1 ? '' : 'i'} di chat registrate.</p>
                {profiles[profiles.length -1]?.limitations && (
                    <p className="mt-1 italic">{profiles[profiles.length -1]?.limitations}</p>
                )}
            </div>
        )}
      </div>
    </div>
  );
}
