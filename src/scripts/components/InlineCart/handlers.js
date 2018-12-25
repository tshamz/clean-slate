import dom from 'common/Dom';
import bva from 'common/Constants';
import { toggleElement } from 'common/Helpers';

export const openInlineCart = data => {
  const action = 'add';
  const animated = true;

  // await toggleElement({ selector: dom.overlay, action, animated });
  // return toggleElement({ selector: dom.inlineCart, action, animated });

  return toggleElement({ selector: dom.overlay, action, animated })
    .then(() => toggleElement({ selector: dom.inlineCart, action, animated }));
};

export const closeInlineCart = data => {
  const action = 'remove';
  const animated = true;

  // await toggleElement({ selector: dom.inlineCart, action, animated });
  // return toggleElement({ selector: dom.overlay, action, animated });

  return toggleElement({ selector: dom.inlineCart, action, animated })
    .then(() => toggleElement({ selector: dom.overlay, action, animated }));
};

export const toggleInlineCart = data => {
  const inlineCartOpen = $(dom.inlineCart).is(dom.isActive);
  return (inlineCartOpen) ? closeInlineCart(data) : openInlineCart(data);
};
