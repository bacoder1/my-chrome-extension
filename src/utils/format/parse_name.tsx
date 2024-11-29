export default function parseName(input: string): {
	first: string;
	last: string;
} {
	const regexObviousFamily = /^([A-Z\p{L}]+) ([\p{L}\- ]+)$/u; // Uppercase family name
	const regexFallback = /^([\p{L} \-]+?) ([\p{L}\- ]+)$/u; // General fallback

	// Check if family name is all-uppercase
	const obviousMatch = input.match(regexObviousFamily);
	if (obviousMatch) {
		return {
			first: obviousMatch[2],
			last: obviousMatch[1],
		};
	}

	// Fallback to splitting by first space
	const fallbackMatch = input.match(regexFallback);
	if (fallbackMatch) {
		return {
			first: fallbackMatch[2],
			last: fallbackMatch[1],
		};
	}

	// Handle cases where no valid match is found
	return {
		first: input,
		last: "",
	};
}
