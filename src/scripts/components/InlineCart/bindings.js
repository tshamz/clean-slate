import dom from 'common/Dom';
import bva from 'common/Constants';

const handleToggleInlineCartClick = () => {
  const origin = self
  const initiator = 'click';
  PubSub.publish(bva.toggleInlineCart, { origin, initiator });
};

export const bindActions = () => {
  $(dom.toggleInlineCart).on('click', handleToggleInlineCartClick)
};
