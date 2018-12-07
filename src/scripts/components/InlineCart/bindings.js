import dom from 'common/Dom';
import bva from 'common/Constants';

const handleToggleInlineCartClick = () => {
  PubSub.publish(bva.toggleInlineCart, {})
};

export const bindActions = () => {
  $(dom.toggleInlineCart).on('click', handleToggleInlineCartClick)
};
