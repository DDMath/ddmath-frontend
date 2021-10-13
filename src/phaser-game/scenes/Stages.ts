import Phaser from "phaser";
import { sceneEvents } from "../events/EventsManager";

export default class Stages extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private character!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  public lastStage?: number;

  constructor() {
    super("stages");
  }

  create() {
    this.add.image(0, 0, "stages").setOrigin(0, 0);

    this.createButtons();
    this.createCharacter();

    this.cursors = this.input.keyboard.createCursorKeys();

    sceneEvents.on("logout", this.handleLogout, this);

    this.handleSceneEventsOff();
  }

  createCharacter() {
    this.character = this.physics.add
      .sprite(110, 410, "character-stand")
      .setSize(150, 180)
      .setOrigin(0.5, 1)
      .setOffset(30, 15)
      .setScale(0.5)
      .play("character-stand");
  }

  createButtons() {
    const { lastStage } = this.registry.get("user");

    for (let i = 0; i <= lastStage; i++) {
      const button = new Phaser.GameObjects.Sprite(this, 50 + 200 * i, 365, `stage${i + 1}`);

      button.setOrigin(0, 0).setInteractive();
      this.add.existing(button);

      const games = ["puzzle-game", "link-game", "shooting-game"];

      button.on("pointerdown", () => {
        this.scene.start(games[i]);
        this.scene.stop("stages-status-bar");
      });

      button.on("pointerover", () => button.setTint(0xf8edeb));
      button.on("pointerout", () => button.clearTint());
    }

    for (let i = lastStage + 1; i < 3; i++) {
      const lockedButton = new Phaser.GameObjects.Sprite(this, 50 + 200 * i, 365, "lock");

      lockedButton.setOrigin(0, 0);
      this.add.existing(lockedButton);
    }
  }

  handleLogout() {
    localStorage.removeItem("accessToken");
    this.registry.remove("user");

    window.location.href = "/";
  }

  handleSceneEventsOff() {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("logout", this.handleLogout);
    });
  }

  update() {
    this.character.setDrag(1000);

    if (this.cursors.right.isDown) {
      const velocity = 100;

      this.character.play("character-run", true);
      this.character.setVelocityX(velocity);
    } else if (this.cursors.left.isDown) {
      const velocity = -100;

      this.character.setScale(-0.5, 0.5);
      this.character.setVelocityX(velocity);

      this.character.play("character-run", true);
    } else {
      this.character.setScale(0.5);
      this.character.play("character-stand", true);
    }
  }
}
