import dom from 'core/Dom';
import bva from 'core/Constants';

import { getCurrentQuantity } from 'containers/QuantitySelectContainers'

export const bindUIActions = () => {
  $(dom.quantityControl).on('click', ({ currentTarget: self }) => {
    event.preventDefault();

    const node = $(self).closest(dom.quantitySelectContainer)[0];
    const current = getCurrentQuantity(node);
    const change = parseInt(self.dataset.quantityControl, 10);
    const quantity = current + change;

    PubSub.publish(bva.quantityChange, { node, quantity });
  });
};
