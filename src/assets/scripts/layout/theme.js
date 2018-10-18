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

import 'core/Events';

import { bindUIActions } from 'bindings/_GlobalUIActions';
import { initContainers } from 'containers/_InitContainers';

// Common a11y fixes
focusHash();
bindInPageLinks();


document.addEventListener('DOMContentLoaded', async () => {
  initContainers();
  bindUIActions();
});

window.addEventListener('load', () => {

});


// HMR
// if (module.hot) {
//   module.hot.accept();
// }

// if (module.hot) {
//   module.hot.dispose(() => {
//     // reset/undo the behavior/side effect that as possibly enabled/enacted

//     // $('*').unbind();
//     // PubSub.clearAllSubscriptions();


//     // bindUIActions();
//     // initContainers();
//   });
// }
