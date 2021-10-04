import Phaser from "phaser";
import DraggableCard from "./DraggableCard";
import shuffleArray from "../../utils/shuffleArray";

import { MatchGameCardType } from "./matchGameCardTypes";

type DataType = {
  rows: number;
  columns: number;
  xStart: number;
  yStart: number;
  xOffset: number;
  yOffset: number;
  scene: Phaser.Scene;
  cardTypes: MatchGameCardType[];
  onDragEnd(gameObject: DraggableCard): void;
};

export default class Grid {
  private rows: number;
  private xStart: number;
  private yStart: number;
  private xOffset: number;
  private yOffset: number;
  private columns: number;
  private cardOrder: number[];
  private _completedCards = 0;

  private scene: Phaser.Scene;
  private cardTypes: MatchGameCardType[];
  private _cards: DraggableCard[] = [];

  onDragEnd: (gameObject: DraggableCard) => void;

  constructor(data: DataType) {
    const { scene, rows, columns, xOffset, yOffset, xStart, yStart, cardTypes, onDragEnd } = data;

    this.scene = scene;
    this.rows = rows;
    this.columns = columns;

    this.xStart = xStart;
    this.yStart = yStart;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.onDragEnd = onDragEnd;

    this.cardTypes = cardTypes;

    const numberArray = new Array(this.cardTypes.length).fill(null).map((_, i) => i);
    this.cardOrder = shuffleArray(numberArray);

    this.addCards(0);
  }

  addCards(startIndex: number = this.columns * this.rows - 1) {
    for (let i = startIndex; i < this.columns * this.rows; i++) {
      const cardType = this.cardTypes[this.cardOrder.pop() || 0];

      const card = new DraggableCard({
        scene: this.scene,
        x: this.xStart + this.xOffset * (i % this.columns),
        y: this.yStart - this.yOffset * Math.floor(i / this.columns),
        name: cardType.name,
        image: cardType.image,
        value: cardType.value,
        ondragend: (pointer: Phaser.Input.Pointer, gameObject: DraggableCard) => {
          this.onDragEnd(gameObject);
        },
      });

      card.depth = 1;
      this.cards.push(card);
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
    this.cards = this.cards.filter((_, index) => order !== index);
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
