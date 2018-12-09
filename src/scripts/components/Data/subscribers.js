import bva from 'common/Constants';
import { setLineItemsData, setProductsData } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.updateLineItemsData, (message, data) => {
    return setLineItemsData(data);
  });

  PubSub.subscribe(bva.updateProductsData, (message, data) => {
    return setProductsData(data);
  });
};
