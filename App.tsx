import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { GameState, Difficulty, Question } from './types';
import { QUIZ_QUESTIONS } from './constants';

const shuffleArray = (array: Question[]): Question[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [score, setScore] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const handleStartQuiz = useCallback((difficulty: Difficulty) => {
    setScore(0);
    setDifficulty(difficulty);
    setGameState('playing');
  }, []);

  const handleQuizFinish = useCallback((finalScore: number) => {
    setScore(finalScore);
    setGameState('finished');
  }, []);
  
  const handlePlayAgain = useCallback(() => {
    setGameState('welcome');
  }, []);

  const getFilteredQuestions = () => {
    const easyQuestions = QUIZ_QUESTIONS.filter(q => q.difficulty === 'easy');
    const mediumQuestions = QUIZ_QUESTIONS.filter(q => q.difficulty === 'medium');
    const hardQuestions = QUIZ_QUESTIONS.filter(q => q.difficulty === 'hard');

    let selectedQuestions: Question[] = [];

    switch (difficulty) {
      case 'easy':
        selectedQuestions = [
          ...shuffleArray(easyQuestions), // 10
          ...shuffleArray(mediumQuestions).slice(0, 15), // 15
          ...shuffleArray(hardQuestions).slice(0, 5), // 5
        ];
        break;
      case 'medium':
        selectedQuestions = [
          ...shuffleArray(easyQuestions).slice(0, 5), // 5
          ...shuffleArray(mediumQuestions), // 16
          ...shuffleArray(hardQuestions).slice(0, 9), // 9
        ];
        break;
      case 'hard':
        selectedQuestions = [
          ...shuffleArray(easyQuestions).slice(0, 2), // 2
          ...shuffleArray(mediumQuestions).slice(0, 14), // 14
          ...shuffleArray(hardQuestions), // 14
        ];
        break;
      default:
        // Fallback to a random mix if difficulty is not set
        selectedQuestions = shuffleArray(QUIZ_QUESTIONS).slice(0, 30);
        break;
    }
    
    return shuffleArray(selectedQuestions);
  };

  const renderGameState = () => {
    const filteredQuestions = getFilteredQuestions();

    switch (gameState) {
      case 'playing':
        return (
          <QuizScreen 
            questions={filteredQuestions} 
            onFinish={handleQuizFinish}
            onGoHome={handlePlayAgain}
          />
        );
      case 'finished':
        return (
          <ResultScreen 
            score={score} 
            totalQuestions={filteredQuestions.length} 
            onPlayAgain={handlePlayAgain} 
          />
        );
      case 'welcome':
      default:
        return <WelcomeScreen onStart={handleStartQuiz} />;
    }
  };

  return (
    <main className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        {renderGameState()}
      </div>
    </main>
  );
};

export default App;
