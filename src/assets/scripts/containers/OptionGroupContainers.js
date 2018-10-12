import dom from 'core/Dom';
import bva from 'core/Constants';

import { registerContainer, updateState } from 'core/Helpers';

export const optionGroupContainers = new Map();
window.o = optionGroupContainers

export const registerOptionGroupContainer = node => {
  const initialState = {
    productContainer: $(node).closest(dom.productContainer)[0],
    name: node.dataset.optionGroupContainer,
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
