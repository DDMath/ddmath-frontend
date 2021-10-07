import Phaser from "phaser";

import Cannon from "../game/Cannon";
import GoBackButton from "../game/GoBackButton";

export default class ShootingGame extends Phaser.Scene {
  private cannon!: Cannon;
  private goBackbutton!: GoBackButton;
  private background!: Phaser.GameObjects.Image;

  constructor() {
    super("shootingGame");
  }

  create() {
    this.background = this.add.image(0, 0, "desk3").setOrigin(0, 0);
    this.goBackbutton = new GoBackButton(this, 50, 50, "goBack");

    const width = this.scale.width;
    const height = this.scale.height;

    this.cannon = new Cannon(this, width / 2, height - 35, "cannon");

    this.add.existing(this.cannon);
  }

  update() {
    this.cannon.update();
  }
}
