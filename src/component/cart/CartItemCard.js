import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt={item.name} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: $ ${(item.price || 0).toFixed(2)}`}</span>
        {item.customization && (
          <div className="customization-details">
            {item.customization.charms && item.customization.charms.length > 0 && (
              <div className="customization-item">
                <strong>🎯 Charms ({item.customization.charms.length}):</strong>
                <div className="charms-list">
                  {item.customization.charms.map((charm, idx) => (
                    <span key={idx} className="charm-badge">{charm.name}</span>
                  ))}
                </div>
              </div>
            )}
            {item.customization.color && (
              <div className="customization-item">
                <strong>🎨 Color:</strong> {item.customization.color}
              </div>
            )}
            {item.customization.size && (
              <div className="customization-item">
                <strong>📏 Size:</strong> {item.customization.size}
              </div>
            )}
            {item.customization.recipientName && (
              <div className="customization-item">
                <strong>👤 Recipient:</strong> {item.customization.recipientName}
              </div>
            )}
            {item.customization.contactNumber && (
              <div className="customization-item">
                <strong>📞 Contact:</strong> {item.customization.contactNumber}
              </div>
            )}
            {item.customization.deliveryLocation && (
              <div className="customization-item">
                <strong>📍 Delivery:</strong> {item.customization.deliveryLocation.substring(0, 40)}...
              </div>
            )}
            {item.customization.customerImage && (
              <div className="customization-item">
                <strong>🖼️ Custom Image:</strong> ✓ Uploaded
              </div>
            )}
            {item.customization.customMessage && (
              <div className="customization-item">
                <strong>💬 Message:</strong> "{item.customization.customMessage.substring(0, 30)}..."
              </div>
            )}
            {item.customization.giftWrapping && (
              <div className="customization-item gift-item">
                🎁 <strong>Gift Wrapped</strong> (+$5.00)
              </div>
            )}
            {item.customization.priceBreakdown && (
              <div className="price-breakdown">
                <small>
                  Base: ${item.customization.priceBreakdown.base.toFixed(2)}
                  {item.customization.priceBreakdown.charms > 0 && ` + Charms: $${item.customization.priceBreakdown.charms.toFixed(2)}`}
                  {item.customization.priceBreakdown.customImage > 0 && ` + Image: $${item.customization.priceBreakdown.customImage.toFixed(2)}`}
                  {item.customization.priceBreakdown.giftWrapping > 0 && ` + Gift: $${item.customization.priceBreakdown.giftWrapping.toFixed(2)}`}
                </small>
              </div>
            )}
          </div>
        )}
        <p onClick={() => deleteCartItems(item)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
