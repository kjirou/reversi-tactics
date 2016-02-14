import assert from 'assert';
import { last } from 'lodash';
import { assertTransition } from 'react-flip-book';

import { generateAnimatedIconTransition } from 'src/lib/transition-generator';


describe('src/lib/transition-generator', () => {

  describe('generateAnimatedIconTransition', () => {

    it('should be', () => {
      const transition = generateAnimatedIconTransition({ x: 1 }, 'slash');
      assert(transition.length > 0);
      assertTransition(transition);
      transition.forEach(props => {
        assert.strictEqual(props.x, 1);
      });
    });

    it('delay option', () => {
      const transition = generateAnimatedIconTransition({ x: 1 }, 'slash', { delay: 500 });
      assert(transition.length > 0);
      assertTransition(transition);
      transition.forEach(props => {
        assert.strictEqual(props.x, 1);
      });
      assert.deepEqual(transition[0], {
        duration: 500,
        x: 1,
      });
    });

    it('hpDelta option', () => {
      const transition = generateAnimatedIconTransition({ x: 1 }, 'slash', { hpDelta: -10 });
      assert(transition.length > 0);
      assertTransition(transition);
      assert.strictEqual(last(transition).duration, 450);
      assert.strictEqual(last(transition).flipIconId, null);
      assert.strictEqual(last(transition).text, '-10');
    });
  });
});
