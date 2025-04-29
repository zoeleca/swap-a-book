import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black p-8 mt-auto">
      <div className="flex justify-between items-start">
        <div className="border-r border-gray-200 pr-6 mr-6 text-left">
          <h3 className="mb-4">Conditions Générales de Vente</h3>
          <a href="/conditions-de-vente">Consulter nos CGV</a>
        </div>
        <div className="border-r border-gray-200 pr-6 mr-6 text-left">
          <h3 className="mb-4">Email</h3>
          <p>contact@ampunv.com</p>
        </div>
        <div className="border-r border-gray-200 pr-6 mr-6 text-left">
          <h3 className="mb-4">Adresse Postale</h3>
          <p>Anciens meubles pour une nouvelle vie<br/>123 Rue Royale<br/>Capital City</p>
        </div>
        <div className="text-left">
          <h3 className="mb-4">Téléphone</h3>
          <p>+33 1 23 45 67 89</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;