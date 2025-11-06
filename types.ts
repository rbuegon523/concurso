export interface Answer {
  answerText: string;
  isCorrect: boolean;
}

export interface Question {
  questionText: string;
  answers: Answer[];
  difficulty: Difficulty;
  explanation: string;
}

export type GameState = 'welcome' | 'playing' | 'finished';
export type Difficulty = 'easy' | 'medium' | 'hard';
