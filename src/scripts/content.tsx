import "../index.css";
import "../styles/header.css";
import "../styles/widget.css"
import formatSchoolName from "../utils/format_school_name";
import {
	createElement,
	Home,
	User,
	LibraryBig,
	ChartArea,
	CirclePlus,
	GraduationCap,
	CalendarDays,
	Megaphone,
	Settings,
} from "lucide";
import onElementChange from "../utils/on_element_change";
import waitForElement from "../utils/wait_for_element";
import formatScheduleDateRange from "../utils/format_schedule_date_range";
import injectCustomFont from "../utils/inject_custom_font";

injectCustomFont();

// Function to wait for the wrapper element
function check(): void {
	const wrapper = document.getElementById("GInterface_T");

	if (wrapper) {
		// If the wrapper is found, proceed to add the badge
		run();
	} else {
		// If not found, use a MutationObserver to detect when it is added to the DOM
		const observer = new MutationObserver((_mutations, observer) => {
			const wrapper = document.getElementById("GInterface_T");
			if (wrapper) {
				observer.disconnect(); // Stop observing once the wrapper is found
				run();
			}
		});

		// Start observing the document for changes
		observer.observe(document.body, { childList: true, subtree: true });
	}
}

function run() {
	injectCustomFont();

	const longLabels = ["Cahier<br>de textes", "Vie<br>scolaire"];

	document.querySelectorAll(".item-menu_niveau0").forEach((element) => {
		const content = element.querySelector(".label-menu_niveau0");
		if (content && longLabels.includes(content?.innerHTML.trim())) {
			content.innerHTML = content?.innerHTML.replace(/<br\s*\/?>/gi, " ");
		}
	});

	createSettingsButton();

	document
		.querySelector(".label-menu_niveau0")
		?.insertAdjacentHTML("beforeend", "Acceuil");
	document.querySelector(".label-menu_niveau0 i")?.remove();

	document.querySelector(".ibe_logo")?.remove();
	document.querySelector(".ibe_image_etab")?.remove();
	document.querySelector(".footer-wrapper")?.remove();
	document.querySelector(".objetBandeauEntete_membres")?.remove();

	const ibeCentre = document.querySelector(".ibe_centre");
	if (ibeCentre) {
		for (let i = 0; i <= 2; i++) {
			const firstChild = ibeCentre.firstChild;
			console.log(firstChild, ibeCentre);
			if (firstChild) {
				document.querySelector(".ibe_gauche")?.appendChild(firstChild);
			}
		}
		ibeCentre.remove();
	}

	document
		.querySelectorAll(".ibe_iconebtn.ibe_actif")
		.forEach((el) => document.querySelector(".ibe_droite")?.appendChild(el));

	const schoolNameWrapper = document.querySelector(".ibe_util_texte");
	const studentNameWrapper = document.querySelector(".ibe_etab");
	const schoolName = studentNameWrapper?.textContent?.trim();

	if (schoolNameWrapper && schoolName && studentNameWrapper) {
		const wrapper = document.querySelector(".ObjetBandeauEspace");

		const getStudentName = (): string => {
			const regex = /-\s*([A-Za-zÀ-ÿ\s]+)\s*\(\d+\.\d+\)/;
			// Regex to capture the name before the (number)
			const match = wrapper?.getAttribute("aria-label")?.match(regex);

			return match ? match[1] : "";
		};

		const getStudentClass = (): string => {
			const regex = /\s\((\d+\.\d+)\)/;
			const match = wrapper?.getAttribute("aria-label")?.match(regex);

			return match ? match[1] : "";
		};

		studentNameWrapper.querySelector("i")?.remove();
		schoolNameWrapper.innerHTML = formatSchoolName(schoolName);
		studentNameWrapper.innerHTML = getStudentName();
		studentNameWrapper.insertAdjacentHTML(
			"beforeend",
			`<span class='class-indicator'>${getStudentClass()}</span>`
		);
	}

	const headerIcons: { [key: string]: any } = {
		"Page d'acceuil": Home,
		"Les informations liées à mon compte": User,
		"Contenu et ressources pédagogiques": LibraryBig,
		"Détail de mes notes": ChartArea,
		"Détails de mes évaluations": CirclePlus,
		"Livret scolaire": GraduationCap,
		"Mon emploi du temps": CalendarDays,
		"Informations & sondages": Megaphone,
	};

	document
		.querySelectorAll(".objetBandeauEntete_thirdmenu h1")
		.forEach((_el, index) => {
			onElementChange(
				`.objetBandeauEntete_thirdmenu h1:nth-of-type(${index + 1}`,
				(el: any) => {
					console.log("hi");
					const textContent = el.textContent?.trim();
					if (textContent) {
						el.insertAdjacentElement(
							"afterbegin",
							createElement(headerIcons[textContent])
						);
					}
				}
			);
		});

	waitForElement(
		'h1[aria-label="Mon emploi du temps"] + .element-bandeau-wrapper',
		(el: Element) => {
			console.log("hey i'm here lol");
			const span = el.querySelector("span");
			if (span) {
				span.textContent = formatScheduleDateRange(span.textContent!);
			}
		}
	);

	const widgetTitles: { [key: string]: string } = {};

	onElementChange(".widget", () => {
		document.querySelectorAll(".widget").forEach((el) => {
			const title = el.querySelector("header")?.getAttribute("title");
			console.log("hifeesdq")
	
			if (title) {
				el.insertAdjacentHTML(
					"beforebegin",
					`<div class="widget-indicator">${widgetTitles[title] ?? title}</div>`
				);
			}
			el.querySelector("header")?.remove();
		});
	})

}

function createSettingsButton() {
	let btn = document.createElement("button");

	btn.textContent = "Paramètres";

	btn.insertAdjacentElement("beforeend", createElement(Settings));

	document.querySelector(".ibe_droite")?.appendChild(btn);
}

check();

console.log("hi");
