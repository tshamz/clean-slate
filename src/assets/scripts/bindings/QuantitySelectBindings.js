import dom from 'core/Dom';
import bva from 'core/Constants';

import { quantitySelectContainers, getCurrentQuantity } from 'containers/QuantitySelectContainers'

export const bindUIActions = () => {
  $(dom.quantityControl).on('click', ({ currentTarget: self }) => {
    event.preventDefault();

    const container = $(self).closest(dom.quantitySelectContainer)[0];
    const current = getCurrentQuantity(container);
    const change = parseInt(self.dataset.quantityControl, 10);
    const quantity = current + change;

    PubSub.publish(bva.quantityChange, { container, quantity });
  });
};
