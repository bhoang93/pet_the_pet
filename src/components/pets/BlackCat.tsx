import image from "../../images/pets/blackcat.png";
import * as pixi from "pixi.js";
import { randomRange, getSpriteScale, getLimit } from "../../util/functions";

const BlackCat = (stage: any, setScore: any, loseLife: any) => {
  if (!stage.stage) return;
  let deathTimer: any;

  const cat = pixi.Sprite.from(image);

  const sprite = stage.stage.addChild(cat);
  sprite.position.x = randomRange(10, getLimit());
  sprite.position.y = randomRange(10, getLimit());
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.height = getSpriteScale();
  sprite.width = getSpriteScale();

  const onClick = () => {
    clearTimeout(deathTimer);
    stage.stage.removeChild(sprite);
    sprite.destroy();
    loseLife();
  };

  sprite.click = onClick;
  sprite.touchstart = onClick;

  deathTimer = setTimeout(() => {
    if (stage.stage) {
      stage.stage.removeChild(sprite);
      setScore(1);
    }
  }, 1500);
};

export default BlackCat;
