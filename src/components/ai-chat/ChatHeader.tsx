import React from 'react';
import { FiCpu, FiRefreshCw } from 'react-icons/fi';

interface ChatHeaderProps {
  isLoadingProfile: boolean;
  activeChatId: string | null;
  chatHistoryTitle: string | undefined; // Title from chatHistory.find(...)
}

/**
 * Header for the main chat area.
 */
export default function ChatHeader({ isLoadingProfile, activeChatId, chatHistoryTitle }: ChatHeaderProps) {
  return (
    <header className="bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center">
        {isLoadingProfile ? (
          <FiRefreshCw className="animate-spin h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-indigo-500 dark:text-indigo-400" />
        ) : (
          <FiCpu className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-indigo-500 dark:text-indigo-400" />
        )}
        <h3 className="text-md sm:text-lg font-semibold text-slate-700 dark:text-slate-200 truncate">
          {isLoadingProfile
            ? "Analizzando profilo precedente..."
            : activeChatId
            ? chatHistoryTitle || "Conversazione"
            : "Assistente AI"}
        </h3>
      </div>
    </header>
  );
}
