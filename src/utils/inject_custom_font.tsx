export default function injectCustomFont() {
	const fontFace = `
	@font-face {
			font-family: 'FixelVariable';
			src: url('${chrome.runtime.getURL(
				"src/fonts/fixel/FixelVariable.ttf"
			)}') format('truetype');
			font-weight: 100 900;
			font-style: normal;
	}
	@font-face {
			font-family: 'FixelVariable';
			src: url('${chrome.runtime.getURL(
				"src/fonts/fixel/FixelVariableItalic.ttf"
			)}') format('truetype');
			font-weight: 100 900;
			font-style: italic;
	}
	`;

	const style = document.createElement("style");
	style.textContent = fontFace;
	document.head.appendChild(style);

	// Use the correct font family name
	document.body.style.fontFamily = "FixelVariable, sans-serif"; // Updated font family
}