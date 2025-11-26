import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'

export default function LandingPage() {
    const { t } = useTranslation('common')

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Hero Section */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <Sparkles className="w-4 h-4 text-secondary-400" />
                        <span className="text-sm font-medium text-gray-300">{t('landing.aiPowered')}</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                        {t('landing.decodeYour')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 animate-gradient-x">
                            {t('landing.truePotential')}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        {t('landing.subtitle')}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                >
                    <Link
                        to="/start"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg tracking-wide hover:scale-105 transition-transform duration-300"
                    >
                        {t('landing.startAnalysis')}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 rounded-full bg-white/20 blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                    </Link>

                    <Link
                        to="/personas"
                        className="px-8 py-4 rounded-full font-medium text-lg text-white border border-white/10 hover:bg-white/5 transition-colors backdrop-blur-md"
                    >
                        {t('landing.explorePersonas')}
                    </Link>
                </motion.div>
            </div>

            {/* Feature Grid */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative z-10 mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
            >
                {[
                    {
                        icon: Brain,
                        title: t('landing.features.deepAnalysis.title'),
                        desc: t('landing.features.deepAnalysis.desc')
                    },
                    {
                        icon: Target,
                        title: t('landing.features.actionableRoadmap.title'),
                        desc: t('landing.features.actionableRoadmap.desc')
                    },
                    {
                        icon: Sparkles,
                        title: t('landing.features.visualJourney.title'),
                        desc: t('landing.features.visualJourney.desc')
                    }
                ].map((feature, idx) => (
                    <div key={idx} className="glass-card p-8 rounded-2xl space-y-4 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary-400">
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold font-display">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </motion.div>

            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20" />
            </div>
        </div>
    )
}
