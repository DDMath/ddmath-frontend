import Phaser from "phaser";

import Stages from "./scenes/Stages";
import GameOver from "./scenes/GameOver";
import LinkGame from "./scenes/LinkGame";
import StatusBar from "./scenes/StatusBar";
import Preloader from "./scenes/Preloader";
import PuzzleGame from "./scenes/PuzzleGame";
import ShootingGame from "./scenes/ShootingGame";
import StagesStatusBar from "./scenes/StagesStatusBar";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 30 },
    },
  },
  title: "DD Math",
  backgroundColor: "#eae4e9",
  scene: [
    Preloader,
    Stages,
    PuzzleGame,
    LinkGame,
    ShootingGame,
    StagesStatusBar,
    StatusBar,
    GameOver,
  ],
};
