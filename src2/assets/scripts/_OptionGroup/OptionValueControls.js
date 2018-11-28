import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, set } from 'core/Helpers';

import { updateInStockOptionValues } from 'handlers/OptionGroupHandlers';

export const attachOptionValues = node => {
  const optionValueControls = $(node).find(dom.optionValueControl).find('input').get();

  optionValueControls.forEach(control => {
    const name = control.name;
    const value = control.value;
    const optionValue = {
      name,
      value,
      nodes: {
        self: control,
      }
    };
    set(node, ['nodes', 'optionValue', control], optionValue);
  });

  return Promise.resolve(node);
};

export const setOptionValueInitialState = async node => {
  const optionValueNodes = get(node, 'nodes.optionValue', {keys: true});
  const valueMap = optionValueNodes.map(({ value, name }) => {
    const filteredOptions = get(node, 'store.variant.variantOptions')
      .filter(option => option[name] === value);
    const variants = filteredOptions.map(option => get(node, 'store.variant.variants').get(option));
    return { name, value, variants };
  });

  await set(node, 'store.option.values', valueMap);

  return updateInStockOptionValues(node);
};
