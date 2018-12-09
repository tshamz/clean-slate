import bva from 'common/Constants';
import { addToCart, removeFromCart, cartRequestSuccess } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.addToCart, (message, data) => {
    return addToCart(data);
  });

  PubSub.subscribe(bva.removeFromCart, (message, data) => {
    return removeFromCart(data);
  });

  PubSub.subscribe(bva.cartRequestSuccess, (message, data) => {
    return cartRequestSuccess(data);
  });
};
