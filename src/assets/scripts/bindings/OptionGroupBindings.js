import dom from 'core/Dom';
import bva from 'core/Constants';

export const bindUIActions = () => {
  $(dom.optionGroupContainer).on('change', event => {
    const { currentTarget: node, target: { value }} = event;
    PubSub.publish(bva.optionValueChange, { node, value });
  });
};
