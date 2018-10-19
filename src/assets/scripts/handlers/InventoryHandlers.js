import { get } from 'core/Helpers';

export const getOutOfStockOptionValues = node => {
  const selectedOptions = get(node, ['store', 'variant', 'selected', 'options']);
  const optionGroupValues = get(node, ['store', 'option', 'values']);
  return optionGroupValues.filter(({ name, value, variants }) =>
    variants.filter(({ options }) =>
      Object.entries({ ...selectedOptions, [name]: value })
        .every(([ name, value ]) => options[name] === value))
        .every(variant => !variant.available));
};

export const enoughInStock = ({ node, quantity }) => {
  const { inventory, inventoryPolicy } = get(node, ['store', 'variant', 'selected']);
  return new Promise((resolve, reject) => {
    if (quantity < 1) {
      resolve({ node, quantity: 1 });
    } else if (!inventory || inventoryPolicy === 'continue' || inventory >= quantity) {
      resolve({ node, quantity });
    } else {
      reject({ node, inventory });
    }
  });
};
