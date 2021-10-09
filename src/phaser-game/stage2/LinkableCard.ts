import BaseCard from "../common/BaseCard";

type CardData = {
  x: number;
  y: number;
  name: string;
  image: string;
  value: string | number;
  scene: Phaser.Scene;
  ondragend(pointer: Phaser.Input.Pointer, gameObject: LinkableCard): void;
};

export default class LinkableCard extends BaseCard {
  private linkable: boolean;

  constructor(data: CardData) {
    const { scene, ondragend } = data;

    super(data);

    this.linkable = true;
    this.setInteractive();

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

    scene.input.on("dragend", (pointer: Phaser.Input.Pointer, gameObject: LinkableCard) => {
      if (this !== gameObject) {
        return;
      }

      ondragend(pointer, gameObject);
    });

    scene.add.existing(this);
  }
}
