import React, { useState } from 'react';
import { Question } from '../types';

interface QuizScreenProps {
  questions: Question[];
  onFinish: (score: number) => void;
  onGoHome: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish, onGoHome }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswerIndex !== null) return;

    setSelectedAnswerIndex(answerIndex);

    const correct = questions[currentQuestionIndex].answers[answerIndex].isCorrect;
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      onFinish(score);
    }
  };
  
  const getButtonClass = (index: number) => {
    const isAnswered = selectedAnswerIndex !== null;

    if (!isAnswered) {
      return 'bg-slate-700 hover:bg-slate-600 border-transparent';
    }

    const isCorrectAnswer = questions[currentQuestionIndex].answers[index].isCorrect;
    const isSelected = selectedAnswerIndex === index;

    if (isCorrectAnswer) {
      return 'bg-green-500/20 border-green-500';
    }
    
    if (isSelected && !isCorrectAnswer) {
      return 'bg-red-500/20 border-red-500';
    }
    
    return 'bg-slate-700 border-transparent opacity-50';
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return <div className="bg-slate-800 p-8 rounded-xl shadow-2xl text-center">No hay preguntas para esta dificultad.</div>
  }

  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full">
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2 text-slate-400">
          <span className="text-sm">Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
          <span className="text-2xl font-bold text-cyan-400">Puntuación: {score}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-100">{currentQuestion.questionText}</h2>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={selectedAnswerIndex !== null}
            className={`w-full p-4 rounded-lg text-left text-lg transition-colors duration-300 border-2 ${getButtonClass(index)} ${selectedAnswerIndex === null ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {answer.answerText}
          </button>
        ))}
      </div>

      {selectedAnswerIndex !== null && (
        <div className="mt-6 p-4 bg-slate-900/50 rounded-lg animate-fade-in border-l-4 border-cyan-500">
          <h4 className="font-bold text-cyan-400 mb-2">Explicación:</h4>
          <p className="text-slate-300">{currentQuestion.explanation}</p>
        </div>
      )}
      
      {selectedAnswerIndex !== null && (
        <div className="flex justify-end mt-4 animate-fade-in">
          <button
            onClick={handleNextQuestion}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Siguiente' : 'Finalizar'}
          </button>
        </div>
      )}
      
      <div className="border-t border-slate-700 my-8"></div>
      <div className="text-center">
        <button
          onClick={onGoHome}
          className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-2 px-5 rounded-lg text-sm transition-colors"
          aria-label="Volver al inicio"
        >
          EMPEZAR
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;