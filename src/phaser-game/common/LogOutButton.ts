import Phaser from "phaser";
import { sceneEvents } from "../events/EventsManager";

export default class LogOutButton extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, image: string) {
    super(scene, x, y, image);

    scene.add.existing(this);
    this.setInteractive().setOrigin(0, 0);

    this.on("pointerover", function (this: Phaser.GameObjects.Image) {
      this.setTint(0xf8edeb);
    });

    this.on("pointerout", function (this: Phaser.GameObjects.Image) {
      this.clearTint();
    });

    this.on("pointerdown", function () {
      sceneEvents.emit("logout");
    });
  }
}
