import dom from 'common/Dom';
import bva from 'common/Constants';

const handleOptionValueClick = ({ currentTarget: self })=> {
  const id = $(self).closest(dom.productContainer).data('container-id');

  PubSub.publish(bva.updateOptionGroupValue, { id, [self.name]: self.value });
};

export const bindActions = () => {
  $(dom.optionValue).on('click', handleOptionValueClick)
};
