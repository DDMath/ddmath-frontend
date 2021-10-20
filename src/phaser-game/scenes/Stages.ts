import Phaser from "phaser";
import { sceneEvents } from "../events/EventsManager";

export default class Stages extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private coin?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private character!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private stone!: Phaser.GameObjects.Sprite;
  private girlfriend!: Phaser.GameObjects.Sprite;

  constructor() {
    super("stages");
  }

  create() {
    this.cameras.main.fadeIn(800);

    this.add.image(0, 0, "stages").setOrigin(0, 0);

    this.createButtons();
    this.createCharacter();
    this.createClickGuide();
    this.createStageClearReward();

    this.cursors = this.input.keyboard.createCursorKeys();

    sceneEvents.on("logout", this.handleLogout, this);
    this.handleSceneEventsOff();
  }

  createCharacter() {
    const { lastStage } = this.registry.get("user");
    const location = Math.min(lastStage, 2);

    this.character = this.physics.add
      .sprite(100 + 200 * location, 410, "character-stand")
      .setSize(150, 180)
      .setOrigin(0.5, 1)
      .setOffset(30, 15)
      .setGravityY(-30)
      .setScale(0.5)
      .setDepth(1)
      .play("character-stand");

    this.character.body.setOffset(20, 20);

    this.add.sprite(360, 290, "stone1").setOrigin(0.5, 1).setScale(1, 0.7);
    this.stone = this.add.sprite(410, 320, `stone${lastStage + 1}`).setOrigin(0.5, 1);
    this.add.sprite(460, 350, "stone1").setOrigin(0.5, 1).setScale(1, 0.7);
  }

  createButtons() {
    const { lastStage } = this.registry.get("user");

    for (let i = 0; i < lastStage + 1; i++) {
      if (i === 3) {
        return;
      }

      const button = new Phaser.GameObjects.Sprite(this, 50 + 200 * i, 365, `stage${i + 1}`);
      button.setOrigin(0, 0).setInteractive();

      this.add.existing(button);

      const games = ["shooting-game", "puzzle-game", "matching-game"];

      button.on("pointerover", () => button.setTint(0xf8edeb));
      button.on("pointerout", () => button.clearTint());
      button.on("pointerdown", () => {
        this.scene.start(games[i]);
        this.scene.stop("stages-status-bar");
      });
    }

    for (let i = lastStage + 1; i < 3; i++) {
      const lockedButton = new Phaser.GameObjects.Sprite(this, 50 + 200 * i, 365, "lock");

      lockedButton.setOrigin(0, 0);
      this.add.existing(lockedButton);
    }
  }

  createClickGuide() {
    const { lastStage } = this.registry.get("user");

    if (lastStage === 3) {
      return;
    }

    this.add.sprite(160 + 200 * lastStage, 450, "cursor-image").play("cursor");
  }

  createStageClearReward() {
    const { lastStage } = this.registry.get("user");

    if (lastStage === 3) {
      this.coin = this.physics.add
        .sprite(630, 360, "coin-image")
        .setOrigin(0.5, 0.5)
        .setGravity(0, -30)
        .setSize(50, 50)
        .setScale(1.1)
        .setDepth(0)
        .play("coin");

      this.coin.body.offset.x = 0;
      this.coin.body.offset.y = 0;

      this.coin.setInteractive().on("pointerdown", () => {
        this.tweens.add({
          targets: this.character,
          duration: 1000,
          delay: 1000,
          x: 580,
        });
      });

      this.physics.add.collider(this.character, this.coin, () => {
        this.coin?.destroy();
        this.sound.play("coin", { volume: 0.5 });

        this.tweens.add({
          targets: this.stone,
          duration: 1000,
          delay: 500,
          alpha: 0,
        });

        this.girlfriend = this.add
          .sprite(650, 360, "character-stand")
          .setOrigin(0.5, 0.5)
          .setFlipX(true)
          .setScale(0.5)
          .setDepth(1)
          .setAlpha(0)
          .play("character-stand");

        this.tweens.add({
          targets: this.girlfriend,
          duration: 1000,
          delay: 500,
          alpha: 1,
        });

        const heart = this.add.sprite(615, 300, "heart").setAlpha(0).setDepth(0);
        this.add.existing(heart);

        this.tweens.add({
          targets: heart,
          duration: 1000,
          delay: 1000,
          scale: 1.6,
          alpha: 0.7,
          repeat: -1,
        });
      });
    }
  }

  handleLogout() {
    this.registry.remove("user");

    window.location.href = "/";
  }

  handleSceneEventsOff() {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("logout", this.handleLogout);
    });
  }

  update() {
    if (this.cursors.right.isDown) {
      if (this.character.x > 575) {
        this.character.x = 575;
        return;
      }

      const velocity = 130;

      this.character.play("character-run", true);
      this.character.setVelocityX(velocity).setFlipX(false);
    } else if (this.cursors.left.isDown) {
      if (this.character.x < 50) {
        this.character.x = 50;
        return;
      }

      const velocity = -130;

      this.character.play("character-run", true);
      this.character.setVelocityX(velocity).setFlipX(true);
    } else {
      const velocity = 0;

      this.character.setScale(0.5).setVelocityX(velocity);
      this.character.play("character-stand", true);
    }
  }
}
