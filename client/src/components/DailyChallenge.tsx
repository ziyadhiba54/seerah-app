import { useState } from 'react';
import { useDailyChallenge } from '@/hooks/useDailyChallenge';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, CheckCircle2, Star, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function DailyChallenge({ isModal = false }: { isModal?: boolean }) {
  const { challenge, isCompleted, completeChallenge } = useDailyChallenge();
  const { addPoints } = useGamification();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  if (!challenge) return null;

  const currentQuestion = challenge.questions[currentQuestionIndex];

  const shareScore = () => {
    const text = t('share_text', { points: challenge.points });
    const url = window.location.origin;
    
    if (navigator.share) {
      navigator.share({
        title: t('app_title'),
        text: text,
        url: url,
      }).catch((error) => {
        console.error('Error sharing:', error);
        // Fallback to clipboard if share fails (common in some webview contexts)
        copyToClipboard(text, url);
      });
    } else {
      copyToClipboard(text, url);
    }
  };

  const copyToClipboard = (text: string, url: string) => {
    navigator.clipboard.writeText(`${text} ${url}`);
    toast({
      title: t('share_score'),
      description: "Copied to clipboard!",
    });
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    
    const isCorrect = index === currentQuestion.answer;
    
    setTimeout(() => {
      if (currentQuestionIndex < challenge.questions.length - 1) {
        if (isCorrect) {
          setCorrectAnswers(prev => prev + 1);
        }
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        const finalCorrectCount = correctAnswers + (isCorrect ? 1 : 0);
        if (finalCorrectCount === challenge.questions.length) {
          addPoints(challenge.points);
          completeChallenge();
        } else {
          // Keep showing result for the last question if wrong
          if (isCorrect) {
             setCorrectAnswers(finalCorrectCount);
          }
        }
      }
    }, 1500);
  };

  const containerClasses = isModal 
    ? "border-none shadow-none bg-background p-6 rounded-none" 
    : "border-2 border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/10 overflow-hidden relative";

  return (
    <div className={containerClasses}>
      {!isModal && (
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Trophy className="w-24 h-24 text-amber-500" />
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
          <Star className="w-5 h-5 fill-current" />
          <h2 className="text-lg font-bold uppercase tracking-wide">
            {t('daily_challenge')}
          </h2>
        </div>
        {!isCompleted && (
          <div className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded">
            {currentQuestionIndex + 1} / {challenge.questions.length}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isCompleted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-6 text-center space-y-3"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{t('challenge_completed')}</h3>
              <p className="text-muted-foreground">{t('come_back_tomorrow')}</p>
            </div>
            <Button onClick={shareScore} variant="outline" className="mt-4 gap-2 border-amber-200 hover:bg-amber-50">
              <Share2 className="w-4 h-4" />
              {t('share_score')}
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className={cn("text-lg font-medium leading-relaxed", i18n.language === 'ar' ? "font-arabic text-right" : "text-left")}>{currentQuestion.question}</p>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedOption === index ? (index === currentQuestion.answer ? "default" : "destructive") : "outline"}
                  className={cn("justify-start h-auto py-3 px-4 text-base", i18n.language === 'ar' ? "text-right font-arabic" : "text-left")}
                  disabled={showResult}
                  onClick={() => handleAnswer(index)}
                >
                  <span className={cn("flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-xs font-bold", i18n.language === 'ar' ? "ml-3" : "mr-3")}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </Button>
              ))}
            </div>
            {showResult && selectedOption !== currentQuestion.answer && (
              <p className="text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-1 text-center">
                {t('try_again_tomorrow')}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
