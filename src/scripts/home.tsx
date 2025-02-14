import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { ArrowUpRight, createElement } from "lucide";
import { renderCustomHomework } from "./content";

export default function home() {
  const widgetTitles: { [key: string]: string } = {
    "Travail à faire pour les prochains jours": "Devoirs",
    "Dernières ressources pédagogiques": "Dernières ressources",
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

  document.querySelectorAll(".widget .cta-conteneur i").forEach((element) => {
    if (!element.querySelector("svg"))
      element.insertAdjacentElement("beforeend", createElement(ArrowUpRight));
  });

  const MIN_DURATION = 0.3; // minimum animation duration in seconds
  const MAX_DURATION = 0.9; // maximum animation duration in seconds

  document.querySelectorAll(".widget").forEach((el: Element) => {
    // Random duration between MIN_DURATION and MAX_DURATION
    const randomDuration =
      MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);

    // Apply the duration to each element
    (el as HTMLElement).style.animationDuration = `${randomDuration}s`;
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

    document
      .querySelectorAll(".liste-imbriquee .sub-liste li")
      .forEach((element: Element) => {
        const wrap = element.querySelector(".with-color");

        if (wrap) {
          const color = window
            .getComputedStyle(wrap)
            .getPropertyValue("--couleur-matiere");

          (element as HTMLElement).style.setProperty(
            "--couleur-matiere",
            color,
          );
        }
      });
    chrome.storage.sync.get("customHomework", (result) => {
      let customHomework = result.customHomework;

      renderCustomHomework(customHomework);
    });
  });
}
