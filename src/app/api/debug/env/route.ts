import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    geminiKey: process.env.GEMINI_API_KEY ? '✅ Present' : '❌ Missing',
    geminiKeyValue: process.env.GEMINI_API_KEY ? 
      process.env.GEMINI_API_KEY.slice(0, 10) + '...' : 'Not found',
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('GEMINI') || key.includes('NEXT_PUBLIC')
    )
  })
}