import dom from 'core/Dom';
import BVA from 'core/Constants';

export const quantityContainers = new Map();

export const getCurrentQuantity = container => {
  return $(container).find(dom.quantityValue).val();
};

export const getQuantityContainer = node =>
  quantityContainers.get(node);

export const updateQuantityContainer = (node, newData) => {
  const oldData = quantityContainers.get(node) || {};
  quantityContainers.set(node, { ...oldData, ...newData });
  return Promise.resolve(node);
};

export const registerQuantityContainer = (node, data = {}) => {
  return Promise.resolve(
    (quantityContainers.has(node))
    ? quantityContainers
    : quantityContainers.set(node, { currentQuantity: getCurrentQuantity(node), ...data })
  );
};

export const initQuantityContainers = () => {
  return Promise.all(
    $(dom.quantityContainer).get().map(node => registerQuantityContainer(node))
  );
};
