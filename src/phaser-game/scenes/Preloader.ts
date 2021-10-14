import Phaser from "phaser";
import { getUserData } from "~/apis";
import { sceneEvents } from "../events/EventsManager";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.baseURL = process.env.PROD_URL;

    this.load.image("background1", "/background/desk1.png");
    this.load.image("background2", "/background/desk2.png");
    this.load.image("background3", "/background/desk3.png");

    this.load.image("stages", "/background/stages.png");
    this.load.image("stage1", "/background/stage1.png");
    this.load.image("stage2", "/background/stage2.png");
    this.load.image("stage3", "/background/stage3.png");
    this.load.image("goBack", "/game/goBackButton.png");

    this.load.image("star", "/game/star.png");
    this.load.image("star-empty", "/game/star-empty.png");

    this.load.image("lock", "/game/lock.png");
    this.load.image("logout", "/game/logout.png");
    this.load.image("sound-on", "/game/sound-on.png");
    this.load.image("sound-off", "/game/sound-off.png");
    this.load.image("user-info", "/game/user-info.png");

    this.load.image("board", "/game/board.png");
    this.load.image("point", "/game/point.png");
    this.load.image("cannon", "/game/cannon.png");
    this.load.image("box-blue", "/game/box-blue.png");
    this.load.image("box-green", "/game/box-green.png");
    this.load.image("box-yellow", "/game/box-yellow.png");

    this.load.image("card", "/card/card.png");

    this.load.image("kiwi-1", "/card/kiwi1.png");
    this.load.image("kiwi-2", "/card/kiwi2.png");
    this.load.image("kiwi-3", "/card/kiwi3.png");
    this.load.image("orange-1", "/card/orange1.png");
    this.load.image("orange-2", "/card/orange2.png");
    this.load.image("orange-3", "/card/orange3.png");
    this.load.image("strawberry-1", "/card/strawberry1.png");
    this.load.image("strawberry-2", "/card/strawberry2.png");
    this.load.image("strawberry-3", "/card/strawberry3.png");

    this.load.image("music-blue", "/card/music-blue.png");
    this.load.image("music-green", "/card/music-green.png");
    this.load.image("music-yellow", "/card/music-yellow.png");
    this.load.image("trophy-blue", "/card/trophy-blue.png");
    this.load.image("trophy-green", "/card/trophy-green.png");
    this.load.image("trophy-yellow", "/card/trophy-yellow.png");
    this.load.image("check-blue", "/card/check-blue.png");
    this.load.image("check-green", "/card/check-green.png");
    this.load.image("check-yellow", "/card/check-yellow.png");
    this.load.image("star-blue", "/card/star-blue.png");
    this.load.image("star-green", "/card/star-green.png");
    this.load.image("star-yellow", "/card/star-yellow.png");

    this.load.audio("pop", "/sound/pop.wav");
    this.load.audio("jump", "/sound/jump.wav");
    this.load.audio("beep", "/sound/beep.wav");
    this.load.audio("click", "/sound/click.wav");
    this.load.audio("correct", "/sound/correct.mp3");
    this.load.audio("background-music", "/sound/background-music.mp3");

    this.load.atlas("character-run", "/character/run.png", "/character/run.json");
    this.load.atlas("character-stand", "/character/stand.png", "/character/stand.json");
  }

  create() {
    const scene = this;
    const sceneManager = this.scene;

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

    const music = this.sound.add("background-music", {
      loop: true,
      volume: 0.3,
    });

    music.play();

    sceneEvents.on("toggleBackgroundMusic", () => {
      if (music.isPlaying) {
        music.pause();
      } else {
        music.resume();
      }
    });

    async function authCheck() {
      const user = await getUserData();

      if (user) {
        scene.registry.set("user", user);

        sceneManager.start("stages");
        sceneManager.run("stages-status-bar", { user });
      }
    }

    authCheck();
  }
}
