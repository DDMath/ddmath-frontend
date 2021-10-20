import Phaser from "phaser";

import Stages from "./scenes/Stages";
import GameOver from "./scenes/GameOver";
import Preloader from "./scenes/Preloader";
import PuzzleGame from "./scenes/PuzzleGame";
import ShootingGame from "./scenes/ShootingGame";
import MatchingGame from "./scenes/MatchingGame";
import GameStatusBar from "./scenes/GameStatusBar";
import StagesStatusBar from "./scenes/StagesStatusBar";
import Stage1GameGuide from "./scenes/Stage1GameGuide";
import Stage2GameGuide from "./scenes/Stage2GameGuide";
import Stage3GameGuide from "./scenes/Stage3GameGuide";

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
    MatchingGame,
    ShootingGame,
    GameStatusBar,
    Stage1GameGuide,
    Stage2GameGuide,
    Stage3GameGuide,
    GameOver,
  ],
};
