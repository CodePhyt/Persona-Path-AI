import React from 'react';

export const BigFivePersona = ({ personalityData }) => (
  <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
    <h2 className="text-2xl font-bold text-indigo-400 mb-4">Big Five Personality Traits</h2>
    
    <div className="space-y-6">
      <section className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-emerald-300 mb-4">Trait Analysis</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {personalityData.traits.map((trait, i) => (
            <div key={i} className="bg-gray-600 p-3 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-purple-200">{trait.name}</span>
                <span className="text-blue-300 text-sm">{trait.score}%</span>
              </div>
              <div className="h-2 bg-gray-500 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                  style={{ width: `${trait.score}%` }}
                />
              </div>
              <p className="text-gray-300 text-sm mt-2">{trait.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-300 mb-2">SWOT Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-900 rounded">
            <h4 className="font-medium text-green-300">Strengths</h4>
            <ul className="list-disc pl-4 mt-2 text-green-100">
              {personalityData.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="p-3 bg-red-900 rounded">
            <h4 className="font-medium text-red-300">Weaknesses</h4>
            <ul className="list-disc pl-4 mt-2 text-red-100">
              {personalityData.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
          <div className="p-3 bg-yellow-900 rounded">
            <h4 className="font-medium text-yellow-300">Opportunities</h4>
            <ul className="list-disc pl-4 mt-2 text-yellow-100">
              {personalityData.opportunities.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
          <div className="p-3 bg-purple-900 rounded">
            <h4 className="font-medium text-purple-300">Threats</h4>
            <ul className="list-disc pl-4 mt-2 text-purple-100">
              {personalityData.threats.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-teal-300 mb-3">Cultural Adaptation</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {personalityData.culturalAdaptations.map((adaptation, i) => (
            <div key={i} className="bg-gray-600 p-3 rounded">
              <h4 className="font-medium text-teal-100">{adaptation.culture}</h4>
              <p className="text-teal-200 mt-1 text-sm">{adaptation.recommendation}</p>
              <div className="mt-2 text-xs text-gray-400">
                {adaptation.examples.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-amber-300 mb-3">Career Paths</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {personalityData.careerPaths.map((path, i) => (
            <div key={i} className="bg-gray-600 p-3 rounded">
              <h4 className="font-medium text-amber-100">{path.role}</h4>
              <p className="text-amber-200 mt-1 text-sm">{path.suitability}</p>
              <div className="mt-2 text-xs text-gray-400">
                {path.examples.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-rose-300 mb-3">Lifestyle Adaptation Guide</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {personalityData.recommendations.map((rec, i) => (
            <div key={i} className="bg-gray-600 p-3 rounded">
              <h4 className="font-medium text-yellow-100">{rec.area}</h4>
              <p className="text-green-200 mt-1 text-sm">{rec.suggestion}</p>
              <div className="mt-2 text-xs text-gray-400">
                {rec.examples.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);