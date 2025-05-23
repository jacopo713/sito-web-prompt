"use client"; // Required because Recharts components are client components

import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
// Potrebbe essere necessario importare tipi specifici da recharts se disponibili, es:
// import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

export interface IndicatorCardData {
  id: string;
  name: string;
  level: string;
  score: number | null;
  description: string;
  currentEMA: number | null;
  chartData: {
    sessionName: string;
    rawScore: number | null;
    emaScore: number | null;
  }[];
  emaPeriod?: number;
}

interface IndicatorCardProps {
  indicator: IndicatorCardData;
  emaPeriod: number;
}

const getLevelColorClasses = (level: string): string => {
  if (level === "Non Valutabile") {
    return "bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-300";
  }
  if (level.includes("Limitata") || level.includes("Carente") || level.includes("Rigida") || level.includes("Superficiale") || level.includes("Poco Evidente") || level.includes("Molto Limitata")) {
    return "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-200";
  }
  if (level.includes("Moderata") || level.includes("Standard") || level.includes("Sufficiente") || level.includes("Discreto") || level.includes("Occasionale") || level.includes("Parzialmente")) {
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200";
  }
  return "bg-sky-100 text-sky-700 dark:bg-sky-700 dark:text-sky-200";
};

export default function IndicatorCard({ indicator, emaPeriod }: IndicatorCardProps) {
  const { name, level, score, description, currentEMA, chartData } = indicator;

  const levelColor = getLevelColorClasses(level);
  const hasChartData = chartData && chartData.filter(d => d.rawScore !== null || d.emaScore !== null).length >= 1;

  // Definizione del tipo per i parametri del formatter di Recharts (più generica)
  // ValueType può essere string, number, o un array di string/number
  // NameType è generalmente string o number
  type TooltipFormatter = (
    value: string | number | (string | number)[] | null, // Modificato per essere più generico
    name: string | number, // Modificato per essere più generico
    // entry: any, // entry può fornire più contesto, ma iniziamo senza per semplicità
    // index: number,
    // payload: any[] // payload contiene i dati del punto specifico
  ) => [string | number, string];


  const customTooltipFormatter: TooltipFormatter = (value, name) => {
    let displayValue: string | number;
    if (value === null || value === undefined) {
      displayValue = 'N/V';
    } else if (typeof value === 'number') {
      displayValue = value; // Mantieni come numero se è un numero
    } else if (Array.isArray(value)) {
      // Gestisci il caso in cui value è un array (es. range per BarChart)
      // Per LineChart, solitamente non è un array, ma lo gestiamo per robustezza
      displayValue = value.join(', ');
    }
    else {
      displayValue = String(value); // Converte in stringa per altri casi
    }
    
    // Assicurati che 'name' sia una stringa per la visualizzazione
    const displayName = String(name);

    return [displayValue, displayName];
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col">
      <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-1">{name}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 italic">&quot;{description}&quot;</p>

      <div className="mb-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Livello Osservato (Ultima Sessione):
        </span>
        <span className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${levelColor}`}>
          {level}
        </span>
      </div>

      <div className="mb-1">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Andamento Consolidato (EMA {emaPeriod} val.):
        </span>
        <span className="ml-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">
          {currentEMA !== null ? currentEMA.toFixed(0) : 'N/A'}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400"> / 100</span>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-6 overflow-hidden border border-slate-300 dark:border-slate-600 mb-3">
        <div
          className={`${currentEMA === null ? 'bg-slate-300 dark:bg-slate-600' : 'bg-gradient-to-r from-sky-400 to-indigo-500'} h-full rounded-full text-xs flex items-center justify-center text-white font-medium shadow-inner transition-all duration-500 ease-out`}
          style={{ width: `${currentEMA !== null ? Math.max(5, currentEMA) : 100}%` }}
          title={`Andamento Consolidato (EMA): ${currentEMA !== null ? currentEMA.toFixed(0) : 'N/A'}`}
        >
          {currentEMA !== null ? (currentEMA >= 15 ? currentEMA.toFixed(0) : '') : 'N/A'}
        </div>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0 text-right mb-4">
        Punteggio ultima sessione: {score !== null ? score : 'N/V'}
      </p>

      {hasChartData ? (
        <div className="mt-auto">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 flex items-center">
            <FiTrendingUp className="mr-2 h-4 w-4 text-slate-500" />
            Storico Sessioni
          </h4>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: -25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="sessionName" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '12px',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                  itemStyle={{ color: '#1e293b' }}
                  formatter={customTooltipFormatter} // Usa la funzione custom
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line type="monotone" dataKey="rawScore" name="Punteggio Sessione" stroke="#8884d8" strokeWidth={2} connectNulls={false} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="emaScore" name={`EMA (${emaPeriod} val.)`} stroke="#82ca9d" strokeWidth={2} connectNulls={false} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="mt-auto text-center py-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">Nessuno storico grafico disponibile per questo indicatore.</p>
        </div>
      )}
    </div>
  );
}
