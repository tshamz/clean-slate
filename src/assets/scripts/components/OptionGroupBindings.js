import BVA from 'scripts/global/Constants';

const dom = {
  optionGroup: '[data-option-group]',
  optionValue: '[data-option-value]',
  optionValueLabel: '[data-option-value] .oo-label',
};

export const bindUIActions = () => {
  $(dom.optionGroup).on('change', ({ currentTarget: self, target }) => {
    const node = $(self).closest('[data-product-container]').get(0);
    const { name, value } = target;
    PubSub.publish(BVA.optionValueChange, { node, name, value });
  });
};
