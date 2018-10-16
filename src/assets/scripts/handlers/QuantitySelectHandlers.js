import dom from 'core/Dom';
import bva from 'core/Constants';

import { updateState } from 'core/Helpers';

import { quantitySelectContainers, getCurrentQuantity } from 'containers/QuantitySelectContainers'



export const handleQuantityChange = (container, data) => {
  updateQuantitySelectContainer(container, data);

  // getQuantityContainer(node)
};


export const updateQuantitySelectContainer = node => data => {
  quantitySelectContainers.set(node, updateState(node, bva.quantitySelect, data));
  return Promise.resolve(data);

  // return Promise.resolve(
  //   quantitySelectContainers
  //     .set(node, updateState(node, bva.quantitySelect, data))
  //     .get(node)
  // );
};

export const updateQuantitySelectUI = node => ({ quantity }) => {
  $(node).find(dom.quantityValue).val(quantity);
  return Promise.resolve(quantity);
};
