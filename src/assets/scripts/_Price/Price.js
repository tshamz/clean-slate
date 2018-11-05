import bva from 'core/Constants';

import { updatePriceUI } from 'handlers/PriceHandlers';

PubSub.subscribe(bva.updateSelectedVariant, (message, data) => {

});
