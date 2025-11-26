import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'
import { questions } from '../data/questions'

export default function Questionnaire({ userInfo, onSubmit }) {
  const navigate = useNavigate()
  const { t } = useTranslation(['questions', 'common'])
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && answers[currentQuestion.id]) {
        handleNext()
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleBack()
      } else if (e.key >= '1' && e.key <= '5') {
        handleAnswer(currentQuestion.id, parseInt(e.key))
        setTimeout(() => handleNext(), 300)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, answers, currentQuestion])

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (!answers[currentQuestion.id]) return
    if (currentIndex < questions.length - 1) {
      setDirection(1)
      setCurrentIndex(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(prev => prev - 1)
    } else {
      navigate('/')
    }
  }

  const handleSubmit = () => {
    onSubmit(answers)
    navigate('/results')
  }

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0, scale: 0.8 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0, scale: 0.8 })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="absolute top-10 right-10 text-white/20 font-display text-9xl font-bold opacity-10 select-none">
          {currentIndex + 1}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-12 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm font-medium text-gray-400 mb-4">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="relative h-[400px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute w-full"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-12 leading-tight">
                {t(currentQuestion.translationKey)}
              </h2>

              <div className="grid grid-cols-5 gap-2 md:gap-4 max-w-3xl mx-auto">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      handleAnswer(currentQuestion.id, value);
                      setTimeout(() => handleNext(), 400);
                    }}
                    className={cn(
                      "group relative flex flex-col items-center justify-center p-4 md:p-8 rounded-2xl transition-all duration-300 border-2",
                      answers[currentQuestion.id] === value
                        ? "bg-white text-black border-white scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)] z-10"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:scale-105"
                    )}
                  >
                    <span className={cn(
                      "text-2xl md:text-4xl font-bold mb-2 transition-colors",
                      answers[currentQuestion.id] === value ? "text-black" : "text-gray-500 group-hover:text-white"
                    )}>
                      {value}
                    </span>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2">
                      {value === 1 ? 'Disagree' : value === 5 ? 'Agree' : ''}
                    </span>
                    {answers[currentQuestion.id] === value && (
                      <motion.div
                        layoutId="check"
                        className="absolute -top-3 -right-3 bg-secondary-500 text-white rounded-full p-1"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-between text-gray-500 text-sm mt-4 max-w-3xl mx-auto px-2">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-12 max-w-3xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-6 py-3 rounded-full hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('common:back')}</span>
          </button>

          <div className="text-gray-500 text-sm hidden md:block">
            {t('common:pressToSelect')}
          </div>

          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className={cn(
              "flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300",
              answers[currentQuestion.id]
                ? "bg-white text-black hover:scale-105 shadow-lg shadow-white/10"
                : "bg-white/5 text-gray-500 cursor-not-allowed"
            )}
          >
            <span>{t('common:next')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}