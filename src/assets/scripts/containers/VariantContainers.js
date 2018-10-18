import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

export const getVariant = (node, options) => {
  const variant = get(node, 'store', 'variant');
  const matchingOption = variant.variantOptions
    .find(option => Object.entries(option).every(([ name, value ]) => options[name] === value));
  return variant.variants.get(matchingOption);
};

export const getSelectedVariant = node => {
  const selectedOptions = get(node, 'store', 'variant', 'selected', 'options');
  return getVariant(node, selectedOptions);
};

export const attachVariantData = node => {
  const variantContainer = $(node).find(dom.variantContainer)[0].innerHTML;
  const variantStore = get(node, 'store', 'variant');
  const { options, variants: variantObjects, lineItem = null } = JSON.parse(variantContainer);
  const variantOptions = variantObjects.map(({ options }) => options);
  const variants = variantObjects.reduce((variants, variant) =>
    variants.set(variant.options, variant), new Map());

  variantStore.options = options;
  variantStore.variantOptions = variantOptions;
  variantStore.variants = variants;
  variantStore.lineItem = lineItem;

  return Promise.resolve(get(node));
};

export const attachVariants = containers => {
  const nodes = containers.map(container => container.get('node'));
  return Promise.all(nodes.map(node => attachVariantData(node)));
};

export const setInitialSelectedVariantAndOptions = containers => {
  containers.forEach(container => {
    const node = container.get('node');
    const options = get(node, 'store', 'variant', 'options');
    const initiallySelectedOptions = options.reduce((selected, { name, initialValue }) =>
      ({ ...selected, [name]: initialValue }), {});
    const selectedVariant = getVariant(node, initiallySelectedOptions);

    const variantStore = get(node, 'store', 'variant');
    variantStore.selected.variant = selectedVariant;
    variantStore.selected.options = initiallySelectedOptions;
  });
  return Promise.resolve(containers);
};
