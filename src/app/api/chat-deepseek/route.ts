// src/app/api/chat-deepseek/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Interfacce basate sulla compatibilità con l'API OpenAI
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequestBodyInternal {
  model: string;
  messages: ChatMessage[];
  stream: boolean;
  temperature?: number;
  max_tokens?: number;
}

// Interfaccia per il corpo della richiesta dal frontend
interface FrontendRequestBody {
  prompt: string; // Il messaggio dell'utente
  chatMode?: 'metacognitive' | 'general'; // Nuovo campo per specificare la modalità
  // Eventualmente potremmo aggiungere history qui se la passiamo dal client
}

// Struttura di un chunk di dati in streaming (SSE) - invariata
interface StreamChoiceDelta {
  content?: string | null;
  role?: 'assistant';
}

interface StreamChoice {
  index: number;
  delta: StreamChoiceDelta;
  finish_reason?: string | null;
}

interface StreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: StreamChoice[];
}

const METACOGNITIVE_ASSISTANT_SYSTEM_MESSAGE = `Sei un assistente AI esperto in metacognizione e prompt engineering. Il tuo compito NON è rispondere direttamente al prompt dell'utente o eseguire il task richiesto. Invece, devi analizzare il prompt fornito dall'utente e offrire consigli costruttivi su come potrebbe essere migliorato dal punto di vista della sua efficacia e della strategia metacognitiva sottostante.

Quando ricevi un prompt dall'utente (che chiameremo "Prompt Originale"), procedi come segue:

1.  **Analisi del Prompt Originale**: Valuta il Prompt Originale in base a:
    * **Chiarezza e Specificità**: È chiaro, univoco e specifico? O è vago e ambiguo?
    * **Contesto Fornito**: Contiene sufficiente contesto (background, obiettivo, pubblico, formato desiderato, ecc.)?
    * **Struttura e Componenti**: È ben strutturato? Utilizza elementi come ruolo, task, vincoli, esempi (few-shot), output atteso?
    * **Presupposti Impliciti**: Ci sono presupposti nel prompt che l'IA potrebbe non conoscere o fraintendere?
    * **Obiettivo Implicito vs. Esplicito**: L'obiettivo reale dell'utente è chiaramente espresso?

2.  **Feedback Metacognitivo e Suggerimenti**: Fornisci un feedback dettagliato e attuabile. Invece di dire solo "è vago", spiega *perché* è vago e offri esempi concreti di riformulazione.
    * Suggerisci come l'utente potrebbe aver riflettuto diversamente (metacognizione) per arrivare a un prompt migliore.
    * Poni domande all'utente per stimolare la sua riflessione, del tipo: "Qual era l'intenzione principale dietro questa frase?", "Hai considerato l'impatto di usare termine X invece di Y?".
    * Se appropriato, introduci concetti di prompt engineering (es. "Potresti considerare un approccio 'Chain-of-Thought' per questo tipo di problema, formulando il prompt così: ...").
    * Evidenzia i punti di forza del prompt originale, se presenti, prima di suggerire miglioramenti.

3.  **Formato della Risposta**:
    * Inizia la tua risposta con una frase introduttiva come: "Ottimo! Analizziamo insieme il tuo prompt per renderlo ancora più efficace:" o "Interessante prompt! Vediamo come possiamo applicare un po' di metacognizione per potenziarlo:".
    * Struttura il tuo feedback in modo chiaro, magari usando elenchi puntati o sezioni.
    * NON devi generare una risposta al Prompt Originale. Il tuo output deve essere SOLO l'analisi e i suggerimenti di miglioramento del Prompt Originale stesso.
    * Mantieni un tono costruttivo, didattico e incoraggiante.

Esempio di interazione:
Utente Invia: "Parlami dei gatti."
Tua Risposta (Analisi e Suggerimenti):
"Analizziamo il tuo prompt 'Parlami dei gatti.':
Questo è un buon punto di partenza, ma è molto ampio! Per ottenere una risposta più mirata e utile dall'IA, potremmo riflettere su alcuni aspetti:
* **Specificità**: 'Parlami dei gatti' potrebbe significare molte cose. Sei interessato alla loro biologia, al comportamento, alla storia della domesticazione, a razze specifiche, o magari a come prendersene cura?
    * *Suggerimento Metacognitivo*: Prima di inviare il prompt, potresti chiederti: 'Qual è l'informazione specifica sui gatti che sto cercando di ottenere in questo momento?'
    * *Esempio di Riformulazione*: 'Descrivi le principali differenze comportamentali tra un gatto Maine Coon e un Siamese.' oppure 'Quali sono i passaggi fondamentali per socializzare un gattino adottato di recente?'
* **Contesto/Obiettivo**: Per quale scopo ti serve questa informazione? È per curiosità personale, per un compito scolastico, per decidere se adottare un gatto? Fornire questo contesto all'IA può aiutarla a calibrare il livello di dettaglio e lo stile.
    * *Suggerimento*: Potresti aggiungere: 'Sto scrivendo un breve articolo per bambini sulle diverse razze di gatti.'
Ricorda, più sei specifico e fornisci contesto, più l'IA sarà in grado di darti esattamente ciò che desideri!"

Il tuo unico scopo è aiutare l'utente a migliorare le sue abilità di prompting attraverso la riflessione e l'analisi.`;

const GENERAL_CHAT_SYSTEM_MESSAGE = `Sei un assistente AI generale, amichevole e utile. Rispondi alle domande e alle richieste dell'utente nel miglior modo possibile, in modo chiaro, conciso e conversazionale.`;

export async function POST(req: NextRequest) {
  try {
    const { prompt, chatMode = 'metacognitive' } = await req.json() as FrontendRequestBody;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required and must be a string' }, { status: 400 });
    }

    const deepSeekApiKey = process.env.deepseek_api;

    if (!deepSeekApiKey) {
      console.error("DeepSeek API key (deepseek_api) not found in environment variables.");
      return NextResponse.json({ error: 'API key not configured on server (expected deepseek_api)' }, { status: 500 });
    }

    // CORREZIONE QUI: Rimosso il formato Markdown dall'URL
    const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
    const DEEPSEEK_MODEL = 'deepseek-chat';

    let systemMessageContent = METACOGNITIVE_ASSISTANT_SYSTEM_MESSAGE;
    if (chatMode === 'general') {
      systemMessageContent = GENERAL_CHAT_SYSTEM_MESSAGE;
    }

    const messagesForAPI: ChatMessage[] = [
      { role: 'system', content: systemMessageContent },
      { role: 'user', content: prompt },
    ];

    const requestBodyToDeepSeek: ChatRequestBodyInternal = {
      model: DEEPSEEK_MODEL,
      messages: messagesForAPI,
      stream: true,
      temperature: chatMode === 'general' ? 0.7 : 0.5,
      // max_tokens: 1500, // Rimosso per lasciare al modello la gestione o per impostarlo se necessario
    };

    const deepSeekResponse = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepSeekApiKey}`,
        'Accept': 'application/json', // Accept header può essere utile
      },
      body: JSON.stringify(requestBodyToDeepSeek),
    });

    if (!deepSeekResponse.ok) {
      const errorBodyText = await deepSeekResponse.text();
      console.error(`DeepSeek API error: ${deepSeekResponse.status} ${deepSeekResponse.statusText}`, errorBodyText);
      let errorDetails: unknown = errorBodyText;
      try { errorDetails = JSON.parse(errorBodyText); } catch { /* non era JSON, usa errorBodyText */ }
      return NextResponse.json(
        { error: `DeepSeek API Error: ${deepSeekResponse.statusText}`, details: errorDetails },
        { status: deepSeekResponse.status }
      );
    }

    if (!deepSeekResponse.body) {
      return NextResponse.json({ error: 'No response body from DeepSeek' }, { status: 500 });
    }

    const reader = deepSeekResponse.body.getReader();
    const stream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder('utf-8');
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const jsonDataString = line.substring(6).trim();

                if (jsonDataString.toUpperCase() === '[DONE]') {
                  controller.close();
                  return;
                }

                try {
                  const parsedJson = JSON.parse(jsonDataString) as StreamChunk;
                  const textContent = parsedJson.choices?.[0]?.delta?.content;

                  if (textContent) {
                    controller.enqueue(new TextEncoder().encode(textContent));
                  }

                  if (parsedJson.choices?.[0]?.finish_reason) {
                    controller.close();
                    return;
                  }
                } catch (parseError) {
                   console.warn('Could not parse stream chunk as JSON:', jsonDataString, parseError);
                }
              }
            }
          }
        } catch (streamError) {
          console.error('Error while reading from DeepSeek stream:', streamError);
          controller.error(streamError);
        } finally {
          if (controller.desiredSize !== null && controller.desiredSize <= 0) {
            // Already closed
          } else {
            try { controller.close(); } catch { /* Might be already closed */ }
          }
          try { reader.releaseLock(); } catch { /* Lock might be already released */ }
        }
      },
      cancel() {
        if (reader) {
          reader.cancel().catch(cancelError => console.error("Error cancelling reader:", cancelError));
        }
        console.log("Stream cancelled by client.");
      }
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8', // Assicurati che il browser non interpreti come HTML
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache, no-transform',
      },
    });

  } catch (error: unknown) {
    console.error('Error in /api/chat-deepseek POST handler:', error);
    let errorMessage = 'Internal Server Error';
    let errorDetails: Record<string, unknown> = {};
    if (error instanceof Error) {
      errorMessage = error.message;
      // Includi causa e stack se disponibili e utili per il debug
      errorDetails = { name: error.name, message: error.message, stack: error.stack };
      if (error.cause) {
        errorDetails.cause = error.cause;
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    return NextResponse.json(
      { error: 'Internal Server Error on API Route', message: errorMessage, details: errorDetails },
      { status: 500 }
    );
  }
}
