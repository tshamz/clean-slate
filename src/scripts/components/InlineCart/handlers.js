import dom from 'common/Dom';
import bva from 'common/Constants';
import { toggleElement } from 'components/Toggle/handlers';

export const openInlineCart = async data => {
  await toggleElement({ selector: dom.overlay, action: 'add', animated: true, ...data });
  return toggleElement({ selector: dom.inlineCart, action: 'add', animated: true, ...data });
};

export const closeInlineCart = async data => {
  await toggleElement({ selector: dom.inlineCart, action: 'remove', animated: true, ...data });
  return toggleElement({ selector: dom.overlay, action: 'remove', animated: true, ...data });
};

export const toggleInlineCart = async data => {
  const inlineCartOpen = $(dom.inlineCart).is(dom.isActive);
  return (inlineCartOpen) ? closeInlineCart(data) : openInlineCart(data);
};
