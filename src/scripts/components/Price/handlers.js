import dom from 'common/Dom';
import bva from 'common/Constants';

export const updatePrice = data => {
  const { id, data: { price, compare_at_price }} = data;

  const $price = dom.$getContainer(id).find(dom.price);
  const $compareAtPrice = dom.$getContainer(id).find(dom.compareAtPrice);

  if ($price.data('price-range') !== true) {
    $price.text(dom.priceString`${price}`);
  }

  if ($compareAtPrice.data('price-range') !== true) {
    const compareAtPriceText = (compare_at_price == null) ? '' : dom.priceString`${compare_at_price}`;
    $compareAtPrice.text(compareAtPriceText);
  }
};
