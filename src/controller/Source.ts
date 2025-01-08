import {
  type TextStyleOptions,
  type FederatedPointerEvent,
  Sprite,
  Text,
  Container,
  Assets,
  NineSliceSprite,
} from "pixi.js";
import { watchEffect } from "vue";

import { Components, genLabel } from "@/core";

import { LinkArrow } from "@/controller/tools/LinkArrow";
import { store } from "@/store/store";

export default class Source extends Components {
  static defaultConfig = {
    Label: "源",
    Sprite: "./images/source/icon_source_000.png",
  };

  selectNode: NineSliceSprite = null;

  constructor(config: any) {
    super(config);
    this.init();
    this.onload();
  }
  init() {
    this.node.label = Source.defaultConfig.Label;
    this.node.interactive = true;
    /*  */
    const sprite = new Sprite();
    sprite.anchor.set(0.5, 0.5);
    sprite.label = "icon";
    Assets.load(Source.defaultConfig.Sprite).then((texture) => {
      sprite.texture = texture;
    });
    /*  */
    const bg = this.genBg(0x383e50);
    bg.width = 40;
    bg.height = 40;
    bg.anchor.set(0.5, 0.5);
    bg.label = "背景色";
    /*  */
    const selectNode = this.genSelect(0x407cf4);
    selectNode.width = 40;
    selectNode.height = 40;
    selectNode.pivot.set(20, 20); // 这行不太理解
    selectNode.label = "选中";
    selectNode.visible = false;
    this.selectNode = selectNode;
    /* 文字 */
    const text = genLabel(Source.defaultConfig.Label);
    text.anchor.set(0.5, 0);
    text.y = 20;
    /* 箭头 */
    const arrow = new LinkArrow();
    arrow.node.anchor.set(0, 0.5);
    arrow.node.x = 20;
    arrow.node.y = 0;

    /* 添加到容器上 */
    this.node.addChild(bg, selectNode, sprite, text, arrow.node);
  }
  onload() {
    this.setEvent();
  }
  onstart() {}
  setEvent() {
    this.node.on("click", (event: FederatedPointerEvent) => {
      if (event.ctrlKey) {
        this.choose();
      } else {
        this.chooseSelf();
      }
    });
  }
  chooseSelf() {
    store.StoreScene.value.componentList.forEach((value) => {
      if (value.uniqueId === this.uniqueId) return;
      (value as Source).selectNode.visible = false;
    });
    store.StoreScene.value.selectComponentList.clear();
    store.StoreScene.value.selectComponentList.set(this.uniqueId, this);
    this.selectNode.visible = true;
  }
  choose() {
    store.StoreScene.value.selectComponentList.set(this.uniqueId, this);
    this.selectNode.visible = true;
  }
  x = watchEffect(() => {
    console.log(store.StoreScene.value.selectComponentList);
  });
  removeEvent() {}
  override initVue(config: any) {}
}
