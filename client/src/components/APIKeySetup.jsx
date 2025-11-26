import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function APIKeySetup({ onApiKeySet }) {
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Check if API key exists in localStorage
    const storedApiKey = localStorage.getItem('gemini_api_key')
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!apiKey.trim()) {
      setError('Please enter an API key')
      return
    }

    // Store API key in localStorage
    localStorage.setItem('gemini_api_key', apiKey.trim())
    setError('')
    onApiKeySet()
    navigate('/')
  }

  const handleGetApiKey = () => {
    window.open('https://makersuite.google.com/app/apikey', '_blank')
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Setup API Key</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        To use PersonaPath AI, you'll need a Google AI Studio API key. Click the button below to get one.
      </p>
      
      <button
        onClick={handleGetApiKey}
        className="w-full mb-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Get API Key from Google AI Studio
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter your API Key
          </label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            placeholder="Paste your API key here"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
        >
          Save API Key
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Your API key will be stored securely in your browser's local storage and will only be used to make requests to the Google AI API.
      </p>
    </div>
  )
}