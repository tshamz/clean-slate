import dom from 'common/Dom';
import bva from 'common/Constants';

const handleToggleClick = ({ currentTarget: self }) => {
  const selector = self.dataset.toggle;
  const className = self.dataset.toggleClass;
  const action = self.dataset.toggleAction;
  const animated = (self.dataset.toggleAnimated == 'true');

  PubSub.publish(bva.toggleElement, { selector, className, action, animated });
};

export const bindActions = () => {
  $(dom.toggle).on('click', handleToggleClick);
};
