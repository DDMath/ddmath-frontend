import Phaser from "phaser";
import Ball from "./Ball";
import ShotPreview from "./ShotPreview";

export default class Cannon extends Phaser.Physics.Arcade.Sprite {
  private shotPreview!: ShotPreview;
  private ball!: Ball;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.input.on("pointerup", this.handlePointerUp, this);
    this.scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;

    this.setCircle(this.width * 0.5);
    body.immovable = true;
    body.setAllowGravity(false);
  }

  handlePointerUp() {
    this.loadBall();

    const pointer = this.scene.input.activePointer;
    const dx = pointer.x - this.x;
    const dy = pointer.y - this.y;

    const vec = new Phaser.Math.Vector2(dx, dy);
    vec.normalize();

    this.ball.shoot(vec);

    this.shotPreview.removePreviousPreview();
  }

  loadBall() {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;

    this.ball = new Ball(this.scene, width / 2, height - 35, "ball");
  }

  setShotPreview() {
    this.shotPreview = new ShotPreview(this.scene);
  }

  get getFiredBall() {
    return this.ball;
  }

  update() {
    const pointer = this.scene.input.activePointer;

    if (!pointer.leftButtonDown()) {
      return;
    }

    const dx = pointer.x - this.x;
    const dy = pointer.y - this.y;

    const vec = new Phaser.Math.Vector2(dx, dy);
    vec.normalize();

    const rotation = vec.angle();

    this.rotation = rotation + Math.PI / 2;
    this.shotPreview.showPreview(400, 570, vec, 20);
  }
}
