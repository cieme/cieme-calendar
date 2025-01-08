import { Assets, Sprite, NineSliceSprite, Texture, Container } from "pixi.js";
import { type Ref, reactive } from "vue";
import { uuid } from "@/utils/uuid";

export class Components {
  /** 唯一ID */
  uniqueId: string = uuid();
  /* ref 会类型报错，所以只能模拟一下了 */
  public active = reactive({
    value: false,
  });
  /**
   * 配置参数
   */
  _config = null;
  get config() {
    return this._config;
  }
  set config(value) {
    this._config = value;
  }
  /**
   * 节点
   */
  node: Container = new Container();

  constructor(config) {
    this.config = config;
    this.initVue(config);
  }
  initVue(config: any) {}

  dispose() {
    this.config = null;
  }
  genBg(color?: number): Sprite {
    const sprite = new Sprite();
    Assets.load("./images/icon/default-9.png").then((texture) => {
      sprite.texture = texture;
    });
    if (color) {
      sprite.tint = color;
    }
    return sprite;
  }
  genSelect(color?: number): NineSliceSprite {
    const sprite = new NineSliceSprite({
      texture: Texture.EMPTY,
      leftWidth: 4,
      rightWidth: 4,
      topHeight: 4,
      bottomHeight: 4,
    });
    Assets.load("./images/icon/selected-9.png").then((texture) => {
      sprite.texture = texture;
    });
    if (color) {
      sprite.tint = color;
    }
    return sprite;
  }
}
