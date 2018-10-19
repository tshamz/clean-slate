import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, unique } from 'core/Helpers';

export const attachQuantitySelect = node => {
  const quantitySelectControls = $(node).find(dom.quantitySelectControl).get();
  const quantitySelectNodes = get(node, ['nodes', 'quantitySelect']);

  quantitySelectControls.forEach(control => {
    const valueNode = $(control).find(dom.quantityValue)[0];
    const quantitySelect = {
      nodes: {
        self: control,
        value: valueNode
      }
    };
    quantitySelectNodes.set(control, quantitySelect);
  });

  // return Promise.resolve(get(node));
  return Promise.resolve(node);
};

// export const attachQuantitySelects = containers => {
export const attachQuantitySelects = nodes => {
  // const nodes = containers.map(({ node }) => node);
  return Promise.all(
    nodes.map(node => attachQuantitySelect(node))
  );
};

// export const setQuantityInitialState = containers => {
export const setQuantityInitialState = nodes => {
  // containers.forEach(({ node }) => {
  nodes.forEach(node => {
    const quantitySelects = get(node, ['nodes', 'quantitySelect'], {keys: true});
    const quantitySelectValues = quantitySelects.map(node => $(node).find(dom.quantityValue)[0].value);
    const uniqueValues = unique(quantitySelectValues);
    const quantity = (uniqueValues.length == 1) ? uniqueValues[0] : 1;
    const store = get(node, ['store']);
    store.quantity = parseInt(quantity, 10);
  });

  // return Promise.resolve(containers);
  return Promise.resolve(nodes);
};
