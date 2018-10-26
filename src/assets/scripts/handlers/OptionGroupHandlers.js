import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, set } from 'core/Helpers';

import { getOutOfStockOptionValues } from 'handlers/InventoryHandlers';

export const getSelectedOptions = node =>
  get(node, ['store', 'option', 'selected']);

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

export const updateSelectedOption = ({ node, name, value }) => {
  set(node, ['store', 'option'], {key: 'selected', value: { ...optionStore.selected, [name]: value }})

  return Promise.resolve({ node, name, value });
};

export const updateOptionGroupUI = ({ node, name, value }) => {
  const container = get(node, ['node']);
  const optionGroups = $(container).find(dom.optionGroupControl).get();
  const filteredOptionGroups = optionGroups.filter(node => node.dataset.optionGroupControl === name);
  $(filteredOptionGroups).find(dom.optionGroupSelectedValue).html(value);
  $(container).find(`input[name="${name}"][value="${value}"]`).prop('checked', true);

  return Promise.resolve(node);
};
