import bva from 'common/Constants';
import { showModal } from './handlers';

export const initSubscribers = () => {
  PubSub.subscribe(bva.showModal, (message, data) => {
    return showModal(data);
  });
};
