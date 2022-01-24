import * as valise from "../../valise.json";

export const renderSvg = (tokenData: number[]): string => {
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 255">';

  for (const id of tokenData) {
    if (valise[id]) {
      svg += valise[id];
    }
  }

  svg += "</svg>";

  return svg;
};
