import bva from 'common/Constants';
import { updateSlides, } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.updateOptionGroupValue, (message, data) => {
    return updateSlides(data);
  });
};
