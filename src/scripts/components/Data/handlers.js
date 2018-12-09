import dom from 'common/Dom';

const data = {};
window._data = data;

const gatherLineItemsData = () => {
  return $(dom.lineItem).get().reduce((lineItems, lineItem) => {
    const id = lineItem.dataset.lineItemId;
    const { data } = JSON.parse($(lineItem).find(dom.lineItemData).text());
    return { ...lineItems, [id]: data };
  }, {});
};

const gatherProductsData = () => {
  return $(dom.productContainer).get().reduce((products, product) => {
    const id = product.dataset.productContainerId;
    const { data: options } = JSON.parse($(product).find(dom.optionData).text());
    const { data: variants } = JSON.parse($(product).find(dom.variantData).text());
    return { ...products, [id]: { options, variants }};
  }, {});
};

export const setLineItemsData = () => {
  data.lineItems = gatherLineItemsData();
  return data.lineItems;
};

export const setProductsData = () => {
  data.products = gatherProductsData();
  return data.products;
};

export const getLineItemsData = containerId => {
  return (containerId) ? data.lineItems[containerId] : data.lineItems;
};

export const getProductsData = containerId => {
  return (data.products) ? data.products[containerId] : data.products;
};

