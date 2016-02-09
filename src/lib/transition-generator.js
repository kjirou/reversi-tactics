import { toSignedNumber } from '@kjirou/utils';
import { generateTransition } from 'react-flip-book';


export const generateAnimatedIconTransition = (defaultProps, transitionType, options = {}) => {
  options = Object.assign({
    delay: null,
    hpDelta: 0,
  }, options);

  // TODO: define "slash" as constants
  const transition = {
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
    transition.unshift({ duration: options.delay });
  }

  if (options.hpDelta) {
    transition.push({
      duration: 500,
      flipIconId: null,
      text: toSignedNumber(options.hpDelta),
      textClassNames: ['text-hp-delta'],
    });
  }

  return generateTransition(defaultProps, transition);
};
