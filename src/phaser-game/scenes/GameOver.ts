import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  create({ game }: { game: string }) {
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

    button.once("pointerup", () => {
      this.scene.stop("game-over");
      this.scene.stop("status-bar");
      this.scene.stop(game);

      this.scene.start("stages");
    });
  }
}
