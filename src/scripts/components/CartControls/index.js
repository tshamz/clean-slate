import { getState } from '@shopify/theme-cart';

import { bindActions } from './bindings';
import { initSubscribers } from './subscribers';

const cacheCart = () => {
  getState()
    .then(cart => window.bvaccel.cart = cart);
};

export default {
  initSubscribers,
  bindActions,
  cacheCart,
};
