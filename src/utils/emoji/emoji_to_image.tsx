export default function renderEmojiToImage(emoji: string, size: number = 32) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = size; // Set desired image size
  canvas.height = size;

  if (ctx) {
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, size / 2, size / 2 + size * 0.0625);
  }

  // Convert to PNG data URL
  return canvas.toDataURL("image/png");
}
