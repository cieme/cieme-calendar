import { Text, type TextStyleOptions } from "pixi.js";
export function genLabel(text: string) {
  /* label */
  const style: TextStyleOptions = {
    fontFamily: "Arial",
    fontSize: 14,
    fill: {
      color: "0x407cf4",
    },
    align: "center",
    // stroke: { color: "#ffffff", width: 2, join: "round" },
    lineHeight: 20,
    // dropShadow: {
    //   color: "0xffffff",
    //   blur: 4,
    //   angle: Math.PI / 6,
    //   distance: 0,
    // },
  };
  const textComponent = new Text({
    text,
    style,
  });
  return textComponent;
}
