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
    const prompt = `Act as an expert travel planner specializing in immersive and sustainable travel within Jharkhand, India.

**Core Task:** Create a detailed, practical, and engaging ${days}-day itinerary for Jharkhand based on the client's profile.

**Client Profile:**
- **Primary Interests:** ${interests.join(', ')}.
- **Budget Level:** ${budget} (Please provide options and recommendations within this tier).
- **Preferred Pace:** ${pace} (e.g., relaxed, moderate, or fast-paced with logistics to match).

**Itinerary Requirements:**

1.  **Destination Integration:** Prominently feature and structure the days around these key Jharkhand destinations. Ensure a logical geographical flow to minimize travel time:
    - Netarhat (Queen of Chotanagpur)
    - Betla National Park (with wildlife safari details)
    - Hundru Falls & Dassam Falls (waterfall experiences)
    - Jagannath Temple, Ranchi (religious/cultural site)
    - Patratu Valley (scenic drives/views)
    - Tribal Cultural Center or Museum (authentic cultural experience)
    - [Add other locations as logically required by the days/pace]

2.  **Daily Breakdown:** For each day, structure the information clearly under these headings:
    - **Day X: [Primary Location/Theme]**
    - **Travel Note:** Approximate travel time & mode from previous destination.
    - **Morning:** Specific activity, site visit, or experience.
    - **Afternoon:** Specific activity, including lunch cuisine recommendation.
    - **Evening:** Specific activity, dinner cuisine recommendation, and relaxation ideas.
    - **Accommodation:** Suggest 1-2 specific options (e.g., "Netarhat Hill Retreat" for mid-range, "PWD Dak Bungalow" for budget) matching the stated budget.
    - **Pro Tip:** One practical, safety, or cultural insight for the day (e.g., booking safaris in advance, clothing for temples, best photo spot).

3.  **Essential Inclusions:**
    - **Cuisine Section:** For each major stop, recommend 2-3 local Jharkhand delicacies to try (e.g., Rugra, Thekua, Litti Chokha, Bamboo Shoot Curry) and suggest where to find them (local dhaba, hotel restaurant).
    - **Cultural 注意事项 (Notes):** A dedicated section at the end explaining key cultural norms: dress code for religious sites, etiquette for photographing tribal communities, local language tips (basic Hindi), and general traveler respect.
    - **Budget Management:** Include practical tips for adhering to the budget (e.g., "Opt for government accommodation," "Pre-book trains," "Eat at local dhabas").
    - **Pacing:** The itinerary's flow should genuinely reflect the chosen pace. A "relaxed" pace has fewer activities and more downtime; a "fast-paced" one is more packed.

**Tone:** Engaging, informative, and inspiring, written for a curious tourist seeking an authentic experience beyond typical guides.`

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