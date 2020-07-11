import image from "../../images/pets/bunnyM.png";
import image2 from "../../images/pets/bunnyF.png";
import * as pixi from "pixi.js";
import { randomRange, getSpriteScale, getLimit } from "../../util/functions";

const Husky = (stage: any, setScore: any, loseLife: any) => {
  if (!stage.stage) return;
  let deathTimer: any;
  let mTouch = false;
  let fTouch = false;

  const limit: number = getLimit();

  const bunny1 = pixi.Sprite.from(image);
  const bunnyM = stage.stage.addChild(bunny1);
  bunnyM.position.x = randomRange(100, limit);
  bunnyM.position.y = randomRange(100, limit);
  bunnyM.height = getSpriteScale();
  bunnyM.width = getSpriteScale();
  bunnyM.interactive = true;
  bunnyM.buttonMode = true;

  const bunny2 = pixi.Sprite.from(image2);
  const bunnyF = stage.stage.addChild(bunny2);
  bunnyF.position.x = randomRange(100, limit);
  bunnyF.position.y = randomRange(100, limit);
  bunnyF.height = getSpriteScale();
  bunnyF.width = getSpriteScale();
  bunnyF.interactive = true;
  bunnyF.buttonMode = true;

  const completeTask = () => {
    clearTimeout(deathTimer);
    stage.stage.removeChild(bunnyM);
    stage.stage.removeChild(bunnyF);
    bunnyM.destroy();
    bunnyF.destroy();
    setScore(5);
  };

  const bunnyMTouch = () => {
    mTouch = true;
    if (mTouch && fTouch) {
      completeTask();
    }
  };

  const bunnyMTouchEnd = () => {
    mTouch = false;
  };

  const bunnyFTouch = () => {
    fTouch = true;
    if (mTouch && fTouch) {
      completeTask();
    }
  };

  const bunnyFTouchEnd = () => {
    fTouch = false;
  };

  bunnyM.on("touchstart", bunnyMTouch);
  bunnyM.on("touchend", bunnyMTouchEnd);
  bunnyF.on("touchstart", bunnyFTouch);
  bunnyF.on("touchend", bunnyFTouchEnd);

  deathTimer = setTimeout(() => {
    if (stage.stage) {
      stage.stage.removeChild(bunnyM);
      stage.stage.removeChild(bunnyF);
      loseLife();
    }
  }, 2500);
};

export default Husky;
