import Phaser from "phaser";
import LogOutButton from "../common/LogOutButton";
import SoundToggleButton from "../common/SoundToggleButton";
import UserInformation from "../common/UserStatus";

export interface IUser {
  _id: string;
  email: string;
  lastStage: string;
}

export default class StagesStatusBar extends Phaser.Scene {
  private user!: IUser;

  constructor() {
    super("stages-status-bar");
  }

  init() {
    this.user = this.registry.get("user");
  }

  create() {
    this.createStatusBarElements();
  }

  private createStatusBarElements() {
    this.add.rectangle(0, 0, 800, 60, 0x90be6d, 0.8).setOrigin(0, 0);

    new UserInformation(this, 30, 10, "user-info", this.user);
    new LogOutButton(this, 730, 10, "logout");
    new SoundToggleButton(this, 680, 10, "sound-on");
  }
}