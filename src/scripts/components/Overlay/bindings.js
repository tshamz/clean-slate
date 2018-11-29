import dom from 'common/Dom';
import { hideOverlay } from './handlers';

export const bindActions = () => {
  $(dom.overlay).on('click', hideOverlay);
};
