import 'styles/templates/toggle.scss';

export const enableToggle = ({ currentTarget: self }) => {
  const selector = $(self).data('toggle');
  $(selector).addClass('is-toggled');
};

export const disableToggle = ({ currentTarget: self }) => {
  const selector = $(self).data('toggle');
  $(selector).removeClass('is-toggled');
};

export const toggle = ({ currentTarget: self }) => {
  const selector = $(self).data('toggle');
  $(selector).toggleClass('is-toggled');
};
