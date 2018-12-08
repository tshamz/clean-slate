import { getState } from '@shopify/theme-cart';

import { bindActions } from './bindings';
import { initSubscribers } from './subscribers';

const cacheCart = async () => {
  const cart = await getState();
  window.bvaccel.cart = cart;
};

export default {
  initSubscribers,
  bindActions,
  cacheCart,
};
