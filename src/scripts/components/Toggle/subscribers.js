import bva from 'common/Constants';
import { toggleElement } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.toggleElement, (message, data) => {
    return toggleElement(data);;
  });
};
