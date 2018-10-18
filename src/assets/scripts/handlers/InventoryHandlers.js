import { get } from 'core/Helpers';

export const enoughInStock = ({ node, quantity }) => {
  const { inventory } = get(node, 'store', 'variant', 'selected');
  return new Promise((resolve, reject) => {
    if (quantity < 1) {
      resolve({ node, quantity: 1 });
    } else if (!inventory || inventory >= quantity) {
      resolve({ node, quantity });
    } else {
      reject({ node, inventory });
    }
  });
};
