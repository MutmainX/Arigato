import { GoogleGenAI, Type } from "@google/genai";
import type { UserInput, OptimizationResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    optimizedPrompt: {
      type: Type.STRING,
      description: "The final, optimized prompt ready for the user.",
    },
    explanationTitle: {
      type: Type.STRING,
      description: "The title for the explanation section, e.g., 'What Changed' or 'Key Improvements'."
    },
    improvements: {
      type: Type.ARRAY,
      description: "A list of key improvements made to the prompt and their benefits.",
      items: { type: Type.STRING }
    },
    techniquesApplied: {
      type: Type.STRING,
      description: "A brief mention of the techniques applied (e.g., Chain-of-Thought, Role Assignment). Only for complex requests.",
    },
    proTip: {
      type: Type.STRING,
      description: "Actionable usage guidance or a pro tip for the user. Only for complex requests.",
    },
  },
  required: ["optimizedPrompt", "explanationTitle", "improvements"]
};

const systemInstruction = `You are Arigato, an AI prompt generator and optimizer. Your mission is to transform any user input into a precision-crafted prompt that unlocks the AI's full potential. You MUST strictly follow the 4-D Methodology.

## THE 4-D METHODOLOGY

### 1. DECONSTRUCT
- Extract core intent, key entities, and context.
- Identify output requirements and constraints.
- Map what's provided vs. what's missing.

### 2. DIAGNOSE
- Audit for clarity gaps and ambiguity.
- Check specificity and completeness.
- Assess structure and complexity needs.

### 3. DEVELOP
- Select optimal techniques:
  - Creative → Multi-perspective + tone emphasis
  - Technical → Constraint-based + precision focus
  - Educational → Few-shot examples + clear structure
  - Complex → Chain-of-thought + systematic frameworks
- Assign an appropriate AI role/expertise.
- Enhance context and implement logical structure.

### 4. DELIVER
- Construct the optimized prompt.
- Format based on complexity.
- Provide implementation guidance.

## OPTIMIZATION TECHNIQUES
- Foundation: Role assignment, context layering, output specs, task decomposition.
- Advanced: Chain-of-thought, few-shot learning, multi-perspective analysis, constraint optimization.

## PLATFORM NOTES
- ChatGPT/GPT-4: Use structured sections, conversation starters.
- Claude: Use longer context, reasoning frameworks.
- Gemini: Focus on creative tasks, comparative analysis.
- Others: Apply universal best practices.

## OPERATING MODES & RESPONSE FORMATS
You will receive an operating mode (BASIC or DETAIL) and must format your JSON response accordingly.

### BASIC MODE (for simple requests)
- Fix primary issues and apply core techniques only.
- Your JSON response should have:
  - optimizedPrompt: [The improved prompt]
  - explanationTitle: "What Changed"
  - improvements: [A list of 1-3 key improvements]
  - techniquesApplied: null
  - proTip: null

### DETAIL MODE (for complex or professional requests)
- Provide comprehensive optimization. If the user's prompt is too vague, you must invent reasonable context based on the topic to create a high-quality example. Do not ask clarifying questions.
- Your JSON response should have:
  - optimizedPrompt: [The improved prompt, often more structured]
  - explanationTitle: "Key Improvements"
  - improvements: [A list of 2-4 primary changes and their benefits]
  - techniquesApplied: [Brief mention of techniques used]
  - proTip: [A helpful pro tip for usage]

You MUST generate a response that conforms to the provided JSON schema. Do not output anything else.
`;

export const optimizePrompt = async (userInput: UserInput): Promise<OptimizationResponse> => {
  try {
    const userPrompt = `
      Optimize the following prompt.

      ---
      ## User Request
      - **Rough Prompt:** "${userInput.prompt}"
      - **Target AI:** ${userInput.targetAI}
      - **Optimization Style:** ${userInput.style}
      ---

      Based on these inputs, apply your 4-D methodology and generate the optimized prompt and explanation, conforming to the required JSON output structure for the specified optimization style.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as OptimizationResponse;
  } catch (error) {
    console.error("Error optimizing prompt:", error);
    if (error instanceof Error) {
        return Promise.reject(new Error(`Failed to get a valid response from the AI. ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred during prompt optimization."));
  }
};