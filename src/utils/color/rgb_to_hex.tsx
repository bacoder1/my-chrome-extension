export default function rgbToHex(rgb: string) {
  const result = rgb.match(/\d+/g); // Extract RGB values from the string
  if (result) {
      return `#${result.map(value => {
          const hex = parseInt(value).toString(16).padStart(2, '0');
          return hex;
      }).join('')}`;
  }
  return ""; // Return null if the input is invalid
}