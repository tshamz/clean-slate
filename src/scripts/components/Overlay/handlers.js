import dom from 'common/Dom';
import bva from 'common/Constants';
import { toggleElement } from 'components/Toggle/handlers';

export const showOverlay = data => {
  const toggleData = { selector: dom.overlay, action: 'add', animated: true, ...data };
  PubSub.publish(bva.toggleElement, toggleData);
  // return toggleElement({ selector: dom.overlay, action: 'add', animated: true, ...data });
};

export const hideOverlay = data => {
  const toggleData = { selector: dom.overlay, action: 'remove', animated: true, ...data };
  PubSub.publish(bva.toggleElement, toggleData);
  // return toggleElement({ selector: dom.overlay, action: 'remove', animated: true, ...data });
};

export const toggleOverlay = data => {
  const overlayActive = $(dom.overlay).is(dom.isActive);
  return (overlayActive) ? hideOverlay(data) : showOverlay(data);
};
