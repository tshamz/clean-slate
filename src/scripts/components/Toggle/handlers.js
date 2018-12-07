const checkIfPossibleAction = (selector, className, action) => {
  const impossibleAdd = $(selector).is(`.${className}`) && action == 'add';
  const impossibleRemove = !$(selector).is(`.${className}`) && action == 'remove';

  return (impossibleAdd || impossibleRemove) ? false : true;
};

const toggleClass = (selector, className, action) => {
  if (action === 'toggle') {
    $(selector).toggleClass(className);
  } else if (action === 'add') {
    $(selector).addClass(className);
  } else if (action === 'remove') {
    $(selector).removeClass(className);
  }
};

const animationEnd = (selector, className, action, resolve) => {
  $(selector).one('transitionend', () => {
    resolve({ selector, className, action });
  });
};

export const toggleElement = ({selector, className = 'is-active', action = 'toggle', animated = false}) => {
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
