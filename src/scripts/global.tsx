import changeSubjectName from "../utils/format/change_subject_name";
import extractRgb from "../utils/color/extract_rgb";
import subjectSelectors from "../utils/data/subject_selectors.json";
import { formatSubjectName } from "../utils/format/format_subject_name";
import { getSubjectEmoji } from "../utils/emoji/get_subject_emoji";
import rgbToHex from "../utils/color/rgb_to_hex";
import colibriButton from "./elements/button";
import { Plus } from "lucide";
import { closeModal, openModal } from "./elements/modal";
import subjectColors from "../utils/data/subject_colors.json";

export default function global() {
  // document.querySelectorAll(".widget.edt .trait-matiere").forEach((element) => {
  //   const color = window.getComputedStyle(element).backgroundColor;
  //   if (element.parentElement) {
  //     changeSubjectColor(color, element, element.parentElement)
  //   }
  // });

  const subjectData: any = {};

  subjectSelectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector.selector);

    elements.forEach((element) => {
      let subject = (element as HTMLElement).innerText;
      const pretty = formatSubjectName(subject);
      const emoji = getSubjectEmoji(subject);

      let color = null;

      if (selector.id === "devoirs") {
        color = window
          .getComputedStyle(element.parentElement!)
          .getPropertyValue("--couleur-matiere");
        console.log(color);
      } else if (selector.id === "edt") {
        color = window.getComputedStyle(
          element.parentElement!.parentElement!.querySelector(
            ".trait-matiere",
          )!,
        ).backgroundColor;
      } else if (selector.id === "ressources") {
        color = window
          .getComputedStyle(element)
          .getPropertyValue("--color-line");
      }

      subject = subject.split(">")[0];
      subject = subject.trim();

      if (pretty === "Pas de cours") return;

      if (!subjectData[subject]) subjectData[subject] = {};

      if (color?.startsWith("rgb")) color = rgbToHex(color).toUpperCase();

      if (pretty) subjectData[subject].pretty = pretty;
      if (emoji) subjectData[subject].emoji = emoji;
      // Only check for non-null value for `pretty` and `emoji`. `color` can be `null`.
      if (color) subjectData[subject].color = color; // Use `undefined` to allow `null` for color

      if (!element.hasAttribute("originalSubjectName")) {
        element.setAttribute("originalSubjectName", subject);
      }
    });
  });

  chrome.storage.sync.get("subjectData", (result) => {
    let resultData = result.subjectData ?? {};

    for (let key in subjectData) {
      if (
        !resultData.hasOwnProperty(key) && // Check if the key doesn't exist in resultData
        !Object.values(resultData).some(
          (subject: any) =>
            subject.pretty.toLowerCase() ===
            subjectData[key].pretty.toLowerCase(), // Check if the pretty value of subjectData[key] is unique in resultData
        ) &&
        !Object.values(resultData).some(
          (subject: any) => subject.pretty.toLowerCase() === key.toLowerCase(), // Check if the pretty value of subjectData[key] is unique in resultData
        )
      ) {
        resultData[key] = subjectData[key]; // Add subjectData[key] to resultData
      }
    }

    console.log(subjectData, resultData);

    chrome.storage.sync.set({ subjectData: resultData });
  });

  document
    .querySelectorAll(
      ".widget.travailafaire .liste-imbriquee ul li > .conteneur-item .titre-matiere, .widget.ressourcepedagogique ul li .wrap h3, .widget.notes ul li h3 > span, .widget.competences ul li .wrap h3 > span, .ListeDernieresNotes:not(:has(.liste-footer)) .zone-centrale .titre-principal:first-child, .ListeDernieresNotes:not(:has(.liste-footer)) .zone-centrale .titre-principal > div:first-child, .ListeDernieresNotes .zone-centrale .titre-principal .ie-titre-gros, .Zone-DetailsNotes > header > div > div:nth-child(1), .Zone-DetailsNotes > header > div",
    )
    .forEach((element: Element) => changeSubjectName(element));

  document
    .querySelectorAll(
      ".widget.edt ul.container-cours > li.libelle-cours, .widget.ds .infos-ds-conteneur > h3",
    )
    .forEach((element: Element) => changeSubjectName(element, false));

  document
    .querySelectorAll(".widget.edt ul.liste-cours > li")
    .forEach((element: any) => {
      const colorBar = element.querySelector(".trait-matiere");

      if (colorBar) {
        const color = window.getComputedStyle(colorBar).backgroundColor;

        console.log(color);

        element.style.setProperty("--subject-color", extractRgb(color));
      }
    });

    document
    .querySelectorAll(".liste_celluleGrid")
    .forEach((element: any) => {
      const colorBar = element.querySelector(".trait-matiere");

      if (colorBar) {
        const color = window.getComputedStyle(colorBar).backgroundColor;

        console.log(color);

        element.style.setProperty("--subject-color", extractRgb(color));
      }
    });

  if (
    !document.querySelector(
      ".widget.travailafaire .content-container .as-footer .colibri-button",
    )
  )
    document
      .querySelector(".widget.travailafaire .content-container .as-footer")
      ?.insertAdjacentElement(
        "beforeend",
        colibriButton({
          iconNode: Plus,
          text: "Ajouter un devoir",
          onClick: () =>
            openModal({
              title: "Ajouter un devoir",
              minHeight: 600,
              width: 500,
              fields: {
                subject: { label: "Nom de la matière", maxLength: 30 },
                content: { label: "Contenu", maxLength: 500, height: 200 },
                date: {
                  type: "date",
                  label: "Date de remise",
                  sameLineAs: "subject",
                },
              },
              buttons: [
                {
                  label: "Annuler",
                  onClick: () => closeModal(),
                  type: "secondary",
                },
                {
                  label: "Envoyer",
                  onClick: (results) => {
                    closeModal();
                    createCustomHomework(results);
                  },
                  type: "primary",
                },
              ],
            }),
        }),
      );

  function createCustomHomework(values: any) {
    // Clean the subject name by removing emojis
    const subjectName = values.subject.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();

    console.log(subjectName);

    // Retrieve subjectData to find the color
    chrome.storage.sync.get("subjectData", ({ subjectData }) => {
      let color: string;

      // Check if the subject name is a key in subjectData
      if (subjectData && subjectData.hasOwnProperty(subjectName)) {
        color = subjectData[subjectName].color;
      } else {
        // Check if the subject name matches a "pretty" value
        let found = false;
        for (const key of Object.keys(subjectData)) {
          if (subjectData[key].pretty === subjectName) {
            color = subjectData[key].color;
            found = true;
            break;
          }
        }
        // If no color is found, pick a random color from subjectColors
        if (!found) {
          color =
            subjectColors[Math.floor(Math.random() * subjectColors.length)];
        }
      }

      // Retrieve existing customHomework and add the new homework
      chrome.storage.sync.get("customHomework", (results) => {
        const customHomework = results.customHomework || [];
        const newHomework = {
          subject: values.subject,
          description: values.content,
          color: color, // Use the resolved or random color
          done: false,
          date: values.date,
        };

        // Update storage with the new homework
        chrome.storage.sync.set(
          { customHomework: [...customHomework, newHomework] },
          () => {
            console.log("Custom homework added:", newHomework);
          },
        );
      });
    });
  }
}
