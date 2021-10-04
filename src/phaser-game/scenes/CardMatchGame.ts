import Phaser from "phaser";

import Grid from "../game/Grid";
import hitArea from "../game/hitArea";
import GameBoard from "../game/GameBoard";
import cardTypes from "../game/matchGameCardTypes";
import DraggableCard from "../game/DraggableCard";

export default class CardMatchGame extends Phaser.Scene {
  private grid!: Grid;
  private background!: Phaser.GameObjects.Image;

  constructor() {
    super("matchgame");
  }

  create() {
    this.background = this.add.image(0, 0, "desk1").setOrigin(0, 0);

    const board = new GameBoard(this, 30, 30);
    this.add.existing(board);

    const grid = new Grid({
      scene: this,
      rows: 5,
      columns: 1,
      xStart: 670,
      yStart: 460,
      xOffset: 650,
      yOffset: 110,
      cardTypes,
      onDragEnd: this.checkCoordinates,
    });

    this.grid = grid;
  }

  checkCoordinates<T extends DraggableCard>(this: Grid, gameObject: T) {
    for (let i = 0; i < hitArea.length; i++) {
      const area = hitArea[i];
      const { fruit, value } = gameObject;

      const xDiff = Math.abs(area.pointX - gameObject.x);
      const yDiff = Math.abs(area.pointY - gameObject.y);
      const isCorrect = area.name === fruit + "-" + value;

      if (xDiff < 40 && yDiff < 40 && isCorrect) {
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

        if (this.completedCards === cardTypes.length) {
          addRestartButton();
        }
      }
    }

    gameObject.x = gameObject.originalX;
    gameObject.y = gameObject.originalY;
  }
}
