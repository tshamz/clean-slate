import dom from 'common/Dom';
import { animationEnd } from 'common/Helpers';

import { bindActions } from './bindings';
import subscribers from './subscribers';

export const showModal = ({ name }) => () => {
  const selector = `[data-modal="${name}"]`;
  return new Promise(resolve => {
    animationEnd('show', selector, resolve);
    $(selector).addClass('is-active');
  });
};

export const hideModal = ({ name }) => () => {
  const selector = (name === '*') ? '[data-modal]' : `[data-modal="${name}"]`;
  return new Promise(resolve => {
    animationEnd('hide', selector, resolve);
    $(selector).removeClass('is-active');
  });
};

export const init = () => {
  bindActions();
};
