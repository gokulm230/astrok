"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Users, Sparkles } from "lucide-react"

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

interface CompatibilityResult {
  compatibility: number
  description: string
  strengths: string[]
  challenges: string[]
  advice: string
}

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBapFomRpfJ2p9F45WtSNiEgF-aeAswKlE"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

export function LoveCalculator() {
  const [formData, setFormData] = useState({
    name1: "",
    zodiac1: "",
    name2: "",
    zodiac2: "",
  })
  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const zodiacSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ]

  const calculateCompatibility = async () => {
    setIsCalculating(true)

    try {
      const prompt = `As an expert astrologer specializing in love compatibility, analyze the romantic compatibility between these two people:

Person 1: ${formData.name1} (${formData.zodiac1} zodiac sign)
Person 2: ${formData.name2} (${formData.zodiac2} zodiac sign)

Please provide the response in the following JSON format only, no additional text:
{
  "compatibility": number between 60-100,
  "description": "detailed romantic compatibility overview (2-3 sentences)",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "challenges": ["challenge 1", "challenge 2"],
  "advice": "practical relationship advice for this pairing (2-3 sentences)"
}

Base your analysis on astrological compatibility principles, considering element compatibility, personality traits, and relationship dynamics. Make it personalized, insightful, and encouraging while being authentic to astrological traditions.`

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
      let parsedResult: CompatibilityResult
      try {
        // Clean the response in case there are markdown code blocks
        const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim()
        parsedResult = JSON.parse(cleanResponse)
      } catch (parseError) {
        console.error('Failed to parse AI response as JSON:', aiResponse)
        throw new Error('Invalid response format from AI')
      }

      // Set the result with AI-generated data
      setResult({
        compatibility: parsedResult.compatibility || Math.floor(Math.random() * 40) + 60,
        description: parsedResult.description || "You two have a special cosmic connection that brings unique energies together.",
        strengths: parsedResult.strengths || ["Emotional connection", "Shared values", "Complementary traits"],
        challenges: parsedResult.challenges || ["Communication styles", "Different approaches to life"],
        advice: parsedResult.advice || "Focus on understanding each other's perspectives and celebrating your differences."
      })

    } catch (error) {
      console.error('Error calculating compatibility:', error)
      
      // Fallback response in case of API failure
      const fallbackCompatibility = Math.floor(Math.random() * 40) + 60
      setResult({
        compatibility: fallbackCompatibility,
        description: fallbackCompatibility > 85
          ? "You two are a perfect cosmic match! Your energies complement each other beautifully."
          : fallbackCompatibility > 70
            ? "Great compatibility! You share many harmonious traits and can build a strong relationship."
            : "Good potential! With understanding and communication, you can create a wonderful bond.",
        strengths: ["Emotional connection", "Shared values", "Complementary traits"],
        challenges: ["Communication styles", "Different approaches to life"],
        advice: "Focus on open communication and mutual respect to strengthen your bond."
      })
    } finally {
      setIsCalculating(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.name1 && formData.zodiac1 && formData.name2 && formData.zodiac2

  return (
    <section id="love" className="py-20 bg-gradient-to-b from-purple-50/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-pink-500 mr-2 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Love Calculator
            </h2>
            <Heart className="h-8 w-8 text-pink-500 ml-2 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600">Discover your cosmic compatibility with your partner</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-center text-2xl text-gray-800">
              <Users className="h-6 w-6 mr-2 text-purple-600" />
              Compatibility Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Person 1 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">Person 1</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name1" className="text-gray-700 font-medium">
                      Name
                    </Label>
                    <Input
                      id="name1"
                      type="text"
                      placeholder="Enter first person's name"
                      value={formData.name1}
                      onChange={(e) => handleInputChange("name1", e.target.value)}
                      className="border-gray-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Zodiac Sign</Label>
                    <Select value={formData.zodiac1} onValueChange={(value) => handleInputChange("zodiac1", value)}>
                      <SelectTrigger className="border-gray-200 focus:border-pink-400">
                        <SelectValue placeholder="Select zodiac sign" />
                      </SelectTrigger>
                      <SelectContent>
                        {zodiacSigns.map((sign) => (
                          <SelectItem key={sign} value={sign.toLowerCase()}>
                            {sign}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Person 2 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">Person 2</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name2" className="text-gray-700 font-medium">
                      Name
                    </Label>
                    <Input
                      id="name2"
                      type="text"
                      placeholder="Enter second person's name"
                      value={formData.name2}
                      onChange={(e) => handleInputChange("name2", e.target.value)}
                      className="border-gray-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Zodiac Sign</Label>
                    <Select value={formData.zodiac2} onValueChange={(value) => handleInputChange("zodiac2", value)}>
                      <SelectTrigger className="border-gray-200 focus:border-pink-400">
                        <SelectValue placeholder="Select zodiac sign" />
                      </SelectTrigger>
                      <SelectContent>
                        {zodiacSigns.map((sign) => (
                          <SelectItem key={sign} value={sign.toLowerCase()}>
                            {sign}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <Button
                onClick={calculateCompatibility}
                disabled={!isFormValid || isCalculating}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isCalculating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Calculate Compatibility
                    <Sparkles className="h-5 w-5 ml-2" />
                  </div>
                )}
              </Button>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white text-2xl font-bold mb-4">
                    {result.compatibility}%
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {formData.name1} & {formData.name2}
                  </h3>
                  <p className="text-lg text-gray-700">{result.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {result.strengths.map((strength: string, index: number) => (
                        <li key={index} className="text-gray-600 text-sm">
                          • {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-2 flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      Growth Areas
                    </h4>
                    <ul className="space-y-1">
                      {result.challenges.map((challenge: string, index: number) => (
                        <li key={index} className="text-gray-600 text-sm">
                          • {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Advice Section */}
                {result.advice && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Relationship Advice
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{result.advice}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
