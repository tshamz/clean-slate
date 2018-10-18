import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

export const attachOptionValue = node => {
  const productContainerNodes = get(node, 'nodes');
  const optionValueControl = $(node).find(dom.optionValueControl).find('input').get();
  productContainerNodes.optionValue = [ ...optionValueControl ];
  return Promise.resolve(get(node));
};

export const attachOptionValues = containers => {
  const nodes = containers.map(container => container.get('node'));
  return Promise.all(nodes.map(node => attachOptionValue(node)));
};

// export const setOptionValueInitialState = containers => {
// };
