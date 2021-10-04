import Phaser from "phaser";

export default class LinkGame extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;

  constructor() {
    super("linkgame");
  }

  create() {
    this.background = this.add.image(0, 0, "desk2").setOrigin(0, 0);
  }
}
