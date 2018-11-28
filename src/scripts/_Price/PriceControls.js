import dom from 'core/Dom';
import bva from 'core/Constants';

import { set } from 'core/Helpers';

export const attachPrices = node => {
  const priceControls = $(node).find(dom.priceControl).get();

  priceControls.forEach(container => {
    const price = $(container).find(dom.price)[0];
    const compareAtPrice = $(container).find(dom.compareAtPrice)[0];
    const linePrice = $(container).find(dom.linePrice)[0];
    const prices = {
      nodes: {
        self: container,
        price,
        compareAtPrice,
        linePrice,
      }
    };

    set(node, ['nodes', 'price', container], prices);
  });

  return Promise.resolve(node);
};
