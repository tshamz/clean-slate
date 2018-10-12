import dom from 'core/Dom';

import { getCurrentQuantity, updateQuantitySelectContainer } from 'containers/QuantitySelectContainers'

// export const handleQuantityChange = (node, {quantity}) => {
export const handleQuantityChange = (container, data) => {
  // updateQuantitySelectContainer(node, ['quantity', quantity]);
  updateQuantitySelectContainer(container, data);

  // check if there's enough in stock
  //   if not display error
  // update input
  // optionally display message like "only 5 more in stock"

  // getQuantityContainer(node)
};
