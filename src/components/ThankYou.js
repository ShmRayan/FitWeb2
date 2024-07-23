import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const recommendations = [
    { id: 1, name: 'Produit recommandé 1', link: '/product/1' },
    { id: 2, name: 'Produit recommandé 2', link: '/product/2' },
    { id: 3, name: 'Produit recommandé 3', link: '/product/3' },
  ];

  return (
    <div className="thank-you-container">
      <h1>Merci pour votre achat !</h1>
      <p>Votre commande a été traitée avec succès.</p>
      <Link to="/products" className="continue-shopping-button">Continuez à magasiner</Link>
    </div>
  );
};

export default ThankYou;
