import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, Star, Zap } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Advanced algorithms analyze celestial patterns to provide accurate readings",
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description: "Tailored astrological guidance based on your unique birth chart",
    },
    {
      icon: Star,
      title: "Ancient Wisdom",
      description: "Traditional Vedic astrology principles enhanced with modern technology",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive astrological insights in seconds, not hours",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
            About Astrok
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Astrok bridges the gap between ancient astrological wisdom and cutting-edge AI technology. Our platform
            combines traditional Vedic astrology with modern computational power to deliver personalized insights that
            guide your life journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-gradient-to-r from-amber-100 to-purple-100 group-hover:from-amber-200 group-hover:to-purple-200 transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-50 to-purple-50 rounded-full border border-amber-200">
            <Star className="h-5 w-5 text-amber-500 mr-2" />
            <span className="text-gray-700 font-medium">Trusted by thousands of users worldwide</span>
            <Star className="h-5 w-5 text-amber-500 ml-2" />
          </div>
        </div>
      </div>
    </section>
  )
}
