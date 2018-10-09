let productContainers;

export const getProductContainer = node => productContainers.get(node);

export const updateProductContainer = (node, newData) => {
  const oldData = productContainers.get(node) || {};
  productContainers.set(node, { ...oldData, ...newData });
  return Promise.resolve(node);
};

export const initProductContainers = async () => {
  const productContainerNodes = $('[data-product-container]').get();
  const keyVal = productContainerNodes.map(node => [node, { handle: node.dataset.productContainer }]);
  productContainers = new Map(keyVal);
  return productContainers;
};
