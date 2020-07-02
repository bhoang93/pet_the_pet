import image from "../../images/pets/lab.png";
import * as pixi from "pixi.js";
import { randomRange } from "../../util/functions";

const Lab = (stage: any, setScore: any, loseLife: any) => {
  if (!stage.stage) return;
  let deathTimer: any;

  const dog = pixi.Sprite.from(image);
  const sprite = stage.stage.addChild(dog);
  sprite.position.x = randomRange(0, 500);
  sprite.position.y = randomRange(0, 500);
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.click = () => {
    clearTimeout(deathTimer);
    stage.stage.removeChild(sprite);
    sprite.destroy();
    setScore(1);
  };

  deathTimer = setTimeout(() => {
    if (stage.stage) {
      stage.stage.removeChild(sprite);
      loseLife();
    }
  }, 1000);
};

export default Lab;
