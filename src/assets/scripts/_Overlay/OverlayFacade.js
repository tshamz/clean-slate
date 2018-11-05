import dom from 'core/Dom';

const overlayActionEnd = (action, resolve) => {
  $(dom.overlay).one('transitionend', () => {
    if (action === 'show' && $(dom.overlay).is('.is-active')) {
      resolve();
    } else if (action === 'hide' && !$(dom.overlay).is('.is-active')) {
      resolve();
    }
  });
};

export const showOverlay = () => {
  return new Promise(resolve => {
    overlayActionEnd('show', resolve);
    $(dom.overlay).addClass('is-active');
  });
};

export const hideOverlay = () => {
  return new Promise(resolve => {
    overlayActionEnd('hide', resolve);
    $(dom.overlay).removeClass('is-active');
  });
};
