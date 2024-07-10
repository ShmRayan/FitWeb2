import React from 'react';
import { Link } from 'react-router-dom';
import './Articles.css';

const AdidasPromo = () => {
  return (
    <div className="product-detail">
      <div className="breadcrumb">
        <Link to="/">Accueil</Link> {'>'} <Link to="/products">Products</Link> {'>'} Adidas Promo
      </div>
      <h1>Adidas Promo</h1>
      <img src="/assets/adidas1.jpeg" alt="Adidas Promo" />
      <div className="text-content">
        <p>
          Price: $69.99
        </p>
        <p>
          Qualité grandiose! Meilleurs produits pour les champions. Conçue pour la performance, cette chaussure vous mènera vers de nouvelles hauteurs. Hala Madrid!!
        </p>
        <h3>Advantages:</h3>
        <ul>
          <li>Enhances cardiovascular fitness</li>
          <li>Improves coordination</li>
          <li>Portable and easy to use</li>
        </ul>
      </div>
      <button className="add-to-cart">Ajouter au panier</button>
    </div>
  );
};

export default AdidasPromo;
