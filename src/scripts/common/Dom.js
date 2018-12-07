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
  toggleInlineCart: '[data-inline-cart="toggle"]',
  inlineCart: '[data-inline-cart]',
};
