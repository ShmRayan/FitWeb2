import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, removeAllFromCart } = useContext(CartContext);

  // Calcul du prix total
  const totalPrice = cart.reduce((total, product) => total + (parseFloat(product.price.replace('$', '')) * product.quantity), 0).toFixed(2);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Votre panier est vide. Explorez nos produits et trouvez ce qui vous plaît!</p>
          <Link to="/products" className="shop-button">Magasinez maintenant</Link>
        </div>
      ) : (
        <>
          {cart.map(product => (
            <div className="cart-item" key={product.id}>
              <div className="cart-item-header">
                <h2>{product.name}</h2>
                <button className="remove-all" onClick={() => removeAllFromCart(product.id)}>X</button>
              </div>
              <div className="cart-item-content">
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-price">Price: ${product.price}</p>
                  <p className="cart-item-quantity">x {product.quantity}</p>
                  {product.quantity > 1 && <span className="cart-item-multi">x{product.quantity}</span>}
                </div>
              </div>
              <button className="remove-button" onClick={() => removeFromCart(product.id)}>Remove</button>
            </div>
          ))}
          <div className="total-price">
            <h2>Total Price: ${totalPrice}</h2>
            <Link to="/checkout" className="checkout-button">Acheter</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
