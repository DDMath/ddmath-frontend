import Phaser from "phaser";

class previewCricle extends Phaser.GameObjects.Arc {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 10, 0, 360, true, 0xef524f);
  }
}

export default class ShotPreview {
  private scene: Phaser.Scene;
  private previews: previewCricle[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  showPreview(x: number, y: number, vector: Phaser.Math.Vector2, radius: number) {
    const total = 7;

    for (let i = 0; i < total; i++) {
      const preview = new previewCricle(this.scene, x, y);

      this.scene.add.existing(preview);
      this.previews.push(preview);
    }

    const distance = 50;
    const vectorX = vector.x;
    const vectorY = vector.y;

    let alpha = 1;

    x += vectorX * radius;
    y += vectorY * radius;

    for (let i = 0; i < total; i++) {
      const newX = x + vectorX * distance;
      const newY = y + vectorY * distance;

      x = newX;
      y = newY;

      const preview = this.previews[i];

      preview.x += newX;
      preview.y += newY;

      alpha *= 0.75;
      preview.alpha = alpha;
    }
  }

  removePreviousPreview() {
    for (let i = 0; i < this.previews.length; ++i) {
      this.previews[i].destroy();
    }

    this.previews.length = 0;
  }

  shotPreviewsLength() {
    return this.previews.length;
  }
}