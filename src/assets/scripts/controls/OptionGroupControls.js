import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, } from 'core/Helpers';

export const attachOptionGroup = node => {
  const optionGroupControls = $(node).find(dom.optionGroupControl).get();
  const optionGroupNodes = get(node, ['nodes', 'optionGroup']);

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
    optionGroupNodes.set(control, optionGroup);
  });

  // return Promise.resolve(get(node));
  return Promise.resolve(node);
};

// export const attachOptionGroups = containers => {
export const attachOptionGroups = nodes => {
  // const nodes = containers.map(({ node }) => node);
  return Promise.all(
    nodes.map(node => attachOptionGroup(node))
  );
};
