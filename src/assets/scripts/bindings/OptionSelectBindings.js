import dom from 'core/Dom';
import BVA from 'core/Constants';

export const bindUIActions = () => {
  $(dom.optionGroup).on('change', ({ currentTarget: self, target }) => {
    const node = $(self).closest('[data-product-container]').get(0);
    const { name, value } = target;
    PubSub.publish(BVA.optionValueChange, { node, name, value });
  });
};
