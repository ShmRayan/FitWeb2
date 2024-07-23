import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Importation de useTranslation
import './HomePage.css';

const sportImage = `${process.env.PUBLIC_URL}/assets/background.jpg`;
const promoImage = `${process.env.PUBLIC_URL}/assets/promotion.jpg`;

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);
  const [currentAccessoryIndex, setCurrentAccessoryIndex] = useState(0);
  const { t } = useTranslation(); // Utilisation de useTranslation

  const shoes = [
    { id: 1, name: 'Nike', price: '79.99$', image: `${process.env.PUBLIC_URL}/assets/nike.jpg` },
    { id: 2, name: 'Adidas', price: '79.99$', image: `${process.env.PUBLIC_URL}/assets/adidas.webp` },
    { id: 3, name: 'Puma', price: '79.99$', image: `${process.env.PUBLIC_URL}/assets/puma.jpg` },
    { id: 4, name: 'Abibos', price: '79.99$', image: `${process.env.PUBLIC_URL}/assets/abibos.webp` }
  ];
  
  const accessories = [
    { id: 1, name: 'Montre', price: '49.99$', image: `${process.env.PUBLIC_URL}/assets/montre.jpg` },
    { id: 2, name: 'Altere', price: '49.99$', image: `${process.env.PUBLIC_URL}/assets/altere.jpg` },
    { id: 3, name: 'Casquette', price: '49.99$', image: `${process.env.PUBLIC_URL}/assets/casquette.jpg` },
    { id: 4, name: 'Debardeur', price: '49.99$', image: `${process.env.PUBLIC_URL}/assets/debardeur.jpg` }
  ];

  useEffect(() => {
    setIsVisible(true);
    const shoeInterval = setInterval(() => {
      setCurrentShoeIndex((prevIndex) => (prevIndex + 1) % shoes.length);
    }, 5000);
    const accessoryInterval = setInterval(() => {
      setCurrentAccessoryIndex((prevIndex) => (prevIndex + 1) % accessories.length);
    }, 5000);
    return () => {
      clearInterval(shoeInterval);
      clearInterval(accessoryInterval);
    };
  }, [shoes.length, accessories.length]);

  const handleNextShoe = () => {
    setCurrentShoeIndex((prevIndex) => (prevIndex + 1) % shoes.length);
  };

  const handlePrevShoe = () => {
    setCurrentShoeIndex((prevIndex) => (prevIndex - 1 + shoes.length) % shoes.length);
  };

  const handleNextAccessory = () => {
    setCurrentAccessoryIndex((prevIndex) => (prevIndex + 1) % accessories.length);
  };

  const handlePrevAccessory = () => {
    setCurrentAccessoryIndex((prevIndex) => (prevIndex - 1 + accessories.length) % accessories.length);
  };

  const visibleShoes = shoes.slice(currentShoeIndex, currentShoeIndex + 3).concat(shoes.slice(0, Math.max(0, 3 - shoes.slice(currentShoeIndex, currentShoeIndex + 3).length)));
  const visibleAccessories = accessories.slice(currentAccessoryIndex, currentAccessoryIndex + 3).concat(accessories.slice(0, Math.max(0, 3 - accessories.slice(currentAccessoryIndex, currentAccessoryIndex + 3).length)));

  return (
    <div className="con">
      <div className={`content-box ${isVisible ? 'visible' : ''}`}>
        <div className="text-section">
          <h1 className="title">{t('Boostez Votre Performance')}</h1>
          <p className="description">
            {t('Découvrez notre sélection de vêtements, chaussures, et accessoires de sport. Qualité, confort et style au top!')}
          </p>
          <p className="description">
            {t('Chez NovaSport, nous nous engageons à vous fournir les meilleurs équipements pour améliorer votre performance. Que vous soyez un athlète professionnel ou amateur, nos produits sont conçus pour répondre à tous vos besoins. Restez motivé et atteignez vos objectifs avec style et confort.')}
          </p>
          <Link to="/products" className="link-button">{t('Magasinez')}</Link>
        </div>
        <div className="image-section">
          <img src={sportImage} alt={t('Sport Image')} className="styled-image" />
        </div>
      </div>

      <div className="products-section">
        <h2 className="section-title" style={{ color: '#FFFFFF', fontStyle: 'italic' }}>{t('Voici des produits soigneusement sélectionnés pour Vous!')}</h2>
        <h2 className="section-title" style={{ color: '#00BFFF', fontStyle: 'italic' }}>{t('Chaussures')}</h2>
        <div className="product-slider">
          <button className="arrow-button left" onClick={handlePrevShoe}>◀</button>
          <div className="product-grid">
            {visibleShoes.map((shoe) => (
              <div key={shoe.id} className="product-card">
                <Link to={`/${shoe.name.toLowerCase()}`} className="product-link">
                  <img src={shoe.image} alt={shoe.name} className="product-image" />
                  <div className="product-info">
                    <h3 className="product-name">{shoe.name}</h3>
                    <p className="product-price">{shoe.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button className="arrow-button right" onClick={handleNextShoe}>▶</button>
        </div>

        <h2 className="section-title" style={{ color: '#00BFFF', fontStyle: 'italic' }}>{t('Accessoires')}</h2>
        <div className="product-slider">
          <button className="arrow-button left" onClick={handlePrevAccessory}>◀</button>
          <div className="product-grid">
            {visibleAccessories.map((accessory) => (
              <div key={accessory.id} className="product-card">
                <Link to={`/${accessory.name.toLowerCase()}`} className="product-link">
                  <img src={accessory.image} alt={accessory.name} className="product-image" />
                  <div className="product-info">
                    <h3 className="product-name">{accessory.name}</h3>
                    <p className="product-price">{accessory.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button className="arrow-button right" onClick={handleNextAccessory}>▶</button>
        </div>
      </div>

      <div className={`promotion-section ${isVisible ? 'visible' : ''}`}>
        <img src={promoImage} alt={t('Promotion Image')} className="promo-image" />
        <div className="promo-content">
          <h3 className="promo-title">{t('PROMOTIONS EXCLUSIVES')}</h3>
          <p className="promo-description">
            {t('Ne ratez pas nos offres Exceptionnelles sur une sélection de vêtements, chaussures et accessoires !')}
          </p>
          <Link to="/products" className="link-button">{t('Magasinez')}</Link>
        </div>
      </div>

      <div className={`about-us-section ${isVisible ? 'visible' : ''}`}>
        <h2 className="about-us-title">{t('About Us')}</h2>
        <p className="about-us-content">
          {t("We'd love to hear from you! Here are our contact details:")}
          <br />
          <strong>{t('Opening Hours:')}</strong>
          <br />
          {t('- Monday to Friday: 9:00 AM - 6:00 PM')}
          <br />
          {t('- Saturday: 10:00 AM - 4:00 PM')}
          <br />
          <strong>{t('Location:')}</strong>
          <br />
          {t('NovaSport Headquarters')}
          <br />
          {t('123 Sports Avenue')}
          <br />
          {t('Ottawa, ON K1A 0B1 Canada')}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
