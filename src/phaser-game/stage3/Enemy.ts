import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  private _value: number;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, value: number) {
    const boxes = ["box-yellow", "box-green", "box-blue"];

    const boxIndex = Math.floor(Math.random() * boxes.length);

    super(scene, x, y, boxes[boxIndex]);

    this.setDisplaySize((value * this.width) / 15 + 50, (value * this.height) / 15 + 50);

    this._value = value;

    this.text = this.scene.add
      .text(this.x, this.y, String(value))
      .setFont(`${value * 3 + 12}px`)
      .setColor("#fff")
      .setOrigin(0.5, 0)
      .setDepth(5);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setCircle(this.width * 0.5);
  }

  get value() {
    return this._value;
  }

  getDamage() {
    this.destroy();
    this.text.destroy();
  }

  update() {
    this.text.x = this.x;
    this.text.y = this.y;
  }
}
