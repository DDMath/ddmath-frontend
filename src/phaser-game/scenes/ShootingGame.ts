import Phaser from "phaser";

import Ball from "../stage3/Ball";
import Enemy from "../stage3/Enemy";
import Cannon from "../stage3/Cannon";
import GoBackButton from "../common/GoBackButton";

export default class ShootingGame extends Phaser.Scene {
  private goBackbutton!: GoBackButton;
  private background!: Phaser.GameObjects.Image;

  private order!: number;

  private ball?: Ball;
  private cannon!: Cannon;
  private enemies: Enemy[] = [];
  private enemyGroup!: Phaser.Physics.Arcade.Group;

  constructor() {
    super("shootingGame");
  }

  create() {
    this.background = this.add.image(0, 0, "desk2").setOrigin(0, 0);
    this.goBackbutton = new GoBackButton(this, 50, 50, "goBack");

    const width = this.scale.width;
    const height = this.scale.height;

    this.cannon = new Cannon(this, width / 2, height - 35, "cannon").setDepth(3);
    this.cannon.setShotPreview();

    this.enemyGroup = this.physics.add.group({
      bounceX: 1,
      bounceY: 1,
      velocityX: 150,
      velocityY: -50,
      maxVelocityX: 300,
      collideWorldBounds: true,
    });

    this.createEnemies(this.enemyGroup);

    this.physics.add.collider(this.enemyGroup, this.enemyGroup);
    this.physics.add.collider(this.enemyGroup, this.cannon);

    this.input.on("pointerup", this.handlePointerUp, this);
    this.order = 1;
  }

  handlePointerUp() {
    const ball = this.cannon.loadBall();

    this.cannon.shoot(ball);
    this.checkCollision(ball);

    this.cannon.getShotPreview.removePreviousPreview();
  }

  createEnemies(enemyGroup: Phaser.Physics.Arcade.Group) {
    for (let i = 0; i < 10; i++) {
      const enemy = new Enemy(this, Math.random() * 200 + 300, Math.random() * 100, i + 1);

      enemyGroup.add(enemy).setVelocity(50, -150);
      this.enemies.push(enemy);
    }
  }

  checkCollision(ball: Ball) {
    this.physics.add.collider(ball, this.enemyGroup, (ball, enemy) => {
      (ball as Ball).destroy();

      if (this.order !== (enemy as Enemy).value) {
        return;
      }

      (enemy as Enemy).getDamage();
      this.order++;
    });
  }

  update() {
    this.cannon.update();
    this.enemies.forEach((enemy) => enemy.update());
  }
}
