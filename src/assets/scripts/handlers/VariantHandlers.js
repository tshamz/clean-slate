import bva from 'core/Constants';

import { getProductContainer } from 'containers/ProductContainers';
import { getVariantContainer } from 'containers/VariantContainers';
import { getSelectedOptions } from 'containers/OptionGroupContainers';

import { getVariant } from 'containers/VariantContainers';

export const getSelectedVariant = node => {
  const productContainer = getProductContainer(node);
  const variantContainer = getVariantContainer(node);
  if (variantContainer.get(bva.variants).size === 1) {
    return variantContainer
      .get('variants')
      .values().next().value;
  } else {
    const selectedOptions = getSelectedOptions(node);
    return getVariant(node, selectedOptions);
  }
};

export const updateSelectedVariant = node => {
  const selectedVariant = getSelectedVariant(node);
  getProductContainer(node)
    .get(bva.variant)
    .set('selected', selectedVariant);
};
