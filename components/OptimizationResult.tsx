import React, { useState } from 'react';
import type { OptimizationResponse } from '../types';
import CopyIcon from './icons/CopyIcon';

interface OptimizationResultProps {
  result: OptimizationResponse;
}

const OptimizationResult: React.FC<OptimizationResultProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.optimizedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/60 dark:bg-black/40 border border-gray-300 dark:border-cyan-500/30 rounded-lg shadow-2xl animate-fade-in opacity-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-heading tracking-wide">Your Optimized Prompt</h2>
        <div className="relative bg-gray-100 dark:bg-black/50 p-4 rounded-md border border-gray-300 dark:border-gray-700">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Copy to clipboard"
          >
            <CopyIcon className="h-5 w-5" />
          </button>
          <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
            <code>{result.optimizedPrompt}</code>
          </pre>
          {copied && (
             <div className="absolute bottom-2 right-2 text-xs bg-green-500 text-white px-2 py-1 rounded-md animate-fade-in">
                Copied!
             </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-300 dark:border-cyan-500/30 p-6 space-y-6">
        <div>
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-3 font-heading tracking-wide">{result.explanationTitle}</h3>
            <ul className="space-y-2">
                {result.improvements.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-cyan-600 dark:text-cyan-400 mr-2 mt-1">&#10003;</span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                ))}
            </ul>
        </div>

        {result.techniquesApplied && (
            <div>
                <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-2 font-heading tracking-wide">Techniques Applied</h3>
                <p className="text-gray-700 dark:text-gray-300">{result.techniquesApplied}</p>
            </div>
        )}

        {result.proTip && (
             <div className="p-4 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-500/30">
                <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-2 font-heading tracking-wide">Pro Tip</h3>
                <p className="text-gray-700 dark:text-gray-300">{result.proTip}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default OptimizationResult;