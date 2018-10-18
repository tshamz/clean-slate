import dom from 'core/Dom';

import { registerProductContainers } from 'containers/ProductContainers';
import { registerSliderContainers } from 'containers/SliderContainers';
import { attachVariants, setInitialSelectedVariantAndOptions } from 'containers/VariantContainers';
import { attachPrices } from 'containers/PriceContainers';

import { attachQuantitySelects, setQuantityInitialState } from 'controls/QuantitySelectControls';
import { attachAddToCarts } from 'controls/AddToCartControls';
import { attachOptionGroups } from 'controls/OptionGroupControls';
import { attachOptionValues } from 'controls/OptionValueControls';

export const initContainers = async () => {

  await registerProductContainers()
    .then(attachVariants)
    .then(setInitialSelectedVariantAndOptions)
    .then(attachQuantitySelects)
    .then(setQuantityInitialState)
    .then(attachOptionGroups)
    .then(attachOptionValues)
    .then(attachPrices)
    .then(attachAddToCarts)

  registerSliderContainers();


    // .then(initVariantContainers)
    // .then(() => {
    //   return Promise.all([
    //     initAddToCartContainers(),
    //     initQuantitySelectContainers()
    //       .then(setQuantityInitialState),
    //     initOptionGroupContainers()
    //       .then(setOptionGroupInitialState)
    //       .then(updateInStockOptionValues),
    //     initPriceContainers(),
    //     initSliderContainers(),
    //   ]);
    // })
    // .then(() => {
    //   $(dom.productContainer).get().forEach(node => {
    //     updateInStockOptionValues(node);
    //     updateSelectedVariant(node);
    //   });
    // })
};
