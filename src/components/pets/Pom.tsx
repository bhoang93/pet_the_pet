import image from "../../images/pets/pom.png";
import * as pixi from "pixi.js";
import { randomRange, getSpriteScale, getLimit } from "../../util/functions";

const Pom = (stage: any, setScore: any, loseLife: any) => {
  if (!stage.stage) return;

  const limit: number = getLimit();
  const dog = pixi.Sprite.from(image);

  const sprite = stage.stage.addChild(dog);
  sprite.position.x = randomRange(200, limit);
  sprite.position.y = randomRange(10, limit);
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.height = getSpriteScale();
  sprite.width = getSpriteScale();

  let interval = setInterval(() => {
    if (sprite.position.x > 0) {
      sprite.position.x -= 40;
    }
    if (sprite.position.x <= 0) {
      if (stage.stage) {
        stage.stage.removeChild(sprite);
        loseLife();
        clearInterval(interval);
      }
    }
  }, 100);

  const onClick = () => {
    clearInterval(interval);
    stage.stage.removeChild(sprite);
    sprite.destroy();
    setScore(4);
  };

  sprite.click = onClick;
  sprite.touchstart = onClick;
};

export default Pom;
