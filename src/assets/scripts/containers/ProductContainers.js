import dom from 'core/Dom';
import bva from 'core/Constants';

export const productContainers = new Map();
window.p = productContainers;

export const getProductContainer = node => {
  return (productContainers.has(node))
    ? productContainers.get(node)
    : productContainers.get($(node).closest(dom.productContainer)[0]);
};

export const registerProductContainer = node => {
  const initialState = {
    node,
    store: {
      option: {
        selected: null,        // {}
        options: null,         // []
        values: null,          // []
      },
      variant: {
        selected: null,        // {}
        variantOptions: null,  // []
        variants: null,        // new Map()
      },
      lineItem: {
        key: null,             // String
        variant: null,         // {}
        properties: null,      // []
      },
      quantity: {
        current: null          // Number
      },
    },
    nodes: {
      addToCart: new Map(),
      optionGroup: new Map(),
      optionValue: new Map(),
      price: new Map(),
      quantitySelect: new Map(),
      sliders: new Map(),
    },
  };

  productContainers.set(node, initialState);

  return Promise.resolve(node);
};

export const registerProductContainers = nodes => {
  return Promise.all(
    nodes.map(node => registerProductContainer(node))
  );
};
