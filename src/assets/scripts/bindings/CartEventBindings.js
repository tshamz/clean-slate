import { getCart } from '@shopify/theme-cart';

import dom from 'core/Dom';
import BVA from 'core/Constants';

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
    PubSub.publish(BVA.addToCartRequest, data);
  });

  $(dom.cartGet).on('click', async () => {
    const cart = await getCart();
    console.log(cart);
  });

  $(dom.cartEmpty).on('click', async () => {
    const { items } = await getCart();
    const ids = items.map(item => item.id);
    PubSub.publish(BVA.removeFromCartRequest, ids);
  });

  $(dom.cartToggle).on('click', async () => {
    const topic = ($(dom.inlineCart).is('.is-open'))
      ? BVA.closeInlineCartStart
      : BVA.openInlineCartStart;
    PubSub.publish(topic, []);
  });

  $(dom.inlineCart).on('transitionend', () => {
    const topic = ($(dom.inlineCart).is('.is-open'))
      ? BVA.openInlineCartEnd
      : BVA.closeInlineCartEnd;
    PubSub.publish(topic, []);
  })
};
