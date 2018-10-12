import { productContainers, initProductContainers } from 'containers/ProductContainers';
import { initQuantitySelectContainers } from 'containers/QuantitySelectContainers';
import { initSliderContainers } from 'containers/SliderContainers';
import { initOptionGroupContainers } from 'containers/OptionGroupContainers';

export const initContainers = async () => {
  await initProductContainers();
  initQuantitySelectContainers();
  initSliderContainers();
  initOptionGroupContainers();
};
