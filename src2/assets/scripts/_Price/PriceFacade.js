import { get, set } from 'core/Helpers';

export const updatePriceUI = ({ node, variant }) => {
  const priceNodes = get(node, 'nodes.price', {values: true});
  const { prices } = variant;

  priceNodes.forEach(({price, compareAtPrice}) => {
    console.log(price);
    console.log(compareAtPriceprice);
    // price.innerText(`$${prices.price.toFixed(2)}`);
    // compareAtPrice.innerText(`$${prices.compareAtPrice.toFixed(2)}`);
  });

  console.log(variant);
  return Promise.resolve({node, variant});
};
