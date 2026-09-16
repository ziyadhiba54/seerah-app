import { useState, useEffect } from 'react';
import i18n from '@/lib/i18n';
import data from '@/data/seerah.json';
import { AppData } from '@/types';

const appData = data as unknown as AppData & { daily_challenge_questions: any[] };

export function useDailyChallenge() {
  const [challenge, setChallenge] = useState<{
    questions: Array<{
      question: string;
      options: string[];
      answer: number;
    }>;
    points: number;
  } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastCompleted = localStorage.getItem('daily_challenge_last_completed');

    if (lastCompleted === today) {
      setIsCompleted(true);
    }

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);

    const allQuestions = appData.daily_challenge_questions || [];

    const easy   = allQuestions.filter((q: any) => q.difficulty === 'easy');
    const medium  = allQuestions.filter((q: any) => q.difficulty === 'medium');
    const hard    = allQuestions.filter((q: any) => q.difficulty === 'hard');

    // Each day: 1 easy + 2 medium + 1 hard — shuffled into random order
    const pick = (pool: any[], seed: number) => pool[seed % pool.length];

    const easyQ  = pick(easy,   dayOfYear);
    const medQ1  = pick(medium, dayOfYear);
    const medQ2  = pick(medium, dayOfYear + Math.floor(medium.length / 2));
    const hardQ  = pick(hard,   dayOfYear);

    const selectedQuestions = [easyQ, medQ1, hardQ, medQ2].filter(Boolean);

    if (selectedQuestions.length > 0) {
      setChallenge({
        questions: selectedQuestions.map((q: any) => {
          const lang = i18n.language;
          let options = q.options;
          let questionText = q.question;

          if (lang === 'en' && q.question_en) {
            questionText = q.question_en;
            if (q.options_en) options = q.options_en;
          } else if (lang === 'fr' && q.question_fr) {
            questionText = q.question_fr;
            if (q.options_fr) options = q.options_fr;
          }

          return {
            question: questionText,
            options: options,
            answer: typeof q.answer === 'number' ? q.answer : 0
          };
        }),
        points: 50 * selectedQuestions.length
      });
    }
  }, []);

  const completeChallenge = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('daily_challenge_last_completed', today);
    setIsCompleted(true);
  };

  return { challenge, isCompleted, completeChallenge };
}
