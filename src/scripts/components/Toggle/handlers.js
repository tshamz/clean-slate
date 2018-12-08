import dom from 'common/Dom';
import bva from 'common/Constants';

const checkIfPossibleAction = (selector, className, action) => {
  const impossibleAdd = $(selector).is(className) && action == 'add';
  const impossibleRemove = !$(selector).is(className) && action == 'remove';

  return !impossibleAdd && !impossibleRemove;
};

const toggleClass = (selector, className, action) => {
  const normalizedClassName = (className[0] === '.') ? className.slice(1) : className;
  if (action === 'toggle') {
    $(selector).toggleClass(normalizedClassName);
  } else if (action === 'add') {
    $(selector).addClass(normalizedClassName);
  } else if (action === 'remove') {
    $(selector).removeClass(normalizedClassName);
  }
};

const animationEnd = (selector, className, action, resolve) => {
  $(selector).one('transitionend', () => {
    PubSub.publish(bva.animationEnd, { selector, className, action });
    resolve({ selector, className, action });
  });
};

export const toggleElement = ({selector, className = dom.isActive, action = 'toggle', animated = false}) => {
  const isPossibleAction = checkIfPossibleAction(selector, className, action);

  if (!isPossibleAction) {
    return Promise.resolve({});
  }

  if (animated) {
    return new Promise(resolve => {
      animationEnd(selector, className, action, resolve);
      toggleClass(selector, className, action);
    });
  }

  toggleClass(selector, className, action);
  return Promise.resolve({ selector, className, action });
};
