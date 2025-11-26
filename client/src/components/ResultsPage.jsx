import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function ResultsPage({ userInfo, questionnaireResults }) {
  const navigate = useNavigate()
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)
  const [persona, setPersona] = useState(null)

  useEffect(() => {
    if (!questionnaireResults) {
      navigate('/')
      return
    }

    // Analyze questionnaire results to determine persona
    const determinePersona = () => {
      const scores = {
        adaptability: calculateTraitScore('adaptability'),
        planning: calculateTraitScore('planning'),
        social: calculateTraitScore('social_orientation'),
        creative: calculateTraitScore('creative_interests'),
        analytical: calculateTraitScore('intellectual_hobbies')
      }

      // Determine dominant traits
      const dominantTraits = Object.entries(scores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 2)
        .map(([trait]) => trait)

      // Map trait combinations to persona types
      const personaMap = {
        'adaptability,social': {
          type: 'Explorer',
          description: 'You are naturally curious and socially adaptable. You thrive in dynamic environments and excel at building connections.',
          strengths: ['Flexibility', 'Social Intelligence', 'Quick Learning'],
          recommendations: ['Network-based learning', 'Social projects', 'Adaptable career paths']
        },
        'planning,analytical': {
          type: 'Architect',
          description: 'You are methodical and analytical in your approach. You excel at creating structured solutions to complex problems.',
          strengths: ['Strategic Thinking', 'Detailed Planning', 'Problem Solving'],
          recommendations: ['Structured learning paths', 'Technical projects', 'Research-based roles']
        },
        'creative,social': {
          type: 'Innovator',
          description: 'You combine creativity with social insight. You excel at generating novel ideas and inspiring others.',
          strengths: ['Creative Thinking', 'Communication', 'Innovation'],
          recommendations: ['Creative projects', 'Leadership roles', 'Collaborative environments']
        }
      }

      // Get persona based on top two traits
      const personaKey = dominantTraits.sort().join(',')
      return personaMap[personaKey] || {
        type: 'Balanced',
        description: 'You show a balanced mix of different traits, making you adaptable to various situations.',
        strengths: ['Versatility', 'Balance', 'Adaptability'],
        recommendations: ['Diverse experiences', 'Cross-functional roles', 'Balanced approach']
      }
    }

    const analyzedPersona = determinePersona()
    setPersona(analyzedPersona)
    setLoading(false)
    setShowResults(true)
  }, [questionnaireResults])

  const handleContinueClick = () => {
    setShowResults(true)
  }

  const calculateTraitScore = (trait) => {
    const traitQuestions = allQuestions.filter(q => q.trait === trait)
    if (!traitQuestions.length) return 0
    
    const sum = traitQuestions.reduce((acc, q) => acc + (questionnaireResults[q.id] || 0), 0)
    return (sum / traitQuestions.length).toFixed(1)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {loading ? (
        <div className="card text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Analyzing Your Responses...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We're processing your answers to provide personalized insights.
          </p>
        </div>
      ) : !showResults ? (
        <div className="card text-center">
          <div className="text-green-600 dark:text-green-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Analysis Complete!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've identified your personality type and prepared personalized recommendations.
          </p>
          <button
            onClick={handleContinueClick}
            className="btn-primary w-full md:w-auto"
          >
            View My Results
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Persona Type Section */}
          <div className="card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                You are a {persona.type}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {persona.description}
              </p>
            </div>

            {/* Strengths */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Your Key Strengths
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {persona.strengths.map((strength, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      {strength}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Recommended Growth Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {persona.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Profile */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Your Detailed Profile
            </h2>
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Core Traits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      Planning & Organization
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>Planning</span>
                      <span className="font-semibold">{calculateTraitScore('planning')}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Structure Preference</span>
                      <span className="font-semibold">{calculateTraitScore('structure_preference')}/5.0</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      Adaptability & Growth
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>Adaptability</span>
                      <span className="font-semibold">{calculateTraitScore('adaptability')}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Growth Mindset</span>
                      <span className="font-semibold">{calculateTraitScore('growth_mindset')}/5.0</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Relationship Section */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Relationship Style
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      Connection Style
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>Emotional Depth</span>
                      <span className="font-semibold">{calculateTraitScore('relationship_depth')}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Independence</span>
                      <span className="font-semibold">{calculateTraitScore('relationship_independence')}/5.0</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      Communication
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>Conflict Resolution</span>
                      <span className="font-semibold">{calculateTraitScore('conflict_resolution')}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Emotional Expression</span>
                      <span className="font-semibold">{calculateTraitScore('emotional_expression')}/5.0</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Lifestyle Section */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Lifestyle Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      Activity Level
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>Lifestyle Pace</span>
                      <span className="font-semibold">{calculateTraitScore('lifestyle_pace')}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Health Consciousness</span>
                      <span className="font-semibold">{calculateTraitScore('health_consciousness')}/5.0</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      Social Preferences
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>Social Orientation</span>
                      <span className="font-semibold">{calculateTraitScore('social_orientation')}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Organization</span>
                      <span className="font-semibold">{calculateTraitScore('organization_preference')}/5.0</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sports & Activities Section */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Sports & Activities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      Sports Style
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>Team Orientation</span>
                      <span className="font-semibold">{calculateTraitScore('sports_social')}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Competitiveness</span>
                      <span className="font-semibold">{calculateTraitScore('competitiveness')}/5.0</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      Exercise Preferences
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>Adventure Level</span>
                      <span className="font-semibold">{calculateTraitScore('sports_adventure')}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Structure</span>
                      <span className="font-semibold">{calculateTraitScore('exercise_structure')}/5.0</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Hobbies & Interests Section */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Hobbies & Interests
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      Creative & Intellectual
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>Creative Interests</span>
                      <span className="font-semibold">{calculateTraitScore('creative_interests')}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Intellectual Hobbies</span>
                      <span className="font-semibold">{calculateTraitScore('intellectual_hobbies')}/5.0</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                      Personal Development
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span>Skill Development</span>
                      <span className="font-semibold">{calculateTraitScore('skill_development')}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Helping Others</span>
                      <span className="font-semibold">{calculateTraitScore('altruistic_hobbies')}/5.0</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}