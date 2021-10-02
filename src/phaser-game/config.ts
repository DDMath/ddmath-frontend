import Phaser from "phaser";

import Game from "./scenes/Game";
import Preloader from "./scenes/Preloader";

export const config: Phaser.Types.Core.GameConfig = {
  title: "matchgame",
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  backgroundColor: "#333333",
  scene: [Preloader, Game],
};
