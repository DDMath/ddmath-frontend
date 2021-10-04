import Phaser from "phaser";
import DraggableCard from "./DraggableCard";

type DataType = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  name: string;
  image: string;
  value: number;
};

export default class BaseCard extends Phaser.GameObjects.Container {
  private spriteCard: Phaser.GameObjects.Sprite;
  private spriteImage: Phaser.GameObjects.Sprite;
  private _originalX!: number;
  private _originalY!: number;

  public value: number;
  public fruit: string;
  public readonly name: string;

  constructor(data: DataType) {
    const { scene, x, y, value, name, image } = data;

    const spriteCard = new Phaser.GameObjects.Sprite(scene, 2, 4, "card");
    const spriteImage = new Phaser.GameObjects.Sprite(scene, 0, 0, image);

    super(scene, x, y, [spriteCard, spriteImage]);

    this.spriteCard = spriteCard;
    this.spriteImage = spriteImage;

    this.name = name;
    this.scene = scene;
    this.value = value;
    this.fruit = name.slice(0, name.length - 1);

    this.originalX = x;
    this.originalY = y;

    this.setSize(this.spriteCard.width, this.spriteCard.height);

    this.on("pointerover", function (this: DraggableCard) {
      this.spriteCard.setTint(0xf8edeb);
    });

    this.on("pointerout", function (this: DraggableCard) {
      this.spriteCard.clearTint();
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
