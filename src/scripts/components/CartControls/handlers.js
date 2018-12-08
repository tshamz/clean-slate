import { addItem, removeItem } from '@shopify/theme-cart';

import bva from 'common/Constants';
// import { openInlineCart } from 'components/InlineCart/handlers';

export const addToCart = async ({ id, ...rest }) => {
  await addItem(id, rest);
  PubSub.publish(bva.openInlineCart);
  // return openInlineCart();
};

export const removeFromCart = async ({ key }) => {
  await removeItem(key);
  PubSub.publish(bva.openInlineCart);
  // return openInlineCart();
};
