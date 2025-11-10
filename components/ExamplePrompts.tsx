import React from 'react';

interface ExamplePromptsProps {
  onExampleClick: (prompt: string) => void;
}

const examples = [
  {
    title: 'Simplify a Topic',
    prompt: "Explain the concept of blockchain in simple terms a beginner can understand.",
  },
  {
    title: 'Write Python Code',
    prompt: "Write a Python function to check if a number is prime. Include comments explaining the logic.",
  },
  {
    title: 'Draft an Essay',
    prompt: "Write a short, easy-to-understand essay (around 300 words) on the importance of bees for the ecosystem.",
  },
];

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onExampleClick }) => {
  return (
    <div className="mt-8 text-center">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Not sure where to start? Try an example:</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example.prompt)}
            className="bg-gray-800/70 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 hover:border-indigo-500/50 transition-all duration-200 text-left shadow-md"
          >
            <p className="font-semibold text-white">{example.title}</p>
            <p className="text-sm text-gray-400 mt-1 max-w-xs">{example.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamplePrompts;
