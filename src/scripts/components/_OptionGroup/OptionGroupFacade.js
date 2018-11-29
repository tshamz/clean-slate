import dom from 'core/Dom';

import { get, set } from 'core/Helpers';

import { getOutOfStockOptionValues } from 'handlers/InventoryHandlers';

export const getSelectedOptions = node =>
  get(node, ['store', 'option', 'selected']);

export const updateSelectedOption = ({ node, name, value }) => {
  const previouslySelectedOption = get(node, 'store.option.selected');
  const updatedSelectedOption = { ...previouslySelectedOption, [name]: value };
  set(node, 'store.option.selected', updatedSelectedOption);

  return Promise.resolve({ node, name, value });
};

export const updateInStockOptionValues = node => {
  const valueNodes = get(node, ['nodes', 'optionValue'], {keys: true});
  const disabledValues = getOutOfStockOptionValues(node);
  const disabledNodes = disabledValues.map(({ name, value }) => {
    const match = get(node, ['nodes', 'optionValue'], {values: true})
      .find(({ name: optionName, value: optionValue }) => name === optionName && value === optionValue);

    return match.nodes.self;
  });

  const $valueNodes = $(valueNodes);
  const $disabledNodes = $(disabledNodes);

  const property = true;
  const className = 'disabled';

  if (property) {
    $valueNodes.prop('disabled', false);
    $disabledNodes.prop('disabled', true);
  }

  if (className) {
    $valueNodes.removeClass(className);
    $disabledNodes.addClass(className);
  }

  return Promise.resolve(node);
};

const updateSelectedOptionInput = (node, name, value) => {
  const container = get(node, ['node']);
  const optionGroups = $(container).find(dom.optionGroupControl).get();
  const filteredOptionGroups = optionGroups.filter(node => node.dataset.optionGroupControl === name);
  $(filteredOptionGroups).find(dom.optionGroupSelectedValue).html(value);
  $(container).find(`input[name="${name}"][value="${value}"]`).prop('checked', true);
};

export const updateOptionGroupUI = ({ node, name, value }) => {
  updateSelectedOptionInput(node, name, value);
  updateInStockOptionValues(node);

  return Promise.resolve(node);
};

export const getOutOfStockOptionValues = node => {
  const selectedOptions = get(node, ['store', 'variant', 'selected', 'options']);
  const optionGroupValues = get(node, ['store', 'option', 'values']);
  return optionGroupValues.filter(({ name, value, variants }) =>
    variants.filter(({ options }) =>
      Object.entries({ ...selectedOptions, [name]: value })
        .every(([ name, value ]) => options[name] === value))
        .every(variant => !variant.inventory.available));
};
