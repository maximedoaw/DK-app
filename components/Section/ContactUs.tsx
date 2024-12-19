import React from "react";

const ContactUs = () => {
  const whatsappLink = "https://wa.me/1234567890"; // Remplacez par le numéro WhatsApp du gestionnaire.

  return (
    <section className="bg-gradient-to-br from-gray-800 via-blue-700 to-purple-900 text-white py-16 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Contactez-nous</h2>
        <p className="text-gray-300 mb-8">
          Vous avez des questions ou souhaitez en savoir plus ? Contactez-nous dès aujourd’hui pour discuter de vos besoins.
        </p>
        <div className="space-y-6">
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-60 text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-60 text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <textarea
                placeholder="Votre message"
                rows={4}
                className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-60 text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Envoyer
            </button>
          </form>

          <div className="mt-8 text-gray-300">
            <p>Email : <a href="mailto:contact@entreprise.com" className="text-blue-400 hover:underline">contact@entreprise.com</a></p>
            <p>Téléphone : <a href="tel:+1234567890" className="text-blue-400 hover:underline">+1 234 567 890</a></p>
            <p>Adresse : 123 Rue de l’Exemple, Ville, Pays</p>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
              Instagram
            </a>
          </div>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 px-8 py-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          Réserver une consultation
        </a>
      </div>
    </section>
  );
};

export default ContactUs;
