import { initProductContainers } from 'containers/ProductContainers';
import { initVariantContainers } from 'containers/VariantContainers';
import { initAddToCartContainers } from 'containers/AddToCartContainers';
import { initQuantitySelectContainers } from 'containers/QuantitySelectContainers';
import { initOptionGroupContainers } from 'containers/OptionGroupContainers';
import { initPriceContainers } from 'containers/PriceContainers';
import { initSliderContainers } from 'containers/SliderContainers';

export const initContainers = async () => {
  await initProductContainers();
  initVariantContainers();
  initAddToCartContainers();
  initQuantitySelectContainers();
  initOptionGroupContainers();
  initPriceContainers();
  initSliderContainers();
};
