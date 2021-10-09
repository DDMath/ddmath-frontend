import Phaser from "phaser";
import Grid from "../common/Grid";

import GoBackButton from "../common/GoBackButton";
import DraggablePoint from "../stage2/DraggablePoint";
import { linkGameCardTypes } from "../stage2/linkGameCardTypes";

interface Test extends Phaser.Scene {
  drawLine(this: LinkGame, point: Phaser.GameObjects.Sprite): void;
}
export default class LinkGame extends Phaser.Scene implements Test {
  private grid!: Grid;
  private drawing!: boolean;
  private line!: Phaser.Geom.Line;
  private goBackbutton!: GoBackButton;
  private background!: Phaser.GameObjects.Image;
  private graphics!: Phaser.GameObjects.Graphics;
  private completedLines: Phaser.Geom.Line[] = [];
  private _points: Phaser.GameObjects.Sprite[] = [];

  constructor() {
    super("linkGame");
  }

  create() {
    const grid = new Grid({
      scene: this,
      rows: 4,
      columns: 3,
      xStart: 150,
      yStart: 480,
      xOffset: 260,
      yOffset: 120,
      game: "linkGame",
      cardTypes: linkGameCardTypes,
      onDragEnd: this.checkCorrection,
    });

    this.grid = grid;
    this.drawing = false;

    this.background = this.add.image(0, 0, "desk3").setOrigin(0, 0);
    this.goBackbutton = new GoBackButton(this, 50, 50, "goBack");
    this.completedLines = [];

    this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xef524f } });
  }

  drawLine(this: LinkGame, point: Phaser.GameObjects.Sprite) {
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

      const distanceX = Math.abs(pointX - 70 - pointer.upX);
      const distanceY = Math.abs(pointY - pointer.upY);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      const isCorrect =
        (value === "blue" && targetValue === "yellow" && name === targetName) ||
        (value === "yellow" && targetValue === "green" && name === targetName);

      if (distance < 50 && isCorrect) {
        const completedLine = new Phaser.Geom.Line(
          point.parentContainer.x + 70,
          point.parentContainer.y,
          pointX - 70,
          pointY
        );

        (this.scene as LinkGame).completedLines.push(completedLine);
      }
    }

    point.x = point.data.get("originalX");
    point.y = point.data.get("originalY");

    (this.scene as LinkGame).drawing = false;
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
