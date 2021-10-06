import Phaser from "phaser";
import DraggableCard from "./DraggableCard";
import DraggablePoint from "./DraggablePoint";
import shuffleArray from "../../utils/shuffleArray";

import { LinkGameCardTypes } from "./linkGameCardTypes";
import { PuzzleGameCardTypes } from "./puzzleGameCardTypes";

type DataType = {
  rows: number;
  columns: number;
  xStart: number;
  yStart: number;
  xOffset: number;
  yOffset: number;
  scene: Phaser.Scene;
  game: "puzzleGame" | "linkGame";
  cardTypes: PuzzleGameCardTypes[] | LinkGameCardTypes[];
  onDragEnd(
    pointer: Phaser.Input.Pointer,
    gameObject?: DraggableCard | Phaser.GameObjects.Sprite
  ): void;
};

export default class Grid {
  private game: string;
  private rows: number;
  private columns: number;
  private xStart: number;
  private yStart: number;
  private xOffset: number;
  private yOffset: number;
  private cardOrder: number[];
  private _completedCards = 0;

  public scene: Phaser.Scene;
  private _cards: DraggableCard[] = [];
  private cardTypes: PuzzleGameCardTypes[] | LinkGameCardTypes[];

  onDragEnd: (
    pointer: Phaser.Input.Pointer,
    gameObject?: DraggableCard | Phaser.GameObjects.Sprite
  ) => void;

  constructor(data: DataType) {
    const { scene, rows, columns, xOffset, yOffset, xStart, yStart, cardTypes, onDragEnd, game } =
      data;

    this.scene = scene;
    this.rows = rows;
    this.columns = columns;

    this.xStart = xStart;
    this.yStart = yStart;
    this.xOffset = xOffset;
    this.yOffset = yOffset;

    this.onDragEnd = onDragEnd;
    this.cardTypes = cardTypes;
    this.game = game;

    const numberArray = new Array(this.cardTypes.length).fill(null).map((_, i) => i);
    this.cardOrder = this.cardOrder = shuffleArray<number[]>(numberArray, this.columns);

    this.addCards(0);
  }

  addCards(startIndex: number = this.columns * this.rows - 1) {
    for (let i = startIndex; i < this.columns * this.rows; i++) {
      const cardType = this.cardTypes[this.cardOrder.pop() || 0];

      const card = new DraggableCard({
        scene: this.scene,
        x: this.xStart + this.xOffset * Math.floor(i / this.rows),
        y: this.yStart - this.yOffset * (i % this.rows),
        name: cardType.name,
        game: this.game,
        image: cardType.image,
        value: cardType.value,
        ondragend: (pointer: Phaser.Input.Pointer, gameObject: DraggableCard) => {
          this.onDragEnd(pointer, gameObject);
        },
      });

      card.depth = 1;
      this.cards.push(card);

      if (this.game === "linkGame") {
        const point = new DraggablePoint({
          scene: this.scene,
          x: this.xStart + this.xOffset * Math.floor(i / this.rows),
          y: this.yStart - this.yOffset * (i % this.rows),
          name: cardType.name,
          image: cardType.image,
          value: cardType.value,
          ondragend: (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) => {
            this.onDragEnd(pointer, gameObject);
          },
        });

        point.depth = 2;
      }
    }
  }

  moveCardsDown(index: number) {
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

    if (this.completedCards + this.cards.length < this.cardTypes.length) {
      setTimeout(() => this.addCards(), 300);
    }
  }

  removeCompletedCard(order: number) {
    this.cards = this.cards.filter((card, index) => order !== index);
  }

  get completedCards() {
    return this._completedCards;
  }

  set completedCards(number) {
    this._completedCards = number;
  }

  get cards() {
    return this._cards;
  }

  set cards(cardList) {
    this._cards = cardList;
  }
}
