import bva from 'common/Constants';
import { setState as setProductContainerState } from 'state/productContainers';
import { setState as setLineItemContainerState } from 'state/lineItemContainers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.updateCart, (message, data) => {
    return setLineItemContainerState();
  });

  PubSub.subscribe(bva.updateOptionGroupValue, (message, data) => {
    return setProductContainerState(data);
  });
};
