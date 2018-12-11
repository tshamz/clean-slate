import dom from 'common/Dom';

import { state } from 'state';

export const getState = containerId => {
  return (containerId) ? state[containerId] : state;
};

export const setState = data => {
  const { id, ...newState } = data;
  const oldState = state[id];
  state[id] = { ...oldState, ...newState };
  return state[id];
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

export const init = data => {
  let initData;
  if (!data) {
    initData = [
      ...getLineItemContainerData(),
      ...getProductContainerData(),
    ];
  } else {
    initData = [
      ...getLineItemContainerData(),
    ];
  }
  return initData.map(item => setState(item));
};
