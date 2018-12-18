import bva from 'common/Constants';
import {
  init,
  initLineItemContainers,
  updateOptionGroupValue,
  updateVariant,
  updateQuantity,
  updateInventory,
  updatePrice, } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.updateCart, (message, data) => {
    return initLineItemContainers(data);
  });

  PubSub.subscribe(bva.updateQuantity, (message, data) => {
    return updateQuantity(data);
  });

  PubSub.subscribe(bva.updateOptionGroupValue, async (message, data) => {
    return updateOptionGroupValue(data);
  });

  PubSub.subscribe(bva.updateVariant, (message, data) => {
    return updateVariant(data);
  });

  PubSub.subscribe(bva.updateInventory, (message, data) => {
    return updateInventory(data);
  });

  PubSub.subscribe(bva.updatePrice, (message, data) => {
    return updatePrice(data);
  });

  PubSub.subscribe(bva.updateState, (message, data) => {
    if (data.change === 'variant') {

    } else if (data.change === 'inventory') {

    } else if (data.change === 'quantity') {

    } else if (data.change === 'option') {

    }
  });
};
