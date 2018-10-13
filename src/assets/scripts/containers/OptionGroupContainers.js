import dom from 'core/Dom';
import bva from 'core/Constants';

import { registerContainer, updateState } from 'core/Helpers';

export const optionGroupContainers = new Map();
window.o = optionGroupContainers

export const registerOptionGroupContainer = node => {
  const initialState = {
    productContainer: $(node).closest(dom.productContainer)[0],
    name: $(node).find('input').get(0).name,
    selected: $(node).find(':checked').val(),
    values: $(node).find('input').get().map(input => input.value),
  };

  return Promise.resolve(
    registerContainer(node, bva.optionGroup, initialState)
  );
};

export const initOptionGroupContainers = async () => {
  return Promise.all(
    $(dom.optionGroupContainer).get().map(node => registerOptionGroupContainer(node))
  );
};
