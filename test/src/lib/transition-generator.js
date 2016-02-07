import assert from 'assert';
import { assertTransition } from 'react-flip-book';

import { generateAnimatedIconTransition } from 'src/lib/transition-generator';


describe('src/lib/transition-generator', () => {

  describe('generateAnimatedIconTransition', () => {

    it('should be', () => {
      const transition = generateAnimatedIconTransition({}, 'slash');
      assert(transition.length > 0);
      assertTransition(transition);
    });
  });
});
