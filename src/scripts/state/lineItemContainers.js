import dom from 'common/Dom';

const state = {};

const getContainerData = () => {
  return $(dom.lineItem).get().reduce((lineItems, lineItem) => {
    const id = lineItem.dataset.lineItemId;
    const { data } = JSON.parse($(lineItem).find(dom.lineItemData).text());
    return { ...lineItems, [id]: data };
  }, {});
};

const getState = containerId => {
  return (containerId) ? state.containers[containerId] : state.containers;
};

export const setState = data => {
  if (data) {
    const { containerId, newState } = data;
    const oldState = state.containers[containerId];
    state.containers[containerId] = { ...oldState, ...newState };
  } else {
    state.data = getContainerData();
    state.containers = Object.entries(state.data).reduce((state, [containerId, { key, properties, variant }]) => {
      const id = variant.variant.id;
      const inventory = variant.inventory;
      const stateObject = { key, properties, id, inventory };
      return { ...state, [containerId]: stateObject };
    }, {});
  }

  return state;
};

export default {
  getState,
  setState,
};
