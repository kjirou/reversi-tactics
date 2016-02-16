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
 */
export const logics = {

  touchSquare({ model }, position) {
    if (!model.game) return;
    model.game.proceed(position);
  },

  touchStart({ model }) {
    model.sceneId = SCENE_IDS.GAME;
  },
};
