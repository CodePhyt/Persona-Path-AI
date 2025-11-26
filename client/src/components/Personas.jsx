import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Heart, Zap, Target, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

// Emoji representations for each personality type
const personalityEmojis = {
  // MBTI
  'INTJ': '🧠', 'ENFJ': '✨', 'INTP': '💡', 'ENFP': '🎨', 'ISTJ': '📋', 'ESFJ': '🤝',
  'ISTP': '🔧', 'ESFP': '🎭', 'INFJ': '🔮', 'ENTJ': '👑', 'INFP': '🌸', 'ENTP': '🎯',
  'ISFJ': '🛡️', 'ESTJ': '⚖️', 'ISFP': '🎨', 'ESTP': '⚡',
  // Enneagram
  'Type 1': '⚖️', 'Type 2': '❤️', 'Type 3': '🏆', 'Type 4': '🎭', 'Type 5': '📚',
  'Type 6': '🛡️', 'Type 7': '🎉', 'Type 8': '💪', 'Type 9': '☮️',
  // DISC
  'D-Style': '🎯', 'I-Style': '🌟', 'S-Style': '🤝', 'C-Style': '📊',
  // Temperament
  'Choleric': '🔥', 'Sanguine': '☀️', 'Phlegmatic': '🌊', 'Melancholic': '🌙',
  // Big Five
  'High Openness': '🌈', 'High Conscientiousness': '📋', 'High Extraversion': '🎤',
  'High Agreeableness': '🤗', 'High Neuroticism': '🎭'
};

// Gradient colors for each type
const gradientColors = {
  'INTJ': 'from-purple-500 to-blue-600', 'ENFJ': 'from-pink-500 to-rose-600',
  'INTP': 'from-blue-500 to-cyan-600', 'ENFP': 'from-orange-500 to-pink-600',
  'ISTJ': 'from-gray-600 to-blue-700', 'ESFJ': 'from-green-500 to-teal-600',
  'ISTP': 'from-slate-600 to-gray-700', 'ESFP': 'from-yellow-500 to-orange-600',
  'INFJ': 'from-indigo-500 to-purple-600', 'ENTJ': 'from-red-600 to-purple-700',
  'INFP': 'from-purple-400 to-pink-500', 'ENTP': 'from-cyan-500 to-blue-600',
  'ISFJ': 'from-blue-400 to-indigo-500', 'ESTJ': 'from-amber-600 to-red-700',
  'ISFP': 'from-rose-400 to-pink-500', 'ESTP': 'from-orange-600 to-red-700',
  'Type 1': 'from-blue-600 to-indigo-700', 'Type 2': 'from-red-500 to-pink-600',
  'Type 3': 'from-yellow-500 to-orange-600', 'Type 4': 'from-purple-500 to-pink-600',
  'Type 5': 'from-green-600 to-teal-700', 'Type 6': 'from-blue-500 to-cyan-600',
  'Type 7': 'from-yellow-400 to-orange-500', 'Type 8': 'from-red-600 to-orange-700',
  'Type 9': 'from-green-500 to-emerald-600', 'D-Style': 'from-red-600 to-orange-700',
  'I-Style': 'from-yellow-500 to-orange-600', 'S-Style': 'from-green-500 to-teal-600',
  'C-Style': 'from-blue-600 to-indigo-700', 'Choleric': 'from-red-600 to-orange-700',
  'Sanguine': 'from-yellow-500 to-orange-600', 'Phlegmatic': 'from-blue-500 to-cyan-600',
  'Melancholic': 'from-purple-600 to-indigo-700', 'High Openness': 'from-purple-500 to-pink-600',
  'High Conscientiousness': 'from-blue-600 to-indigo-700', 'High Extraversion': 'from-orange-500 to-red-600',
  'High Agreeableness': 'from-green-500 to-emerald-600', 'High Neuroticism': 'from-indigo-500 to-purple-600'
};

const systemIcons = { mbti: Brain, enneagram: Sparkles, disc: Target, temperament: Heart, bigFive: Users };

const personaTypes = {
  mbti: ['INTJ', 'ENFJ', 'INTP', 'ENFP', 'ISTJ', 'ESFJ', 'ISTP', 'ESFP', 'INFJ', 'ENTJ', 'INFP', 'ENTP', 'ISFJ', 'ESTJ', 'ISFP', 'ESTP'],
  enneagram: ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5', 'Type 6', 'Type 7', 'Type 8', 'Type 9'],
  disc: ['D-Style', 'I-Style', 'S-Style', 'C-Style'],
  temperament: ['Choleric', 'Sanguine', 'Phlegmatic', 'Melancholic'],
  bigFive: ['High Openness', 'High Conscientiousness', 'High Extraversion', 'High Agreeableness', 'High Neuroticism']
};

export default function Personas() {
  const { t } = useTranslation(['personas', 'common']);
  const [activeSystem, setActiveSystem] = useState('mbti');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-20 px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-background to-background" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {t('title')}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {Object.keys(personaTypes).map((system, index) => {
            const Icon = systemIcons[system];
            return (
              <motion.button key={system} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} onClick={() => setActiveSystem(system)} className={cn("px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 border", activeSystem === system ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/30")}>
                <Icon className="w-4 h-4" />
                {t(`systems.${system}`)}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeSystem} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personaTypes[activeSystem].map((type, index) => {
              // Construct keys for translation lookups
              // Example: mbti.INTJ.title, mbti.INTJ.description
              const systemKey = activeSystem;
              const typeKey = type;

              // Get arrays from translation
              const strengths = t(`${systemKey}.${typeKey}.strengths`, { returnObjects: true });
              const careers = t(`${systemKey}.${typeKey}.careers`, { returnObjects: true });

              // Ensure they are arrays
              const strengthsList = Array.isArray(strengths) ? strengths : [];
              const careersList = Array.isArray(careers) ? careers : [];

              return (
                <motion.div key={type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="glass-card p-8 group hover:border-primary-500/30 transition-colors">
                  <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <div className={cn("w-full h-full rounded-2xl bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg", gradientColors[type])}>
                      <span className="text-5xl">{personalityEmojis[type]}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-2 text-center">{type}</h3>
                  <p className="text-primary-400 text-center font-medium mb-4">{t(`${systemKey}.${typeKey}.title`)}</p>
                  <p className="text-gray-400 text-center mb-8 text-sm leading-relaxed">{t(`${systemKey}.${typeKey}.description`)}</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Zap className="w-3 h-3" /> {t('strengths')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {strengthsList.map((strength, idx) => (
                          <span key={idx} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/5">{strength}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Target className="w-3 h-3" /> {t('careers')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {careersList.map((career, idx) => (
                          <span key={idx} className="text-xs bg-primary-500/10 text-primary-300 px-2 py-1 rounded border border-primary-500/20">{career}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-20 text-center">
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <span>{t('common:beginYourJourney')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}