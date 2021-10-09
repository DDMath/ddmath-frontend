import Phaser from "phaser";

import Ball from "../game/Ball";
import Enemy from "../game/Enemy";
import Cannon from "../game/Cannon";
import GoBackButton from "../game/GoBackButton";

export default class ShootingGame extends Phaser.Scene {
  private goBackbutton!: GoBackButton;
  private background!: Phaser.GameObjects.Image;

  private cannon!: Cannon;
  private enemies: Enemy[] = [];

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

    this.add.existing(this.cannon);

    const group = this.physics.add.group({
      bounceX: 1,
      bounceY: 1,
      velocityX: 150,
      velocityY: 150,
      collideWorldBounds: true,
    });

    for (let i = 0; i < 10; i++) {
      const enemy = new Enemy(this, Phaser.Math.Between(300, 600), Phaser.Math.Between(0, 100));

      const dx = this.scale.width - enemy.x;
      const dy = this.scale.height - enemy.y;

      const vec = new Phaser.Math.Vector2(dx, dy);
      vec.normalize();

      group.add(enemy).setVelocity(50, -150);
      this.enemies.push(enemy);
    }

    this.physics.add.collider(group, group);
    this.physics.add.collider(group, this.cannon);
  }

  checkCollision(ball: Ball) {
    if (!ball) {
      return;
    }

    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];

      this.physics.add.collider(ball, enemy, () => {
        ball.destroy();

        this.attackEnemy(enemy);
      });

      if (ball.y < -100 || ball.y > 900) {
        ball.destroy();
      }
    }
  }

  attackEnemy(enemy: Enemy) {
    enemy.getDamage();

    if (enemy.value === 0) {
      enemy.destroy();
    }
  }

  getBall(): Ball {
    return this.cannon.getFiredBall;
  }

  update() {
    this.cannon.update();
    this.enemies.forEach((enemy) => enemy.update());

    this.checkCollision(this.getBall());
  }
}
