import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [swiftCode, setSwiftCode] = useState('');

  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);

  const addAddress = () => {
    if (newAddress.trim() !== '') {
      setAddresses([...addresses, newAddress]);
      setNewAddress('');
      if (addresses.length === 0) {
        setDefaultAddressIndex(0); // Set the first address as default if it's the only one
      }
    }
    setShowAddressInput(false);
  };

  const deleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    if (defaultAddressIndex === index && updatedAddresses.length > 0) {
      setDefaultAddressIndex(0); // Set the first address as default if the default one is deleted
    } else if (defaultAddressIndex > index) {
      setDefaultAddressIndex(defaultAddressIndex - 1);
    } else if (updatedAddresses.length === 0) {
      setDefaultAddressIndex(null); // Clear default address if no addresses are left
    }
  };

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleSetDefaultAddress = (index) => {
    setDefaultAddressIndex(index);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1/');
    setExpiryDate(formattedValue);
  };

  const handleSecurityCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setSecurityCode(value);
  };

  const handleNumericInputChange = (setValue) => (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'creditCard') {
      if (!cardNumber || cardNumber.length !== 19 || !expiryDate || !securityCode || securityCode.length !== 3) {
        alert('Veuillez entrer des informations de carte de crédit valides.');
        return;
      }
    } else if (paymentMethod === 'paypal') {
      if (!paypalEmail) {
        alert('Veuillez entrer un email PayPal valide.');
        return;
      }
    } else if (paymentMethod === 'bankTransfer') {
      if (!accountNumber || !bankName || !swiftCode) {
        alert('Veuillez entrer des informations de virement bancaire valides.');
        return;
      }
    } else {
      alert('Veuillez sélectionner une méthode de paiement.');
      return;
    }
    
    navigate('/thankyou'); // Redirection vers la page de remerciement
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-title-container">
        <nav className="checkout-breadcrumb">
          <Link to="/">Accueil</Link> &gt; <Link to="/cart">Panier</Link> &gt; Checkout
        </nav>
        <h1 className="checkout-title">Checkout</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="checkout-main">
          <div className="checkout-left">
            <div className="shipping-section">
              <div className="shipping-header">
                <h2>Adresse de livraison</h2>
                <button
                  type="button"
                  className="add-address"
                  onClick={() => setShowAddressInput(true)}
                >
                  <span className="plus-icon">+</span> Ajouter une nouvelle adresse
                </button>
              </div>
              {addresses.map((address, index) => (
                <div key={index} className={`address-item ${index === defaultAddressIndex ? 'default-address' : ''}`}>
                  <input type="text" value={address} readOnly />
                  <button type="button" className="delete-button" onClick={() => deleteAddress(index)}>Supprimer</button>
                  <button type="button" className="set-default-button" onClick={() => handleSetDefaultAddress(index)}>
                    {index === defaultAddressIndex ? 'default' : 'set'}
                  </button>
                </div>
              ))}
              {showAddressInput && (
                <div className="new-address-container">
                  <input
                    type="text"
                    value={newAddress}
                    onChange={handleAddressChange}
                    placeholder="Entrez une nouvelle adresse"
                    className="new-address-input"
                  />
                  <button
                    type="button"
                    className="save-button"
                    onClick={addAddress}
                  >
                    Sauvegarder
                  </button>
                </div>
              )}
            </div>
            <div className="payment-section">
              <div className="checkout-section-header">
                <h2>Paiement</h2>
              </div>
              <div className="payment-method-container">
                <div className="payment-method">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('creditCard')}
                  >
                    Carte de crédit
                  </button>
                  <div className="credit-card-icons">
                    <img src={`${process.env.PUBLIC_URL}/assets/visa.png`} alt="Visa" />
                    <img src={`${process.env.PUBLIC_URL}/assets/mastercard.jpg`} alt="MasterCard" />
                    <img src={`${process.env.PUBLIC_URL}/assets/applepay.png`} alt="Apple Pay" />
                  </div>
                  <div className={`payment-details ${paymentMethod === 'creditCard' ? 'show' : ''}`}>
                    <label>NUMÉRO DE CARTE:</label>
                    <input type="text" name="cardNumber" value={cardNumber} onChange={handleCardNumberChange} placeholder="XXXX XXXX XXXX XXXX" maxLength="19" required={paymentMethod === 'creditCard'} />
                    <label>DATE D'EXPIRATION:</label>
                    <input type="text" name="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/AA" maxLength="5" required={paymentMethod === 'creditCard'} />
                    <label>CODE DE SÉCURITÉ:</label>
                    <input type="text" name="securityCode" value={securityCode} onChange={handleSecurityCodeChange} placeholder="CVV" maxLength="3" required={paymentMethod === 'creditCard'} />
                  </div>
                </div>
                <div className="payment-method">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    PayPal
                  </button>
                  <div className="credit-card-icons">
                    <img src={`${process.env.PUBLIC_URL}/assets/paypal.png`} alt="Paypal" />
                  </div>
                  <div className={`payment-details ${paymentMethod === 'paypal' ? 'show' : ''}`}>
                    <label>Adresse Email PayPal:</label>
                    <input type="email" name="paypalEmail" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} required={paymentMethod === 'paypal'} />
                    <p>Connectez-vous à votre compte PayPal pour continuer.</p>
                  </div>
                </div>
                <div className="payment-method">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bankTransfer')}
                  >
                    Virement bancaire
                  </button>
                  <div className="credit-card-icons">
                    <img src={`${process.env.PUBLIC_URL}/assets/banque.png`} alt="Banque" />
                  </div>
                  <div className={`payment-details ${paymentMethod === 'bankTransfer' ? 'show' : ''}`}>
                    <label>Numéro de compte:</label>
                    <input type="text" name="accountNumber" value={accountNumber} onChange={handleNumericInputChange(setAccountNumber)} required={paymentMethod === 'bankTransfer'} />
                    <label>Nom de la banque:</label>
                    <input type="text" name="bankName" value={bankName} onChange={(e) => setBankName(e.target.value)} required={paymentMethod === 'bankTransfer'} />
                    <label>Code SWIFT:</label>
                    <input type="text" name="swiftCode" value={swiftCode} onChange={handleNumericInputChange(setSwiftCode)} required={paymentMethod === 'bankTransfer'} />
                  </div>
                </div>
              </div>
              <button type="submit">Passer votre commande</button>
            </div>
          </div>
          <div className="checkout-right">
            <div className="checkout-section-header">
                <h2>Continuez vos achats</h2>
            </div>
            <div className="checkout-recommendation-banner">
                <p>Explorez nos autres produits pour trouver ce qui vous plaît.</p>
                <Link to="/products" className="checkout-continue-shopping-button">Retour à la boutique</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
