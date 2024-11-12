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
