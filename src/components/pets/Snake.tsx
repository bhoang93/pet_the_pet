import image from "../../images/pets/snake.png";
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

  const handleOrientation = (event: any) => {
    const beta: number = event.beta;

    if (beta < 30) {
      sprite.position.y += 40 - beta;
    }

    if (sprite.position.y >= limit) {
      clearTimeout(deathTimer);
      window.removeEventListener("deviceorientation", handleOrientation, true);
      stage.stage.removeChild(sprite);
      sprite.destroy();
      setScore(5);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("deviceorientation", handleOrientation, true);
  }

  deathTimer = setTimeout(() => {
    window.removeEventListener("deviceorientation", handleOrientation, true);
    if (stage.stage) {
      stage.stage.removeChild(sprite);
      loseLife();
    }
  }, 1500);
};

export default Hedgehog;
