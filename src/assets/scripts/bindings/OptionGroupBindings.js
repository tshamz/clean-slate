import dom from 'core/Dom';
import bva from 'core/Constants';

export const bindUIActions = () => {
  $(dom.optionGroupControl).on('change', event => {
    const { currentTarget: node, target: { name, value }} = event;

    PubSub.publish(bva.optionValueChange, { node, name, value });
  });
};
