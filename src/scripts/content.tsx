import "../styles/injected/globals.css";
import formatSchoolName from "../utils/format/format_school_name";
import waitForElement from "../utils/dom/wait_for_element";
import formatScheduleDateRange from "../utils/format/format_schedule_date_range";
import injectCustomFont from "../utils/dom/inject_custom_font";
import home from "./home";
import global from "./global";
import colorList from "../utils/data/colors.json";
import icons from "../../public/data/icons.json";
import parseName from "../utils/format/parse_name";
import imageUrlToDataUrl from "../utils/image_url_to_data";
import subjectSelectors from "../utils/data/subject_selectors.json";
import grades from "./grades";
import timetable from "./timetable";

const data = fetch(
  "https://3310001c.index-education.net/pronote/appelfonction/3/3194151/658f518206dd39733b19fdaeb1dde002",
  {
    headers: {
      accept: "*/*",
      "accept-language":
        "fr-BF,fr;q=0.9,en-GB;q=0.8,en;q=0.7,fr-FR;q=0.6,en-US;q=0.5",
      "content-type": "application/json",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer: "https://3310001c.index-education.net/pronote/eleve.html",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"session":3194151,"numeroOrdre":"658f518206dd39733b19fdaeb1dde002","nom":"Authentification","donneesSec":{"data":{"connexion":0,"challenge":"1506dc6e2e90c3b08ba996798a6dac09525cd4376b76267b4c380c4059067c9b","espace":3}}}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  },
);

async () => console.log(await data);

// Inject the interception script into the page
const script = document.createElement("script");
script.src = chrome.runtime.getURL("intercept.js");
script.onload = function () {
  (this as any).remove(); // Remove the <script> element
};

(document.head || document.documentElement).appendChild(script);

// Listen for messages from the page context
window.addEventListener("message", (event) => {
  // Ensure the message is from our script
  if (event.source === window && event.data?.type === "DernieresNotes") {
    console.log("Received grades data from page context:", event.data.data);

    chrome.runtime.sendMessage({
      type: "DernieresNotes",
      data: event.data.data,
    });
  }
});

chrome.storage.sync.get("accentColor", (result) => {
  let accentColor = result.accentColor;

  if (!accentColor) {
    // If `accentColor` is empty, set it to the first color in colorList
    accentColor = colorList[0];
    chrome.storage.sync.set({ accentColor });
  }

  // Now apply accentColor's RGB values to CSS variables
  for (let key in accentColor.rgb) {
    const value = accentColor.rgb[key];
    document.body.style.setProperty(`--accent-color-${key}`, value);
  }
});

chrome.storage.onChanged.addListener((changes, _namespace) => {
  console.log(changes, _namespace);
  if (changes.account) {
    if (changes.account.newValue.studentName) {
      chrome.storage.sync.get("showLastName", (result) => {
        changeStudentName(
          changes.account.newValue.studentName.first,
          result.showLastName && changes.account.newValue.studentName.last,
        );
      });
    }
  }

  if (changes.profilePicture) {
    const picture: HTMLImageElement | null = document.querySelector(
      ".ObjetBandeauEspace .ibe_util_photo img",
    );

    if (picture && changes.profilePicture.newValue) {
      picture.src = changes.profilePicture.newValue;
    }
  }

  if (changes.siteIconSrc) {
    console.log("hi");
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel='icon']");

    if (link) {
      link.href = changes.siteIconSrc.newValue;
    }
  }

  if (changes.showLastName) {
    chrome.storage.sync.get("account", (result) => {
      const account = result.account;
      console.log(account);
      changeStudentName(
        account.studentName.first,
        changes.showLastName.newValue && account.studentName.last,
      );
    });
  }

  if (changes.showProfilePicture) {
    updateProfilePicture(changes.showProfilePicture.newValue);
  }

  if (changes.accentColor) {
    chrome.storage.sync.get("accentColor", (result) => {
      const accentColor = result.accentColor;

      for (let key in accentColor.rgb) {
        const value = accentColor.rgb[key];
        document.body.style.setProperty(`--accent-color-${key}`, value);
      }
    });
  }

  if (changes.subjectData) {
    chrome.storage.sync.get("subjectData", (result) => {
      let subjectData = result.subjectData;

      subjectSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector.selector);

        elements.forEach((element) => {
          const originalSubjectName = element.getAttribute(
            "originalSubjectName",
          );

          if (originalSubjectName) {
            const item = subjectData[originalSubjectName];

            (element as HTMLElement).innerText = `${item.emoji} ${item.pretty}`;

            if (selector.hasColor) {
              if (selector.id === "devoirs") {
                element.parentElement!.style.removeProperty(
                  "--couleur-matiere",
                );
                element.parentElement!.parentElement!.parentElement!.parentElement!.style.setProperty(
                  "--couleur-matiere",
                  item.color,
                );
              } else if (selector.id === "edt") {
                (
                  element.parentElement!.parentElement!.querySelector(
                    ".trait-matiere",
                  ) as HTMLElement
                ).style.backgroundColor = item.color;
              } else if (selector.id === "ressources") {
                (element as HTMLElement).style.setProperty(
                  "--color-line",
                  item.color,
                );
              } else if (selector.id === "vie-scolaire-edt") {
                (
                  element.parentElement!.parentElement!.parentElement!
                    .parentElement as HTMLElement
                ).style.backgroundColor =
                  `color-mix(in oklab, ${item.color} 45.5%, white 54.5%)`;
                (
                  element.parentElement!.parentElement!.parentElement!
                    .parentElement as HTMLElement
                ).style.borderColor =
                  `color-mix(in oklab, ${item.color} 28.5%, black 71.5%)`;
              }
            }
          }
        });
      });
    });
  }

  if (changes.customHomework) {
    chrome.storage.sync.get("customHomework", (result) => {
      let customHomework = result.customHomework;

      renderCustomHomework(
        customHomework,
        true,
        changes.customHomework.oldValue,
      );
    });
  }
});

function changeStudentName(firstName: any, lastName: any) {
  console.log(firstName, lastName);
  const nameWrapper: HTMLDivElement | null =
    document.querySelector(".ibe_etab");

  if (nameWrapper) {
    let name = `${firstName ? firstName : ""} ${lastName ? lastName : ""}`;

    name = name.trim();

    const text =
      name + nameWrapper.innerHTML.slice(nameWrapper.innerHTML.indexOf("<"));

    nameWrapper.innerHTML = text;
  }
}

function updateProfilePicture(showing: boolean) {
  const picture: HTMLImageElement | null = document.querySelector(
    ".ObjetBandeauEspace .ibe_util_photo img",
  );

  if (picture) {
    if (showing) {
      picture.style.display = "inline";
    } else {
      picture.style.display = "none";
    }
  }
}

chrome.storage.local.get("siteIconSrc", (result) => {
  let siteIconSrc = result.siteIconSrc;

  if (!siteIconSrc) {
    chrome.storage.local.set({ siteIconSrc: icons[0].emojis[0].skins[0].src });
  } else {
    document.querySelectorAll("link[rel='icon']").forEach((el) => el.remove());

    const link = document.createElement("link");
    link.rel = "icon";
    link.href = siteIconSrc; // URL of the new favicon
    document.head.appendChild(link);
  }
});

const getStudentName = () => {
  const wrapper = document.querySelector(".ObjetBandeauEspace");
  let name = wrapper?.getAttribute("aria-label");

  if (name) {
    name = name.replace(
      "Pour utiliser les raccourcis clavier, appuyez simultanément sur les touches Alt + Maj + un des chiffres de la partie supérieure du clavier (pas le pavé numérique). Menu: Alt + Maj + 0, Contenu: Alt + Maj + 1, Déconnexion: Alt + Maj + 9",
      "",
    ); // idk
    name = name.replace(/\(.*?\)/g, ""); // remove everything in parenthesis (class)
    name = name.split("-").slice(1).join("-").trim(); // remove everything before dash (-)

    name = name.trim();

    const { first: firstName, last: lastName } = parseName(name);

    return { firstName, lastName };
  }

  return { firstName: "", lastName: "" };
};

function handlePageScripts() {
  // Define the scripts and their target elements
  const pageScripts = {
    home: {
      elementSelector: ".dotty .widget header > h2 > span",
      script: home,
    },
    grades: {
      elementSelector: ".ListeDernieresNotes .zone-centrale",
      script: grades,
    },
    timetable: {
      elementSelector: ".ObjetGrilleCours .cours-simple td :nth-child(2)",
      script: timetable,
    },
  };

  let lastRunTime = 0;
  const delay = 1000; // delay in milliseconds

  // Function to run both the specific and global scripts with delay
  function runScriptWithDelay(script: Function) {
    const currentTime = Date.now();
    if (currentTime - lastRunTime >= delay) {
      script();
      global();
      lastRunTime = currentTime;
    }
  }

  // Run scripts for elements already present in the DOM
  Object.values(pageScripts).forEach(({ elementSelector, script }) => {
    const element = document.querySelector(elementSelector);
    if (element && typeof script === "function") {
      runScriptWithDelay(script);
    }
  });
  console.log("First call");

  // MutationObserver callback to watch for added elements
  const observer = new MutationObserver(() => {
    Object.values(pageScripts).forEach(({ elementSelector, script }) => {
      const element = document.querySelector(elementSelector);
      if (element && typeof script === "function") {
        runScriptWithDelay(script);
      }
    });
  });

  // Start observing the body for mutations
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

injectCustomFont();

const lucideScript = document.createElement("script");
lucideScript.src = "https://unpkg.com/lucide@latest";
document.body.appendChild(lucideScript);

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

  handlePageScripts();

  const longLabels = ["Cahier<br>de textes", "Vie<br>scolaire"];

  document.querySelectorAll(".item-menu_niveau0").forEach((element) => {
    const content = element.querySelector(".label-menu_niveau0");
    if (content && longLabels.includes(content?.innerHTML.trim())) {
      content.innerHTML = content?.innerHTML.replace(/<br\s*\/?>/gi, " ");
    }
  });

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
    const getStudentClass = (): string => {
      const wrapper = document.querySelector(".ObjetBandeauEspace");

      const regex = /\((.*?)\)/;
      const match = wrapper?.getAttribute("aria-label")?.match(regex);

      return match ? match[1] : "";
    };

    studentNameWrapper.querySelector("i")?.remove();
    schoolNameWrapper.innerHTML = formatSchoolName(schoolName);
    studentNameWrapper.innerHTML = Object.values(getStudentName()).join(" ");
    studentNameWrapper.insertAdjacentHTML(
      "beforeend",
      `<span class='class-indicator'>${getStudentClass()}</span>`,
    );
  }

  waitForElement(
    'h1[aria-label="Mon emploi du temps"] + .element-bandeau-wrapper',
    (el: Element) => {
      console.log("hey i'm here lol");
      const span = el.querySelector("span");
      if (span) {
        span.textContent = formatScheduleDateRange(span.textContent!);
      }
    },
  );

  chrome.storage.local.get("profilePicture", (result) => {
    let profilePicture = result.profilePicture;

    const picture: HTMLImageElement | null = document.querySelector(
      ".ObjetBandeauEspace .ibe_util_photo img",
    );

    if (picture) {
      imageUrlToDataUrl(picture.src).then((dataUrl) => {
        chrome.storage.local.set({
          originalProfilePicture: dataUrl,
        });
      });
    }

    if (picture && profilePicture) picture.src = profilePicture;
  });

  chrome.storage.sync.get("account", (result) => {
    let account = result.account;

    if (
      !account ||
      account.studentName.first === "" ||
      account.studentName.last === ""
    ) {
      chrome.storage.sync.set({
        account: {
          studentName: {
            first: getStudentName().firstName,
            last: getStudentName().lastName,
          },
        },
      });
    }
  });

  chrome.storage.sync.get("showLastName", (result) => {
    let showLastName = result.showLastName;

    if (showLastName === null || showLastName === undefined) {
      chrome.storage.sync.set({
        showLastName: true,
      });
    } else {
      chrome.storage.sync.get("account", (result) => {
        changeStudentName(
          result.account.studentName.first,
          showLastName === true && result.account.studentName.last,
        );
      });
    }
  });

  chrome.storage.sync.get("showProfilePicture", (result) => {
    let showProfilePicture = result.showProfilePicture;

    if (showProfilePicture === null || showProfilePicture === undefined) {
      chrome.storage.sync.set({
        showProfilePicture: true,
      });
    } else {
      chrome.storage.sync.get("showProfilePicture", (result) => {
        updateProfilePicture(result.showProfilePicture);
      });
    }
  });
}

check();

export function renderCustomHomework(
  customHomework: any,
  update = false,
  oldValue?: any,
) {
  if (!update && document.querySelector("ul.liste-imbriquee .colibri-hw"))
    return;

  const filteredHomework = oldValue
    ? customHomework.filter((hw: any) => {
        // Check if the homework item exists in oldValue
        return !oldValue.some(
          (oldHw: any) =>
            oldHw.subject === hw.subject &&
            oldHw.description === hw.description &&
            oldHw.date === hw.date,
        );
      })
    : customHomework;

  // Group filtered homework by date
  const homeworkByDate: { [key: string]: any[] } = {};

  filteredHomework.forEach((hw: any) => {
    const dateKey = hw.date; // Assuming hw.date is in the format "yyyy-mm-dd"
    if (!homeworkByDate[dateKey]) {
      homeworkByDate[dateKey] = [];
    }
    homeworkByDate[dateKey].push(hw);
  });

  // Find the existing homework list container
  const homeworkList = document.querySelector("ul.liste-imbriquee");

  if (!homeworkList) {
    console.error("Homework list container not found!");
    return;
  }

  // Generate HTML for each date group and append it to the existing list
  for (const date in homeworkByDate) {
    // Check if a section for this date already exists
    let dateSection = homeworkList.querySelector(
      `h3[id="id_173_date_${date.replace(/-/g, "_")}"]`,
    );

    if (!dateSection) {
      // Create a new date section if it doesn't exist
      const dateHeading = document.createElement("li");
      dateHeading.setAttribute(
        "aria-labelledby",
        `id_173_date_${date.replace(/-/g, "_")}`,
      );
      dateHeading.setAttribute("tabindex", "0");

      // Format the date heading
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      const heading = document.createElement("h3");
      heading.id = `id_173_date_${date.replace(/-/g, "_")}`;
      heading.innerHTML = `<span>Pour</span> ${formattedDate}`;
      dateHeading.appendChild(heading);

      const subList = document.createElement("ul");
      subList.className = "sub-liste cols";
      dateHeading.appendChild(subList);

      homeworkList.appendChild(dateHeading);
      dateSection = heading;
    }

    // Find the sub-list for this date
    const subList = dateSection.parentElement?.querySelector("ul.sub-liste");

    if (!subList) {
      console.error("Sub-list not found for date:", date);
      continue;
    }

    // Add homework items to the sub-list
    homeworkByDate[date].forEach((hw) => {
      const homeworkItem = document.createElement("li");
      homeworkItem.setAttribute(
        "aria-labelledby",
        `id_173_date_${date.replace(/-/g, "_")}`,
      );
      homeworkItem.style.setProperty(
        "--couleur-matiere",
        hw.color || "#000000",
      ); // Default color if none is provided

      const homeworkHTML = `
        <div class="wrap conteneur-item colibri-hw">
          <div tabindex="0" role="link" class="as-header">
            <div class="with-color" style="margin-left: 0.8rem;">
              <span class="titre-matiere ${hw.done ? "est-fait" : ""}" originalsubjectname="${hw.subject}">
                ${hw.subject}
              </span>
            </div>
            <div tabindex="0" class="tag-style ThemeCat-pedagogie ie-chips">
              <div class="text ie-ellipsis">${hw.done ? "Fait" : "Non Fait"}</div>
            </div>
          </div>
          <div class="m-left">
            <div tabindex="0" class="as-content ${hw.done ? "avecAction done" : "avecAction"}" aria-labelledby="IE.Identite.collection.g25_0">
              <div class="description widgetTAF tiny-view ${hw.done ? "est-fait" : ""}">
                <div>${hw.description}</div>
              </div>
            </div>
          </div>
          <div class="flex-contain conteneur-cb">
            <label class="iecb iecbrbdroite cb-termine colored-label ${hw.done ? "is-checked" : ""}" for="cb-g7-gen-for">
              <input type="checkbox" id="cb-g7-gen-for" ${hw.done ? "checked" : ""}>
              <span aria-hidden="true"></span>
              <span>J'ai terminé</span>
            </label>
          </div>
        </div>
      `;

      homeworkItem.innerHTML = homeworkHTML;
      subList.appendChild(homeworkItem);
    });
  }
}

console.log("hi");
