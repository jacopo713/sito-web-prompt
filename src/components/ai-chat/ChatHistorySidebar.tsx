import React from 'react';
import Link from 'next/link';
import { FiMessageSquare, FiPlusCircle, FiTrash2, FiBarChart2 } from 'react-icons/fi';
import type { ChatHistoryItem as ChatHistoryItemData } from '@/types/aiChatTypes'; // Import ChatHistoryItem type

interface ChatHistorySidebarProps {
  chatHistory: ChatHistoryItemData[]; // Use the imported ChatHistoryItem type
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string, event: React.MouseEvent) => void;
  isLoading: boolean;
  isLoadingProfile: boolean;
}

/**
 * Sidebar component displaying chat history and actions.
 */
export default function ChatHistorySidebar({
  chatHistory,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  isLoading,
  isLoadingProfile,
}: ChatHistorySidebarProps) {
  return (
    <aside className="w-1/4 min-w-[280px] max-w-[360px] bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-600">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
            <FiMessageSquare className="mr-2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            Storico Chat
          </h2>
          <button
            onClick={onNewChat}
            className="p-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-700 rounded-md transition-colors"
            title="Nuova Chat"
            disabled={isLoading || isLoadingProfile}
          >
            <FiPlusCircle className="h-5 w-5" />
          </button>
        </div>
        <Link href="/dashboard">
          <span className="w-full flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 transition-colors cursor-pointer">
            <FiBarChart2 className="mr-2 h-4 w-4" />
            Dashboard Cognitiva
          </span>
        </Link>
      </div>
      <div className="flex-grow overflow-y-auto custom-scrollbar p-2 space-y-1">
        {chatHistory.length > 0 ? (
          chatHistory.map(chat => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors flex justify-between items-center group ${
                activeChatId === chat.id
                  ? 'bg-indigo-100 dark:bg-indigo-700/40 text-indigo-700 dark:text-indigo-200'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="truncate">
                <h3 className="text-sm font-medium truncate" title={chat.title}>
                  {chat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {/* Ensure lastActivity is a Date object before calling methods */}
                  {new Date(chat.lastActivity).toLocaleDateString([], { day: '2-digit', month: '2-digit' })} - {new Date(chat.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <button
                onClick={(e) => onDeleteChat(chat.id, e)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                title="Elimina Chat"
                disabled={isLoading || isLoadingProfile}
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        ) : (
          <p className="p-4 text-sm text-slate-500 dark:text-slate-400 text-center">Nessuna chat salvata.</p>
        )}
      </div>
    </aside>
  );
}
