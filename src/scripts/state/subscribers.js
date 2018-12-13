import bva from 'common/Constants';
import { init, setState } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.updateCart, (message, data) => {
    return init(data);
  });

  PubSub.subscribe(bva.updateOptionGroupValue, (message, data) => {
    return setState(data);
  });

  PubSub.subscribe(bva.updateQuantity, (message, data) => {
    return setState(data);
  });
};
