"use client"

import { Navigation } from "@/components/navigation"
import { LoveCalculator } from "@/components/love-calculator"
import { Footer } from "@/components/footer"

export default function LoveCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20"> {/* Add padding to account for navigation */}
        <LoveCalculator />
      </div>
      <Footer />
    </div>
  )
} 
