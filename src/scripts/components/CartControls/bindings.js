import dom from 'common/Dom';
import bva from 'common/Constants';

import state from 'state';

const handleAddToCartClick = ({ currentTarget: self }) => {
  const id = $(self).closest(dom.container).data('container-id');
  const { variantId, quantity, properties } = state.getState(id);

  PubSub.publish(bva.addToCart, { id: variantId, quantity, properties });

  return false;
};

const handleRemoveFromCartClick = ({ currentTarget: self }) => {
  const id = $(self).closest(dom.container).data('container-id');
  const { key } = state.getState(id);

  PubSub.publish(bva.removeFromCart, { key });

  return false;
};

export const bindActions = () => {
  $(dom.addToCart).on('click', handleAddToCartClick);
  $(document).on('click', dom.removeFromCart, handleRemoveFromCartClick);
};
