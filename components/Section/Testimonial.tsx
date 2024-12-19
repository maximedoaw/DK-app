import Image from 'next/image'
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

const testimonials = [
  {
    name: "Lionel Messi",
    role: "attaquant au PSG",
    image: "/images/Messi.png",
    quote: "Grâce à leur expertise, j'ai pu négocier le meilleur contrat de ma carrière."
  },
  {
    name: "Zinedine Zidane",
    role: "Ancien joueur et entraîneur",
    image: "/images/zidane.jpg",
    quote: "Leur approche professionnelle a grandement facilité ma transition vers le coaching."
  }
]

const stats = [
  { label: "Joueurs gérés", value: "500+" },
  { label: "Contrats négociés", value: "1000+" },
  { label: "Partenariats établis", value: "200+" }
]

const partners = [
  { name: "Real Madrid", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Manchester United", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Bayern Munich", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Barcelona", logo: "/placeholder.svg?height=50&width=100" }
]

export default function Testimonials() {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-800 via-blue-700 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Témoignages et Réalisations</h2>
        
        {/* Témoignages */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-4 mr-3">
                  <Image src={testimonial.image} alt={testimonial.name} width={35} height={30} className="rounded-full mr-3" />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm opacity-75">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic">"{testimonial.quote}"</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-sm opacity-75">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

