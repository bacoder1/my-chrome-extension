export default function renderEmojiToImage(emoji: string) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	canvas.width = 32; // Set desired image size
	canvas.height = 32;

	if (ctx) {
		ctx.font = "32px sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(emoji, 16, 18);
	}

	// Convert to PNG data URL
	return canvas.toDataURL("image/png");
}
