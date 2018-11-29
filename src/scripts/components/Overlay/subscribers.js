import bva from 'core/Constants';

PubSub.subscribe(bva.addToCartRequest, (message, { node, ...item }) => {
  return addItemToCart(item)
    .then(addToCartSuccess)
    .catch(cartError('add to cart request'));
});
