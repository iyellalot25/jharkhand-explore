import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const { days, interests, budget, pace } = await request.json()

    // Validate input
    if (!days || !interests || interests.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: days and interests are required' },
        { status: 400 }
      )
    }

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key not configured')
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please check your environment variables.' },
        { status: 500 }
      )
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Create prompt
    const prompt = `Create a detailed ${days}-day travel itinerary for Jharkhand, India focusing on: ${interests.join(', ')}. 
    Budget level: ${budget}, Pace: ${pace}. 
    
    Include specific destinations from Jharkhand like:
    - Netarhat (Queen of Chotanagpur)
    - Betla National Park (wildlife sanctuary)
    - Hundru Falls (waterfalls)
    - Jagannath Temple (religious site)
    - Patratu Valley (scenic valley)
    - Tribal Cultural Center (cultural experience)
    - Dassam Falls (waterfalls)
    
    Format with daily breakdowns including:
    - Morning activities
    - Afternoon activities  
    - Evening activities
    - Accommodation suggestions
    - Local cuisine recommendations
    - Travel tips and cultural注意事项
    
    Make it practical and engaging for tourists.`

    // Call Gemini API
    const result = await model.generateContent(prompt)
    const response = await result.response
    const generatedItinerary = response.text()

    // Save to database
    try {
      const { data, error } = await supabase
        .from('itineraries')
        .insert([
          {
            user_input: { days, interests, budget, pace },
            generated_itinerary: generatedItinerary
          }
        ])
        .select()

      if (error) {
        console.error('Supabase save error:', error)
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
    }

    return NextResponse.json({ 
      itinerary: generatedItinerary,
      success: true 
    })

  } catch (error: any) {
    console.error('Gemini API error:', error)
    
    let errorMessage = 'Failed to generate itinerary'
    
    if (error?.message?.includes('API key')) {
      errorMessage = 'Invalid Gemini API key. Please check your environment variables.'
    } else if (error?.message?.includes('quota')) {
      errorMessage = 'API quota exceeded. Please try again later.'
    } else if (error?.message) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}