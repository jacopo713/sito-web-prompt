// src/types/aiChatTypes.ts

/**
 * Represents a single message in the chat interface.
 */
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  error?: boolean;
  isLoadingStream?: boolean;
  isFeedback?: boolean; // Indicates if the message is a special feedback message from the bot
}

/**
 * Represents an item in the chat history sidebar.
 */
export interface ChatHistoryItem {
  id: string;
  title: string;
  lastActivity: Date;
}

/**
 * Represents a single analyzed cognitive indicator.
 * Used within the CognitiveProfile.
 */
export interface AnalyzedIndicator {
  id: string;
  name: string;
  level: string;
  score: number | null; // Score can be null if not applicable or not evaluated
  description: string;
}

/**
 * Represents the overall cognitive profile analysis result.
 */
export interface CognitiveProfile {
  analysisTimestamp: string;
  cognitiveIndicators: AnalyzedIndicator[];
  limitations: string;
  chatSessionId?: string; // ID of the chat session this profile is associated with
}
