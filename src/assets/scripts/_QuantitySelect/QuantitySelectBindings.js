import dom from 'core/Dom';
import bva from 'core/Constants';

import { getCurrentQuantity } from 'handlers/QuantitySelectHandlers';

export const bindUIActions = () => {
  $(document).on('click', dom.quantityChange, ({ currentTarget: self }) => {
    event.preventDefault();

    const node = $(self).closest(dom.quantitySelectControl)[0];
    const current = getCurrentQuantity(node);
    const change = parseInt(self.dataset.quantityChange, 10);
    const quantity = current + change;

    PubSub.publish(bva.quantityChange, { node, quantity });
  });
};
