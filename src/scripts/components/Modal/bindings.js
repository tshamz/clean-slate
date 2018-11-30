import dom from 'common/Dom';
import bva from 'common/Constants';

const handleOpenModalClick = ({ currentTarget: self }) => {
  const name = self.dataset.openModal;
  PubSub.publish(bva.openModal, { name });
};

const handleCloseModalClick = ({ currentTarget: self }) => {
  const name = self.dataset.closeModal;
  PubSub.publish(bva.closeModal, { name });
};

export const bindActions = () => {
  $(dom.openModal).on('click', handleOpenModalClick);
  $(dom.closeModal).on('click', handleCloseModalClick);
};
