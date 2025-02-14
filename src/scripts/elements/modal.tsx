import { openDatePickerModal } from "./date_picker";

interface ModalOptions {
  title: string;
  width?: number;
  minHeight?: number;
  fields: {
    [key: string]: {
      label: string;
      maxLength?: number;
      height?: number;
      type?: "text" | "date";
      sameLineAs?: string;
    };
  };
  buttons: {
    label: string;
    onClick: (results: { [key: string]: string }) => void; // Mise à jour ici
    type: string;
    className?: string;
  }[];
  tabs?: { id: string; label: string; content: string }[];
}

export const openModal = (config: ModalOptions): void => {
  const curtain = document.querySelector(".BloquerInterface");

  if (curtain) {
    (curtain as HTMLElement).style.display = "block";
    curtain.classList.add("VoileOpaque50");
  }

  const popupId = `popup-${Date.now()}`;

  // Calculer les positions left et top pour centrer la modale
  const calculateCenterPosition = (width: number, height: number) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    return {
      left: (windowWidth - width) / 2,
      top: (windowHeight - height) / 2,
    };
  };

  const modalWidth = config.width || 630;
  const modalHeight = config.minHeight || 100;
  const { left, top } = calculateCenterPosition(modalWidth, modalHeight);

  // Générer le HTML des onglets si présents
  const buildTabs = (
    tabs: { id: string; label: string; content: string }[],
  ): string => {
    return `
      <div class="conteneur-tabs">
        <div class="menu-tabs">
          ${tabs
            .map(
              (tab) => `
            <div class="tab-item">
              <div tabindex="0" class="tab-content">
                <div class="libelle BordureNavigationInactive">${tab.label}</div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
        <div class="tabs-contenu with-border">
          ${tabs
            .map(
              (tab) => `
            <ul class="ul-contenu-item">
              ${tab.content}
            </ul>
          `,
            )
            .join("")}
            </div>
            </div>
            `;
  };

  (window as any).openDatePickerModal = openDatePickerModal;

  // Générer le HTML des champs dynamiques
  const buildFields = (fields: ModalOptions["fields"]): string => {
    const fieldEntries = Object.entries(fields);
    const groupedFields: Record<string, string[]> = {};

    // Grouper les champs par ligne
    fieldEntries.forEach(([key, field]) => {
      const groupKey = field.sameLineAs || key; // Utiliser `sameLineAs` ou l'ID du champ comme clé de groupe
      if (!groupedFields[groupKey]) {
        groupedFields[groupKey] = [];
      }
      groupedFields[groupKey].push(key);
    });

    // Construire le HTML pour chaque groupe de champs
    return `
      <div class="form-section">
        ${Object.values(groupedFields)
          .map((group) => {
            return `
              <div class="flex-contain">
                ${group
                  .map((key) => {
                    const field = fields[key];
                    if (field.type === "date") {
                      return `
                        <div class="element-bandeau-wrapper" style="display: flex; margin-left: 16px; flex-direction: column; align-self: center">
                          <span class="ie-titre-petit m-bottom">${field.label}</span>
                          <div class="ObjetCelluleDate input-wrapper">
                            <div id="${key}" style="flex:1 1 auto;">
                              <div class="input-wrapper">
                                <div class="ocb_cont as-input as-date-picker ie-ripple" data-date-picker="${key}">
                                  <div class="ocb-libelle ie-ellipsis" tabindex="0" id="${key}_Edit" title="" role="combobox" aria-haspopup="dialog" aria-expanded="false" aria-live="polite" aria-relevant="text" aria-labelledby="${key}_labelwai" style="width: 75px;">
                                    Sélectionner une date
                                  </div>
                                  <div class="ocb_bouton" role="presentation"></div>
                                </div>
                              </div>
                            </div>
                            <span class="sr-only" role="presentation" id="${key}_labelwai">${field.label}</span>
                          </div>
                        </div>
                      `;
                    }

                    return `
                      <label class="flex-contain cols m-top-l m-bottom-l" style="flex: ${field.sameLineAs ? 1 : 2};">
                        <span class="ie-titre-petit m-bottom">${field.label}</span>
                        ${
                          field.height
                            ? `<textarea id="${key}" class="round-style" maxlength="${field.maxLength}" style="height: ${field.height}px"></textarea>`
                            : `<input id="${key}" type="text" class="round-style" maxlength="${field.maxLength}" />`
                        }
                      </label>
                    `;
                  })
                  .join("")}
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  };

  // Générer le HTML des boutons
  const buildButtons = (buttons: ModalOptions["buttons"]): string => {
    const themes: Record<string, string> = {
      primary: "themeBoutonPrimaire",
      secondary: "themeBoutonSecondaire",
    };

    return `
      <div class="btn-conteneur">
        ${buttons
          .map(
            (button) => `
          <button class="${themes[button.type]} ieBouton ie-ripple NoWrap ieBoutonDefautSansImage" style="margin-left:8px;" onclick="this.dispatchEvent(new CustomEvent('buttonClick', { bubbles: true }))">${button.label}</button>
        `,
          )
          .join("")}
      </div>
    `;
  };

  // Construire le HTML complet de la modale
  const popupHTML = `
    <div class="zone-fenetre colibri-fenetre" id="${popupId}" style="width: ${modalWidth}px; min-height: ${modalHeight}px; left: ${left}px; top: ${top}px; z-index: 1100">
      <span class="sr-only" tabindex="0" onfocus="${popupId}.focusSurPremierElement();"></span>
      <div id="${popupId}_Fenetre" aria-labelledby="${popupId}_Titre" class="ObjetFenetre_Espace ObjetFenetre_Message_racine" tabindex="-1" role="dialog" aria-modal="true">
        <div id="${popupId}_FenetreContenu" class="Fenetre_Cadre ombre-cadre" style="box-sizing:border-box; background-color:var(--color-background);">
          <div class="Fenetre_Titre NePasImprimer">
            <h1 id="${popupId}_Titre" class="ZoneDeplacementFenetre ie-draggable-handle" tabindex="0">${config.title}</h1>
            <div class="cta-conteneur">
              <i role="button" tabindex="0" class="btnImageIcon as-button icon_fermeture_widget btnImage close-button" aria-label="Fermer" title="Fermer"></i>
            </div>
          </div>
          <div id="${popupId}_Res" class="Fenetre_Espace">
            <div id="${popupId}_Contenu" class="Fenetre_Contenu">
              ${config.tabs ? buildTabs(config.tabs) : ""}
              ${buildFields(config.fields)}
            </div>
          </div>
          <div class="NePasImprimer">
            <div class="zone-bas">
              ${buildButtons(config.buttons)}
            </div>
          </div>
        </div>
      </div>
      <span class="sr-only" tabindex="0" onfocus="${popupId}.focusSurPremierElement();"></span>
    </div>
  `;

  // Convertir le HTML en élément DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(popupHTML, "text/html");
  const popupElement = doc.body.firstElementChild as HTMLElement;
  const modalParent = document.querySelector("#zone_fenetre");

  // Ajouter la modale au DOM
  modalParent?.insertAdjacentElement("beforeend", popupElement);

  // Fonction pour récupérer les valeurs des champs
  const getFormValues = (modalElement: HTMLElement): Record<string, string> => {
    const values: Record<string, string> = {};
    const inputs = modalElement.querySelectorAll(
      "input, textarea, .ocb-libelle",
    );

    inputs.forEach((input) => {
      const id = input.id.replace(/_Edit$/, ""); // Supprimer le suffixe "_Edit" pour les champs de date
      const value =
        (input as HTMLInputElement | HTMLTextAreaElement).value ||
        input.textContent?.trim() ||
        "";
      values[id] = value;
    });

    return values;
  };

  // Gestion des événements
  const addEventListeners = (element: HTMLElement): void => {
    element.querySelectorAll(".ocb_cont[data-date-picker]").forEach((datePicker) => {
      const key = datePicker.getAttribute("data-date-picker");
      datePicker.addEventListener("click", () => {
        openDatePickerModal({
          onDateSelected: (date) => {
            const dateDisplay = document.getElementById(`${key}_Edit`);
            if (dateDisplay) {
              dateDisplay.textContent = date;
            }
          },
        });
      });
    });
  
    // Fermeture de la modale
    element.querySelector(".close-button")?.addEventListener("click", () => {
      closeModal();
    });

    // Gestion des boutons
    element.querySelectorAll("button").forEach((button) => {
      button.addEventListener("buttonClick", () => {
        const buttonConfig = config.buttons.find(
          (b) => b.label === button.textContent,
        );

        if (buttonConfig) {
          // Récupérer les valeurs des champs
          const formValues = getFormValues(element);

          // Passer les résultats à la fonction onClick
          buttonConfig.onClick(formValues);
        }
      });
    });

    // Gestion des onglets
    if (config.tabs) {
      element.querySelectorAll(".tab-item").forEach((tab) => {
        tab.addEventListener("click", () => {
          element.querySelectorAll(".tab-item").forEach((t) => {
            t.classList.remove("selected");
          });
          tab.classList.add("selected");
        });
      });
    }

    // Drag-and-drop pour déplacer la modale
    let isDragging = false;
    let startX: number, startY: number, initialLeft: number, initialTop: number;

    (
      element.querySelector(".ie-draggable-handle") as HTMLElement
    )?.addEventListener("mousedown", (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = element.offsetLeft;
      initialTop = element.offsetTop;
      element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      element.style.left = `${initialLeft + dx}px`;
      element.style.top = `${initialTop + dy}px`;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      element.style.cursor = "auto";
    });
  };

  addEventListeners(popupElement);
};

export const closeModal = () => {
  const curtain = document.querySelector(".BloquerInterface") as HTMLElement;
  if (curtain) {
    curtain.style.display = "none";
    curtain.classList.remove("VoileOpaque50");
  }

  const modal = document.querySelector(".colibri-fenetre");
  if (modal) {
    modal.remove();
  }
};
