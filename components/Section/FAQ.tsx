import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "Quels types de joueurs gérez-vous ?",
      answer: "Nous travaillons avec des joueurs professionnels, semi-professionnels, et des jeunes talents prometteurs.",
    },
    {
      question: "Comment se passe la première prise de contact ?",
      answer: "Lors de la première prise de contact, nous organisons une réunion pour discuter des besoins du joueur et de ses objectifs de carrière.",
    },
    {
      question: "Offrez-vous des services pour les jeunes talents ?",
      answer: "Oui, nous proposons des services d'accompagnement spécifiques pour aider les jeunes talents à développer leur potentiel.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-800 via-blue-700 to-purple-900 text-white py-16 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
          FAQ (Questions Fréquentes)
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 bg-opacity-60 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
