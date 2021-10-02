import Phaser from "phaser";

import Card from "./Card";
import cardTypes from "./cardTypes";
import hitArea from "./hitArea";

type GridType = {
  scene: Phaser.Scene;
  columns: number;
  rows: number;
};

export default class Grid {
  private rows: number;
  private yStart: number;
  private xOffset: number;
  private yOffset: number;
  private columns: number;

  private scene: Phaser.Scene;
  private cards: Phaser.GameObjects.Sprite[];
  private completed: Phaser.GameObjects.Sprite[];

  constructor(data: GridType) {
    const { scene, rows, columns } = data;

    this.xOffset = 650;
    this.yOffset = 110;
    this.yStart = scene.game.config.height - 140;

    this.rows = rows;
    this.columns = columns;

    this.cards = [];
    this.completed = [];
    this.scene = scene;

    this.order = new Array(cardTypes.length).fill(null).map((_, i) => i);
    Phaser.Actions.Shuffle(this.order);

    this.addCards(0);
  }

  addCards(startIndex: number = this.columns * this.rows - 1) {
    for (let i = startIndex; i < this.columns * this.rows; i++) {
      const cardType = cardTypes[this.order.pop()];

      const card = new Card({
        scene: this.scene,
        x: this.xOffset + (this.scene.game.config.width / 2 - this.xOffset) * (i % this.columns),
        y: this.yStart - this.yOffset * Math.floor(i / this.columns),
        name: cardType.name,
        image: cardType.image,
        value: cardType.value,
        ondragend: (pointer, gameObject: Phaser.GameObjects.GameObject) => {
          for (let j = 0; j < hitArea.length; j++) {
            const area = hitArea[j];
            const { fruit, value } = gameObject;

            const xDiff = Math.abs(area.pointX - gameObject.x);
            const yDiff = Math.abs(area.pointY - gameObject.y);
            const isCorrect = area.name === fruit + "-" + value;

            if (xDiff < 40 && yDiff < 40 && isCorrect) {
              gameObject.disableInteractive();

              gameObject.originalX = area.pointX;
              gameObject.originalY = area.pointY;

              this.completed.push(gameObject);

              const order = this.cards.findIndex((card) => {
                return card.name === gameObject.name;
              });

              this.cards = this.cards.filter((_, index) => order !== index);
              this.moveCardsDown(order);

              if (this.completed.length === cardTypes.length) {
                addRestartButton();
              }
            }
          }

          gameObject.x = gameObject.originalX;
          gameObject.y = gameObject.originalY;
        },
      });

      card.depth = 1;
      this.cards.push(card);
    }
  }

  moveCardsDown(index) {
    this.cards.forEach((card, i) => {
      if (index > i) {
        return;
      }

      card.originalY = card.y + this.yOffset;

      this.scene.tweens.add({
        targets: card,
        duration: 150,
        y: card.y + this.yOffset,
      });
    });

    if (this.completed.length + this.cards.length < cardTypes.length) {
      setTimeout(() => this.addCards(), 300);
    }
  }
}
