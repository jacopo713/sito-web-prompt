"use client";

import React, { useState, useEffect, useRef, FormEvent, useCallback } from 'react';
import ChatHistorySidebar from '@/components/ai-chat/ChatHistorySidebar';
import ChatHeader from '@/components/ai-chat/ChatHeader';
import ChatMessagesArea from '@/components/ai-chat/ChatMessagesArea';
import ChatInputForm from '@/components/ai-chat/ChatInputForm';
import type { Message, ChatHistoryItem, CognitiveProfile } from '@/types/aiChatTypes';

const LOCAL_STORAGE_CHAT_HISTORY_KEY = 'aiChatHistory_v2';
const LOCAL_STORAGE_CHAT_MESSAGES_PREFIX = 'aiChatMessages_v2_';
const LOCAL_STORAGE_LAST_ACTIVE_CHAT_ID_KEY = 'aiChatLastActiveId_v2';
const LOCAL_STORAGE_COGNITIVE_PROFILES_KEY = 'aiChatCognitiveProfiles_v2';
const USER_INPUT_SEPARATOR = "\n--- USER INPUT SEPARATOR ---\n";

// Interfacce per la gestione degli errori
interface ErrorWithDetails {
  details: {
    message?: string;
    [key: string]: string | number | boolean | undefined | null | object; // Permette altre chiavi ma Message è stringa
  };
  // Permette altre chiavi a livello superiore, ora 'unknown' per maggiore sicurezza
  [key: string]: unknown;
}

interface ErrorWithErrorString {
  error: string;
  // Permette altre chiavi a livello superiore, ora 'unknown' per maggiore sicurezza
  [key: string]: unknown;
}

// Type predicate per ErrorWithDetails, parametro 'obj' ora è 'unknown'
function isErrorWithDetails(obj: unknown): obj is ErrorWithDetails {
  return typeof obj === 'object' && obj !== null &&
         'details' in obj && typeof (obj as { details: unknown }).details === 'object' && (obj as { details: unknown }).details !== null &&
         'message' in ((obj as { details: unknown }).details as Record<string, unknown>) &&
         typeof (((obj as { details: unknown }).details as Record<string, unknown>).message) === 'string';
}

// Type predicate per ErrorWithErrorString, parametro 'obj' ora è 'unknown'
function isErrorWithErrorString(obj: unknown): obj is ErrorWithErrorString {
  return typeof obj === 'object' && obj !== null && 'error' in obj && typeof (obj as { error: unknown }).error === 'string';
}


export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const saveChatHistoryToLocalStorage = useCallback((history: ChatHistoryItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_STORAGE_CHAT_HISTORY_KEY, JSON.stringify(history));
  }, []);

  const loadChatHistoryFromLocalStorage = useCallback((): ChatHistoryItem[] => {
    if (typeof window === 'undefined') return [];
    const storedHistory = localStorage.getItem(LOCAL_STORAGE_CHAT_HISTORY_KEY);
    if (storedHistory) {
      try {
        return (JSON.parse(storedHistory) as ChatHistoryItem[]).map(chat => ({
          ...chat,
          lastActivity: new Date(chat.lastActivity),
        }));
      } catch (e) { console.error("Error parsing chat history", e); return []; }
    }
    return [];
  }, []);

  const saveChatMessagesToLocalStorage = useCallback((chatId: string, msgs: Message[]) => {
    if (typeof window === 'undefined' || !chatId) return;
    const conversationMessages = msgs.filter(m => !m.id.startsWith('welcome-') && !m.id.startsWith('placeholder-') && !m.isFeedback);
    if (conversationMessages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_CHAT_MESSAGES_PREFIX + chatId, JSON.stringify(conversationMessages));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_CHAT_MESSAGES_PREFIX + chatId);
    }
  }, []);

  const loadChatMessagesFromLocalStorage = useCallback((chatId: string): Message[] | null => {
    if (typeof window === 'undefined' || !chatId) return null;
    const storedMessages = localStorage.getItem(LOCAL_STORAGE_CHAT_MESSAGES_PREFIX + chatId);
    if (storedMessages) {
      try {
        return (JSON.parse(storedMessages) as Message[]).map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      } catch (e) { console.error("Error parsing messages for chat " + chatId, e); return null; }
    }
    return null;
  }, []);

  const loadCognitiveProfilesFromLocalStorage = useCallback((): CognitiveProfile[] => {
    if (typeof window === 'undefined') return [];
    const storedProfiles = localStorage.getItem(LOCAL_STORAGE_COGNITIVE_PROFILES_KEY);
    if (storedProfiles) {
      try {
        return (JSON.parse(storedProfiles) as CognitiveProfile[]).map(profile => ({
          ...profile,
          analysisTimestamp: profile.analysisTimestamp,
        }));
      } catch (e) { console.error("Error parsing cognitive profiles", e); return []; }
    }
    return [];
  }, []);

  const saveCognitiveProfileToLocalStorage = useCallback((profile: CognitiveProfile) => {
    if (typeof window === 'undefined') return;
    const profiles = loadCognitiveProfilesFromLocalStorage();
    const updatedProfiles = [profile, ...profiles.filter(p => p.chatSessionId !== profile.chatSessionId)].slice(0, 30);
    localStorage.setItem(LOCAL_STORAGE_COGNITIVE_PROFILES_KEY, JSON.stringify(updatedProfiles));
  }, [loadCognitiveProfilesFromLocalStorage]);

  const getInputsFromSpecificChat = useCallback((chatIdForInputs: string | null): { inputs: string, sessionId: string | null } => {
    if (typeof window === 'undefined' || !chatIdForInputs) return { inputs: "", sessionId: null };
    const messagesFromChat = loadChatMessagesFromLocalStorage(chatIdForInputs);
    if (messagesFromChat && messagesFromChat.length > 0) {
      const userInputs = messagesFromChat.filter(msg => msg.sender === 'user').map(msg => msg.text).join(USER_INPUT_SEPARATOR);
      return { inputs: userInputs, sessionId: chatIdForInputs };
    }
    return { inputs: "", sessionId: chatIdForInputs };
  }, [loadChatMessagesFromLocalStorage]);

  const fetchAndProcessCognitiveProfile = useCallback(async (userInputs: string, forChatSessionId: string): Promise<CognitiveProfile | null> => {
    if (!userInputs.trim()) return null;
    setIsLoadingProfile(true);
    try {
      const response = await fetch('/api/cognitive-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInputs }),
      });
      if (!response.ok) {
        const errorData: unknown = await response.json().catch(() => ({}));
        console.error('[CognitiveProfileAPI] Error fetching profile:', response.status, errorData);
        return null;
      }
      const profileData = (await response.json()) as Omit<CognitiveProfile, 'chatSessionId'>;
      const validatedProfileData = { ...profileData, cognitiveIndicators: Array.isArray(profileData.cognitiveIndicators) ? profileData.cognitiveIndicators : [] };
      const fullProfile: CognitiveProfile = { ...validatedProfileData, chatSessionId: forChatSessionId };
      saveCognitiveProfileToLocalStorage(fullProfile);
      return fullProfile;
    } catch (error) {
      console.error('[fetchAndProcessCognitiveProfile] Network error:', error);
      return null;
    } finally {
      setIsLoadingProfile(false);
    }
  }, [saveCognitiveProfileToLocalStorage]);
  
  const generatePersonalizedFeedbackMessage = useCallback(async (profile: CognitiveProfile | null): Promise<string | null> => {
    if (!profile || !profile.cognitiveIndicators || profile.cognitiveIndicators.length === 0) {
        return null;
    }
    let profileSummaryForPrompt = "Analisi qualitativa della sessione precedente (NON PSICOMETRICA, solo spunti di riflessione):\n";
    profile.cognitiveIndicators.forEach(ind => {
        profileSummaryForPrompt += "- Indicatore \"" + ind.name + "\": Livello osservato \"" + ind.level + "\". Giustificazione: \"" + ind.description + "\"\n";
    });

    setIsLoadingProfile(true);
    const feedbackPromptParts = [
      "Data la seguente analisi qualitativa (NON PSICOMETRICA) della precedente sessione dell'utente:\n",
      profileSummaryForPrompt,
      "\n\nGenera un breve (1-2 frasi), amichevole e INCORAGGIANTE messaggio di feedback. L'obiettivo è fornire uno spunto di riflessione POSITIVO e BILANCIATO.\n",
      "Se ci sono aspetti positivi evidenti (es. livelli \"Elevata\", \"Molto Buona\", \"Spiccato\"), menzionane uno brevemente in modo generale (es. \"Ho notato la tua capacità di X...\").\n",
      "Se l'analisi contiene prevalentemente livelli come \"Limitata\", \"Non Evidente\", \"Non Valutabile\" o \"Standard/Moderata\", focalizzati su un incoraggiamento generale al miglioramento continuo, all'esplorazione di nuove strategie di interazione, o alla sperimentazione.\n",
      "Inizia con una frase come \"Ciao! Dalla nostra ultima conversazione, ho notato che...\" o \"Interessante come nell'ultima sessione tu abbia...\".\n",
      "EVITA linguaggio giudicante o adulatorio. NON menzionare punteggi specifici o livelli in modo diretto (es. NON dire \"il tuo livello di Focus è Elevato\" ma piuttosto \"ho notato la tua attenzione ai dettagli...\"). NON fare riferimento al processo di analisi stesso (es. non dire \"dall'analisi emerge...\"). Sii conciso e gentile.\n",
      "Se l'analisi è interamente composta da livelli molto bassi o non valutabili, rispondi con un messaggio positivo generico come \"È un piacere continuare la nostra conversazione e esplorare nuove idee insieme!\".\n",
      "L'obiettivo NON è dare un report, ma un piccolo spunto motivazionale per la nuova chat. Mantieni un tono da coach AI amichevole."
    ];
    const feedbackPrompt = feedbackPromptParts.join('');

    try {
      const response = await fetch('/api/chat-deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: feedbackPrompt, chatMode: "general" }),
    });
      if (!response.ok || !response.body) {
        console.error("[PersonalizedFeedback] Error from API for feedback generation");
        return "È un piacere continuare la nostra conversazione!";
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let feedbackText = "";
      while (true) { const { value, done } = await reader.read(); if (done) break; feedbackText += decoder.decode(value, { stream: true }); }

      if (feedbackText.trim().length < 10) {
          return "È un piacere continuare la nostra conversazione e esplorare nuove idee insieme!";
      }
      return feedbackText.trim();
    } catch (error) {
        console.error('[PersonalizedFeedback] Error:', error);
        return "È un piacere continuare la nostra conversazione e esplorare nuove idee insieme!";
    }
    finally { setIsLoadingProfile(false); }
  }, []); 

  const startNewChatSession = useCallback(async (currentChatId: string | null, previousChatIdForAnalysis: string | null) => {
    const initialMessages: Message[] = [];
    const welcomeText = currentChatId ? "Chat resettata. Chiedimi pure!" : "Ciao! Sono il tuo assistente AI.";
    const newWelcomeId = "welcome-" + (currentChatId || 'initial') + "-" + Date.now();
    initialMessages.push({ id: newWelcomeId, text: welcomeText, sender: 'bot', timestamp: new Date() });

    if (previousChatIdForAnalysis) {
      const { inputs: prevUserInputs, sessionId: analyzedSessionId } = getInputsFromSpecificChat(previousChatIdForAnalysis);
      if (prevUserInputs && analyzedSessionId) {
        const cognitiveProfile = await fetchAndProcessCognitiveProfile(prevUserInputs, analyzedSessionId);
        if (cognitiveProfile) {
          const feedbackMsgText = await generatePersonalizedFeedbackMessage(cognitiveProfile);
          if (feedbackMsgText) {
            const feedbackId = "bot-cognitive-feedback-" + Date.now();
            initialMessages.push({ id: feedbackId, text: feedbackMsgText, sender: 'bot', timestamp: new Date(), isFeedback: true });
          }
        }
      }
    }
    setMessages(initialMessages);
  }, [getInputsFromSpecificChat, fetchAndProcessCognitiveProfile, generatePersonalizedFeedbackMessage]);

  useEffect(() => {
    const loadedHistory = loadChatHistoryFromLocalStorage();
    setChatHistory(loadedHistory);
    const lastActiveId = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_LAST_ACTIVE_CHAT_ID_KEY) : null;

    if (lastActiveId && loadedHistory.some(chat => chat.id === lastActiveId)) {
      handleSelectChat(lastActiveId);
    } else if (loadedHistory.length > 0) {
      const sortedHistory = [...loadedHistory].sort((a,b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
      handleSelectChat(sortedHistory[0].id);
    } else {
      startNewChatSession(null, null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    if (chatHistory.length > 0 || (chatHistory.length === 0 && typeof window !== 'undefined' && localStorage.getItem(LOCAL_STORAGE_CHAT_HISTORY_KEY) !== null)) {
      saveChatHistoryToLocalStorage(chatHistory);
    }
  }, [chatHistory, saveChatHistoryToLocalStorage]);

  const handleSelectChat = useCallback((chatId: string) => {
    if (activeChatId && activeChatId !== chatId && messages.filter(m => !m.isFeedback && !m.id.startsWith("welcome-") && !m.id.startsWith("placeholder-")).length > 0) {
      saveChatMessagesToLocalStorage(activeChatId, messages);
    }
    setActiveChatId(chatId);
    if (typeof window !== 'undefined') localStorage.setItem(LOCAL_STORAGE_LAST_ACTIVE_CHAT_ID_KEY, chatId);

    const loadedMsgs = loadChatMessagesFromLocalStorage(chatId);
    const currentLoadedHistory = loadChatHistoryFromLocalStorage();
    const currentSelectedChat = currentLoadedHistory.find(c => c.id === chatId);
    
    const titleForMessage = currentSelectedChat?.title || 'Selezionata';
    const welcomeBackText = "Benvenuto/a di nuovo! Stai continuando la chat \"" + titleForMessage + "\".";
    const placeholderText = "Hai selezionato la chat \"" + titleForMessage + "\". Inizia la conversazione.";


    if (loadedMsgs && loadedMsgs.length > 0) {
       const welcomeMessageId = "placeholder-select-" + chatId + "-" + Date.now();
       const welcomeMessage: Message = {
         id: welcomeMessageId,
         text: welcomeBackText,
         sender: 'bot', timestamp: new Date(), isFeedback: true,
       };
       const parsedLoadedMsgs = loadedMsgs.map(m => ({...m, timestamp: new Date(m.timestamp)}));
       setMessages([welcomeMessage, ...parsedLoadedMsgs]);
    } else {
      const placeholderId = "placeholder-select-" + chatId + "-" + Date.now();
      setMessages([{
        id: placeholderId,
        text: placeholderText,
        sender: 'bot', timestamp: new Date(), isFeedback: true,
      }]);
    }
  }, [activeChatId, messages, saveChatMessagesToLocalStorage, loadChatMessagesFromLocalStorage, loadChatHistoryFromLocalStorage]);

  const handleNewChatExplicit = useCallback(() => {
    const prevActiveChatId = activeChatId;
    if (prevActiveChatId && messages.filter(m => !m.isFeedback && !m.id.startsWith("welcome-") && !m.id.startsWith("placeholder-")).length > 0) {
      saveChatMessagesToLocalStorage(prevActiveChatId, messages);
    }

    const newChatId = "chat-" + Date.now();
    const currentChatHistory = loadChatHistoryFromLocalStorage();
    const newChatNum = (currentChatHistory.filter(c => c.title.startsWith("Conversazione")).length || 0) + 1;
    const newChat: ChatHistoryItem = {
      id: newChatId,
      title: "Conversazione #" + newChatNum,
      lastActivity: new Date(),
    };

    const updatedHistory = [newChat, ...currentChatHistory].sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
    setChatHistory(updatedHistory);
    setActiveChatId(newChatId);
    if (typeof window !== 'undefined') localStorage.setItem(LOCAL_STORAGE_LAST_ACTIVE_CHAT_ID_KEY, newChatId);
    startNewChatSession(newChatId, prevActiveChatId);
  }, [activeChatId, messages, saveChatMessagesToLocalStorage, startNewChatSession, loadChatHistoryFromLocalStorage]); 

  const handleDeleteChat = useCallback((chatIdToDelete: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const currentChatHistory = loadChatHistoryFromLocalStorage();
    const newChatHistory = currentChatHistory.filter(chat => chat.id !== chatIdToDelete);
    setChatHistory(newChatHistory);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_CHAT_MESSAGES_PREFIX + chatIdToDelete);
    }

    if (activeChatId === chatIdToDelete) {
      setActiveChatId(null);
      if (typeof window !== 'undefined') localStorage.removeItem(LOCAL_STORAGE_LAST_ACTIVE_CHAT_ID_KEY);
      if (newChatHistory.length > 0) {
        const sortedHistory = [...newChatHistory].sort((a,b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
        handleSelectChat(sortedHistory[0].id);
      } else {
        startNewChatSession(null, null);
      }
    }
  }, [activeChatId, handleSelectChat, startNewChatSession, loadChatHistoryFromLocalStorage]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || isLoadingProfile) return;

    const userMessageText = userInput.trim();
    const userMessageId = "user-" + Date.now();
    const newUserMessage: Message = { id: userMessageId, text: userMessageText, sender: 'user', timestamp: new Date() };

    let currentChatSessionId = activeChatId;
    let currentMessagesSnapshot = messages.filter(m => !m.id.startsWith("placeholder-") && !m.id.startsWith("welcome-") && !m.isFeedback || m.sender === 'user');

    const isEffectivelyNewChat = !activeChatId || messages.every(m => m.id.startsWith('placeholder-') || m.id.startsWith('welcome-') || m.isFeedback);

    if (isEffectivelyNewChat) {
        const placeholderSelectedChatId = activeChatId && messages.some(m => m.id.startsWith("placeholder-select-" + activeChatId)) ? activeChatId : null;
        const newChatIdBase = placeholderSelectedChatId || ("chat-" + Date.now());
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const chatTitle = userMessageText.substring(0, 30) + (userMessageText.length > 30 ? "..." : "") || ("Chat " + timeString);

        let currentChatHistory = loadChatHistoryFromLocalStorage();
        const existingChatIndex = currentChatHistory.findIndex(c => c.id === newChatIdBase);

        if (existingChatIndex === -1) {
            const newChatEntry: ChatHistoryItem = { id: newChatIdBase, title: chatTitle, lastActivity: new Date() };
            currentChatHistory = [newChatEntry, ...currentChatHistory];
        } else {
            currentChatHistory = currentChatHistory.map(chat => chat.id === newChatIdBase ? { ...chat, title: chatTitle, lastActivity: new Date() } : chat);
        }
        setChatHistory(currentChatHistory.sort((a,b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()));

        setActiveChatId(newChatIdBase);
        if (typeof window !== 'undefined') localStorage.setItem(LOCAL_STORAGE_LAST_ACTIVE_CHAT_ID_KEY, newChatIdBase);
        currentChatSessionId = newChatIdBase;
        currentMessagesSnapshot = [];

        let previousDistinctChatIdForAnalysis: string | null = null;
        if (currentChatHistory.length > 1) {
             const sortedHistory = [...currentChatHistory].sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
             const potentialPrevious = sortedHistory.find(c => c.id !== currentChatSessionId);
             if(potentialPrevious) previousDistinctChatIdForAnalysis = potentialPrevious.id;
        }

        if (previousDistinctChatIdForAnalysis) {
            const { inputs: prevUserInputs, sessionId: analyzedSessionId } = getInputsFromSpecificChat(previousDistinctChatIdForAnalysis);
            if (prevUserInputs && analyzedSessionId) {
                const cognitiveProfile = await fetchAndProcessCognitiveProfile(prevUserInputs, analyzedSessionId);
                if (cognitiveProfile) {
                    const feedbackMsgText = await generatePersonalizedFeedbackMessage(cognitiveProfile);
                    if (feedbackMsgText) {
                        const feedbackBotId = "bot-cognitive-feedback-" + newChatIdBase + "-" + Date.now();
                        const feedbackBotMessage: Message = { id: feedbackBotId, text: feedbackMsgText, sender: 'bot', timestamp: new Date(), isFeedback: true };
                        currentMessagesSnapshot.push(feedbackBotMessage);
                    }
                }
            }
        }
    } else if (currentChatSessionId) {
        setChatHistory(prev => prev.map(chat => chat.id === currentChatSessionId ? { ...chat, lastActivity: new Date() } : chat).sort((a,b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()));
    }

    currentMessagesSnapshot.push(newUserMessage);
    const newBotMessageId = "bot-" + Date.now();
    const newInitialBotMessage: Message = { id: newBotMessageId, text: "", sender: 'bot', timestamp: new Date(), isLoadingStream: true };
    currentMessagesSnapshot.push(newInitialBotMessage);

    setMessages(currentMessagesSnapshot);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessageText, chatMode: "general" }),
    });
      if (!response.ok || !response.body) {
        const errorData: unknown = response.body ? await response.json().catch(() => ({})) : {};
        let determinedErrorText = response.statusText || "Errore dal server.";

        if (isErrorWithDetails(errorData) && errorData.details.message) {
            determinedErrorText = errorData.details.message;
        } else if (isErrorWithErrorString(errorData)) { 
            determinedErrorText = errorData.error;
        }
        
        setMessages(prev => prev.map(msg => msg.id === newBotMessageId ? { ...msg, text: "Errore: " + determinedErrorText, error: true, isLoadingStream: false } : msg ));
        setIsLoading(false); return;
    }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let finalMsgs = currentMessagesSnapshot.map(msg => msg.id === newBotMessageId ? { ...msg, text: "", isLoadingStream: true } : msg );

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          finalMsgs = finalMsgs.map(msg => msg.id === newBotMessageId ? { ...msg, isLoadingStream: false } : msg );
          setMessages(finalMsgs);
          break;
        }
        accumulatedText += decoder.decode(value, { stream: true });
        finalMsgs = finalMsgs.map(msg => msg.id === newBotMessageId ? { ...msg, text: accumulatedText, isLoadingStream: true } : msg );
        setMessages(finalMsgs);
      }
      if (currentChatSessionId) {
        saveChatMessagesToLocalStorage(currentChatSessionId, finalMsgs);
      }
    } catch (error: unknown) {
      let errorMessage = 'Connessione fallita.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setMessages(prev => prev.map(msg => msg.id === newBotMessageId ? { ...msg, text: "Errore: " + errorMessage, error: true, isLoadingStream: false } : msg ));
    } finally { setIsLoading(false); }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ChatHistorySidebar
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChatExplicit}
        onDeleteChat={handleDeleteChat}
        isLoading={isLoading}
        isLoadingProfile={isLoadingProfile}
      />

      <main className="flex-1 flex flex-col bg-white dark:bg-slate-900">
        <ChatHeader
          isLoadingProfile={isLoadingProfile}
          activeChatId={activeChatId}
          chatHistoryTitle={chatHistory.find(c => c.id === activeChatId)?.title}
        />
        <ChatMessagesArea messages={messages} messagesEndRef={messagesEndRef} />
        <ChatInputForm
          userInput={userInput}
          onUserInputChge={setUserInput}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isLoadingProfile={isLoadingProfile}
        />
      </main>
    </div>
  );
}
