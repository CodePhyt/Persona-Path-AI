import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LandingPage from './components/LandingPage';
import UserInfoForm from './components/UserInfoForm';
import Questionnaire from './components/Questionnaire';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import LanguageSwitcher from './components/LanguageSwitcher';
import Personas from './components/Personas';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const { t, i18n } = useTranslation('common');
  const [userInfo, setUserInfo] = useState(null);
  const [questionnaireResults, setQuestionnaireResults] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const handleQuizComplete = async (answers) => {
    setQuestionnaireResults(answers);
    setIsLoading(true);
    setError(null);
    try {
      const mappedContext = {
        age: userInfo.age,
        job: userInfo.jobTitle,
        location: userInfo.location,
        economy: userInfo.economicSituation,
        goal: userInfo.primaryGoal
      };

      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context: mappedContext,
          answers: answers,
          language: i18n.language
        })
      });

      if (!response.ok) throw new Error('Failed to analyze data');
      const data = await response.json();
      setAnalysisResults(data);
    } catch (err) {
      console.error(err);
      setError('An error occurred while analyzing your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen relative bg-background text-white font-sans selection:bg-primary-500 selection:text-white">
        {location.pathname !== '/' && (
          <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <Link to="/" className="text-xl font-display font-bold tracking-tight text-white">{t('appName')}</Link>
                <div className="flex items-center gap-4">
                  <Link to="/personas" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{t('explore')}</Link>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </header>
        )}

        <main className={location.pathname !== '/' ? 'pt-24 pb-12 px-4 max-w-7xl mx-auto' : ''}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/personas" element={<Personas />} />
              <Route path="/start" element={<UserInfoForm onSubmit={(data) => setUserInfo(data)} />} />
              <Route path="/questionnaire" element={<Questionnaire userInfo={userInfo} onSubmit={handleQuizComplete} />} />
              <Route path="/results" element={
                isLoading ? <LoadingSpinner /> : error ? (
                  <div className="text-center text-red-400 mt-20 glass-card max-w-md mx-auto p-8">
                    <h2 className="text-2xl font-bold mb-4">{t('error')}</h2>
                    <p className="mb-6">{error}</p>
                    <button onClick={() => window.location.href = '/'} className="btn-primary w-full">{t('tryAgain')}</button>
                  </div>
                ) : <ResultsDisplay results={analysisResults} answers={questionnaireResults} userInfo={userInfo} />
              } />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </ThemeProvider>
  );
}