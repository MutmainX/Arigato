import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

const examples = [
  {
    title: 'Simplify a Complex Topic',
    before: 'explain blockchain',
    after: 'Act as an expert teacher specializing in making complex topics simple. Your goal is to explain "blockchain" to a complete beginner. Use an analogy, break down key features (decentralization, immutability), and give a real-world example.'
  },
  {
    title: 'Generate Explained Code',
    before: 'python code for prime number',
    after: 'You are a senior Python developer and coding mentor. Write an efficient `is_prime` function in Python. Include a clear docstring, and add line-by-line comments explaining the core logic, especially the optimization of checking up to the square root.'
  },
  {
    title: 'Draft a Simple Essay',
    before: 'write essay on bees',
    after: 'Assume the role of a science writer for a student magazine. Write a simple, 300-word essay on the importance of bees for the ecosystem. Structure it with a clear introduction, a body paragraph on pollination, and a conclusion calling for their protection.'
  }
];

const ShowcaseExamples: React.FC = () => {
  return (
    <div className="mt-16 animate-slide-in-up opacity-0 animate-delay-600">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-heading tracking-wide" style={{textShadow: '0 0 10px var(--color-cyan)'}}>See How It Works</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Arigato turns simple ideas into powerful, detailed prompts that get you the best results from any AI.
        </p>
      </div>
      <div className="space-y-12">
        {examples.map((example, index) => (
          <div key={index} className="text-left animate-fade-in opacity-0" style={{animationDelay: `${600 + (index+1) * 200}ms`, animationFillMode: 'forwards'}}>
            <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-300 mb-4 font-heading tracking-wide">{example.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-6">
              {/* Before */}
              <div className="bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-md h-full transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 hover:scale-[1.02]">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 tracking-wider">BEFORE</p>
                <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">"{example.before}"</p>
              </div>
              
              {/* Arrow */}
              <div className="flex items-center justify-center">
                <ArrowRightIcon className="h-8 w-8 text-cyan-500 mx-auto transform md:rotate-0 rotate-90" style={{filter: 'drop-shadow(0 0 5px var(--color-cyan))'}}/>
              </div>

              {/* After */}
              <div className="p-[1.5px] bg-gradient-to-br from-cyan-500/60 to-transparent rounded-lg h-full transition-all duration-300 hover:scale-[1.02] shadow-xl">
                <div className="bg-gray-50 dark:bg-gray-950/80 h-full rounded-lg p-4">
                    <p className="text-sm font-semibold text-cyan-500 dark:text-cyan-300 mb-2 tracking-wider">AFTER (OPTIMIZED)</p>
                    <p className="text-gray-800 dark:text-gray-200 text-sm">"{example.after}"</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowcaseExamples;