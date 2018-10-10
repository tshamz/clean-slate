import 'styles/theme.scss';
import 'styles/theme.scss.liquid';

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/blur-up/ls.blur-up';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';
import { cookiesEnabled } from '@shopify/theme-cart';

import 'global/Events';

import { initProductContainers } from 'components/ProductContainers';
import { initSliders } from 'components/Sliders';

import { bindUIActions as AddToCartEventBindings } from 'components/CartEventBindings';
import { bindUIActions as OptionGroupEventBindings } from 'components/OptionGroupBindings';

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (cookiesEnabled()) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}

document.addEventListener('DOMContentLoaded', async () => {
  AddToCartEventBindings();
  OptionGroupEventBindings();

  window.productContainers = initProductContainers();

  // initSliders('*');
  initSliders('topbar');
});

window.addEventListener('load', () => {

});


// HMR
if (module.hot) {
  module.hot.accept();
}

if (module.hot) {
  module.hot.dispose(() => {
    // reset/undo the behavior/side effect that as possibly enabled/enacted
  });
}
