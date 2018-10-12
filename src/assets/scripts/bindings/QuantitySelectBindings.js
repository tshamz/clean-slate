import dom from 'core/Dom';
import BVA from 'core/Constants';

import { getCurrentQuantity } from 'containers/QuantitySelectContainers'

export const bindUIActions = () => {
  $(dom.quantityControl).on('click', ({ currentTarget: self }) => {
    event.preventDefault();
    const node = $(self).closest(dom.quantityContainer)[0];
    const currentQuantity = getCurrentQuantity(node);
    const change = $(self).data('quantityControl');
    const newQuantity = currentQuantity + change;
    const data = { node, currentQuantity, change, newQuantity };
    PubSub.publish(BVA.quantityChange, data);
  });
};
