"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30">
          <source src="/placeholder-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-white/80" />
      </div>

      {/* Constellation Background Pattern */}
      <div className="absolute inset-0 z-10">
        <div className="constellation-pattern opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-amber-500 mr-2 animate-pulse" />
            <span className="text-lg text-gray-600 font-medium">Discover Your Cosmic Journey</span>
            <Sparkles className="h-8 w-8 text-amber-500 ml-2 animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 bg-clip-text text-transparent leading-tight">
            Astrok
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Where ancient wisdom meets modern technology. Get personalized astrological insights powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/astrology">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Your Reading
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg font-semibold bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-500" />
        </div>
      </div>

      <style jsx>{`
        .constellation-pattern {
          background-image: radial-gradient(2px 2px at 20px 30px, #fbbf24, transparent),
                            radial-gradient(2px 2px at 40px 70px, #a855f7, transparent),
                            radial-gradient(1px 1px at 90px 40px, #06b6d4, transparent),
                            radial-gradient(1px 1px at 130px 80px, #fbbf24, transparent),
                            radial-gradient(2px 2px at 160px 30px, #a855f7, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
