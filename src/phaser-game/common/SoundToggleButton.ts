import Phaser from "phaser";
import { sceneEvents } from "../events/EventsManager";

export default class SoundToggleButton extends Phaser.GameObjects.Sprite {
  private music: Phaser.Sound.BaseSound;

  constructor(scene: Phaser.Scene, x: number, y: number, image: string) {
    super(scene, x, y, image);

    scene.add.existing(this);

    this.music = this.scene.sound.get("background-music");
    this.setInteractive().setOrigin(0, 0);
    this.setTextureImage();

    this.on("pointerover", function (this: Phaser.GameObjects.Image) {
      this.setTint(0xf8edeb);
    });

    this.on("pointerout", function (this: Phaser.GameObjects.Image) {
      this.clearTint();
    });

    this.on("pointerdown", function (this: SoundToggleButton) {
      sceneEvents.emit("toggleBackgroundMusic");

      this.setTextureImage();
    });
  }

  setTextureImage() {
    if (this.music.isPlaying) {
      this.setTexture("sound-on");
    } else {
      this.setTexture("sound-off");
    }
  }
}
