import dom from 'core/Dom';

import { set, getContainer } from 'core/Helpers';

export const lineItemContainers = new Map();
window.l = lineItemContainers;

export const registerLineItemContainer = node => {
  const initialState = {
    node,
    store: {
      key: null,               // String
      properties: null,        // []
      variant: null,           // {}
      quantity: {
        current: null          // Number
      },
    },
    nodes: {
      price: new Map(),
      quantitySelect: new Map(),
    },
  };

  lineItemContainers.set(node, initialState);

  return Promise.resolve(node);
};

export const attachLineItemVariantData = node => {
  const variantData = $(node).find(dom.variantData)[0].innerHTML;
  const { key, properties, variant } = JSON.parse(variantData);

  set(node, 'store.key', key);
  set(node, 'store.properties', properties);
  set(node, 'store.variant', variant);

  return Promise.resolve(node);
};


//

import {
  lineItemContainers,
  registerLineItemContainer,
  attachLineItemVariantData, } from 'containers/LineItemContainers';

import { attachQuantitySelects, setQuantityInitialState, } from 'controls/QuantitySelectControls';
import { attachPrices, } from 'controls/PriceControls';

export const initializeLineItemContainer = async node => {
  await registerLineItemContainer(node)
    .then(attachLineItemVariantData);

  attachQuantitySelects(node)
    .then(setQuantityInitialState)
  attachPrices(node);

  return getContainer(node);
};

export const initializeLineItemContainers = () => {
  const nodes = $(dom.lineItemContainer).get().filter(node => !lineItemContainers.has(node));

  return Promise.all(nodes.map(initializeLineItemContainer))
};
