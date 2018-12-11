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

  lineItem: '[data-line-item]',
  lineItemKey: '[data-line-item-key]',
  lineItemData: '[data-line-item-data]',

  optionValue: '[data-option-value]',
  optionData: '[data-option-data]',

  variantData: '[data-variant-data]',

  productContainer: '[data-product-container]',

  addToCart: '[data-add-to-cart]',
  removeFromCart: '[data-remove-from-cart]',



  isActive: '.is-active',
};
