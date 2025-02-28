import { Grade } from "../../types/types";
import { getPronoteAverage } from "./pronote_average";

const getAveragesHistory = (
  grades: Grade[],
  target = "value",
  final?: number,
): any[] => {
  try {
    // Générer l'historique des moyennes jusqu'à la date de chaque note
    const history = grades.map((grade, index) => ({
      value: getPronoteAverage(grades.slice(0, index + 1), target), // Moyenne jusqu'à ce point
      date: grade.date.toISOString(), // Date de la note au format ISO
    }));

    // Trier l'historique par date
    history.sort((a, b) => a.date.localeCompare(b.date));

    // Ajouter un point final avec la moyenne finale (ou calculée)
    history.push({
      value: final ?? getPronoteAverage(grades, target), // Moyenne finale ou calculée
      date: new Date().toISOString(), // Date actuelle
    });

    // remove NaN values
    return history.filter((x) => !isNaN(x.value) || x.value !== -1);
  } catch (e) {
    return [];
  }
};

export default getAveragesHistory;