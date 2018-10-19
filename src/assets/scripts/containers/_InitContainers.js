import dom from 'core/Dom';

import { registerProductContainers } from 'containers/ProductContainers';
import { registerSliderContainers } from 'containers/SliderContainers';

import { attachVariants, setInitialSelectedVariantAndOptions } from 'containers/VariantContainers';
import { attachAddToCarts } from 'controls/AddToCartControls';
import { attachOptionGroups } from 'controls/OptionGroupControls';
import { attachOptionValues, setOptionValueInitialState  } from 'controls/OptionValueControls';
import { attachPrices } from 'containers/PriceContainers';
import { attachQuantitySelects, setQuantityInitialState } from 'controls/QuantitySelectControls';

export const initContainers = async () => {
  const nodes = $(dom.productContainer).get();

  await registerProductContainers(nodes)
    .then(attachVariants)
    .then(setInitialSelectedVariantAndOptions)
    .then(attachQuantitySelects)
    .then(setQuantityInitialState)
    .then(attachOptionGroups)
    .then(attachOptionValues)
    .then(setOptionValueInitialState)
    .then(attachPrices)
    .then(attachAddToCarts)

  registerSliderContainers();
};

export const initializeProductContainer = node => {
  return registerProductContainers([node])
    .then(attachVariants)
    .then(setInitialSelectedVariantAndOptions)
    .then(attachQuantitySelects)
    .then(setQuantityInitialState)
    .then(attachOptionGroups)
    .then(attachOptionValues)
    .then(setOptionValueInitialState)
    .then(attachPrices)
    .then(attachAddToCarts)
};
