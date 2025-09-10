const { GoogleGenerativeAI } = require('@google/generative-ai')

async function testGemini() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log('❌ No API key found. Please set GEMINI_API_KEY in .env.local')
      return
    }

    console.log('🔑 API Key found:', process.env.GEMINI_API_KEY.slice(0, 10) + '...')
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    
    // Try different model formats
    const modelNames = [
      'gemini-pro',
      'models/gemini-pro',
      'gemini-1.0-pro',
      'models/gemini-1.0-pro'
    ]

    for (const modelName of modelNames) {
      try {
        console.log(`\n🔍 Testing model: ${modelName}`)
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.7
          }
        })

        const result = await model.generateContent('Hello! Reply with "YES" if you can hear me.')
        const response = await result.response
        const text = response.text()
        
        console.log(`✅ SUCCESS with ${modelName}:`, text.trim())
        console.log('✅ Use this model name in your code:', modelName)
        return
        
      } catch (modelError) {
        console.log(`❌ Failed with ${modelName}:`, modelError.message)
      }
    }
    
    console.log('\n❌ All model tests failed. Please check:')
    console.log('1. API key validity')
    console.log('2. Region restrictions')
    console.log('3. Google AI Studio access')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

testGemini()