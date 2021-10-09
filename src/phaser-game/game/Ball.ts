import Phaser from "phaser";

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setCircle(this.width * 0.5);

    const body = this.body as Phaser.Physics.Arcade.Body;

    body.immovable = false;
    body.setAllowGravity(false);
  }

  shoot(vector: Phaser.Math.Vector2, speed = 500) {
    this.body.x = this.x;
    this.body.y = this.y;

    this.setVelocity(vector.x * speed, vector.y * speed);
  }
}
