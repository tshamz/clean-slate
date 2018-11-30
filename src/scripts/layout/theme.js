import 'styles/theme.scss';
import 'styles/theme.scss.liquid';

import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';

import { init as OverlayInit } from 'components/Overlay';
import { init as ToggleInit } from 'components/Toggle';
import { init as ModalInit } from 'components/Modal';


// Common a11y fixes
focusHash();
bindInPageLinks();


document.addEventListener('DOMContentLoaded', async () => {
  OverlayInit();
  ToggleInit();
  ModalInit();
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
