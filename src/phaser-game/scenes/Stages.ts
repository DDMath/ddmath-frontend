import Phaser from "phaser";

enum CharacterState {
  Running,
  Standing,
}

export default class Stages extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private background!: Phaser.GameObjects.Image;
  private characterState = CharacterState.Standing;
  character!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super("stages");
  }

  create() {
    this.background = this.add.image(0, 0, "stages").setOrigin(0, 0);

    const spriteStage1 = new Phaser.GameObjects.Sprite(this, 50, 365, "stage1").setOrigin(0, 0);
    const spriteStage2 = new Phaser.GameObjects.Sprite(this, 250, 365, "stage2").setOrigin(0, 0);

    spriteStage1.setInteractive();
    spriteStage2.setInteractive();

    this.add.existing(spriteStage1);
    this.add.existing(spriteStage2);

    spriteStage1.on("pointerdown", () => this.scene.start("puzzlegame"));
    spriteStage1.on("pointerover", () => spriteStage1.setTint(0xf8edeb));
    spriteStage1.on("pointerout", () => spriteStage1.clearTint());

    spriteStage2.on("pointerdown", () => this.scene.start("linkgame"));
    spriteStage2.on("pointerover", () => spriteStage2.setTint(0xf8edeb));
    spriteStage2.on("pointerout", () => spriteStage2.clearTint());

    this.character = this.physics.add
      .sprite(110, 410, "character-stand")
      .setSize(150, 180)
      .setOrigin(0.5, 1)
      .setOffset(30, 15)
      .setScale(0.5)
      .play("character-stand");

    this.cursors = this.input.keyboard.createCursorKeys();
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
