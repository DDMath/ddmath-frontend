import Phaser from "phaser";

export default class GameGuideButton extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, image: string, game: string) {
    super(scene, x, y, image);
    scene.add.existing(this);

    this.setInteractive();

    this.on("pointerover", function (this: Phaser.GameObjects.Image) {
      this.setTint(0xf8edeb);
    });

    this.on("pointerout", function (this: Phaser.GameObjects.Image) {
      this.clearTint();
    });

    this.on("pointerdown", function (this: Phaser.GameObjects.Image) {
      const sceneManager = this.scene;
      const sceneName = game + "-guide";

      sceneManager.scene.run(sceneName);
    });
  }
}
