/*

  Declare and export all DOM strings here

  e.g.

  export default {
    inlineCart: '[data-inline-cart]',
    inlineCartContents: '[data-inline-cart-contents]',
  };

  Usage:

  import dom from 'common/Dom';
  import { getCartContents } from './handlers';

  $(dom.inlineCartContents).html(getCartContents());

*/

export default {
  overlay: '[data-overlay]',

  toggle: '[data-toggle]',

  openModal: '[data-open-modal]',
  closeModal: '[data-close-modal]',
  toggleModal: '[data-toggle-modal]',

  closeInlineCart: '[data-close-inline-cart]',
  toggleInlineCart: '[data-toggle-inline-cart]',
  inlineCart: '[data-inline-cart]',
  inlineCartContents: '[data-inline-cart-contents]',

  lineItemContainer: '[data-container="line-item"]',
  lineItemKey: '[data-line-item-key]',
  lineItemData: '[data-line-item-data]',

  productContainer: '[data-container="product"]',
  selectedOptionValue: '[data-selected-option-value]',
  optionValue: '[data-option-value]',
  optionData: '[data-option-data]',
  variantData: '[data-variant-data]',

  addToCart: '[data-add-to-cart]',
  removeFromCart: '[data-remove-from-cart]',

  quantityValue: '[data-quantity-value]',
  quantityChange: '[data-quantity-change]',

  isActive: '.is-active',
};
