'use client'

import ChatInterface from '@/components/ChatInterface'
import AnimatedSection from '@/components/AnimatedSection'
import { useScrollPrevention } from '@/hooks/useScrollPrevention'

async function sendMessage(message: string, language: string): Promise<string> {
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

export default function ChatPage() {
  useScrollPrevention() // Add scroll prevention

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
            🌐 Multilingual Tourism Chat
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Ask questions about Jharkhand tourism in 9 different languages! 
            Get information about destinations, travel tips, and cultural insights 
            in your preferred language.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto">
            <ChatInterface onSendMessage={sendMessage} />
          </div>
        </AnimatedSection>

        {/* Language Support Section */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">
              Supported Languages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center ont-semibold text-green-800">
              {[
                { code: 'en', name: 'English', native: 'English', emoji: '🇺🇸' },
                { code: 'hi', name: 'Hindi', native: 'हिंदी', emoji: '🇮🇳' },
                { code: 'bn', name: 'Bengali', native: 'বাংলা', emoji: '🇧🇩' },
                { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', emoji: '🟢' },
                { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', emoji: '🌳' },
                { code: 'mun', name: 'Mundari', native: 'मुंडारी', emoji: '🎯' },
                { code: 'kur', name: 'Kurukh', native: 'कुरुख', emoji: '🏹' },
                { code: 'ho', name: 'Ho', native: 'हो', emoji: '🌄' },
                { code: 'ur', name: 'Urdu', native: 'اردو', emoji: '📖' }
              ].map((lang, index) => (
                <div
                  key={lang.code}
                  className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="text-2xl mb-1">{lang.emoji}</div>
                  <div className="font-semibold text-sm">{lang.native}</div>
                  <div className="text-xs text-gray-600">{lang.name}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ont-semibold text-green-800">
              {[
                { icon: '🌄', question: 'Best time to visit Netarhat?', hint: 'Ask about ideal seasons and weather conditions' },
                { icon: '🐅', question: 'Betla National Park safari details', hint: 'Inquire about timings and bookings' },
                { icon: '🍛', question: 'Local Jharkhand cuisine', hint: 'Ask about traditional foods to try' },
                { icon: '🎭', question: 'Tribal cultural experiences', hint: 'Learn about cultural programs and festivals' }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl mb-2">{faq.icon}</div>
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600">{faq.hint}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}