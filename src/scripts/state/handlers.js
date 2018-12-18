import dom from 'common/Dom';
import bva from 'common/Constants';

import { state } from 'state';

export const getState = containerId => {
  return (containerId) ? state[containerId] : state;
};

export const setState = data => {
  const { id, change, ...newState } = data;
  const oldState = state[id];
  state[id] = { ...oldState, ...newState };
  PubSub.publish(`${bva.updateState}.${change}`, { id, data, state: state[id] });
  return state[id];
};

const getVariant = id => {
  const state = getState(id);
  const { options, variants } = state.data;
  const selectedOptions = options
    .map(option => option.name)
    .map(name => state[name]);
  const variant = variants.find(variant =>
    selectedOptions.every(selectedOption => variant.variant.options.includes(selectedOption)));
  return variant;
};

export const updateVariant = data => {
  const { variant: { id: variantId }} = getVariant(data.id);
  setState({ ...data, variantId, change: 'VARIANT' });
  PubSub.publish(bva.updateInventory, data);
  PubSub.publish(bva.updatePrice, data);
};

export const updateInventory = data => {
  const { inventory } = getVariant(data.id);
  setState({ ...data, inventory, change: 'INVENTORY' });
};

export const updatePrice = data => {
  const { variant: { price, compare_at_price }} = getVariant(data.id);
  setState({ ...data, price, compare_at_price, change: 'PRICE' });
};

export const updateQuantity = data => {
  setState({ ...data, change: 'QUANTITY' });
};

export const updateOptionGroupValue = data => {
  setState({ ...data, change: 'OPTION' });
  PubSub.publish(bva.updateVariant, data);
};

const getInitialOptionValues = options => {
  return options.reduce((optionValues, option) =>
    ({ ...optionValues, [option.name]: option.initialValue }), {});
};

const getInitialVariantData = variants => {
  const {variant: { id: variantId, price, compare_at_price }, inventory} = variants.find(variant => variant.isInitialVariant);
  return { variantId, inventory, price, compare_at_price };
};

const getProductContainerData = () => {
  return $(dom.productContainer).get().map(productContainer => {
    const id = productContainer.dataset.containerId;
    const { data: options } = JSON.parse($(productContainer).find(dom.optionData).text());
    const { data: variants } = JSON.parse($(productContainer).find(dom.variantData).text());
    const initialOptionValues = getInitialOptionValues(options);
    const initialVariantData = getInitialVariantData(variants);
    const quantity = parseInt($(productContainer).find(dom.quantityValue).val(), 10);
    return {
      id,
      change: 'INIT',
      ...initialOptionValues,
      ...initialVariantData,
      quantity,
      data: { options, variants },
    };
  });
};

const getLineItemContainerData = () => {
  return $(dom.lineItemContainer).get().map(lineItemContainer => {
    const id = lineItemContainer.dataset.containerId;
    const { data } = JSON.parse($(lineItemContainer).find(dom.lineItemData).text());
    const { key, properties, variant: { variant: { id: variantId, price, compare_at_price }, inventory }} = data;
    const quantity = parseInt($(lineItemContainer).find(dom.quantityValue).val(), 10);
    return {
      id,
      change: 'INIT',
      key,
      properties,
      variantId,
      quantity,
      inventory,
      data,
      price,
      compare_at_price
    };
  });
};

export const initLineItemContainers = data => {
  return getLineItemContainerData()
    .map(item => setState(item));
};

export const initProductContainers = data => {
  return getProductContainerData()
    .map(item => setState(item));
};

export const init = data => {
  return [
    ...initLineItemContainers(data),
    ...initProductContainers(data),
  ];
};
