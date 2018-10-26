import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, set } from 'core/Helpers';

export const attachOptionGroup = node => {
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
    set(node, ['nodes', 'optionGroup'], {key: control, value: optionGroup});
  });

  return Promise.resolve(node);
};

export const attachOptionGroups = nodes => {
  return Promise.all(
    nodes.map(node => attachOptionGroup(node))
  );
};
