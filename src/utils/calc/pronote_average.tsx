import { Grade } from "../../types/types.js";
import { getSubjectAverage } from "./subject_average.js";

export function getPronoteAverage(grades: Grade[], target = "value") {
	if (!grades || grades.length === 0) return -1;

	// Grouper les notes par matière
	const groupedBySubject = grades.reduce(
		(acc: Record<string, Grade[]>, grade) => {
			(acc[grade.subject.name] ||= []).push(grade);
			return acc;
		},
		{}
	);

	// Calculer la moyenne totale de toutes les matières
	const totalAverage: number = Object.values(groupedBySubject).reduce(
		(acc: number, subjectGrades) => {
			return acc + getSubjectAverage(subjectGrades, target); // Additionner les moyennes de chaque matière
		},
		0
	);

	// Retourner la moyenne globale en divisant par le nombre de matières
	return Number((totalAverage / Object.keys(groupedBySubject).length).toFixed(2));
}
