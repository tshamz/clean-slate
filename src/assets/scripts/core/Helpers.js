import bva from 'core/Constants';

import { productContainers, getProductContainer } from 'containers/ProductContainers';
import { variantContainers } from 'containers/VariantContainers';
import { sliderContainers } from 'containers/SliderContainers';

const containers = {
  product: productContainers,
  variant: variantContainers,
  slider: sliderContainers,
};

export const getAlternativeTemplate = async (resource, templateName, json = false) => {
  const url = `/${resource}?view=${templateName}`;
  const options = { credentials: 'include' };
  return await fetch(url, options).then(res => (json) ? res.json() : res.text());
};

export const unique = array => {
  return [ ...new Set(array)];
};

export const updateState = (node, type, updates) => {
  const state = containers[type].get(node);
  return Object.entries(updates).reduceRight((_, update, index) => state.set(...update), state);
};

export const getContainer = (type, node) => {
  return containers[type].get(node);
};

export const get = (node, ...rest) => {
  return rest.reduce((current, next)=> {
    switch (true) {
      case current instanceof Map:
        return (current.has(next)) ? current.get(next) : current;
      case current instanceof Array:
        return current.map(item => {
          if (item instanceof Map) {
            return item.get(next);  // possibly return current instead
          } else if (item instanceof Object) {
            return item[next];
          } else {
            return item;
          }
        })
      case current instanceof Object:
        return (current[next]) ? current[next] : current;
      default:
        return current;
    }
  }, getProductContainer(node));
};

export const registerContainer = (node, type, initialState, productContainerNode) => {
  const container = containers[type];

  if (!container.has(node)) {
    const state = container
      .set(node, new Map([ ...Object.entries(initialState) ]))
      .get(node);

    const productContainer = productContainers.get(productContainerNode);

    if (productContainer) {
      state.set('product', productContainer);
      switch (type) {
        case 'product':
          return state.set('node', node);
        case 'variant':
          return productContainer
            .set(type, state)
            .get(type);
        case 'addToCart':
        case 'optionGroup':
        case 'price':
        case 'quantitySelect':
        case 'slider':
          return productContainer
            .get(type)
            .get('nodes')
            .set(node, state)
            .get(node);
        default:
          throw new Error(`container of type: ${type} doesn't exist.`);
      }
    }

    return state;
  }

  console.log(`
    container of type: ${type}
    at node: ${node}
    already registered to product-container: ${productContainer}
  `);

  return container.get(node);
};
