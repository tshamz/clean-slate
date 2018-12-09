import bva from 'common/Constants';
import { addToCart, removeFromCart, updateInlineCartUI } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.addToCart, (message, data) => {
    return addToCart(data);
  });

  PubSub.subscribe(bva.removeFromCart, (message, data) => {
    return removeFromCart(data);
  });
};
