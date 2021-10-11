import Phaser from "phaser";

export default class Stages extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private character!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super("stages");
  }

  create() {
    this.add.image(0, 0, "stages").setOrigin(0, 0);

    this.createButtons();
    this.createCharacter();

    this.cursors = this.input.keyboard.createCursorKeys();
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
    const spriteStage1 = new Phaser.GameObjects.Sprite(this, 50, 365, "stage1").setOrigin(0, 0);
    const spriteStage2 = new Phaser.GameObjects.Sprite(this, 250, 365, "stage2").setOrigin(0, 0);
    const spriteStage3 = new Phaser.GameObjects.Sprite(this, 450, 365, "stage3").setOrigin(0, 0);

    spriteStage1.setInteractive();
    spriteStage2.setInteractive();
    spriteStage3.setInteractive();

    this.add.existing(spriteStage1);
    this.add.existing(spriteStage2);
    this.add.existing(spriteStage3);

    spriteStage1.on("pointerdown", () => this.scene.start("puzzle-game"));
    spriteStage1.on("pointerover", () => spriteStage1.setTint(0xf8edeb));
    spriteStage1.on("pointerout", () => spriteStage1.clearTint());

    spriteStage2.on("pointerdown", () =>
      this.scene.start("link-game", { totalScore: 8, game: "link-game" })
    );
    spriteStage2.on("pointerover", () => spriteStage2.setTint(0xf8edeb));
    spriteStage2.on("pointerout", () => spriteStage2.clearTint());

    spriteStage3.on("pointerdown", () => this.scene.start("shooting-game"));
    spriteStage3.on("pointerover", () => spriteStage3.setTint(0xf8edeb));
    spriteStage3.on("pointerout", () => spriteStage3.clearTint());
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
