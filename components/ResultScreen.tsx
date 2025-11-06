import React from 'react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onPlayAgain }) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  const getResultMessage = () => {
    if (percentage === 100) return "¡Perfecto! ¡Conoces Séneca como la palma de tu mano!";
    if (percentage >= 80) return "¡Excelente! Tienes un gran dominio del sistema.";
    if (percentage >= 50) return "¡Buen trabajo! Sigue repasando para ser un experto.";
    return "Necesitas repasar un poco más. ¡No te rindas!";
  };

  return (
    <div className="bg-slate-800 p-8 rounded-xl shadow-2xl text-center animate-fade-in flex flex-col items-center">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Quiz Completado</h2>
      
      <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center mb-6">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-slate-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-cyan-400"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={(2 * Math.PI * 45) * (1 - percentage / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="flex flex-col">
           <span className="text-5xl md:text-6xl font-bold text-white">{score}</span>
           <span className="text-xl text-slate-400">/ {totalQuestions}</span>
        </div>
      </div>
      
      <p className="text-2xl font-bold text-white mb-2">{percentage}%</p>
      <p className="text-lg text-slate-400 mb-10">{getResultMessage()}</p>
      
      <button
        onClick={onPlayAgain}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-lg"
      >
        Jugar de Nuevo
      </button>
    </div>
  );
};

export default ResultScreen;
