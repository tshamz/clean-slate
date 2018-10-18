import dom from 'core/Dom';
import bva from 'core/Constants';

import { getCurrentQuantity } from 'controls/QuantitySelectControls'

export const bindUIActions = () => {
  $(dom.quantityChange).on('click', ({ currentTarget: self }) => {
    event.preventDefault();

    const node = $(self).closest(dom.quantitySelectControl)[0];
    const current = getCurrentQuantity(node);
    const change = parseInt(self.dataset.quantityControl, 10);
    const quantity = current + change;

    PubSub.publish(bva.quantityChange, { node, quantity });
  });
};
