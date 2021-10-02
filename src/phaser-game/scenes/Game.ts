import Phaser from "phaser";

import Grid from "../game/Grid";
import GameBoard from "../game/GameBoard";

export default class Game extends Phaser.Scene {
  private desk: Phaser.GameObjects.Image;
  private grid: Phaser.GameObjects.Container;

  constructor() {
    super("game");
  }

  create() {
    this.desk = this.add.image(0, 0, "desk").setOrigin(0, 0);

    const board = new GameBoard(this, 30, 30);
    this.add.existing(board);

    this.grid = new Grid({
      scene: this,
      columns: 1,
      rows: 5,
    });
  }
}
