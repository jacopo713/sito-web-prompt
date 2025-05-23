import React from 'react';
import ChatMessage from './ChatMessage';
import type { Message as MessageData } from '@/types/aiChatTypes'; // Import Message type

interface ChatMessagesAreaProps {
  messages: MessageData[]; // Use the imported Message type
  // Modifica qui: accetta che la ref possa contenere null
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Renders the area where chat messages are displayed.
 */
export default function ChatMessagesArea({ messages, messagesEndRef }: ChatMessagesAreaProps) {
  return (
    <div className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-slate-800/30">
      {messages.map(msg => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
