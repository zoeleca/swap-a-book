import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black p-8 mt-auto border-t border-gray-200">
      <div className="flex flex-wrap justify-between items-start gap-6">
        <div className="min-w-[200px] text-left">
          <h3 className="mb-2 font-semibold">À propos du projet</h3>
          <p className="text-sm text-gray-600">
            Projet réalisé dans le cadre du Titre Professionnel RNCP "Concepteur Développeur d'Applications".
          </p>
        </div>
        <div className="min-w-[200px] text-left">
          <h3 className="mb-2 font-semibold">Modalités</h3>
          <p className="text-sm text-gray-600">
            Ce site est une démonstration à but pédagogique et ne propose pas de services commerciaux réels.
          </p>
        </div>
        <div className="min-w-[200px] text-left">
          <h3 className="mb-2 font-semibold">Contact</h3>
          <p className="text-sm text-gray-600">votre.email@example.com</p>
        </div>
        <div className="min-w-[200px] text-left">
          <h3 className="mb-2 font-semibold">Version</h3>
          <p className="text-sm text-gray-600">v1.0 - 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
