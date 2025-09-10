import { NextResponse } from 'next/server'

export async function GET() {
  const envInfo = {
    geminiKeyExists: !!process.env.GEMINI_API_KEY,
    geminiKeyValue: process.env.GEMINI_API_KEY ? 
      process.env.GEMINI_API_KEY.slice(0, 10) + '...' : 'Not found',
    allEnvVars: Object.keys(process.env)
      .filter(key => key.includes('GEMINI') || key.includes('NEXT_PUBLIC'))
      .reduce((obj, key) => {
        obj[key] = process.env[key] ? 'Present' : 'Missing';
        return obj;
      }, {} as Record<string, string>)
  }

  

  return NextResponse.json(envInfo)
}