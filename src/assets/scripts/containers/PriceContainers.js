import dom from 'core/Dom';
import bva from 'core/Constants';

import { registerContainer } from 'core/Helpers';

export const priceContainers = new Map();
window.pr = priceContainers;

export const registerPriceContainer = node => {
  const initialState = {
    productContainer: $(node).closest(dom.productContainer)[0],
    price: $(node).find('[data-price="price"]').get(),
    compareAtPrice: $(node).find('[data-price="compare-at-price"]').get(),
    linePrice: $(node).find('[data-price="line-price"]').get(),
  };

  return Promise.resolve(
    registerContainer(node, bva.price, initialState)
  );
};

export const initPriceContainers = async () => {
  return Promise.all(
    $(dom.priceContainer).get().map(node => registerPriceContainer(node))
  );
};
