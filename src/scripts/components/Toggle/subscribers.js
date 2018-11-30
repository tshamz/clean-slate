import bva from 'common/Constants';

import { toggleElement } from './';

PubSub.subscribe(bva.toggleElement, (message, data) => {
  return toggleElement(data);;
});
