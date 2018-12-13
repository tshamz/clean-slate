import dom from 'common/Dom';
import bva from 'common/Constants';

import state from 'state';

const getAddToCartData = () => {
  return {
    id: 15895504420975,
    quantity: 1,
    properties: { first: 'tyler', last: 'shambora' }
  }
};

const getRemoveItemKey = self => {
  const key = $(self).closest(dom.lineItem).data('line-item-key');

  return key;
};

const handleAddToCartClick = () => {
  const { id, quantity, properties } = getAddToCartData();

  PubSub.publish(bva.addToCart, { id, quantity, properties });
};

const handleRemoveFromCartClick = ({ currentTarget: self }) => {
  const id = $(self).closest(dom.container).data('container-id');

  PubSub.publish(bva.removeFromCart, { id });
};

export const bindActions = () => {
  $(dom.addToCart).on('click', handleAddToCartClick);
  $(document).on('click', dom.removeFromCart, handleRemoveFromCartClick);
};
