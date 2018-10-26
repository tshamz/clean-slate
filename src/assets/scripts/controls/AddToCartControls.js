import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, set } from 'core/Helpers';

export const attachAddToCart = node => {
  const addToCartControls = $(node).find(dom.addToCartControl).get();

  addToCartControls.forEach(control => {
    const addToCart = {
      nodes: {
        self: control,
      }
    };
    set(node, ['nodes', 'addToCart'], {key: control, value: addToCart});
  });

  return Promise.resolve(node);
};

export const attachAddToCarts = nodes => {
  return Promise.all(
    nodes.map(node => attachAddToCart(node))
  );
};
