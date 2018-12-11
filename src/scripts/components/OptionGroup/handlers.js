import dom from 'common/Dom';
import bva from 'common/Constants';

export const updateOptionGroupSelectedText = data => {
  const { containerId, newState } = data;
  Object.entries(newState).forEach(([name, value]) => {
    $(`[data-product-container-id="${containerId}"] [data-option-group="${name}"] ${dom.selectedOptionValue}`).text(value);
  });
};
