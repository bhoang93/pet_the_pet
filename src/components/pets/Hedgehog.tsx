import image from "../../images/pets/hedgehog.png";
import * as pixi from "pixi.js";
import { randomRange, getSpriteScale, getLimit } from "../../util/functions";

const Hedgehog = (stage: any, setScore: any, loseLife: any) => {
  if (!stage.stage) return;
  let deathTimer: any;
  const limit: number = getLimit();
  const dog = pixi.Sprite.from(image);
  const sprite = stage.stage.addChild(dog);
  sprite.position.x = randomRange(10, limit);
  sprite.position.y = randomRange(10, limit);
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.height = getSpriteScale();
  sprite.width = getSpriteScale();

  const shakeEventDidOccur = () => {
    window.removeEventListener("shake", shakeEventDidOccur, false);
    clearTimeout(deathTimer);
    stage.stage.removeChild(sprite);
    sprite.destroy();
    setScore(2);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("shake", shakeEventDidOccur, false);
  }

  deathTimer = setTimeout(() => {
    window.removeEventListener("shake", shakeEventDidOccur, false);
    if (stage.stage) {
      stage.stage.removeChild(sprite);
      loseLife();
    }
  }, 1500);
};

export default Hedgehog;
