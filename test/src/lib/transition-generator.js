import assert from 'assert';

import { generateTransitions } from 'src/lib/transition-generator';


describe('src/lib/transition-generator', () => {

  describe('generateTransitions', () => {

    it('simple use', () => {
      assert.deepEqual(
        generateTransitions(
          {
            x: 1,
            y: 2,
            z: 0,
          },
          [
            { x: 2 },
            { z: 10 },
          ]
        ),
        [
          {
            duration: 0,
            x: 2,
            y: 2,
            z: 0,
          },
          {
            duration: 0,
            x: 2,
            y: 2,
            z: 10,
          },
        ]
      );
    });

    it('should set duration', () => {
      assert.deepEqual(
        generateTransitions(
          {
            x: 1,
            y: 2,
          },
          [
            { duration: 100 },
            { duration: 0 },
            { duration: 200 },
          ]
        ),
        [
          {
            duration: 100,
            x: 1,
            y: 2,
          },
          {
            duration: 0,
            x: 1,
            y: 2,
          },
          {
            duration: 200,
            x: 1,
            y: 2,
          },
        ]
      );
    });

    it('complex use', () => {
      assert.deepEqual(
        generateTransitions(
          {
            x: 1,
            y: 2,
            ary: [11, 22],
            obj: { a: 111, b: 222 },
            foo: null,
            bar: undefined,
          },
          [
            {
              duration: 200,
              ary: [33],
            },
            {
              duration: 100,
              ary: [44],
              obj: { a: 333, b: null },
              bar: null,
            },
          ]
        ),
        [
          {
            duration: 200,
            x: 1,
            y: 2,
            ary: [33],
            obj: { a: 111, b: 222 },
            foo: null,
            bar: undefined,
          },
          {
            duration: 100,
            x: 1,
            y: 2,
            ary: [44],
            obj: { a: 333, b: null },
            foo: null,
            bar: null,
          },
        ]
      );
    });
  });
});
