import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.baseURL = "http://localhost:3000/";

    this.load.image("desk", "desk.png");
    this.load.image("board", "matchgame/board.png");
    this.load.image("card", "matchgame/card.png");
    this.load.image("kiwi-1", "matchgame/kiwi1.png");
    this.load.image("kiwi-2", "matchgame/kiwi2.png");
    this.load.image("kiwi-3", "matchgame/kiwi3.png");
    this.load.image("orange-1", "matchgame/orange1.png");
    this.load.image("orange-2", "matchgame/orange2.png");
    this.load.image("orange-3", "matchgame/orange3.png");
    this.load.image("strawberry-1", "matchgame/strawberry1.png");
    this.load.image("strawberry-2", "matchgame/strawberry2.png");
    this.load.image("strawberry-3", "matchgame/strawberry3.png");
  }

  create() {
    this.scene.start("game");
  }
}
