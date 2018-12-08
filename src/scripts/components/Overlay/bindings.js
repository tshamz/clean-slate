import dom from 'common/Dom';
import bva from 'common/Constants';

const handleOverlayClick = ({ currentTarget: self }) => {
  const origin = self
  const initiator = 'click';
  PubSub.publish(bva.hideOverlay, { origin, initiator });
};

export const bindActions = () => {
  $(dom.overlay).on('click', handleOverlayClick);
};
