import dom from 'common/Dom';
import bva from 'common/Constants';

const handleOptionValueClick = ({ currentTarget: self })=> {
  const containerId = $(self).closest(dom.productContainer).data('product-container-id');
  const newState = { [self.name]: self.value };

  PubSub.publish(bva.updateOptionGroupValue, { containerId, newState });
};

export const bindActions = () => {
  $(dom.optionValue).on('click', handleOptionValueClick)
};
