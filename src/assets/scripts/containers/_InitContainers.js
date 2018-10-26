import dom from 'core/Dom';

import { registerProductContainers, registerProductContainer } from 'containers/ProductContainers';

import {
  attachVariants,
  attachVariant,
  setInitialSelectedVariantAndOptions,
  setInitialSelectedVariantAndOptions2,
} from 'containers/VariantContainers';

import {
  attachQuantitySelects,
  attachQuantitySelect,
  setQuantityInitialState,
  setQuantityInitialState2,
} from 'controls/QuantitySelectControls';

import { attachOptionGroups, attachOptionGroup } from 'controls/OptionGroupControls';

import {
  attachOptionValues,
  attachOptionValue,
  setOptionValueInitialState,
  setOptionValueInitialState2,
} from 'controls/OptionValueControls';

import { attachPrices, attachPrice } from 'containers/PriceContainers';
import { attachAddToCarts, attachAddToCart } from 'controls/AddToCartControls';

import { registerSliderContainers } from 'containers/SliderContainers';

export const initializeProductContainer = node => {
  return registerProductContainer(node)
    .then(attachVariant)
    .then(setInitialSelectedVariantAndOptions2)
    .then(attachQuantitySelect)
    .then(setQuantityInitialState2)
    .then(attachOptionGroup)
    .then(attachOptionValue)
    .then(setOptionValueInitialState2)
    .then(attachPrice)
    .then(attachAddToCart)
    .catch(err => console.error(err));
};

export const initContainers = async () => {
  const nodes = $(dom.productContainer).get();
  const containers = nodes.map(initializeProductContainer);
  await Promise.all(containers);
  registerSliderContainers();

  // await registerProductContainers(nodes)
  //   .then(attachVariants)
  //   .then(setInitialSelectedVariantAndOptions)
  //   .then(attachQuantitySelects)
  //   .then(setQuantityInitialState)
  //   .then(attachOptionGroups)
  //   .then(attachOptionValues)
  //   .then(setOptionValueInitialState)
  //   .then(attachPrices)
  //   .then(attachAddToCarts)

  // registerSliderContainers();
};
