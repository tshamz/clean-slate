import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, set } from 'core/Helpers';

import { updateInStockOptionValues } from 'handlers/OptionGroupHandlers';

export const attachOptionValue = node => {
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
    set(node, ['nodes', 'optionValue'], {key: control, value: optionValue});
  });

  return Promise.resolve(node);
};

export const attachOptionValues = nodes => {
  return Promise.all(
    nodes.map(node => attachOptionValue(node))
  );
};

export const setOptionValueInitialState = nodes => {
  return Promise.all(
    nodes.map(node => {
      const optionValueNodes = get(node, ['nodes', 'optionValue'], {keys: true});
      const valueMap = optionValueNodes.map(({ value, name }) => {
        const filteredOptions = get(node, ['store', 'variant', 'variantOptions'])
          .filter(option => option[name] === value);
        const variants = filteredOptions.map(option => get(node, ['store', 'variant', 'variants']).get(option));
        return { name, value, variants };
      });

      return set(node, ['store', 'option'], {key: 'values', value: valueMap})
        .then(updateInStockOptionValues);
    })
  );
};
