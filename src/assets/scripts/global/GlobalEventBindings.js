import { bindUIActions as AddToCartEventBindings } from 'components/CartEventBindings';

document.addEventListener('DOMContentLoaded', async () => {
  AddToCartEventBindings();
  console.log(`done`);
});

window.addEventListener('load', () => {

});
