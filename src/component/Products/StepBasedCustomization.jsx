import React, { useState, useEffect } from "react";
import "./StepBasedCustomization.css";
import { charmsData, productCustomizationTypes } from "../../data/charmsData";

const StepBasedCustomization = ({ product, onCustomizationChange, customization }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCharms, setSelectedCharms] = useState(customization?.charms || []);
  const [selectedColor, setSelectedColor] = useState(customization?.color || "");
  const [selectedSize, setSelectedSize] = useState(customization?.size || "");
  const [recipientName, setRecipientName] = useState(customization?.recipientName || "");
  const [personalMessage, setPersonalMessage] = useState(customization?.personalMessage || "");
  const [selectedTheme, setSelectedTheme] = useState(customization?.theme || "");
  const [customImage, setCustomImage] = useState(customization?.customImage || null);
  const [imagePreview, setImagePreview] = useState(customization?.imagePreview || null);
  const [selectedLayout, setSelectedLayout] = useState(customization?.layout || "");
  const [textFont, setTextFont] = useState(customization?.textFont || "standard");
  const [textSize, setTextSize] = useState(customization?.textSize || "medium");
  const [textColor, setTextColor] = useState(customization?.textColor || "#6B7280");
  const [giftWrapping, setGiftWrapping] = useState(customization?.giftWrapping || false);
  const [engravingText, setEngravingText] = useState(customization?.engravingText || "");

  const productType = product?.category || "";
  const customizationOptions = productCustomizationTypes[productType] || {
    supportsCharms: true,
    supportsEngraving: true,
    supportsColor: true,
    supportsImage: true,
    supportsText: true,
    supportsLayout: true,
  };

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Update customization when any option changes
  useEffect(() => {
    const updatedCustomization = {
      charms: selectedCharms,
      color: selectedColor,
      size: selectedSize,
      recipientName,
      personalMessage,
      theme: selectedTheme,
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
    recipientName,
    personalMessage,
    selectedTheme,
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

  const availableColors = product?.color
    ? product.color.split(",").map(c => c.trim())
    : ["Rose Gold", "Gold", "Silver", "Pink", "Lavender", "Mint", "Peach", "Sky Blue"];

  const availableSizes = product?.size
    ? product.size.split(",").map(s => s.trim())
    : ["Small", "Medium", "Large"];

  const themes = [
    { id: "romantic", name: "Romantic", icon: "💕", color: "#FCE7F3" },
    { id: "elegant", name: "Elegant", icon: "✨", color: "#F3E8FF" },
    { id: "playful", name: "Playful", icon: "🎉", color: "#FEF3C7" },
    { id: "minimalist", name: "Minimalist", icon: "🌿", color: "#D1FAE5" },
    { id: "vintage", name: "Vintage", icon: "📿", color: "#FED7AA" },
    { id: "modern", name: "Modern", icon: "🌟", color: "#DBEAFE" },
  ];

  const handleCharmSelect = (charm) => {
    const maxCharms = customizationOptions.maxCharms || 5;
    if (selectedCharms.length >= maxCharms && !selectedCharms.find(c => c.id === charm.id)) {
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
    if (file && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setCustomImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="step-customization">
      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-steps">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`progress-step ${step <= currentStep ? "active" : ""} ${step === currentStep ? "current" : ""}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && "Choose Gift"}
                {step === 2 && "Personalize"}
                {step === 3 && "Theme"}
                {step === 4 && "Final Touch"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Choose Gift */}
      {currentStep === 1 && (
        <div className="step-content animate-slide-in">
          <div className="step-header">
            <h2>🎁 Choose Your Perfect Gift</h2>
            <p className="step-subtitle">Let's start by selecting the basics</p>
          </div>

          <div className="step-body">
            {customizationOptions.supportsColor && (
              <div className="option-group">
                <label className="option-label">Choose Color</label>
                <div className="color-grid">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      className={`color-card ${selectedColor === color ? "selected" : ""}`}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: getColorValue(color),
                      }}
                    >
                      <span>{color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {customizationOptions.supportsSize && (
              <div className="option-group">
                <label className="option-label">Select Size</label>
                <div className="size-grid">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`size-card ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {customizationOptions.supportsCharms && (
              <div className="option-group">
                <label className="option-label">
                  Add Charms ({selectedCharms.length}/{customizationOptions.maxCharms || 5})
                </label>
                <div className="charms-preview">
                  {selectedCharms.map((charm, idx) => (
                    <div key={idx} className="charm-preview-item">
                      <span>{charm.name}</span>
                      <button onClick={() => handleCharmSelect(charm)}>×</button>
                    </div>
                  ))}
                </div>
                <div className="charms-grid-compact">
                  {charmsData.numbered.slice(0, 20).map((charm) => (
                    <button
                      key={charm.id}
                      className={`charm-mini ${selectedCharms.find(c => c.id === charm.id) ? "selected" : ""}`}
                      onClick={() => handleCharmSelect(charm)}
                    >
                      {charm.id}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Personalize */}
      {currentStep === 2 && (
        <div className="step-content animate-slide-in">
          <div className="step-header">
            <h2>💝 Personalize with Love</h2>
            <p className="step-subtitle">Make it uniquely theirs</p>
          </div>

          <div className="step-body">
            <div className="option-group">
              <label className="option-label">Recipient's Name</label>
              <input
                type="text"
                className="premium-input"
                placeholder="Enter their name..."
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                maxLength={30}
              />
              <div className="live-preview">
                <div className="preview-card">
                  <div className="preview-content">
                    <h3>Preview</h3>
                    <p className="preview-name">{recipientName || "Their Name"}</p>
                    <p className="preview-message">{personalMessage || "Your message will appear here..."}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="option-group">
              <label className="option-label">Personal Message</label>
              <textarea
                className="premium-textarea"
                placeholder="Write a heartfelt message..."
                value={personalMessage}
                onChange={(e) => {
                  const maxLength = customizationOptions.maxTextLength || 100;
                  if (e.target.value.length <= maxLength) {
                    setPersonalMessage(e.target.value);
                  }
                }}
                maxLength={customizationOptions.maxTextLength || 100}
                rows={4}
              />
              <small className="char-count">{personalMessage.length}/{customizationOptions.maxTextLength || 100}</small>
            </div>

            {customizationOptions.supportsEngraving && (
              <div className="option-group">
                <label className="option-label">Engraving Text</label>
                <input
                  type="text"
                  className="premium-input"
                  placeholder="Text to engrave..."
                  value={engravingText}
                  onChange={(e) => {
                    if (e.target.value.length <= 30) {
                      setEngravingText(e.target.value);
                    }
                  }}
                  maxLength={30}
                />
                <div className="engraving-preview-box">
                  {engravingText || "Engraving preview"}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Theme */}
      {currentStep === 3 && (
        <div className="step-content animate-slide-in">
          <div className="step-header">
            <h2>🎨 Choose Your Theme</h2>
            <p className="step-subtitle">Set the perfect mood</p>
          </div>

          <div className="step-body">
            <div className="option-group">
              <label className="option-label">Gift Theme</label>
              <div className="theme-grid">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    className={`theme-card ${selectedTheme === theme.id ? "selected" : ""}`}
                    onClick={() => setSelectedTheme(theme.id)}
                    style={{ backgroundColor: theme.color }}
                  >
                    <span className="theme-icon">{theme.icon}</span>
                    <span className="theme-name">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {customizationOptions.supportsImage && (
              <div className="option-group">
                <label className="option-label">Upload Custom Image</label>
                {imagePreview ? (
                  <div className="image-preview-wrapper">
                    <img src={imagePreview} alt="Preview" />
                    <button className="remove-image" onClick={() => {
                      setCustomImage(null);
                      setImagePreview(null);
                    }}>Remove</button>
                  </div>
                ) : (
                  <div className="image-upload-area" onClick={() => document.getElementById('image-upload').click()}>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                    <div className="upload-icon">📷</div>
                    <p>Click to upload</p>
                    <small>JPG, PNG up to 5MB</small>
                  </div>
                )}
              </div>
            )}

            {customizationOptions.supportsLayout && (
              <div className="option-group">
                <label className="option-label">Layout Style</label>
                <div className="layout-grid">
                  {customizationOptions.layouts?.map((layout) => (
                    <button
                      key={layout}
                      className={`layout-card ${selectedLayout === layout ? "selected" : ""}`}
                      onClick={() => setSelectedLayout(layout)}
                    >
                      <div className={`layout-preview ${layout}`}></div>
                      <span>{layout.charAt(0).toUpperCase() + layout.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="option-group">
              <label className="option-label">Text Styling</label>
              <div className="text-styling-grid">
                <div className="style-option">
                  <label>Font</label>
                  <select className="premium-select" value={textFont} onChange={(e) => setTextFont(e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="script">Script</option>
                    <option value="bold">Bold</option>
                    <option value="decorative">Decorative</option>
                  </select>
                </div>
                <div className="style-option">
                  <label>Size</label>
                  <select className="premium-select" value={textSize} onChange={(e) => setTextSize(e.target.value)}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div className="style-option">
                  <label>Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="color-picker"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Final Touch */}
      {currentStep === 4 && (
        <div className="step-content animate-slide-in">
          <div className="step-header">
            <h2>✨ Final Touches</h2>
            <p className="step-subtitle">Add the finishing touches</p>
          </div>

          <div className="step-body">
            <div className="option-group">
              <label className="gift-wrapping-label">
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                />
                <div className="gift-wrapping-card">
                  <span className="gift-icon">🎁</span>
                  <div>
                    <strong>Premium Gift Wrapping</strong>
                    <p>Beautifully wrapped with love (+$5.00)</p>
                  </div>
                </div>
              </label>
            </div>

            <div className="customization-summary-final">
              <h3>Your Customization Summary</h3>
              <div className="summary-grid">
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
                {selectedCharms.length > 0 && (
                  <div className="summary-item">
                    <strong>Charms:</strong> {selectedCharms.length} selected
                  </div>
                )}
                {recipientName && (
                  <div className="summary-item">
                    <strong>Name:</strong> {recipientName}
                  </div>
                )}
                {personalMessage && (
                  <div className="summary-item">
                    <strong>Message:</strong> {personalMessage.substring(0, 30)}...
                  </div>
                )}
                {selectedTheme && (
                  <div className="summary-item">
                    <strong>Theme:</strong> {themes.find(t => t.id === selectedTheme)?.name}
                  </div>
                )}
                {giftWrapping && (
                  <div className="summary-item highlight">
                    <strong>🎁 Gift Wrapped</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="step-navigation">
        {currentStep > 1 && (
          <button className="nav-btn prev-btn" onClick={prevStep}>
            ← Previous
          </button>
        )}
        {currentStep < totalSteps ? (
          <button className="nav-btn next-btn" onClick={nextStep}>
            Next Step →
          </button>
        ) : (
          <button className="nav-btn complete-btn" onClick={() => {
            // Customization is already updated via useEffect
            alert("Customization complete! Add to cart to continue.");
          }}>
            ✓ Complete
          </button>
        )}
      </div>
    </div>
  );
};

// Helper function to get color values
const getColorValue = (colorName) => {
  const colorMap = {
    "Rose Gold": "#E8B4B8",
    "Gold": "#FFD700",
    "Silver": "#C0C0C0",
    "Pink": "#FFB6C1",
    "Lavender": "#E6E6FA",
    "Mint": "#98FB98",
    "Peach": "#FFDAB9",
    "Sky Blue": "#87CEEB",
  };
  return colorMap[colorName] || "#F3F4F6";
};

export default StepBasedCustomization;

