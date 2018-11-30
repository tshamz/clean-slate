import dom from 'common/Dom';
import bva from 'common/Constants';

const handleToggleClick = ({ currentTarget: self }) => {
  const selector = self.dataset.toggle;
  const className = self.dataset.toggleClass;
  PubSub.publish(bva.toggleElement, { selector, className });
};

export const bindActions = () => {
  $(dom.toggle).on('click', handleToggleClick);
};
