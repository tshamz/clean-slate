import 'lazysizes';
import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';

import Toggle from 'components/Toggle';
import Overlay from 'components/Overlay';
import InlineCart from 'components/InlineCart';
import CartControls from 'components/CartControls';
import Data from 'components/Data';

import 'styles/theme.scss';
import 'styles/theme.scss.liquid';

// Common a11y fixes
focusHash();
bindInPageLinks();

CartControls.cacheCart();

document.addEventListener('DOMContentLoaded', async () => {
  CartControls.initSubscribers();
  CartControls.bindActions();

  Toggle.initSubscribers();
  Toggle.bindActions();

  Overlay.initSubscribers();
  Overlay.bindActions();

  InlineCart.initSubscribers();
  InlineCart.bindActions();

  Data.initSubscribers();
  Data.setLineItemsData();
  Data.setProductsData();
});

window.addEventListener('load', () => {

});

PubSub.subscribe('BVA', (message, data) => console.log(message, data));

// HMR
// if (module.hot) {
//   module.hot.accept();
// }

// if (module.hot) {
//   module.hot.dispose(() => {
//     // reset/undo the behavior/side effect that as possibly enabled/enacted

//   });
// }
