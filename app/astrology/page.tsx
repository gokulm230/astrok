"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AstrologyForm } from "@/components/astrology-form"
import { ResultsDisplay } from "@/components/results-display"
import { Footer } from "@/components/footer"

export default function AstrologyPage() {
  const [astrologyResults, setAstrologyResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const handleAstrologySubmit = async (readingResults: any) => {
    setAstrologyResults(readingResults)
    setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20"> {/* Add padding to account for navigation */}
        <AstrologyForm onSubmit={handleAstrologySubmit} />
        {showResults && <ResultsDisplay results={astrologyResults} />}
      </div>
      <Footer />
    </div>
  )
}
