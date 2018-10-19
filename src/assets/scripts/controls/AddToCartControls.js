import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

export const attachAddToCart = node => {
  const addToCartControls = $(node).find(dom.addToCartControl).get();
  const addToCartNodes = get(node, ['nodes', 'addToCart']);

  addToCartControls.forEach(control => {
    const addToCart = {
      nodes: {
        self: control,
      }
    };
    addToCartNodes.set(control, addToCart);
  });

  // return Promise.resolve(get(node));
  return Promise.resolve(node);
};

// export const attachAddToCarts = containers => {
export const attachAddToCarts = nodes => {
  // const nodes = containers.map(({ node }) => node);
  return Promise.all(
    nodes.map(node => attachAddToCart(node))
  );
};
