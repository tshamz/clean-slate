import { getCart } from '@shopify/theme-cart';

import dom from 'core/Dom';
import bva from 'core/Constants';

const getAddToCartData = () => {
  return [{
      quantity: 1,
      id: 13938597888111,
      properties: { 'Email Address': 'tyler@theshamboras.com' }
    }, {
      quantity: 1,
      id: 13938599493743,
      properties: { 'Email Address': 'tyler@bvaccel.com' }
    }]
};

export const bindUIActions = () => {
  $(dom.cartAdd).on('click', () => {
    const data = getAddToCartData();
    PubSub.publish(bva.addToCartRequest, data);
  });

  $(dom.cartGet).on('click', async () => {
    const cart = await getCart();
    console.log(cart);
  });

  $(dom.cartEmpty).on('click', async () => {
    const { items } = await getCart();
    const ids = items.map(item => item.id);
    PubSub.publish(bva.removeFromCartRequest, ids);
  });

  $(dom.cartToggle).on('click', async () => {
    const topic = ($(dom.inlineCart).is('.is-open'))
      ? bva.closeInlineCartStart
      : bva.openInlineCartStart;
    PubSub.publish(topic, []);
  });

  $(dom.inlineCart).on('transitionend', () => {
    const topic = ($(dom.inlineCart).is('.is-open'))
      ? bva.openInlineCartEnd
      : bva.closeInlineCartEnd;
    PubSub.publish(topic, []);
  })
};
