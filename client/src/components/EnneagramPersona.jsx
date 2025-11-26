hipimport React from 'react';

export const EnneagramPersona = ({ personalityData }) => (
  <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
    <h2 className="text-2xl font-bold text-orange-400 mb-4">Enneagram {personalityData.type}</h2>
    
    <div className="space-y-4">
      <section className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-amber-300 mb-2">Core Motivations</h3>
        <ul className="list-disc pl-4 mt-2 text-amber-100">
          {personalityData.motivations.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </section>

      <section className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-teal-300 mb-2">SWOT Analysis</h3>
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
        <h3 className="text-lg font-semibold text-teal-300 mb-2">Growth Strategies</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {personalityData.strategies.map((strategy, i) => (
            <div key={i} className="bg-gray-600 p-3 rounded">
              <h4 className="font-medium text-teal-100">{strategy.category}</h4>
              <p className="text-teal-200 mt-1">{strategy.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);