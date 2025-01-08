import { Sprite, Assets } from "pixi.js";

export class LinkArrow {
  node = new Sprite();
  constructor() {
    this.init();
  }
  init() {
    Assets.load("./images/icon/link_dot.png").then((texture) => {
      this.node.texture = texture;
    });
  }
}
