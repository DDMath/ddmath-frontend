import Phaser from "phaser";
import Grid from "../common/Grid";

import DraggablePoint from "../stage2/DraggablePoint";
import { linkGameCardTypes } from "../stage2/linkGameCardTypes";
import { sceneEvenets } from "../events/EventsManager";

enum GameState {
  Playing,
  GameOver,
}

const TOTAL_TARGET_SCORE = 8;

export default class LinkGame extends Phaser.Scene {
  private grid!: Grid;
  private drawing!: boolean;

  private line!: Phaser.Geom.Line;
  private state = GameState.Playing;
  private graphics!: Phaser.GameObjects.Graphics;

  private completedLines: Phaser.Geom.Line[] = [];
  private _points: Phaser.GameObjects.Sprite[] = [];

  constructor() {
    super("link-game");
  }

  init() {
    this.state = GameState.Playing;

    this.drawing = false;
    this.completedLines = [];

    this.add.image(0, 0, "background3").setOrigin(0, 0);
    this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xef524f } });
  }

  create() {
    this.scene.run("status-bar", {
      scene: this,
      game: "link-game",
      totalScore: TOTAL_TARGET_SCORE,
    });

    this.grid = new Grid({
      scene: this,
      rows: 4,
      columns: 3,
      xStart: 150,
      yStart: 500,
      xOffset: 260,
      yOffset: 120,
      game: "link-game",
      cardTypes: linkGameCardTypes,
      onDragEnd: this.checkCorrection,
    });

    this.grid.addCards(0);
    this.grid.addDraggablePoint(0);
  }

  drawLine(this: LinkGame, point: Phaser.GameObjects.Sprite) {
    if (this.state === GameState.GameOver) {
      return;
    }

    this.drawing = true;

    this.line = new Phaser.Geom.Line(
      point.parentContainer.x + point.data.get("originalX"),
      point.parentContainer.y + point.data.get("originalY"),
      point.x,
      point.y
    );

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      this.line.x2 = pointer.x;
      this.line.y2 = pointer.y;
    });
  }

  checkCorrection(this: Grid, pointer: Phaser.Input.Pointer, point: Phaser.GameObjects.Sprite) {
    const { name, value } = point.parentContainer as DraggablePoint;

    for (let i = 0; i < (this.scene as LinkGame).points.length; i++) {
      const targetCard = (this.scene as LinkGame).points[i].parentContainer;
      const {
        x: pointX,
        y: pointY,
        name: targetName,
        value: targetValue,
      } = targetCard as DraggablePoint;

      const dx = Math.abs(pointX - 70 - pointer.upX);
      const dy = Math.abs(pointY - pointer.upY);
      const distance = Math.sqrt(dx * dx + dy * dy);

      const isCorrect =
        (value === "green" && targetValue === "yellow" && name === targetName) ||
        (value === "yellow" && targetValue === "blue" && name === targetName);

      if (distance < 50 && isCorrect) {
        const completedLine = new Phaser.Geom.Line(
          point.parentContainer.x + 70,
          point.parentContainer.y,
          pointX - 70,
          pointY
        );

        point.disableInteractive();

        (this.scene as LinkGame).completedLines.push(completedLine);
        sceneEvenets.emit("get-point", (this.scene as LinkGame).completedLines.length);
      }
    }

    if ((this.scene as LinkGame).completedLines.length === TOTAL_TARGET_SCORE) {
      sceneEvenets.emit("gameover");

      (this.scene as LinkGame).scene.pause("link-game");
      (this.scene as LinkGame).state = GameState.GameOver;
    }

    point.x = point.data.get("originalX");
    point.y = point.data.get("originalY");

    (this.scene as LinkGame).drawing = false;
  }

  update() {
    this.graphics.clear();

    for (let i = 0; i < this.completedLines.length; i++) {
      const line = this.completedLines[i];
      this.graphics.strokeLineShape(line);
    }

    if (this.drawing) {
      this.graphics.strokeLineShape(this.line);
    }
  }

  get points(): Phaser.GameObjects.Sprite[] {
    return this._points;
  }

  set addNewPoint(newPoint: Phaser.GameObjects.Sprite) {
    if (this._points.length === 12) {
      this._points = [];
    }

    this._points.push(newPoint);
  }
}
