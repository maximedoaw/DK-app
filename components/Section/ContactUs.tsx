import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappLink = "https://wa.me/677271237"; // Remplacez par le numéro WhatsApp du gestionnaire.

  const handleChange = (e :  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string, // Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string, // Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // Public Key
      )
      .then(
        (response) => {
          setSuccessMessage("Votre message a été envoyé avec succès !");
          setErrorMessage("");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setErrorMessage("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.");
          console.error("EmailJS Error:", error);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="bg-gradient-to-br from-gray-800 via-blue-700 to-purple-900 text-white py-16 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Contactez-nous</h2>
        <p className="text-gray-300 mb-8">
          Vous avez des questions ou souhaitez en savoir plus ? Contactez-nous dès aujourd’hui pour discuter de vos besoins.
        </p>
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                required
                className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-60 text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre email"
                required
                className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-60 text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message"
                rows={4}
                required
                className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-60 text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>

          {successMessage && <p className="text-green-400 mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-400 mt-4">{errorMessage}</p>}

          <div className="mt-8 text-gray-300">
            <p>
              Email :{" "}
              <a href="mailto:contact@entreprise.com" className="text-blue-400 hover:underline">
                contact@entreprise.com
              </a>
            </p>
            <p>
              Téléphone :{" "}
              <a href="tel:+1234567890" className="text-blue-400 hover:underline">
                +1 234 567 890
              </a>
            </p>
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
