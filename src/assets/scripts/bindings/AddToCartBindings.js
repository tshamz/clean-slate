import dom from 'core/Dom';
import bva from 'core/Constants';

import { getCurrentQuantity } from 'containers/QuantitySelectContainers';

import { getSelectedVariant } from 'handlers/VariantHandlers';

export const bindUIActions = () => {
  $(dom.addToCartContainer).on('click', ({ currentTarget: node }) => {
    event.preventDefault();

    const { id } = getSelectedVariant(node);

    const backInStock = false;
    if (backInStock) {
      PubSub.publish(bva.backInStockRequest, { node, id });
    } else {
      PubSub.publish(bva.addToCartRequest, { node, id });
    }
  });
};
