import dom from 'core/Dom';

export const productContainers = new Map();

export const getProductContainer = node =>
  productContainers.get(node);

export const updateProductContainer = (a, node, [type, [dataNode, data]]) => {
  // if (productContainers.has(node)) {
    console.log(a);
    // console.log(a.has(node));
  if (a.has(node)) {
    const productContainer = productContainers.get(node);
    const map = productContainer.get(type);
    map.set(dataNode, data);
  }
  return Promise.resolve(productContainers);
};

export const registerProductContainer = (node, data = {}) => {
  return new Promise(resolve => {
    if (!productContainers.has(node)) {
      productContainers.set(node, new Map([
        ['handle', node.dataset.productContainer],
        ['sliders', new Map()],
        ['quantitySelects', new Map()],
        ['optionSelects', new Map()],
        ['addToCart', new Map()],
      ]));
    }
    resolve(productContainers);
  });
};

export const initProductContainers = async () => {
  const nodes = $(dom.productContainer).get();
  const promises = nodes.map(node => registerProductContainer(node));
  await Promise.all(promises);
  return productContainers;
};
