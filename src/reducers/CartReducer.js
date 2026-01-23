import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      // Create a unique key for items with customization
      const itemKey = item.product + JSON.stringify(item.customization || {});
      
      const isItemExist = state.cartItems.find(
        (i) => {
          const existingKey = i.product + JSON.stringify(i.customization || {});
          return existingKey === itemKey;
        }
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) => {
            const existingKey = i.product + JSON.stringify(i.customization || {});
            return existingKey === itemKey ? item : i;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      // If payload is a string (product ID), remove all items with that product
      // If payload is an object, remove the specific item matching product + customization
      if (typeof action.payload === 'string') {
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => {
            const itemKey = i.product + JSON.stringify(i.customization || {});
            const payloadKey = action.payload + JSON.stringify({});
            return itemKey !== payloadKey;
          }),
        };
      } else {
        const payloadKey = action.payload.product + JSON.stringify(action.payload.customization || {});
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => {
            const itemKey = i.product + JSON.stringify(i.customization || {});
            return itemKey !== payloadKey;
          }),
        };
      }

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
