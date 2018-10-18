import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, removeUndefinedValues, updateState } from 'core/Helpers';

export const getSelectedOptions = node =>
 get(node, 'optionGroup', 'selected');

export const getAllOptionGroupValues = node => {
  // const optionGroupContainers = get(node, 'optionGroup', 'nodes');
  // return Array.from(optionGroupContainers.values())
  //   .reduce((values, optionGroupContainer) => [...values, ...optionGroupContainer.get('values')], []);
};

const getDisabledOptionValues = node => {
  const selectedOptions = get(node, 'store', 'variant', 'selected', 'options');
  // console.log(selectedOptions);
  const optionGroupValuesNodes = get(node, 'nodes', 'optionValue');
  // console.log(optionGroupValuesNodes);
  const variants = Array.from(get(node, 'store', 'variant', 'variants').values());
  // console.log(variants);

  optionGroupValuesNodes.filter(({ name, value }) => {
    const a = variants.filter(({ options }) => {
      const updatedOptions = { ...selectedOptions, [name]: value };
      // console.log(updatedOptions);
      const e = Object.entries(updatedOptions);
      // console.log(e);
      return e.every(([ name, value ]) => options[name] === value);
    });
    console.log(a);
    a.every(variant => !variant.available);
  });
  // return optionGroupValues.filter(([ node, { name, value, variants } ]) => {
  //   return variants.filter(({ options }) => {
  //     const cloneSelectOptions = new Map(selectedOptions).set(name, value);
  //     return Array.from(cloneSelectOptions.entries())
  //       .every(([ name, value ]) => options[name] === value);
  //   })
  //   .every(variant => !variant.available);
  // });
};

// export const updateInStockOptionValues = (node, property = true, className = 'disabled') => {
export const updateInStockOptionValues = ({ node, name, value }) => {
  const optionGroupValuesNodes = get(node, 'nodes', 'optionValue');
  const $valueNodes = $(optionGroupValuesNodes);

  const disabledOptionValues = getDisabledOptionValues(node);

  console.log(disabledOptionValues);

  // const disabledOptionNodes = disabledOptionValues.map(([node, info]) => node);
  // const $disabledValueNodes = $(disabledOptionNodes);

  // if (property) {
  //   $valueNodes.find('input').prop('disabled', false);
  //   $disabledValueNodes.find('input').prop('disabled', true);
  // }

  // if (className) {
  //   $valueNodes.removeClass(className);
  //   $disabledValueNodes.addClass(className);
  // }

  return Promise.resolve(node);
};

export const updateSelectedOption = ({ node, name, value }) => {
  const selectedValues = get(node, 'store', 'variant', 'selected');
  selectedValues.options = { ...selectedValues.options, [name]: value };
  return Promise.resolve({ node, name, value });
};

export const updateOptionGroupUI = ({ node, name, value }) => {
  const container = get(node).get('node');
  const optionGroups = $(container).find(dom.optionGroupControl).get();
  const filteredOptionGroups = optionGroups.filter(node => node.dataset.optionGroupControl === name);
  $(filteredOptionGroups).find(dom.optionGroupSelectedValue).html(value);
  $(container).find(`input[name="${name}"][value="${value}"]`).prop('checked', true);
  return Promise.resolve({ node, name, value });
};
