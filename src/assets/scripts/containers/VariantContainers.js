import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

import { getVariant, updateStore } from 'handlers/ProductContainerHandlers';

export const attachVariantData = node => {
  const variantContainer = $(node).find(dom.variantContainer)[0].innerHTML;
  const optionStore = get(node, ['store', 'option']);
  const variantStore = get(node, ['store', 'variant']);
  const lineItemStore = get(node, ['store', 'lineItem']);

  const { options, variants, lineItem } = JSON.parse(variantContainer);
  const variantOptions = variants.map(({ options }) => options);
  const variantsMap = variants.reduce((variants, variant) =>
    variants.set(variant.options, variant), new Map());

  optionStore.options = options;
  variantStore.variantOptions = variantOptions;
  variantStore.variants = variantsMap;

  if (lineItem) {
    const { key, properties } = lineItem;
    lineItemStore.key = key;
    lineItemStore.properties = properties;
    lineItemStore.variant = variantStore.variants[0];
  }

  // return Promise.resolve(get(node));
  return Promise.resolve(node);
};

// export const attachVariants = containers => {
export const attachVariants = nodes => {
  // const nodes = containers.map(({ node }) => node);
  return Promise.all(
    nodes.map(node => attachVariantData(node))
  );
};

// export const setInitialSelectedVariantAndOptions = containers => {
export const setInitialSelectedVariantAndOptions = nodes => {
  // containers.forEach(({ node }) => {
  nodes.forEach(node => {
    const optionStore = get(node, ['store', 'option']);
    const variantStore = get(node, ['store', 'variant']);
    const initiallySelectedOptions = optionStore.options.reduce((selected, { name, initialValue }) =>
      ({ ...selected, [name]: initialValue }), {});
    const initiallySelectedVariant = getVariant(node, initiallySelectedOptions);
    variantStore.selected = initiallySelectedVariant;
    optionStore.selected = initiallySelectedOptions;
  });

  // return Promise.resolve(containers);
  return Promise.resolve(nodes);
};
