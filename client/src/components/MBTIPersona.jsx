import React from 'react';

export const MBTIPersona = ({ personalityData }) => (
  <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
    <h2 className="text-2xl font-bold text-purple-400 mb-4">{personalityData.type} Profile</h2>
    
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold text-purple-400">{personalityData.type} Profile</h2>
        <span className="px-3 py-1 text-sm font-medium bg-purple-900 text-purple-200 rounded-full">{personalityData.code}</span>
      </div>

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
        <h3 className="text-lg font-semibold text-pink-300 mb-2">Relationship Compatibility</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {personalityData.compatibility.map((match, i) => (
            <div key={i} className="bg-gray-600 p-3 rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-pink-200">{match.type}</span>
                <span className="text-xs text-gray-400">{match.relationship}</span>
              </div>
              <p className="text-pink-100 text-sm">{match.description}</p>
              <div className="mt-2 text-xs text-gray-300">
                {match.tips.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-300 mb-2">Lifestyle Recommendations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {personalityData.recommendations.map((rec, i) => (
            <div key={i} className="bg-gray-600 p-3 rounded">
              <h4 className="font-medium text-yellow-100">{rec.category}</h4>
              <p className="text-yellow-200 mt-1">{rec.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-300 mb-2">Sports & Exercise</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {personalityData.sportsRecommendations.map((sport, i) => (
            <div key={i} className="bg-gray-600 p-3 rounded">
              <h4 className="font-medium text-green-100">{sport.activity}</h4>
              <p className="text-green-200 mt-1">{sport.reason}</p>
              <div className="mt-2 text-xs text-gray-300">
                Benefits: {sport.benefits.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-300 mb-2">Hobby Suggestions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {personalityData.hobbyRecommendations.map((hobby, i) => (
            <div key={i} className="bg-gray-600 p-3 rounded">
              <h4 className="font-medium text-blue-100">{hobby.name}</h4>
              <p className="text-blue-200 mt-1">{hobby.description}</p>
              <div className="mt-2 text-xs text-gray-300">
                Skills developed: {hobby.skills.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);