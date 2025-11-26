import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { User, MapPin, Briefcase, DollarSign, Target, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'

const economicOptions = [
  { value: 'Struggling', icon: '📉', color: 'from-red-500 to-orange-500' },
  { value: 'Tight', icon: '💰', color: 'from-orange-500 to-yellow-500' },
  { value: 'Stable', icon: '💵', color: 'from-green-500 to-emerald-500' },
  { value: 'Comfortable', icon: '💎', color: 'from-blue-500 to-cyan-500' },
  { value: 'Wealthy', icon: '👑', color: 'from-purple-500 to-pink-500' },
];

export default function UserInfoForm({ onSubmit }) {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    location: '',
    jobTitle: '',
    economicSituation: '',
    primaryGoal: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.age || formData.age < 13 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age (13-120)';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }
    if (!formData.economicSituation) {
      newErrors.economicSituation = 'Please select your economic situation';
    }
    if (!formData.primaryGoal.trim() || formData.primaryGoal.length < 10) {
      newErrors.primaryGoal = 'Please enter at least 10 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
    navigate('/questionnaire');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-20 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-background to-background" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-400 font-medium">{t('userInfo.subtitle')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400"
          >
            {t('userInfo.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400"
          >
            {t('userInfo.helpText')}
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              {t('userInfo.age')}
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder={t('userInfo.agePlaceholder')}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-lg font-light border-b border-white/10 pb-2"
            />
            {errors.age && <p className="text-red-400 text-sm mt-2">{errors.age}</p>}
          </motion.div>

          {/* Location */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              {t('userInfo.location')}
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder={t('userInfo.locationPlaceholder')}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-lg font-light border-b border-white/10 pb-2"
            />
            {errors.location && <p className="text-red-400 text-sm mt-2">{errors.location}</p>}
          </motion.div>

          {/* Job Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <Briefcase className="w-4 h-4 inline mr-2" />
              {t('userInfo.jobTitle')}
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder={t('userInfo.jobTitlePlaceholder')}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-lg font-light border-b border-white/10 pb-2"
            />
            {errors.jobTitle && <p className="text-red-400 text-sm mt-2">{errors.jobTitle}</p>}
          </motion.div>

          {/* Economic Situation */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              {t('userInfo.economicSituation')}
            </label>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {economicOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData(prev => ({ ...prev, economicSituation: option.value }))}
                  className={cn(
                    "relative p-4 rounded-xl transition-all duration-300",
                    formData.economicSituation === option.value
                      ? "glass-card border-primary-500/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                      : "glass-card hover:border-white/20"
                  )}
                >
                  {formData.economicSituation === option.value && (
                    <motion.div
                      layoutId="economicGlow"
                      className={cn(
                        "absolute inset-0 rounded-xl blur-xl opacity-30 bg-gradient-to-r",
                        option.color
                      )}
                    />
                  )}
                  <div className="relative text-center">
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="text-sm font-medium text-white">{t(`userInfo.economic${option.value}`)}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            {errors.economicSituation && (
              <p className="text-red-400 text-sm mt-2">{errors.economicSituation}</p>
            )}
          </motion.div>

          {/* Primary Goal */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <Target className="w-4 h-4 inline mr-2" />
              {t('userInfo.primaryGoal')}
            </label>
            <textarea
              name="primaryGoal"
              value={formData.primaryGoal}
              onChange={handleChange}
              placeholder={t('userInfo.primaryGoalPlaceholder')}
              rows={3}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none resize-none text-lg font-light border-b border-white/10 pb-2"
            />
            {errors.primaryGoal && <p className="text-red-400 text-sm mt-2">{errors.primaryGoal}</p>}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-2">
              <span>{t('continue')}</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}