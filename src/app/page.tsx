"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
// Import child components
import HeroSection from '@/components/homepage/HeroSection';
import CoursesIntroduction from '@/components/homepage/CoursesIntroduction';
import TargetAudienceGrid from '@/components/homepage/TargetAudienceGrid';
import PlatformLogos from '@/components/homepage/PlatformLogos';
import CourseCardList from '@/components/homepage/CourseCardList';
import AICoachSection from '@/components/homepage/AICoachSection';
import JacopoProfileCard from '@/components/JacopoProfileCard'; // NUOVO IMPORT
import FooterHomepage from '@/components/homepage/FooterHomepage';
import { FiUserCheck } from 'react-icons/fi'; // Icona per la nuova sezione

// Import data from the new data file
import { coursesData, targetAudienceData } from '@/data/homepageData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  error?: boolean;
  isLoadingStream?: boolean;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const coursesSectionRef = useRef<null | HTMLDivElement>(null);
  const jacopoSectionRef = useRef<null | HTMLDivElement>(null); // Ref per la nuova sezione

  useEffect(() => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        text: "Ciao! Sono il tuo coach AI per il prompting. Inserisci un prompt che vorresti analizzare e ti aiuterò a migliorarlo dal punto di vista metacognitivo.",
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessageText = userInput.trim();
    const userMessage: Message = {
      id: 'user-' + Date.now(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };

    const botMessageId = 'bot-' + Date.now();
    const initialBotMessage: Message = {
      id: botMessageId,
      text: "",
      sender: 'bot',
      timestamp: new Date(),
      isLoadingStream: true,
    };

    setMessages(prevMessages => [...prevMessages, userMessage, initialBotMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessageText, chatMode: "metacognitive" }),
      });

      if (!response.ok || !response.body) {
        const errorData = response.body ? await response.json().catch(() => ({ error: "Errore sconosciuto dal server."})) : { error: "Risposta non valida dal server."};
        const errorDetails = (errorData as { details?: string | { message?: string } }).details;
        let errorMessageText: string;
        if (typeof errorDetails === 'string') {
          errorMessageText = errorDetails;
        } else if (errorDetails && typeof errorDetails.message === 'string') {
          errorMessageText = errorDetails.message;
        } else {
          errorMessageText = (errorData as { error?: string }).error || response.statusText || "Errore durante la comunicazione con il server";
        }
        
        setMessages(prevMessages => prevMessages.map(msg =>
          msg.id === botMessageId
            ? { ...msg, text: `Errore nell'analisi: ${errorMessageText}`, error: true, isLoadingStream: false }
            : msg
        ));
        console.error('[Frontend Homepage] Errore dalla API backend:', response.status, errorData);
        setIsLoading(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setMessages(prevMessages => prevMessages.map(msg =>
            msg.id === botMessageId ? { ...msg, isLoadingStream: false } : msg
          ));
          break;
        }
        const chunkText = decoder.decode(value, { stream: true });
        accumulatedText += chunkText;
        setMessages(prevMessages => prevMessages.map(msg =>
          msg.id === botMessageId
            ? { ...msg, text: accumulatedText, isLoadingStream: true }
            : msg
        ));
      }
    } catch (error: unknown) { 
      console.error('[Frontend Homepage] Errore durante l_invio o lo streaming del messaggio:', error);
      let errorMessageText = 'Errore di connessione o durante lo streaming.';
      if (error instanceof Error) { 
        errorMessageText = error.message;
      }
      setMessages(prevMessages => {
        const existingBotMessageIndex = prevMessages.findIndex(msg => msg.id === botMessageId);
        if (existingBotMessageIndex !== -1) {
          return prevMessages.map(msg =>
            msg.id === botMessageId
              ? { ...msg, text: `Si è verificato un errore nell'analisi: ${errorMessageText}`, error: true, isLoadingStream: false }
              : msg
          );
        } else {
          return [
            ...prevMessages,
            {
              id: 'error-' + Date.now(),
              text: `Si è verificato un errore nell'analisi: ${errorMessageText}`,
              sender: 'bot',
              timestamp: new Date(),
              error: true,
            }
          ];
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToCoursesSection = () => {
    coursesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col">
      <HeroSection onScrollToCourses={scrollToCoursesSection} />

      <section ref={coursesSectionRef} id="courses-section" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/70 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CoursesIntroduction />
          <TargetAudienceGrid audienceData={targetAudienceData} />
          <PlatformLogos />
          <CourseCardList courses={coursesData} />
        </div>
      </section>

      {/* NUOVA SEZIONE CONOSCI JACOPO */}
      <section ref={jacopoSectionRef} id="jacopo-profile-section" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-800/60 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <FiUserCheck className="mx-auto h-12 w-12 mb-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Conosci il Tuo Esperto e Coach
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Scopri chi ti guiderà nel percorso di apprendimento e crescita personalizzata.
            </p>
          </div>
          <JacopoProfileCard variant="default" />
        </div>
      </section>
      {/* FINE NUOVA SEZIONE */}

      <AICoachSection
        messages={messages}
        userInput={userInput}
        onUserInputChge={setUserInput}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />

      <FooterHomepage />
    </div>
  );
}
