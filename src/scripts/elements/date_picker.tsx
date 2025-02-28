interface DatePickerModalOptions {
  onDateSelected: (date: string) => void; // Callback pour la date sélectionnée
}

export const openDatePickerModal = ({ onDateSelected }: DatePickerModalOptions): void => {
  const curtain = document.querySelector(".BloquerInterface");

  if (curtain) {
    (curtain as HTMLElement).style.display = "block";
    curtain.classList.add("VoileOpaque50");
  }

  const modalId = `date-picker-${Date.now()}`;

  // Calculer les positions left et top pour centrer la modale
  const calculateCenterPosition = (width: number, height: number) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    return {
      left: (windowWidth - width) / 2,
      top: (windowHeight - height) / 2,
    };
  };

  const modalWidth = 330;
  const modalHeight = 400;
  const { left, top } = calculateCenterPosition(modalWidth, modalHeight);

  // Fonction pour générer les jours du mois
  const generateDays = (year: number, month: number): (number | null)[][] => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const weeks: (number | null)[][] = [];
    let currentWeek: (number | null)[] = [];

    // Remplir les jours vides avant le premier jour du mois
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    // Remplir les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day + 1);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Remplir les jours vides après le dernier jour du mois
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  // Générer les jours pour le mois actuel (exemple: janvier 2025)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const days = generateDays(currentYear, currentMonth);

  // Construire les lignes du calendrier
  const calendarRows = days
    .map(
      (week) => `
      <tr class="jours" role="row">
        ${week
          .map(
            (day) => {
              if (day === null) {
                return `<td role="gridcell" class="date previous-date" tabindex="-1" aria-selected="false"></td>`;
              } else {
                const date = new Date(currentYear, currentMonth, day);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                return `
                  <td role="gridcell" class="date actif current-month" tabindex="0" aria-selected="false" aria-label="${formattedDate}">
                    <div><div><div>${day}</div></div></div>
                  </td>
                `;
              }
            }
          )
          .join("")}
      </tr>
    `
    )
    .join("");

  // Construire le HTML complet de la modale de date
  const modalHTML = `
    <div class="zone-fenetre date-fenetre-colibri" id="${modalId}" style="z-index: 1101; left: ${left}px; top: ${top}px;">
      <span class="sr-only" tabindex="0" onfocus="${modalId}.focusSurPremierElement();"></span>
      <div id="${modalId}_Fenetre" aria-labelledby="${modalId}_Titre" class="ObjetFenetre_Espace ObjetFenetre_Date_racine" tabindex="-1" role="dialog" aria-modal="true">
        <div id="${modalId}_FenetreContenu" class="Fenetre_Cadre ombre-cadre" style="box-sizing:border-box; width: ${modalWidth}px; min-height: ${modalHeight}px; background-color:var(--color-background);">
          <div class="Fenetre_Titre NePasImprimer">
            <h1 id="${modalId}_Titre" class="ZoneDeplacementFenetre ie-draggable-handle" tabindex="0">Choisir un jour</h1>
            <div class="cta-conteneur">
              <i role="button" tabindex="0" class="btnImageIcon as-button icon_fermeture_widget btnImage close-button" aria-label="Fermer" title="Fermer"></i>
            </div>
          </div>
          <div id="${modalId}_Res" class="Fenetre_Espace">
            <div id="${modalId}_Contenu" class="Fenetre_Contenu">
              <div class="ContentBox">
                <div class="InterfaceSelectionDate" id="${modalId}_Contenu">
                  <div class="combos-container">
                    <div class="combo-selecteur ObjetSaisie ie-combo">
                      <div class="input-wrapper ObjetSaisie" role="presentation">
                        <i role="button" tabindex="0" class="icon_angle_left icon btnImageIcon btnImage" aria-label="Précédent" title="Précédent"></i>
                        <div class="ObjetSaisie_cont">
                          <div class="input-wrapper">
                            <div class="ocb_cont as-input as-select ie-ripple">
                              <div class="ocb-libelle ie-ellipsis" tabindex="0" id="${modalId}_month" title="" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-live="polite" aria-relevant="text" aria-label="Sélectionner un mois" style="width: 120px;">
                                ${new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} ${currentYear}
                              </div>
                              <div class="ocb_bouton" role="presentation"></div>
                            </div>
                          </div>
                        </div>
                        <i role="button" tabindex="0" class="icon_angle_right icon btnImageIcon btnImage" aria-label="Suivant" title="Suivant"></i>
                      </div>
                    </div>
                  </div>
                  <div id="${modalId}_Jours">
                    <table class="full-width Texte10 EspaceHaut m-top-l" role="grid">
                      <tbody>
                        <tr class="titre-jours" role="row">
                          <th role="columnheader" class=" ouvre" aria-label="lundi">lun.</th>
                          <th role="columnheader" class=" ouvre" aria-label="mardi">mar.</th>
                          <th role="columnheader" class=" ouvre" aria-label="mercredi">mer.</th>
                          <th role="columnheader" class=" ouvre" aria-label="jeudi">jeu.</th>
                          <th role="columnheader" class=" ouvre" aria-label="vendredi">ven.</th>
                          <th role="columnheader" class=" ouvre" aria-label="samedi">sam.</th>
                          <th role="columnheader" class=" ouvre" aria-label="dimanche">dim.</th>
                        </tr>
                        ${calendarRows}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="NePasImprimer">
            <div class="zone-bas">
              <div class="btn-conteneur">
                <button id="${modalId}_close" class="themeBoutonSecondaire ieBouton ie-ripple NoWrap ieBoutonDefautSansImage" style="margin-left:4px;">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="sr-only" tabindex="0" onfocus="${modalId}.focusSurPremierElement();"></span>
    </div>
  `;

  // Convertir le HTML en élément DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(modalHTML, "text/html");
  const modalElement = doc.body.firstElementChild as HTMLElement;
  const modalParent = document.querySelector("#zone_fenetre");

  // Ajouter la modale au DOM
  modalParent?.insertAdjacentElement("beforeend", modalElement);

  // Gestion des événements
  const addEventListeners = (element: HTMLElement): void => {
    // Fermeture de la modale
    element.querySelector(".close-button")?.addEventListener("click", () => {
      closeDatePickerModal();
    });

    element.querySelector(`#${modalId}_close`)?.addEventListener("click", () => {
      closeDatePickerModal();
    });

    // Gestion de la sélection de date
    element.querySelectorAll(".date").forEach((dateCell) => {
      dateCell.addEventListener("click", () => {
        const selectedDate = dateCell.getAttribute("aria-label");
        if (selectedDate) {
          onDateSelected(selectedDate); // La date est déjà au format yyyy-mm-dd
          closeDatePickerModal();
        }
      });
    });

    // Gestion des flèches de navigation (mois précédent/suivant)
    element.querySelector(".icon_angle_left")?.addEventListener("click", () => {
      console.log("Mois précédent");
      // Implémenter la logique pour passer au mois précédent
    });

    element.querySelector(".icon_angle_right")?.addEventListener("click", () => {
      console.log("Mois suivant");
      // Implémenter la logique pour passer au mois suivant
    });
  };

  addEventListeners(modalElement);
};

// Fonction pour fermer la modale de date
const closeDatePickerModal = () => {
  const curtain = document.querySelector(".BloquerInterface") as HTMLElement;
  if (curtain) {
    curtain.style.display = "none";
    curtain.classList.remove("VoileOpaque50");
  }

  const modal = document.querySelector(".date-fenetre-colibri");
  if (modal) {
    modal.remove();
  }
};