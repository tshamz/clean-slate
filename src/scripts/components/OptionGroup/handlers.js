import dom from 'common/Dom';
import bva from 'common/Constants';

export const updateOptionGroupSelectedText = data => {
  const { id, ...newState } = data;
  Object.entries(newState).forEach(([name, value]) => {
    dom.$getContainer(id).find(`[data-option-group="${name}"] ${dom.selectedOptionValue}`).text(value);
  });
};
