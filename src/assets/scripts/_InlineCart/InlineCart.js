import bva from 'core/Constants';

import { showOverlay, hideOverlay, } from 'handlers/OverlayHandlers';
import { openInlineCart, closeInlineCart, } from 'handlers/InlineCartHandlers';

PubSub.subscribe(bva.openInlineCart, (message, data) =>
  showOverlay()
  .then(openInlineCart));

PubSub.subscribe(bva.closeInlineCart, (message, data) =>
  closeInlineCart()
  .then(hideOverlay));
