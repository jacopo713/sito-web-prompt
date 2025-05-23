import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiAlertTriangle, FiInfo } from 'react-icons/fi';
import type { Message as MessageData } from '@/types/aiChatTypes'; // Import Message type

interface ChatMessageProps {
  message: MessageData; // Use the imported Message type
}

/**
 * Displays a single chat message bubble.
 */
export default function ChatMessage({ message }: ChatMessageProps) {
  const { text, sender, timestamp, error, isLoadingStream, isFeedback } = message;

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] sm:max-w-[75%] p-3 sm:p-4 rounded-xl shadow-md text-sm sm:text-base 
        ${
          sender === 'user'
            ? 'bg-indigo-500 text-white dark:bg-indigo-600'
            : error
            ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100 border border-red-300 dark:border-red-600'
            : isFeedback
            ? 'bg-sky-100 text-sky-800 dark:bg-sky-700 dark:text-sky-100 border border-sky-300 dark:border-sky-600'
            : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100'
        } 
        ${isLoadingStream && sender === 'bot' && !error ? 'animate-pulse' : ''}`}
      >
        {error && <FiAlertTriangle className="inline mr-1.5 mb-0.5 h-5 w-5" />}
        {isFeedback && <FiInfo className="inline mr-1.5 mb-0.5 h-5 w-5 text-sky-600 dark:text-sky-300" />}
        {sender === 'bot' ? (
          <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed break-words">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {text || (isLoadingStream ? "..." : "")}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed break-words">{text}</p>
        )}
        <p className="text-xs opacity-70 mt-1.5 text-right">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
