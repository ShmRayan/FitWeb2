import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const [filter, setFilter] = useState('');
  const [sorted, setSorted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const [activeAccordion, setActiveAccordion] = useState(null);

  const products = [
    { id: 1, name: 'Nike', category: 'Chaussures', brand: 'Nike', price: 189.99, image: `${process.env.PUBLIC_URL}/assets/nike.jpg`, link: '/nike' },
    { id: 2, name: 'Adidas', category: 'Chaussures', brand: 'Adidas', price: 109.99, image: `${process.env.PUBLIC_URL}/assets/adidas.webp`, link: '/adidas' },
    { id: 3, name: 'Puma', category: 'Chaussures', brand: 'Puma', price: 89.99, image: `${process.env.PUBLIC_URL}/assets/puma.jpg`, link: '/puma' },
    { id: 4, name: 'Abibos', category: 'Chaussures', brand: 'Abibos', price: 105.99, image: `${process.env.PUBLIC_URL}/assets/abibos.webp`, link: '/abibos' },
    { id: 5, name: 'Montre', category: 'Accessoires', brand: 'Montre', price: 59.99, image: `${process.env.PUBLIC_URL}/assets/montre.jpg`, link: '/montre' },
    { id: 6, name: 'Altere', category: 'Accessoires', brand: 'Altere', price: 49.99, image: `${process.env.PUBLIC_URL}/assets/altere.jpg`, link: '/altere' },
    { id: 7, name: 'Casquette', category: 'Accessoires', brand: 'Casquette', price: 55.99, image: `${process.env.PUBLIC_URL}/assets/casquette.jpg`, link: '/casquette' },
    { id: 8, name: 'Debardeur', category: 'Accessoires', brand: 'Debardeur', price: 45.99, image: `${process.env.PUBLIC_URL}/assets/debardeur.jpg`, link: '/debardeur' }
  ];
  
  const promotions = [
    { id: 1, name: 'NikePromo', category: 'Chaussures', brand: 'Nike', price: 69.99, image: `${process.env.PUBLIC_URL}/assets/nike1.jpg`, link: '/nikePromo' },
    { id: 2, name: 'AdidasPromo', category: 'Chaussures', brand: 'Adidas', price: 69.99, image: `${process.env.PUBLIC_URL}/assets/adidas1.jpeg`, link: '/adidasPromo' },
    { id: 3, name: 'PumaPromo', category: 'Chaussures', brand: 'Puma', price: 69.99, image: `${process.env.PUBLIC_URL}/assets/puma1.webp`, link: '/pumaPromo' },
    { id: 4, name: 'AbibosPromo', category: 'Chaussures', brand: 'Abibos', price: 69.99, image: `${process.env.PUBLIC_URL}/assets/abibos1.jpeg`, link: '/abibosPromo' },
    { id: 5, name: 'MontrePromo', category: 'Accessoires', brand: 'Montre', price: 39.99, image: `${process.env.PUBLIC_URL}/assets/montre1.jpg`, link: '/montrePromo' },
    { id: 6, name: 'AlterePromo', category: 'Accessoires', brand: 'Altere', price: 39.99, image: `${process.env.PUBLIC_URL}/assets/altere1.jpeg`, link: '/alterePromo' },
    { id: 7, name: 'CasquettePromo', category: 'Accessoires', brand: 'Casquette', price: 39.99, image: `${process.env.PUBLIC_URL}/assets/casquette1.webp`, link: '/casquettePromo' },
    { id: 8, name: 'DebardeurPromo', category: 'Accessoires', brand: 'Debardeur', price: 39.99, image: `${process.env.PUBLIC_URL}/assets/debardeur1.jpeg`, link: '/debardeurPromo' }
  ];
  
  const filterOptions = {
    'Type de produit': ['Chaussures', 'Accessoires'],
    'Marque': ['Nike', 'Adidas', 'Puma', 'Abibos'],
  };

  const handleFilterSelect = (filter, option) => {
    setSelectedFilter(`${filter}: ${option}`);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const handlePromoNext = () => {
    setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promotions.length);
  };

  const handlePromoPrev = () => {
    setCurrentPromoIndex((prevIndex) => (prevIndex - 1 + promotions.length) % promotions.length);
  };

  const handleResetFilters = () => {
    setFilter('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedFilter('');
  };

  const isPriceFilterApplied = () => {
    return minPrice || maxPrice;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
      handlePromoNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesFilter = selectedFilter === '' || selectedFilter.includes(product.category) || selectedFilter.includes(product.brand);
    const matchesPrice = (!minPrice || product.price >= parseFloat(minPrice)) && (!maxPrice || product.price <= parseFloat(maxPrice));
    return matchesFilter && matchesPrice;
  });

  const filteredPromotions = promotions.filter(product => {
    const matchesFilter = selectedFilter === '' || selectedFilter.includes(product.category) || selectedFilter.includes(product.brand);
    const matchesPrice = (!minPrice || product.price >= parseFloat(minPrice)) && (!maxPrice || product.price <= parseFloat(maxPrice));
    return matchesFilter && matchesPrice;
  });

  const sortedProducts = sorted ? [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name)) : filteredProducts;

  const visibleProducts = sortedProducts.slice(currentIndex, currentIndex + 4);
  const visiblePromotions = filteredPromotions.slice(currentPromoIndex, currentPromoIndex + 4);
  if (visibleProducts.length < 4) {
    visibleProducts.push(...sortedProducts.slice(0, 4 - visibleProducts.length));
  }
  if (visiblePromotions.length < 4) {
    visiblePromotions.push(...filteredPromotions.slice(0, 4 - visiblePromotions.length));
  }

  return (
    <div className="container1">
      <header className="header1">
        <h1 className="logo1">NovaSport</h1>
      </header>
      <div className="filters1">
        <div className="price-filter">
          <input
            type="number"
            placeholder="Prix min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Prix max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        {Object.keys(filterOptions).map(filter => (
          <div className="filter-button1" key={filter}>
            {filter}
            <div className="filter-options1">
              {filterOptions[filter].map(option => (
                <button key={option} onClick={() => handleFilterSelect(filter, option)}>{option}</button>
              ))}
            </div>
          </div>
        ))}
        <button className="filter-button1" onClick={handleResetFilters}>Réinitialiser</button>
      </div>

      {selectedFilter && <div className="selected-filter1">Filtre sélectionné: {selectedFilter}</div>}

      <div className="results1">
        <h2 className="section-title1">Résultat des Recherches</h2>
        <p className="explanatory-text">Découvrez notre sélection des meilleurs produits pour améliorer votre performance sportive.</p>
        <div className="product-slider1">
          <button className="slider-arrow1" onClick={handlePrev}>◀</button>
          <div className="product-grid1">
            {visibleProducts.map(product => (
              <div className="product1-card" key={product.id}>
                <Link to={product.link}>
                  <img className="product-image1" src={product.image} alt={product.name} />
                  <div className="product-info1">
                    <p className="product-name1">{product.name}</p>
                    <p className="product-price1">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button className="slider-arrow1" onClick={handleNext}>▶</button>
        </div>
      </div>

      {!isPriceFilterApplied() && (
        <div className="promotions1">
          <h2 className="section-title1">Promotions</h2>
          <p className="explanatory-text">Profitez de nos offres exceptionnelles sur une large gamme de produits de sport !</p>
          <div className="product-slider1">
            <button className="slider-arrow1" onClick={handlePromoPrev}>◀</button>
            <div className="product-grid1">
              {visiblePromotions.map(product => (
                <div className="product1-card" key={product.id}>
                  <Link to={product.link}>
                    <img className="product-image1" src={product.image} alt={product.name} />
                    <img className="solde-icon1" src={`${process.env.PUBLIC_URL}/assets/solde.png`} alt="Soldée" />
                    <div className="product-info1">
                      <p className="product-name1">{product.name}</p>
                      <p className="product-price1">${product.price.toFixed(2)}</p>
                      <p className="product-sale1">Soldée</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <button className="slider-arrow1" onClick={handlePromoNext}>▶</button>
          </div>
        </div>
      )}

      <div className="reviews-section">
        <h2 className="section-title1">Avis des Clients</h2>

        <div className="review-card">
          <p className="review-text">"Produit incroyable ! Très confortable et de bonne qualité."</p>
          <p className="review-author">- Jean Dupont</p>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
        </div>

        <div className="review-card">
          <p className="review-text">"Je recommande fortement ce produit à tous les sportifs."</p>
          <p className="review-author">- Marie Claire</p>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
        </div>

        <div className="review-card">
          <p className="review-text">"Excellent rapport qualité/prix. Très satisfait de mon achat."</p>
          <p className="review-author">- Alain Tremblay</p>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
        </div>
      </div>

      <div className="support-section">
        <h2 className="support-title">On est là pour vous !</h2>
        <div className="support-options">
          <div className="support-option">
            <img src={`${process.env.PUBLIC_URL}/assets/shipping.png`} alt="Ship to Home" />
            <h3>Ship to Home</h3>
            <p>Order online and have products shipped to you.</p>
            <div className="accordion-title" onClick={() => toggleAccordion(0)}>View Shipping Options</div>
            <div className={`accordion-content ${activeAccordion === 0 ? 'open' : ''}`}>
              <p>- Standard shipping: Delivered in 5-7 business days.</p>
              <p>- Express shipping: Delivered in 2-3 business days.</p>
              <p>- Overnight shipping: Delivered the next business day.</p>
            </div>
          </div>
          <div className="support-option">
            <img src={`${process.env.PUBLIC_URL}/assets/pickup.png`} alt="Free In-Store Pickup" />
            <h3>Free In-Store Pickup</h3>
            <p>Order online and pick up in store.</p>
            <div className="accordion-title" onClick={() => toggleAccordion(1)}>View Pickup Options</div>
            <div className={`accordion-content ${activeAccordion === 1 ? 'open' : ''}`}>
              <p>- Pick up your order within 2 hours of purchase.</p>
              <p>- Extended pickup hours: Available 7 days a week.</p>
              <p>- Contactless pickup options available.</p>
            </div>
          </div>
          <div className="support-option">
            <img src={`${process.env.PUBLIC_URL}/assets/credit.png`} alt="Credit Offered" />
            <h3>Credit Offered</h3>
            <p>Turn big purchases into small payments.</p>
            <div className="accordion-title" onClick={() => toggleAccordion(2)}>View Financing Options</div>
            <div className={`accordion-content ${activeAccordion === 2 ? 'open' : ''}`}>
              <p>- Pay with major credit cards: Visa, MasterCard, American Express.</p>
              <p>- Financing options through Klarna and Afterpay.</p>
              <p>- Flexible monthly payment plans with no hidden fees.</p>
            </div>
          </div>
        </div>
        <div className="contact-info">
          <p><strong>**Contactez-nous :**</strong></p>
          <p>Besoin d'aide ou avez des questions ? Notre équipe est là pour vous aider !</p>
          <p>N'hésitez pas à nous contacter pour toute question concernant nos produits, les commandes ou le processus d'achat. Nous sommes disponibles pour vous offrir une assistance personnalisée et garantir une expérience d'achat agréable chez NovaSport.</p>
          <p>Par téléphone : +1 (123) 456-7890</p>
          <p>Par email : support@novasport.com</p>
          <p>Rejoignez notre communauté sur les réseaux sociaux pour rester informé des dernières nouveautés et promotions !</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
