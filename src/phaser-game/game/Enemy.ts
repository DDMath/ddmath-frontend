import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  private _value: number;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const boxes = ["box-yellow", "box-green", "box-blue"];

    const boxIndex = Math.floor(Math.random() * boxes.length);
    const value = Math.floor(Math.random() * 5) + 1;

    super(scene, x, y, boxes[boxIndex]);

    this.setDisplaySize((value * this.width) / 5 + 50, (value * this.height) / 5 + 50);

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
    this._value--;
    this.text.setText(String(this.value)).setFont(`${this.value * 3 + 12}px`);

    this.setDisplaySize((this.value * this.width) / 5 + 50, (this.value * this.height) / 5 + 50);
  }

  update() {
    this.text.x = this.x;
    this.text.y = this.y;

    if (this.value === 0) {
      return this.text.destroy();
    }
  }
}
