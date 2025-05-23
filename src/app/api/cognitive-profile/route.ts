// src/app/api/cognitive-profile/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Interface for messages sent to DeepSeek API
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Interface for the request body expected by this cognitive profile API
interface CognitiveProfileRequestBody {
  userInputs: string; // A string containing all user inputs from the previous session
}

// --- Definitions for Cognitive Indicators ---
interface CognitiveIndicatorDefinition {
  id: string;
  name: string;
  descriptionForLLM: string;
  levels: string[];
  scoreMap: { [level: string]: number | null }; // scoreMap può avere null per "Non Valutabile"
}

const INDICATORS_DEFINITIONS: CognitiveIndicatorDefinition[] = [
  {
    id: "focusAttention",
    name: "Focalizzazione Attentiva",
    descriptionForLLM: "Valuta la capacità dell'utente di mantenere coerentemente il focus su un argomento specifico, la coerenza tematica e la tendenza a fare domande mirate rispetto a domande generiche o a divagare frequentemente. Basati SOLO su quanto DIMOSTRATO negli input.",
    levels: ["Molto Elevata", "Elevata", "Moderata", "Limitata", "Molto Limitata/Variabile", "Non Valutabile"],
    scoreMap: { "Molto Elevata": 90, "Elevata": 75, "Moderata": 50, "Limitata": 30, "Molto Limitata/Variabile": 10, "Non Valutabile": null }
  },
  {
    id: "cognitiveFlexibility",
    name: "Flessibilità Cognitiva",
    descriptionForLLM: "Valuta la capacità dell'utente di esplorare argomenti diversi in modo costruttivo, adattare il proprio approccio, considerare alternative e integrare nuovi spunti o suggerimenti. Considera la consistenza e se l'adattamento è guidato o spontaneo.",
    levels: ["Molto Elevata", "Elevata", "Moderata", "Limitata", "Molto Limitata/Rigida", "Non Valutabile"],
    scoreMap: { "Molto Elevata": 90, "Elevata": 75, "Moderata": 50, "Limitata": 30, "Molto Limitata/Rigida": 10, "Non Valutabile": null }
  },
  {
    id: "crystallizedIntelligence",
    name: "Intelligenza Cristallizzata (Espressione Conoscenze)",
    descriptionForLLM: "Valuta l'ampiezza e la profondità delle conoscenze espresse dall'utente, l'uso di vocabolario ricco/specifico, la capacità di formulare concetti complessi e fare riferimenti pertinenti a conoscenze pregresse o fatti noti. Indica la capacità di applicare efficacemente il sapere accumulato. Basati SOLO su quanto DIMOSTRATO negli input.",
    levels: ["Molto Ricca e Pertinente", "Ricca e Pertinente", "Adeguata", "Limitata", "Molto Limitata/Generica", "Non Valutabile"],
    scoreMap: { "Molto Ricca e Pertinente": 95, "Ricca e Pertinente": 80, "Adeguata": 60, "Limitata": 40, "Molto Limitata/Generica": 20, "Non Valutabile": null }
  },
  {
    id: "fluidIntelligence",
    name: "Intelligenza Fluida (Ragionamento e Problem Solving)",
    descriptionForLLM: "Valuta la capacità dell'utente di ragionare logicamente, identificare pattern, risolvere problemi nuovi o formulare domande che richiedono inferenze e connessioni non ovvie. Considera l'abilità di scomporre problemi, pensare in modo astratto e adattare il ragionamento a situazioni inedite presentate nei prompt. Basati SOLO su quanto DIMOSTRATO negli input.",
    levels: ["Molto Elevata/Creativa", "Elevata", "Buona", "Standard/Lineare", "Limitata/Concreta", "Non Valutabile"],
    scoreMap: { "Molto Elevata/Creativa": 95, "Elevata": 80, "Buona": 65, "Standard/Lineare": 50, "Limitata/Concreta": 30, "Non Valutabile": null }
  },
  {
    id: "expressedPlanning",
    name: "Pianificazione Espressa",
    descriptionForLLM: "Valuta se l'utente articola piani chiari, sequenze di azioni o obiettivi definiti per la conversazione o per i task richiesti. L'assenza di piani espliciti o obiettivi chiari indica un livello basso.",
    levels: ["Molto Strutturata", "Strutturata", "Parzialmente Strutturata", "Poco Strutturata", "Non Evidente", "Non Valutabile"],
    scoreMap: { "Molto Strutturata": 90, "Strutturata": 75, "Parzialmente Strutturata": 50, "Poco Strutturata": 30, "Non Evidente": 10, "Non Valutabile": null }
  },
  {
    id: "contextualMemory",
    name: "Memoria Contestuale Dimostrata",
    descriptionForLLM: "Valuta la capacità dell'utente di fare riferimenti coerenti e specifici a punti precedenti della conversazione attuale, dimostrando di ricordare e utilizzare informazioni già discusse per costruire nuove interazioni. La mancanza di riferimenti espliciti o riferimenti vaghi indicano un livello basso. Basati SOLO su quanto DIMOSTRATO negli input.",
    levels: ["Molto Buona e Specifica", "Buona e Specifica", "Sufficiente/Generica", "Limitata", "Carente/Assente", "Non Valutabile"],
    scoreMap: { "Molto Buona e Specifica": 90, "Buona e Specifica": 75, "Sufficiente/Generica": 50, "Limitata": 30, "Carente/Assente": 10, "Non Valutabile": null }
  },
  {
    id: "interactionStyle",
    name: "Stile di Interazione (Passivo/Pro-attivo)",
    descriptionForLLM: "Valuta lo stile generale di interazione dell'utente durante la sessione. Considera se l'utente guida attivamente la conversazione (es. proponendo argomenti, chiedendo approfondimenti specifici, fornendo contesto ricco, correggendo/sfidando l'IA) indicando proattività, oppure se tende a fare domande semplici, rispondere solo se stimolato, e non esplorare attivamente, indicando passività. Scegli un livello che rappresenti il bilanciamento osservato. Basati SOLO su quanto DIMOSTRATO negli input.",
    levels: ["Molto Pro-attivo", "Pro-attivo", "Bilanciato", "Passivo", "Molto Passivo", "Non Valutabile"],
    scoreMap: { "Molto Pro-attivo": 100, "Pro-attivo": 75, "Bilanciato": 50, "Passivo": 25, "Molto Passivo": 0, "Non Valutabile": null }
  }
];

function buildDeepSeekPrompt(userInputs: string): string {
  let prompt = `Sei un analista esperto nell'interpretare interazioni testuali. Il tuo compito è valutare gli input di un utente in modo OGGETTIVO e CAUTO. Evita assolutamente l'adulazione o la sovrastima. Basa le tue valutazioni ESCLUSIVAMENTE su quanto DIMOSTRATO negli input forniti. Se le prove sono scarse, ambigue, o gli input sono molto semplici, scegli un livello inferiore o "Non Valutabile". È preferibile sottostimare lievemente piuttosto che sovrastimare. Valuta la CONSISTENZA del comportamento durante la sessione. Prestazioni elevate su input brevi o isolati non giustificano livelli massimi se non supportate da altre evidenze.

Analizza i seguenti input dell'utente (separati da '--- USER INPUT SEPARATOR ---') e fornisci una valutazione per ciascuno dei seguenti indicatori cognitivi approssimativi.
Per ogni indicatore, scegli UN SOLO livello qualitativo dalla lista fornita e scrivi una BREVE descrizione (massimo 1-2 frasi MOLTO concise) che giustifichi la tua scelta basandoti sugli input dell'utente.
Formatta la tua risposta ESCLUSIVAMENTE come un oggetto JSON valido contenente una chiave "indicators" il cui valore è un array di oggetti. Ogni oggetto nell'array deve avere le chiavi "id" (l'identificativo dell'indicatore), "level" (il livello qualitativo scelto) e "description" (la tua breve giustificazione).
Non includere testo al di fuori di questo oggetto JSON.

Indicatori da valutare:
`;

  INDICATORS_DEFINITIONS.forEach(indicator => {
    prompt += `
- Indicatore ID: "${indicator.id}"
  Nome: "${indicator.name}"
  Descrizione Comportamentale: "${indicator.descriptionForLLM}"
  Livelli Qualitativi Possibili: [${indicator.levels.map(l => `"${l}"`).join(", ")}]
`;
  });

  prompt += `
Input dell'Utente:
--- USER INPUT START ---
${userInputs}
--- USER INPUT END ---

Rispondi SOLO con l'oggetto JSON strutturato come richiesto. Assicurati che la descrizione sia BREVE, NEUTRA e direttamente collegata agli input. Evita commenti generali o incoraggiamenti nella descrizione.
Esempio di formato per un singolo indicatore nell'array "indicators":
{ "id": "focusAttention", "level": "Moderata", "description": "L'utente ha posto domande correlate, ma ha deviato su un altro tema a metà sessione." }
`;
  return prompt;
}

interface AnalyzedIndicatorFromAPI {
  id: string;
  level: string;
  description: string;
}

interface DeepSeekResponseContent {
  indicators: AnalyzedIndicatorFromAPI[];
}

interface DeepSeekChoice {
  message: {
    content: string;
  };
}

interface DeepSeekAPIResponse {
  choices?: DeepSeekChoice[];
}

interface AnalyzedIndicator {
  id: string;
  name: string;
  level: string;
  score: number | null;
  description: string;
}

interface CognitiveProfileResponse {
  analysisTimestamp: string;
  cognitiveIndicators: AnalyzedIndicator[];
  limitations: string;
}


export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { userInputs } = (await req.json()) as CognitiveProfileRequestBody;

    if (!userInputs || typeof userInputs !== 'string' || userInputs.trim() === "") {
      return NextResponse.json({ error: 'userInputs is required and must be a non-empty string' }, { status: 400 });
    }

    const deepSeekApiKey = process.env.deepseek_api;
    if (!deepSeekApiKey) {
      console.error("DeepSeek API key (deepseek_api) not found for cognitive profile API.");
      return NextResponse.json({ error: 'API key not configured on server (expected deepseek_api)' }, { status: 500 });
    }

    const fullPromptForDeepSeek = buildDeepSeekPrompt(userInputs);
    const messagesForAPI: ChatMessage[] = [{ role: 'user', content: fullPromptForDeepSeek }];
    const requestBodyToDeepSeek = {
      model: 'deepseek-chat',
      messages: messagesForAPI,
      stream: false,
      temperature: 0.05,
      max_tokens: 2500,
      response_format: { type: "json_object" },
    };

    // CORREZIONE QUI: Rimosso il formato Markdown dall'URL
    const deepSeekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${deepSeekApiKey}` },
      body: JSON.stringify(requestBodyToDeepSeek),
    });

    if (!deepSeekResponse.ok) {
      const errorBodyText = await deepSeekResponse.text();
      console.error(`Cognitive Profile API - DeepSeek API error: ${deepSeekResponse.status}`, errorBodyText);
      return NextResponse.json({ error: `DeepSeek API Error: ${deepSeekResponse.statusText}`, details: errorBodyText }, { status: deepSeekResponse.status });
    }

    const responseDataText = await deepSeekResponse.text();
    let parsedDeepSeekResponseContent: DeepSeekResponseContent;
    try {
        const outerJson = JSON.parse(responseDataText) as DeepSeekAPIResponse;
        if (outerJson.choices && outerJson.choices[0] && outerJson.choices[0].message && outerJson.choices[0].message.content) {
            parsedDeepSeekResponseContent = JSON.parse(outerJson.choices[0].message.content) as DeepSeekResponseContent;
        } else {
            console.error('Invalid JSON structure from DeepSeek: choices or message content missing.', responseDataText);
            throw new Error('Invalid JSON structure from DeepSeek: choices or message content missing.');
        }
        if (!parsedDeepSeekResponseContent || !parsedDeepSeekResponseContent.indicators || !Array.isArray(parsedDeepSeekResponseContent.indicators)) {
          console.error('Invalid JSON structure from DeepSeek: "indicators" array missing or malformed.', parsedDeepSeekResponseContent);
          throw new Error('Invalid JSON structure from DeepSeek: "indicators" array missing or malformed in the message content.');
        }
    } catch (parseError: unknown) {
      const errorMessage = parseError instanceof Error ? parseError.message : "Unknown parsing error";
      console.error('Error parsing JSON response from DeepSeek:', errorMessage, "Raw response text from API:", responseDataText);
      return NextResponse.json({ error: 'Failed to parse JSON response from AI model', details: errorMessage, rawResponse: responseDataText }, { status: 500 });
    }

    const processedIndicators: AnalyzedIndicator[] = [];
    const defaultNonEvaluatedLevel = "Non Valutabile";

    for (const def of INDICATORS_DEFINITIONS) {
        const foundIndicator = parsedDeepSeekResponseContent.indicators.find((ind) => ind.id === def.id);
        let chosenLevel = defaultNonEvaluatedLevel;
        let chosenDescription = "L'indicatore non è stato valutato o i dati non erano sufficienti per una valutazione chiara.";
        let finalScore: number | null = null;

        if (foundIndicator && typeof foundIndicator.level === 'string' && def.levels.includes(foundIndicator.level)) {
            chosenLevel = foundIndicator.level;
            chosenDescription = typeof foundIndicator.description === 'string' ? foundIndicator.description.trim() : "Nessuna descrizione dettagliata fornita.";
        } else if (foundIndicator) {
             console.warn(`Indicator "${def.id}" - Level "${foundIndicator.level}" from API is invalid or not in defined levels. Defaulting to "${defaultNonEvaluatedLevel}". Valid levels: ${def.levels.join(', ')}. API response for indicator:`, foundIndicator);
        } else {
            console.warn(`Indicator "${def.id}" was not found in API response. Defaulting to "${defaultNonEvaluatedLevel}".`);
        }

        finalScore = def.scoreMap[chosenLevel];

        processedIndicators.push({
            id: def.id,
            name: def.name,
            level: chosenLevel,
            score: finalScore,
            description: chosenDescription,
        });
    }

    const finalResponse: CognitiveProfileResponse = {
      analysisTimestamp: new Date().toISOString(),
      cognitiveIndicators: processedIndicators,
      limitations: "I risultati presentati sono stime qualitative approssimative basate sull'analisi testuale degli input utente e non devono essere considerati come una valutazione psicometrica formale o diagnostica. L'obiettivo è fornire spunti di riflessione per migliorare l'interazione con l'AI."
    };

    return NextResponse.json(finalResponse);

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    const stack = error instanceof Error ? error.stack : undefined;
    console.error('Error in /api/cognitive-profile POST handler:', error);
    return NextResponse.json({ error: 'Internal Server Error on Cognitive Profile API Route', message, stack }, { status: 500 });
  }
}
