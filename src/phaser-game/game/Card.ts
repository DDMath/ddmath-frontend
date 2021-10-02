import Phaser from "phaser";

export default class Card extends Phaser.GameObjects.Container {
  private spriteCard: Phaser.GameObjects.Sprite;
  private spriteImage: Phaser.GameObjects.Sprite;
  private value: number;
  private name: string;
  private fruit: string;
  private _originalX: number;
  private _originalY: number;

  constructor(data) {
    const { scene, x, y, value, name, image, ondragend } = data;

    const spriteCard = new Phaser.GameObjects.Sprite(scene, 2, 4, "card");
    const spriteImage = new Phaser.GameObjects.Sprite(scene, 0, 0, image);

    super(scene, x, y, [spriteCard, spriteImage]);

    this.spriteCard = spriteCard;
    this.spriteImage = spriteImage;

    this.name = name;
    this.scene = scene;
    this.value = value;
    this.fruit = name.slice(0, name.length - 1);

    this.originalX = this.x;
    this.originalY = this.y;

    this.draggable = true;
    this.ondragend = ondragend;

    this.setSize(this.spriteCard.width, this.spriteCard.height);
    this.setInteractive();
    this.scene.input.setDraggable(this);

    this.scene.input.on("drag", (pointer, gameObject: Card, dragX: number, dragY: number) => {
      if (this !== gameObject) {
        return;
      }

      const xDiff = Math.abs(gameObject.x - dragX);
      const yDiff = Math.abs(gameObject.y - dragY);

      if (!xDiff || !yDiff) {
        return;
      }

      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.scene.input.on("dragend", (pointer, gameObject) => {
      if (this !== gameObject) {
        return;
      }

      gameObject.ondragend(pointer, gameObject);
    });

    this.scene.add.existing(this);
  }

  get originalX() {
    return this._originalX;
  }

  set originalX(newX: number) {
    this._originalX = newX;
  }

  get originalY() {
    return this._originalY;
  }

  set originalY(newY: number) {
    this._originalY = newY;
  }
}
