"use client";

import React from 'react';
import { FiCpu, FiAlertTriangle, FiSend } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  error?: boolean;
  isLoadingStream?: boolean;
}

interface AICoachSectionProps {
  messages: Message[];
  userInput: string;
  onUserInputChge: (value: string) => void;
  onSendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  // Modifica qui: accetta che la ref possa contenere null
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function AICoachSection({
  messages,
  userInput,
  onUserInputChge,
  onSendMessage,
  isLoading,
  messagesEndRef,
}: AICoachSectionProps) {
  return (
    <section id="practice-section" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-800/60 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Migliora i Tuoi Prompt con l&apos;AI Coach
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Scrivi qui sotto un prompt che vorresti usare. Il nostro assistente AI, basato su DeepSeek, lo analizzerà e ti darà suggerimenti per ottimizzarlo.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl flex flex-col h-[70vh] max-h-[650px] sm:max-h-[700px] overflow-hidden border border-slate-200 dark:border-slate-700">
          <header className="bg-slate-50 dark:bg-slate-700/50 p-3 sm:p-4 border-b border-slate-200 dark:border-slate-600">
            <div className="flex items-center">
              <FiCpu className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-indigo-500 dark:text-indigo-400" />
              <h3 className="text-md sm:text-lg font-semibold text-slate-700 dark:text-slate-200">AI Prompt Metacognition Coach (DeepSeek)</h3>
            </div>
          </header>

          <div className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[75%] p-3 sm:p-4 rounded-xl shadow-md text-sm sm:text-base ${
                    msg.sender === 'user'
                      ? 'bg-indigo-500 text-white dark:bg-indigo-600'
                      : msg.error
                      ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100 border border-red-300 dark:border-red-600'
                      : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100'
                  } ${msg.isLoadingStream && msg.sender === 'bot' && !msg.error ? 'animate-pulse' : ''}`}
                >
                  {msg.error && <FiAlertTriangle className="inline mr-1.5 mb-0.5 h-5 w-5" />}
                  {msg.sender === 'bot' ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed break-words">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text || (msg.isLoadingStream ? "" : "...")}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap leading-relaxed break-words">{msg.text}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1.5 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={onSendMessage} className="border-t border-slate-200 dark:border-slate-600 p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => onUserInputChge(e.target.value)}
                placeholder={isLoading ? "L'AI Coach sta analizzando..." : "Scrivi un prompt da analizzare..."}
                className="flex-grow p-3 sm:p-4 border border-slate-300 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none dark:bg-slate-700 dark:text-white disabled:opacity-60 transition-shadow focus:shadow-md"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !userInput.trim()}
                className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold p-3 sm:p-4 rounded-lg disabled:opacity-50 transition-all duration-150 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 flex items-center justify-center h-[48px] w-[48px] sm:h-[56px] sm:w-[56px] flex-shrink-0"
                aria-label="Analizza il prompt con l'AI Coach"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <FiSend className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
