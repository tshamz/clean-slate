import dom from 'common/Dom';
import bva from 'common/Constants';
import { toggleElement } from 'components/Toggle/handlers';

export const openInlineCart = async () => {
  await toggleElement({ selector: dom.overlay, animated: true });
  return toggleElement({ selector: dom.inlineCart, animated: true });
};

export const closeInlineCart = async () => {
  await toggleElement({ selector: dom.inlineCart, animated: true });
  return toggleElement({ selector: dom.overlay, animated: true });
};

export const toggleInlineCart = async () => {
  const inlineCartOpen = $(dom.inlineCart).is('.is-active');
  return (inlineCartOpen) ? closeInlineCart() : openInlineCart();
};
