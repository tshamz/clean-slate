import bva from 'core/Constants';

import { enoughInStock } from 'handlers/InventoryHandlers';
import { updateQuantity, updateQuantitySelectUI } from 'handlers/QuantitySelectHandlers';

// check if in stock
// if not, display error
// update store
// update ui

PubSub.subscribe(bva.quantityChange, (message, { node, quantity }) => {
  return enoughInStock({ node, quantity })
    .catch(err => console.log(err))
    .then(updateQuantity)
    .then(updateQuantitySelectUI)
});
