'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  language: string
}

// Supported languages with native names and emojis
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', emoji: '🇺🇸' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', emoji: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', emoji: '🇧🇩' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', emoji: '🟢' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', emoji: '🌳' },
  { code: 'mun', name: 'Mundari', native: 'मुंडारी', emoji: '🎯' },
  { code: 'kur', name: 'Kurukh', native: 'कुरुख', emoji: '🏹' },
  { code: 'ho', name: 'Ho', native: 'हो', emoji: '🌄' },
  { code: 'ur', name: 'Urdu', native: 'اردو', emoji: '📖' }
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [isLoading, setIsLoading] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const shouldScrollRef = useRef(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // Only scroll if we explicitly set shouldScroll to true
    if (shouldScrollRef.current) {
      scrollToBottom()
      shouldScrollRef.current = false
    }
  }, [messages])

  // Move the sendMessage function inside the component
  const sendMessage = async (message: string, language: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, language }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      return data.answer
    } catch (error) {
      console.error('Error:', error)
      return 'Sorry, I encountered an error. Please try again.'
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
      language: selectedLanguage
    }
    setMessages(prev => [...prev, userMsg])
    
    // Don't scroll when user sends a message
    shouldScrollRef.current = false
    setIsLoading(true)

    try {
      // Get AI response using the internal sendMessage function
      const aiResponse = await sendMessage(userMessage, selectedLanguage)
      
      // Add bot response
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
        language: selectedLanguage
      }
      setMessages(prev => [...prev, botMsg])
      
      // Don't scroll when bot response arrives either
      shouldScrollRef.current = false

    } catch (error) {
      console.error('Error sending message:', error)
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        language: 'en'
      }
      setMessages(prev => [...prev, errorMsg])
      shouldScrollRef.current = false
    } finally {
      setIsLoading(false)
    }
  }

  const getLanguageName = (code: string) => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code)?.native || code
  }

  const getLanguageEmoji = (code: string) => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code)?.emoji || '🌐'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-96 flex flex-col">
      {/* Language Selector */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-green-800">Jharkhand Tourism Chat</h3>
        
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-green-200 transition-colors"
          >
            <span>{getLanguageEmoji(selectedLanguage)}</span>
            <span>{getLanguageName(selectedLanguage)}</span>
            <span>▾</span>
          </button>

          {isLanguageMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                {SUPPORTED_LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setSelectedLanguage(language.code)
                      setIsLanguageMenuOpen(false)
                    }}
                    className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left hover:bg-green-50 ${
                      selectedLanguage === language.code ? 'bg-green-100 text-green-800' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{language.emoji}</span>
                    <span>{language.native}</span>
                    <span className="text-xs text-gray-500">({language.name})</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto mb-4 space-y-3"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="text-sm opacity-70 mb-1 flex items-center space-x-2">
                <span>{message.sender === 'user' ? '👤 You' : '🤖 Jharkhand AI'}</span>
                <span className="text-xs">
                  {getLanguageEmoji(message.language)} {getLanguageName(message.language)}
                </span>
              </div>
              {message.text}
              <div className="text-xs opacity-50 mt-1 text-right">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
              <span>Typing in {getLanguageName(selectedLanguage)}...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={`Type your question in ${getLanguageName(selectedLanguage)}...`}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400 flex items-center space-x-2"
        >
          <span>Send</span>
          <span>{getLanguageEmoji(selectedLanguage)}</span>
        </button>
      </div>

      {/* Quick Language Tips */}
      <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
        <strong>Tip:</strong> You can ask about Jharkhand tourism in {SUPPORTED_LANGUAGES.length} languages!
      </div>
    </div>
  )
}