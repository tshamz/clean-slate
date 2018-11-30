import dom from 'common/Dom';

import { bindActions } from './bindings';
import subscribers from './subscribers';

export const toggleElement = ({selector, className = 'is-active'}) => {
  $(selector).toggleClass(className);
  return Promise.resolve();
};

export const init = () => {
  bindActions();
};
