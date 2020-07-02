import image from "../../images/pets/corgi.png";
import * as pixi from "pixi.js";
import { randomRange } from "../../util/functions";

const Corgi = (stage: any, setScore: any, loseLife: any) => {
  if (!stage.stage) return;
  let deathTimer: any;

  const dog = pixi.Sprite.from(image);
  let clicks = 0;

  const sprite = stage.stage.addChild(dog);
  sprite.position.x = randomRange(0, 500);
  sprite.position.y = randomRange(0, 500);
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.click = () => {
    clicks++;

    if (clicks === 2) {
      clearTimeout(deathTimer);
      stage.stage.removeChild(sprite);
      sprite.destroy();
      setScore(2);
    }
  };

  deathTimer = setTimeout(() => {
    if (stage.stage) {
      stage.stage.removeChild(sprite);
      loseLife();
    }
  }, 1000);
};

export default Corgi;
