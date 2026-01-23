import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/CartConstants";
import axios from "axios";

// Add to Cart ---Product
export const addItemsToCart = (id, quantity, customization = {}) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v2/product/${id}`);

  // Calculate price with gift wrapping and charms
  const basePrice = parseFloat(data.product.price);
  const giftWrappingPrice = customization.giftWrapping ? 5.00 : 0;
  const charmsPrice = (customization.charms?.length || 0) * 2.00; // $2 per charm
  const customImagePrice = customization.imagePreview ? 5.00 : 0; // $5 for custom image
  const finalPrice = basePrice + giftWrappingPrice + charmsPrice + customImagePrice;

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: finalPrice,
      originalPrice: basePrice,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
      customization: {
        charms: customization.charms || [],
        color: customization.color || "",
        size: customization.size || "",
        customerImage: customization.imagePreview || null,
        deliveryLocation: customization.deliveryLocation || "",
        contactNumber: customization.contactNumber || "",
        recipientName: customization.recipientName || "",
        customMessage: customization.customMessage || "",
        giftWrapping: customization.giftWrapping || false,
        // Price breakdown
        priceBreakdown: {
          base: basePrice,
          giftWrapping: giftWrappingPrice,
          charms: charmsPrice,
          customImage: customImagePrice,
        },
      },
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART ---Product
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
