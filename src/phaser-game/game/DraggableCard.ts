import BaseCard from "./BaseCard";

type CardData = {
  x: number;
  y: number;
  name: string;
  image: string;
  value: number;
  scene: Phaser.Scene;
  ondragend(pointer: Phaser.Input.Pointer, gameObject: DraggableCard): void;
};

export default class DraggableCard extends BaseCard {
  private draggable: boolean;

  constructor(data: CardData) {
    const { scene, ondragend } = data;

    super(data);

    this.draggable = true;
    this.setInteractive({ draggable: true });

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
