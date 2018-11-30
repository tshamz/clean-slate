import dom from 'common/Dom';
import { animationEnd } from 'common/Helpers';

import { bindActions } from './bindings';
import subscribers from './subscribers';

export const showOverlay = () => {
  return new Promise(resolve => {
    animationEnd('show', dom.overlay, resolve);
    $(dom.overlay).addClass('is-active');
  });
};

export const hideOverlay = () => {
  return new Promise(resolve => {
    animationEnd('hide', dom.overlay, resolve);
    $(dom.overlay).removeClass('is-active');
  });
};


export const init = () => {
  bindActions();
};
