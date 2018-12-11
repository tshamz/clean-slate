import dom from 'common/Dom';
import bva from 'common/Constants';

import state from 'state';

const handleQuantityChangeClick = ({ currentTarget: self }) => {
  const change = parseInt(self.dataset.quantityChange, 10);

  PubSub.publish(bva.toggle, {});
};

export const bindActions = () => {
  $(dom.quanityChange).on('click', handleQuantityChangeClick);
};
