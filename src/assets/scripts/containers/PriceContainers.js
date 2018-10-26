import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, set } from 'core/Helpers';

export const attachPrice = node => {
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

    set(node, ['nodes', 'price'], {key: container, value: prices})
  });

  return Promise.resolve(node);
};

export const attachPrices = nodes => {
  return Promise.all(
    nodes.map(node => attachPrice(node))
  );
};
