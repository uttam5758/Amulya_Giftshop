import React, { useEffect, useMemo, useRef, useState } from "react";
import "./SimpleCustomization.css";
import { charmsData } from "../../data/charmsData";

const SimpleCustomization = ({ product, onCustomizationChange, customization }) => {
  const fileInputRef = useRef(null);

  const availableColors = useMemo(() => {
    if (product?.color) return product.color.split(",").map((c) => c.trim()).filter(Boolean);
    return ["Black", "White", "Gold", "Silver", "Rose Gold", "Red", "Blue", "Green"];
  }, [product]);

  const [selectedColor, setSelectedColor] = useState(customization?.color || "");
  const [customerName, setCustomerName] = useState(customization?.customerName || customization?.name || "");
  const [location, setLocation] = useState(customization?.location || "");
  const [customMessage, setCustomMessage] = useState(customization?.customMessage || customization?.shortMessage || "");
  const [selectedCharms, setSelectedCharms] = useState(customization?.charms || []);
  const [customerImage, setCustomerImage] = useState(customization?.customerImage || null);
  const [imagePreview, setImagePreview] = useState(customization?.imagePreview || null);

  useEffect(() => {
    const updatedCustomization = {
      // keep any existing keys in state object stable
      ...customization,
      color: selectedColor,
      customerName,
      location,
      customMessage,
      charms: selectedCharms,
      customerImage,
      imagePreview,

      // backward compatible fields
      name: customerName,
      shortMessage: customMessage,
    };
    onCustomizationChange(updatedCustomization);
    // Intentionally NOT depending on `customization` to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedColor,
    customerName,
    location,
    customMessage,
    selectedCharms,
    customerImage,
    imagePreview,
    onCustomizationChange,
  ]);

  const getColorValue = (colorName) => {
    const colorMap = {
      "Rose Gold": "#E8B4B8",
      Gold: "#D4AF37",
      Silver: "#C0C0C0",
      Black: "#111827",
      White: "#F9FAFB",
      Red: "#EF4444",
      Blue: "#3B82F6",
      Green: "#10B981",
    };
    return colorMap[colorName] || "#E5E7EB";
  };

  const toggleCharm = (charm) => {
    const exists = selectedCharms.some((c) => c.id === charm.id);
    if (exists) {
      setSelectedCharms(selectedCharms.filter((c) => c.id !== charm.id));
    } else {
      setSelectedCharms([...selectedCharms, charm]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = file.type === "image/jpeg" || file.type === "image/png";
    if (!isValidType) {
      alert("Please upload a JPG or PNG image");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setCustomerImage(file);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setCustomerImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="simple-customization customization-card">
      <div className="customization-header">
        <h3 className="customization-title">Product Customization</h3>
        <p className="customization-subtitle">Personalize your item before adding to cart.</p>
      </div>

      <div className="customization-section">
        <div className="customization-section-title">Color</div>
        <div className="color-swatch-row" role="radiogroup" aria-label="Color selection">
          {availableColors.map((color) => (
            <button
              key={color}
              type="button"
              className={`color-swatch ${selectedColor === color ? "selected" : ""}`}
              onClick={() => setSelectedColor(color)}
              aria-checked={selectedColor === color}
              role="radio"
              title={color}
            >
              <span
                className="color-dot"
                style={{ backgroundColor: getColorValue(color) }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="customization-section">
        <div className="form-grid compact">
          <div className="form-group">
            <label htmlFor="customer-name">Customer Name</label>
            <input
              id="customer-name"
              type="text"
              className="form-input"
              placeholder="Enter name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value.slice(0, 20))}
              maxLength={20}
              autoComplete="name"
            />
            <div className="field-hint">{customerName.length}/20</div>
          </div>

          <div className="form-group">
            <label htmlFor="customer-location">Location</label>
            <input
              id="customer-location"
              type="text"
              className="form-input"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoComplete="address-level2"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="custom-message">Custom Message</label>
            <textarea
              id="custom-message"
              className="form-textarea"
              placeholder="Max 60 characters"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value.slice(0, 60))}
              maxLength={60}
              rows={2}
            />
            <small className="char-count">{customMessage.length}/60</small>
          </div>
        </div>
      </div>

      <div className="customization-section">
        <div className="customization-section-title">Charms</div>
        <div className="charms-grid-compact" aria-label="Charms selection">
          {charmsData.numbered.slice(0, 48).map((charm) => {
            const selected = selectedCharms.some((c) => c.id === charm.id);
            return (
              <button
                key={charm.id}
                type="button"
                className={`charm-pill ${selected ? "selected" : ""}`}
                onClick={() => toggleCharm(charm)}
              >
                <span className="charm-pill-id">{charm.id}</span>
                <span className="charm-pill-name">{charm.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="customization-section">
        <div className="customization-section-title">Upload Image</div>
        {imagePreview ? (
          <div className="upload-preview-row">
            <img className="upload-preview-img" src={imagePreview} alt="Uploaded preview" />
            <button type="button" className="upload-remove-btn" onClick={removeImage}>
              Remove
            </button>
          </div>
        ) : (
          <div className="upload-row">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleImageUpload}
              className="upload-input"
            />
            <div className="upload-hint">JPG or PNG</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleCustomization;

