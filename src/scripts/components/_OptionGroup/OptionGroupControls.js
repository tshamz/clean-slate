import dom from 'core/Dom';
import bva from 'core/Constants';

import { set } from 'core/Helpers';

export const attachOptionGroups = node => {
  const optionGroupControls = $(node).find(dom.optionGroupControl).get();

  optionGroupControls.forEach(control => {
    const name = control.dataset.optionGroupControl;
    const selectedValueNode = $(control).find(dom.optionGroupSelectedValue)[0];
    const optionGroup = {
      name,
      nodes: {
        self: control,
        selectedValue: selectedValueNode
      }
    };
    set(node, ['nodes', 'optionGroup', control], optionGroup);
  });

  return Promise.resolve(node);
};
