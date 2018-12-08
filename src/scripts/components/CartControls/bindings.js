import dom from 'common/Dom';
import bva from 'common/Constants';

const getAddToCartData = () => {
  return {
    id: 15895504420975,
    quantity: 1,
    properties: { first: 'tyler', last: 'shambora' }
  }
};

const handleAddToCartClick = () => {
  const origin = self
  const initiator = 'click';
  const item = getAddToCartData();
  PubSub.publish(bva.addToCart, item);
};

const handleRemoveFromCartClick = ({ currentTarget: self }) => {
  const origin = self
  const initiator = 'click';
  const key = self.dataset.removeFromCart;
  PubSub.publish(bva.removeFromCart, { key });
};

export const bindActions = () => {
  $(dom.addToCart).on('click', handleAddToCartClick);
  $(dom.removeFromCart).on('click', handleRemoveFromCartClick);
};
