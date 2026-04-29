import { GoogleGenAI } from '@google/genai';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';

dotenv.config();

// Initialize cache (5 min TTL)
const aiCache = new NodeCache({ stdTTL: 300 });

// Initialize Gemini
let ai;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  } catch (error) {
    console.error("Gemini init failed. Fallbacks will be used.");
  }
} else {
  console.log("⚠️ No GEMINI_API_KEY found in .env. AI chat will use offline fallbacks.");
}

const SYSTEM_PROMPT = `You are ElectWise 2.0, an official AI guide for Indian elections built 
on Election Commission of India (ECI) data. You are strictly neutral —
no political bias, no party preferences. Answer in the language the user 
writes in (Hindi or English). Focus on: voter registration, polling booths,
EVM/VVPAT, election timelines, voter rights, and Model Code of Conduct.
Always cite ECI sources where relevant.`;

const HARDCODED_FALLBACKS = {
  "voter id": "To apply for a new Voter ID, fill Form 6 on the Voter Services Portal (voters.eci.gov.in) or use the Voter Helpline App. You need age proof and address proof.",
  "evm": "Electronic Voting Machines (EVMs) are highly secure devices used in Indian elections. They consist of a Control Unit and a Ballot Unit. VVPAT machines are used alongside for verification.",
  "booth": "You can find your polling booth by searching your EPIC number on the ECI portal (electoralsearch.eci.gov.in) or by calling the toll-free number 1950.",
  "nota": "NOTA stands for 'None of the Above'. It is an option on the EVM allowing voters to officially register a vote of rejection for all candidates."
};

/**
 * AI Service with 4-Tier Fallback System
 * Tier 1: In-memory cache (5 min TTL)
 * Tier 2: Mistral AI (mistral-large-latest)
 * Tier 3: Google Gemini 2.0 Flash
 * Tier 4: Hardcoded offline responses
 */
export const generateAIResponse = async (userPrompt, chatHistory = []) => {
  const cacheKey = `ai_${userPrompt.toLowerCase().trim()}`;
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TIER 1: In-memory Cache
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const cachedResponse = aiCache.get(cacheKey);
  if (cachedResponse) {
    return { response: cachedResponse, source: 'cache' };
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TIER 2: Mistral AI (Fast & Cheap)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  try {
    if (process.env.MISTRAL_API_KEY) {
      const mistralResponse = await callMistralAPI(userPrompt, chatHistory);
      if (mistralResponse) {
        aiCache.set(cacheKey, mistralResponse);
        return { response: mistralResponse, source: 'mistral' };
      }
    }
  } catch (error) {
    console.warn("Mistral AI failed. Falling back to Gemini...");
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TIER 3: Google Gemini 2.0 Flash
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  try {
    if (ai) {
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.2, // Low temp for factual ECI responses
        }
      });
      
      // We would normally load history into the chat object here
      
      const response = await chat.sendMessage({ message: userPrompt });
      if (response.text) {
        aiCache.set(cacheKey, response.text);
        return { response: response.text, source: 'gemini' };
      }
    }
  } catch (error) {
    console.error("Gemini failed. Falling back to hardcoded responses...", error);
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TIER 4: Hardcoded Fallback
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const lowerPrompt = userPrompt.toLowerCase();
  for (const [key, value] of Object.entries(HARDCODED_FALLBACKS)) {
    if (lowerPrompt.includes(key)) {
      return { response: value, source: 'hardcoded' };
    }
  }

  return { 
    response: "Currently, I am unable to connect to the Election Commission database. However, you can call the toll-free Voter Helpline at 1950 for immediate assistance.", 
    source: 'hardcoded' 
  };
};

/**
 * Helper to call Mistral
 */
const callMistralAPI = async (prompt, history) => {
  // Placeholder for actual Mistral API call logic
  const fetch = (await import('node-fetch')).default;
  const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
    },
    body: JSON.stringify({
      model: 'mistral-large-latest',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
        { role: 'user', content: prompt }
      ]
    })
  });
  
  if (!res.ok) throw new Error("Mistral API Error");
  
  const data = await res.json();
  return data.choices[0].message.content;
};
