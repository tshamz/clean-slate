import dom from 'common/Dom';
import bva from 'common/Constants';

import { state } from 'state';

export const getState = containerId => {
  return Promise.resolve((containerId) ? state[containerId] : state);
};

export const setState = data => {
  const { id, ...newState } = data;
  const oldState = state[id];
  state[id] = { ...oldState, ...newState };
  return Promise.resolve(state[id]);
};

export const updateVariant = data => {
  return setState(data);
};

export const updateInventory = data => {
  return setState(data);
};

export const updateQuantity = data => {
  return setState(data);
};

const optionGroupChangeHandler = (id, state) => {
  const { options, variants } = state.data;
  const selectedOptions = options
    .map(option => option.name)
    .map(name => state[name]);
  const selectedVariant = variants.find(variant =>
    selectedOptions.every(selectedOption => variant.variant.options.includes(selectedOption)));
  const { inventory, variant: { id: variantId }} = selectedVariant;
  return { inventory, variantId };
};

export const updateOptionGroupValue = async data => {
  const { id } = data;
  const state = await setState(data);
  const { inventory, variantId } = optionGroupChangeHandler(id, state);
  PubSub.publish(bva.updateVariant, { id, variantId });
  PubSub.publish(bva.updateInventory, { id, inventory });
  return state;
};

const getInitialOptionValues = options => {
  return options.reduce((optionValues, option) =>
    ({ ...optionValues, [option.name]: option.initialValue }), {});
};

const getInitialVariantData = variants => {
  const {variant: { id: variantId }, inventory} = variants.find(variant => variant.isInitialVariant);
  return { variantId, inventory };
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
    const { key, properties, variant: { variant: { id: variantId }, inventory }} = data;
    const quantity = parseInt($(lineItemContainer).find(dom.quantityValue).val(), 10);
    return { id, key, properties, variantId, quantity, inventory, data };
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
