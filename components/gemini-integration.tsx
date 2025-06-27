"use client"

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

interface AstrologicalReading {
  name: string
  zodiacSign: string
  birthStar: string
  general: string
  love: string
  career: string
  wellness: string
  spirituality: string
}

interface FormData {
  name: string
  dateOfBirth: string
  timeOfBirth: string
  placeOfBirth: string
  rasi: string
  nachathira: string
}

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBapFomRpfJ2p9F45WtSNiEgF-aeAswKlE"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

export async function generateAstrologicalReading(formData: FormData): Promise<AstrologicalReading> {
  try {
    const prompt = `As an expert astrologer, provide a detailed astrological reading for the following person:

Name: ${formData.name}
Date of Birth: ${formData.dateOfBirth}
Time of Birth: ${formData.timeOfBirth || "Not provided"}
Place of Birth: ${formData.placeOfBirth}
${formData.rasi ? `Rasi (Zodiac Sign): ${formData.rasi}` : ""}
${formData.nachathira ? `Nachathira (Birth Star): ${formData.nachathira}` : ""}

Please provide the response in the following JSON format only, no additional text:
{
  "zodiacSign": "determined zodiac sign",
  "birthStar": "determined birth star or nakshatra",
  "general": "detailed general personality analysis and life overview (3-4 sentences)",
  "love": "detailed love and relationship insights (3-4 sentences)",
  "career": "detailed career and professional guidance (3-4 sentences)",
  "wellness": "detailed health and wellness advice (3-4 sentences)",
  "spirituality": "detailed spiritual guidance and life purpose (3-4 sentences)"
}

Make the reading personalized, insightful, and positive while being authentic to astrological traditions. Focus on guidance and empowerment.`

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data: GeminiResponse = await response.json()
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated from Gemini API')
    }

    const aiResponse = data.candidates[0].content.parts[0].text
    
    // Try to parse the JSON response
    let parsedReading
    try {
      // Clean the response in case there are markdown code blocks
      const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim()
      parsedReading = JSON.parse(cleanResponse)
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', aiResponse)
      throw new Error('Invalid response format from AI')
    }

    // Return the structured reading with the user's name
    return {
      name: formData.name,
      zodiacSign: parsedReading.zodiacSign || "Leo",
      birthStar: parsedReading.birthStar || "Magha",
      general: parsedReading.general || "You have a unique cosmic signature that brings special gifts to the world.",
      love: parsedReading.love || "Your heart carries deep wisdom in matters of love and relationships.",
      career: parsedReading.career || "Your professional path is guided by cosmic forces toward success.",
      wellness: parsedReading.wellness || "Balance and harmony are key to your physical and mental well-being.",
      spirituality: parsedReading.spirituality || "Your spiritual journey is one of growth, wisdom, and enlightenment."
    }

  } catch (error) {
    console.error('Error generating astrological reading:', error)
    
    // Fallback response in case of API failure
    return {
      name: formData.name,
      zodiacSign: "Leo",
      birthStar: "Magha",
      general: "You are a natural leader with a strong sense of purpose. Your cosmic energy brings warmth and creativity to everything you do.",
      love: "Your heart influences suggest a passionate and loyal nature in relationships. You seek deep connections and meaningful bonds.",
      career: "Your leadership qualities make you excel in positions of authority. Creative fields and entrepreneurship also suit you well.",
      wellness: "Focus on maintaining balance in all aspects of life. Regular exercise and meditation will help channel your dynamic energy.",
      spirituality: "Your spiritual journey involves learning to balance confidence with humility. Service to others brings deep fulfillment."
    }
  }
}
