import dom from 'core/Dom';
import bva from 'core/Constants';

import { set } from 'core/Helpers';

export const attachAddToCarts = node => {
  const addToCartControls = $(node).find(dom.addToCartControl).get();

  addToCartControls.forEach(control => {
    const addToCart = {
      nodes: {
        self: control,
      }
    };
    set(node, ['nodes', 'addToCart', control], addToCart);
  });

  return Promise.resolve(node);
};
