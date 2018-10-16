import dom from 'core/Dom';

import { initProductContainers } from 'containers/ProductContainers';
import { initVariantContainers } from 'containers/VariantContainers';
import { initAddToCartContainers } from 'containers/AddToCartContainers';
import { initQuantitySelectContainers } from 'containers/QuantitySelectContainers';
import { initOptionGroupContainers } from 'containers/OptionGroupContainers';
import { initPriceContainers } from 'containers/PriceContainers';
import { initSliderContainers } from 'containers/SliderContainers';

import { updateSelectedVariant } from 'handlers/VariantHandlers';
import { updateInStockOptionValues } from 'handlers/OptionGroupHandlers';

export const initContainers = () => {
  return initProductContainers()
    .then(initVariantContainers)
    .then(() => {
      return Promise.all([
        initAddToCartContainers(),
        initQuantitySelectContainers(),
        initOptionGroupContainers(),
        initPriceContainers(),
        initSliderContainers(),
      ]);
    })
    .then(() => {
      $(dom.productContainer).get().forEach(node => {
        updateInStockOptionValues(node)();
        updateSelectedVariant(node);
      });
    })
};
