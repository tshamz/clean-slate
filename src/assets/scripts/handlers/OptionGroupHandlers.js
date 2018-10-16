import dom from 'core/Dom';
import bva from 'core/Constants';

import { updateState } from 'core/Helpers';

import { getProductContainer } from 'containers/ProductContainers';
import { getVariantContainer } from 'containers/VariantContainers';
import { optionGroupContainers } from 'containers/OptionGroupContainers';
import { getSelectedOptions, getAllOptionGroupValues } from 'containers/OptionGroupContainers';

export const updateInStockOptionValues = (node, property = true, className = false) => () => {
  const optionGroupValues = getAllOptionGroupValues(node);
  const selectedOptions = Object.entries(getSelectedOptions(node)).reduce((acc, [name, value]) =>
    (value) ? { ...acc, [name]: value } : { ...acc }, {});
  const disabledOptionValues = optionGroupValues.filter(([node, { name, value, variants }]) => {
    const possibleOptions = { ...selectedOptions, [name]: value };
    const filteredVariants = variants.filter(({ options }) =>
      Object.entries(possibleOptions).every(([name, value]) => options[name] === value));
    return filteredVariants.every(variant => !variant.available);
  });

  const $valueNodes = $(optionGroupValues.map(([node, info]) => node));
  const $disabledValueNodes = $(disabledOptionValues.map(([node, info]) => node));

  if (property) {
    $valueNodes.find('input').prop('disabled', false);
    $disabledValueNodes.find('input').prop('disabled', true);
  }

  if (className) {
    $valueNodes.removeClass(className);
    $disabledValueNodes.addClass(className);
  }

  return Promise.resolve(node);
};

export const updateOptionGroupContainer = (node, data) => {
  optionGroupContainers.set(node, updateState(node, bva.optionGroup, data));
  return Promise.resolve(data);

  // return Promise.resolve(
  //   optionGroupContainers
  //     .set(node, updateState(node, bva.optionGroup, data))
  //     .get(node)
  // );
};
