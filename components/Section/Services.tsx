import { 
    FaHandshake, 
    FaAd, 
    FaUserTie, 
    FaBalanceScale, 
    FaHeartbeat 
  } from 'react-icons/fa';
  
  const services = [
    {
      title: "Gestion de carrière",
      description: "Négociation de contrats, gestion des transferts et planification stratégique de carrière.",
      icon: FaHandshake
    },
    {
      title: "Sponsoring et partenariats",
      description: "Identification et négociation d'opportunités de sponsoring et de partenariats lucratifs.",
      icon: FaAd
    },
    {
      title: "Gestion d'image et relations publiques",
      description: "Développement et maintien d'une image publique positive, gestion des médias sociaux et relations presse.",
      icon: FaUserTie
    },
    {
      title: "Conseils juridiques et financiers",
      description: "Assistance juridique spécialisée et conseils en gestion financière et investissements.",
      icon: FaBalanceScale
    },
    {
      title: "Suivi personnel",
      description: "Accompagnement en préparation mentale, bien-être personnel et conseils en nutrition.",
      icon: FaHeartbeat
    }
  ];
  
  export default function Services() {
    return (
      <section className="py-20 w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-blue-700 to-purple-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-20">
                <div className="text-4xl text-blue-300 mb-4">
                  <service.icon />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  