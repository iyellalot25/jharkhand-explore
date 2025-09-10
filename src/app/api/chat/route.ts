import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const { message, language = 'en' } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Create prompt based on language
    const prompt = language === 'hi' 
      ? `आप झारखंड पर्यटन के बारे में एक हिंदी सहायक हैं। इस प्रश्न का उत्तर दें: ${message}
         झारखंड के पर्यटन स्थलों like नेतरहाट, बेतला राष्ट्रीय उद्यान, हुंडरू जलप्रपात के बारे में बताएं।
         उत्तर संक्षिप्त और उपयोगी रखें।`
      : `You are a helpful assistant for Jharkhand tourism. Answer this question: ${message}
         Provide information about Jharkhand tourist places like Netarhat, Betla National Park, Hundru Falls.
         Keep the answer concise and helpful.`

    // Call Gemini API
    const result = await model.generateContent(prompt)
    const response = await result.response
    const answer = response.text()

    // Save to database
    try {
      await supabase
        .from('chat_messages')
        .insert([
          {
            question: message,
            answer: answer,
            language: language
          }
        ])
    } catch (dbError) {
      console.error('Database error:', dbError)
    }

    return NextResponse.json({ 
      answer: answer,
      success: true 
    })

  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}