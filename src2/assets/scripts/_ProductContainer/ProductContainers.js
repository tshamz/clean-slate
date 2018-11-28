import dom from 'core/Dom';

import { get, set, getContainer } from 'core/Helpers';
import { getVariant } from 'handlers/ProductContainerHandlers';

export const productContainers = new Map();
window.p = productContainers;

export const registerProductContainer = node => {
  const initialState = {
    node,
    store: {
      option: {
        selected: null,        // {}
        options: null,         // []
        values: null,          // []
      },
      variant: {
        selected: null,        // {}
        variantOptions: null,  // []
        variants: null,        // new Map()
      },
      quantity: null,          // Number,
    },
    nodes: {
      addToCart: new Map(),
      optionGroup: new Map(),
      optionValue: new Map(),
      price: new Map(),
      quantitySelect: new Map(),
      sliders: new Map(),
    },
  };

  productContainers.set(node, initialState);

  return Promise.resolve(node);
};

export const attachProductVariantData = node => {
  const variantData = $(node).find(dom.variantData)[0].innerHTML;
  const { options, variants } = JSON.parse(variantData);
  const variantOptions = variants.map(({ options }) => options);
  const variantsMap = variants.reduce((variants, variant) =>
    variants.set(variant.options, variant), new Map());

  set(node, 'store.option.options', options);
  set(node, 'store.variant.variantOptions', variantOptions);
  set(node, 'store.variant.variants', variantsMap);

  return Promise.resolve(node);
};

export const setInitialSelectedVariantAndOptions = node => {
  const initiallySelectedOptions = get(node, 'store.option.options')
    .reduce((selected, { name, initialValue }) => ({ ...selected, [name]: initialValue }), {});
  const initiallySelectedVariant = getVariant(node, initiallySelectedOptions);

  set(node, 'store.variant.selected', initiallySelectedVariant);
  set(node, 'store.option.selected', initiallySelectedOptions);

  return Promise.resolve(node);
};


//

import {
  productContainers,
  registerProductContainer,
  attachProductVariantData,
  setInitialSelectedVariantAndOptions, } from 'containers/ProductContainers';

import { attachQuantitySelects, setQuantityInitialState, } from 'controls/QuantitySelectControls';
import { attachOptionGroups, } from 'controls/OptionGroupControls';
import { attachOptionValues, setOptionValueInitialState, } from 'controls/OptionValueControls';
import { attachPrices, } from 'controls/PriceControls';
import { attachAddToCarts, } from 'controls/AddToCartControls';

export const initializeProductContainer = async node => {
  await registerProductContainer(node)
    .then(attachProductVariantData);

  setInitialSelectedVariantAndOptions(node);
  attachQuantitySelects(node)
    .then(setQuantityInitialState)
  attachOptionGroups(node);
  attachOptionValues(node)
    .then(setOptionValueInitialState)  // depends on attachOptionValues and attachProductVariantData
  attachPrices(node);
  attachAddToCarts(node);

  return getContainer(node);
};

export const initializeProductContainers = () => {
  const nodes = $(dom.productContainer).get().filter(node => !productContainers.has(node));

  return Promise.all(nodes.map(initializeProductContainer));
};
