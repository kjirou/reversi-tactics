/*
 * Generate transitions for react-late-arrival
 * @param {Object} defaultProps
 * @param {Array<Object>} transitionDiffs
 * @return {Array<Object>}
 */
export const generateTransitions = (defaultProps, transitionDiffs) => {
  let currentProps = Object.assign({}, defaultProps);
  return transitionDiffs.map(diff => {
    const duration = diff.duration || 0;
    const diffProps = {};
    Object.keys(diff).forEach(key => {
      if (key !== 'duration') {
        diffProps[key] = diff[key];
      }
    });
    currentProps = Object.assign({}, currentProps, diffProps, {
      duration,
    });
    return currentProps;
  });
};

export const generateAnimatedIconTransitions = (props, transitionType, options = {}) => {
  options = Object.assign({
    delay: null,
    hpDelta: 0,
  }, options);
  const isDamage = options.hpDelta < 0;

  // TODO: define "slash" as constants
  const transitions = {
    crossed_slash: [
      { duration: 50, flipIconId: 'red_slash_1' },
      { duration: 100, flipIconId: 'red_slash_2' },
      { duration: 50, flipIconId: 'red_slash_1' },
      { duration: 50, flipIconId: null },
      { duration: 50, flipIconId: 'reversed_red_slash_1' },
      { duration: 100, flipIconId: 'reversed_red_slash_2' },
      { duration: 50, flipIconId: 'reversed_red_slash_1' },
    ],
    slash: [
      { duration: 50, flipIconId: 'red_slash_1' },
      { duration: 100, flipIconId: 'red_slash_2' },
      { duration: 50, flipIconId: 'red_slash_1' },
    ],
  }[transitionType];

  if (options.delay !== null) {
    transitions.unshift({ duration: options.delay });
  }

  return generateTransitions(props, transitions);
};
