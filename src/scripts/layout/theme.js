import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';

import 'lazysizes';
// import 'lazysizes/plugins/object-fit/ls.object-fit';
// import 'lazysizes/plugins/parent-fit/ls.parent-fit';
// import 'lazysizes/plugins/rias/ls.rias';
// import 'lazysizes/plugins/bgset/ls.bgset';
// import 'lazysizes/plugins/blur-up/ls.blur-up';
// import 'lazysizes/plugins/respimg/ls.respimg';

import 'styles/theme.scss';
import 'styles/theme.scss.liquid';


import Toggle from 'components/Toggle';
import Overlay from 'components/Overlay';
import InlineCart from 'components/InlineCart';
import CartControls from 'components/CartControls';

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
