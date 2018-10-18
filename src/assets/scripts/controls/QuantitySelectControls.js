import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, unique } from 'core/Helpers';

export const getCurrentQuantity = node =>
  get(node, 'store', 'quantity');

export const attachQuantitySelect = node => {
  const productContainerNodes = get(node, 'nodes');
  const quantitySelectContainers = $(node).find(dom.quantitySelectControl).get();
  productContainerNodes.quantitySelect = [ ...quantitySelectContainers ];
  return Promise.resolve(get(node));
};

export const attachQuantitySelects = containers => {
  const nodes = containers.map(container => container.get('node'));
  return Promise.all(nodes.map(node => attachQuantitySelect(node)));
};

export const setQuantityInitialState = containers => {
  containers.forEach(container => {
    const node = container.get('node');
    const quantitySelects = get(node, 'nodes', 'quantitySelect');
    const quantitySelectValues = quantitySelects.map(node => $(node).find(dom.quantityValue)[0].value);
    const uniqueValues = unique(quantitySelectValues);
    const quantity = (uniqueValues.length == 1) ? uniqueValues[0] : 1;
    const store = get(node, 'store');
    store.quantity = parseInt(quantity, 10);
  });
  return Promise.resolve(containers);
};
