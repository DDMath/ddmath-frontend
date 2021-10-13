import Phaser from "phaser";
import { sceneEvents } from "../events/EventsManager";

export default class GoBackButton extends Phaser.GameObjects.Sprite {
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

      sceneManager.scene.stop(game);
      sceneManager.scene.stop("status-bar");
      sceneManager.scene.start("stages");

      const user = sceneManager.registry.get("user");
      sceneManager.scene.run("stages-status-bar", { user });
    });

    sceneEvents.on("gameover", this.disableButton, this);
  }

  private disableButton() {
    this.off("pointerdown");
  }
}
