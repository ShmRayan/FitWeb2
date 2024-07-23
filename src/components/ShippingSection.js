import React, { useState } from 'react';
import './ShippingSection.css';

const ShippingSection = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddAddress = () => {
    if (newAddress) {
      setAddresses([...addresses, newAddress]);
      setNewAddress('');
      setIsAdding(false);
    }
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  return (
    <div className="shipping-section">
      <h2>Adresse de livraison</h2>
      {addresses.map((address, index) => (
        <div key={index} className="address-item">
          <p>{address}</p>
          <button onClick={() => handleDeleteAddress(index)}>Supprimer</button>
        </div>
      ))}
      {isAdding ? (
        <div className="new-address-form">
          <input
            type="text"
            placeholder="Entrez une nouvelle adresse"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <button onClick={handleAddAddress}>Ajouter l'adresse</button>
        </div>
      ) : (
        <button className="add-new-address" onClick={() => setIsAdding(true)}>Ajouter une nouvelle adresse</button>
      )}
    </div>
  );
};

export default ShippingSection;
