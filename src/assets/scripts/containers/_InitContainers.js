import { initSliders } from 'containers/SliderContainers';
import { initProductContainers } from 'containers/ProductContainers';
import { initQuantityContainers } from 'containers/QuantitySelectContainers';

export const initContainers = async () => {
  const a = await initProductContainers();
  await initQuantityContainers();
  // await initSliders(a, ['topbar']);
  await initSliders(a);
};
