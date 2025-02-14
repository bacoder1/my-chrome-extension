import subjectSelectors from "../data/subject_selectors.json";

export default function changeSubjectName(element: any, emoji = true) {
  let currentName = element.innerText;

  currentName = currentName.split(">")[0];

  chrome.storage.sync.get("subjectData", (result) => {
    const item = result.subjectData[currentName];

    if (!item) return;

    let itemsWithColor: { element: Element; selectorId: string }[] = [];

    subjectSelectors.forEach((selector) => {
      if (selector.hasColor) {
        const elements = document.querySelectorAll(selector.selector);
        elements.forEach((element) => {
          itemsWithColor.push({ element, selectorId: selector.id });
        });
      }
    });

    if (itemsWithColor.some(item => item.element === element)) {
      const matchingItem = itemsWithColor.find(item => item.element === element);
      const selectorId = matchingItem?.selectorId;
      
      if (matchingItem && selectorId === "devoirs") {
        element.parentElement!.style.removeProperty(
          "--couleur-matiere",
        );
        element.parentElement!.parentElement!.parentElement!.parentElement!.style.setProperty("--couleur-matiere", item.color);
        console.log("did")
      } else if (matchingItem && selectorId === "edt") {
        (
          element.parentElement!.parentElement!.querySelector(".trait-matiere") as HTMLElement
        ).style.backgroundColor = item.color;
        console.log("did")
      } else if (matchingItem && selectorId === "ressources") {
        (element as HTMLElement).style.setProperty("--color-line", item.color);
        console.log("did")
      }
    }

    console.log("done")
    

    element.innerText = `${emoji ? item.emoji : ""} ${item.pretty}`;
  });
}
