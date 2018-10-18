import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

export const attachOptionGroup = node => {
  const optionGroupNodes = get(node, 'nodes', 'optionGroup');
  const optionGroupContainers = $(node).find(dom.optionGroupControl).get();

  optionGroupContainers.forEach(container => {
    const optionValueControls = $(container).find(dom.optionValueControl).get();
    const selectedValueNode = $(container).find(dom.optionGroupSelectedValue)[0];
    const optionGroup = {
      optionValueControls,
      ...(selectedValueNode ? { selectedValueNode } : {}),
    };
    optionGroupNodes.set(container, optionGroup);
  });

  return Promise.resolve(get(node));
};

export const attachOptionGroups = containers => {
  const nodes = containers.map(container => container.get('node'));
  return Promise.all(nodes.map(node => attachOptionGroup(node)));
};
