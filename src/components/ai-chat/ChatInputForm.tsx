import React from 'react';
import { FiSend } from 'react-icons/fi';

interface ChatInputFormProps {
  userInput: string;
  onUserInputChge: (value: string) => void;
  onSendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  isLoadingProfile: boolean; // Added to disable form during profile loading
}

/**
 * Form for user input and sending messages.
 */
export default function ChatInputForm({
  userInput,
  onUserInputChge,
  onSendMessage,
  isLoading,
  isLoadingProfile,
}: ChatInputFormProps) {
  return (
    <form onSubmit={onSendMessage} className="border-t border-slate-200 dark:border-slate-600 p-3 sm:p-4 bg-slate-100 dark:bg-slate-800">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <input
          type="text"
          value={userInput}
          onChange={(e) => onUserInputChge(e.target.value)}
          placeholder={isLoading ? "L'AI sta scrivendo..." : isLoadingProfile ? "Attendere analisi profilo..." : "Scrivi il tuo messaggio..."}
          className="flex-grow p-3 sm:p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none dark:bg-slate-700 dark:text-white disabled:opacity-60 transition-shadow focus:shadow-md"
          disabled={isLoading || isLoadingProfile}
        />
        <button
          type="submit"
          disabled={isLoading || isLoadingProfile || !userInput.trim()}
          className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold p-3 sm:p-4 rounded-lg disabled:opacity-50 transition-all duration-150 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 flex items-center justify-center h-[48px] w-[48px] sm:h-[56px] sm:w-[56px] flex-shrink-0"
          aria-label="Invia messaggio"
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
  );
}
