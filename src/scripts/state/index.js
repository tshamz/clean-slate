import dom from 'common/Dom';

import { initSubscribers } from './subscribers';
import { init, getState, setState } from './handlers';

export const state = {};
window._s = state;

export default {
  initSubscribers,
  init,
  getState,
  setState,
};
