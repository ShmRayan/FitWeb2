import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaMapMarkerAlt } from 'react-icons/fa';
import { CartContext } from './CartContext';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
  const { cart } = useContext(CartContext);
  const { t, i18n } = useTranslation();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header-container">
      <div className="top-container">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/assets/logo.avif`} alt="NovaSport Logo" className="logo-image" />
          <h1 className="logo-text">NovaSport</h1>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">{t('Accueil')}</Link>
          <Link to="/products" className="nav-link">{t('Articles')}</Link>
          <Link to="/about" className="nav-link">{t('FAQs')}</Link>
          <Link to="/contact" className="nav-link">{t('Contact us')}</Link>
        </nav>
        <div className="icons-container">
          <div className="language-selector">
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('fr')}>FR</button>
          </div>
          <a href="https://www.google.com/maps/place/Hassan+II,+Casablanca+20250,+Maroc/data=!4m2!3m1!1s0xda7ccc19069f333:0x58f9773f5d1ffad9?sa=X&ved=1t:242&ictx=111" target="_blank" rel="noopener noreferrer">
            <FaMapMarkerAlt className="icon" />
          </a>
          <Link to="/cart" className="cart-link">
            <FaShoppingCart className="icon" />
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </Link>
          <Link to="/login" className="icon-link">
            <FaUserCircle className="icon" />
            <span>{t('Login')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
