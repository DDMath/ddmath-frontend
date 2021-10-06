import Phaser from "phaser";
import BaseCard from "./BaseCard";

type CardData = {
  x: number;
  y: number;
  name: string;
  game: string;
  image: string;
  value: string | number;
  scene: Phaser.Scene;
  ondragend(pointer: Phaser.Input.Pointer, gameObject: DraggableCard): void;
};

export default class DraggableCard extends BaseCard {
  constructor(data: CardData) {
    const { scene, ondragend, game } = data;

    super(data);

    game === "puzzleGame" ? this.setInteractive({ draggable: true }) : null;

    this.scene.input.on(
      "drag",
      (pointer: Phaser.Input.Pointer, gameObject: BaseCard, dragX: number, dragY: number) => {
        if (this.name !== gameObject.name) {
          return;
        }

        const xDiff = Math.abs(gameObject.x - dragX);
        const yDiff = Math.abs(gameObject.y - dragY);

        if (!xDiff && !yDiff) {
          return;
        }

        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );

    scene.input.on("dragend", (pointer: Phaser.Input.Pointer, gameObject: DraggableCard) => {
      if (this !== gameObject) {
        return;
      }

      ondragend(pointer, gameObject);
    });

    scene.add.existing(this);
  }
}
