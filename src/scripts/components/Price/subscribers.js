import bva from 'common/Constants';
import { updatePrice } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.updateStatePrice, (message, data) => {
    return updatePrice(data);
  });
};
