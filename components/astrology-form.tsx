"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Clock, MapPin, User, Star, Sparkles } from "lucide-react"
import { generateAstrologicalReading } from "@/components/gemini-integration"

interface AstrologyFormProps {
  onSubmit: (data: any) => void
}

export function AstrologyForm({ onSubmit }: AstrologyFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    rasi: "",
    nachathira: "",
    language: "english",
  })
  const [isLoading, setIsLoading] = useState(false)

  const zodiacSigns = [
    { english: "Aries", tamil: "மேஷம் (Mesham)" },
    { english: "Taurus", tamil: "ரிஷபம் (Rishabam)" },
    { english: "Gemini", tamil: "மிதுனம் (Mithunam)" },
    { english: "Cancer", tamil: "கடகம் (Kadagam)" },
    { english: "Leo", tamil: "சிம்மம் (Simmam)" },
    { english: "Virgo", tamil: "கன்னி (Kanni)" },
    { english: "Libra", tamil: "துலாம் (Thulam)" },
    { english: "Scorpio", tamil: "விருச்சிகம் (Viruchigam)" },
    { english: "Sagittarius", tamil: "தனுசு (Dhanusu)" },
    { english: "Capricorn", tamil: "மகரம் (Magaram)" },
    { english: "Aquarius", tamil: "கும்பம் (Kumbam)" },
    { english: "Pisces", tamil: "மீனம் (Meenam)" },
  ]

  const nakshatras = [
    { english: "Ashwini", tamil: "அசுவினி (Ashwini)" },
    { english: "Bharani", tamil: "பரணி (Bharani)" },
    { english: "Krittika", tamil: "கிருத்திகை (Krithigai)" },
    { english: "Rohini", tamil: "ரோஹிணி (Rohini)" },
    { english: "Mrigashira", tamil: "மிருகசீரிஷம் (Mirugaseerisham)" },
    { english: "Ardra", tamil: "திருவாதிரை (Thiruvadhirai)" },
    { english: "Punarvasu", tamil: "புனர்பூசம் (Punarpusam)" },
    { english: "Pushya", tamil: "பூசம் (Pusam)" },
    { english: "Ashlesha", tamil: "ஆயில்யம் (Ayilyam)" },
    { english: "Magha", tamil: "மகம் (Magam)" },
    { english: "Purva Phalguni", tamil: "பூரம் (Puram)" },
    { english: "Uttara Phalguni", tamil: "உத்திரம் (Uthiram)" },
    { english: "Hasta", tamil: "ஹஸ்தம் (Hastam)" },
    { english: "Chitra", tamil: "சித்திரை (Chithirai)" },
    { english: "Swati", tamil: "சுவாதி (Swathi)" },
    { english: "Vishakha", tamil: "விசாகம் (Visakam)" },
    { english: "Anuradha", tamil: "அனுஷம் (Anusham)" },
    { english: "Jyeshtha", tamil: "கேட்டை (Kettai)" },
    { english: "Mula", tamil: "மூலம் (Moolam)" },
    { english: "Purva Ashadha", tamil: "பூராடம் (Puradam)" },
    { english: "Uttara Ashadha", tamil: "உத்திராடம் (Uthiradam)" },
    { english: "Shravana", tamil: "திருவோணம் (Thiruvonam)" },
    { english: "Dhanishta", tamil: "அவிட்டம் (Avittam)" },
    { english: "Shatabhisha", tamil: "சதயம் (Sadhayam)" },
    { english: "Purva Bhadrapada", tamil: "பூரட்டாதி (Purattadhi)" },
    { english: "Uttara Bhadrapada", tamil: "உத்திரட்டாதி (Uthirattadhi)" },
    { english: "Revati", tamil: "ரேவதி (Revathi)" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Generate astrological reading using Gemini API
      const reading = await generateAstrologicalReading(formData, formData.language as 'english' | 'tamil')
      onSubmit(reading)
    } catch (error) {
      console.error('Error generating reading:', error)
      // You could show an error message to the user here
      alert('Sorry, there was an error generating your reading. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="reading" className="py-20 bg-gradient-to-b from-purple-50/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-amber-500 mr-2 animate-spin-slow" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
              Get Your Reading
            </h2>
            <Star className="h-8 w-8 text-amber-500 ml-2 animate-spin-slow" />
          </div>
          <p className="text-xl text-gray-600">Enter your details to receive personalized astrological insights</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Primary Information */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-purple-50 rounded-t-lg">
              <CardTitle className="flex items-center text-2xl text-gray-800">
                <User className="h-6 w-6 mr-2 text-purple-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="place" className="text-gray-700 font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Place of Birth *
                  </Label>
                  <Input
                    id="place"
                    type="text"
                    placeholder="City, Country"
                    value={formData.placeOfBirth}
                    onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-700 font-medium flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    Date of Birth *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-gray-700 font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Time of Birth
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.timeOfBirth}
                    onChange={(e) => handleInputChange("timeOfBirth", e.target.value)}
                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Information */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-t-lg">
              <CardTitle className="flex items-center text-2xl text-gray-800">
                <Sparkles className="h-6 w-6 mr-2 text-amber-500" />
                Astrological Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Rasi (Zodiac Sign) *</Label>
                  <Select value={formData.rasi} onValueChange={(value) => handleInputChange("rasi", value)} required>
                    <SelectTrigger className="border-gray-200 focus:border-purple-400">
                      <SelectValue placeholder="Select your zodiac sign" />
                    </SelectTrigger>
                    <SelectContent>
                      {zodiacSigns.map((sign) => (
                        <SelectItem key={sign.english} value={sign.english.toLowerCase()}>
                          {sign.english} - {sign.tamil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Nachathira (Birth Star) *</Label>
                  <Select value={formData.nachathira} onValueChange={(value) => handleInputChange("nachathira", value)} required>
                    <SelectTrigger className="border-gray-200 focus:border-purple-400">
                      <SelectValue placeholder="Select your birth star" />
                    </SelectTrigger>
                    <SelectContent>
                      {nakshatras.map((nakshatra) => (
                        <SelectItem key={nakshatra.english} value={nakshatra.english.toLowerCase()}>
                          {nakshatra.english} - {nakshatra.tamil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Language / மொழி</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger className="border-gray-200 focus:border-purple-400">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading || !formData.name || !formData.dateOfBirth || !formData.placeOfBirth || !formData.rasi || !formData.nachathira}
              className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Your Stars...
                </div>
              ) : (
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Get My Reading
                  <Star className="h-5 w-5 ml-2" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </section>
  )
}
