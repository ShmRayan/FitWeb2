import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Articles.css';

const Abibos = () => {
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [userId, setUserId] = useState('You'); // Mock current user ID

  useEffect(() => {
    // Load reviews from localStorage
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [
      { id: 1, text: "Produit incroyable ! Très confortable et de bonne qualité.", author: "Jean Dupont", rating: 5, userId: "JeanDupont" },
      { id: 2, text: "Je recommande fortement ce produit à tous les sportifs.", author: "Marie Claire", rating: 5, userId: "MarieClaire" },
      { id: 3, text: "Excellent rapport qualité/prix. Très satisfait de mon achat.", author: "Alain Tremblay", rating: 5, userId: "AlainTremblay" }
    ];
    setReviews(storedReviews);
  }, []);

  useEffect(() => {
    // Save reviews to localStorage whenever reviews change
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const product = {
    id: 4,
    name: 'Abibos',
    price: '79.99$',
    image: `${process.env.PUBLIC_URL}/assets/abibos.webp`,
    description: 'Affordable yet reliable Abibos shoes for everyday use.',
    advantages: [
      'Good value for money',
      'Comfortable fit',
      'Stylish appearance',
    ],
  };

  const handleAddToCart = () => {
    addToCart(product);
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([...reviews, { id: Date.now(), text: newReview, author: 'You', rating, userId }]);
      setNewReview('');
      setRating(5);
    }
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  return (
    <div className="product-detail">
      <div className="breadcrumb">
        <Link to="/">Accueil</Link> {'>'} <Link to="/products">Products</Link> {'>'} Abibos
      </div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <div className="text-content">
        <p>Price: {product.price}</p>
        <p>{product.description}</p>
        <h3>Advantages:</h3>
        <ul>
          {product.advantages.map((advantage, index) => (
            <li key={index}>{advantage}</li>
          ))}
        </ul>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>Ajouter au panier</button>
      {notification && <div className="notification">Produit ajouté au panier !</div>}
      
      <div className="reviews-section">
        <h3>Reviews:</h3>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="review-card">
              <p>{review.text}</p>
              <p><strong>{review.author}</strong></p>
              <p>{"⭐".repeat(review.rating)}</p>
              {review.userId === userId && (
                <button onClick={() => handleDeleteReview(review.id)} className="delete-review-button">Supprimer</button>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        <div className="add-review">
          <h3>Add Your Review:</h3>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
          />
          <div>
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} ⭐</option>
              ))}
            </select>
          </div>
          <button onClick={handleAddReview}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default Abibos;
