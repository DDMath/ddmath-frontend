import Phaser from "phaser";
import { getUserData } from "../../apis";

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

      const user = await getUserData();

      if (user) {
        this.registry.set("user", user);

        this.scene.start("stages");
        this.scene.run("stages-status-bar", { user });
      }
    });
  }
}
