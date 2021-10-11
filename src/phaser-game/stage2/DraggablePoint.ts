import Phaser from "phaser";
import LinkGame from "../scenes/LinkGame";

type PointData = {
  x: number;
  y: number;
  image: string;
  name: string;
  value: string | number;
  scene: Phaser.Scene;
  ondragend(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite): void;
};

export default class DraggablePoint extends Phaser.GameObjects.Container {
  public name: string;
  public value: string | number;

  constructor(data: PointData) {
    const { x, y, name, value, scene, ondragend } = data;

    const pointImage = new Phaser.GameObjects.Image(scene, 70, 0, "point");
    const leftPoint = new Phaser.GameObjects.Sprite(scene, -70, 0, "point");
    const rightPoint = new Phaser.GameObjects.Sprite(scene, 70, 0, "point");

    rightPoint.setSize(rightPoint.displayWidth, rightPoint.displayHeight);
    rightPoint.setInteractive({ draggable: rightPoint });

    super(scene, x, y, [leftPoint, rightPoint, pointImage]);

    this.name = name;
    this.value = value;

    (scene as LinkGame).addNewPoint = leftPoint;

    rightPoint.setDataEnabled();

    rightPoint.data.set("originalX", 70);
    rightPoint.data.set("originalY", 0);

    if (value === "green") {
      leftPoint.alpha = 0;
    }

    if (value === "blue") {
      rightPoint.alpha = 0;
      pointImage.alpha = 0;
    }

    scene.add.existing(this);

    this.scene.input.on(
      "drag",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Sprite,
        dragX: number,
        dragY: number
      ) => {
        if (this !== gameObject.parentContainer) {
          return;
        }

        const distanceX = Math.abs(gameObject.x - dragX);
        const distanceY = Math.abs(gameObject.y - dragY);

        if (!distanceX && !distanceY) {
          return;
        }

        gameObject.x = dragX;
        gameObject.y = dragY;

        (scene as LinkGame).drawLine(gameObject);
      }
    );

    this.scene.input.on(
      "dragend",
      (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) => {
        if (this !== gameObject.parentContainer) {
          return;
        }

        ondragend(pointer, gameObject);
      }
    );
  }
}
