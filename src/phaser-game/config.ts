import Phaser from "phaser";

import Stages from "./scenes/Stages";
import GameOver from "./scenes/GameOver";
import LinkGame from "./scenes/LinkGame";
import Preloader from "./scenes/Preloader";
import PuzzleGame from "./scenes/PuzzleGame";
import ShootingGame from "./scenes/ShootingGame";
import GameStatusBar from "./scenes/GameStatusBar";
import StagesStatusBar from "./scenes/StagesStatusBar";
import Stage3GameGuide from "./scenes/Stage3GameGuide";
import Stage2GameGuide from "./scenes/Stage2GameGuide";

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
    StagesStatusBar,
    PuzzleGame,
    LinkGame,
    ShootingGame,
    GameStatusBar,
    Stage2GameGuide,
    Stage3GameGuide,
    GameOver,
  ],
};
