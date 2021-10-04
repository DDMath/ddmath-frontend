import Phaser from "phaser";

import Stages from "./scenes/Stages";
import LinkGame from "./scenes/LinkGame";
import Preloader from "./scenes/Preloader";
import CardMatchGame from "./scenes/CardMatchGame";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  parent: "game-container",
  backgroundColor: "#333333",
  scene: [Preloader, Stages, CardMatchGame, LinkGame],
};
