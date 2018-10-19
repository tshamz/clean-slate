import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

import { updateInStockOptionValues } from 'handlers/OptionGroupHandlers';

export const attachOptionValue = node => {
  const optionValueControls = $(node).find(dom.optionValueControl).find('input').get();
  const optionValueNodes = get(node, ['nodes', 'optionValue']);

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
    optionValueNodes.set(control, optionValue);
  });

  // return Promise.resolve(get(node));
  return Promise.resolve(node);
};

// export const attachOptionValues = containers => {
export const attachOptionValues = nodes => {
  // const nodes = containers.map(({ node }) => node);
  return Promise.all(
    nodes.map(node => attachOptionValue(node))
  );
};

// export const setOptionValueInitialState = containers => {
export const setOptionValueInitialState = nodes => {
  // containers.forEach(({ node }) => {
  nodes.forEach(node => {
    const optionValueNodes = get(node, ['nodes', 'optionValue'], {keys: true});
    const valueMap = optionValueNodes.map(({ value, name }) => {
      const filteredOptions = get(node, ['store', 'variant', 'variantOptions'])
        .filter(option => option[name] === value);
      const variants = filteredOptions.map(option => get(node, ['store', 'variant', 'variants']).get(option));
      return { name, value, variants };
    });
    const option = get(node, ['store', 'option']);
    option.values = valueMap;

    updateInStockOptionValues(node);
  });

  // return Promise.resolve(containers);
  return Promise.resolve(nodes);
};
