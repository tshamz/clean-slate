import dom from 'common/Dom';
import bva from 'common/Constants';
import { hideOverlay } from './handlers';
import subscribers from './subscribers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.hideOverlay, (message, data) => {
    PubSub.publish(bva.toggleElement, { selector: dom.overlay, ...data });
  });
};
