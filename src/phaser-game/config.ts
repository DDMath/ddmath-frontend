import Phaser from "phaser";

import Stages from "./scenes/Stages";
import LinkGame from "./scenes/LinkGame";
import Preloader from "./scenes/Preloader";
import PuzzleGame from "./scenes/PuzzleGame";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  parent: "game-container",
  backgroundColor: "#333333",
  scene: [Preloader, Stages, PuzzleGame, LinkGame],
};
