// import dom from 'common/Dom';

// const getInitialOptionValues = options => {
//   return options.reduce((optionValues, option) =>
//     ({ ...optionValues, [option.name]: option.initialValue }), {});
// };

// const getInitialVariantData = variants => {
//   const {variant: { id: variantId }, inventory} = variants.find(variant => variant.isInitialVariant);
//   return { variantId, inventory };
// };

// export const getProductContainerData = () => {
//   return $(dom.productContainer).get().map(productContainer => {
//     const id = productContainer.dataset.containerId;
//     const { data: options } = JSON.parse($(productContainer).find(dom.optionData).text());
//     const { data: variants } = JSON.parse($(productContainer).find(dom.variantData).text());
//     const initialOptionValues = getInitialOptionValues(options);
//     const initialVariantData = getInitialVariantData(variants);
//     const quantity = parseInt($(productContainer).find(dom.quantityValue).val(), 10);
//     return {
//       id,
//       ...initialOptionValues,
//       ...initialVariantData,
//       quantity,
//       data: { options, variants },
//     };
//   });
// };
