import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.baseURL = "http://localhost:3000/";

    this.load.image("desk1", "background/desk1.png");
    this.load.image("desk2", "background/desk2.png");
    this.load.image("desk3", "background/desk3.png");
    this.load.image("stages", "background/stages.png");
    this.load.image("stage1", "background/stage1.png");
    this.load.image("stage2", "background/stage2.png");
    this.load.image("board", "game/board.png");
    this.load.image("card", "card/card.png");
    this.load.image("kiwi-1", "card/kiwi1.png");
    this.load.image("kiwi-2", "card/kiwi2.png");
    this.load.image("kiwi-3", "card/kiwi3.png");
    this.load.image("orange-1", "card/orange1.png");
    this.load.image("orange-2", "card/orange2.png");
    this.load.image("orange-3", "card/orange3.png");
    this.load.image("strawberry-1", "card/strawberry1.png");
    this.load.image("strawberry-2", "card/strawberry2.png");
    this.load.image("strawberry-3", "card/strawberry3.png");
    this.load.image("music-blue", "card/music-blue.png");
    this.load.image("music-yellow", "card/music-yellow.png");
    this.load.image("music-green", "card/music-green.png");
    this.load.image("trophy-blue", "card/trophy-blue.png");
    this.load.image("trophy-yellow", "card/trophy-yellow.png");
    this.load.image("trophy-green", "card/trophy-green.png");
    this.load.image("check-blue", "card/check-blue.png");
    this.load.image("check-yellow", "card/check-yellow.png");
    this.load.image("check-green", "card/check-green.png");
    this.load.image("star-blue", "card/star-blue.png");
    this.load.image("star-yellow", "card/star-yellow.png");
    this.load.image("star-green", "card/star-green.png");
    this.load.atlas("character-stand", "character/stand.png", "character/stand.json");
    this.load.atlas("character-run", "character/run.png", "character/run.json");
    this.load.image("goBack", "game/goBackButton.png");
    this.load.image("point", "game/point.png");
  }

  create() {
    this.anims.create({
      key: "character-stand",
      frames: this.anims.generateFrameNames("character-stand", {
        start: 1,
        end: 5,
        prefix: "blink-",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "character-run",
      frames: this.anims.generateFrameNames("character-run", {
        start: 1,
        end: 4,
        prefix: "run-",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start("linkgame");
  }
}
