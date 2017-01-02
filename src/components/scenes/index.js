import { SCENE_IDS } from '../../consts';
import GameScene from './GameScene';
import HomeScene from './HomeScene';
import StageSelectionScene from './StageSelectionScene';
import WelcomeScene from './WelcomeScene';


const scenes = {
  [SCENE_IDS.GAME]: GameScene,
  [SCENE_IDS.HOME]: HomeScene,
  [SCENE_IDS.STAGE_SELECTION]: StageSelectionScene,
  [SCENE_IDS.WELCOME]: WelcomeScene,
};


export default scenes;
