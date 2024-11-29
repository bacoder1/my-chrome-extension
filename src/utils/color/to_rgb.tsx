export default function toRgb(rgbString: string) {
  // Split the input string by commas and trim any whitespace
  const values = rgbString.split(',').map(value => value.trim());
  
  // Convert the values to integers
  const r = parseInt(values[0], 10);
  const g = parseInt(values[1], 10);
  const b = parseInt(values[2], 10);
  
  // Ensure the input values are valid RGB values (0-255)
  if (
      [r, g, b].every(value => Number.isInteger(value) && value >= 0 && value <= 255)
  ) {
      return `rgb(${r}, ${g}, ${b})`;
    } else {
    return "";
  }
}