import { SCENE_IDS } from '../consts';


/*
 * Resolve the logic execution by passing the dependencies and args
 *
 * @param {Function} logic - One of business logics
 * @param {object} dependencies - { appModel }
 * @param {Array} logicArgs
 */
export const _resolveLogic = (logic, dependencies, logicArgs = []) => {
  let result;

  try {
    result = logic(dependencies, ...logicArgs);
  } catch (err) {
    result = err;
  }

  // Convert to Promise-based API forcibly
  let promisifiedResult;
  if (result instanceof Promise) {
    promisifiedResult = result;
  } else if (result instanceof Error) {
    promisifiedResult = Promise.reject(result);
  } else {
    promisifiedResult = Promise.resolve(result);
  }

  return promisifiedResult;
};

/*
 * Bind logics to dependencies
 */
export const bindLogics = (logics, appModel) => {
  const dependencies = {
    model: appModel,
  };

  const boundLogics = {};
  Object.keys(logics).forEach(logicName => {
    const logic = logics[logicName];
    boundLogics[logicName] = (...logicArgs) => _resolveLogic(logic, dependencies, logicArgs);
  });

  return boundLogics;
};


/*
 * Business logics
 *
 * Generally each logic becomes one-to-one with the UI, but not necessarily.
 * For example, sometimes one of the logic is used for plural UIs.
 *
 * Therefore, as the business logic name, you can use both terms of the Model and terms of the UI.
 * e.g.
 *   Model terms = createFoo, updateFoo, obtainFoo, etc
 *   UI terms    = touchFoo, scrollFoo, checkFoo, etc
 */
export const logics = {

  switchScene({ model }, sceneId) {
    model.sceneId = sceneId;
  },

  touchSquare({ model }, position) {
    if (!model.game) return;
    model.game.proceed(position);
  },

  touchStart({ model }) {
    model.sceneId = SCENE_IDS.HOME;
  },
};
