import assert from 'assert';

import {
  _resolveLogic,
} from 'src/logics';


describe('src/logics', () => {

  describe('_resolveLogic', () => {

    it('should return a promisified result', () => {
      const logic = (deps, x, y) => {
        return x * y;
      };

      return _resolveLogic(logic, {}, [2, 3])
        .then(result => assert.strictEqual(result, 6))
      ;
    });

    it('should return a promisified error', () => {
      const logic = (deps) => {
        return new Error('Hello, error!');
      };

      return _resolveLogic(logic, {})
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.message, 'Hello, error!');
        });
      ;
    });

    it('can return resolved promise', () => {
      const logic = (deps) => {
        return Promise.resolve(100);
      };

      return _resolveLogic(logic, {})
        .then(result => assert.strictEqual(result, 100))
      ;
    });

    it('can return rejected promise', () => {
      const logic = (deps) => {
        return Promise.reject(new Error('This is a error'));
      };

      return _resolveLogic(logic, {})
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.message, 'This is a error');
        });
      ;
    });

    it('can handle unexpected error in the logic', () => {
      const logic = (deps) => {
        throw new Error('Unexpected error');
      };

      return _resolveLogic(logic, {})
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.message, 'Unexpected error');
        });
      ;
    });
  });
});
