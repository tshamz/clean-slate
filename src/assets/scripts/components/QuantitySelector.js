import BVA from 'scripts/global/Constants';

const dom = {
  quantityControl: '[data-quantity-control]',
};

export const bindUIActions = () => {
  $(dom.quantityControl).on('click', ({ currentTarget: self }) => {
    event.preventDefault();
  });
};
