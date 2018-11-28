import { getState, clearItems } from '@shopify/theme-cart';

import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

import { getAddToCartDetails } from 'handlers/ProductContainerHandlers';

export const bindUIActions = () => {

  $(dom.addToCartControl).on('click', ({ currentTarget: node }) => {
    event.preventDefault();
    const backInStock = false;
    const { id, quantity } = getAddToCartDetails(node);

    if (backInStock) {
      PubSub.publish(bva.backInStockRequest, { node, id, quantity });
    } else {
      PubSub.publish(bva.addToCartRequest, { node, id, quantity });
    }
  });

  $(dom.inlineCart).on('click', dom.cartRemoveItem, ({ currentTarget: node }) => {
    event.preventDefault();
    const { key } = get(node, ['store', 'lineItem']);

    PubSub.publish(bva.removeFromCartRequest, { node, key });
  });








  $(dom.cartAdd).on('click', () => {
    const { id, quantity, properties } = {
      quantity: 1,
      id: 15291755167855,
      properties: { 'Email Address': 'tyler@theshamboras.com' }
    };
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
