
export enum TargetAI {
  GEMINI = 'Gemini',
  CHATGPT = 'ChatGPT',
  CLAUDE = 'Claude',
  OTHER = 'Other',
}

export enum PromptStyle {
  BASIC = 'BASIC',
  DETAIL = 'DETAIL',
}

export interface UserInput {
  prompt: string;
  targetAI: TargetAI;
  style: PromptStyle;
}

export interface OptimizationResponse {
  optimizedPrompt: string;
  explanationTitle: string;
  improvements: string[];
  techniquesApplied?: string;
  proTip?: string;
}
