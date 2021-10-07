import Phaser from "phaser";
import ShotPreview from "./ShotPreview";

export default class Cannon extends Phaser.GameObjects.Container {
  private shotPreview;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y);

    const cannon = scene.add.image(0, 0, texture);
    this.add(cannon);

    this.shotPreview = new ShotPreview(scene);

    scene.input.on("pointerup", () => this.shotPreview.removePreviousPreview());
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

    if (this.shotPreview.shotPreviewsLength() > 1000) {
      this.shotPreview.removePreviousPreview();
    }
  }
}
