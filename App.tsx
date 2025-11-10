import React, { useState, useEffect } from 'react';
import PromptForm from './components/PromptForm';
import OptimizationResult from './components/OptimizationResult';
import Loader from './components/Loader';
import ShowcaseExamples from './components/ShowcaseExamples';
import ThemeToggle from './components/ThemeToggle';
import { TargetAI, PromptStyle } from './types';
import type { UserInput, OptimizationResponse } from './types';
import { optimizePrompt } from './services/geminiService';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    prompt: '',
    targetAI: TargetAI.GEMINI,
    style: PromptStyle.BASIC,
  });
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    // If a theme is saved in localStorage, use it. Otherwise, default to 'dark'.
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.prompt) return;

    setIsLoading(true);
    setError(null);
    setOptimizationResult(null);
    if(isFirstLoad) setIsFirstLoad(false);

    try {
      const result = await optimizePrompt(userInput);
      setOptimizationResult(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const WelcomeMessage = () => (
    <div className="text-center p-6 bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-gray-300 dark:border-cyan-500/30 rounded-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-heading tracking-wide">Hello! I'm Arigato, your AI prompt optimizer.</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        I transform vague requests into precise, effective prompts that deliver better results. 
        Just share your rough prompt, choose a target AI and style, and I'll handle the optimization!
        </p>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      <main className="w-full max-w-3xl mx-auto flex-grow">
        <header className="text-center mb-10 animate-slide-in-up opacity-0">
          <h1 className="text-6xl md:text-7xl font-bold neon-cyan-text">
            Arigato
          </h1>
          <p className="text-cyan-600 dark:text-cyan-300 mt-4 uppercase tracking-widest text-sm" style={{textShadow: '0 0 5px var(--color-cyan)'}}>
            AI Prompt Generator & Optimizer
          </p>
        </header>

        <WelcomeMessage />

        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-gray-300 dark:border-cyan-500/30 rounded-xl shadow-2xl p-6 md:p-8 animate-slide-in-up opacity-0 animate-delay-400">
            <PromptForm 
                userInput={userInput} 
                setUserInput={setUserInput} 
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>

        <div className="mt-12 animate-fade-in opacity-0" style={{animationDelay: '800ms', animationFillMode: 'forwards'}}>
            {isLoading && <Loader />}
            {error && (
                <div className="bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-300 p-4 rounded-lg text-center">
                    <p className="font-semibold">Oops! Something went wrong.</p>
                    <p>{error}</p>
                </div>
            )}
            {optimizationResult && <OptimizationResult result={optimizationResult} />}
        </div>
        
        {isFirstLoad && <ShowcaseExamples />}

      </main>
      <footer className="text-center text-gray-500 dark:text-gray-600 mt-12 py-4 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;