// import dom from 'common/Dom';

// export const getLineItemContainerData = () => {
//   return $(dom.lineItemContainer).get().map(lineItemContainer => {
//     const id = lineItemContainer.dataset.containerId;
//     const { data } = JSON.parse($(lineItemContainer).find(dom.lineItemData).text());
//     const { key, properties, variant: { variant: { id: variantId }, inventory }} = data;
//     const quantity = parseInt($(lineItemContainer).find(dom.quantityValue).val(), 10);
//     return { id, key, properties, variantId, quantity, inventory, data };
//   });
// };
