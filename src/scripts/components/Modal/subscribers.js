import bva from 'common/Constants';

import { showOverlay, hideOverlay } from 'components/Overlay';
import { showModal, hideModal } from 'components/Modal';

PubSub.subscribe(bva.openModal, (message, data) => {
  return showOverlay()
    .then(showModal(data))
});

PubSub.subscribe(bva.closeModal, (message, data) => {
  return Promise.all([
    hideModal(data)(),
    hideOverlay()
  ]);
});

PubSub.subscribe(bva.hideOverlay, (message, data) => {
  return hideModal({ name: '*'})();
});
