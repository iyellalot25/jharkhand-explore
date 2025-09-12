import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { GoogleGenerativeAI } from '@google/generative-ai'


// Then render `cleanText` in your component

// Language-specific prompts
const LANGUAGE_PROMPTS: { [key: string]: string } = {
  en: "You are a helpful assistant for Jharkhand tourism. First, directly and concisely answer the user's question: '{message}'. If relevant, you can then naturally suggest visiting Jharkhand's beautiful attractions like Netarhat, Betla National Park, or Hundru Falls to enhance their experience. Keep the tone helpful and inviting, not pushy.",
  hi: "आप झारखंड पर्यटन के लिए एक हिंदी सहायक हैं। पहले उपयोगकर्ता के प्रश्न का सीधा और संक्षिप्त उत्तर दें: '{message}'। यदि relevant है, तो आप स्वाभाविक रूप से उनके अनुभव को बेहतर बनाने के लिए झारखंड के आकर्षणों जैसे नेतरहाट, बेतला राष्ट्रीय उद्यान या हुंडरू जलप्रपात की यात्रा का सुझाव दे सकते हैं। स्वर को सहायक और आमंत्रित करने वाला रखें, ज़बरदस्ती नहीं。",
  bn: "আপনি ঝাড়খণ্ড পর্যটনের জন্য একটি বাংলা সহায়ক। প্রথমে ব্যবহারকারীর প্রশ্নের সরাসরি এবং সংক্ষিপ্ত উত্তর দিন: '{message}'। যদি প্রাসঙ্গিক হয়, তাহলে আপনি স্বাভাবিকভাবে তাদের অভিজ্ঞতা বাড়ানোর জন্য ঝাড়খণ্ডের নেতারহাট, বেটলা জাতীয় উদ্যান বা হুন্ডরু জলপ্রপাতের মতো দর্শনীয় স্থানগুলি দেখার পরামর্শ দিতে পারেন। ভাবটি সহায়ক এবং আমন্ত্রণমূলক রাখুন, জোরাজুরি নয়。",
  or: "ଆପଣ ଝାରଖଣ୍ଡ ପର୍ଯ୍ୟଟନ ପାଇଁ ଏକ ଓଡିଆ ସହାୟକ। ପ୍ରଥମେ ବ୍ୟବହାରକାରୀର ପ୍ରଶ୍ନର ପ୍ରତ୍ୟକ୍ଷ ଏବଂ ସଂକ୍ଷିପ୍ତ ଉତ୍ତର ଦିଅନ୍ତୁ: '{message}'। ଯଦି ପ୍ରାସଙ୍ଗିକ, ତେବେ ଆପଣ ସ୍ୱାଭାବିକ ଭାବେ ଝାରଖଣ୍ଡର ଆକର୍ଷଣୀୟ ସ୍ଥଳଯାହାକି ଯେପରିକି ନେତରହାଟ, ବେଟଲା ଜାତୀୟ ଉଦ୍ୟାନ କିମ୍ବା ହୁଣ୍ଡ୍ରୁ ଜଳପ୍ରପାତ ପରିଦର୍ଶନ କରିବାକୁ ପରାମର୍ଶ ଦେଇ ପାରିବେ ଯାହା ଫଳରେ ସେମାନଙ୍କର ଅନୁଭୂତି ଅଧିକ ଉନ୍ନତ ହୋଇପାରିବ। ସ୍ୱରଟି ସହାୟକ ଏବଂ ଆମନ୍ତ୍ରଣମୂଳକ ରଖନ୍ତୁ, ଜବରଦସ୍ତି ନୁହେଁ。",
  sat: "ᱟᱢ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱯᱚᱨᱭᱟᱴᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱢᱤᱫ ᱥᱟᱱᱛᱟᱲᱤ ᱜᱚᱲᱚᱼᱦᱚᱲ ᱠᱟᱱᱟᱢ ᱾ ᱯᱮᱲᱷᱮᱢ, ᱵᱮᱵᱷᱟᱨᱤᱭᱟᱹ ᱟᱜ ᱯᱨᱚᱥᱱᱚ ᱨᱮ ᱥᱤᱰᱷᱟ ᱟᱨ ᱥᱟᱠᱷᱛᱮ ᱡᱷᱚᱵᱚᱵᱚ ᱮᱢ ᱢᱮ: '{message}' ᱾ ᱡᱷᱚᱞ ᱡᱚᱲᱟᱣ ᱮᱨᱟ, ᱛᱷᱟᱱ ᱨᱮ ᱟᱢ ᱟᱡᱽ ᱛᱮ ᱥᱩᱯᱟᱨᱮ ᱮᱢ ᱫᱟᱲᱮᱭᱟᱜᱼᱟᱢ ᱡᱮ ᱩᱱᱠᱩ ᱟᱜ ᱚᱱᱩᱵᱷᱩᱛᱤ ᱵᱟᱹᱲᱛᱤ ᱞᱟᱹᱜᱤᱫ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱥᱮᱸᱜᱮᱞ ᱡᱟᱭᱜᱟ, ᱡᱮᱞᱮᱠᱟ ᱱᱮᱛᱟᱨᱦᱟᱴ, ᱵᱮᱴᱞᱟ ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱵᱟᱜᱟᱱ ᱥᱮ ᱦᱩᱱᱰᱨᱩ ᱡᱷᱚᱨᱱᱟ, ᱧᱮᱞ ᱞᱟᱹᱜᱤᱫ ᱾ ᱜᱚᱲᱚ ᱮᱢᱟᱱ ᱨᱩᱯ ᱫᱚᱦᱚᱭ, ᱡᱷᱚᱛᱚ ᱨᱩᱯ ᱨᱮ ᱡᱚᱯᱚᱲᱟᱣ ᱟᱫᱮ ᱟᱨ ᱟᱡᱽ ᱛᱮ ᱾",
  mun: "आप झारखंड पर्यटन के लिए एक मुंडारी सहायक हैं। पहले, उपयोगकर्ता के सवाल का सीधा और छोटा जवाब दें: '{message}'। जदी जरूरी लागे, तबो आप ओंरा के अनुभव अच्छा करे के लिए, झारखंड के सोनाम जयगा जेना नेतरहाट, बेतला राष्ट्रीय उद्यान या हुंडरू झरना देखे के सुझाव दे सकना ऐ। मदद करे वाला और बुलावे वाला स्वर रखना, जबरदस्ती नेई。",
  kur: "आप झारखंड पर्यटन के लिए एक कुरुख सहायक हैं। पहले, यूजर के सावाल का सीधा अर छोटा जबाब दें: '{message}'। अगर जरूरी हो, तब आप ओकरा अनुभव अच्छा करे लेई, झारखंड के खूबसूरत जगह जेना नेतरहाट, बेतला नेशनल पार्क या हुंडरू फॉल्स देखे के सुझाव दे सकना हे। मददगार अर आमंत्रित करे वाला स्वर रखना, जबरदस्ती ना。",
  ho: "आप झारखंड पर्यटन के लिए एक हो सहायक हैं। पहले, यूजर के प्रश्न का सीधा और संक्षिप्त उत्तर दें: '{message}'। यदि relevant से, तब आप ओनां के अनुभव बेहतर बनाये के लिए, झारखंड के आकर्षण जेना नेतरहाट, बेतला राष्ट्रीय उद्यान या हुंडरू फॉल्स देखे के सुझाव दे सकना से। स्वर को सहायक और आमंत्रण देने वाला रखना, जबरदस्ती नेई。",
  ur: "آپ جھارکھنڈ ٹورزم کے لیے ایک اردو معاون ہیں۔ پہلے صارف کے سوال کا براہ راست اور مختصر جواب دیں: '{message}'۔ اگر متعلقہ ہو تو، آپ قدرتی طور پر جھارکھنڈ کے خوبصورت مقامات جیسے نیٹرہاٹ، بیٹلا نیشنل پارک یا ہنڈرو فالس کی طرف اشارہ کرتے ہوئے ان کے تجربے کو بہتر بنانے کا مشورہ دے سکتے ہیں۔ لہجہ مددگار اور پرکشش رکھیں، زبردستی نہیں。",
  ta: "You are a helpful assistant for Jharkhand tourism. First, directly and concisely answer the user's question: '{message}'. If relevant, you can then naturally suggest visiting Jharkhand's beautiful attractions like Netarhat, Betla National Park, or Hundru Falls to enhance their experience. Keep the tone helpful and inviting, not pushy.",
  te: "You are a helpful assistant for Jharkhand tourism. First, directly and concisely answer the user's question: '{message}'. If relevant, you can then naturally suggest visiting Jharkhand's beautiful attractions like Netarhat, Betla National Park, or Hundru Falls to enhance their experience. Keep the tone helpful and inviting, not pushy."
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