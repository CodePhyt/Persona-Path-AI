import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts'
import { Sparkles, ArrowRight, Brain, Target, Zap, TrendingUp, Award, Users, Heart, Compass, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import html2pdf from 'html2pdf.js'
import { cn } from '../lib/utils'
import { questions } from '../data/questions'
import { matchPersonality, getPersonalityDetails } from '../utils/personalityMatcher'

// Emoji mapping for personality types
const personalityEmojis = {
  'INTJ': '🧠', 'ENFJ': '✨', 'INTP': '💡', 'ENFP': '🎨', 'ISTJ': '📋', 'ESFJ': '🤝',
  'ISTP': '🔧', 'ESFP': '🎭', 'INFJ': '🔮', 'ENTJ': '👑', 'INFP': '🌸', 'ENTP': '🎯',
  'ISFJ': '🛡️', 'ESTJ': '⚖️', 'ISFP': '🎨', 'ESTP': '⚡',
  'Type 1': '⚖️', 'Type 2': '❤️', 'Type 3': '🏆', 'Type 4': '🎭', 'Type 5': '📚',
  'Type 6': '🛡️', 'Type 7': '🎉', 'Type 8': '💪', 'Type 9': '☮️',
  'D-Style': '🎯', 'I-Style': '🌟', 'S-Style': '🤝', 'C-Style': '📊',
  'Choleric': '🔥', 'Sanguine': '☀️', 'Phlegmatic': '🌊', 'Melancholic': '🌙',
  'High Openness': '🌈', 'High Conscientiousness': '📋', 'High Extraversion': '🎤',
  'High Agreeableness': '🤗', 'High Neuroticism': '🎭'
};

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
  'High Agreeableness': 'from-green-500 to-emerald-600'
    < div className="flex items-center gap-3 mb-2" >
              <span className="text-sm font-mono text-primary-400">STEP {index + 1}</span>
              <h3 className="text-xl font-bold font-display text-white">{step.step_title}</h3>
            </div >
  <p className="text-gray-400 leading-relaxed">{step.step_description}</p>
          </div >
{
  step.imageUrl && (
    <div className="w-full md:w-64 aspect-video rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-secondary-900/50 animate-pulse flex items-center justify-center">
          <div className="text-white/50 text-xs">Loading...</div>
        </div>
      )}
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🖼️</div>
            <span className="text-white/50 text-xs">{step.step_title}</span>
          </div>
        </div>
      )}
      <img
        src={step.imageUrl}
        alt={step.step_title}
        className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
        crossOrigin="anonymous"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      {imageLoaded && (
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs font-medium truncate">
          {step.step_title}
        </div>
      )}
    </div>
  )
}
        </div >
      </div >
    </motion.div >
  )
}

export default function ResultsDisplay({ results, answers, userInfo }) {
  const navigate = useNavigate()
  const enneagramDetails = getPersonalityDetails(personalityMatch.enneagram, 'enneagram');
  const discDetails = getPersonalityDetails(personalityMatch.disc, 'disc');
  const temperamentDetails = getPersonalityDetails(personalityMatch.temperament, 'temperament');

  const calculateChartData = () => {
    if (!answers) return []
    const categoryMapping = {
      'planning': 'Logic', 'risk_tolerance': 'Drive', 'adaptability': 'Adaptability',
      'collaboration': 'Empathy', 'growth_mindset': 'Vision', 'learning_orientation': 'Vision',
      'focus': 'Logic', 'leadership': 'Drive', 'analytical_thinking': 'Logic',
      'persistence': 'Drive', 'structure_preference': 'Logic', 'ambiguity_tolerance': 'Adaptability',
      'proactivity': 'Drive', 'learning_style': 'Adaptability', 'goal_orientation': 'Vision',
      'relationship_depth': 'Empathy', 'conflict_resolution': 'Empathy', 'love_language': 'Empathy',
      'emotional_expression': 'Empathy', 'relationship_independence': 'Logic', 'lifestyle_pace': 'Drive',
      'health_consciousness': 'Logic', 'social_orientation': 'Empathy', 'organization_preference': 'Logic',
      'outdoor_preference': 'Adaptability', 'sports_social': 'Empathy', 'competitiveness': 'Drive',
      'sports_adventure': 'Adaptability', 'exercise_structure': 'Logic', 'sports_strategy': 'Logic',
      'creative_interests': 'Creativity', 'intellectual_hobbies': 'Logic', 'collecting_interest': 'Logic',
      'skill_development': 'Vision', 'altruistic_hobbies': 'Empathy', 'pace_preference': 'Drive',
      'detail_orientation': 'Logic', 'networking': 'Empathy', 'relocation_openness': 'Adaptability',
      'work_life_balance': 'Vision'
    }

    const scores = {
      'Vision': { total: 0, count: 0 }, 'Drive': { total: 0, count: 0 },
      'Empathy': { total: 0, count: 0 }, 'Logic': { total: 0, count: 0 },
      'Adaptability': { total: 0, count: 0 }, 'Creativity': { total: 0, count: 0 }
    }

    Object.entries(answers).forEach(([questionId, score]) => {
      const question = questions.find(q => q.id === parseInt(questionId))
      if (question) {
        const category = categoryMapping[question.trait] || 'Vision'
        if (scores[category]) {
          scores[category].total += score
          scores[category].count += 1
        }
      }
    })

    return Object.keys(scores).map(category => {
      const { total, count } = scores[category]
      const average = count > 0 ? (total / count) : 0
      return { subject: category, value: Math.round(average * 20), percentage: Math.round((average / 5) * 100) }
    })
  }

  const chartData = calculateChartData()
  const topTraits = [...chartData].sort((a, b) => b.value - a.value).slice(0, 3)

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div ref={resultsRef}>
        {/* Matched Personality Hero */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
          <div className="glass-panel p-12 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className={cn("w-32 h-32 rounded-3xl bg-gradient-to-br flex items-center justify-center shadow-2xl", gradientColors[personalityMatch.mbti])}>
                  <span className="text-7xl">{personalityEmojis[personalityMatch.mbti]}</span>
                </div>
              </div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
                You are {personalityMatch.mbti === 'INTJ' || personalityMatch.mbti === 'INFJ' || personalityMatch.mbti === 'ISFJ' || personalityMatch.mbti === 'ISTJ' || personalityMatch.mbti === 'ENFJ' || personalityMatch.mbti === 'ESFJ' || personalityMatch.mbti === 'ENTJ' || personalityMatch.mbti === 'ESTJ' ? 'an' : 'a'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">{personalityMatch.mbti}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl text-primary-400 font-semibold mb-2">
                {mbtiDetails?.title}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-gray-400 text-lg max-w-2xl mx-auto">
                {mbtiDetails?.description}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Comprehensive Personality Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-3xl font-bold font-display mb-6 flex items-center gap-3">
            <Compass className="w-8 h-8 text-primary-400" />
            Your Complete Personality Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* MBTI */}
            <div className="glass-card p-6 hover:border-primary-500/30 transition-colors">
              <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4", gradientColors[personalityMatch.mbti])}>
                <span className="text-3xl">{personalityEmojis[personalityMatch.mbti]}</span>
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">MBTI Type</div>
              <div className="text-2xl font-bold text-white mb-1">{personalityMatch.mbti}</div>
              <div className="text-sm text-primary-400">{mbtiDetails?.title}</div>
            </div>

            {/* Enneagram */}
            <div className="glass-card p-6 hover:border-primary-500/30 transition-colors">
              <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4", gradientColors[personalityMatch.enneagram])}>
                <span className="text-3xl">{personalityEmojis[personalityMatch.enneagram]}</span>
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Enneagram</div>
              <div className="text-2xl font-bold text-white mb-1">{personalityMatch.enneagram}</div>
              <div className="text-sm text-primary-400">{enneagramDetails?.title}</div>
            </div>

            {/* DISC */}
            <div className="glass-card p-6 hover:border-primary-500/30 transition-colors">
              <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4", gradientColors[personalityMatch.disc])}>
                <span className="text-3xl">{personalityEmojis[personalityMatch.disc]}</span>
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">DISC Style</div>
              <div className="text-2xl font-bold text-white mb-1">{personalityMatch.disc}</div>
              <div className="text-sm text-primary-400">{discDetails?.title}</div>
            </div>

            {/* Temperament */}
            <div className="glass-card p-6 hover:border-primary-500/30 transition-colors">
              <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4", gradientColors[personalityMatch.temperament])}>
                <span className="text-3xl">{personalityEmojis[personalityMatch.temperament]}</span>
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Temperament</div>
              <div className="text-2xl font-bold text-white mb-1">{personalityMatch.temperament}</div>
              <div className="text-sm text-primary-400">{temperamentDetails?.title}</div>
            </div>
          </div>
        </motion.div>

        {/* Big Five Traits */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-panel p-8 rounded-2xl">
          <h3 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary-400" />
            Dominant Big Five Traits
          </h3>
          <div className="flex flex-wrap gap-3">
            {personalityMatch.bigFive.map((trait, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <span className="text-2xl">{personalityEmojis[trait]}</span>
                <span className="text-white font-medium">{trait}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top 3 Traits Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {topTraits.map((trait, idx) => (
            <div key={trait.subject} className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-2">#{idx + 1}</div>
              <div className="text-lg font-semibold text-white mb-1">{trait.subject}</div>
              <div className="text-3xl font-bold text-primary-400">{trait.percentage}%</div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

          {/* Core Analysis */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Brain className="w-32 h-32" />
            </div>
            <h2 className="text-3xl font-bold font-display mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary-400" />
              AI-Generated Character Analysis
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed font-light">{results.analysis}</p>
            </div>
          </motion.div>

          {/* Trait Radar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-3xl flex flex-col">
            <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary-400" />
              Personality Radar
            </h3>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={chartData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Traits" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Trait Breakdown Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-display mb-6 flex items-center gap-3">
            <Award className="w-8 h-8 text-primary-400" />
            Trait Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {chartData.map((trait, idx) => (
              <motion.div key={trait.subject} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + idx * 0.05 }} className="glass-card p-6 text-center">
                <div className="text-sm font-semibold text-gray-400 mb-2">{trait.subject}</div>
                <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${trait.percentage}%` }} transition={{ duration: 1, delay: 0.6 + idx * 0.05 }} className="h-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                </div>
                <div className="text-xl font-bold text-white">{trait.percentage}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategic Roadmap */}
        <div className="max-w-5xl mx-auto pt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-xl bg-primary-500/10 text-primary-400">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-4xl font-bold font-display">Strategic Roadmap</h2>
              <p className="text-gray-400 text-lg">Your personalized path to success</p>
            </div>
          </motion.div>

          <div className="space-y-0">
            {results.roadmap.map((step, index) => (
              <RoadmapStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto mt-12">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-transform w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          <span>{isDownloading ? t('results.downloadingPDF') : t('results.downloadPDF')}</span>
        </button>
        <button onClick={() => navigate('/')} className="group flex items-center gap-3 px-8 py-4 glass-card rounded-full font-bold hover:border-primary-500/50 transition-colors w-full sm:w-auto justify-center">
          <span>{t('startNewAnalysis')}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button onClick={() => navigate('/personas')} className="flex items-center gap-3 px-8 py-4 glass-card rounded-full font-bold hover:border-primary-500/50 transition-colors w-full sm:w-auto justify-center">
          <Users className="w-5 h-5" />
          <span>{t('explorePersonalities')}</span>
        </button>
      </motion.div>
    </div>
  )
}