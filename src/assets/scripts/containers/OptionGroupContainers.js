import dom from 'core/Dom';
import bva from 'core/Constants';

import { registerContainer } from 'core/Helpers';

import { getProductContainer } from 'containers/ProductContainers';
import { getVariantContainer } from 'containers/VariantContainers';

export const optionGroupContainers = new Map();
window.o = optionGroupContainers;

export const getAllOptionGroupValues = node => {
  const optionGroupContainers = getProductContainer(node).get(bva.optionGroup);
  return Array.from(optionGroupContainers.values()).reduce((values, optionGroupContainer) =>
    [...values, ...optionGroupContainer.get('values')], []);
};

export const getSelectedOptions = node => {
  const optionGroupContainers = getProductContainer(node).get(bva.optionGroup);
  return Array.from(optionGroupContainers.values())
    .reduce((options, optionGroup) => {
      const name = optionGroup.get('name');
      const value = optionGroup.get('selected');
      return { ...options, [name]: value };
    }, {});
};

export const registerOptionGroupContainer = node => {
  const variantContainer = getVariantContainer(node);
  const name = $(node).find('input').get(0).name;
  const valueNodes = $(node).find(dom.optionValueContainer).get();

  const valueMap = valueNodes.map(node => {
    const value = $(node).find('input').val();
    const filteredOptions = variantContainer.get('options').filter(option => option[name] === value);
    const variants = filteredOptions.map(filteredOption => variantContainer.get('variants').get(filteredOption));
    return [node, { name, value, variants }];
  });

  const values = new Map(valueMap);

  const initialState = {
    productContainer: $(node).closest(dom.productContainer)[0],
    name,
    values,
    selected: $(node).find(':checked').val(),
    selectedNode: $(node).find(dom.optionGroupSelectedValue).get(0),
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
