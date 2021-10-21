import Phaser from "phaser";

interface IGame {
  game: string;
}
export default class GameOver extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  create({ game }: IGame) {
    const { width, height } = this.scale;

    const x = width / 2;
    const y = height / 2;

    const button = this.add
      .text(x, y, "Congraturations! \nClick to go home", {
        fontSize: "32px",
        color: "#fff",
        fontFamily: "Arial",
        backgroundColor: "#ef524f",
        padding: { left: 30, right: 30, top: 30, bottom: 30 },
      })
      .setOrigin(0.5);

    button.setInteractive();

    button.once("pointerup", async () => {
      this.scene.stop("game-over");
      this.scene.stop("status-bar");
      this.scene.stop(game);

      let stage = 0;

      switch (game) {
        case "shooting-game":
          stage = 1;
          break;
        case "puzzle-game":
          stage = 2;
          break;
        case "matching-game":
          stage = 3;
          break;
        default:
          stage = 0;
      }

      const user = this.registry.get("user");
      user.lastStage = stage;

      this.scene.start("stages");
      this.scene.run("stages-status-bar", { user });
    });
  }
}
