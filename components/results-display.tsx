"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, Download, Heart, Briefcase, Activity, Sparkles, Star } from "lucide-react"

interface ResultsDisplayProps {
  results: any
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState("general")

  const handleShare = (platform: string) => {
    const text = `Check out my astrological reading on Astrok! I'm a ${results.zodiacSign} with ${results.birthStar} birth star.`
    const url = window.location.href

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`)
        break
      default:
        navigator.clipboard.writeText(url)
        alert("Link copied to clipboard!")
    }
  }

  const handleDownload = () => {
    // Mock PDF download - replace with actual PDF generation
    alert("PDF download feature will be implemented with a PDF generation library")
  }

  const tabs = [
    { id: "general", label: "General", icon: Star, content: results.general },
    { id: "love", label: "Love", icon: Heart, content: results.love },
    { id: "career", label: "Career", icon: Briefcase, content: results.career },
    { id: "wellness", label: "Wellness", icon: Activity, content: results.wellness },
    { id: "spirituality", label: "Spirituality", icon: Sparkles, content: results.spirituality },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
            Your Astrological Reading
          </h2>
          <p className="text-xl text-gray-600">Hello {results.name}, here are your personalized insights</p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-amber-50 via-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{results.name}</h3>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
                  <div className="flex items-center justify-center md:justify-start">
                    <Star className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="text-gray-700 font-medium">Zodiac: {results.zodiacSign}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-gray-700 font-medium">Birth Star: {results.birthStar}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("copy")}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Tabs */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-t-lg">
            <CardTitle className="text-2xl text-center text-gray-800">Your Cosmic Insights</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-gray-50 p-1 rounded-none">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex flex-col items-center py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <tab.icon className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="p-8 min-h-[300px]">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center mb-6">
                      <div className="p-3 rounded-full bg-gradient-to-r from-amber-100 to-purple-100 mr-4">
                        <tab.icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{tab.label} Reading</h3>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-lg">{tab.content}</p>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Share Options */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Share Your Reading</h3>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => handleShare("twitter")}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Twitter
            </Button>
            <Button
              variant="outline"
              onClick={() => handleShare("facebook")}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Facebook
            </Button>
            <Button
              variant="outline"
              onClick={() => handleShare("whatsapp")}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
