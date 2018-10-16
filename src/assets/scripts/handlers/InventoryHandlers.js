import { getProductContainer } from 'containers/ProductContainers';
import { variantContainers } from 'containers/VariantContainers';

import { getSelectedVariant } from 'handlers/VariantHandlers';

export const enoughInStock = (node, { quantity }) => {
  const { inventory } = getSelectedVariant(node);
  return new Promise((resolve, reject) => {
    if (quantity < 1) {
      resolve({ quantity: 1 });
    } else if (!inventory || inventory >= quantity) {
      resolve({ quantity });
    } else {
      reject({ inventory });
    }
  });
};
