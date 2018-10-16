// Events
export const addToCartRequest = 'ADD_TO_CART_REQUEST';
export const addToCartSuccess = 'ADD_TO_CART_SUCCESS';
export const addToCartError = 'ADD_TO_CART_ERROR';

export const removeFromCartRequest = 'REMOVE_FROM_CART_REQUEST';
export const removeFromCartSuccess = 'REMOVE_FROM_CART_SUCCESS';
export const removeFromCartError = 'REMOVE_FROM_CART_ERROR';

export const updateCartRequest = 'UPDATE_CART_REQUEST';
export const updateCartSuccess = 'UPDATE_CART_SUCCESS';
export const updateCartError = 'UPDATE_CART_ERROR';

export const openInlineCartStart = 'OPEN_INLINE_CART_START';
export const openInlineCartEnd = 'OPEN_INLINE_CART_END';

export const closeInlineCartStart = 'CLOSE_INLINE_CART_START';
export const closeInlineCartEnd = 'CLOSE_INLINE_CART_END';

export const optionValueChange = 'OPTION_VALUE_CHANGE';

export const quantityChange = 'QUANTITY_CHANGE';


// Containers
export const handle = 'HANDLE';
export const product = 'PRODUCT';
export const slider = 'SLIDER';
export const optionGroup = 'OPTION_GROUP';
export const option = 'OPTION';
export const options = 'OPTIONS';
export const variant = 'VARIANT';
export const variants = 'variants';
export const selectedVariant = 'SELECTED_VARIANT';
export const quantitySelect = 'QUANTITY_SELECT';
export const price = 'PRICE';
export const addToCart = 'ADD_TO_CART';
export const inventory = 'INVENTORY';

export default {
  addToCartRequest,
  addToCartSuccess,
  addToCartError,

  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartError,

  updateCartRequest,
  updateCartSuccess,
  updateCartError,

  openInlineCartStart,
  openInlineCartEnd,

  closeInlineCartStart,
  closeInlineCartEnd,

  optionValueChange,

  quantityChange,

  handle,

  product,

  variant,
  variants,
  selectedVariant,

  optionGroup,
  option,
  options,

  quantitySelect,

  price,

  addToCart,

  slider,
};
