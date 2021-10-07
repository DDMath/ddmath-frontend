import Phaser from "phaser";

import Grid from "../game/Grid";
import GameBoard from "../game/GameBoard";
import hitArea from "../game/puzzleHitArea";
import GoBackButton from "../game/GoBackButton";
import DraggableCard from "../game/DraggableCard";
import { puzzleGameCardTypes } from "../game/puzzleGameCardTypes";

export default class PuzzleGame extends Phaser.Scene {
  private grid!: Grid;
  private goBackbutton!: GoBackButton;
  private background!: Phaser.GameObjects.Image;

  constructor() {
    super("puzzleGame");
  }

  create() {
    this.background = this.add.image(0, 0, "desk1").setOrigin(0, 0);

    const board = new GameBoard(this, 30, 30);
    this.add.existing(board);

    this.goBackbutton = new GoBackButton(this, 50, 50, "goBack");

    const grid = new Grid({
      scene: this,
      rows: 5,
      columns: 1,
      xStart: 670,
      yStart: 460,
      xOffset: 650,
      yOffset: 110,
      game: "puzzleGame",
      cardTypes: puzzleGameCardTypes,
      onDragEnd: this.checkCoordinates,
    });

    this.grid = grid;
  }

  checkCoordinates<P, D extends DraggableCard>(this: Grid, pointer: P, gameObject: D) {
    for (let i = 0; i < hitArea.length; i++) {
      const area = hitArea[i];
      const { fruit, value } = gameObject;

      const distanceX = Math.abs(area.pointX - gameObject.x);
      const distanceY = Math.abs(area.pointY - gameObject.y);
      const isCorrect = area.name === fruit + "-" + value;

      if (distanceX < 60 && distanceY < 60 && isCorrect) {
        gameObject.depth = 0;
        gameObject.disableInteractive();

        gameObject.originalX = area.pointX;
        gameObject.originalY = area.pointY;

        const order = this.cards.findIndex((card) => {
          return card.name === gameObject.name;
        });

        this.completedCards++;

        this.removeCompletedCard(order);
        this.moveCardsDown(order);

        if (this.completedCards === puzzleGameCardTypes.length) {
          // addRestartButton();
        }
      }
    }

    gameObject.x = gameObject.originalX;
    gameObject.y = gameObject.originalY;
  }
}
