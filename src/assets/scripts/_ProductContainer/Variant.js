import bva from 'core/Constants';

import { updatePriceUI } from 'handlers/PriceHandlers';

// update in stock on addToCart  <-- should be done in Variant.js subscriber

PubSub.subscribe(bva.updateSelectedVariant, (message, data) => {
  return updatePriceUI(data)
    .catch(err => console.error(err));
});
