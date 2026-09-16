import { useState } from "react";
import { Question } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGamification } from "@/hooks/useGamification";

interface QuizProps {
  questions: Question[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const { t, i18n } = useTranslation();
  const { addPoints } = useGamification();

  const question = questions[currentQuestion];
  const qText = i18n.language === 'en' && question.question_en ? question.question_en : 
                i18n.language === 'fr' && question.question_fr ? question.question_fr : 
                question.question;
                
  const qOptions = i18n.language === 'en' && question.options_en ? question.options_en : 
                   i18n.language === 'fr' && question.options_fr ? question.options_fr : 
                   question.options;

  const handleAnswer = (answer: number | boolean) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = (answer === question.correctAnswer) || 
                     (answer === question.answer) ||
                     (typeof answer === 'boolean' && (String(answer) === String(question.correctAnswer) || String(answer) === String(question.answer)));

    if (isCorrect) {
      setScore(score + 1);
      addPoints(10);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      if (score === questions.length) {
        addPoints(50); // Bonus for perfect score
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold font-arabic mb-2">{t('well_done')}</h3>
            <p className="text-muted-foreground">
              {t('score_message', { score, total: questions.length })}
            </p>
          </div>
          <Button onClick={resetQuiz} className="w-full sm:w-auto">
            {t('retry')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-border/50">
      <CardHeader className="bg-muted/30 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-arabic text-lg">
            <HelpCircle className="w-5 h-5 text-primary" />
            {t('quiz_title')}
          </CardTitle>
          <span className="text-sm text-muted-foreground font-mono">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <div className="h-1 w-full bg-muted mt-4 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-medium leading-relaxed">
              {qText}
            </h3>

            <div className="grid gap-3">
              {question.type === 'mcq' && qOptions ? (
                qOptions.map((option, idx) => {
                  const isCorrectIdx = idx === question.correctAnswer || idx === question.answer;
                  const isWrongSelected = isAnswered && selectedAnswer === idx && !isCorrectIdx;
                  return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-4 px-6 text-base font-normal hover:bg-muted/50 transition-colors",
                      i18n.language === 'ar' ? "text-right" : "text-left",
                      isAnswered && isCorrectIdx && "bg-green-100 border-green-500 text-green-700 hover:bg-green-100",
                      isWrongSelected && "bg-red-100 border-red-500 text-red-700 hover:bg-red-100",
                      !isAnswered && selectedAnswer === idx && "border-primary bg-primary/5"
                    )}
                    onClick={() => handleAnswer(idx)}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center w-full">
                      <span className={cn(
                        "w-8 h-8 rounded-full border flex items-center justify-center text-sm shrink-0 bg-background text-muted-foreground",
                        i18n.language === 'ar' ? "ml-4" : "mr-4"
                      )}>
                        {idx + 1}
                      </span>
                      {option}
                      {isAnswered && isCorrectIdx && (
                        <CheckCircle2 className={cn("w-5 h-5 text-green-600", i18n.language === 'ar' ? "mr-auto" : "ml-auto")} />
                      )}
                      {isWrongSelected && (
                        <XCircle className={cn("w-5 h-5 text-red-600", i18n.language === 'ar' ? "mr-auto" : "ml-auto")} />
                      )}
                    </div>
                  </Button>
                  );
                })
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {[true, false].map((val) => (
                    <Button
                      key={val.toString()}
                      variant="outline"
                      className={cn(
                        "h-auto py-6 text-lg transition-all",
                        isAnswered && (val === (question.correctAnswer === true || String(question.correctAnswer) === 'true' || question.answer === true || String(question.answer) === 'true')) && "bg-green-100 border-green-500 text-green-700 hover:bg-green-100",
                        isAnswered && selectedAnswer === val && !(val === (question.correctAnswer === true || String(question.correctAnswer) === 'true' || question.answer === true || String(question.answer) === 'true')) && "bg-red-100 border-red-500 text-red-700 hover:bg-red-100"
                      )}
                      onClick={() => handleAnswer(val)}
                      disabled={isAnswered}
                    >
                      {val ? t('correct') : t('wrong')}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex justify-end"
          >
            <Button onClick={nextQuestion} size="lg" className="gap-2">
              {currentQuestion < questions.length - 1 ? t('next_question') : t('show_result')}
              {i18n.language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
