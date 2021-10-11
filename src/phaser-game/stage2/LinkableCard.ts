import Phaser from "phaser";
import CardBase from "../common/CardBase";

type CardData = {
  x: number;
  y: number;
  name: string;
  image: string;
  value: string | number;
  scene: Phaser.Scene;
  ondragend(pointer: Phaser.Input.Pointer, gameObject: LinkableCard): void;
};

export default class LinkableCard extends CardBase {
  constructor(data: CardData) {
    const { scene, ondragend } = data;

    super(data);

    this.setInteractive();

    this.scene.input.on(
      "drag",
      (pointer: Phaser.Input.Pointer, gameObject: CardBase, dragX: number, dragY: number) => {
        if (this.name !== gameObject.name) {
          return;
        }

        const dx = Math.abs(gameObject.x - dragX);
        const dy = Math.abs(gameObject.y - dragY);

        if (!dx && !dy) {
          return;
        }

        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );

    scene.input.on("dragend", (pointer: Phaser.Input.Pointer, gameObject: LinkableCard) => {
      if (this !== gameObject) {
        return;
      }

      ondragend(pointer, gameObject);
    });

    scene.add.existing(this);
  }
}
