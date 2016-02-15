import { SCENE_IDS } from '../../consts';
import GameScene from './GameScene';
import WelcomeScene from './WelcomeScene';


const scenes = {
  [SCENE_IDS.GAME]: GameScene,
  [SCENE_IDS.WELCOME]: WelcomeScene,
};


export default scenes;
