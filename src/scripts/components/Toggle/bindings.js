import { toggle } from 'components/Toggle';

export const bindUIActions = () => {
  $('[data-toggle]').on('click', toggle);
};
