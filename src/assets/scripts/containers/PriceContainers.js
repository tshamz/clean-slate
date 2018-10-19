import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

export const attachPrice = node => {
  const priceNodes = get(node, ['nodes', 'price']);
  const priceContainers = $(node).find(dom.priceContainer).get();

  priceContainers.forEach(container => {
    const price = $(container).find(dom.price)[0];
    const compareAtPrice = $(container).find(dom.compareAtPrice)[0];
    const linePrice = $(container).find(dom.linePrice)[0];
    const prices = {
      nodes: {
        price,
        compareAtPrice,
        linePrice,
      }
    };
    priceNodes.set(container, prices);
  });

  // return Promise.resolve(get(node));
  return Promise.resolve(node);
};

// export const attachPrices = containers => {
export const attachPrices = nodes => {
  // const nodes = containers.map(({ node }) => node);
  return Promise.all(
    nodes.map(node => attachPrice(node))
  );
};
