import dom from 'core/Dom';
import bva from 'core/Constants';

import { updateState } from 'core/Helpers';

import { quantitySelectContainers, getCurrentQuantity } from 'containers/QuantitySelectContainers'



export const handleQuantityChange = (container, data) => {
  updateQuantitySelectContainer(container, data);

  // getQuantityContainer(node)
};


export const updateQuantitySelectContainer = (node, data) => {
  return Promise.resolve(
    quantitySelectContainers
      .set(node, updateState(node, bva.quantitySelect, data))
      .get(node)
  );
};

export const updateQuantitySelectUI = (node, amount) => {
  $(node).find(dom.quantityValue).val(amount);
};
