import dom from 'core/Dom';
import bva from 'core/Constants';

export const bindUIActions = () => {
  $(dom.optionGroupContainer).on('change', event => {
    const { currentTarget: container, currentTarget: { name, value }} = event;
    PubSub.publish(bva.optionValueChange, { container, name, value });
  });
};
