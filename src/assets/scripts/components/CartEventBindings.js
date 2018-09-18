import { getCart } from '@shopify/theme-cart';

import BVA from 'scripts/global/Constants';

const dom = {
  inlineCart: '[data-inline-cart]',
  addToCart: '[data-add-to-cart]',
  getCart: '[data-get-cart]',
  emptyCart: '[data-empty-cart]',
  toggleCart: '[data-toggle-inline-cart]',
};

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
  $(dom.addToCart).on('click', () => {
    const data = getAddToCartData();
    PubSub.publish(BVA.addToCartRequest, data);
  });

  $(dom.getCart).on('click', async () => {
    const cart = await getCart();
    console.log(cart);
  });

  $(dom.emptyCart).on('click', async () => {
    const { items } = await getCart();
    const ids = items.map(item => item.id);
    PubSub.publish(BVA.removeFromCartRequest, ids);
  });

  $(dom.toggleCart).on('click', async () => {
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
