import React, { useState, useRef } from "react";
import "./ProductCustomization.css";
import { charmsData, productCustomizationTypes } from "../../data/charmsData";

const ProductCustomization = ({ product, onCustomizationChange, customization }) => {
  const [activeTab, setActiveTab] = useState("charms");
  const [selectedCharms, setSelectedCharms] = useState(customization?.charms || []);
  const [selectedColor, setSelectedColor] = useState(customization?.color || "");
  const [selectedSize, setSelectedSize] = useState(customization?.size || "");
  const [customText, setCustomText] = useState(customization?.customText || "");
  const [customImage, setCustomImage] = useState(customization?.customImage || null);
  const [imagePreview, setImagePreview] = useState(customization?.imagePreview || null);
  const [selectedLayout, setSelectedLayout] = useState(customization?.layout || "");
  const [textFont, setTextFont] = useState(customization?.textFont || "standard");
  const [textSize, setTextSize] = useState(customization?.textSize || "medium");
  const [textColor, setTextColor] = useState(customization?.textColor || "#000000");
  const [giftWrapping, setGiftWrapping] = useState(customization?.giftWrapping || false);
  const [engravingText, setEngravingText] = useState(customization?.engravingText || "");
  const fileInputRef = useRef(null);

  const productType = product?.category || "";
  const customizationOptions = productCustomizationTypes[productType] || {
    supportsCharms: true,
    supportsEngraving: true,
    supportsColor: true,
    supportsImage: true,
    supportsText: true,
    supportsLayout: true,
  };

  // Available colors based on product
  const availableColors = product?.color 
    ? product.color.split(",").map(c => c.trim())
    : ["Gold", "Silver", "Rose Gold", "Black", "White", "Red", "Blue", "Green"];

  // Available sizes
  const availableSizes = product?.size
    ? product.size.split(",").map(s => s.trim())
    : ["Small", "Medium", "Large"];

  // Update customization when any option changes
  React.useEffect(() => {
    const updatedCustomization = {
      charms: selectedCharms,
      color: selectedColor,
      size: selectedSize,
      customText,
      customImage,
      imagePreview,
      layout: selectedLayout,
      textFont,
      textSize,
      textColor,
      giftWrapping,
      engravingText,
    };
    onCustomizationChange(updatedCustomization);
  }, [
    selectedCharms,
    selectedColor,
    selectedSize,
    customText,
    customImage,
    imagePreview,
    selectedLayout,
    textFont,
    textSize,
    textColor,
    giftWrapping,
    engravingText,
    onCustomizationChange,
  ]);

  const handleCharmSelect = (charm) => {
    const maxCharms = customizationOptions.maxCharms || 5;
    if (selectedCharms.length >= maxCharms && !selectedCharms.find(c => c.id === charm.id)) {
      alert(`Maximum ${maxCharms} charms allowed`);
      return;
    }
    
    const isSelected = selectedCharms.find(c => c.id === charm.id);
    if (isSelected) {
      setSelectedCharms(selectedCharms.filter(c => c.id !== charm.id));
    } else {
      setSelectedCharms([...selectedCharms, charm]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setCustomImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCustomImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getCharmCategory = (category) => {
    if (category === "numbered") return charmsData.numbered;
    if (category === "zodiac") return charmsData.zodiac;
    if (category === "mrs") return charmsData.mrs;
    if (category === "team") return charmsData.team;
    return [];
  };

  return (
    <div className="product-customization">
      <div className="customization-header">
        <h3>✨ Customize Your Product</h3>
        <p>Make it unique and personal!</p>
      </div>

      {/* Tabs */}
      <div className="customization-tabs">
        {customizationOptions.supportsCharms && (
          <button
            className={activeTab === "charms" ? "active" : ""}
            onClick={() => setActiveTab("charms")}
          >
            🎯 Charms
          </button>
        )}
        {customizationOptions.supportsColor && (
          <button
            className={activeTab === "color" ? "active" : ""}
            onClick={() => setActiveTab("color")}
          >
            🎨 Color
          </button>
        )}
        {customizationOptions.supportsSize && (
          <button
            className={activeTab === "size" ? "active" : ""}
            onClick={() => setActiveTab("size")}
          >
            📏 Size
          </button>
        )}
        {customizationOptions.supportsText && (
          <button
            className={activeTab === "text" ? "active" : ""}
            onClick={() => setActiveTab("text")}
          >
            ✍️ Text
          </button>
        )}
        {customizationOptions.supportsEngraving && (
          <button
            className={activeTab === "engraving" ? "active" : ""}
            onClick={() => setActiveTab("engraving")}
          >
            🔤 Engraving
          </button>
        )}
        {customizationOptions.supportsImage && (
          <button
            className={activeTab === "image" ? "active" : ""}
            onClick={() => setActiveTab("image")}
          >
            🖼️ Image
          </button>
        )}
        {customizationOptions.supportsLayout && (
          <button
            className={activeTab === "layout" ? "active" : ""}
            onClick={() => setActiveTab("layout")}
          >
            📐 Layout
          </button>
        )}
        <button
          className={activeTab === "gift" ? "active" : ""}
          onClick={() => setActiveTab("gift")}
        >
          🎁 Gift Options
        </button>
      </div>

      {/* Tab Content */}
      <div className="customization-content">
        {/* Charms Tab */}
        {activeTab === "charms" && customizationOptions.supportsCharms && (
          <div className="tab-panel">
            <div className="selected-charms-preview">
              <h4>Selected Charms ({selectedCharms.length}/{customizationOptions.maxCharms || 5})</h4>
              <div className="selected-charms-list">
                {selectedCharms.map((charm, index) => (
                  <div key={index} className="selected-charm-item">
                    <span>{charm.name}</span>
                    <button onClick={() => handleCharmSelect(charm)}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="charms-categories">
              <div className="charm-category">
                <h4>Numbered Charms (1-100)</h4>
                <div className="charms-grid">
                  {charmsData.numbered.map((charm) => (
                    <button
                      key={charm.id}
                      className={`charm-item ${selectedCharms.find(c => c.id === charm.id) ? "selected" : ""}`}
                      onClick={() => handleCharmSelect(charm)}
                    >
                      <span className="charm-number">{charm.id}</span>
                      <span className="charm-name">{charm.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="charm-category">
                <h4>Zodiac Signs</h4>
                <div className="charms-grid zodiac-grid">
                  {charmsData.zodiac.map((charm) => (
                    <button
                      key={charm.id}
                      className={`charm-item zodiac ${selectedCharms.find(c => c.id === charm.id) ? "selected" : ""}`}
                      onClick={() => handleCharmSelect(charm)}
                    >
                      <span className="zodiac-symbol">{charm.symbol}</span>
                      <span className="charm-name">{charm.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="charm-category">
                <h4>MRS Charms</h4>
                <div className="charms-grid">
                  {charmsData.mrs.map((charm) => (
                    <button
                      key={charm.id}
                      className={`charm-item ${selectedCharms.find(c => c.id === charm.id) ? "selected" : ""}`}
                      onClick={() => handleCharmSelect(charm)}
                    >
                      <span className="charm-name">{charm.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="charm-category">
                <h4>Team Emblems</h4>
                <div className="charms-grid">
                  {charmsData.team.map((charm) => (
                    <button
                      key={charm.id}
                      className={`charm-item ${selectedCharms.find(c => c.id === charm.id) ? "selected" : ""}`}
                      onClick={() => handleCharmSelect(charm)}
                    >
                      <span className="charm-name">{charm.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Color Tab */}
        {activeTab === "color" && customizationOptions.supportsColor && (
          <div className="tab-panel">
            <h4>Choose Color</h4>
            <div className="color-options">
              {availableColors.map((color) => (
                <button
                  key={color}
                  className={`color-option ${selectedColor === color ? "selected" : ""}`}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    backgroundColor: color.toLowerCase() === "gold" ? "#FFD700" :
                                    color.toLowerCase() === "silver" ? "#C0C0C0" :
                                    color.toLowerCase() === "rose gold" ? "#E8B4B8" :
                                    color.toLowerCase() === "black" ? "#000" :
                                    color.toLowerCase() === "white" ? "#FFF" :
                                    color.toLowerCase() === "red" ? "#FF0000" :
                                    color.toLowerCase() === "blue" ? "#0000FF" :
                                    color.toLowerCase() === "green" ? "#008000" : "#DDD",
                    border: selectedColor === color ? "3px solid #3BB77E" : "2px solid #ddd",
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Tab */}
        {activeTab === "size" && customizationOptions.supportsSize && (
          <div className="tab-panel">
            <h4>Choose Size</h4>
            <div className="size-options">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Tab */}
        {activeTab === "text" && customizationOptions.supportsText && (
          <div className="tab-panel">
            <h4>Custom Text</h4>
            <textarea
              placeholder={`Enter your custom text (max ${customizationOptions.maxTextLength || 50} characters)`}
              value={customText}
              onChange={(e) => {
                const maxLength = customizationOptions.maxTextLength || 50;
                if (e.target.value.length <= maxLength) {
                  setCustomText(e.target.value);
                }
              }}
              maxLength={customizationOptions.maxTextLength || 50}
              rows={4}
            />
            <div className="text-options">
              <div className="text-option-group">
                <label>Font Style:</label>
                <select value={textFont} onChange={(e) => setTextFont(e.target.value)}>
                  <option value="standard">Standard</option>
                  <option value="script">Script</option>
                  <option value="bold">Bold</option>
                  <option value="italic">Italic</option>
                  <option value="decorative">Decorative</option>
                </select>
              </div>
              <div className="text-option-group">
                <label>Text Size:</label>
                <select value={textSize} onChange={(e) => setTextSize(e.target.value)}>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">Extra Large</option>
                </select>
              </div>
              <div className="text-option-group">
                <label>Text Color:</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </div>
            </div>
            <div className="text-preview">
              <p style={{
                fontFamily: textFont === "script" ? "cursive" : textFont === "bold" ? "bold" : "inherit",
                fontSize: textSize === "small" ? "12px" : textSize === "medium" ? "16px" : textSize === "large" ? "20px" : "24px",
                color: textColor,
                fontStyle: textFont === "italic" ? "italic" : "normal",
              }}>
                {customText || "Preview your text here"}
              </p>
            </div>
            <small className="char-count">{customText.length}/{customizationOptions.maxTextLength || 50} characters</small>
          </div>
        )}

        {/* Engraving Tab */}
        {activeTab === "engraving" && customizationOptions.supportsEngraving && (
          <div className="tab-panel">
            <h4>Engraving Text</h4>
            <p className="info-text">Enter text to be engraved on your product</p>
            <textarea
              placeholder="Enter engraving text (max 30 characters)"
              value={engravingText}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setEngravingText(e.target.value);
                }
              }}
              maxLength={30}
              rows={3}
            />
            <div className="engraving-preview">
              <h5>Engraving Preview:</h5>
              <div className="engraving-preview-box">
                {engravingText || "Your engraving text will appear here"}
              </div>
            </div>
            <small className="char-count">{engravingText.length}/30 characters</small>
          </div>
        )}

        {/* Image Tab */}
        {activeTab === "image" && customizationOptions.supportsImage && (
          <div className="tab-panel">
            <h4>Upload Custom Image</h4>
            <p className="info-text">Upload your own image (Max 5MB, JPG/PNG)</p>
            {imagePreview ? (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Custom preview" />
                <button className="remove-image-btn" onClick={removeImage}>
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="image-upload-area" onClick={() => fileInputRef.current?.click()}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <div className="upload-icon">📷</div>
                <p>Click to upload image</p>
                <small>JPG, PNG up to 5MB</small>
              </div>
            )}
          </div>
        )}

        {/* Layout Tab */}
        {activeTab === "layout" && customizationOptions.supportsLayout && (
          <div className="tab-panel">
            <h4>Choose Layout</h4>
            <div className="layout-options">
              {customizationOptions.layouts?.map((layout) => (
                <button
                  key={layout}
                  className={`layout-option ${selectedLayout === layout ? "selected" : ""}`}
                  onClick={() => setSelectedLayout(layout)}
                >
                  <div className={`layout-preview ${layout}`}></div>
                  <span>{layout.charAt(0).toUpperCase() + layout.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gift Options Tab */}
        {activeTab === "gift" && (
          <div className="tab-panel">
            <h4>Gift Options</h4>
            <div className="gift-option">
              <label className="gift-checkbox">
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                />
                <span>Add Gift Wrapping (+$5.00)</span>
              </label>
              <p className="gift-description">
                Your product will be beautifully wrapped in premium gift paper with a ribbon.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Customization Summary */}
      <div className="customization-summary">
        <h4>Your Customization Summary</h4>
        <div className="summary-items">
          {selectedCharms.length > 0 && (
            <div className="summary-item">
              <strong>Charms:</strong> {selectedCharms.length} selected
            </div>
          )}
          {selectedColor && (
            <div className="summary-item">
              <strong>Color:</strong> {selectedColor}
            </div>
          )}
          {selectedSize && (
            <div className="summary-item">
              <strong>Size:</strong> {selectedSize}
            </div>
          )}
          {customText && (
            <div className="summary-item">
              <strong>Text:</strong> {customText.substring(0, 20)}...
            </div>
          )}
          {engravingText && (
            <div className="summary-item">
              <strong>Engraving:</strong> {engravingText}
            </div>
          )}
          {imagePreview && (
            <div className="summary-item">
              <strong>Custom Image:</strong> ✓ Uploaded
            </div>
          )}
          {selectedLayout && (
            <div className="summary-item">
              <strong>Layout:</strong> {selectedLayout}
            </div>
          )}
          {giftWrapping && (
            <div className="summary-item">
              <strong>Gift Wrapping:</strong> ✓ Added (+$5.00)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCustomization;

