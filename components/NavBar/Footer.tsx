import React from 'react'

import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400  border-t border-gray-700">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
        {/* Logo et description */}
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <h1 className="text-2xl font-extrabold text-blue-400 drop-shadow-[0_0_10px_rgba(0,192,255,0.8)]">
            DK.com
          </h1>
          <p className="text-sm mt-2">
            Rejoignez-nous pour vivre votre passion pour le football. Soyez une star !
          </p>
        </div>

        {/* Navigation */}
        <div className="flex space-x-6 mb-4 lg:mb-0">
          <a
            href="#"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Accueil
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Services
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            À propos
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/maximedoaw" // Remplace par ton lien GitHub
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="www.linkedin.com/in/maxime-doaw-5849b8293" // Remplace par ton lien LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Soccer.com. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
