import dom from 'core/Dom';
import bva from 'core/Constants';

import { registerContainer } from 'core/Helpers';

import { getPrice } from 'containers/VariantContainers';

export const priceContainers = new Map();
window.pr = priceContainers;

export const registerPriceContainer = node => {
  const initialState = {
    productContainer: $(node).closest(dom.productContainer)[0],
    currentPrice: getPrice().current,
    lowest: getPrice().lowest,
    highest: getPrice().highest,
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
