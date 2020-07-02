import image from "../../images/pets/blackcat.png";
import * as pixi from "pixi.js";
import { randomRange } from "../../util/functions";

const BlackCat = (stage: any, setScore: any, loseLife: any) => {
  if (!stage.stage) return;
  let deathTimer: any;

  const cat = pixi.Sprite.from(image);

  const sprite = stage.stage.addChild(cat);
  sprite.position.x = randomRange(0, 500);
  sprite.position.y = randomRange(0, 500);
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.click = () => {
    clearTimeout(deathTimer);
    stage.stage.removeChild(sprite);
    sprite.destroy();
    loseLife();
  };

  deathTimer = setTimeout(() => {
    if (stage.stage) {
      stage.stage.removeChild(sprite);
      setScore(1);
    }
  }, 1500);
};

export default BlackCat;
