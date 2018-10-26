import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, set } from 'core/Helpers';

import { getVariant } from 'handlers/ProductContainerHandlers';

export const attachVariant = node => {
  const variantContainer = $(node).find(dom.variantContainer)[0].innerHTML;
  const { options, variants, lineItem } = JSON.parse(variantContainer);
  const variantOptions = variants.map(({ options }) => options);
  const variantsMap = variants.reduce((variants, variant) =>
    variants.set(variant.options, variant), new Map());

  set(node, ['store', 'option'], {key: 'options', value: options});
  set(node, ['store', 'variant'], {key: 'variantOptions', value: variantOptions});
  set(node, ['store', 'variant'], {key: 'variants', value: variantsMap});

  if (lineItem) {
    const { key, properties } = lineItem;
    set(node, ['store', 'lineItem'], {key: 'key', value: key})
    set(node, ['store', 'lineItem'], {key: 'properties', value: properties})
    set(node, ['store', 'lineItem'], {key: 'variant', value: variants[0]})
  }

  return Promise.resolve(node);
};

export const attachVariants = nodes => {
  return Promise.all(
    nodes.map(node => attachVariant(node))
  );
};

export const setInitialSelectedVariantAndOptions = nodes => {
  return Promise.all(
    nodes.map(node => {
      const initiallySelectedOptions = get(node, ['store', 'option']).options
        .reduce((selected, { name, initialValue }) => ({ ...selected, [name]: initialValue }), {});
      const initiallySelectedVariant = getVariant(node, initiallySelectedOptions);

      set(node, ['store', 'variant'], {key: 'selected', value: initiallySelectedVariant});
      set(node, ['store', 'option'], {key: 'selected', value: initiallySelectedOptions});
      return node;
    })
  );
};

export const setInitialSelectedVariantAndOptions2 = node => {
  const initiallySelectedOptions = get(node, ['store', 'option']).options
    .reduce((selected, { name, initialValue }) => ({ ...selected, [name]: initialValue }), {});
  const initiallySelectedVariant = getVariant(node, initiallySelectedOptions);

  set(node, ['store', 'variant'], {key: 'selected', value: initiallySelectedVariant});
  set(node, ['store', 'option'], {key: 'selected', value: initiallySelectedOptions});

  return Promise.resolve(node);
};
