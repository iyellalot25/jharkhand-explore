import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Language-specific prompts
const LANGUAGE_PROMPTS: { [key: string]: string } = {
  en: "You are a helpful assistant for Jharkhand tourism. Answer this question: {message}. Provide information about Jharkhand tourist places like Netarhat, Betla National Park, Hundru Falls. Keep the answer concise and helpful.",
  hi: "आप झारखंड पर्यटन के बारे में एक हिंदी सहायक हैं। इस प्रश्न का उत्तर दें: {message}. झारखंड के पर्यटन स्थलों जैसे नेतरहाट, बेतला राष्ट्रीय उद्यान, हुंडरू जलप्रपात के बारे में बताएं। उत्तर संक्षिप्त और उपयोगी रखें।",
  bn: "আপনি ঝাড়খণ্ড পর্যটনের জন্য একটি বাংলা সহায়ক। এই প্রশ্নের উত্তর দিন: {message}. নেতারহাট, বেটলা জাতীয় উদ্যান, হুন্ডরু জলপ্রপাতের মতো ঝাড়খণ্ডের পর্যটন স্থান সম্পর্কে তথ্য প্রদান করুন। উত্তর সংক্ষিপ্ত এবং সহায়ক রাখুন।",
  or: "ଆପଣ ଝାରଖଣ୍ଡ ପର୍ଯ୍ୟଟନ ପାଇଁ ଏକ ଓଡିଆ ସହାୟକ। ଏହି ପ୍ରଶ୍ନର ଉତ୍ତର ଦିଅନ୍ତୁ: {message}. ନେତରହାଟ, ବେଟଲା ଜାତୀୟ ଉଦ୍ୟାନ, ହୁଣ୍ଡ୍ରୁ ଜଳପ୍ରପାତ ଭଳି ଝାରଖଣ୍ଡର ପର୍ଯ୍ୟଟନ ସ୍ଥଳଗୁଡିକ ବିଷୟରେ ସୂଚନା ଦିଅନ୍ତୁ। ଉତ୍ତରଟି ସଂକ୍ଷିପ୍ତ ଏବଂ ସହାୟକ ରଖନ୍ତୁ।",
  sat: "ᱟᱢ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱯᱚᱨᱭᱟᱴᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱢᱤᱫ ᱥᱟᱱᱛᱟᱲᱤ ᱜᱚᱲᱚᱼᱦᱚᱲ ᱠᱟᱱᱟᱢ ᱾ ᱱᱚᱣᱟ ᱯᱨᱚᱥᱱᱚ ᱮᱴᱟᱜ ᱮᱴᱟᱜ: {message} ᱾ ᱱᱮᱛᱟᱨᱦᱟᱴ, ᱵᱮᱴᱞᱟ ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱵᱟᱜᱟᱱ, ᱦᱩᱱᱰᱨᱩ ᱡᱷᱚᱨᱱᱟ ᱞᱮᱠᱟ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱯᱚᱨᱭᱟᱴᱚᱱ ᱡᱟᱭᱜᱟ ᱵᱟᱵᱚᱫᱽ ᱛᱮ ᱵᱟᱰᱟᱭ ᱮᱢ ᱢᱮ ᱾ ᱡᱷᱚᱵᱚᱵᱚ ᱥᱟᱠᱷᱛᱮ ᱟᱨ ᱜᱚᱲᱚ ᱮᱢᱚᱜᱼᱟᱭ ᱾",
  mun: "आप झारखंड पर्यटन के लिए एक मुंडारी सहायक हैं। इस प्रश्न का उत्तर दें: {message}. नेतरहाट, बेतला राष्ट्रीय उद्यान, हुंडरू झरना जैसे झारखंड के पर्यटन स्थलों के बारे में जानकारी दें। उत्तर संक्षिप्त और उपयोगी रखें।",
  kur: "आप झारखंड पर्यटन के लिए एक कुरुख सहायक हैं। इस प्रश्न का उत्तर दें: {message}. नेतरहाट, बेतला राष्ट्रीय उद्यान, हुंडरू फॉल्स जैसे झारखंड के पर्यटन स्थलों के बारे में जानकारी दें। उत्तर संक्षिप्त और उपयोगी रखें।",
  ho: "आप झारखंड पर्यटन के लिए एक हो सहायक हैं। इस प्रश्न का उत्तर दें: {message}. नेतरहाट, बेतला राष्ट्रीय उद्यान, हुंडरू फॉल्स जैसे झारखंड के पर्यटन स्थलों के बारे में जानकारी दें। उत्तर संक्षिप्त और उपयोगी रखें।",
  ur: "آپ جھارکھنڈ ٹورزم کے لیے ایک اردو معاون ہیں۔ اس سوال کا جواب دیں: {message}. نیٹرہاٹ، بیٹلا نیشنل پارک، ہنڈرو فالس جیسے جھارکھنڈ کے سیاحتی مقامات کے بارے میں معلومات فراہم کریں۔ جواب مختصر اور مددگار رکھیں۔"
}

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

    // Get the appropriate prompt for the selected language
    const promptTemplate = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.en
    const prompt = promptTemplate.replace('{message}', message)

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