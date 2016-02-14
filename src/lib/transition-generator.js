import { toSignedNumber } from '@kjirou/utils';
import { last } from 'lodash';
import { alterTransition, generateTransition, totalDurations } from 'react-flip-book';


export const EFFECT_ANIMATIONS = {
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
};

const _getEffectAnimationOrError = (animationType) => {
  const animation = EFFECT_ANIMATIONS[animationType];
  if (!animation) {
    throw new Error(`${animationType} is invalid animationType`);
  }
  return animation;
};


export const generateAnimatedIconTransition = (defaultProps, animationType, options = {}) => {
  options = Object.assign({
    delay: null,
    hpDelta: 0,
  }, options);

  const transitionSource = [];

  if (options.delay !== null) {
    transitionSource.unshift({ duration: options.delay });
  }

  const effectAnimation = _getEffectAnimationOrError(animationType);
  transitionSource.push(...effectAnimation);

  let transition = generateTransition(defaultProps, transitionSource);

  // Display damaging/healing text over the tail of the effect animation
  if (options.hpDelta) {
    const durationUntilNow = totalDurations(transition);
    const overlappingDuration = Math.min(50, durationUntilNow);
    const hpDeltaDuration = 500;
    transition = alterTransition(transition, [{
      keyframe: durationUntilNow - overlappingDuration,
      text: toSignedNumber(options.hpDelta),
      textClassNames: ['text-hp-delta'],
    }]);
    const lastTransition = generateTransition(last(transition), [{
      duration: hpDeltaDuration - overlappingDuration,
      flipIconId: null,
    }]);
    transition.push(...lastTransition);
  }

  return transition;
};
