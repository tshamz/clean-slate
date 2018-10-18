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
      variant: {
        options: null,  // []
        variantOptions: null,  // []
        variants: null,  // new Map()
        selected: {
          variant: null,  // {}
          options: null,  // {}
        },
        lineItem: null,  // Boolean
      },
      quantity: null,  // Number
    },
    nodes: {
      addToCart: [],
      optionGroup: new Map(),
      optionValue: [],
      price: new Map(),
      quantitySelect: [],
      sliders: new Map(),
    },
  };

  const productContainer = productContainers
    .set(node, new Map([ ...Object.entries(initialState) ]))
    .get(node);

  return Promise.resolve(productContainer);
};

export const registerProductContainers = () => {
  const nodes = $(dom.productContainer).get();
  const containers = nodes.map(node => registerProductContainer(node));
  return Promise.all(containers);
};
