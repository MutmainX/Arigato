import React from 'react';
import { TargetAI, PromptStyle } from '../types';
import type { UserInput } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface PromptFormProps {
  userInput: UserInput;
  setUserInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ userInput, setUserInput, onSubmit, isLoading }) => {
  
  const handleInputChange = <K extends keyof UserInput,>(key: K, value: UserInput[K]) => {
    setUserInput(prev => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 font-heading tracking-wider">
          Your Rough Prompt
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={6}
          className="block w-full bg-white/50 dark:bg-black/40 border border-gray-300 dark:border-cyan-500/30 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 dark:text-gray-100 p-4 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-500"
          placeholder="Enter your idea, question, or task here..."
          value={userInput.prompt}
          onChange={(e) => handleInputChange('prompt', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 font-heading tracking-wider">Target AI</h3>
          <div className="flex flex-wrap gap-2">
            {(Object.values(TargetAI)).map(ai => (
              <button
                key={ai}
                type="button"
                onClick={() => handleInputChange('targetAI', ai)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 transform active:scale-95 ${
                  userInput.targetAI === ai
                    ? 'bg-cyan-500 text-black shadow-lg ring-2 ring-cyan-400 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900'
                    : 'bg-gray-200 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {ai}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 font-heading tracking-wider">Prompt Style</h3>
          <div className="flex flex-wrap gap-2">
             {(Object.values(PromptStyle)).map(style => (
              <button
                key={style}
                type="button"
                onClick={() => handleInputChange('style', style)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 transform active:scale-95 ${
                  userInput.style === style
                    ? 'bg-cyan-500 text-black shadow-lg ring-2 ring-cyan-400 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900'
                    : 'bg-gray-200 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {style.charAt(0) + style.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-lg shadow-lg text-black bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-cyan-400/50 dark:disabled:bg-cyan-900/50 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95"
        >
          {isLoading ? (
            'Optimizing...'
          ) : (
            <>
              <SparklesIcon className="h-5 w-5 mr-2" />
              Optimize Prompt
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;