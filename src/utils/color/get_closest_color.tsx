import hexToRgb from "./hex_to_rgb";
import rgbToHex from "./rgb_to_hex";

export default function getClosestColor(rgbInput: string, hexColors: string[]) {
  const colors = hexColors.map((color: string) => color.replace("#", ""));

  const newColor = rgbToHex(rgbInput); // Convert RGB to HEX
  const res = colors.map((color: string) => getDiffColor(color, newColor));
  const closestColorIndex = res.indexOf(Math.min(...res));

  const { r, g, b } = hexToRgb(colors[closestColorIndex]);
  return `${r}, ${g}, ${b}`; // Return closest HEX color
}

// Function to calculate the difference between two colors
function getDiffColor(cola: string, colb: string) {
  const a = hexToRgb(cola);
  const b = hexToRgb(colb);
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2),
  );
}
