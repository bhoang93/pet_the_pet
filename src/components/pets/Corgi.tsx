import image from "../../images/pets/corgi.png";
import * as pixi from "pixi.js";
import { randomRange, getSpriteScale, getLimit } from "../../util/functions";

const Corgi = (stage: any, setScore: any, loseLife: any) => {
  if (!stage.stage) return;
  let deathTimer: any;

  const dog = pixi.Sprite.from(image);
  let clicks = 0;
  const limit: number = getLimit();
  const sprite = stage.stage.addChild(dog);
  sprite.position.x = randomRange(10, limit);
  sprite.position.y = randomRange(10, limit);
  sprite.height = getSpriteScale();
  sprite.width = getSpriteScale();

  sprite.interactive = true;
  sprite.buttonMode = true;

  const onClick = () => {
    clicks++;

    if (clicks === 2) {
      clearTimeout(deathTimer);
      stage.stage.removeChild(sprite);
      sprite.destroy();
      setScore(2);
    }
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

export default Corgi;
