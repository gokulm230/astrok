import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Download, Share2, Heart, TrendingUp } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Age-Based Readings",
      description: "Customized insights for teens, adults, and seniors with relevant life guidance",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "Love Calculator",
      description: "Discover compatibility with your partner through zodiac-based matching",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: TrendingUp,
      title: "Career Guidance",
      description: "Professional insights based on your astrological profile and planetary positions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your readings on social media or copy links to send to friends",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Download,
      title: "PDF Reports",
      description: "Download comprehensive astrological reports for offline access",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Community Insights",
      description: "Connect with others who share your astrological traits and experiences",
      color: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent">
            Features & Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive astrological services designed to provide insights into every aspect of your life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-amber-50 via-purple-50 to-blue-50 rounded-2xl border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to explore your cosmic destiny?</h3>
            <p className="text-gray-600 mb-6">Join thousands who have discovered their path through the stars</p>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-amber-400 to-purple-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
