import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, set, unique } from 'core/Helpers';

export const attachQuantitySelect = node => {
  const quantitySelectControls = $(node).find(dom.quantitySelectControl).get();

  quantitySelectControls.forEach(control => {
    const valueNode = $(control).find(dom.quantityValue)[0];
    const quantitySelect = {
      nodes: {
        self: control,
        value: valueNode
      }
    };
    set(node, ['nodes', 'quantitySelect'], {key: control, value: quantitySelect});
  });

  return Promise.resolve(node);
};

export const attachQuantitySelects = nodes => {
  return Promise.all(
    nodes.map(node => attachQuantitySelect(node))
  );
};

export const setQuantityInitialState = nodes => {
  return Promise.all(
    nodes.map(node => {
      const quantitySelects = get(node, ['nodes', 'quantitySelect'], {keys: true});
      const quantitySelectValues = quantitySelects.map(node => $(node).find(dom.quantityValue)[0].value);
      const uniqueValues = unique(quantitySelectValues);
      const quantity = (uniqueValues.length == 1) ? uniqueValues[0] : 1;

      return set(node, ['store', 'quantity'], {key: 'current', value: parseInt(quantity, 10)});
    })
  );
};
