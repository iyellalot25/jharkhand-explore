'use client'

import ChatInterface from '@/components/ChatInterface'
import AnimatedSection from '@/components/AnimatedSection'
import { useScrollPrevention } from '@/hooks/useScrollPrevention'

export default function ChatPage() {

  useScrollPrevention() 
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
            Multilingual Tourism Chat
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Ask questions about Jharkhand tourism in English or Hindi. Get information about destinations, 
            travel tips, cultural insights, and more.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="max-w-2xl mx-auto">
            <ChatInterface />
          </div>
        </AnimatedSection>

        {/* FAQ Suggestions */}
        <AnimatedSection delay={0.6}>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {/* Added text-gray-800 class to ensure proper contrast */}
                  <h3 className="font-semibold mb-2 text-gray-800">{faq.question}</h3>
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