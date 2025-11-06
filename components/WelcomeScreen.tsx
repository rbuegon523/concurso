import React, { useState } from 'react';
import { Difficulty } from '../types';

interface WelcomeScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const difficultyOptions: { id: Difficulty; label: string }[] = [
    { id: 'easy', label: 'Fácil' },
    { id: 'medium', label: 'Medio' },
    { id: 'hard', label: 'Difícil' },
  ];

  return (
    <div className="bg-slate-800 p-8 rounded-xl shadow-2xl text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">Quiz de Gestión Económica</h1>
      <p className="text-2xl text-slate-300 mb-8">Plataforma Séneca</p>
      <p className="text-slate-400 mb-10 max-w-lg mx-auto">
        Pon a prueba tus conocimientos sobre la documentación del curso de Gestión Económica para Secretarías de Centros Educativos.
      </p>

      <div className="mb-10">
        <h3 className="text-lg font-semibold text-slate-300 mb-3">Elige la Dificultad</h3>
        <div className="flex justify-center gap-3">
          {difficultyOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setDifficulty(option.id)}
              className={`font-bold py-2 px-5 rounded-lg text-base transition-colors ${
                difficulty === option.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(difficulty)}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-lg"
      >
        Empezar Quiz
      </button>
    </div>
  );
};

export default WelcomeScreen;
