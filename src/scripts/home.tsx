// import extractRgb from "../utils/extract_rgb";

export default function home() {
	const widgetTitles: { [key: string]: string } = {
		"Travail à faire pour les prochains jours": "Devoirs",
		"Découvrir les actualités et les documents du CDI depuis e-sidoc":
			"Actualités & Documents du CDI",
	};

	document.querySelectorAll(".widget").forEach((el) => {
		const title = el.querySelector("header > h2 > span");

		if (title?.textContent) {
			title.textContent = widgetTitles[title.textContent] ?? title.textContent;
		}
	});

	console.log("dsdsq")

	document.querySelectorAll(".widget.edt ul.liste-cours li").forEach((el) => {
		const colorLine = el.querySelector(".trait-matiere");
		if (colorLine) {
			// let color = window.getComputedStyle(colorLine).backgroundColor;

			// color = extractRgb(color);

			// (el as HTMLElement).style.setProperty(
			// 	"--subject-color",
			// 	color
			// );
		}
	});

}

// function rgbToHex(string: string) {
// 	function componentToHex(c: number) {
// 		var hex = c.toString(16);
// 		return hex.length == 1 ? "0" + hex : hex;
// 	}

// 	const [r, g, b] = string.match(/\d+/g)?.map(Number) || [0, 0, 0];
// 	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
// }
