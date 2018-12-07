import dom from 'common/Dom';
import bva from 'common/Constants';
import { toggleInlineCart } from './handlers';
import subscribers from './subscribers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.toggleInlineCart, (message, data) => {
    return toggleInlineCart(data)
  });
};
