import {
  getState,
  clearItems } from '@shopify/theme-cart';

const getAddToCartData = () => {
  return {
    quantity: 1,
    id: 15291755167855,
    properties: { 'Email Address': 'tyler@theshamboras.com' }
  };
};

import dom from 'core/Dom';
import bva from 'core/Constants';

export const bindUIActions = () => {
  $(dom.addToCartControl).on('click', ({ currentTarget: node }) => {
    event.preventDefault();

    const { id } = getSelectedVariant(node);
    const backInStock = false;

    if (backInStock) {
      PubSub.publish(bva.backInStockRequest, { node, id });
    } else {
      PubSub.publish(bva.addToCartRequest, { node, id });
    }
  });


  $(dom.cartAdd).on('click', () => {
    const { id, quantity, properties } = getAddToCartData();
    PubSub.publish(bva.addToCartRequest, { id, quantity, properties });
  });

  $(dom.cartGet).on('click', async () => {
    const cart = await getState();
    console.log(cart);
  });

  $(dom.cartRemove).on('click', async () => {
    const { items } = await getState();
    if (items.length > 0) {
      const { key } = items[0];
      PubSub.publish(bva.removeFromCartRequest, { key });
    }
  });

  $(dom.cartEmpty).on('click', () => {
    return clearItems();
  });

  $(dom.cartToggle).on('click', () => {
    if (!$(dom.inlineCart).is('.is-open')) {
      PubSub.publish(bva.openInlineCart, {});
    } else {
      PubSub.publish(bva.closeInlineCart, {});
    }
  });
};
