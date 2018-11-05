import dom from 'core/Dom';

import { getAlternativeTemplate } from 'core/Helpers';
import { initializeLineItemContainers } from 'containers/_InitContainers';

export const updateInlineCartUI = async () => {
  const newCart = await getAlternativeTemplate('cart', 'ajax-cart-contents');
  $(dom.inlineCartContents).html(newCart);
};

const inlineCartActionEnd = (action, resolve) => {
  $(dom.inlineCart).one('transitionend', () => {
    if (action === 'open' && $(dom.inlineCart).is('.is-open')) {
      resolve();
    } else if (action === 'close' && !$(dom.inlineCart).is('.is-open')) {
      resolve();
    }
  });
};

export const openInlineCart = () => {
  return new Promise(resolve => {
    inlineCartActionEnd('open', resolve);
    $(dom.inlineCart).addClass('is-open');
  });
};

export const closeInlineCart = () => {
  return new Promise(resolve => {
    inlineCartActionEnd('close', resolve);
    $(dom.inlineCart).removeClass('is-open');
  });
};
