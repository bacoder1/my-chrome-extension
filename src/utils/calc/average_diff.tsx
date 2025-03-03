import { Grade } from "../../types/types.js";
import { getPronoteAverage } from "./pronote_average.js";

export function getAverageDiff(grades: Grade[], list: Grade[], target = "value") {
	const baseList = list;
	const gradesToRemove = grades;

	const baseListWithoutGrade = baseList.filter(
		(grade) => !gradesToRemove.includes(grade)
	);

	const baseAverage = getPronoteAverage(baseList, target);
	const baseWithoutGradeAverage = getPronoteAverage(
		baseListWithoutGrade,
		target
	);

	const difference = parseFloat(
		(baseAverage - baseWithoutGradeAverage).toFixed(2)
	);
	return difference
}
