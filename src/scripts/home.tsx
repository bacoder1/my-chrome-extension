// import extractRgb from "../utils/extract_rgb";

// import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { ArrowUpRight, createElement } from "lucide";

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

	console.log("dsdsq");

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

	document.querySelectorAll(".widget .cta-conteneur i").forEach((element) => {
		if (!element.querySelector("svg"))
			element.insertAdjacentElement("beforeend", createElement(ArrowUpRight));
	});

	const MIN_DURATION = 0.3; // minimum animation duration in seconds
	const MAX_DURATION = 0.9; // maximum animation duration in seconds

	document.querySelectorAll(".widget").forEach((el: any) => {
		// Random duration between MIN_DURATION and MAX_DURATION
		const randomDuration =
			MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);

		// Apply the duration to each element
		el.style.animationDuration = `${randomDuration}s`;
	});

	chrome.storage.sync.get("widgets", (result) => {
		let widgets = result.widgets;

		console.log(widgets);

		// if (!widgets) {
		widgets = Array.from(document.querySelectorAll("section.widget"))
			.map((element) => {
				// Check if the element is not hidden (display !== "none")
				if (window.getComputedStyle(element).display === "none") {
					return null; // Skip this widget by returning null
				}

				// Extract the label from the element
				let label = element.querySelector("header h2 span")?.textContent || "";
				label = label.trim();

				if (label) {
					const exceptions: Record<string, string> = {
						"Informations & Sondages": "Infos",
						"Actualités & Documents du CDI": "CDI",
						"Carnet de correspondance": "Carnet",
						"Dernières ressources pédagogiques": "Ressources",
						"Dernières évaluations": "Evals.",
						"Dernières notes": "Notes",
					};

					// Apply exception mapping
					return exceptions[label] ?? label;
				}

				return null; // If no valid label, return null
			})
			.filter((label) => label !== null); // Remove null values from the array

		console.log("set storage to " + widgets);

		// }

		chrome.storage.sync.set({ widgets });
		// let accentColor = result.accentColor;

		// if (!accentColor) {
		// 	// If `accentColor` is empty, set it to the first color in colorList
		// 	accentColor = colorList[0];
		// 	chrome.storage.sync.set({ accentColor });
		// }

		// // Now apply accentColor's RGB values to CSS variables
		// for (let key in accentColor.rgb) {
		// 	const value = accentColor.rgb[key];
		// 	document.body.style.setProperty(`--accent-color-${key}`, value);
		// }
	});

	// wobble

	// widgets.forEach((widget) => {
	// 	const titleContainer = widget.querySelector("header > h2");

	// 	if (titleContainer) {
	// 		widget.addEventListener("mousedown", (event: any) =>
	// 			dragMouseDown(widget, event)
	// 		);

	// 		window.addEventListener("mouseup", () => holdCancel(widget));

	// 		widget.addEventListener("mouseleave", () => holdCancel(widget));
	// 	}
	// });
	// // Declare variables in a scope accessible to all functions
	// let pos1 = 0;
	// let pos2 = 0;
	// let pos3 = 0;
	// let pos4 = 0;
	// let pos5 = 0;
	// let pos6 = 0;
	// let boundMoveWidget: (e: MouseEvent) => void;

	// const holdCancel = (widget: HTMLElement) => {
	// 	clearTimeout(timeoutId);
	// 	widget.classList.remove("wobbling");
	// };

	// const dragMouseDown = (widget: HTMLElement, e: MouseEvent) => {
	// 	e = e || window.event;
	// 	e.preventDefault();

	// 	// Get the mouse cursor position at startup
	// 	pos3 = e.clientX;
	// 	pos4 = e.clientY;
	// 	pos6 = document.querySelector(".interface_affV_client")?.scrollTop ||0;

	// 	// Create a bound version of moveWidget that we can reference later
	// 	boundMoveWidget = (e: MouseEvent) => moveWidget(widget, e);

	// 	// Add event listeners
	// 	document.addEventListener("mouseup", closeDragElement);
	// 	document.addEventListener("mousemove", boundMoveWidget);
	// };

	// const closeDragElement = () => {
	// 	// Stop moving when mouse button is released
	// 	document.removeEventListener("mouseup", closeDragElement);
	// 	document.removeEventListener("mousemove", boundMoveWidget);
	// };

	// const moveWidget = (widget: HTMLElement, e: MouseEvent) => {
	// 	// const scrollTop = document.querySelector(".interface_affV_client")?.scrollTop
	// 	e = e || window.event;
	// 	e.preventDefault();

	// 	// Calculate the new cursor position
	// 	pos1 = pos3 - e.clientX;
	// 	pos2 = pos4 - e.clientY;
	// 	pos5 = document.querySelector(".interface_affV_client")?.scrollTop ||0;

	// 	// Update widget position based on mouse movement
	// 	widget.style.top = `${pos4 - pos2 + pos6 - pos5}px`;
	// 	widget.style.left = `${pos3 - pos1}px`;

	// 	pos3 = e.clientX;
	// 	pos4 = e.clientY;
	// };
}

// function widgetMoveFunctionality() {
// 	// let timeoutId = 0;
// 	// const holdTime = 1000;
// 	const widgets = document.querySelectorAll<HTMLElement>(".widget");

// 	document
// 		.querySelector(".widgets-global-container")
// 		?.classList.add("grid-stack");

// 	const script = document.createElement("script");
// 	script.src = "node_modules/gridstack/dist/gridstack-all.js";

// 	document.head.appendChild(script);

// 	widgets.forEach((widget) => {
// 		document.querySelector(".grid-stack")?.appendChild(widget);
// 		widget.classList.add("grid-stack-item");

// 		widget.setAttribute("gs-h", "1");
// 		widget.setAttribute("gs-x", "1");

// 		const originalHtml = widget.innerHTML;
// 		const newHtml =
// 			"<div class='grid-stack-item-content'>" + originalHtml + "</div>";
// 		widget.innerHTML = newHtml;
// 	});

// 	document.querySelectorAll(".grid-stack > *").forEach((el) => {
// 		if (!el.classList.contains("grid-stack-item")) el.remove();
// 	});

// 	if (GridStack !== undefined) {
// 		GridStack.init({ column: 3 });
// 	}

// }

// function rgbToHex(string: string) {
// 	function componentToHex(c: number) {
// 		var hex = c.toString(16);
// 		return hex.length == 1 ? "0" + hex : hex;
// 	}

// 	const [r, g, b] = string.match(/\d+/g)?.map(Number) || [0, 0, 0];
// 	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
// }
