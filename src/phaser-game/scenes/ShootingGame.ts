import Phaser from "phaser";

import Ball from "../stage3/Ball";
import Enemy from "../stage3/Enemy";
import Cannon from "../stage3/Cannon";

import { sceneEvents } from "../events/EventsManager";
import { updateFinalStageRecord } from "~/apis";

enum GameState {
  Playing,
  GameOver,
}

const TOTAL_ENEMY_NUMBER = 10;

export default class ShootingGame extends Phaser.Scene {
  private order!: number;
  private cannon!: Cannon;
  private enemies: Enemy[] = [];

  private state = GameState.Playing;
  private enemyGroup!: Phaser.Physics.Arcade.Group;

  constructor() {
    super("shooting-game");
  }

  init() {
    this.cameras.main.fadeIn(800);

    this.add.image(0, 0, "background2").setOrigin(0, 0);

    this.order = 1;
    this.state = GameState.Playing;

    this.createEnemyGroup();

    this.input.on("pointerup", this.handlePointerUp, this);
  }

  create() {
    this.scene.run("status-bar", {
      scene: this,
      game: "shooting-game",
      totalScore: TOTAL_ENEMY_NUMBER,
    });

    const width = this.scale.width;
    const height = this.scale.height;

    this.cannon = new Cannon(this, width / 2, height - 35, "cannon").setDepth(3);
    this.cannon.setShotPreview();

    this.createEnemies(this.enemyGroup);

    this.physics.world.setBounds(0, 50, width, height - 50);

    this.physics.add.collider(this.enemyGroup, this.cannon);
    this.physics.add.collider(this.enemyGroup, this.enemyGroup);
  }

  private handlePointerUp() {
    if (this.state === GameState.GameOver) {
      return;
    }

    this.sound.play("click", { volume: 0.3 });

    const ball = this.cannon.loadBall();

    this.cannon.shoot(ball);
    this.checkCollision(ball);

    this.cannon.getShotPreview.removePreviousPreview();
  }

  private createEnemyGroup() {
    this.enemyGroup = this.physics.add.group({
      bounceX: 1,
      bounceY: 1,
      velocityX: 150,
      velocityY: -50,
      maxVelocityX: 300,
      collideWorldBounds: true,
    });
  }

  private createEnemies(enemyGroup: Phaser.Physics.Arcade.Group) {
    for (let i = 0; i < TOTAL_ENEMY_NUMBER; i++) {
      const enemy = new Enemy(this, Math.random() * 200 + 300, Math.random() * 100, i + 1);

      enemyGroup.add(enemy).setVelocity(50, -150);
      this.enemies.push(enemy);
    }
  }

  private checkCollision(ball: Ball) {
    this.physics.add.collider(ball, this.enemyGroup, (ball, enemy) => {
      (ball as Ball).destroy();

      if (this.order !== (enemy as Enemy).value) {
        return;
      }

      (enemy as Enemy).getDamage();
      sceneEvents.emit("get-point", this.order);

      this.order++;
      this.sound.play("pop", { volume: 0.5 });

      if (this.order === TOTAL_ENEMY_NUMBER + 1) {
        this.state = GameState.GameOver;

        sceneEvents.emit("gameover");
        updateFinalStageRecord("shooting-game");
      }
    });
  }

  update() {
    this.cannon.update();
    this.enemies.forEach((enemy) => enemy.update());
  }
}
