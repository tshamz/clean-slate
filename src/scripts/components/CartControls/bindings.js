import dom from 'common/Dom';
import bva from 'common/Constants';

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
  const key = getRemoveItemKey(self);
  console.log(key);

  PubSub.publish(bva.removeFromCart, { key });
};

export const bindActions = () => {
  $(dom.addToCart).on('click', handleAddToCartClick);
  $(document).on('click', dom.removeFromCart, handleRemoveFromCartClick);
};
