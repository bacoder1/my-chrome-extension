import "../styles/injected/globals.css";
import formatSchoolName from "../utils/format/format_school_name";
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
} from "lucide";
import waitForElement from "../utils/dom/wait_for_element";
import formatScheduleDateRange from "../utils/format/format_schedule_date_range";
import injectCustomFont from "../utils/dom/inject_custom_font";
import home from "./home";
import global from "./global";
import colorList from "../utils/data/colors.json";
import icons from "../../public/data/icons.json";
import parseName from "../utils/format/parse_name";
import imageUrlToDataUrl from "../utils/image_url_to_data";

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
  if (changes.account) {
    console.log(changes.account.newValue);
    const picture: HTMLImageElement | null = document.querySelector(
      ".ObjetBandeauEspace .ibe_util_photo img",
    );

    if (picture && changes.account.newValue.profilePicture) {
      picture.src = changes.account.newValue.profilePicture;
    }

    if (changes.account.newValue.studentName) {
      chrome.storage.sync.get("showLastName", (result) => {
        changeStudentName(
          changes.account.newValue.studentName.first,
          result.showLastName && changes.account.newValue.studentName.last,
        );
      });
    }
  }
});

function changeStudentName(firstName: any, lastName: any) {
  console.log(firstName, lastName);
  const nameWrapper: HTMLDivElement | null =
    document.querySelector(".ibe_etab");

  if (nameWrapper) {
    let name = `${firstName ? firstName : ""} ${lastName ? lastName : ""}`;

    name = name.trim();
    chrome.storage.onChanged.addListener((changes, _namespace) => {
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
    });

    nameWrapper.innerText = name;
  }
}

chrome.storage.onChanged.addListener((changes, _namespace) => {
  if (changes.siteIconSrc) {
    console.log("hi");
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel='icon']");

    if (link) {
      link.href = changes.siteIconSrc.newValue;
    }
  }
});

chrome.storage.onChanged.addListener((changes, _namespace) => {
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
});

chrome.storage.onChanged.addListener((changes, _namespace) => {
  if (changes.showProfilePicture) {
    updateProfilePicture(changes.showProfilePicture.newValue);
  }
});

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

chrome.storage.sync.get("siteIconSrc", (result) => {
  let siteIconSrc = result.siteIconSrc;

  if (!siteIconSrc) {
    chrome.storage.sync.set({ siteIconSrc: icons[0].url });
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
    .forEach((el) => {
      console.log("hi");
      const textContent = el?.textContent?.trim();
      if (textContent) {
        el.insertAdjacentElement(
          "afterbegin",
          createElement(headerIcons[textContent]),
        );
      }
    });

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

  chrome.storage.sync.get("account", (result) => {
    let account = result.account;

    const picture: HTMLImageElement | null = document.querySelector(
      ".ObjetBandeauEspace .ibe_util_photo img",
    );

    if (picture) {
      imageUrlToDataUrl(picture.src).then((dataUrl) => {
        chrome.storage.sync.set({
          originalProfilePicture: dataUrl,
        });
      });
    }

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
          profilePicture: picture?.src,
        },
      });
    } else {
      if (picture && account.profilePicture) {
        picture.src = account.profilePicture;
      }
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

console.log("hi");
