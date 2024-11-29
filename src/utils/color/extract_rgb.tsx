export default function extractRgb(rgbString: string): string {
	// Use a regular expression to extract the numbers from the rgb string
	const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
	const match = rgbString.match(regex);

	if (match) {
		// Extract all three values
		const red = parseInt(match[1], 10);
		const green = parseInt(match[2], 10);
		const blue = parseInt(match[3], 10);
		// Return the desired format
		return `${red}, ${green}, ${blue}`;
	}

	return ""; // Return an empty string if the input format is invalid
}
