import image from "../../images/pets/husky.png";
import * as pixi from "pixi.js";
import { randomRange } from "../../util/functions";

const Husky = (stage: any, setScore: any, loseLife: any) => {
  if (!stage.stage) return;
  let deathTimer: any;

  const onDragStart = (event: any, sprite: any) => {
    sprite.dragging = true;
    sprite.data = event.data;
  };

  const onDragEnd = (sprite: any) => {
    sprite.dragging = false;

    if (sprite.position.x <= 0 || sprite.position.y <= 0) {
      clearTimeout(deathTimer);
      stage.stage.removeChild(sprite);
      sprite.destroy();
      setScore(3);
    }
  };

  const onDragMove = (sprite: any) => {
    if (sprite.dragging) {
      var newPosition = sprite.data.getLocalPosition(sprite.parent);
      sprite.position.x = newPosition.x;
      sprite.position.y = newPosition.y;

      if (sprite.position.x <= 0 || sprite.position.y <= 0) {
        clearTimeout(deathTimer);
        stage.stage.removeChild(sprite);
        sprite.destroy();
        setScore(3);
      }
    }
  };

  const dog = pixi.Sprite.from(image);
  const sprite = stage.stage.addChild(dog);
  sprite.position.x = randomRange(100, 500);
  sprite.position.y = randomRange(100, 500);
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.anchor.set(0.5);

  // events for drag start
  sprite.on("mousedown", (e: any) => onDragStart(e, sprite));
  sprite.on("touchstart", (e: any) => onDragStart(e, sprite));
  // events for drag end
  sprite.on("mouseup", () => onDragEnd(sprite));
  sprite.on("mouseupoutside", () => onDragEnd(sprite));
  sprite.on("touchend", () => onDragEnd(sprite));
  sprite.on("touchendoutside", () => onDragEnd(sprite));
  // events for drag move
  sprite.on("mousemove", () => onDragMove(sprite));
  sprite.on("touchmove", () => onDragMove(sprite));

  deathTimer = setTimeout(() => {
    if (stage.stage) {
      stage.stage.removeChild(sprite);
      loseLife();
    }
  }, 1500);
};

export default Husky;
