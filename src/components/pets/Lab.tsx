import image from "../../images/pets/lab.png";
import * as pixi from "pixi.js";
import { randomRange, getSpriteScale, getLimit } from "../../util/functions";

const Lab = (stage: any, setScore: any, loseLife: any) => {
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

  const onClick = () => {
    clearTimeout(deathTimer);
    stage.stage.removeChild(sprite);
    sprite.destroy();
    setScore(1);
  };

  sprite.click = onClick;
  sprite.touchstart = onClick;

  deathTimer = setTimeout(() => {
    if (stage.stage) {
      stage.stage.removeChild(sprite);
      loseLife();
    }
  }, 1000);
};

export default Lab;
