import bva from 'common/Constants';

import { hideOverlay } from './';

PubSub.subscribe(bva.hideOverlay, (message, data) => {
  return hideOverlay(data);
});
