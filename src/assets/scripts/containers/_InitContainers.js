import dom from 'core/Dom';

import { initProductContainers } from 'containers/ProductContainers';
import { initVariantContainers } from 'containers/VariantContainers';
import { initAddToCartContainers } from 'containers/AddToCartContainers';
import { initQuantitySelectContainers } from 'containers/QuantitySelectContainers';
import { initOptionGroupContainers } from 'containers/OptionGroupContainers';
import { initPriceContainers } from 'containers/PriceContainers';
import { initSliderContainers } from 'containers/SliderContainers';

import { updateSelectedVariant } from 'handlers/VariantHandlers';

export const initContainers = async () => {
  await initProductContainers();
  await initVariantContainers();
  await Promise.all([
    initAddToCartContainers(),
    initQuantitySelectContainers(),
    initOptionGroupContainers(),
    initPriceContainers(),
    initSliderContainers(),
  ]);

  $(dom.productContainer).get().forEach(node => updateSelectedVariant(node));
};
