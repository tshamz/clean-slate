import dom from 'common/Dom';
import bva from 'common/Constants';

import state from 'state';

const handleQuantityChangeClick = ({ currentTarget: self, ...rest }) => {
  const change = parseInt(self.dataset.quantityChange, 10);
  const id = $(self).closest(dom.container).data('container-id');
  state.getState(id)
    .then(({ quantity: oldQuantity }) => {
      const newQuantity = oldQuantity + change;
      if (newQuantity >= 1) {
        PubSub.publish(bva.updateQuantity, { id, quantity: newQuantity });
      }
    });
  return false;
};

export const bindActions = () => {
  $(document).on('click', dom.quantityChange, handleQuantityChangeClick);
};
