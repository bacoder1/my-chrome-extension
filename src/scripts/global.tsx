import changeSubjectName from "../utils/format/change_subject_name";
import extractRgb from "../utils/color/extract_rgb";

export default function global() {
  // document.querySelectorAll(".widget.edt .trait-matiere").forEach((element) => {
  //   const color = window.getComputedStyle(element).backgroundColor;
  //   if (element.parentElement) {
  //     changeSubjectColor(color, element, element.parentElement)
  //   }
  // });

  document
    .querySelectorAll(
      ".widget.travailafaire .liste-imbriquee ul li > .conteneur-item .titre-matiere, .widget.ressourcepedagogique ul li .wrap h3, .widget.notes ul li h3 > span, .widget.competences ul li .wrap h3 > span",
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
}
